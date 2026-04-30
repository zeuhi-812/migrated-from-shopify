import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SHOP_DOMAIN = 'xiju12-xu.myshopify.com';

// Shopify CDN URL pattern: https://{shop}/cdn/shop/files/{uuid}.{ext}
// The altText field contains the UUID of the file
// We try jpg first, then png as fallback extension
function buildImageUrl(uuid) {
  if (!uuid) return null;
  // Clean the uuid (remove any extension if present)
  const cleanUuid = uuid.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  return `https://${SHOP_DOMAIN}/cdn/shop/files/${cleanUuid}.jpg`;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Parse optional offset from body
  let offset = 0;
  try {
    const body = await req.json();
    offset = body.offset || 0;
  } catch (_) {}

  const BATCH = 20;
  // List products with pagination - using created_date ascending to get oldest first
  const allProducts = await base44.asServiceRole.entities.Product.list('created_date', 250);
  // Filter only those without valid image URLs
  const needsUpdate = allProducts.filter(product => {
    const d = product.data || product;
    const images = d.images || [];
    return images.length > 0 && images.some(img => !img.url || img.url === null);
  });
  const products = needsUpdate.slice(offset, offset + BATCH);
  let updated = 0;
  let skipped = 0;

  for (const product of products) {
    const d = product.data || product;
    const images = d.images || [];

    // Build URLs from altText UUIDs
    const updatedImages = images
      .filter(img => img.altText)
      .map(img => ({
        url: buildImageUrl(img.altText),
        altText: img.altText,
      }));

    if (updatedImages.length === 0) {
      skipped++;
      continue;
    }

    await base44.asServiceRole.entities.Product.update(product.id, {
      ...d,
      images: updatedImages,
    });
    updated++;
  }

  return Response.json({
    success: true,
    batch: products.length,
    updated,
    skipped,
    nextOffset: offset + products.length,
    done: products.length < BATCH,
  });
});