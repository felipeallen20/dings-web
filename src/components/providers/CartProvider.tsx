"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, CartLineGroup, CartLineInput } from "@/types/cart";

const TOAST_DURATION_MS = 2800;

interface CartContextValue {
  lines: CartLine[];
  groups: CartLineGroup[];
  totalItems: number;
  subtotal: number;
  isDrawerOpen: boolean;
  toast: CartLineInput | null;
  addItem: (item: CartLineInput) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<CartLineInput | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current !== null) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  }, []);

  useEffect(() => dismissToast, [dismissToast]);

  const addItem = useCallback((item: CartLineInput) => {
    setLines((current) => {
      const existing = current.find(
        (line) => line.productId === item.productId,
      );

      if (existing) {
        return current.map((line) =>
          line.productId === item.productId
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }

      return [...current, { ...item, quantity: 1 }];
    });

    setToast(item);

    if (toastTimerRef.current !== null) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      toastTimerRef.current = null;
      setToast(null);
    }, TOAST_DURATION_MS);
  }, []);

  const incrementItem = useCallback((productId: string) => {
    setLines((current) =>
      current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      ),
    );
  }, []);

  const decrementItem = useCallback((productId: string) => {
    setLines((current) =>
      current
        .map((line) =>
          line.productId === productId
            ? { ...line, quantity: line.quantity - 1 }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((current) =>
      current.filter((line) => line.productId !== productId),
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const totalItems = useMemo(
    () => lines.reduce((total, line) => total + line.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () =>
      lines.reduce((total, line) => total + line.price * line.quantity, 0),
    [lines],
  );

  const groups = useMemo(() => {
    const byRestaurant = new Map<string, CartLineGroup>();

    for (const line of lines) {
      const group = byRestaurant.get(line.restaurantId);

      if (group) {
        group.lines.push(line);
        group.subtotal += line.price * line.quantity;
        continue;
      }

      byRestaurant.set(line.restaurantId, {
        restaurantId: line.restaurantId,
        restaurantName: line.restaurantName,
        lines: [line],
        subtotal: line.price * line.quantity,
      });
    }

    return [...byRestaurant.values()];
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      groups,
      totalItems,
      subtotal,
      isDrawerOpen,
      toast,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      openDrawer,
      closeDrawer,
      dismissToast,
    }),
    [
      addItem,
      clearCart,
      closeDrawer,
      decrementItem,
      dismissToast,
      groups,
      incrementItem,
      isDrawerOpen,
      lines,
      openDrawer,
      removeItem,
      subtotal,
      toast,
      totalItems,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}