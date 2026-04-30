import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SHOPIFY_STORE = 'xiju12-xu.myshopify.com';
const SHOPIFY_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');

const COLLECTION_HANDLES = [
  'mugs-le-coeur-manifeste',
  'posters-coeur-de-lutte',
  'mugs-heart-of-protest',
  'posters-heart-of-protest',
  'vulva-la-revolution-fr',
  'posters-vulva-la-revolution-fr',
  'vulva-la-revolution',
  'posters-vulva-la-revolution',
];

async function fetchCollectionProducts(handle, cursor = null) {
  const query = `
    query($handle: String!, $cursor: String) {
      collection(handle: $handle) {
        products(first: 50, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node { handle }
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
    body: JSON.stringify({ query, variables: { handle, cursor } }),
  });

  const json = await res.json();
  return json.data?.collection?.products;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Build a map: productHandle -> [collectionHandle, ...]
  const productCollectionsMap = {};

  for (const collectionHandle of COLLECTION_HANDLES) {
    let cursor = null;
    let hasNextPage = true;

    while (hasNextPage) {
      const data = await fetchCollectionProducts(collectionHandle, cursor);
      if (!data) break;

      for (const edge of data.edges) {
        const productHandle = edge.node.handle;
        if (!productCollectionsMap[productHandle]) {
          productCollectionsMap[productHandle] = [];
        }
        if (!productCollectionsMap[productHandle].includes(collectionHandle)) {
          productCollectionsMap[productHandle].push(collectionHandle);
        }
      }

      hasNextPage = data.pageInfo.hasNextPage;
      cursor = data.pageInfo.endCursor;
    }
  }

  // Update all Base44 products with their collections
  const products = await base44.asServiceRole.entities.Product.list();
  let updated = 0;
  let skipped = 0;

  for (const product of products) {
    const d = product.data || product;
    const collections = productCollectionsMap[d.handle] || [];
    await base44.asServiceRole.entities.Product.update(product.id, {
      ...d,
      collections,
    });
    if (collections.length > 0) updated++;
    else skipped++;
  }

  return Response.json({
    success: true,
    updated,
    skipped,
    total: products.length,
    collectionsSynced: Object.keys(productCollectionsMap).length,
    sampleMap: Object.fromEntries(Object.entries(productCollectionsMap).slice(0, 5)),
  });
});