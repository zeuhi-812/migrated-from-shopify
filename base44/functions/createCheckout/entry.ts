import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import Stripe from 'npm:stripe@14.21.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { sessionId, successUrl, cancelUrl } = await req.json();

    if (!sessionId) {
      return Response.json({ error: 'sessionId requis' }, { status: 400 });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });

    // Fetch cart items for this session
    const items = await base44.asServiceRole.entities.CartItem.filter({ sessionId });

    if (!items || items.length === 0) {
      return Response.json({ error: 'Panier vide' }, { status: 400 });
    }

    // Build Stripe line items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.title + (item.variantTitle && item.variantTitle !== 'Default Title' ? ` - ${item.variantTitle}` : ''),
          images: item.imageUrl ? [item.imageUrl] : [],
          metadata: {
            productId: item.productId,
            gelatoVariantId: item.gelatoVariantId || '',
            cartItemId: item.id,
          },
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${Deno.env.get('STORE_URL') || 'https://example.com'}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${Deno.env.get('STORE_URL') || 'https://example.com'}/panier`,
      metadata: {
        cartSessionId: sessionId,
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'CA', 'US', 'GB', 'DE', 'ES', 'IT', 'NL', 'PT', 'AU'],
      },
    });

    return Response.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});