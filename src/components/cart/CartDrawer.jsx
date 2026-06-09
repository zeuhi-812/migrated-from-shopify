import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { createCheckout } from '@/functions/createCheckout';

export default function CartDrawer({ open, onClose }) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await createCheckout({
      sessionId: localStorage.getItem('cart_session_id'),
      successUrl: `${window.location.origin}/commande-confirmee`,
      cancelUrl: `${window.location.origin}/panier`,
    });
    if (res.data?.url) {
      window.location.href = res.data.url;
    }
    setLoading(false);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading uppercase flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Mon panier {totalItems > 0 && <span className="text-primary">({totalItems})</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="w-16 h-16 opacity-20" />
            <p className="text-sm">Votre panier est vide</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0 bg-muted"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight line-clamp-2">{item.title}</p>
                    {item.variantTitle && item.variantTitle !== 'Default Title' && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.variantTitle}</p>
                    )}
                    <p className="text-sm font-semibold text-primary mt-1">
                      {((item.price || 0) * (item.quantity || 1)).toFixed(2).replace('.', ',')} €
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold text-primary">
                  {totalPrice.toFixed(2).replace('.', ',')} €
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Livraison calculée à l'étape suivante</p>
              <Button
                onClick={handleCheckout}
                disabled={loading}
                size="lg"
                className="w-full font-semibold"
              >
                {loading ? 'Redirection...' : 'Passer la commande'}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}