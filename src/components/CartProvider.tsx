"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartItem {
  variantId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (variantId: string) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "kaffe-guatilla-cart-v2";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item): item is CartItem =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as CartItem).variantId === "string" &&
          UUID_PATTERN.test((item as CartItem).variantId) &&
          Number.isSafeInteger((item as CartItem).quantity) &&
          (item as CartItem).quantity > 0,
      )
      .slice(0, 50)
      .map((item) => ({ ...item, quantity: Math.min(item.quantity, 99) }));
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setItems(loadCart());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  const addItem = useCallback((variantId: string) => {
    if (!UUID_PATTERN.test(variantId)) return;
    setItems((current) => {
      const existing = current.find((item) => item.variantId === variantId);
      if (existing) {
        return current.map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
            : item,
        );
      }
      return [...current, { variantId, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setItems((current) => current.filter((item) => item.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      setItems((current) => current.filter((item) => item.variantId !== variantId));
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.variantId === variantId
          ? { ...item, quantity: Math.min(quantity, 99) }
          : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        isHydrated: hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
