import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Sync products from Gelato store (pancartiviste.store) into Base44 Product entity
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const API_KEY = Deno.env.get('PANCARTVISTE_API_KEY');
    if (!API_KEY) {
      return Response.json({ error: 'Missing PANCARTVISTE_API_KEY' }, { status: 400 });
    }

    const headers = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };

    // Step 1: Find the store UUID for pancartiviste.store
    const storesRes = await fetch('https://ecommerce.gelatoapis.com/v1/stores', { headers });
    if (!storesRes.ok) {
      const body = await storesRes.text();
      return Response.json({ error: `Gelato stores error ${storesRes.status}`, detail: body }, { status: 500 });
    }
    const storesData = await storesRes.json();
    console.log('Stores response:', JSON.stringify(storesData).substring(0, 1000));

    const stores = storesData.stores || storesData.data || (Array.isArray(storesData) ? storesData : []);
    console.log('Stores found:', stores.length, stores.map(s => `${s.id}:${s.domain || s.name || s.storeId}`));

    const store = stores.find(s =>
      (s.domain || s.externalId || s.name || '').toLowerCase().includes('pancartiviste') ||
      (s.storeUrl || '').toLowerCase().includes('pancartiviste')
    ) || stores[0];

    if (!store) {
      return Response.json({ error: 'No Gelato store found', stores: storesData }, { status: 404 });
    }

    const STORE_ID = store.id || store.storeId;
    console.log('Using store:', STORE_ID, store.domain || store.name);

    // Fetch all store products with pagination
    const allProducts = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const res = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/${STORE_ID}/products?limit=${limit}&offset=${offset}`, {
        headers,
      });

      if (!res.ok) {
        const body = await res.text();
        console.log('Gelato API error:', res.status, body.substring(0, 500));
        return Response.json({ error: `Gelato API error ${res.status}`, detail: body.substring(0, 500) }, { status: 500 });
      }

      const data = await res.json();
      console.log('Response keys:', Object.keys(data));

      const products = data.products || data.data || (Array.isArray(data) ? data : []);
      allProducts.push(...products);
      console.log(`Fetched offset=${offset}: ${products.length} products (total: ${allProducts.length})`);

      if (products.length < limit) break;
      offset += limit;
    }

    console.log('Total Gelato store products fetched:', allProducts.length);

    if (allProducts.length === 0) {
      return Response.json({ success: true, message: 'No products found', totalFetched: 0 });
    }

    // Load existing products from DB
    const existing = await base44.asServiceRole.entities.Product.list('created_date', 2000);
    const byProductUid = {};
    const byHandle = {};
    for (const p of existing) {
      if (p.productUid) byProductUid[p.productUid] = p;
      if (p.handle) byHandle[p.handle] = p;
    }
    console.log('Existing in DB:', existing.length);

    // Upsert
    let created = 0;
    let updated = 0;

    for (const gp of allProducts) {
      // Log first product structure for debugging
      if (created + updated === 0) {
        console.log('First product sample:', JSON.stringify(gp).substring(0, 800));
      }

      const productId = gp.id || gp.productId || gp.externalId || gp.productUid;
      const handle = gp.handle || gp.slug || productId;
      const title = gp.title || gp.name || productId;

      const mapped = {
        title,
        handle,
        descriptionHtml: gp.description || gp.descriptionHtml || '',
        productType: gp.productType || gp.type || '',
        vendor: 'Gelato',
        status: gp.status || 'active',
        tags: Array.isArray(gp.tags) ? gp.tags.join(',') : (gp.tags || ''),
        productUid: productId,
        catalogUid: gp.catalogUid || '',
        catalogTitle: gp.catalogTitle || '',
        attributes: gp.attributes || {},
        variants: (gp.variants || []).map(v => ({
          title: v.title || v.name || 'Default',
          sku: v.sku || '',
          price: String(v.price || v.retailPrice || '0'),
          compareAtPrice: v.compareAtPrice || null,
        })),
        images: (gp.images || gp.previewImages || []).map(img => ({
          url: typeof img === 'string' ? img : (img.url || img.src || img.fileUrl || ''),
          altText: img.altText || title,
        })),
        createdAt: gp.createdAt || gp.created_at || null,
        updatedAt: gp.updatedAt || gp.updated_at || null,
      };

      const existing_record = byProductUid[productId] || byHandle[handle];
      if (existing_record) {
        mapped.collections = existing_record.collections || [];
        mapped.sortOrder = existing_record.sortOrder ?? null;
        await base44.asServiceRole.entities.Product.update(existing_record.id, mapped);
        updated++;
      } else {
        await base44.asServiceRole.entities.Product.create(mapped);
        created++;
      }
    }

    console.log(`Done: created=${created}, updated=${updated}`);

    return Response.json({
      success: true,
      storeId: STORE_ID,
      totalFetchedFromGelato: allProducts.length,
      created,
      updated,
    });
  } catch (error) {
    console.log('ERROR:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});