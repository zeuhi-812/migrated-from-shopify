import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// v3 - forced redeploy
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const SHOP = Deno.env.get('SHOPIFY_SHOP_DOMAIN');
    const TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');

    console.log('SYNC_V3 SHOP:', SHOP, 'TOKEN_PREFIX:', TOKEN?.substring(0, 10));

    const products = [];
    let url = `https://${SHOP}/admin/api/2024-01/products.json?limit=250&status=any`;

    while (url) {
      console.log('SYNC_V3 fetching:', url);
      const res = await fetch(url, {
        headers: { 'X-Shopify-Access-Token': TOKEN },
      });
      const text = await res.text();
      console.log('SYNC_V3 status:', res.status, 'body:', text.substring(0, 400));

      let data;
      try { data = JSON.parse(text); } catch (e) { break; }

      if (!data.products || data.products.length === 0) break;
      products.push(...data.products);

      const link = res.headers.get('Link') || '';
      const next = link.match(/<([^>]+)>;\s*rel="next"/);
      url = next ? next[1] : null;
    }

    console.log('SYNC_V3 total:', products.length);

    const existing = await base44.asServiceRole.entities.Product.list('created_date', 500);
    const byHandle = {};
    for (const p of existing) {
      const d = p.data || p;
      byHandle[d.handle] = p;
    }

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
          sku: v.sku,
          price: v.price,
          compareAtPrice: v.compare_at_price,
          inventoryQuantity: v.inventory_quantity,
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

    return Response.json({ success: true, total: products.length, created, updated });
  } catch (error) {
    console.log('SYNC_V3 ERROR:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});