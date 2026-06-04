"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { MenuItem } from "@/app/data/menuData";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalQuantity: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "cafe-kalakar-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addToCart = useCallback((item: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + quantity } : c
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setItems((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((c) => c.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity } : c))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalQuantity = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalQuantity,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((v) => !v),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
