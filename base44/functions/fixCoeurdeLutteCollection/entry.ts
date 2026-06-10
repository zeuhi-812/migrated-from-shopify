import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const COEUR_DE_LUTTE_TITLES = [
  'Cœur à Chœur',
  'Chœur de Lutte',
  'Clé de Lutte',
  'Clé de Résistance',
  "Pique L'Amour",
  'Mon Cœur Résiste',
  'Pique mon Cœur',
  'Résiste mon Cœur',
  'Résiste Mon Cœur',
  'Aimer est un Acte Politique',
  "Aimer c'est Résister",
  'Solidaires',
  'Résistance Solidaire',
  "Cœur d'Artichaut Engagé",
  "Cœur d'Artichaut Résistant",
  'Cœur Généreux',
  "Cœur d'Artichaut",
  'Généreuse Résistance',
  'Motte de Cœur',
  'Résistance Fondue',
  'Motte de Cul',
  'Fondu.e de Résistance',
  'Cœur de Lutte',
  'Tripes Résistantes',
  'Cœur Eclaté',
  'Résistance Eclatée',
  'Rallume la Flamme',
  'Résiste en Cendres',
];

function normalize(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/["""''«»]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const normalizedTitles = new Set(COEUR_DE_LUTTE_TITLES.map(normalize));

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const allProducts = await base44.asServiceRole.entities.Product.list('created_date', 500);

  let updated = 0;
  const updatedTitles = [];

  for (const product of allProducts) {
    const d = product.data || product;
    if (d.productType !== 'poster' && !(d.handle || '').includes('poster')) continue;

    // Extrait le titre sans les guillemets ni " Poster" à la fin
    const cleanTitle = (d.title || '').replace(/["«»""'']/g, '').replace(/\s*Poster\s*$/i, '').trim();

    if (!normalizedTitles.has(normalize(cleanTitle))) continue;

    const collections = Array.isArray(d.collections) ? [...d.collections] : [];
    if (collections.includes('posters-coeur-de-lutte')) continue;

    collections.push('posters-coeur-de-lutte');
    await base44.asServiceRole.entities.Product.update(product.id, { ...d, collections });
    updated++;
    updatedTitles.push(d.title);
  }

  return Response.json({ success: true, updated, updatedTitles });
});