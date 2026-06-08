import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Sync products from Gelato product catalog into Base44 Product entity
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

    // Step 1: Get all catalogs
    const catalogsRes = await fetch('https://product.gelatoapis.com/v3/catalogs', { headers });
    if (!catalogsRes.ok) {
      const body = await catalogsRes.text();
      return Response.json({ error: `Gelato catalogs error ${catalogsRes.status}`, detail: body }, { status: 500 });
    }
    const catalogsRaw = await catalogsRes.json();
    console.log('Catalogs raw:', JSON.stringify(catalogsRaw).substring(0, 500));
    const catalogs = Array.isArray(catalogsRaw) ? catalogsRaw : (catalogsRaw.catalogs || catalogsRaw.data || []);
    console.log('Catalogs fetched:', catalogs.length);

    // Step 2: For each catalog, fetch all products
    const allProducts = [];
    for (const catalog of catalogs) {
      const { catalogUid, title: catalogTitle } = catalog;
      let offset = 0;
      const limit = 100;

      while (true) {
        const res = await fetch(`https://product.gelatoapis.com/v3/catalogs/${catalogUid}/products:search`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ limit, offset }),
        });

        if (!res.ok) {
          console.log(`Error fetching catalog ${catalogUid}:`, res.status);
          break;
        }

        const data = await res.json();
        const products = data.products || [];

        for (const p of products) {
          allProducts.push({ ...p, catalogUid, catalogTitle });
        }

        console.log(`Catalog ${catalogUid}: offset=${offset}, fetched=${products.length}`);

        if (products.length < limit) break;
        offset += limit;
      }
    }

    console.log('Total Gelato products fetched:', allProducts.length);

    // Step 3: Load existing products from DB
    const existing = await base44.asServiceRole.entities.Product.list('created_date', 2000);
    const byProductUid = {};
    for (const p of existing) {
      const d = p.data || p;
      if (d.productUid) byProductUid[d.productUid] = p;
    }
    console.log('Existing in DB:', existing.length);

    // Step 4: Upsert
    let created = 0;
    let updated = 0;

    for (const gp of allProducts) {
      const mapped = {
        title: gp.productUid,
        handle: gp.productUid,
        productType: gp.catalogTitle || gp.catalogUid,
        vendor: 'Gelato',
        status: gp.attributes?.ProductStatus || 'active',
        tags: gp.catalogUid,
        productUid: gp.productUid,
        catalogUid: gp.catalogUid,
        catalogTitle: gp.catalogTitle,
        attributes: gp.attributes || {},
        weight: gp.weight || null,
        dimensions: gp.dimensions || null,
        variants: [{
          title: 'Default',
          sku: gp.productUid,
          price: '0',
        }],
        images: [],
      };

      const existing_record = byProductUid[gp.productUid];
      if (existing_record) {
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
      totalFetchedFromGelato: allProducts.length,
      created,
      updated,
      catalogsCount: catalogs.length,
    });
  } catch (error) {
    console.log('ERROR:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});