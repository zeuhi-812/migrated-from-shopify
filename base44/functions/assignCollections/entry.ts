import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

function getCollections(handle, title) {
  const h = (handle || '').toLowerCase();
  const t = (title || '').toLowerCase();

  const isMug = h.includes('mug') || t.includes('mug');
  const isPoster = h.includes('poster') || t.includes('poster');

  const isVulva = h.includes('vulva') || h.includes('tomate') || h.includes('fraise') ||
    h.includes('strawberr') || h.includes('tomato') || h.includes('nicoise') ||
    h.includes('woke') || t.includes('vulva') || t.includes('tomate') ||
    t.includes('fraise') || t.includes('strawberry') || t.includes('tomato') ||
    t.includes('niçoise') || t.includes('woke');

  // vulva-la-revolution (without -fr) = EN; vulva-la-revolution-fr = FR
  const isVulvaEN = h.startsWith('vulva-la-revolution') && !h.includes('-fr');

  const frenchWords = ['coeur', 'resister', 'rallume', 'lutte', 'fondu',
    'tripes', 'eclaté', 'eclate', 'resiste', 'flamme', 'aimer', 'genereuse',
    'beurre', 'motte', 'nicoise', 'prets', 'soumise', 'tomate', 'fraise',
    'revolution-fr'];

  const isFR = frenchWords.some(w => h.includes(w)) && !isVulvaEN;

  if (isVulva) {
    if (isMug) return isFR ? ['vulva-la-revolution-fr'] : ['vulva-la-revolution'];
    if (isPoster) return isFR ? ['posters-vulva-la-revolution-fr'] : ['posters-vulva-la-revolution'];
  }

  if (isMug) return isFR ? ['mugs-le-coeur-manifeste'] : ['mugs-heart-of-protest'];
  if (isPoster) return isFR ? ['posters-coeur-de-lutte'] : ['posters-heart-of-protest'];

  return [];
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  let offset = 0;
  let dryRun = false;
  try {
    const body = await req.json();
    offset = body.offset || 0;
    dryRun = body.dryRun || false;
  } catch (_) {}

  const BATCH = 5;
  const products = await base44.asServiceRole.entities.Product.list('created_date', 250);
  const batch = products.slice(offset, offset + BATCH);

  const results = [];
  for (const product of batch) {
    const d = product.data || product;
    const collections = getCollections(d.handle, d.title);
    if (!dryRun) {
      await base44.asServiceRole.entities.Product.update(product.id, { ...d, collections });
    }
    results.push({ handle: d.handle, title: d.title, collections });
  }

  return Response.json({
    success: true,
    dryRun,
    processed: batch.length,
    total: products.length,
    nextOffset: offset + batch.length,
    done: offset + batch.length >= products.length,
    results,
  });
});