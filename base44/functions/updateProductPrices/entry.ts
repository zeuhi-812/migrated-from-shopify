import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Prix finaux TTC définis par Zeu Hi
const MUG_PRICE = '14.50';
const POSTER_PRICES = {
  '13x18': '8.50',
  '5x7':   '8.50',
  '21x29': '12.00',
  '8x12':  '12.00',
  'a3':    '15.00',
};

function getPosterPrice(variantTitle) {
  const vt = (variantTitle || '').toLowerCase();
  for (const [key, price] of Object.entries(POSTER_PRICES)) {
    if (vt.includes(key)) return price;
  }
  return null;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const products = await base44.asServiceRole.entities.Product.list('created_date', 500);

    const updated = [];
    const skipped = [];

    for (const product of products) {
      if (!product.variants || product.variants.length === 0) continue;

      const pt = (product.productType || '').toLowerCase();
      const h  = (product.handle || '').toLowerCase();
      const isMug    = pt.includes('mug')    || h.includes('mug');
      const isPoster = pt.includes('poster') || h.includes('poster');

      if (!isMug && !isPoster) { skipped.push(product.title); continue; }

      let changed = false;
      const newVariants = product.variants.map(v => {
        if (isMug) {
          if (v.price !== MUG_PRICE) { changed = true; return { ...v, price: MUG_PRICE }; }
          return v;
        }
        // poster
        const newPrice = getPosterPrice(v.title);
        if (newPrice && v.price !== newPrice) { changed = true; return { ...v, price: newPrice }; }
        return v;
      });

      if (changed) {
        await base44.asServiceRole.entities.Product.update(product.id, { variants: newVariants });
        updated.push(product.title);
        await new Promise(r => setTimeout(r, 350));
      }
    }

    return Response.json({ success: true, updatedCount: updated.length, updated, skippedCount: skipped.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});