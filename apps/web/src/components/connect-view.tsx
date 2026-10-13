"use client";

import { useState } from "react";
import { connectSnippet, type Client } from "@pigment/content/prompts";
import { Note, Tape } from "./details";

const CLIENTS: ReadonlyArray<readonly [Client, string]> = [
  ["claude", "Claude Code"],
  ["codex", "Codex"],
  ["cursor", "Cursor"],
  ["vscode", "VS Code"],
  ["other", "Other clients"],
];

export function ConnectView() {
  const [client, setClient] = useState<Client>("claude");
  const name = CLIENTS.find(([k]) => k === client)![1];
  const isClaude = client === "claude";

  return (
    <>
      <div role="tablist" aria-label="Client" className="tabs-line">
        {CLIENTS.map(([key, label]) => (
          <button key={key} type="button" role="tab" aria-selected={client === key} onClick={() => setClient(key)}>
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-label={name} style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 40 }}>
        <div style={{ position: "relative" }}>
          <Tape style={{ top: -11, left: 40 }} rotate={-3} />
          <section aria-labelledby="m1" className="panel panel--pinned method">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h2 id="m1" style={{ fontSize: 19 }}>
                Remote server
              </h2>
              <span className="pill-dark">Recommended</span>
            </div>
            <p>Nothing to install. Always serves the exact version your prompt pins.</p>
            <pre className="code" style={{ padding: "16px 18px" }}>
              {connectSnippet(client, "remote")}
            </pre>
            <p className="meta">
              {isClaude
                ? "Add --scope project to share it with your team through .mcp.json."
                : `Paste into ${name}'s MCP settings. Exact format follows ${name}'s documentation.`}
            </p>
          </section>
          <Note arrow="down-right" style={{ right: -14, top: -46 }}>
            <span style={{ paddingBottom: 18, display: "block" }}>start here</span>
          </Note>
        </div>

        <section aria-labelledby="m2" className="panel method">
          <h2 id="m2">Local, through npx</h2>
          <p>For networks that block remote MCP. Runs on your machine and is started by your agent — nothing is added to your project.</p>
          <pre className="code code--light" style={{ padding: "14px 16px", fontSize: 12.5 }}>
            {connectSnippet(client, "local")}
          </pre>
          <p className="meta">
            Fully offline? Point it at a downloaded package: <span className="mono">--package ./design-packages/&lt;system&gt;-&lt;version&gt;</span>
          </p>
        </section>

        <section aria-labelledby="m3" className="panel method">
          <h2 id="m3">Pinned per project</h2>
          <p>Lock the server version in your lockfile so the whole team and CI use the same one. Dev dependency only — it never ships with your app.</p>
          <pre className="code code--light" style={{ padding: "14px 16px", fontSize: 12.5 }}>
            {connectSnippet(client, "project")}
          </pre>
        </section>
      </div>
    </>
  );
}
