import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { INITIAL_PLAN, INITIAL_SAVED, INITIAL_SHOPPING, USER, type ShoppingItem } from './data/household';
import { AISLES, getRecipe } from './data/recipes';
import { formatQty, type Units } from './format';

export interface Toast {
  id: number;
  message: string;
  action?: { label: string; to: string };
}

export interface Settings {
  name: string;
  email: string;
  household: string;
  adults: number;
  children: number;
  diets: Record<string, boolean>;
  allergies: string;
  units: Units;
  oven: 'fan' | 'conventional';
  notify: { tonight: boolean; weekly: boolean; shopping: boolean; newRecipes: boolean };
  reminderTime: string;
}

export const DEFAULT_SETTINGS: Settings = {
  name: USER.name,
  email: USER.email,
  household: USER.household,
  adults: 2,
  children: 1,
  diets: { vegetarian: false, vegan: false, pescatarian: false, 'gluten-free': false, 'dairy-free': false, 'nut-free': true },
  allergies: 'Tree nuts (Isla)',
  units: 'metric',
  oven: 'fan',
  notify: { tonight: true, weekly: true, shopping: false, newRecipes: false },
  reminderTime: '17:00',
};

interface Store {
  saved: string[];
  toggleSave: (slug: string) => void;
  plan: Record<string, string>;
  setSlot: (key: string, slug: string | null) => void;
  moveSlot: (from: string, to: string) => void;
  shopping: ShoppingItem[];
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  addItem: (item: Omit<ShoppingItem, 'id' | 'checked'>) => void;
  clearChecked: () => number;
  generateList: () => { added: number; skipped: number };
  settings: Settings;
  saveSettings: (s: Settings) => void;
  toasts: Toast[];
  toast: (message: string, action?: Toast['action']) => void;
  dismiss: (id: number) => void;
}

const Ctx = createContext<Store | null>(null);

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function StoreProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(INITIAL_SAVED);
  const [plan, setPlan] = useState<Record<string, string>>(INITIAL_PLAN);
  const [shopping, setShopping] = useState<ShoppingItem[]>(INITIAL_SHOPPING);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback(
    (message: string, action?: Toast['action']) => {
      const id = nextId.current++;
      setToasts((t) => [...t.slice(-2), { id, message, action }]);
      window.setTimeout(() => dismiss(id), 6000);
    },
    [dismiss],
  );

  const toggleSave = useCallback(
    (slug: string) => {
      const r = getRecipe(slug);
      const on = !saved.includes(slug);
      setSaved((s) => (on ? [slug, ...s.filter((x) => x !== slug)] : s.filter((x) => x !== slug)));
      toast(
        on ? `Saved “${r?.title}” to your recipes` : `Removed “${r?.title}” from saved`,
        on ? { label: 'View saved', to: '/recipes?saved=1' } : undefined,
      );
    },
    [saved, toast],
  );

  const setSlot = useCallback((key: string, slug: string | null) => {
    setPlan((p) => {
      const next = { ...p };
      if (slug) next[key] = slug;
      else delete next[key];
      return next;
    });
  }, []);

  const moveSlot = useCallback((from: string, to: string) => {
    setPlan((p) => {
      const next = { ...p };
      const a = p[from];
      const b = p[to];
      if (a) next[to] = a;
      if (b) next[from] = b;
      else delete next[from];
      return next;
    });
  }, []);

  const toggleItem = useCallback((id: string) => setShopping((s) => s.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))), []);
  const removeItem = useCallback((id: string) => setShopping((s) => s.filter((i) => i.id !== id)), []);
  const addItem = useCallback((it: Omit<ShoppingItem, 'id' | 'checked'>) => {
    setShopping((s) => {
      let id = slugify(it.name) || 'item';
      while (s.some((x) => x.id === id)) id += '-2';
      return [...s, { ...it, id, checked: false }];
    });
  }, []);
  const clearChecked = useCallback(() => {
    const count = shopping.filter((i) => i.checked).length;
    setShopping((s) => s.filter((i) => !i.checked));
    return count;
  }, [shopping]);

  const generateList = useCallback(() => {
    const have = new Set(shopping.map((i) => i.name.toLowerCase()));
    const merged = new Map<string, { name: string; qty: number | null; unit: string; aisle: ShoppingItem['aisle']; from: Set<string> }>();
    let skipped = 0;
    for (const slug of Object.values(plan)) {
      const r = getRecipe(slug);
      if (!r) continue;
      for (const [qty, unit, name, aisle] of r.ingredients) {
        if (aisle === 's') {
          skipped++;
          continue;
        }
        const label = name.charAt(0).toUpperCase() + name.slice(1);
        if (have.has(label.toLowerCase())) continue;
        const key = `${label}|${unit}`;
        const cur = merged.get(key);
        if (cur) {
          cur.qty = cur.qty !== null && qty !== null ? cur.qty + qty : cur.qty;
          cur.from.add(r.title);
        } else merged.set(key, { name: label, qty, unit, aisle, from: new Set([r.title]) });
      }
    }
    const added: ShoppingItem[] = [...merged.values()].map((m) => ({
      id: slugify(m.name),
      name: m.name,
      qty: formatQty(m.qty, m.unit, 1),
      aisle: m.aisle,
      checked: false,
      from: [...m.from].join(', '),
    }));
    setShopping((s) => [...s, ...added.filter((a) => !s.some((x) => x.id === a.id))]);
    return { added: added.length, skipped };
  }, [plan, shopping]);

  const saveSettings = useCallback((s: Settings) => setSettings(s), []);

  const value = useMemo<Store>(
    () => ({
      saved, toggleSave, plan, setSlot, moveSlot, shopping, toggleItem, removeItem, addItem, clearChecked, generateList,
      settings, saveSettings, toasts, toast, dismiss,
    }),
    [saved, toggleSave, plan, setSlot, moveSlot, shopping, toggleItem, removeItem, addItem, clearChecked, generateList, settings, saveSettings, toasts, toast, dismiss],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore outside provider');
  return s;
}

export { AISLES };
