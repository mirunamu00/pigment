import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export function readJson<T = unknown>(file: string): T {
  return JSON.parse(readFileSync(file, "utf8")) as T;
}

export function writeJson(file: string, data: unknown): void {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}

export function writeText(file: string, text: string): void {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
}

export function listFiles(dir: string, filter: (path: string) => boolean = () => true): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listFiles(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out.sort();
}

/** Stable hash of a directory: sorted relative paths + contents. Used to freeze published versions. */
export function hashDir(dir: string): string {
  const hash = createHash("sha256");
  for (const file of listFiles(dir)) {
    hash.update(file.slice(dir.length).replaceAll("\\", "/"));
    hash.update(readFileSync(file));
  }
  return hash.digest("hex");
}

export function timestamp(): string {
  return new Date().toISOString();
}

export function runId(): string {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "").replace("T", "-");
}

export interface RunResult {
  code: number | null;
  stdout: string;
  stderr: string;
  durationMs: number;
}

/** Runs a command, streams output to the console when `echo` is set, and always resolves. */
export function run(
  command: string,
  args: string[],
  options: { cwd: string; env?: NodeJS.ProcessEnv; echo?: boolean; input?: string; timeoutMs?: number; shell?: boolean },
): Promise<RunResult> {
  const started = Date.now();
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: { ...process.env, ...options.env },
      // npm/npx are .cmd shims on Windows and need a shell; real executables should skip it so
      // arguments with spaces or parentheses arrive intact.
      shell: options.shell ?? process.platform === "win32",
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    const timer = options.timeoutMs ? setTimeout(() => child.kill(), options.timeoutMs) : undefined;
    child.on("error", (error) => {
      if (timer) clearTimeout(timer);
      resolve({ code: 1, stdout, stderr: `${stderr}\n${error.message}`, durationMs: Date.now() - started });
    });
    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk;
      if (options.echo) process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk;
      if (options.echo) process.stderr.write(chunk);
    });
    if (options.input) child.stdin.write(options.input);
    child.stdin.end();
    child.on("close", (code) => {
      if (timer) clearTimeout(timer);
      resolve({ code, stdout, stderr, durationMs: Date.now() - started });
    });
  });
}

export function fail(message: string): never {
  console.error(`\n✖ ${message}`);
  process.exit(1);
}

export function info(message: string): void {
  console.log(`• ${message}`);
}

export function ok(message: string): void {
  console.log(`✔ ${message}`);
}
