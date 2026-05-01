import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Determine collection from product handle and title
// Strategy:
// 1. Explicit handle markers: -fr → French, -en → English
// 2. Title keyword scoring: accented French words vs plain English words
// 3. Type detection: mug vs poster
// 4. Series detection: Vulva series vs Cœur de Lutte / Heart of Protest

function getCollections(handle, title) {
  const h = (handle || '').toLowerCase();
  const t = (title || '').toLowerCase();

  // --- Type detection ---
  const isMug = h.includes('mug') || t.includes('mug');
  const isPoster = h.includes('poster') || t.includes('poster');

  // --- Series detection ---
  const isVulva = h.includes('vulva') || h.includes('tomate') || h.includes('fraise') ||
    h.includes('strawberr') || h.includes('tomato') || h.includes('nicoise') ||
    h.includes('woke') || t.includes('vulva') || t.includes('niçoise') ||
    t.includes('soumise') || t.includes('révolution');

  // --- Language detection ---
  // Step 1: explicit handle suffix
  const hasFrSuffix = h.includes('-fr');
  const hasEnSuffix = h.includes('-en');

  let isFR = null; // null = undetermined

  if (hasFrSuffix && !hasEnSuffix) {
    isFR = true;
  } else if (hasEnSuffix && !hasFrSuffix) {
    isFR = false;
  } else {
    // Step 2: title keyword scoring
    // French-only words (with accents or French-specific)
    const frKeywords = [
      'céramique', 'cœur', 'révolution', 'résistance', 'résiste', 'solidaires',
      'aimer', 'amour', 'lutte', 'flamme', 'rallume', 'fondu', 'tripes',
      'généreuse', 'généreux', 'tomate', 'fraise', 'niçoise', 'soumise',
      'patriarcat', 'toustes', 'ensemble', 'misandrie', 'politique',
      'motte', 'beurre', 'éclaté', 'eclate', 'cendres', 'chœur', 'choeur',
      'pic de', 'clé de', 'pique', 'artichaut', 'engagé', 'résistant',
      'militante', 'manifeste',
    ];
    // English-only words
    const enKeywords = [
      'ceramic', 'heart', 'protest', 'solidarity', 'resist', 'resists',
      'love freely', 'locked', 'butter', 'shattered', 'melted', 'spark',
      'ashes', 'strawberry', 'tomato', 'patriarchy', 'together',
      'artichoke', 'generous', 'tender', 'tune', 'revolution',
      'woke is', 'sexy', 'make love',
    ];

    let frScore = frKeywords.filter(k => t.includes(k)).length;
    let enScore = enKeywords.filter(k => t.includes(k)).length;

    // Strong FR discriminator: accented "céramique"
    if (t.includes('céramique')) frScore += 3;
    // Strong EN discriminator: "ceramic" without accent
    if (t.includes('ceramic')) enScore += 3;

    if (frScore > enScore) isFR = true;
    else if (enScore > frScore) isFR = false;
    else {
      // Step 3: handle keyword fallback
      const frHandleWords = [
        'ceramique', 'coeur', 'lutte', 'aimer', 'amour', 'solidaire',
        'rallume', 'fondu', 'resiste', 'tripes', 'eclat', 'flamme',
        'genereuse', 'beurre', 'motte', 'prets', 'soumise', 'politique',
        'cle-de', 'pique-l', 'pic-de', 'choeur', 'manifeste', 'chœur',
      ];
      const enHandleWords = [
        'ceramic', 'heart-of', 'protest', 'solidarity', 'butter',
        'shattered', 'spark', 'ashes', 'artichoke', 'generous', 'tender',
        'make-love', 'locked', 'melted',
      ];

      const frHScore = frHandleWords.filter(k => h.includes(k)).length;
      const enHScore = enHandleWords.filter(k => h.includes(k)).length;

      if (frHScore > enHScore) isFR = true;
      else if (enHScore > frHScore) isFR = false;
      else {
        // Final fallback: Vulva series without -fr/-en → "vulva-la-revolution" = EN
        if (isVulva && h.startsWith('vulva-la-revolution') && !hasFrSuffix) {
          isFR = false;
        } else {
          isFR = true; // default to FR if still undetermined
        }
      }
    }
  }

  // --- Assign collection ---
  if (isVulva) {
    if (isMug) return isFR ? ['vulva-la-revolution-fr'] : ['vulva-la-revolution'];
    if (isPoster) return isFR ? ['posters-vulva-la-revolution-fr'] : ['posters-vulva-la-revolution'];
    return [];
  } else {
    if (isMug) return isFR ? ['mugs-le-coeur-manifeste'] : ['mugs-heart-of-protest'];
    if (isPoster) return isFR ? ['posters-coeur-de-lutte'] : ['posters-heart-of-protest'];
    return [];
  }
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