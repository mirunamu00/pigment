## Character

A 16-bit console booted up as a product: night ground, cream pixel type, hard-edged game windows, a gold RPG marker, and one small pixel scene per screen that moves only in whole-pixel steps, while every control reacts on the next frame.

## The ten rules that define this look

1. **Everything sits on the pixel grid.** `radius.none` everywhere; borders only `border.width.control` (2px) or `border.width.window` (4px); art is filled rects at an integer scale (`size.unit` 2px, `size.unitHero` 4px), `shape-rendering: crispEdges`. Why: one rounded corner or blur and it stops being a console.
2. **Quantized night colour.** Ground `color.surface.default`, panels `color.surface.subtle`, windows go darker (`color.surface.raised`) inside a light frame; text `color.text.primary`, headings `color.text.strong`; scene art only from `color.art.*`. Why: the UI palette is 15-bit (channels in steps of 8), the art 12-bit; mixing in free colours breaks both.
3. **One pixel typeface, one weight.** `font.family.pixel` for Hangul and Latin, weight 400 only, sizes 12/16/32/48, prose 16/28, UI 16/24, no tracking; emphasis is colour (`color.text.strong`), never bold or italic. Why: the bitmap voice is the costume; a second face or weight is a different product.
4. **Gold is the player.** `color.action.primary` fills one button per screen (with `shadow.hard`); `color.text.accent` is the marker and the selection marks; `color.focus.ring` the 4px focus outline. Nothing else is gold. Why: under 0.1% of the area, so the eye always finds the player.
5. **Selection is an RPG marker.** A bevelled ▶ (4×7 units at `size.unit`) marks the current item in every menu, list, sidebar, table and settings list; its down/right forms are the disclosure chevrons. Why: it turns lists into game menus; a tinted row alone is any app.
6. **Instant, physical response.** Every transition is `motion.duration.instant`; hover swaps to `color.surface.hover`; press moves a control 2px, or 4px into its hard shadow, which disappears. Why: consoles answer on the next frame and buttons travel.
7. **Motion is stepped.** Every animation uses `steps(n)`, n = travel in CSS px ÷ 4; loops live only in art, the marker and live-status lights; no entrance, scroll or hover animation. Reduced motion and the Animation switch freeze all of it on frame 1. Why: tweened motion reads as a parallax gimmick, not a game.
8. **One living stage per screen.** A pixel scene as the hero, a framed banner or a 96px strip at the top, and the ground strip at the bottom; never behind text, data or controls. Why: the scene says where you are; repeating it says nothing.
9. **Game-window chrome.** Major regions are windows (4px `color.border.strong` frame, `color.surface.raised` inside, optional `size.titleBar` title bar); headings sit on a dithered rule; separators are 2px dots; scores are block meters. Why: frames, not shadows, make depth on a flat night.
10. **Hue identifies, never decorates.** Each entity kind or category owns one `color.hue.*`, shown as a 4px top bar, a `size.bullet` square and its icon fill; text and backgrounds stay neutral. Why: eight saturated hues on dark read as cartridge labels only when they stay small.

## Never

