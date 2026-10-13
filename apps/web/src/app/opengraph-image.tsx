import { ImageResponse } from "next/og";
import { Bloom, INK, INK_3, LINE, Mark, OG_SIZE, PAPER, ogFonts } from "@/lib/og";

export const alt = "Pigment — give your agent a palette, not a prompt.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: PAPER, padding: "64px 72px", position: "relative", fontFamily: "Geist", color: INK }}>
        <Bloom right={-170} top={250} size={620} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>
          <Mark size={40} />
          Pigment
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 86, lineHeight: 1.02, letterSpacing: "-0.035em", fontWeight: 600 }}>
            <span>Give your agent a&nbsp;</span>
            <span style={{ display: "flex" }}>
              <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em" }}>palette</span>
              <span>,&nbsp;</span>
            </span>
            <span>not a prompt.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, color: INK_3, maxWidth: 820 }}>
            Versioned design systems that Claude Code, Codex and any MCP client can apply.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, color: INK_3 }}>
          <span style={{ border: `1.5px solid ${LINE}`, borderRadius: 999, padding: "8px 18px", color: INK, background: "#ffffff" }}>$ claude mcp add pigment</span>
          <span>pigmentui.com</span>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() },
  );
}
