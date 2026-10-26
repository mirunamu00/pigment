"use client";

import { useEffect, useState } from "react";
import { REPO_URL } from "@pigment/content/prompts";

/** The repository's star count, read once per page from GitHub's public API; the button works without it. */
function useStars(): number | null {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    let live = true;
    fetch("https://api.github.com/repos/mirunamu00/pigment", { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { stargazers_count?: number } | null) => live && typeof d?.stargazers_count === "number" && setStars(d.stargazers_count))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);
  return stars;
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width={14} height={14} fill="currentColor">
      <path d="M8 .9l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.7l-4.2 2.2.8-4.7L1.2 5.9l4.7-.7z" />
    </svg>
  );
}

/** Header button: star the repository on GitHub, with the live count when GitHub answers. */
export function StarButton({ className = "btn" }: { className?: string }) {
  const stars = useStars();
  return (
    <a className={`${className} star-btn`} href={REPO_URL} target="_blank" rel="noreferrer" aria-label={`Star Pigment on GitHub${stars !== null ? `, ${stars} stars` : ""}`}>
      <StarIcon />
      Star
      {stars !== null && <span className="star-btn__count mono">{stars.toLocaleString("en-US")}</span>}
    </a>
  );
}

/** One quiet line under an action: Pigment is free, a star is the way to say it helped. */
export function StarNote() {
  return (
    <p className="star-note meta">
      Free and MIT licensed. If it helps,{" "}
      <a href={REPO_URL} target="_blank" rel="noreferrer">
        star it on GitHub
      </a>
      .
    </p>
  );
}
