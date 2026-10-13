import { spawn, type ChildProcess } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { paths } from "./paths.ts";
import { readJson, run } from "./util.ts";

export interface StateStep {
  action: "click" | "hover" | "focus" | "fill" | "press" | "goto";
  /** data-testid of the target; the first visible match is used. */
  testid?: string;
  value?: string;
}

export interface AppMeta {
  id: string;
  name: string;
  port: number;
  routes: Array<{ path: string; name: string; capture: boolean }>;
  /** Interaction states to capture (focus, hover, errors, dialogs, toasts): steps run from a route. */
  states?: Array<{ name: string; route: string; steps: StateStep[] }>;
}

const SKIP = new Set(["node_modules", "dist", "test-results", "playwright-report", ".turbo", ".snaps"]);

/**
 * Agent runs happen OUTSIDE the repository. Coding agents read instruction files (CLAUDE.md, AGENTS.md)
 * from parent folders; running inside this repo would leak our own instructions into the experiment.
 */
export const WORK_ROOT = process.env.PIGMENT_WORKDIR ?? join(tmpdir(), "pigment-runs");

export function baseApps(): string[] {
  return readdirSync(paths.baseApps).filter((d) => existsSync(join(paths.baseApps, d, "pigment.app.json")));
}

export function appMeta(dir: string): AppMeta {
  return readJson<AppMeta>(join(dir, "pigment.app.json"));
}

export function copyApp(from: string, to: string): void {
  mkdirSync(to, { recursive: true });
  cpSync(from, to, {
    recursive: true,
    filter: (src) => !src.split(/[\\/]/).some((part) => SKIP.has(part)),
  });
}

export async function install(dir: string): Promise<boolean> {
  const r = await run("npm", ["install", "--no-audit", "--no-fund", "--loglevel=error"], { cwd: dir });
  return r.code === 0;
}

export async function build(dir: string): Promise<{ ok: boolean; durationMs: number; log: string }> {
  const r = await run("npm", ["run", "build"], { cwd: dir });
  return { ok: r.code === 0, durationMs: r.durationMs, log: (r.stdout + r.stderr).slice(-20_000) };
}

export async function e2e(dir: string): Promise<{ passed: number; failed: number; ok: boolean; log: string }> {
  const r = await run("npx", ["playwright", "test", "--reporter=line"], { cwd: dir, timeoutMs: 15 * 60_000 });
  const log = (r.stdout + r.stderr).slice(-20_000);
  const passed = Number(/(\d+) passed/.exec(log)?.[1] ?? 0);
  const failed = Number(/(\d+) failed/.exec(log)?.[1] ?? 0);
  return { passed, failed, ok: r.code === 0 && failed === 0 && passed > 0, log };
}

export interface Server {
  url: string;
  stop(): Promise<void>;
}

export async function preview(dir: string, port: number): Promise<Server> {
  const child: ChildProcess = spawn("npm", ["run", "preview"], {
    cwd: dir,
    shell: process.platform === "win32",
    stdio: "ignore",
  });
  const url = `http://localhost:${port}`;
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) break;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return {
    url,
    stop: async () => {
      if (!child.pid) return;
      if (process.platform === "win32") await run("taskkill", ["/pid", String(child.pid), "/T", "/F"], { cwd: dir });
      else child.kill("SIGTERM");
    },
  };
}
