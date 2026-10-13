import { differenceCiede2000, formatHex, parse, wcagContrast } from "culori";

const deltaE = differenceCiede2000();

export function toHex(color: string): string | null {
  const parsed = parse(color);
  return parsed ? (formatHex(parsed) ?? null) : null;
}

/** Alpha below this is treated as a tint overlay, not a palette color. */
export function isMostlyOpaque(color: string): boolean {
  const parsed = parse(color);
  return !!parsed && (parsed.alpha === undefined || parsed.alpha >= 0.6);
}

export function distance(a: string, b: string): number {
  const pa = parse(a);
  const pb = parse(b);
  if (!pa || !pb) return Number.POSITIVE_INFINITY;
  return deltaE(pa, pb);
}

export function nearest(color: string, palette: string[]): { hex: string; delta: number } {
  let best = { hex: "", delta: Number.POSITIVE_INFINITY };
  for (const p of palette) {
    const d = distance(color, p);
    if (d < best.delta) best = { hex: p, delta: d };
  }
  return best;
}

export function contrast(fg: string, bg: string): number {
  return wcagContrast(fg, bg);
}
