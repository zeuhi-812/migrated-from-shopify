import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const COL = 'posters-heart-of-protest';

function norm(s) {
  return (s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/["«»""'']/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

// French words indicating the poster is FR, not EN
const FR_WORDS = ['coeur', 'lutte', 'resiste', 'resister', 'rallume', 'fondu', 'tripes',
  'eclate', 'eclaté', 'aimer', 'genereuse', 'beurre', 'motte', 'solidaires',
  'politique', 'flamme', 'cendres', 'choeur', 'cle', 'pique'];

const HEART_TITLES = [
  'Love Tune',              // 1
  'Love Resists',           // 2
  'Locked on Love',         // 3
  'Locked on Resistance',   // 4
  'Pick my Love',           // 5
  'My Heart Resists',       // 6
  'Pick my Heart',          // 7
  'Resist my Heart',        // 8
  'Love Freely',            // 9
  'To Love is to Resist',   // 10
  'Solidarity',             // 11
  'Solidarity Resist',      // 12
  'Generous Heart',         // 13
  'Tender Artichoke',       // 14
  'Generous Resistance',    // 15
  'Tender Heart',           // 16
  'Resistant Heartichoke',  // 17
  'Butter Love',            // 18
  'Melted Resistance',      // 19
  'Butter Heart',           // 20
  'Butter Heart',           // 21
  'Heart of Protest',       // 22
  'Resisting Guts',         // 23
  'Shattered Heart',        // 24
  'Shattered Resistance',   // 25
  'Spark the Flame',        // 26
  'Ashes Resistance',       // 27
];

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const allProducts = await base44.asServiceRole.entities.Product.list('-created_date', 500);

  // Collect all posters
  const posters = allProducts.filter(p => {
    const n = norm(p.title);
    return n.includes('poster') || (p.productType || '').toLowerCase().includes('poster');
  });

  // Determine if a poster is French
  function isFrench(product) {
    const n = norm(product.title);
    const hasFRCol = (product.collections || []).some(c => c.includes('fr') || c.includes('coeur') || c.includes('lutte'));
    const hasFRWord = FR_WORDS.some(w => n.includes(w));
    return hasFRCol || hasFRWord;
  }

  const removed = [];
  const updated = [];
  const usedIds = new Set();

  // Count how many times each title appears (for position 20+21 both "Butter Heart")
  const titleCounts = {};
  for (const t of HEART_TITLES) {
    const nt = norm(t);
    titleCounts[nt] = (titleCounts[nt] || 0) + 1;
  }
  const titleUsed = {}; // track how many times we've used each title

  // For each position, find the best EN poster match (not French, not already used)
  for (let i = 0; i < HEART_TITLES.length; i++) {
    const targetNorm = norm(HEART_TITLES[i]);
    const sortOrder = i + 1;

    // Find all matching EN posters (not French, not used)
    const candidates = posters.filter(p => {
      if (usedIds.has(p.id)) return false;
      if (isFrench(p)) return false;
      return norm(p.title).includes(targetNorm);
    });

    // Prefer exact match: title without " Poster" suffix equals the target
    candidates.sort((a, b) => {
      const aExact = norm(a.title) === targetNorm + ' poster';
      const bExact = norm(b.title) === targetNorm + ' poster';
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return 0;
    });

    if (candidates.length > 0) {
      const best = candidates[0];
      usedIds.add(best.id);
      titleUsed[targetNorm] = (titleUsed[targetNorm] || 0) + 1;

      const currentCols = best.collections || [];
      const newCols = currentCols.includes(COL) ? currentCols : [...currentCols, COL];
      if (!currentCols.includes(COL) || best.sortOrder !== sortOrder) {
        await base44.asServiceRole.entities.Product.update(best.id, {
          ...best,
          collections: newCols,
          sortOrder,
        });
        updated.push(`${sortOrder} | ${best.title}`);
      }

      // Remove extra candidates beyond what we need
      const needed = titleCounts[targetNorm] || 1;
      const usedSoFar = titleUsed[targetNorm] || 1;
      // Only mark as duplicate if we already have enough for all positions of this title
      // (This will be handled in the straggler pass at the end)
    }

    await new Promise(r => setTimeout(r, 80));
  }

  // Remove any remaining stragglers: posters in COL that aren't among the 27 used
  for (const product of posters) {
    if (usedIds.has(product.id)) continue;
    const currentCols = product.collections || [];
    if (currentCols.includes(COL)) {
      const newCols = currentCols.filter(c => c !== COL);
      await base44.asServiceRole.entities.Product.update(product.id, { ...product, collections: newCols });
      removed.push(product.title);
      await new Promise(r => setTimeout(r, 50));
    }
  }

  // Check for missing titles
  const enPosters = posters.filter(p => !isFrench(p));
  const enPosterNorms = enPosters.map(p => norm(p.title));
  const notFound = HEART_TITLES.filter(t => !enPosterNorms.some(pt => pt.includes(norm(t))));

  return Response.json({
    success: true,
    removedCount: removed.length,
    removed,
    updatedCount: updated.length,
    notFound,
  });
});