import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SHOPIFY_STORE = 'xiju12-xu.myshopify.com';
const SHOPIFY_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');

async function fetchShopifyProducts(cursor = null) {
  const query = `
    query($cursor: String) {
      products(first: 50, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            handle
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(`https://${SHOPIFY_STORE}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables: { cursor } }),
  });

  const json = await res.json();
  return json.data.products;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Fetch all products from Shopify
  const shopifyMap = {};
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await fetchShopifyProducts(cursor);
    for (const edge of data.edges) {
      const node = edge.node;
      shopifyMap[node.handle] = node.images.edges.map(e => ({
        url: e.node.url,
        altText: e.node.altText || '',
      }));
    }
    hasNextPage = data.pageInfo.hasNextPage;
    cursor = data.pageInfo.endCursor;
  }

  // Fetch all Base44 products
  const products = await base44.asServiceRole.entities.Product.list('created_date', 500);
  let updated = 0;
  let skipped = 0;

  for (const product of products) {
    const d = product.data || product;
    const images = shopifyMap[d.handle];
    if (images && images.length > 0) {
      await base44.asServiceRole.entities.Product.update(product.id, {
        ...d,
        images,
      });
      updated++;
    } else {
      skipped++;
    }
  }

  return Response.json({
    success: true,
    updated,
    skipped,
    total: products.length,
    shopifyProducts: Object.keys(shopifyMap).length,
  });
});