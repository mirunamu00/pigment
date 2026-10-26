"use client";

import { useRef, useState, type CSSProperties } from "react";
import type { ShotSet, ShowcaseProduct } from "@pigment/content";
import { Segmented } from "./controls";

type View = "after" | "before" | "both";

/**
 * A realistic product before and after an agent applied the system: the strongest evidence of what a system
 * does to a real site. Each frame scrolls through the whole page; side by side, the two scroll together.
 */
export function ShowcaseViewer({
  products,
  name,
  light,
  dark,
  appearance = ["light", "dark"],
}: {
  products: ShowcaseProduct[];
  name: string;
  light: string;
  dark: string;
  appearance?: Array<"light" | "dark">;
}) {
  const [productId, setProductId] = useState(products[0]!.id);
  const [slug, setSlug] = useState(products[0]!.pages[0]!.slug);
  const [view, setView] = useState<View>("after");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [scheme, setScheme] = useState<"light" | "dark">(appearance[0] ?? "light");
  const product = products.find((p) => p.id === productId)!;
  const page = product.pages.find((p) => p.slug === slug) ?? product.pages[0]!;
  const mobile = viewport === "mobile";
  const key = `${viewport}${scheme === "light" ? "Light" : "Dark"}` as keyof ShotSet;
  // The house designs are light only: in dark, the original stays as it is.
  const before = page.original[`${viewport}Light` as keyof ShotSet];
  const after = page.applied[key] ?? page.applied[`${viewport}${appearance[0] === "dark" ? "Dark" : "Light"}` as keyof ShotSet];
  const bg = scheme === "dark" ? dark : light;

  const choose = (id: string) => {
    setProductId(id);
    setSlug(products.find((p) => p.id === id)!.pages[0]!.slug);
  };

  return (
    <div className="showcase">
      <div className="section-head">
        <div>
          <h2 id="showcase-h">On a real product</h2>
          <p className="showcase__lede">
            Three products with their own design, and the same products after a coding agent applied {name}. Pages, copy, photos and
            features are the product&apos;s own; everything you see change is the system.
          </p>
        </div>
      </div>

      <div className="showcase__products" role="group" aria-label="Product">
        {products.map((p) => {
          const cover = p.pages[0]!.applied[`desktop${scheme === "light" ? "Light" : "Dark"}`] ?? p.pages[0]!.applied.desktopLight;
          return (
            <button key={p.id} type="button" aria-pressed={p.id === productId} onClick={() => choose(p.id)}>
              <span className="showcase__product-img" style={{ backgroundImage: cover ? `url(${cover})` : undefined, ["--shot-bg" as string]: bg }} />
              <span className="showcase__product-name">
                <span>{p.name}</span>
                <span className="mono meta">{p.kind}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="showcase__bar">
        <Segmented
          label="Compare"
          options={[["after", `With ${name}`], ["before", "Original"], ["both", "Side by side"]] as const}
          value={view}
          onChange={setView}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Segmented label="Viewport" options={[["desktop", "Desktop"], ["mobile", "Mobile"]] as const} value={viewport} onChange={setViewport} />
          {appearance.length > 1 && (
            <Segmented label="Theme" options={[["light", "Light"], ["dark", "Dark"]] as const} value={scheme} onChange={setScheme} />
          )}
        </div>
      </div>

      <div className="showcase__stage" data-view={view} data-viewport={viewport}>
        {view === "both" ? (
          <SyncedPair before={before} after={after} name={name} bg={bg} mobile={mobile} page={page.name} product={product.name} />
        ) : (
          <Frame
            src={view === "before" ? before : after}
            label={view === "before" ? "Original design" : `With ${name}`}
            bg={view === "before" ? "#ffffff" : bg}
            mobile={mobile}
            ariaLabel={`${product.name}, ${page.name}, ${view === "before" ? "original design" : `with ${name}`}, scrollable`}
          />
        )}
      </div>

      <div className="showcase__pages" role="group" aria-label={`${product.name} pages`}>
        {product.pages.map((p) => {
          const thumb = p.applied[`desktop${scheme === "light" ? "Light" : "Dark"}`] ?? p.applied.desktopLight;
          return (
            <button key={p.slug} type="button" aria-pressed={p.slug === page.slug} onClick={() => setSlug(p.slug)}>
              <span className="thumbs__img" style={{ ["--shot-bg" as string]: bg, backgroundImage: thumb ? `url(${thumb})` : undefined }} />
              <span className="thumbs__name">{p.name}</span>
            </button>
          );
        })}
      </div>
      <p className="meta" style={{ marginTop: 14 }}>
        One run of the standard prompt on a product with its own design, captured as built. Unedited. Photos are public domain.
      </p>
    </div>
  );
}

function Frame({
  src,
  label,
  bg,
  mobile,
  ariaLabel,
  scrollRef,
  onScroll,
}: {
  src?: string;
  label: string;
  bg: string;
  mobile: boolean;
  ariaLabel: string;
  scrollRef?: React.Ref<HTMLDivElement>;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}) {
  return (
    <figure className={mobile ? "showcase__frame showcase__frame--phone" : "showcase__frame"}>
      <figcaption className="showcase__label">{label}</figcaption>
      <div className="showcase__scroll" style={{ "--shot-bg": bg } as CSSProperties} tabIndex={0} role="region" aria-label={ariaLabel} ref={scrollRef} onScroll={onScroll}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" />
        ) : (
          <span className="phone__empty mono">No capture</span>
        )}
      </div>
    </figure>
  );
}

/** Two frames that scroll together, by share of the page, so the same section stays side by side. */
function SyncedPair({ before, after, name, bg, mobile, page, product }: { before?: string; after?: string; name: string; bg: string; mobile: boolean; page: string; product: string }) {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const lock = useRef<HTMLDivElement | null>(null);
  const sync = (from: HTMLDivElement | null, to: HTMLDivElement | null) => {
    if (!from || !to || (lock.current && lock.current !== from)) return;
    lock.current = from;
    const share = from.scrollTop / Math.max(1, from.scrollHeight - from.clientHeight);
    to.scrollTop = share * (to.scrollHeight - to.clientHeight);
    requestAnimationFrame(() => (lock.current = null));
  };
  return (
    <div className="showcase__pair">
      <Frame src={before} label="Original design" bg="#ffffff" mobile={mobile} ariaLabel={`${product}, ${page}, original design, scrollable`} scrollRef={a} onScroll={() => sync(a.current, b.current)} />
      <Frame src={after} label={`With ${name}`} bg={bg} mobile={mobile} ariaLabel={`${product}, ${page}, with ${name}, scrollable`} scrollRef={b} onScroll={() => sync(b.current, a.current)} />
    </div>
  );
}
