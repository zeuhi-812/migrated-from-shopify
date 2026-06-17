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

      const meta = session.metadata || {};
      const customerName = `${meta.firstName || ''} ${meta.lastName || ''}`.trim() || session.customer_details?.name || 'Client';
      const customerEmail = session.customer_details?.email || '';
      // Use metadata address (collected in our form) or fall back to Stripe shipping
      const shippingAddress = meta.shippingLine1 ? {
        line1: meta.shippingLine1,
        line2: meta.shippingLine2 || '',
        city: meta.shippingCity,
        postal_code: meta.shippingPostCode,
        country: meta.shippingCountry || 'FR',
      } : (session.shipping_details?.address || session.customer_details?.address);

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
      const cartSummary = cartItems.map(i => `- ${i.title}${i.variantTitle ? ` (${i.variantTitle})` : ''} ×${i.quantity} — ${(i.price * (i.quantity || 1)).toFixed(2).replace('.', ',')}€`).join('\n');
      await Promise.all(cartItems.map(i => base44.asServiceRole.entities.CartItem.delete(i.id)));

      // Envoyer une notification email à Zeu Hi
      const orderTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : 'N/A';
      const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
      const emailBody = `Nouvelle commande Pancartiviste ! 🚀

Date : ${now}
Client : ${customerName}
Email : ${customerEmail}
Montant : ${orderTotal}€ ${session.currency?.toUpperCase() || 'EUR'}

Adresse de livraison :
${[
  shippingAddress?.line1 || '',
  shippingAddress?.line2 || '',
  `${shippingAddress?.postal_code || ''} ${shippingAddress?.city || ''}`.trim(),
  shippingAddress?.country || 'FR'
].filter(Boolean).join('\n')}

Produits commandés :
${cartSummary || 'Non disponible'}

Commande Gelato : ${orderItems.length > 0 ? '✓ transmise' : '⚠ à vérifier'}
ID Stripe : ${session.id}`;

      try {
        await base44.integrations.Core.SendEmail({
          to: 'zeuhi@pancartiviste.com',
          subject: `🛒 Nouvelle commande — ${customerName} (${orderTotal}€)`,
          body: emailBody,
          from_name: 'Pancartiviste Shop',
        });
        console.log('Order notification sent to zeuhi@pancartiviste.com');
      } catch (emailErr) {
        console.error('Failed to send order notification:', emailErr.message);
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});