import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ============================================================
// GRILLE MANUELLE (fallback si l'API Gelato est indisponible)
// ============================================================
const MANUAL_SHIPPING = {
  mug: { first: 4.99, additional: 3.00 },
  poster_small: { first: 5.90, additional: 3.50 },   // 13x18cm
  poster_large: { first: 7.90, additional: 3.50 },   // 21x29.7cm ou A3
};

function detectProductCategory(variantTitle, productType, title) {
  const vt = (variantTitle || '').toLowerCase();
  const pt = (productType || '').toLowerCase();
  const tt = (title || '').toLowerCase();
  if (pt === 'mug' || vt.includes('mug') || tt.includes('mug')) return 'mug';
  if (vt.includes('13x18') || vt.includes('5x7')) return 'poster_small';
  return 'poster_large';
}

function computeManualShipping(items) {
  const byCategory = {};
  for (const item of items) {
    const cat = detectProductCategory(item.variantTitle, item.productType, item.title);
    if (!byCategory[cat]) byCategory[cat] = 0;
    byCategory[cat] += (item.quantity || 1);
  }

  let total = 0;
  const breakdown = [];
  for (const [cat, qty] of Object.entries(byCategory)) {
    const grid = MANUAL_SHIPPING[cat];
    if (!grid) continue;
    const cost = grid.first + (qty - 1) * grid.additional;
    const label = cat === 'mug' ? 'Mugs'
      : cat === 'poster_small' ? 'Posters 13×18cm'
      : 'Posters 21×29,7cm / A3';
    breakdown.push({ category: cat, label, quantity: qty, unitFirst: grid.first, unitAdditional: grid.additional, cost });
    total += cost;
  }

  return { shippingCost: Math.round(total * 100) / 100, breakdown, isEstimate: true };
}

// ============================================================
// FONCTION PRINCIPALE
// ============================================================
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { items, shippingAddress } = await req.json();

    if (!items || items.length === 0) {
      return Response.json({ error: 'Aucun article' }, { status: 400 });
    }

    const API_KEY = Deno.env.get('PANCARTVISTE_API_KEY');
    if (!API_KEY) {
      const manual = computeManualShipping(items);
      return Response.json({ ...manual, source: 'manual' });
    }

    // ============================================================
    // TENTATIVE API GELATO
    // ============================================================
    try {
      const gelatoProducts = items.map((item, idx) => ({
        itemReferenceId: `quote-${idx}`,
        productUid: item.gelatoVariantId || '',
        quantity: item.quantity || 1,
      }));

      const gelatoPayload = {
        orderReferenceId: `quote-${Date.now()}`,
        customerReferenceId: 'checkout',
        currency: 'EUR',
        allowMultipleQuotes: false,
        recipient: {
          country: (shippingAddress?.country || 'FR').toUpperCase(),
          firstName: shippingAddress?.firstName || 'Client',
          lastName: shippingAddress?.lastName || '',
          addressLine1: shippingAddress?.line1 || '',
          addressLine2: shippingAddress?.line2 || '',
          city: shippingAddress?.city || '',
          postCode: shippingAddress?.postCode || '',
          email: shippingAddress?.email || 'client@example.com',
        },
        products: gelatoProducts,
      };

      const gelatoRes = await fetch('https://order.gelatoapis.com/v3/orders:quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        },
        body: JSON.stringify(gelatoPayload),
      });

      if (!gelatoRes.ok) {
        const errText = await gelatoRes.text();
        console.log('Gelato Quote API error, using manual fallback:', errText.substring(0, 300));
        const manual = computeManualShipping(items);
        return Response.json({ ...manual, source: 'manual', gelatoError: errText.substring(0, 200) });
      }

      const gelatoData = await gelatoRes.json();
      const quotes = gelatoData.quotes || [];

      // Extraire le tarif de livraison le moins cher (type "normal")
      let cheapestShipping = null;
      for (const quote of quotes) {
        const methods = quote.shipmentMethods || [];
        for (const method of methods) {
          if (method.type === 'normal' && (!cheapestShipping || method.price < cheapestShipping.price)) {
            cheapestShipping = method;
          }
        }
      }

      if (!cheapestShipping) {
        for (const quote of quotes) {
          const methods = quote.shipmentMethods || [];
          for (const method of methods) {
            if (!cheapestShipping || method.price < cheapestShipping.price) {
              cheapestShipping = method;
            }
          }
        }
      }

      if (!cheapestShipping) {
        console.log('No shipping methods from Gelato, using manual fallback');
        const manual = computeManualShipping(items);
        return Response.json({ ...manual, source: 'manual' });
      }

      const shippingCost = Math.round(cheapestShipping.price * 100) / 100;

      return Response.json({
        shippingCost,
        currency: cheapestShipping.currency || 'EUR',
        method: cheapestShipping.name,
        minDeliveryDays: cheapestShipping.minDeliveryDays,
        maxDeliveryDays: cheapestShipping.maxDeliveryDays,
        isEstimate: false,
        source: 'gelato',
        breakdown: [{
          category: 'gelato',
          label: `Gelato — ${cheapestShipping.name}`,
          quantity: 1,
          cost: shippingCost,
        }],
      });

    } catch (gelatoError) {
      console.log('Gelato API exception, using manual fallback:', gelatoError.message);
      const manual = computeManualShipping(items);
      return Response.json({ ...manual, source: 'manual' });
    }

  } catch (error) {
    console.error('Shipping quote error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});