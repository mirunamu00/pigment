import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { WatercolorFilters } from "@/components/details";
import "./globals.css";
import "./pages.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Pigment — Design systems for coding agents", template: "%s — Pigment" },
  description: "Versioned design systems that Claude Code, Codex and any MCP client can apply to new and existing codebases.",
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable} ${hand.variable}`}>
      <body>
        <WatercolorFilters />
        <div className="clip-x">{children}</div>
      </body>
    </html>
  );
}