- Radius, circles or pills in UI; blurred shadows, glows, glass, `backdrop-filter`, gradients outside dither and scene bands.
- `ease`, `ease-in-out`, `linear` travel, `cubic-bezier`, springs, fades, slides, hover scale or lift, skeleton shimmer, spinners, smooth progress bars, scroll-linked or entrance animation.
- Bold, italic, synthetic weights, `letter-spacing`, `text-transform: uppercase`, sizes outside 12/16/32/48.
- Pure white text or a pure black ground (pure black is only the night hard shadow).
- Stroked or outline icon sets, emoji, rounded or anti-aliased illustrations, photos inside scenes, text inside art.
- Art behind text, tables, charts or forms, or inside list cards; a second gold button.
- These subjects from elsewhere: a lone cabin or house on a hill under a moon, a tall single tree as a motif, a snowy ridge banner, a capped figure sitting with a laptop, a character walking along the footer, coins. Never use downloaded animated sprite files.
- Detecting automation or test runners to skip animation, artificial delays before showing data or a working state, or content hidden until a script runs (every element's resting style is its readable frame).

## Signature elements

Build these first, as reusable pieces (a `PixelScene`, `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter` and the type base), then the components. Once, at the app root:

```css
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
:root[data-motion="off"] *,:root[data-motion="off"] *::before,:root[data-motion="off"] *::after{animation:none!important}
*,*::before,*::after{transition:none!important;border-radius:0!important}
```

### Pixel stage

**What.** A low-resolution scene authored on a coarse grid and shown at an integer scale: flat horizontal sky bands joined by checker dither rows, stepped silhouettes, 1 or 2 small sprites with a 1-unit `color.art.outline`, and 3 to 8 single-unit lights that blink. Four placements, one per screen plus the strip:
- **Hero**: 480×128 units at `size.unitHero` (1920×`size.hero`), full-bleed, a Window floating over its left third (stacks below the scene under `breakpoint.lg`, scene height `size.heroSm`).
- **Banner**: 720×128 units at `size.unit` (1440×`size.banner`) inside a Window whose title block (h1, lede, meta) sits below the art in the same frame.
- **Strip**: 720×48 units at `size.unit` (`size.bannerSm` high), the same Window and title block; for product screens.
- **Vignette**: 48×48 units at `size.unit` (`size.vignette` square), 2px `color.border.control` frame; empty and error states.
- **Ground strip**: the footer's top edge on every screen (CSS below).

**Recipe.**
1. One world per app, chosen from its domain: an ops dashboard is a server yard at night (racks with LEDs, a dish, a cable pole); a store is a market street (awning, crates, a lit sign); a blog is a writing room or post office (desk lamp, shelves, mailbox); settings is a workshop (workbench, switch panel, key cabinet). Every screen of the app shows the same place; screens differ by crop, one prop, or which lights are on.
2. Author at 1 unit = 1 viewBox unit, integers only; set `width`/`height` to units × pixel unit. Never stretch: wider viewports crop. Keep the focal sprite inside the central 180 units (banner, strip) or 90 units (hero) so 390px screens show it.
3. Sky: `color.art.sky1`…`sky6` bands top to bottom (strip: sky5, sky6 only); each join gets a 2-unit checker row of the band above. Silhouettes: `color.art.far` ridge, then `color.art.near` ground, both stepped (each step 4 to 8 units high).
4. Objects: a base from `color.hue.*` or `color.art.far/near`, one highlight on the top-left edge (`color-mix(in srgb, base 60%, var(--color-art-glint))`), one shade on the bottom-right (`color-mix(in srgb, base 60%, var(--color-art-outline))`); at most 3 tones; sprites 12 to 20 units tall with a 1-unit outline.
5. Lights: single units in `color.art.lightWarm`, `lightCold`, `star`; one `beacon` only on error screens.
6. `aria-hidden="true"`, `pointer-events:none`; nothing meaningful lives only in the art.

```js
const R=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${c}"/>`;
// Checker pattern of class c; laid over the first 2 rows of the band below it.
const dither=(c)=>`<pattern id="d-${c}" width="2" height="2" patternUnits="userSpaceOnUse">${R(0,0,1,1,c)}${R(1,1,1,1,c)}</pattern>`;
const sky=(w,bh,bands)=>bands.map((c,i)=>R(0,i*bh,w,bh,c)+(i?`<rect x="0" y="${i*bh}" width="${w}" height="2" fill="url(#d-${bands[i-1]})"/>`:"")).join("");
// Stepped silhouette: tops[i] is the height of column block i, `run` units wide, down to y=h.
const ridge=(w,h,run,tops,c)=>`<path class="${c}" d="M0 ${h}${tops.map((y,i)=>`V${y}H${Math.min((i+1)*run,w)}`).join("")}V${h}Z"/>`;
// Sprite from character rows: "." empty, other characters map to classes; runs merge into one rect.
function sprite(rows,map,x0,y0){let s="";rows.forEach((r,y)=>{for(let x=0;x<r.length;){const c=r[x];let n=1;while(r[x+n]===c)n++;if(c!==".")s+=R(x0+x,y0+y,n,1,map[c]);x+=n;}});return s;}
// Demo only, never ship it: a 5x9 street lamp, lit.
const lamp=sprite([".ooo.","owwwo","owwwo",".ooo.","..o..","..o..","..o..",".ooo.","ooooo"],{o:"ol",w:"warm blink"},300,92);
const bands=["sky-1","sky-2","sky-3","sky-4","sky-5","sky-6"];
const svg=`<svg class="scene" viewBox="0 0 720 128" width="1440" height="256" aria-hidden="true"><defs>${bands.map(dither).join("")}</defs>${sky(720,16,bands)}${ridge(720,128,24,[84,80,76,80,72,68,76,84,80,72,76,84,88,80,76,72,80,84,76,80,72,76,80,84,88,84,80,76,80,84],"far")}${ridge(720,128,40,[104,100,104,108,100,96,100,104,108,104,100,104,108,104,100,104,108,104],"near")}${lamp}</svg>`;
```

```css
.stage{position:relative;overflow:hidden;height:var(--size-banner);background:var(--color-art-sky1)}
.stage--hero{height:var(--size-hero);max-width:1920px;margin-inline:auto}.stage--strip{height:var(--size-banner-sm)}
.stage>.scene{position:absolute;left:50%;bottom:0;translate:-50% 0;max-width:none;shape-rendering:crispEdges;pointer-events:none}
.sky-1{fill:var(--color-art-sky1)}.sky-2{fill:var(--color-art-sky2)}.sky-3{fill:var(--color-art-sky3)}.sky-4{fill:var(--color-art-sky4)}.sky-5{fill:var(--color-art-sky5)}.sky-6{fill:var(--color-art-sky6)}
.far{fill:var(--color-art-far)}.near{fill:var(--color-art-near)}.ol{fill:var(--color-art-outline)}.warm{fill:var(--color-art-light-warm)}.cold{fill:var(--color-art-light-cold)}.star{fill:var(--color-art-star)}.beacon{fill:var(--color-art-beacon)}
.ground{position:relative;height:calc(var(--size-ground) + var(--size-ground-edge));margin-top:var(--space-64);pointer-events:none;
  background:repeating-conic-gradient(var(--color-art-ground-hi) 0 25%,transparent 0 50%) 0 0/4px 4px repeat-x,linear-gradient(var(--color-art-edge) 0 0) bottom/100% var(--size-ground-edge) no-repeat,var(--color-art-ground)}
.ground>svg{position:absolute;bottom:calc(var(--size-ground) + var(--size-ground-edge));shape-rendering:crispEdges}
```

The ground strip holds 2 to 4 original sprites from the app's world (24 to 48px tall at `size.unit`), standing on its top edge.

**Motion.** Loops from Stepped motion: stars twinkle, lights blink out of sync, one far cloud or particle layer drifts, one sprite bobs or swaps 2 frames, one rare event (a shooting light, a bird) every `motion.duration.rare`. At most 2 moving sprites and 8 blinking lights per scene. Reduced motion or Animation off: frame 1, still and complete.

**Where.** Landing or home: hero. Content pages (article, product detail, about): banner. Product screens (dashboard, lists, settings, cart): strip on every screen. Empty and error: vignette. Every screen: ground strip. Details per context in Applying the concept.

**Limits.** One of hero, banner or strip per screen, plus the ground strip and at most one vignette. Never behind text, controls, charts, tables or form fields; never in list cards, rows, toasts or badges.

### Stepped motion

**What.** Every animation advances in whole-pixel jumps with `steps()` (`motion.easing.*`); the UI has no transitions at all.

**Recipe.** Travel per step is 4 CSS px: `steps(N)` with N = distance in px ÷ 4 (inside an SVG, transform lengths are viewBox units: 4px = 1 unit at the hero, 2 at banners). Keyframes change only `opacity`, whole-unit `translate`, `scale` for sparkle, or `fill`.

```css
@keyframes nc-blink{50%{opacity:var(--opacity-dim)}}
@keyframes nc-twinkle{60%{opacity:var(--opacity-twinkle)}80%{opacity:1}}
@keyframes nc-sparkle{70%{transform:scale(.34)}85%{transform:scale(1)}}
@keyframes nc-bob{50%{transform:translateY(var(--bob,-4px))}}
@keyframes nc-swap{50%{opacity:0}}
@keyframes nc-beacon{50%{fill:var(--color-art-beacon-off)}}
@keyframes nc-drift{from{transform:translateX(var(--from))}to{transform:translateX(var(--to))}}
@keyframes nc-rare{0%,95%{opacity:0;transform:none;animation-timing-function:steps(1)}95.1%{opacity:1;transform:none;animation-timing-function:steps(5)}100%{opacity:1;transform:translate(var(--dx),var(--dy))}}
@keyframes nc-nudge{50%{transform:translateX(2px)}}
.blink{animation:nc-blink var(--d,var(--motion-duration-led-a)) var(--motion-easing-frame) var(--o,0ms) infinite}
.blink:nth-of-type(3n+2){--d:var(--motion-duration-led-b);--o:-500ms}.blink:nth-of-type(3n){--d:var(--motion-duration-led-c)}
.twinkle{animation:nc-twinkle var(--motion-duration-twinkle) var(--motion-easing-frame) var(--o,0ms) infinite}
.bob{animation:nc-bob var(--motion-duration-bob) var(--motion-easing-frame) infinite}
.frame-b{animation:nc-swap var(--motion-duration-fan) var(--motion-easing-frame) infinite}
.frame-a{animation:nc-swap var(--motion-duration-fan) var(--motion-easing-frame) calc(var(--motion-duration-fan) / -2) infinite}
.beacon{animation:nc-beacon var(--motion-duration-beacon) var(--motion-easing-frame) infinite}
.drift{animation:nc-drift var(--motion-duration-drift) steps(var(--n)) var(--o,0ms) infinite}
.rare{opacity:0;animation:nc-rare var(--motion-duration-rare) var(--motion-easing-frame) infinite}
.nudge{animation:nc-nudge calc(var(--motion-duration-nudge) * 2) var(--motion-easing-frame) 1}
.sparkle{transform-box:fill-box;transform-origin:center;animation:nc-sparkle var(--motion-duration-sparkle) var(--motion-easing-frame) -600ms infinite}
```

Give each light a different `--o` (0, −300ms, −700ms…) so neighbours never sync. In SVG, `.bob` takes `--bob:-1px` at the hero and `-2px` in banners. A drifting cloud at 2× moving 800px: `--from:-40px; --to:360px; --n:200`.

**Motion.** Triggers: `loop` (art, the one blinking marker, live-status lights) and `state-change` (instant). The only one-shot animations: the error nudge (2 frames, `motion.duration.nudge` each) and the block-meter fill. Animation switch: a header text button (12px pause/play icon + "Animation on"/"Animation off") sets `data-motion="off"` on `<html>`, persisted in `localStorage`, default on. Reduced motion removes every animation; resting styles are frame 1 (lights lit, rare event hidden, meters full, ellipsis complete).

**Where.** Scenes; the Animation switch in every header; a `size.bullet` live light blinking `motion.duration.ledA` only while a job is actually running; the loading ellipsis; the field nudge on a failed submit.

**Limits.** Never on text, buttons, rows, cards, data or layout. No load, reveal or scroll animation.

### RPG marker and instant, physical response

**What.** A bevelled ▶ in `color.text.accent`, 4×7 units at `size.unit` (`size.markerW` × `size.markerH`), top edge lit (white at 45%), bottom edge shaded (black at 40%). It marks where you are; the press moves the control; focus is a thick gold outline.

**Recipe.**

```css
:root{
--cur-r:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 7'%3E%3Cpath d='M0 0h1v1h1v1h1v1h1v1h-1v1h-1v1h-1v1h-1z'/%3E%3C/svg%3E");
--cur-l:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 7'%3E%3Cpath d='M4 0v7h-1v-1h-1v-1h-1v-1h-1v-1h1v-1h1v-1h1v-1z'/%3E%3C/svg%3E");
--cur-d:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7 4'%3E%3Cpath d='M0 0h7v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1z'/%3E%3C/svg%3E");
--cur-u:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7 4'%3E%3Cpath d='M3 0h1v1h1v1h1v1h1v1h-7v-1h1v-1h1v-1h1z'/%3E%3C/svg%3E");
--cur-bevel:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 7' shape-rendering='crispEdges'%3E%3Cpath fill='white' fill-opacity='.45' d='M0 0h1v1H0zM1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3z'/%3E%3Cpath fill-opacity='.4' d='M2 4h1v1H2zM1 5h1v1H1zM0 6h1v1H0z'/%3E%3C/svg%3E");}
.cur{flex:none;display:inline-block;width:var(--size-marker-w);height:var(--size-marker-h);color:var(--color-text-accent);
  background:var(--cur-bevel) 0 0/100% 100% no-repeat currentColor;-webkit-mask:var(--cur-r) 0 0/100% 100% no-repeat;mask:var(--cur-r) 0 0/100% 100% no-repeat}
.cur--l{-webkit-mask-image:var(--cur-l);mask-image:var(--cur-l);background-image:none}
.cur--d,.cur--u{width:var(--size-marker-h);height:var(--size-marker-w);background-image:none;-webkit-mask-image:var(--cur-d);mask-image:var(--cur-d)}.cur--u{-webkit-mask-image:var(--cur-u);mask-image:var(--cur-u)}
.cur--sm{width:6px;height:10px}
.item{display:flex;align-items:center;gap:var(--space-8);min-height:var(--size-row);padding-inline:var(--space-8) var(--space-12)}
.item>.cur{visibility:hidden}
.item:is([aria-current],[aria-selected="true"],.is-current)>.cur{visibility:visible}
.item:hover{background:var(--color-surface-hover)}
.item:is([aria-current],[aria-selected="true"]){color:var(--color-text-strong)}
.card-link:is(:hover,:focus-visible) .cur{visibility:visible;color:var(--color-text-strong)}
:focus-visible{outline:var(--border-width-window) solid var(--color-focus-ring);outline-offset:3px}
:is(.item,tr,summary,[role="option"]):focus-visible{outline-offset:-4px}
.press:active:not(:disabled){translate:2px 2px}
.btn-gold{height:var(--size-control-lg);padding-inline:var(--space-20);background:var(--color-action-primary);color:var(--color-text-on-action);border:var(--border-width-control) solid var(--color-action-primary-edge);box-shadow:var(--shadow-hard)}
.btn-gold:active:not(:disabled){translate:4px 4px;box-shadow:var(--shadow-none)}
```

Markup: `<a class="item" aria-current="page"><span class="cur" aria-hidden="true"></span>Overview</a>`. The marker keeps its space when hidden, so labels never shift.

**Motion.** Instant. The single "you are here" marker of the main navigation may blink (`nc-swap`, `motion.duration.bob`, `motion.easing.frame`); every other marker is still.

**Where.** Current item: header nav, sidebar, contents list, tabs, segmented filters, selected chip, settings sections. Preview: card grids on hover/focus. Selected table row (16px gutter); sorted headers (up/down); highlighted options; disclosures (right/down); prev/next (left/right); a trailing ▶ (`currentColor`, no bevel) on forward-action labels.

**Limits.** One visible marker per list or menu: current, or the hovered card's preview, never both in one list. Never decorative on headings. Press offsets 2px or 4px, nothing else moves.

### Game-window chrome

**What.** Windows: 4px `color.border.strong` frame, `color.surface.raised` inside, optional `size.titleBar` bar on `color.surface.subtle` with a 2px `color.border.default` rule. Dithered rules (header bottom, under h2), dotted separators, hue top bars and bullets, block meters, callouts with a 4px bar.

**Recipe.**

```css
.window{border:var(--border-width-window) solid var(--color-border-strong);background:var(--color-surface-raised)}
.window__bar{display:flex;align-items:center;gap:var(--space-8);height:var(--size-title-bar);padding-inline:var(--space-12);background:var(--color-surface-subtle);border-bottom:var(--border-width-control) solid var(--color-border-default)}
.dither{height:var(--size-rule);background:repeating-conic-gradient(var(--dc,var(--color-border-default)) 0 25%,transparent 0 50%) 0 0/4px 4px}
h2.ruled{padding-bottom:var(--space-12);margin-bottom:var(--space-16);background:repeating-conic-gradient(var(--color-border-control) 0 25%,transparent 0 50%) bottom left/4px 4px repeat-x}
.sep-dots{height:2px;background:linear-gradient(90deg,var(--color-border-control) 2px,transparent 0) 0 0/6px 2px repeat-x}
.hue-bar{border-top:var(--border-width-window) solid var(--hue)}
.bullet{flex:none;width:var(--size-bullet);height:var(--size-bullet);background:var(--hue)}
.meter{display:flex;gap:var(--space-4)}
.meter>i{width:var(--size-meter-w);height:var(--size-meter-h);background:var(--color-surface-hover)}
.meter>i.on{background:var(--tone,var(--color-status-success));animation:nc-on var(--motion-duration-meter-step) var(--motion-easing-frame) calc(var(--i) * var(--motion-duration-meter-step)) backwards}
@keyframes nc-on{from{background:var(--color-surface-hover)}}
.callout{display:grid;grid-template-columns:var(--size-icon) 1fr;gap:var(--space-4) var(--space-12);padding:var(--space-16) var(--space-20);background:var(--color-surface-subtle);border-left:var(--border-width-window) solid var(--tone)}
```

Block meter: `<div class="meter" role="meter" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="Quota">` with 10 to 20 `<i>` (`style="--i:n"`), filled = round(value ÷ max × blocks); value in 48px numerals above. Hues: assign `--hue` per category or entity kind in a fixed order (cyan, violet, blue, amber, green, pink, orange, teal) so a thing keeps its hue on every screen.

**Motion.** Static; meters fill one block per `motion.duration.meterStep` when they render.

**Where.** Windows: scene windows, code blocks (title bar: language label + framed copy button), dialogs, settings groups, the danger zone (frame `color.status.danger`). Dither under the header and content h2s; dots between sidebar and list items; hue bars on cards and KPI tiles; meters for scores, quotas, progress and steps.

**Limits.** Four-sided 4px frames on at most 3 regions per screen (scene window, code or dialog, one group); ordinary cards are `color.surface.subtle` with a hue bar. `shadow.hard` only on the gold button and dialogs.

### Pixel type for Hangul and Latin

**What.** `font.family.pixel` sets headings, body, buttons, tables and numerals at weight 400; `font.family.pixelMono` sets code. Hangul and Latin share the bitmap grid, so mixed lines keep one rhythm. A "Pixel body" switch swaps long reading text to `font.family.readable` (code to `readableMono`); headings, nav, buttons and numerals stay pixel.

**Recipe.**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono&display=swap">
```

```css
html{font:var(--font-weight-regular) var(--font-size-body)/var(--font-line-height-ui) var(--font-family-pixel);color:var(--color-text-primary);background:var(--color-surface-default);
  font-synthesis:none;letter-spacing:normal;text-transform:none;word-break:keep-all;line-break:strict;overflow-wrap:break-word;font-variant-numeric:slashed-zero tabular-nums}
:is(h1,h2,h3,h4,h5,h6,b,strong,th,label,button,legend,dt){font-weight:var(--font-weight-regular)}
:is(h1,h2,h3,h4,strong,b,em,i){color:var(--color-text-strong);font-style:normal}
.prose{max-width:var(--size-prose);line-height:var(--font-line-height-prose)}
:is(code,pre,kbd,samp){font-family:var(--font-family-pixel-mono)}
:not(pre)>code{padding:0 var(--space-4);background:var(--color-surface-code);color:var(--color-text-strong)}
:root[data-body="readable"] :is(.prose p,.prose li,.prose blockquote,td){font-family:var(--font-family-readable)}
:root[data-body="readable"] :is(pre,code){font-family:var(--font-family-readable-mono)}
```

Hangul: `word-break: keep-all` wraps at word spaces, never inside a word; keep the 28px prose line height (syllable blocks fill the em box). Galmuri11 is drawn on a 12px grid: 12 and 48 are exact multiples, 16 and 32 render softer; a project that wants every size crisp may set `font.family.pixel` to NeoDunggeunmo (16px grid, `https://cdn.jsdelivr.net/gh/neodgm/neodgm-webfont@latest/neodgm/style.css`) or DungGeunMo, both OFL. Never mix two pixel faces.

**Motion.** Static.

**Where.** Everything. The Pixel body switch (12px "A" icon + "Pixel body on"/"off", `data-body` on `<html>`, persisted) sits in the header of any screen with prose over two screens long and of dense tables.

**Limits.** No bold, italic, tracking or sizes between steps. Long prose offers the switch.

## Color use

- Gold per rule 4: the gold button is the screen's main commit (subscribe, add to cart, place order, save); everything else is framed.
- Surfaces: ground → `subtle` (cards, sidebar, title bars) → `hover`; windows, inputs and code go darker to `raised` inside a frame. No other fills.
- Text: `strong` headings, values, current items; `primary` body and cells; `secondary` meta, hints, resting nav, placeholders. Links `color.text.link`, 2px `color.border.control` underline at 4px offset.
- Status colours: callout bars and titles, field errors, bullets with a word, meters, danger buttons; never fills behind text. Code: `color.syntax.*` on `color.surface.raised`.
- Hues: bars, bullets, icon fills, chart series; under 6% of the screen.
- Day (light): parchment and ink, same rules; `color.action.primaryEdge` keeps the gold button's edge visible.

## Typography

| Role | Size / line height | Colour |
| --- | --- | --- |
| Hero h1, display numerals (KPIs, prices on detail) | `display` / `display` | strong |
| Page h1, h2, card titles in feature grids | `title` / `title` | strong |
| h3, card titles, table heads, labels, buttons, nav | `body` / `ui` | strong or primary |
| Prose | `body` / `prose`, max `size.prose` | primary |
| Meta, dates, helper, error text, counts, kbd | `caption` / `caption` | secondary |

One h1 per screen; at most one `display` size per screen region. Dates `YYYY.MM.DD`; meta items joined with " · ". Latin keeps its native case; no exclamation marks or emoji in UI copy.

## Spacing and density

- Base unit 4px, only `space.*`. Sections `space.64` apart (`space.40` under `breakpoint.sm`); content starts `space.40` under the header.
- Window and card padding `space.16`–`space.20`; banner title block `space.24`.
- Rows `size.row` (`size.touch` under `(pointer: coarse)`), 2px `color.border.default` rules, no zebra.
- Forms: fields `space.20` apart, label to control `space.8`, helper `space.4`, actions `space.32` below.
- Dense screens shed art, never type size.

## Shape and depth

- `radius.none` on everything, avatars and images included.
- Borders: 2px `color.border.control` controls; 4px `color.border.strong` windows; 4px hue or status bars; 2px `color.border.default` rules.
- Depth: frame + darker interior; `shadow.hard` on the gold button and dialogs only.

## Motion

UI states are `motion.duration.instant`; overlays, menus, tabs and disclosures appear in one frame; loops follow Stepped motion. Loading is the ellipsis (only while a real request is pending) or a block meter; skeletons are static `color.surface.hover` blocks.

```css
.ellipsis{display:inline-block;width:3ch;overflow:hidden;vertical-align:bottom;white-space:nowrap}
.ellipsis::before{content:"..."}
.is-loading .ellipsis{animation:nc-dots var(--motion-duration-dots) var(--motion-easing-dots) infinite}
@keyframes nc-dots{from{width:1ch}to{width:3ch}}
```

## Interaction

All instant (`motion.duration.instant`). Focus-visible: 4px `color.focus.ring` outline, offset 3px; rows, menu items, summaries and table rows offset −4px.

- **Gold button**: hover unchanged; press `translate: 4px 4px`, `shadow.hard` → `shadow.none`.
- **Framed and tool buttons, linked cards**: hover `color.surface.hover` and `color.text.strong` (cards also show the marker before the title); press `translate: 2px 2px`.
- **Links**: hover text and underline → `color.text.strong`.
- **Nav items, rows, menu options, settings sections, tabs**: hover `color.surface.hover`; current or selected shows the marker and `color.text.strong`.
- **Inputs, selects**: hover frame `color.border.strong`; focus adds the ring; error frame `color.status.danger` plus the nudge.
- **Disclosures** (`<details>` on `color.surface.subtle`, 4px `color.border.control` left bar, right marker): hover `color.surface.hover` and bar `color.hue.cyan`; open: down marker, cyan bar, body in one frame.
- **Switches, checkboxes**: the mark flips in one frame.

## Layout adaptation

- Container max `size.container`, side padding `space.24` (`space.16` under `breakpoint.sm`); 12 columns, gap `space.16`, from `breakpoint.lg`; 1 column under `breakpoint.sm`.
- Shells: `size.sidebar` sidebar, content, optional `size.toc` contents list; under `breakpoint.lg` the sidebar becomes a top menu and the contents list a disclosure (header: Navigation).
- Card grids `repeat(auto-fill, minmax(200px, 1fr))`, gap `space.16`; KPI tiles 4 → 2 → 1 columns. Forms max `size.form`, buttons full width under `breakpoint.sm`.
- Tables scroll in their own wrapper; the page never scrolls sideways at 390px. Scenes crop, never scale.

## Applying the concept

Dense screens get less, never nothing: every screen has the header dither, the marker, the ground strip and one scene.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing or publication home | Hero scene with a Window (eyebrow, 48px h1, lede, gold or framed button, meta line); hue card grid; ground strip | Full |
| Article, product detail, about | Banner Window with title block (hue bullet + category, h1, lede, meta); h2 on dither rules; code windows; callouts; contents list with marker; prev/next with ◀ ▶ | Strong |
| Section break | Dithered h2 rule, " · " meta beside the h2, a right-aligned underlined link | Light |
| Card grid | `color.surface.subtle` cards with a hue bar, 24px pixel icon in the hue, marker preview on hover; product images missing → the item drawn as a 48×48-unit sprite on `color.surface.raised` | One bar per card |
| Store grid and cart | Strip Window (market street) with h1; filter chips with hue bullets, selected chip with marker; cart totals in a Window; quantity as framed ◀ ▶ steppers; one gold button (Add to cart / Place order) | Strip + chrome |
| Dashboard | Strip Window (server yard, one live light) with h1 and the main action; KPI tiles with hue bars, 48px numerals, block meters; flat square bar chart; activity list with hue bullets and dotted rules | Strip, meters |
| Data table | No art inside; `color.surface.subtle` head, 2px rules, status = bullet + word, marker gutter on the selected row, up/down markers on sorted headers | Marker only |
| Form | Window around the form or step; labels 16/24; gold submit; field nudge on error; stepper as a block meter | Chrome |
| Settings | Strip Window (workshop); section list as a marker menu; each group a Window with title bar; danger zone framed in `color.status.danger`; plan cards with hue bars, current plan marked by the marker | Strip + menu |
| FAQ or help | Disclosures with right/down markers and the cyan bar | Light |
| Empty state | Vignette (one object, one blinking light), one sentence in `color.text.secondary`, one framed button with the marker | Strong |
| Error, not found | Vignette or banner with lights off and one beacon, a Window with the message, gold "Retry" | Strong |
| Loading | Ellipsis in the pending control, a block meter, or flat skeleton blocks; the strip scene stays | One loop |
| Toast or confirmation | 2px framed toast with a 12px status icon; no art | Chrome |

## Imagery and icons

- Icons: pixel icons, fill only, `currentColor`, 24px on a 12×12-unit grid (`size.icon`) or 12px on a 6×6 grid (`size.iconSm`), built with `sprite()` into `<svg viewBox="0 0 12 12" shape-rendering="crispEdges">`; no stroke icon libraries. Category icons take their hue; UI icons `color.text.secondary`.
- Avatars: a 8×8-unit mirrored sprite generated from the person's name (hash → which left-half cells fill, mirrored right; hue from the hash) at 4px units on a `color.surface.hover` square, 40px in lists, 80px on a profile (idle `.bob`); initials in pixel type are the fallback.
- Product or post images missing: the item drawn as a sprite at `size.unit` on `color.surface.raised` in a 2px frame, centred; never a grey box or a stock icon.
- Charts: bars flat with square ends, series in hues, no gridlines or 2px dotted ones, square legend bullets, axis text 12px; lines are stepped (`step-after`), 2px, square 6px points; areas flat with a checker edge.
- Photos, when a product has them, sit in a 2px `color.border.control` frame with `image-rendering: auto`; never inside scenes.

## Accessibility

- Text 4.5:1 or more (body 7:1); `color.border.control` frames 3:1; the focus ring never removed; targets `size.touch` under coarse pointers.
- Art and markers `aria-hidden="true"`; state lives in `aria-current`, `aria-selected`, `aria-pressed`; meters `role="meter"`.
- Errors `role="alert"`; one `role="status"` region per screen. No loop frame shorter than 250ms.
