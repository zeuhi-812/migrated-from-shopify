import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import Stripe from 'npm:stripe@14.21.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { sessionId, successUrl, cancelUrl, customerInfo, promoCode, discountedTotal } = await req.json();

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

    // Determine unit amounts (apply promo discount proportionally if provided)
    const originalTotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
    const discountRatio = discountedTotal && originalTotal > 0
      ? discountedTotal / originalTotal
      : 1;

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
        unit_amount: Math.round((item.price || 0) * discountRatio * 100),
      },
      quantity: item.quantity || 1,
    }));

    // Build customer pre-fill if info provided
    const customerEmail = customerInfo?.email || undefined;

    const sessionParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${Deno.env.get('STORE_URL') || 'https://example.com'}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${Deno.env.get('STORE_URL') || 'https://example.com'}/panier`,
      metadata: {
        cartSessionId: sessionId,
        promoCode: promoCode || '',
        customerPhone: customerInfo?.phone || '',
        // Shipping address stored in metadata for Gelato webhook
        shippingLine1: customerInfo?.shippingLine1 || '',
        shippingLine2: customerInfo?.shippingLine2 || '',
        shippingCity: customerInfo?.shippingCity || '',
        shippingPostCode: customerInfo?.shippingPostCode || '',
        shippingCountry: customerInfo?.shippingCountry || 'FR',
        billingLine1: customerInfo?.sameAsBilling ? customerInfo?.shippingLine1 : customerInfo?.billingLine1 || '',
        billingCity: customerInfo?.sameAsBilling ? customerInfo?.shippingCity : customerInfo?.billingCity || '',
        billingPostCode: customerInfo?.sameAsBilling ? customerInfo?.shippingPostCode : customerInfo?.billingPostCode || '',
        billingCountry: customerInfo?.sameAsBilling ? customerInfo?.shippingCountry : customerInfo?.billingCountry || 'FR',
        firstName: customerInfo?.firstName || '',
        lastName: customerInfo?.lastName || '',
      },
      billing_address_collection: 'auto',
    };

    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    // Pre-fill shipping if provided
    if (customerInfo?.shippingCountry) {
      sessionParams.shipping_address_collection = {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'CA', 'US', 'GB', 'DE', 'ES', 'IT', 'NL', 'PT', 'AU'],
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return Response.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});