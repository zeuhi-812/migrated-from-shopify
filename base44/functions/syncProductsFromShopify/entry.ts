import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SHOP = Deno.env.get('SHOPIFY_SHOP_DOMAIN');
const TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');

async function fetchAllShopifyProducts() {
  const products = [];
  let url = `https://${SHOP}/admin/api/2024-01/products.json?limit=250&status=any`;

  while (url) {
    const res = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (!data.products) break;
    products.push(...data.products);

    // Parse Link header for next page
    const linkHeader = res.headers.get('Link') || '';
    const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
    url = nextMatch ? nextMatch[1] : null;
  }
  return products;
}

function mapProduct(p) {
  return {
    title: p.title || '',
    handle: p.handle || '',
    descriptionHtml: p.body_html || '',
    productType: p.product_type || '',
    vendor: p.vendor || '',
    status: p.status || '',
    tags: p.tags || '',
    variants: (p.variants || []).map(v => ({
      title: v.title,
      sku: v.sku,
      price: v.price,
      compareAtPrice: v.compare_at_price,
      inventoryQuantity: v.inventory_quantity,
    })),
    images: (p.images || []).map(img => ({
      url: img.src,
      altText: img.alt || '',
    })),
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  };
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const shopifyProducts = await fetchAllShopifyProducts();

  // Load existing products to match by handle
  const existing = await base44.asServiceRole.entities.Product.list('created_date', 500);
  const byHandle = {};
  for (const p of existing) {
    const d = p.data || p;
    byHandle[d.handle] = p;
  }

  let created = 0;
  let updated = 0;

  for (const sp of shopifyProducts) {
    const mapped = mapProduct(sp);
    const existing = byHandle[mapped.handle];
    if (existing) {
      const d = existing.data || existing;
      // Preserve collections and sortOrder from existing record
      mapped.collections = d.collections || [];
      mapped.sortOrder = d.sortOrder ?? null;
      await base44.asServiceRole.entities.Product.update(existing.id, mapped);
      updated++;
    } else {
      await base44.asServiceRole.entities.Product.create(mapped);
      created++;
    }
  }

  return Response.json({
    success: true,
    total: shopifyProducts.length,
    created,
    updated,
  });
});