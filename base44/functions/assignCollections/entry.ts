import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Determine collection from product title and handle
// Rules:
// - FR mug title contains "Céramique" or "Ceramique" (accented), EN contains "Ceramic" (no accent)
// - FR poster titles are in French, EN poster titles are in English
// - Vulva series: handles contain "vulva", "tomate", "fraise", "strawberr", "tomato", "nicoise", "woke"
// - Vulva FR: handle contains "-fr" suffix OR French vulva keywords; Vulva EN: starts with "vulva-la-revolution" without "-fr"
function getCollections(handle, title) {
  const h = (handle || '').toLowerCase();
  const t = (title || '').toLowerCase();

  const isMug = h.includes('mug') || t.includes('mug');
  const isPoster = h.includes('poster') || t.includes('poster');

  // Vulva series detection
  const isVulva = h.includes('vulva') || h.includes('tomate') || h.includes('fraise') ||
    h.includes('strawberr') || h.includes('tomato') || h.includes('nicoise') ||
    h.includes('woke') || t.includes('vulva');

  if (isVulva) {
    // Vulva EN detection: title is in English (no French words in title)
    // French vulva titles contain accented French words
    const frenchVulvaWords = ['révolution', 'révol', 'tomate', 'fraise', 'misandrie',
      'toustes', 'ensemble', 'patriarcat', 'faites', 'lamour', 'pas la', 'pas-la',
      'céramique', 'mug c'];
    const englishOnlyHandle = !h.includes('tomate') && !h.includes('fraise') &&
      !h.includes('patriarcat') && !h.includes('toustes') && !h.includes('pas-la') &&
      !h.includes('faites') && !h.includes('misandrie');
    const englishOnlyTitle = !frenchVulvaWords.some(w => t.includes(w));
    const isVulvaEN = (h.startsWith('vulva-la-revolution') && !h.includes('-fr')) ||
      (englishOnlyHandle && englishOnlyTitle);
    const isFR = !isVulvaEN;
    if (isMug) return isFR ? ['vulva-la-revolution-fr'] : ['vulva-la-revolution'];
    if (isPoster) return isFR ? ['posters-vulva-la-revolution-fr'] : ['posters-vulva-la-revolution'];
    return [];
  }

  // For non-vulva products: detect FR vs EN
  // FR titles contain French words like "Céramique" (with accent) or French poster keywords
  // EN titles use English words only
  // Key discriminator: FR mugs have "céramique" in title (with accent é), EN mugs have "ceramic" without accent
  // FR posters have French words in title, EN posters have English words
  
  // FR detection: check for explicitly French words in handle
  // English handles use English-only words and never contain these French-specific patterns
  const frenchHandleWords = [
    'ceramique',      // FR mug suffix
    'coeur',          // cœur
    'lutte',
    'aimer',
    'amour',
    'solidaire',      // "solidaires" (FR), not "solidarity" (EN)
    'rallume',
    'fondu',
    'resiste',        // résiste (FR), not "resists" (EN)
    'fondue',
    'tripes',
    'eclat',
    'flamme',
    'genereuse',      // génereuse (FR), not "generous" (EN)
    'beurre',
    'motte',
    'prets',
    'soumise',
    'politique',
    'cle-de',         // "clé de lutte"
    'pique-l',        // "pique l'amour"
    'pic-de',         // "pic de cœur"
    'choeur',
    'tendre-c',       // "cœur tendre" → handle: coeur-tendre or tendre-coeur
    'cendres',        // "résiste en cendres"
    'chœur',
    'choeur',
    'manifeste',
    '-fr-',           // explicit FR marker
  ];

  const isFrenchTitle = 
    t.includes('céramique') ||    // FR mug title has accent
    frenchHandleWords.some(w => h.includes(w));

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