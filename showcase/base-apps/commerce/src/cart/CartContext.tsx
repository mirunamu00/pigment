import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import { findProduct, MAX_QUANTITY, shippingFor, type Product } from '../data/products';

export interface CartLine {
  id: string;
  slug: string;
  variant: string;
  quantity: number;
}

export interface CartLineWithProduct extends CartLine {
  product: Product;
  lineTotal: number;
}

type CartAction =
  | { type: 'add'; slug: string; variant: string; quantity: number }
  | { type: 'setQuantity'; id: string; quantity: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

function clampQuantity(quantity: number): number {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));
}

function lineId(slug: string, variant: string): string {
  return `${slug}::${variant}`;
}

function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'add': {
      const id = lineId(action.slug, action.variant);
      const existing = lines.find((line) => line.id === id);
      if (existing) {
        return lines.map((line) =>
          line.id === id ? { ...line, quantity: clampQuantity(line.quantity + action.quantity) } : line,
        );
      }
      return [...lines, { id, slug: action.slug, variant: action.variant, quantity: clampQuantity(action.quantity) }];
    }
    case 'setQuantity':
      return lines.map((line) => (line.id === action.id ? { ...line, quantity: clampQuantity(action.quantity) } : line));
    case 'remove':
      return lines.filter((line) => line.id !== action.id);
    case 'clear':
      return [];
  }
}

interface CartContextValue {
  lines: CartLineWithProduct[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (slug: string, variant: string, quantity: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [rawLines, dispatch] = useReducer(cartReducer, []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLineWithProduct[] = [];
    for (const line of rawLines) {
      const product = findProduct(line.slug);
      if (product) lines.push({ ...line, product, lineTotal: product.price * line.quantity });
    }
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const shipping = shippingFor(subtotal);
    return {
      lines,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem: (slug, variant, quantity) => dispatch({ type: 'add', slug, variant, quantity }),
      setQuantity: (id, quantity) => dispatch({ type: 'setQuantity', id, quantity }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [rawLines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
}
