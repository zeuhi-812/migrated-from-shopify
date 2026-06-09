import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useState } from 'react';
import CartDrawer from './CartDrawer';

export default function CartButton() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative p-2 hover:text-primary transition-colors"
        aria-label="Ouvrir le panier"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}