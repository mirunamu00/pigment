"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { TemplateSummary } from "@pigment/content";
import { buildPrompt } from "@pigment/content/prompts";
import { Chips, CopyButton, Segmented } from "./controls";
import { Tape } from "./details";
import { Shot } from "./shot";

const TONES = [
  ["all", "All"],
  ["minimal", "Minimal"],
  ["natural", "Natural"],
  ["soft", "Soft"],
  ["editorial", "Editorial"],
  ["brutalist", "Brutalist"],
  ["technical", "Technical"],
] as const;
const MODES = [
  ["all", "All"],
  ["light", "Light"],
  ["dark", "Dark"],
] as const;
const TAPE_ANGLES = [
  [-5, 4],
  [3, -3],
  [-2, 6],
  [6, -5],
  [-4, 3],
  [2, -6],
] as const;

function isDark(hex: string): boolean {
  const n = parseInt(hex.slice(1, 7), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 128;
}

export function Gallery({ templates }: { templates: TemplateSummary[] }) {
  const [tone, setTone] = useState<(typeof TONES)[number][0]>("all");
  const [mode, setMode] = useState<(typeof MODES)[number][0]>("all");
  const [status, setStatus] = useState("");
  const shown = useMemo(
    () => templates.filter((t) => (tone === "all" || t.tags.tone === tone) && (mode === "all" || t.tags.appearance.includes(mode))),
    [templates, tone, mode],
  );

  if (templates.length === 0) return <EmptyGallery />;

  return (
    <>
      <div className="gallery-toolbar">
        <p aria-live="polite" className="mono meta">
          {shown.length} {shown.length === 1 ? "system" : "systems"}
        </p>
        <div className="gallery-toolbar__filters">
          <Chips label="Tone" options={TONES} value={tone} onChange={setTone} />
          <span aria-hidden="true" className="gallery-toolbar__divider" />
          <Segmented label="Appearance" options={MODES} value={mode} onChange={setMode} />
        </div>
      </div>
      {shown.length === 0 ? (
        <p className="gallery-empty-filter">No system matches that mix yet. Try clearing a filter.</p>
      ) : (
        <div className="gallery-grid">
          {shown.map((t, i) => (
            <Card key={t.id} t={t} angles={TAPE_ANGLES[i % TAPE_ANGLES.length]!} onStatus={setStatus} />
          ))}
        </div>
      )}
      <p aria-live="polite" className="sr-only">
        {status}
      </p>
    </>
  );
}

function Card({ t, angles, onStatus }: { t: TemplateSummary; angles: readonly [number, number]; onStatus: (s: string) => void }) {
  const [product, setProduct] = useState(t.covers[0]?.product ?? "");
  const cover = t.covers.find((c) => c.product === product);
  const label = cover ? `${cover.name}, ${cover.kind.toLowerCase()}` : t.name;
  const bg = t.swatches[1] ?? "#eeeeee";
  // The system's default mode (listed first) is how it introduces itself.
  const src = cover && (t.tags.appearance[0] === "dark" ? (cover.shots.desktopDark ?? cover.shots.desktopLight) : (cover.shots.desktopLight ?? cover.shots.desktopDark));
  return (
    <article className="card">
      <Tape style={{ top: -10, left: 36 }} rotate={angles[0]} />
      <Tape alt width={72} style={{ top: -9, right: 40 }} rotate={angles[1]} />
      <Shot
        src={src}
        title={t.name}
        meta={cover ? cover.kind : "Showcase coming"}
        bg={bg}
        ink={isDark(bg) ? "#e8ebf1" : "#0e0e0c"}
        height={400}
        href={`/s/${t.id}`}
        openLabel="Details"
        ariaLabel={`${t.name} applied to ${label} by an agent`}
      />
      {t.covers.length > 0 && (
        <div className="card__row">
          <Segmented label={`Product for ${t.name}`} options={t.covers.map((c) => [c.product, c.kind] as const)} value={product} onChange={setProduct} />
          <span className="meta">A real product, restyled by an agent · unedited</span>
        </div>
      )}
      <div className="card__row card__row--top">
        <div style={{ minWidth: 0 }}>
          <div className="card__name">
            <h2>{t.name}</h2>
          </div>
          <p className="card__desc">{t.description}</p>
          <div className="card__swatches">
            <span className="swatches">
              {t.swatches.map((c, i) => (
                <span key={i} style={{ background: c }} />
              ))}
            </span>
            <span className="meta">
              {t.tags.tone} · {t.tags.corners} corners · {t.tags.density} · {t.tags.appearance.join(" & ")}
            </span>
          </div>
        </div>
        <div className="card__actions">
          <Link href={`/s/${t.id}`} className="btn">
            Details
          </Link>
          <CopyButton
            text={buildPrompt(t.id, "existing", "url")}
            successMessage={`Prompt for ${t.name} copied.`}
            onStatus={(s) => onStatus(s.message)}
          />
        </div>
      </div>
    </article>
  );
}

function EmptyGallery() {
  return (
    <div className="gallery-empty">
      <Tape style={{ top: -10, left: "calc(50% - 44px)" }} rotate={-3} />
      <p className="gallery-empty__title">The first systems are still being mixed.</p>
      <p className="muted">Every system here is tested by an agent and shown on real products before it is published. Meanwhile, connect your agent so it is ready.</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/connect" className="btn btn--primary">
          Connect an agent
        </Link>
        <Link href="/docs" className="btn">
          Read the docs
        </Link>
      </div>
    </div>
  );
}
