import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// v5 - full pagination + variant IDs + STORE_URL fallback
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let SHOP = Deno.env.get('SHOPIFY_SHOP_DOMAIN');
    const TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
    const STORE_URL = Deno.env.get('STORE_URL');

    // Fallback: extract domain from STORE_URL if SHOP is not set or missing
    if ((!SHOP || !SHOP.includes('.myshopify.com')) && STORE_URL) {
      try {
        const u = new URL(STORE_URL.startsWith('http') ? STORE_URL : `https://${STORE_URL}`);
        SHOP = u.hostname;
      } catch (_) {}
    }

    console.log('SYNC_V5 SHOP:', SHOP);
    console.log('SYNC_V5 TOKEN present:', !!TOKEN, 'prefix:', TOKEN?.substring(0, 8));
    console.log('SYNC_V5 STORE_URL:', STORE_URL);

    if (!SHOP || !TOKEN) {
      return Response.json({ error: 'Missing SHOPIFY_SHOP_DOMAIN or SHOPIFY_ADMIN_TOKEN' }, { status: 400 });
    }

    // Fetch ALL products with cursor-based pagination (Link header)
    const products = [];
    let url = `https://${SHOP}/admin/api/2024-01/products.json?limit=250&status=any`;

    while (url) {
      console.log('SYNC_V5 fetching page:', url.substring(0, 120));
      const res = await fetch(url, {
        headers: {
          'X-Shopify-Access-Token': TOKEN,
          'Content-Type': 'application/json',
        },
      });

      console.log('SYNC_V5 HTTP status:', res.status);

      if (!res.ok) {
        const body = await res.text();
        console.log('SYNC_V5 error body:', body.substring(0, 500));
        return Response.json({ error: `Shopify API error ${res.status}`, body: body.substring(0, 500) }, { status: 500 });
      }

      const data = await res.json();
      const batch = data.products || [];
      console.log('SYNC_V5 batch size:', batch.length);

      if (batch.length === 0) break;
      products.push(...batch);

      // Follow Link header for next page
      const link = res.headers.get('Link') || '';
      const next = link.match(/<([^>]+)>;\s*rel="next"/);
      url = next ? next[1] : null;
    }

    console.log('SYNC_V5 total products fetched from Shopify:', products.length);

    // Load existing products to detect creates vs updates
    const existing = await base44.asServiceRole.entities.Product.list('created_date', 1000);
    const byHandle = {};
    for (const p of existing) {
      const d = p.data || p;
      if (d.handle) byHandle[d.handle] = p;
    }

    console.log('SYNC_V5 existing in DB:', existing.length);

    let created = 0;
    let updated = 0;

    for (const sp of products) {
      const mapped = {
        title: sp.title || '',
        handle: sp.handle || '',
        descriptionHtml: sp.body_html || '',
        productType: sp.product_type || '',
        vendor: sp.vendor || '',
        status: sp.status || '',
        tags: sp.tags || '',
        variants: (sp.variants || []).map(v => ({
          title: v.title,
          sku: v.sku || '',
          price: v.price,
          compareAtPrice: v.compare_at_price || null,
          inventoryQuantity: v.inventory_quantity ?? 0,
          shopifyVariantId: String(v.id), // store variant ID for checkout links
        })),
        images: (sp.images || []).map(img => ({
          url: img.src,
          altText: img.alt || '',
        })),
        createdAt: sp.created_at,
        updatedAt: sp.updated_at,
      };

      const existingProduct = byHandle[mapped.handle];
      if (existingProduct) {
        const d = existingProduct.data || existingProduct;
        mapped.collections = d.collections || [];
        mapped.sortOrder = d.sortOrder ?? null;
        await base44.asServiceRole.entities.Product.update(existingProduct.id, mapped);
        updated++;
      } else {
        await base44.asServiceRole.entities.Product.create(mapped);
        created++;
      }
    }

    return Response.json({ success: true, total: products.length, created, updated, existingInDB: existing.length });
  } catch (error) {
    console.log('SYNC_V5 ERROR:', error.message, error.stack);
    return Response.json({ error: error.message }, { status: 500 });
  }
});