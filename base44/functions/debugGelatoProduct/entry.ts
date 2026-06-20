import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const API_KEY = Deno.env.get('PANCARTVISTE_API_KEY');
    const headers = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
    const STORE_ID = '005f4a58-7b33-4bbe-927e-6fafe9e57427';

    // Fetch first page of store products
    const listRes = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/${STORE_ID}/products?limit=2`, { headers });
    const listData = await listRes.json();
    const products = listData.products || [];

    if (products.length === 0) return Response.json({ error: 'No products' });

    // Get full detail of first product
    const productId = products[0].id;
    const detailRes = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/${STORE_ID}/products/${productId}`, { headers });
    const detail = await detailRes.json();

    // Get shipping profiles WITH zones for the current store
    const r2 = await fetch(`https://ecommerce.gelatoapis.com/v1/stores/${STORE_ID}/shipping-profiles?limit=3&expand[]=zones`, { headers });
    const d2 = await r2.json();

    // Get product prices from catalog API (includes shipping info)
    const r4 = await fetch('https://product.gelatoapis.com/v3/products/mug_product_msz_11-oz_mmat_ceramic-green_cl_4-0/prices?country=FR&currency=EUR', { headers });
    const d4 = await r4.json();

    // Get product prices for a poster
    const r5 = await fetch('https://product.gelatoapis.com/v3/products/fine-art-print_product_fap-210-290_pf_pt-290-200_ver_po_sl/prices?country=FR&currency=EUR', { headers });
    const d5 = await r5.json();

    return Response.json({
      shippingProfilesWithZones: { status: r2.status, firstProfile: d2?.profiles?.[0] || d2 },
      mugPrices: { status: r4.status, data: d4 },
      posterPrices: { status: r5.status, data: d5 },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});