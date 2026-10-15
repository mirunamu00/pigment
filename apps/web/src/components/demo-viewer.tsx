"use client";

import { useState } from "react";
import { Segmented } from "./controls";
import { Tape } from "./details";
import { PhoneRail } from "./phone-rail";
import { APPS, Shot, type AppKey } from "./shot";

function isDark(hex: string): boolean {
  const n = parseInt(hex.slice(1, 7), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 128;
}

export interface DemoScreen {
  name: string;
  shots: Partial<Record<"desktopLight" | "desktopDark" | "mobileLight" | "mobileDark", string>>;
}

export function DemoViewer({
  id,
  shots,
  screens = {},
  light,
  dark,
  appearance = ["light", "dark"],
}: {
  id: string;
  shots: Record<string, string>;
  screens?: Record<string, DemoScreen[]>;
  light: string;
  dark: string;
  /** The modes the system has; a single-mode system shows no theme switch. */
  appearance?: Array<"light" | "dark">;
}) {
  const [app, setApp] = useState<AppKey>("dashboard");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [scheme, setScheme] = useState<"light" | "dark">(appearance.includes("light") ? "light" : "dark");
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
          {appearance.length > 1 && (
            <Segmented label="Theme" options={[["light", "Light"], ["dark", "Dark"]] as const} value={scheme} onChange={setScheme} />
          )}
        </div>
      </div>
      <div style={{ position: "relative", paddingTop: 6 }}>
        {/* Tape pins the single frame at its edge; phones have no edge to spare, so it stays off them. */}
        {!mobile && (
          <>
            <Tape style={{ top: -4, left: 48 }} width={96} rotate={-4} />
            <Tape alt style={{ top: -3, right: 56 }} width={80} rotate={5} />
          </>
        )}
        {mobile && screens[app]?.length ? (
          <PhoneRail
            label={label}
            bg={bg}
            screens={screens[app]!.map((s) => ({ name: s.name, src: s.shots[scheme === "light" ? "mobileLight" : "mobileDark"] }))}
          />
        ) : (
        <Shot
          src={shots[key]}
          title={label}
          meta={`/${id}/${app} · ${mobile ? "390 × 844" : "1440 × 900"} · ${scheme}`}
          bg={bg}
          ink={isDark(bg) ? "#e8ebf1" : "#0e0e0c"}
          height={520}
          ariaLabel={`${label} demo, ${viewport}, ${scheme}`}
          style={mobile && !shots[key] ? { width: "100%" } : undefined}
        />
        )}
      </div>
      <div role="group" aria-label="Demo app" className="thumbs">
        {APPS.map(([k, name]) => {
          // Thumbnails follow the chosen theme, so switching to dark doesn't leave four light previews.
          const thumb = shots[`${k}.desktop${scheme === "light" ? "Light" : "Dark"}`];
          return (
            <button key={k} type="button" aria-pressed={app === k} onClick={() => setApp(k)}>
              <span className="thumbs__img" style={{ ["--shot-bg" as string]: bg, backgroundImage: thumb ? `url(${thumb})` : undefined }} />
              <span className="thumbs__caption">
                <span className="thumbs__name">{name}</span>
                <span className="mono meta">/{k}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="meta" style={{ marginTop: 14 }}>
        Built by a coding agent from this system's prompt, on the same base apps as every other system. Unedited.
      </p>
    </>
  );
}
