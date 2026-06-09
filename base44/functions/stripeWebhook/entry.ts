import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import Stripe from 'npm:stripe@14.21.0';

Deno.serve(async (req) => {
  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });

    const body = await req.text();
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature error:', err.message);
      return new Response('Webhook signature verification failed', { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const cartSessionId = session.metadata?.cartSessionId;

      if (!cartSessionId) {
        return Response.json({ received: true });
      }

      // Get line items with product metadata
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      const gelatoApiKey = Deno.env.get('PANCARTVISTE_API_KEY');
      const gelatoStoreId = Deno.env.get('CLIENT_ID');

      const shippingAddress = session.shipping_details?.address || session.customer_details?.address;
      const customerName = session.customer_details?.name || 'Client';
      const customerEmail = session.customer_details?.email || '';

      // Build Gelato order items
      const orderItems = [];
      for (const li of lineItems.data) {
        const meta = li.price?.product?.metadata || {};
        const gelatoVariantId = meta.gelatoVariantId;
        if (gelatoVariantId) {
          orderItems.push({
            itemReferenceId: meta.cartItemId || crypto.randomUUID(),
            productUid: gelatoVariantId,
            quantity: li.quantity,
          });
        }
      }

      if (orderItems.length > 0 && shippingAddress) {
        const gelatoOrder = {
          orderReferenceId: session.payment_intent || session.id,
          customerReferenceId: customerEmail,
          currency: 'EUR',
          items: orderItems,
          shippingAddress: {
            firstName: customerName.split(' ')[0] || customerName,
            lastName: customerName.split(' ').slice(1).join(' ') || '',
            addressLine1: shippingAddress.line1 || '',
            addressLine2: shippingAddress.line2 || '',
            city: shippingAddress.city || '',
            postCode: shippingAddress.postal_code || '',
            country: shippingAddress.country || 'FR',
            email: customerEmail,
          },
        };

        const gelatoRes = await fetch(`https://order.gelatoapis.com/v4/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': gelatoApiKey,
          },
          body: JSON.stringify(gelatoOrder),
        });

        const gelatoData = await gelatoRes.json();
        console.log('Gelato order created:', JSON.stringify(gelatoData));
      }

      // Clear the cart
      const cartItems = await base44.asServiceRole.entities.CartItem.filter({ sessionId: cartSessionId });
      await Promise.all(cartItems.map(i => base44.asServiceRole.entities.CartItem.delete(i.id)));
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});