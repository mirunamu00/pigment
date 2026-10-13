"use client";

import { useState } from "react";
import { buildPrompt, connectSnippet, mcpRequest, type Client, type Delivery, type Mode } from "@pigment/content/prompts";
import { CopyButton, Segmented } from "./controls";
import { Note, Tape } from "./details";

const MODES = [
  ["new", "New"],
  ["existing", "Existing"],
  ["ongoing", "Ongoing"],
] as const;
const AGENTS = [
  ["claude", "Claude Code"],
  ["codex", "Codex"],
  ["other", "Other"],
] as const;
const DELIVERIES = [
  ["url", "Spec URL"],
  ["mcp", "MCP"],
  ["offline", "Offline"],
] as const;

export function ApplyPanel({ id, version, name }: { id: string; version: string; name: string }) {
  const [mode, setMode] = useState<Mode>("existing");
  const [agent, setAgent] = useState<Client>("claude");
  const [delivery, setDelivery] = useState<Delivery>("url");
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const prompt = buildPrompt(id, version, mode, delivery);
  const connect = connectSnippet(agent, "remote");
  const request = mcpRequest(id, mode);
  const reset = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setStatus(null);
  };

  return (
    <div className="panel panel--pinned apply">
      <Tape style={{ top: -11, left: "calc(50% - 48px)" }} width={96} rotate={-2} />
      <h2 id="apply-h">Apply {name}</h2>

      <div className="apply__step">
        <span className="apply__step-label">
          <span className="mono">01</span> Project
        </span>
        <Segmented fill label="Project" options={MODES} value={mode} onChange={reset(setMode)} />
      </div>
      <div className="apply__step">
        <span className="apply__step-label">
          <span className="mono">02</span> Agent
        </span>
        <Segmented fill label="Agent" options={AGENTS} value={agent as (typeof AGENTS)[number][0]} onChange={reset(setAgent)} />
      </div>
      <div className="apply__step">
        <span className="apply__step-label">
          <span className="mono">03</span> Spec delivery
        </span>
        <Segmented fill label="Spec delivery" options={DELIVERIES} value={delivery} onChange={reset(setDelivery)} />
      </div>

      {delivery === "mcp" ? (
        <>
          <div className="apply__step">
            <span className="apply__step-label">Connect once</span>
            <pre className="code" style={{ padding: "12px 14px", fontSize: 12, lineHeight: 1.6, borderRadius: 10 }}>
              {connect}
            </pre>
            <span className="meta">
              {agent === "claude" ? "Run it in a terminal, then start a new session." : "Exact config format follows your client's documentation."}
            </span>
          </div>
          <CopyButton
            text={connect}
            label={agent === "claude" ? "Copy command" : "Copy config"}
            className="btn btn--primary btn--lg"
            successMessage="Connection copied."
            onStatus={setStatus}
          />
          <p aria-live="polite" className="apply__status" style={{ color: status?.ok ? "var(--ok)" : "var(--err)" }}>
            {status?.message ?? ""}
          </p>

          {/* Bottom margin reserves room for the note under the request. */}
          <div className="apply__step" style={{ position: "relative", marginBottom: 30 }}>
            <span className="apply__step-label">Then just ask</span>
            <p className="apply__ask">“{request}”</p>
            <span className="meta">No prompt to paste — the agent reads the spec through the Pigment tools and records the version it used.</span>
            <Note arrow="up-left" arrowFirst style={{ right: 4, bottom: -40, color: "var(--ink-2)" }}>
              <span style={{ paddingTop: 10, display: "block", fontSize: 20 }}>latest, then pinned</span>
            </Note>
          </div>
        </>
      ) : (
        <>
          {/* Bottom margin reserves room for the note so it never sits on the copy button. */}
          <div className="apply__step" style={{ position: "relative", marginBottom: 30 }}>
            <span className="apply__step-label">Prompt</span>
            <pre className="code" style={{ padding: 16, fontSize: 12.5, lineHeight: 1.7, borderRadius: 12 }}>
              {prompt}
            </pre>
            <Note arrow="up-left" arrowFirst style={{ right: 4, bottom: -40, color: "var(--ink-2)" }}>
              <span style={{ paddingTop: 10, display: "block", fontSize: 20 }}>version is pinned</span>
            </Note>
          </div>
          <CopyButton text={prompt} className="btn btn--primary btn--lg" successMessage={`Prompt for ${id}@${version} copied.`} onStatus={setStatus} />
          <p aria-live="polite" className="apply__status" style={{ color: status?.ok ? "var(--ok)" : "var(--err)" }}>
            {status?.message ?? ""}
          </p>
        </>
      )}

      <div className="apply__package">
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>
            {id}-{version}.zip
          </span>
          <span className="mono meta" style={{ fontSize: 11 }}>
            offline package · same version as this page
          </span>
        </span>
        <a href={`/download/${id}/${version}`} className="btn">
          Download
        </a>
      </div>
    </div>
  );
}
