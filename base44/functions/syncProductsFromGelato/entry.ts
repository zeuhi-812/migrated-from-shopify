import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Prix fixes par type de produit (hors frais de port Gelato)
const PRICES = {
  mug: 14.16,
  poster_13x18: 8.06,
  poster_21x30: 9.66,
  poster_a3: 13.80,
};

// Frais de port estimés Gelato (EU standard)
const SHIPPING = {
  mug: 4.50,
  poster: 3.50,
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
  // Check variants for poster sizes
  const variantTitles = (variants || []).map(v => (v.title || '').toLowerCase()).join(' ');
  if (variantTitles.includes('13x18') || variantTitles.includes('5x7') || variantTitles.includes('poster')) return 'poster';
  if (t.includes('poster') || t.includes('print') || t.includes('affiche')) return 'poster';
  return null;
}

function getPriceForVariant(variantTitle, productType) {
  const vt = (variantTitle || '').toLowerCase();
  if (productType === 'mug') return PRICES.mug + SHIPPING.mug;
  if (productType === 'poster') {
    if (vt.includes('13x18') || vt.includes('5x7')) return PRICES.poster_13x18 + SHIPPING.poster;
    if (vt.includes('21x29') || vt.includes('8x12')) return PRICES.poster_21x30 + SHIPPING.poster;
    if (vt.includes('a3') || vt.includes('29.7 x 42') || vt.includes('29,7 x 42')) return PRICES.poster_a3 + SHIPPING.poster;
    return PRICES.poster_13x18 + SHIPPING.poster; // fallback
  }
  return 0;
}

// Build a Gelato order link (direct checkout URL for manual store)
function buildGelatoOrderUrl(storeId, productId, variantId) {
  return `https://ecommerce.gelatoapis.com/v1/stores/${storeId}/orders?productId=${productId}&variantId=${variantId}`;
}

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

    // Optional: startIndex to resume from a specific product (default 0)
    const body = await req.json().catch(() => ({}));
    const startIndex = body.startIndex || 0;
    const batchSize = body.batchSize || 30; // process 30 products at a time

    const headers = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };

    // Step 1: Find the store UUID
    const storesRes = await fetch('https://ecommerce.gelatoapis.com/v1/stores', { headers });
    const storesData = await storesRes.json();
    const stores = storesData.stores || [];
    const store = stores.find(s =>
      (s.domain || s.name || '').toLowerCase().includes('pancartiviste')
    ) || stores[0];

    if (!store) return Response.json({ error: 'No Gelato store found' }, { status: 404 });
    const STORE_ID = store.id;
    console.log('Using store:', STORE_ID, store.name);

    // Step 2: Fetch all Gelato store products
    const gelatoProducts = [];
    let offset = 0;
    const limit = 100;
    while (true) {
      const res = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/${STORE_ID}/products?limit=${limit}&offset=${offset}`, { headers });
      if (!res.ok) {
        const body = await res.text();
        return Response.json({ error: `Gelato API error ${res.status}`, detail: body.substring(0, 500) }, { status: 500 });
      }
      const data = await res.json();
      const products = data.products || [];
      gelatoProducts.push(...products);
      console.log(`Fetched offset=${offset}: ${products.length} (total: ${gelatoProducts.length})`);
      if (products.length < limit) break;
      offset += limit;
    }
    console.log('Total Gelato products:', gelatoProducts.length);

    // Step 3: Load all existing DB products (paginated to avoid rate limits)
    let existing = [];
    let page = 1;
    while (true) {
      const batch = await base44.asServiceRole.entities.Product.list('created_date', 200, (page - 1) * 200);
      existing.push(...batch);
      if (batch.length < 200) break;
      page++;
      await new Promise(r => setTimeout(r, 300));
    }

    // Index Shopify products by normalized title for image matching
    const shopifyByTitle = {};
    for (const p of existing) {
      if (p.vendor !== 'Gelato' && (p.images || []).length > 0) {
        shopifyByTitle[normalizeTitle(p.title)] = p;
      }
    }

    // Index Gelato products by productUid and handle
    const byProductUid = {};
    const byHandle = {};
    for (const p of existing) {
      if (p.productUid) byProductUid[p.productUid] = p;
      if (p.handle) byHandle[p.handle] = p;
    }

    // Step 4: Upsert Gelato products with images + prices (process batchSize at a time)
    const productsBatch = gelatoProducts.slice(startIndex, startIndex + batchSize);
    console.log(`Processing products ${startIndex} to ${startIndex + productsBatch.length - 1} of ${gelatoProducts.length}`);

    let created = 0;
    let updated = 0;
    let i = 0;

    for (const gp of productsBatch) {
      i++;
      // Delay every 5 products to avoid rate limiting
      if (i % 5 === 0) await new Promise(r => setTimeout(r, 600));
      const productId = gp.id;
      const productType = detectProductType(gp.title, gp.variants);

      // Match images from Shopify by normalized title
      const normalTitle = normalizeTitle(gp.title);
      const shopifyMatch = shopifyByTitle[normalTitle];
      let images = [];

      if (shopifyMatch && (shopifyMatch.images || []).length > 0) {
        // Use Shopify images (already stored, permanent CDN URLs)
        images = shopifyMatch.images;
        console.log(`Matched images from Shopify for: ${gp.title}`);
      } else if (gp.previewUrl) {
        // Fallback: use Gelato preview image
        images = [{ url: gp.previewUrl, altText: gp.title }];
        console.log(`Using Gelato previewUrl for: ${gp.title}`);
      }

      // Build variants with prices
      const variants = (gp.variants || []).map(v => {
        const price = getPriceForVariant(v.title, productType);
        return {
          title: v.title || 'Default',
          sku: v.sku || '',
          price: price.toFixed(2),
          compareAtPrice: null,
          gelatoVariantId: v.id,
        };
      });

      // Build order URL per variant (stored as gelatoOrderLinks)
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

      const existing_record = byProductUid[productId] || byHandle[gp.id];
      if (existing_record) {
        // Preserve collections & sortOrder
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

    const nextIndex = startIndex + productsBatch.length;
    const hasMore = nextIndex < gelatoProducts.length;

    return Response.json({
      success: true,
      storeId: STORE_ID,
      totalProducts: gelatoProducts.length,
      processed: productsBatch.length,
      startIndex,
      nextIndex: hasMore ? nextIndex : null,
      hasMore,
      created,
      updated,
    });
  } catch (error) {
    console.log('ERROR:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});