import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { findCoffee } from './data/coffees';

export interface CartLine {
  slug: string;
  size: '250g' | '1kg';
  grind: string;
  qty: number;
}

interface CartValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: CartLine) => void;
  setQty: (index: number, qty: number) => void;
  remove: (index: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartValue | null>(null);

export function linePrice(line: CartLine): number {
  const c = findCoffee(line.slug);
  if (!c) return 0;
  return (line.size === '1kg' ? c.priceKg : c.price) * line.qty;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.slug === line.slug && l.size === line.size && l.grind === line.grind);
      if (i === -1) return [...prev, line];
      const next = [...prev];
      next[i] = { ...next[i], qty: Math.min(next[i].qty + line.qty, 20) };
      return next;
    });
  }, []);

  const setQty = useCallback((index: number, qty: number) => {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, Math.min(qty, 20)) } : l)));
  }, []);

  const remove = useCallback((index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + linePrice(l), 0),
      add,
      setQty,
      remove,
      open,
      setOpen,
    }),
    [lines, add, setQty, remove, open],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const v = useContext(CartContext);
  if (!v) throw new Error('useCart outside CartProvider');
  return v;
}
