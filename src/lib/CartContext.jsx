import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const CartContext = createContext(null);

function getOrCreateSessionId() {
  let sid = localStorage.getItem('cart_session_id');
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem('cart_session_id', sid);
  }
  return sid;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessionId = getOrCreateSessionId();

  const fetchCart = useCallback(async () => {
    try {
      const data = await base44.entities.CartItem.filter({ sessionId });
      setItems(data);
    } catch (e) {
      console.error('Cart fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = async (product, variantIndex = 0) => {
    const variant = product.variants?.[variantIndex] || {};
    const price = parseFloat(variant.price) || 0;
    const imageUrl = product.images?.[0]?.url || product.gelatoPreviewUrl || '';

    // Check if same product+variant already in cart
    const existing = items.find(
      i => i.productId === product.id && i.variantIndex === variantIndex
    );

    if (existing) {
      await base44.entities.CartItem.update(existing.id, {
        quantity: (existing.quantity || 1) + 1,
      });
    } else {
      await base44.entities.CartItem.create({
        sessionId,
        productId: product.id,
        variantIndex,
        variantTitle: variant.title || '',
        gelatoVariantId: variant.gelatoVariantId || '',
        title: product.title,
        price,
        quantity: 1,
        imageUrl,
        handle: product.handle || '',
      });
    }
    await fetchCart();
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      await base44.entities.CartItem.delete(itemId);
    } else {
      await base44.entities.CartItem.update(itemId, { quantity });
    }
    await fetchCart();
  };

  const removeItem = async (itemId) => {
    await base44.entities.CartItem.delete(itemId);
    await fetchCart();
  };

  const clearCart = async () => {
    await Promise.all(items.map(i => base44.entities.CartItem.delete(i.id)));
    setItems([]);
  };

  const totalItems = items.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);

  return (
    <CartContext.Provider value={{
      items,
      loading,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      fetchCart,
      totalItems,
      totalPrice,
      sessionId,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}