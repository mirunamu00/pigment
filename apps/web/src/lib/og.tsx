import { readFileSync } from "node:fs";
import { join } from "node:path";

// Share images (Open Graph / X cards) are rendered at build time with next/og. The fonts are vendored
// (SIL Open Font License, from Google Fonts) so the build never depends on a network fetch.
export const OG_SIZE = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "src", "lib", "og-fonts");
const font = (file: string) => readFileSync(join(fontDir, file));

export function ogFonts() {
  return [
    { name: "Geist", data: font("Geist-Regular.ttf"), weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: font("Geist-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
    { name: "Instrument Serif", data: font("InstrumentSerif-Regular.ttf"), weight: 400 as const, style: "normal" as const },
    { name: "Instrument Serif", data: font("InstrumentSerif-Italic.ttf"), weight: 400 as const, style: "italic" as const },
  ];
}

export const INK = "#0e0e0c";
export const INK_3 = "#5a5a55";
export const PAPER = "#faf9f6";
export const LINE = "#e3e0d8";

/** The site mark (the favicon SVG), as a data URL so share images and the home-screen icon use the same file. */
export const MARK_SRC = `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), "src", "app", "icon.svg")).toString("base64")}`;

export function Mark({ size = 40 }: { size?: number }) {
  return <img src={MARK_SRC} width={size} height={size} />;
}

/** The ink-blue watercolor bloom, kept to an edge as on the site. */
export function Bloom({ right, top, size }: { right: number; top: number; size: number }) {
  return (
    <div
      style={{
        position: "absolute",
        right,
        top,
        width: size,
        height: size * 0.8,
        display: "flex",
        backgroundImage:
          "radial-gradient(closest-side at 42% 40%, rgba(24,73,242,0.30), rgba(24,73,242,0) 100%), radial-gradient(closest-side at 58% 58%, rgba(30,42,107,0.34), rgba(30,42,107,0) 100%)",
      }}
    />
  );
}

/** A file under public/ as a data URL (screenshots exported at publish time). */
export function publicImage(path: string): string | null {
  try {
    return `data:image/png;base64,${readFileSync(join(process.cwd(), "public", path)).toString("base64")}`;
  } catch {
    return null;
  }
}
