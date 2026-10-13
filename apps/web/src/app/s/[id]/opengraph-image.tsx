import { ImageResponse } from "next/og";
import { listTemplates } from "@pigment/content";
import { INK, INK_3, LINE, Mark, OG_SIZE, PAPER, ogFonts, publicImage } from "@/lib/og";

export const alt = "A Pigment design system applied to a reference app";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  const list = listTemplates();
  return list.length ? list.map((t) => ({ id: t.id })) : [{ id: "_none" }];
}

export default async function SystemImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = listTemplates().find((x) => x.id === id);
  const name = t?.name ?? "Pigment";
  const description = t?.description ?? "";
  const short = description.length > 150 ? `${description.slice(0, 147).replace(/[\s,;]+\S*$/, "")}…` : description;
  // Unedited agent output: the dashboard app restyled with this system.
  const shot = t && publicImage(t.shots["dashboard.desktopLight"] ?? Object.values(t.shots)[0] ?? "");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PAPER, fontFamily: "Geist", color: INK }}>
        <div style={{ width: 560, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 0 60px 68px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
            <Mark size={32} />
            Pigment
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, color: INK_3, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Design system
            </div>
            <div style={{ marginTop: 10, fontFamily: "Instrument Serif", fontSize: 92, lineHeight: 1, letterSpacing: "-0.01em" }}>{name}</div>
            <div style={{ marginTop: 22, fontSize: 25, lineHeight: 1.4, color: INK_3, paddingRight: 24 }}>{short}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {(t?.swatches ?? []).map((c) => (
              <div key={c} style={{ width: 34, height: 34, borderRadius: 999, background: c, border: `1.5px solid ${LINE}` }} />
            ))}
            <span style={{ marginLeft: 14, fontSize: 22, color: INK_3 }}>pigmentui.com</span>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: 8 }}>
          {shot ? (
            <img
              src={shot}
              width={760}
              height={475}
              style={{ objectFit: "cover", objectPosition: "top left", borderRadius: 14, border: `1.5px solid ${LINE}`, boxShadow: "0 24px 60px rgba(14,14,12,0.14)" }}
            />
          ) : null}
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() },
  );
}
