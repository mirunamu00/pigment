"use client";

import { useState } from "react";

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  fill,
}: {
  label: string;
  options: ReadonlyArray<readonly [T, string]>;
  value: T;
  onChange: (v: T) => void;
  fill?: boolean;
}) {
  return (
    <div role="group" aria-label={label} className={fill ? "seg seg--fill" : "seg"}>
      {options.map(([key, text]) => (
        <button key={key} type="button" aria-pressed={value === key} onClick={() => onChange(key)}>
          {text}
        </button>
      ))}
    </div>
  );
}

export function Chips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ReadonlyArray<readonly [T, string]>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="chips">
      {options.map(([key, text]) => (
        <button key={key} type="button" className="chip" aria-pressed={value === key} onClick={() => onChange(key)}>
          {text}
        </button>
      ))}
    </div>
  );
}

/**
 * Copies text and reports the outcome in words, both visibly and to screen readers.
 * On failure it says what to do instead.
 */
export function CopyButton({
  text,
  label = "Copy prompt",
  className = "btn btn--primary",
  successMessage = "Prompt copied.",
  onStatus,
}: {
  text: string;
  label?: string;
  className?: string;
  successMessage?: string;
  onStatus?: (status: { ok: boolean; message: string }) => void;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      onStatus?.({ ok: true, message: successMessage });
    } catch {
      setState("failed");
      onStatus?.({ ok: false, message: "Copy failed. Select the prompt text and copy it manually." });
    }
  };
  return (
    <button type="button" className={className} onClick={copy}>
      {state === "copied" ? "Copied" : label}
    </button>
  );
}
