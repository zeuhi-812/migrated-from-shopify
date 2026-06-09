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

    return Response.json({
      listSample: products[0],
      detail,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});