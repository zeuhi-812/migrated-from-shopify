import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const PRICES = {
  mug: 14.16,
  poster_13x18: 8.06,
  poster_21x30: 9.66,
  poster_a3: 13.80,
};

function normalizeTitle(title) {
  return (title || '')
    .toLowerCase()
    .replace(/[""«»]/g, '"')
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function detectProductType(title, variants) {
  const t = normalizeTitle(title);
  if (t.includes('mug') || t.includes('céramique') || t.includes('ceramic')) return 'mug';
  const variantTitles = (variants || []).map(v => (v.title || '').toLowerCase()).join(' ');
  if (variantTitles.includes('13x18') || variantTitles.includes('5x7') || variantTitles.includes('poster')) return 'poster';
  if (t.includes('poster') || t.includes('print') || t.includes('affiche')) return 'poster';
  return null;
}

function getPriceForVariant(variantTitle, productType) {
  const vt = (variantTitle || '').toLowerCase();
  if (productType === 'mug') return PRICES.mug;
  if (productType === 'poster') {
    if (vt.includes('13x18') || vt.includes('5x7')) return PRICES.poster_13x18;
    if (vt.includes('21x29') || vt.includes('8x12')) return PRICES.poster_21x30;
    if (vt.includes('a3') || vt.includes('29.7 x 42') || vt.includes('29,7 x 42')) return PRICES.poster_a3;
    return PRICES.poster_13x18;
  }
  return 0;
}

const delay = (ms) => new Promise(r => setTimeout(r, ms));

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

    // Step 1: Find store
    const storesRes = await fetch('https://ecommerce.gelatoapis.com/v1/stores', { headers });
    const storesData = await storesRes.json();
    const stores = storesData.stores || [];
    const store = stores.find(s =>
      (s.domain || s.name || '').toLowerCase().includes('pancartiviste')
    ) || stores[0];

    if (!store) return Response.json({ error: 'No Gelato store found' }, { status: 404 });
    const STORE_ID = store.id;
    console.log('Using store:', STORE_ID, store.name);

    // Step 2: Fetch ALL Gelato products
    const gelatoProducts = [];
    let offset = 0;
    const limit = 100;
    while (true) {
      const res = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/${STORE_ID}/products?limit=${limit}&offset=${offset}`, { headers });
      if (!res.ok) {
        const txt = await res.text();
        return Response.json({ error: `Gelato API error ${res.status}`, detail: txt.substring(0, 500) }, { status: 500 });
      }
      const data = await res.json();
      const products = data.products || [];
      gelatoProducts.push(...products);
      console.log(`Fetched offset=${offset}: ${products.length} (total: ${gelatoProducts.length})`);
      if (products.length < limit) break;
      offset += limit;
    }
    console.log('Total Gelato products:', gelatoProducts.length);

    // Step 3: Load all existing DB products
    const existing = await base44.asServiceRole.entities.Product.list('created_date', 500);

    // Index by productUid and handle
    const byProductUid = {};
    const byHandle = {};
    for (const p of existing) {
      if (p.productUid) byProductUid[p.productUid] = p;
      if (p.handle) byHandle[p.handle] = p;
    }

    // Step 4: Process ALL products sequentially with delay to avoid rate limits
    let created = 0;
    let updated = 0;
    let i = 0;

    for (const gp of gelatoProducts) {
      i++;
      const productId = gp.id;
      const productType = detectProductType(gp.title, gp.variants);

      // Use Gelato preview image (only source since Shopify is gone)
      const images = gp.previewUrl
        ? [{ url: gp.previewUrl, altText: gp.title }]
        : [];
      console.log(`[${i}/${gelatoProducts.length}] ${gp.title}`);

      const variants = (gp.variants || []).map(v => ({
        title: v.title || 'Default',
        sku: v.sku || '',
        price: getPriceForVariant(v.title, productType).toFixed(2),
        compareAtPrice: null,
        gelatoVariantId: v.id,
      }));

      const gelatoOrderLinks = (gp.variants || []).reduce((acc, v) => {
        acc[v.id] = `https://pancartiviste.store/products/${productId}?variant=${v.id}`;
        return acc;
      }, {});

      const mapped = {
        title: gp.title || '',
        handle: gp.handle || gp.id,
        descriptionHtml: gp.description || '',
        productType: productType || '',
        vendor: 'Gelato',
        status: gp.status || 'active',
        tags: '',
        productUid: productId,
        catalogUid: '',
        catalogTitle: '',
        attributes: {},
        variants,
        images,
        gelatoOrderLinks,
        gelatoPreviewUrl: gp.previewUrl || '',
        createdAt: gp.createdAt || null,
        updatedAt: gp.updatedAt || null,
      };

      const existing_record = byProductUid[productId] || byHandle[gp.handle];
      if (existing_record) {
        // Preserve collections & sortOrder
        mapped.collections = existing_record.collections || [];
        mapped.sortOrder = existing_record.sortOrder ?? null;
        // Preserve manually assigned images if they exist (non-Gelato URLs)
        const manualImages = (existing_record.images || []).filter(img =>
          img.url && !img.url.includes('gelato') && !img.url.includes('amazonaws.com/gelato')
        );
        if (manualImages.length > 0) {
          mapped.images = manualImages;
        }
        await base44.asServiceRole.entities.Product.update(existing_record.id, mapped);
        updated++;
      } else {
        await base44.asServiceRole.entities.Product.create(mapped);
        created++;
      }

      // Wait 800ms between each write to avoid rate limits
      await delay(800);
    }

    console.log(`Done: created=${created}, updated=${updated}`);

    return Response.json({
      success: true,
      storeId: STORE_ID,
      totalProducts: gelatoProducts.length,
      created,
      updated,
    });
  } catch (error) {
    console.log('ERROR:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});