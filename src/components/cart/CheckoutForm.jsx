import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Tag, Check } from 'lucide-react';

const PROMO_CODES = {
  ZEUHIFIRST: { discount: 0.10, label: '-10% (première commande)' },
};

export default function CheckoutForm({ totalPrice, onBack, onSubmit, loading }) {
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

  const discountedTotal = appliedPromo
    ? totalPrice * (1 - appliedPromo.discount)
    : totalPrice;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ form, appliedPromo, discountedTotal });
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

      {/* Summary + submit */}
      <div className="border-t border-border pt-4 mt-4 space-y-3">
        {appliedPromo && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sous-total</span>
            <span>{totalPrice.toFixed(2).replace('.', ',')} €</span>
          </div>
        )}
        {appliedPromo && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Réduction ({appliedPromo.code})</span>
            <span>-{(totalPrice * appliedPromo.discount).toFixed(2).replace('.', ',')} €</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="font-medium">Total</span>
          <span className="text-xl font-bold text-primary">{discountedTotal.toFixed(2).replace('.', ',')} €</span>
        </div>
        <p className="text-xs text-muted-foreground">Livraison calculée à l'étape suivante</p>
        <Button type="submit" disabled={loading} size="lg" className="w-full font-semibold">
          {loading ? 'Traitement...' : 'Confirmer et payer'}
        </Button>
      </div>
    </form>
  );
}