import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { getManifest, getTokens, listTemplates } from "@pigment/content";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { CompareView, type CompareItem } from "@/components/compare-view";
import { Bloom } from "@/components/details";

export const metadata: Metadata = pageMeta("Compare", "Compare Pigment design systems side by side: palette, type, spacing, radius and the same real products restyled by an agent.", "/compare");
export const dynamic = "force-static";

function items(): CompareItem[] {
  try {
    return listTemplates().map((t) => {
      const manifest = getManifest(t.id, t.version);
      const tokens = getTokens(t.id, t.version);
      const light = (tokens.light ?? {}) as Record<string, unknown>;
      const any = (tokens.light ?? tokens.dark ?? {}) as Record<string, unknown>;
      const s = (k: string) => (typeof any[k] === "string" ? String(any[k]) : "—");
      const family = (role: string) => manifest.fonts.find((f) => f.role === role)?.family;
      return {
        id: t.id,
        name: t.name,
        covers: t.covers,
        lightBg: typeof light["color.surface.subtle"] === "string" ? String(light["color.surface.subtle"]) : null,
        darkBg: typeof tokens.dark?.["color.surface.default"] === "string" ? String(tokens.dark["color.surface.default"]) : null,
        accent: s("color.action.primary"),
        rows: {
          "action.primary": s("color.action.primary"),
          "surface.default": s("color.surface.default"),
          "text.primary": s("color.text.primary"),
          "radius.md": s("radius.md"),
          "border.width.thin": s("border.width.thin"),
          "font.heading": family("heading") ?? family("display") ?? family("body") ?? "—",
          "font.body": family("body") ?? "—",
          density: manifest.tags.density,
          appearance: manifest.tags.appearance.join(", "),
        },
      };
    });
  } catch {
    return [];
  }
}

export default function ComparePage() {
  return (
    <>
      <SiteHeader active="compare" />
      <main className="page" style={{ position: "relative", paddingTop: 48 }}>
        <Bloom size={700} style={{ right: -200, top: -60 }} />
        <div style={{ position: "relative", zIndex: 1, paddingBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(36px, 5vw, 48px)", lineHeight: 1, fontWeight: 600, letterSpacing: "-0.04em" }}>
            Compare, <span className="serif">side by side</span>.
          </h1>
          <p className="muted" style={{ margin: "14px 0 0", fontSize: 16 }}>
            Same product, same prompt. Only the system changes.
          </p>
        </div>
        <CompareView items={items()} />
      </main>
      <SiteFooter />
    </>
  );
}
