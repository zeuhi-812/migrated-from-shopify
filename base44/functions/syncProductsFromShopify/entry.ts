import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const SHOP = Deno.env.get('SHOPIFY_SHOP_DOMAIN');
    const TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');

    console.log('[Shopify] SHOP:', SHOP, '| TOKEN set:', !!TOKEN);

    const products = [];
    let url = `https://${SHOP}/admin/api/2024-01/products.json?limit=250&status=any`;

    while (url) {
      console.log('[Shopify] fetching:', url);
      const res = await fetch(url, {
        headers: {
          'X-Shopify-Access-Token': TOKEN,
          'Content-Type': 'application/json',
        },
      });
      const text = await res.text();
      console.log('[Shopify] status:', res.status, '| body (first 300):', text.substring(0, 300));

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.log('[Shopify] JSON parse error:', e.message);
        break;
      }

      console.log('[Shopify] products in page:', data.products?.length ?? 'N/A', '| keys:', Object.keys(data));

      if (!data.products || data.products.length === 0) break;
      products.push(...data.products);

      const linkHeader = res.headers.get('Link') || '';
      const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
      url = nextMatch ? nextMatch[1] : null;
    }

    console.log('[Shopify] total products fetched:', products.length);

    // Load existing products to match by handle
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
    console.log('[ERROR]', error.message, error.stack);
    return Response.json({ error: error.message }, { status: 500 });
  }
});