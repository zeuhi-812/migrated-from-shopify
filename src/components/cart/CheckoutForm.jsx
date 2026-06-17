import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Tag, Check, Loader2, Truck } from 'lucide-react';
import { gelatoShippingQuote } from '@/functions/gelatoShippingQuote';

const VAT_RATE = 0.20;

const PROMO_CODES = {
  ZEUHIFIRST: { discount: 0.10, label: '-10% (première commande)' },
};

export default function CheckoutForm({ totalPrice, onBack, onSubmit, loading, cartItems }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    shippingLine1: '',
    shippingLine2: '',
    shippingCity: '',
    shippingPostCode: '',
    shippingCountry: 'FR',
    sameAsBilling: true,
    billingLine1: '',
    billingLine2: '',
    billingCity: '',
    billingPostCode: '',
    billingCountry: 'FR',
  });
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [quoteError, setQuoteError] = useState('');

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, ...PROMO_CODES[code] });
      setPromoError('');
    } else {
      setPromoError('Code invalide');
      setAppliedPromo(null);
    }
  };

  const addressComplete = form.firstName && form.lastName && form.email
    && form.shippingLine1 && form.shippingCity && form.shippingPostCode && form.shippingCountry;

  const fetchShippingQuote = async () => {
    if (!addressComplete) return;
    setQuoteLoading(true);
    setQuoteError('');
    try {
      const res = await gelatoShippingQuote({
        items: cartItems.map(item => ({
          gelatoVariantId: item.gelatoVariantId,
          variantTitle: item.variantTitle,
          quantity: item.quantity || 1,
          title: item.title || '',
        })),
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          line1: form.shippingLine1,
          line2: form.shippingLine2,
          city: form.shippingCity,
          postCode: form.shippingPostCode,
          country: form.shippingCountry,
        },
      });
      if (res.data?.error) {
        setQuoteError(res.data.error);
      } else {
        setQuoteData(res.data);
      }
    } catch (err) {
      setQuoteError('Impossible de calculer la livraison');
    }
    setQuoteLoading(false);
  };

  const discountedProductHT = appliedPromo
    ? totalPrice * (1 - appliedPromo.discount)
    : totalPrice;
  const shippingHT = quoteData?.shippingCost || 0;
  const totalHT = discountedProductHT + shippingHT;
  const tvaAmount = totalHT * VAT_RATE;
  const totalTTC = totalHT + tvaAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quoteData && !quoteError) {
      fetchShippingQuote();
      return;
    }
    onSubmit({ form, appliedPromo, discountedTotal: discountedProductHT, shippingCost: shippingHT });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Retour au panier
      </button>

      <div className="flex-1 overflow-y-auto space-y-5 pr-1">
        {/* Identity */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Coordonnées</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Prénom *</label>
              <Input required value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Marie" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Nom *</label>
              <Input required value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Dupont" />
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs text-muted-foreground mb-1 block">Email *</label>
            <Input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="marie@example.com" />
          </div>
          <div className="mt-3">
            <label className="text-xs text-muted-foreground mb-1 block">Téléphone</label>
            <Input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+33 6 00 00 00 00" />
          </div>
        </section>

        {/* Shipping */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Adresse de livraison</h3>
          <div className="space-y-3">
            <Input required value={form.shippingLine1} onChange={e => set('shippingLine1', e.target.value)} placeholder="Adresse (ligne 1) *" />
            <Input value={form.shippingLine2} onChange={e => set('shippingLine2', e.target.value)} placeholder="Complément d'adresse" />
            <div className="grid grid-cols-2 gap-3">
              <Input required value={form.shippingPostCode} onChange={e => set('shippingPostCode', e.target.value)} placeholder="Code postal *" />
              <Input required value={form.shippingCity} onChange={e => set('shippingCity', e.target.value)} placeholder="Ville *" />
            </div>
            <Input required value={form.shippingCountry} onChange={e => set('shippingCountry', e.target.value)} placeholder="Pays *" />
          </div>
        </section>

        {/* Billing */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Adresse de facturation</h3>
            <button
              type="button"
              onClick={() => set('sameAsBilling', !form.sameAsBilling)}
              className={`ml-auto text-xs px-2 py-0.5 rounded border transition-colors ${form.sameAsBilling ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'}`}
            >
              {form.sameAsBilling ? '✓ Identique à la livraison' : 'Différente'}
            </button>
          </div>
          {!form.sameAsBilling && (
            <div className="space-y-3">
              <Input required value={form.billingLine1} onChange={e => set('billingLine1', e.target.value)} placeholder="Adresse (ligne 1) *" />
              <Input value={form.billingLine2} onChange={e => set('billingLine2', e.target.value)} placeholder="Complément d'adresse" />
              <div className="grid grid-cols-2 gap-3">
                <Input required value={form.billingPostCode} onChange={e => set('billingPostCode', e.target.value)} placeholder="Code postal *" />
                <Input required value={form.billingCity} onChange={e => set('billingCity', e.target.value)} placeholder="Ville *" />
              </div>
              <Input required value={form.billingCountry} onChange={e => set('billingCountry', e.target.value)} placeholder="Pays *" />
            </div>
          )}
        </section>

        {/* Promo code */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Code promo</h3>
          {appliedPromo ? (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2">
              <Check className="w-4 h-4" />
              <span><strong>{appliedPromo.code}</strong> — {appliedPromo.label}</span>
              <button type="button" onClick={() => setAppliedPromo(null)} className="ml-auto text-muted-foreground hover:text-foreground text-xs">✕</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={promoCode}
                  onChange={e => { setPromoCode(e.target.value); setPromoError(''); }}
                  placeholder="Code promo"
                  className="pl-8 uppercase"
                />
              </div>
              <Button type="button" variant="outline" onClick={applyPromo}>Appliquer</Button>
            </div>
          )}
          {promoError && <p className="text-xs text-destructive mt-1">{promoError}</p>}
        </section>
      </div>

      {/* Calcul livraison */}
      {addressComplete && !quoteData && !quoteLoading && (
        <button
          type="button"
          onClick={fetchShippingQuote}
          className="flex items-center justify-center gap-2 w-full py-2 text-sm text-primary border border-primary/30 rounded-md hover:bg-primary/5 transition-colors"
        >
          <Truck className="w-4 h-4" />
          Calculer les frais de livraison
        </button>
      )}
      {quoteLoading && (
        <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Calcul de la livraison en cours...
        </div>
      )}
      {quoteError && (
        <p className="text-xs text-destructive text-center">{quoteError}</p>
      )}

      {/* Summary + submit */}
      <div className="border-t border-border pt-4 mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Sous-total produits</span>
          <span>{totalPrice.toFixed(2).replace('.', ',')} €</span>
        </div>
        {appliedPromo && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Réduction ({appliedPromo.code})</span>
            <span>-{(totalPrice * appliedPromo.discount).toFixed(2).replace('.', ',')} €</span>
          </div>
        )}
        {quoteData && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Livraison{quoteData.method ? ` — ${quoteData.method}` : ''}
              {quoteData.isEstimate && ' (estimé)'}
            </span>
            <span>{shippingHT.toFixed(2).replace('.', ',')} €</span>
          </div>
        )}
        {quoteData && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">TVA (20%) — reversée par Gelato</span>
            <span>{tvaAmount.toFixed(2).replace('.', ',')} €</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="font-medium">Total TTC</span>
          <span className="text-xl font-bold text-primary">{totalTTC.toFixed(2).replace('.', ',')} €</span>
        </div>
        <Button type="submit" disabled={loading} size="lg" className="w-full font-semibold">
          {loading ? 'Traitement...' : quoteData ? 'Confirmer et payer' : 'Calculer et payer'}
        </Button>
      </div>
    </form>
  );
}