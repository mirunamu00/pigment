import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SITE_URL } from "@pigment/content/prompts";
import { WatercolorFilters } from "@/components/details";
import "./globals.css";
import "./pages.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-hand", display: "swap" });

const TITLE = "Pigment — Design systems for coding agents";
const DESCRIPTION = "Design systems your coding agent sets up in your project — at the start, on a product you already have, and for every screen after. For Claude Code, Codex and any MCP client.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — Pigment" },
  description: DESCRIPTION,
  applicationName: "Pigment",
  keywords: ["design system", "design tokens", "AI coding agent", "MCP server", "Claude Code", "Codex", "Cursor", "UI templates"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Pigment", locale: "en_US", url: "/", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
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
