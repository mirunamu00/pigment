"use client";

import Link from "next/link";
import { useState } from "react";
import { Segmented } from "./controls";
import { Note, Tape } from "./details";
import { APPS, Shot, type AppKey } from "./shot";

export interface CompareItem {
  id: string;
  name: string;
  shots: Record<string, string>;
  lightBg: string | null;
  darkBg: string | null;
  accent: string;
  rows: Record<string, string>;
}

const MAX = 3;

function isDark(hex: string): boolean {
  const n = parseInt(hex.slice(1, 7), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 128;
}

export function CompareView({ items }: { items: CompareItem[] }) {
  const [ids, setIds] = useState<string[]>(items.slice(0, MAX).map((i) => i.id));
  const [app, setApp] = useState<AppKey>("dashboard");
  const [scheme, setScheme] = useState<"light" | "dark">("light");
  const [announce, setAnnounce] = useState("");

  if (items.length < 2) {
    return (
      <div className="gallery-empty" style={{ marginTop: 8 }}>
        <Tape style={{ top: -10, left: "calc(50% - 44px)" }} rotate={-3} />
        <p className="gallery-empty__title">Nothing to compare yet.</p>
        <p className="muted">Comparison opens once two systems are published.</p>
        <div>
          <Link href="/" className="btn">
            Back to systems
          </Link>
        </div>
      </div>
    );
  }

  const selected = ids.map((id) => items.find((i) => i.id === id)!).filter(Boolean);
  const available = items.filter((i) => !ids.includes(i.id));
  const label = APPS.find(([k]) => k === app)![1];
  const cols = selected.length + (selected.length < MAX && available.length ? 1 : 0);
  const rowKeys = Object.keys(selected[0]?.rows ?? {});

  return (
    <>
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
        <Segmented label="Demo app" options={APPS} value={app} onChange={setApp} />
        <Segmented label="Theme" options={[["light", "Light"], ["dark", "Dark"]] as const} value={scheme} onChange={setScheme} />
      </div>

      <div className="compare-cols" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {selected.map((item, i) => {
          const bg = scheme === "dark" ? item.darkBg : item.lightBg;
          return (
            <div key={item.id} className="compare-col">
              <div className="compare-picker">
                <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: "50%", background: item.accent, flex: "none" }} />
                  <span style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</span>
                </span>
                <button
                  type="button"
                  className="btn"
                  style={{ width: 32, height: 32, padding: 0, border: "none" }}
                  aria-label={`Remove ${item.name} from comparison`}
                  disabled={selected.length <= 1}
                  onClick={() => {
                    setIds(ids.filter((x) => x !== item.id));
                    setAnnounce(`${item.name} removed`);
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{ position: "relative", paddingTop: 4 }}>
                <Tape style={{ top: -6, left: "calc(50% - 40px)" }} width={80} rotate={[-3, 4, -5][i % 3]} />
                <Shot
                  src={bg ? item.shots[`${app}.desktop${scheme === "light" ? "Light" : "Dark"}`] : undefined}
                  title={bg ? label : `No ${scheme} mode`}
                  meta={bg ? `/${item.id}/${app}` : `${item.name} ships ${item.rows.appearance} only`}
                  bg={bg ?? "#e9e6df"}
                  ink={bg && isDark(bg) ? "#e8ebf1" : "#0e0e0c"}
                  height={360}
                  href={`/s/${item.id}`}
                  ariaLabel={`Open ${item.name}`}
                />
              </div>
            </div>
          );
        })}
        {selected.length < MAX && available.length > 0 && (
          <label className="compare-add" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24, lineHeight: 1 }}>+</span>
            Add a system
            <select
              className="input"
              value=""
              onChange={(e) => {
                if (!e.target.value) return;
                setIds([...ids, e.target.value]);
                setAnnounce(`${items.find((x) => x.id === e.target.value)?.name} added`);
              }}
            >
              <option value="">Choose…</option>
              {available.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <Note arrow="up-left" arrowFirst style={{ position: "relative", margin: "18px 0 0 8px" }}>
          <span style={{ paddingTop: 10, display: "block", fontSize: 21 }}>identical app, identical prompt — only the paint differs</span>
        </Note>
      </div>

      <section aria-labelledby="diff-h" style={{ position: "relative", zIndex: 1, marginTop: 72 }}>
        <h2 id="diff-h" style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
          Token differences
        </h2>
        <div className="diff">
          {rowKeys.map((key) => (
            <div key={key} className="diff__row" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(0, 1fr))` }}>
              <span className="mono meta">{key}</span>
              {selected.map((item) => {
                const v = item.rows[key]!;
                const isColor = /^#[0-9a-f]{6}/i.test(v);
                return (
                  <span key={item.id} className="diff__cell">
                    {isColor && <span className="diff__chip" style={{ background: v }} />}
                    <span className={isColor || /px|rem/.test(v) ? "mono" : undefined} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {v}
                    </span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </section>
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>
    </>
  );
}
