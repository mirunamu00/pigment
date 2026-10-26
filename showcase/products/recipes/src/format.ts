import type { Ingredient } from './data/recipes';

const FRACTIONS: [number, string][] = [
  [0, ''],
  [0.25, '¼'],
  [1 / 3, '⅓'],
  [0.5, '½'],
  [2 / 3, '⅔'],
  [0.75, '¾'],
  [1, ''],
];

function fraction(q: number): string {
  let whole = Math.floor(q);
  const rest = q - whole;
  let best = FRACTIONS[0];
  for (const f of FRACTIONS) if (Math.abs(f[0] - rest) < Math.abs(best[0] - rest)) best = f;
  if (best[0] === 1) whole += 1;
  const frac = best[0] === 1 ? '' : best[1];
  if (whole === 0 && !frac) return '¼';
  return `${whole || ''}${frac}`;
}

function roundTo(q: number, step: number) {
  return Math.max(step, Math.round(q / step) * step);
}

export type Units = 'metric' | 'imperial';

export function formatQty(qty: number | null, unit: string, scale: number, units: Units = 'metric'): string {
  if (qty === null) return 'To taste';
  let q = qty * scale;
  let u = unit;
  if (units === 'imperial') {
    if (u === 'g') {
      q = q / 28.35;
      u = q >= 16 ? 'lb' : 'oz';
      if (u === 'lb') q = q / 16;
    } else if (u === 'ml' || u === 'l') {
      q = (u === 'l' ? q * 1000 : q) / 28.41;
      u = 'fl oz';
    }
    const shown = u === 'lb' ? fraction(q) : q >= 10 ? String(Math.round(q)) : fraction(q);
    return `${shown} ${u}`;
  }
  if (u === 'g' || u === 'ml') {
    if (q >= 1000) {
      const v = (Math.round(q / 50) * 50) / 1000;
      return `${parseFloat(v.toFixed(2))} ${u === 'g' ? 'kg' : 'l'}`;
    }
    const step = q >= 200 ? 25 : q >= 50 ? 5 : 1;
    return `${roundTo(q, step)} ${u}`;
  }
  if (u === 'l') {
    const v = Math.round(q * 10) / 10;
    return `${v} l`;
  }
  const shown = fraction(q);
  return u ? `${shown} ${u}` : shown;
}

export function ingredientLine(ing: Ingredient, scale: number, units: Units) {
  const [qty, unit, name, , note] = ing;
  return { qty: formatQty(qty, unit, scale, units), name, note };
}

export function minutes(total: number): string {
  if (total < 60) return `${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
