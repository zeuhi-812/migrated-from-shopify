import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Ordered titles per collection (from Shopify screenshots)
const SORT_ORDERS = {
  'vulva-la-revolution-fr': [
    "Vulva la Révolution\" Tomate Mug Céramique",
    "Anti Patriarcat\" Tomate Mug Céramique",
    "Faites l'Amour\" Tomate Mug Céramique",
    "Pas la Guerre\" Tomate Mug Céramique",
    "Niçoise ni Soumise\" Tomate Mug Céramique",
    "Vulva la Révolution\" Fraise Mug Céramique",
    "Anti Patriarcat\" Fraise Mug Céramique",
    "Faites l'Amour\" Fraise Mug Céramique",
    "Pas la Guerre\" Fraise Mug Céramique",
    "Niçoise ni Soumise\" Fraise Mug Céramique",
  ],
  'posters-vulva-la-revolution-fr': [
    "Vulva la Révolution\" Tomate Poster",
    "Toustes Ensemble\" Tomate Poster",
    "Anti Patriarcat\" Tomate Poster",
    "Prêts pour le Woke \" Tomate Poster",
    "Niçoise ni Soumise\" Tomate Poster",
    "Woke is the New Sexy\" Tomate Poster",
    "Ready for the Woke\" Tomate Poster",
  ],
  'vulva-la-revolution': [
    "Vulva la Revolution\" Tomatoe Ceramic Mug",
    "Anti Patriarchy\" Tomatoe Ceramic Mug",
    "Make Love\" Tomatoe Ceramic Mug",
    "Not War\" Tomatoe Ceramic Mug",
  ],
  'posters-vulva-la-revolution': [
    "Vulva la Revolution\" Tomatoe Poster",
    "Anti Patriarchy\" Tomatoe Poster",
    "All Together\" Tomatoe Poster",
    "Make Love not War\" Tomatoe Poster",
    "Woke is the New Sexy\" Tomatoe Poster",
    "Ready for the Woke\" Tomatoe Poster",
  ],
  'mugs-le-coeur-manifeste': [
    "Solidaires\" Mug Céramique",
    "Aimer c'est Politique\" Mug Céramique",
    "Cœur d'Artichaut Engagé\" Mug Céramique",
    "Cœur Tendre\" Mug Ceramique",
    "Cœur Généreux\" Mug Céramique",
    "Clé de Lutte\" Mug Céramique",
    "Cœur à Chœur\" Mug Céramique",
    "Pic de Cœur\" Mug Céramique",
    "Pique l'Amour\" Mug Céramique",
    "Motte de Cœur\" Mug",
    "Motte de Cul\" Mug Céramique",
    "Cœur de Lutte\" Mug Céramique",
    "Rallume la Flamme\" Mug Céramique",
    "Cœur Eclaté\" Mug Céramique",
  ],
  'mugs-heart-of-protest': [
    "Solidarity\" Ceramic Mug",
    "Love Freely\" Ceramic Mug",
    "Tender Heart\" Ceramic Mug",
    "Tender Artichoke\" Ceramic Mug",
    "Generous Heart\" Ceramic Mug",
    "Love Tune\" Ceramic Mug",
    "Locked Love\" Ceramic Mug",
    "Pick my Heart\" Ceramic Mug",
    "Pick my Love\" Ceramic Mug",
    "Butter Heart\" Ceramic Mug",
    "Butter Love\" Ceramic Mug",
    "Heart of Protest\" Ceramic Mug",
    "Shattered Heart\" Ceramic Mug",
    "Spark the Flame\" Ceramic Mug",
  ],
  'posters-coeur-de-lutte': [
    "Cœur à Chœur\" Poster",
    "Chœur de Lutte\" Poster",
    "Clé de Lutte\" Poster",
    "Clé de Résistance\" Poster",
    "Pique l'Amour\" Poster",
    "Mon Cœur Résiste\" Poster",
    "Pique mon Cœur\" Poster",
    "Résiste Mon Cœur\" Poster",
    "Aimer est un Acte Politique\" Poster",
    "Aimer c'est Résister\" Poster",
    "Solidaires\" Poster",
    "Aimer c'est Résister\" Poster",
    "Cœur d'Artichaut Engagé\" Poster",
    "Cœur d'Artichaut Résistant\" Poster",
    "Cœur Généreux\" Poster",
    "Cœur d'Artichaut\" Poster",
    "Généreuse Résistance\" Poster",
    "Motte de Cœur\" Poster",
    "Résistance Fondue \" Poster",
    "Motte de Cul\" Poster",
    "Fondu.e de Résistance \" Poster",
    "Cœur de Lutte\" Poster",
    "Tripes Résistantes\" Poster",
    "Cœur Eclaté\" Poster",
    "Résistance Eclatée\" Poster",
    "Rallume la Flamme\" Poster",
    "Résiste en Cendres\" Poster",
  ],
  'posters-heart-of-protest': [
    "Generous Resistance\" Poster",
    "Tender Heart\" Poster",
    "Resistant Heartichoke\" Poster",
    "Heart of Protest\" Poster",
    "Resisting Guts\" Poster",
    "Butter Heart\" Poster",
    "Melted Resistance\" Poster",
    "Butter Love\" Poster",
    "Buttered Resistance\" Poster",
    "Shattered Heart\" Poster",
    "Shattered Heart\" Poster",
    "Spark the Flame\" Poster",
    "Ashes Resistance\" Poster",
  ],
};

// Normalize title for comparison: lowercase, remove leading quote
function normalize(t) {
  return (t || '').toLowerCase().replace(/^["«]/, '').trim();
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  let offset = 0;
  try {
    const body = await req.json();
    offset = body.offset || 0;
  } catch (_) {}

  const BATCH = 10;
  const allProducts = await base44.asServiceRole.entities.Product.list('created_date', 250);
  const batch = allProducts.slice(offset, offset + BATCH);
  let updated = 0;

  for (const product of batch) {
    const d = product.data || product;
    const cols = d.collections || [];
    let bestOrder = 9999;

    for (const col of cols) {
      const orderList = SORT_ORDERS[col];
      if (!orderList) continue;
      const idx = orderList.findIndex(t => normalize(d.title).includes(normalize(t)));
      if (idx !== -1 && idx < bestOrder) bestOrder = idx;
    }

    await base44.asServiceRole.entities.Product.update(product.id, {
      ...d,
      sortOrder: bestOrder,
    });
    updated++;
  }

  return Response.json({
    success: true,
    updated,
    total: allProducts.length,
    nextOffset: offset + batch.length,
    done: offset + batch.length >= allProducts.length,
  });
});