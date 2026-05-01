import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

function getCollections(handle, title) {
  const h = (handle || '').toLowerCase();
  const t = (title || '').toLowerCase();

  const isMug = h.includes('mug') || t.includes('mug');
  const isPoster = h.includes('poster') || t.includes('poster');

  const isVulva = h.includes('vulva') || h.includes('tomate') || h.includes('fraise') ||
    h.includes('strawberr') || h.includes('tomato') || h.includes('nicoise') ||
    h.includes('woke') || t.includes('vulva');

  if (isVulva) {
    const frenchVulvaWords = ['révolution', 'tomate', 'fraise', 'misandrie',
      'toustes', 'ensemble', 'patriarcat', 'faites', 'pas-la', 'misogynie',
      'céramique', 'prêts', 'niçoise'];
    const englishOnlyHandle = !h.includes('tomate') && !h.includes('fraise') &&
      !h.includes('patriarcat') && !h.includes('toustes') && !h.includes('pas-la') &&
      !h.includes('faites') && !h.includes('misandrie') && !h.includes('misogynie') &&
      !h.includes('nicoise') && !h.includes('prets');
    const englishOnlyTitle = !frenchVulvaWords.some(w => t.includes(w));
    const isVulvaEN = (h.startsWith('vulva-la-revolution') && !h.includes('-fr')) ||
      (englishOnlyHandle && englishOnlyTitle && (h.includes('tomatoe') || h.includes('all-together') || h.includes('make-love') || h.includes('not-war') || h.includes('anti-patriarchy')));
    const isFR = !isVulvaEN;
    if (isMug) return isFR ? ['vulva-la-revolution-fr'] : ['vulva-la-revolution'];
    if (isPoster) return isFR ? ['posters-vulva-la-revolution-fr'] : ['posters-vulva-la-revolution'];
    return [];
  }

  const frenchHandleWords = [
    'ceramique', 'coeur', 'lutte', 'aimer', 'amour', 'solidaire', 'rallume',
    'fondu', 'resiste', 'tripes', 'eclat', 'flamme', 'genereuse', 'beurre',
    'motte', 'prets', 'soumise', 'politique', 'cle-de', 'pique-l', 'pic-de',
    'choeur', 'cendres', 'manifeste', '-fr-',
  ];

  const isFrenchTitle = t.includes('céramique') || frenchHandleWords.some(w => h.includes(w));

  if (isMug) return isFrenchTitle ? ['mugs-le-coeur-manifeste'] : ['mugs-heart-of-protest'];
  if (isPoster) return isFrenchTitle ? ['posters-coeur-de-lutte'] : ['posters-heart-of-protest'];

  return [];
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  let dryRun = false;
  let offset = 0;
  try {
    const body = await req.json();
    dryRun = body.dryRun || false;
    offset = body.offset || 0;
  } catch (_) {}

  const BATCH = 20;
  const products = await base44.asServiceRole.entities.Product.list('created_date', 250);
  const batch = products.slice(offset, offset + BATCH);

  const results = [];
  for (const product of batch) {
    const d = product.data || product;
    const collections = getCollections(d.handle, d.title);
    if (!dryRun) {
      await base44.asServiceRole.entities.Product.update(product.id, { collections });
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