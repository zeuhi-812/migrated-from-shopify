import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const COL = 'posters-heart-of-protest';

function norm(s) {
  return (s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/["«»""'']/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

const HEART_TITLES = [
  'Love Tune',              // 1
  'Love Resists',           // 2
  'Locked on Love',         // 3
  'Locked on Resistance',   // 4
  'Pick my Love',           // 5
  'My Heart Resists',       // 6
  'Pick my Heart',          // 7
  'Pick my Resistance',     // 8
  'Love Freely',            // 9
  'To Love is to Resist',   // 10
  'Solidarity',             // 11
  'Solidarity Resists',     // 12
  'Generous Heart',         // 13
  'Generous Artichoke',     // 14
  'Generous Resistance',    // 15
  'Tender Heart',           // 16
  'Resistant Artichoke',    // 17
  'Heart of Protest',       // 18
  'Resisting Guts',         // 19
  'Butter Heart',           // 20
  'Melted Resistance',      // 21
  'Butter Love',            // 22
  'Buttered Resistance',    // 23
  'Shattered Heart',        // 24
  'Shattered Resistance',   // 25
  'Spark the Flame',        // 26
  'Ashes Resistance',       // 27
];

const HEART_NORM_SET = new Set(HEART_TITLES.map(norm));

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const allProducts = await base44.asServiceRole.entities.Product.list('-created_date', 500);

  const removed = [];
  const updated = [];

  // Process all products
  for (const product of allProducts) {
    const n = norm(product.title);
    const currentCols = product.collections || [];
    const hasCol = currentCols.includes(COL);

    // Only process posters
    const isPoster = n.includes('poster') || (product.productType || '').toLowerCase().includes('poster');
    
    // Check if product title contains one of the heart titles
    const matchedIdx = isPoster ? HEART_TITLES.findIndex(t => n.includes(norm(t))) : -1;
    if (matchedIdx >= 0) {
      // This should be in the collection
      const sortOrder = matchedIdx + 1;

      if (!hasCol || product.sortOrder !== sortOrder) {
        const newCols = hasCol ? currentCols : [...currentCols, COL];
        await base44.asServiceRole.entities.Product.update(product.id, {
          ...product,
          collections: newCols,
          sortOrder,
        });
        updated.push(`${sortOrder} | ${product.title}`);
      }
    } else if (hasCol) {
      // Should NOT be in collection - remove it
      const newCols = currentCols.filter(c => c !== COL);
      await base44.asServiceRole.entities.Product.update(product.id, {
        ...product,
        collections: newCols,
      });
      removed.push(product.title);
    }

    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 80));
  }

  // Check for missing titles (only among posters)
  const posterTitles = allProducts
    .filter(p => norm(p.title).includes('poster') || (p.productType || '').toLowerCase().includes('poster'))
    .map(p => norm(p.title));
  const notFound = HEART_TITLES.filter(t => !posterTitles.some(pt => pt.includes(norm(t))));

  return Response.json({
    success: true,
    removedCount: removed.length,
    removed,
    updatedCount: updated.length,
    notFound,
  });
});