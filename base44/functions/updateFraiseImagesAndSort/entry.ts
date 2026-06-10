import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Images mises à jour pour les posters Fraise
const FRAISE_IMAGE_MAP = {
  '"Anti Patriarcat" Fraise Rico Poster': 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7946d3eec_AntiPatriarcatFraiseRicoPoster.jpg',
  '"Anti Patriarcat" Fraise Tonio Poster': 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/87c823ae0_AntiPatriarcatFraiseTonioPoster.jpg',
  '"Vulva la Révolution" Fraise Shakira Poster': 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9872d20b8_VulvaRevolutionFraiseShakiraPoster.jpg',
};

// Ordre souhaité pour la collection "Cœur de Lutte" Posters
const COEUR_DE_LUTTE_ORDER = [
  'Cœur à Chœur Poster',
  'Chœur de Lutte Poster',
  'Clé de Lutte Poster',
  'Clé de Résistance Poster',
  'Pique L\'Amour Poster',
  'Mon Cœur Résiste Poster',
  'Pique mon Cœur Poster',
  'Résiste mon Cœur Poster',
  'Aimer est un Acte Politique Poster',
  'Aimer c\'est Résister Poster',
  'Solidaires Poster',
  'Résistance Solidaire Poster',
  'Cœur d\'Artichaut Engagé Poster',
  'Cœur d\'Artichaut Résistant Poster',
  'Cœur Généreux Poster',
  'Cœur d\'Artichaut Poster',
  'Généreuse Résistance Poster',
  'Motte de Cœur Poster',
  'Résistance Fondue Poster',
  'Motte de Cul Poster',
  'Fondu.e de Résistance Poster',
  'Cœur de Lutte Poster',
  'Tripes Résistantes Poster',
  'Cœur Eclaté Poster',
  'Résistance Eclatée Poster',
  'Rallume la Flamme Poster',
  'Résiste en Cendres Poster',
];

// Normalise les titres pour la comparaison (enlève accents, guillemets, espaces, casse)
function normalize(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // enlève les accents
    .replace(/["""''«»]/g, '')         // enlève les guillemets
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Récupère tous les produits
  const allProducts = await base44.asServiceRole.entities.Product.list('created_date', 500);

  const imageUpdates = [];
  const sortUpdates = [];

  // Build lookup pour le tri par titre normalisé
  const sortOrderMap = {};
  COEUR_DE_LUTTE_ORDER.forEach((title, index) => {
    sortOrderMap[normalize(title)] = index + 1;
  });

  for (const product of allProducts) {
    const d = product.data || product;
    const title = d.title || '';
    let needsUpdate = false;
    const updateData = { ...d };

    // 1. Mise à jour des images Fraise
    if (FRAISE_IMAGE_MAP[title]) {
      updateData.images = [{ url: FRAISE_IMAGE_MAP[title], altText: title }];
      needsUpdate = true;
      imageUpdates.push(title);
    }

    // 2. Tri pour la collection Cœur de Lutte Poster
    const normalizedTitle = normalize(title);
    const sortOrder = sortOrderMap[normalizedTitle];
    if (sortOrder !== undefined && d.sortOrder !== sortOrder) {
      updateData.sortOrder = sortOrder;
      needsUpdate = true;
      sortUpdates.push({ title, sortOrder });
    }

    if (needsUpdate) {
      await base44.asServiceRole.entities.Product.update(product.id, updateData);
    }
  }

  return Response.json({
    success: true,
    imageUpdates,
    sortUpdates,
    totalProcessed: allProducts.length,
  });
});