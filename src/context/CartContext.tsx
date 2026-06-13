import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Cart, CartItemCreate } from '../types';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (userId: string, item: CartItemCreate) => Promise<void>;
  removeFromCart: (userId: string, cartItemId: number) => Promise<void>;
  updateQuantity: (userId: string, cartItemId: number, quantity: number) => Promise<void>;
  clearCart: (userId: string) => Promise<void>;
  loadCart: (userId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const loadCart = async (userId: string) => {
    setLoading(true);
    try {
      const { cartService } = await import('../services/api');
      const cartData = await cartService.getCart(userId);
      setCart(cartData);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (userId: string, item: CartItemCreate) => {
    setLoading(true);
    try {
      const { cartService } = await import('../services/api');
      const updatedCart = await cartService.addToCart(userId, item);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (userId: string, cartItemId: number) => {
    setLoading(true);
    try {
      const { cartService } = await import('../services/api');
      const updatedCart = await cartService.removeFromCart(userId, cartItemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (userId: string, cartItemId: number, quantity: number) => {
    setLoading(true);
    try {
      const { cartService } = await import('../services/api');
      const updatedCart = await cartService.updateCartItem(userId, cartItemId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (userId: string) => {
    setLoading(true);
    try {
      const { cartService } = await import('../services/api');
      const updatedCart = await cartService.clearCart(userId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, updateQuantity, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
