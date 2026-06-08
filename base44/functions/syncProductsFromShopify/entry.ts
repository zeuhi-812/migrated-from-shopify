import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// v6 - correct cursor pagination via page_info
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const SHOP = Deno.env.get('SHOPIFY_SHOP_DOMAIN');
    const TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');

    if (!SHOP || !TOKEN) {
      return Response.json({ error: 'Missing SHOPIFY_SHOP_DOMAIN or SHOPIFY_ADMIN_TOKEN' }, { status: 400 });
    }

    console.log('SYNC_V6 SHOP:', SHOP);

    // --- Step 1: Fetch ALL products from Shopify using cursor-based pagination ---
    const allProducts = [];
    let pageInfo = null;
    let isFirstPage = true;

    while (true) {
      let url;
      if (isFirstPage) {
        url = `https://${SHOP}/admin/api/2024-01/products.json?limit=250&status=any`;
        isFirstPage = false;
      } else if (pageInfo) {
        url = `https://${SHOP}/admin/api/2024-01/products.json?limit=250&page_info=${pageInfo}`;
      } else {
        break;
      }

      console.log('SYNC_V6 fetching:', url.substring(0, 150));

      const res = await fetch(url, {
        headers: { 'X-Shopify-Access-Token': TOKEN },
      });

      if (!res.ok) {
        const body = await res.text();
        console.log('SYNC_V6 HTTP error:', res.status, body.substring(0, 300));
        return Response.json({ error: `Shopify API error ${res.status}`, detail: body.substring(0, 300) }, { status: 500 });
      }

      const data = await res.json();
      const batch = data.products || [];
      allProducts.push(...batch);
      console.log(`SYNC_V6 page fetched: ${batch.length} products (total so far: ${allProducts.length})`);

      // Parse Link header for next page_info cursor
      const linkHeader = res.headers.get('Link') || '';
      const nextMatch = linkHeader.match(/<[^>]*[?&]page_info=([^&>]+)[^>]*>;\s*rel="next"/);
      if (nextMatch) {
        pageInfo = nextMatch[1];
      } else {
        break; // no more pages
      }
    }

    console.log('SYNC_V6 total fetched from Shopify:', allProducts.length);

    // --- Step 2: Load all existing products from DB ---
    const existing = await base44.asServiceRole.entities.Product.list('created_date', 1000);
    const byHandle = {};
    for (const p of existing) {
      const d = p.data || p;
      if (d.handle) byHandle[d.handle] = p;
    }
    console.log('SYNC_V6 existing in DB:', existing.length);

    // --- Step 3: Upsert ---
    let created = 0;
    let updated = 0;

    for (const sp of allProducts) {
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
          shopifyVariantId: String(v.id),
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

    console.log(`SYNC_V6 done: created=${created}, updated=${updated}`);

    return Response.json({
      success: true,
      totalFetchedFromShopify: allProducts.length,
      created,
      updated,
      totalInDB: created + updated,
    });
  } catch (error) {
    console.log('SYNC_V6 ERROR:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});