"use client";

import { useState } from "react";
import { Segmented } from "./controls";
import { Tape } from "./details";
import { APPS, Shot, type AppKey } from "./shot";

function isDark(hex: string): boolean {
  const n = parseInt(hex.slice(1, 7), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 128;
}

export function DemoViewer({ id, version, shots, light, dark }: { id: string; version: string; shots: Record<string, string>; light: string; dark: string }) {
  const [app, setApp] = useState<AppKey>("dashboard");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [scheme, setScheme] = useState<"light" | "dark">("light");
  const key = `${app}.${viewport}${scheme === "light" ? "Light" : "Dark"}`;
  const label = APPS.find(([k]) => k === app)![1];
  const bg = scheme === "dark" ? dark : light;
  const mobile = viewport === "mobile";

  return (
    <>
      <div className="section-head">
        <h2 id="demos-h">Built with this system</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Segmented label="Viewport" options={[["desktop", "Desktop"], ["mobile", "Mobile"]] as const} value={viewport} onChange={setViewport} />
          <Segmented label="Theme" options={[["light", "Light"], ["dark", "Dark"]] as const} value={scheme} onChange={setScheme} />
        </div>
      </div>
      <div style={{ position: "relative", paddingTop: 6 }}>
        <Tape style={{ top: -4, left: 48 }} width={96} rotate={-4} />
        <Tape alt style={{ top: -3, right: 56 }} width={80} rotate={5} />
        <Shot
          src={shots[key]}
          title={label}
          meta={`/${id}/${version}/${app} · ${mobile ? "390 × 844" : "1440 × 900"} · ${scheme}`}
          bg={bg}
          ink={isDark(bg) ? "#e8ebf1" : "#0e0e0c"}
          height={520}
          ariaLabel={`${label} demo, ${viewport}, ${scheme}`}
          style={mobile && !shots[key] ? { width: "100%" } : undefined}
        />
      </div>
      <div role="group" aria-label="Demo app" className="thumbs">
        {APPS.map(([k, name]) => {
          const thumb = shots[`${k}.desktopLight`];
          return (
            <button key={k} type="button" aria-pressed={app === k} onClick={() => setApp(k)}>
              <span className="thumbs__img" style={{ ["--shot-bg" as string]: light, backgroundImage: thumb ? `url(${thumb})` : undefined }} />
              <span className="thumbs__caption">
                <span className="thumbs__name">{name}</span>
                <span className="mono meta">/{k}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="meta" style={{ marginTop: 14 }}>
        Built once for v{version} by a coding agent from the standard prompt, on the same base apps as every other system. Unedited.
      </p>
    </>
  );
}
