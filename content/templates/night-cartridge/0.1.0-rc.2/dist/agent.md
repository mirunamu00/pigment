# Night Cartridge 0.1.0-rc.2

Design system `night-cartridge@0.1.0-rc.2`. A 16-bit console booted as a product: night-blue ground, cream pixel type for Hangul and Latin, hard-edged game windows, an RPG menu marker and small pixel scenes that move in stepped frames. Suits docs, dev tools and playful products.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

## Character

A 16-bit console booted up as a product: night ground, chunky cream pixel type, hard-edged game windows, a gold RPG marker, and one dense pixel diorama per screen that moves in whole-pixel steps.

## The ten rules that define this look

1. **Everything sits on the pixel grid.** `radius.none`; borders only `border.width.control` (2px) or `border.width.window` (4px); art is filled rects at an integer scale (`size.unit` 2px, `size.unitHero` 4px), `crispEdges`; every drawn object has a 1-unit `color.art.outline`, one top-left highlight and one bottom-right shade. Why: one rounded corner, blur or flat single-fill wall and it stops being a console.
2. **Quantized night colour.** Ground `color.surface.default`, panels `color.surface.subtle`, windows darker (`color.surface.raised`) inside a light frame; text `color.text.primary`, headings `color.text.strong`; art only from `color.art.*`. Why: a 15-bit UI and a 12-bit art palette; free colours break both.
3. **One pixel typeface, one weight.** `font.family.pixel`, a chunky 16px-grid bitmap face, for Hangul and Latin; smoothing off; weight 400; sizes 12/16/32/48, prose 16/28, UI 16/24, no tracking; emphasis is `color.text.strong`, never bold or italic. Why: the bitmap voice is the costume.
4. **Gold is the player.** `color.action.primary` fills one button per screen (with `shadow.hard`); `color.text.accent` is the marker and selection marks; `color.focus.ring` the 4px focus outline. Nothing else is gold. Why: under 0.1% of the area, the eye always finds it.
5. **Selection is an RPG marker.** A bevelled ▶ (4×7 units at `size.unit`) marks the current item in every menu, list, sidebar, table and settings list; its down/right forms are the disclosure chevrons. Why: a tinted row alone is any app.
6. **Instant, physical response.** Every transition is `motion.duration.instant`; hover swaps to `color.surface.hover`; press moves a control 2px, or 4px into its hard shadow, which disappears. Why: consoles answer on the next frame.
7. **Motion is stepped.** Every animation uses `steps(n)`, n = travel in px ÷ 4; loops only in art, the marker and live-status lights; no entrance, scroll or hover animation; reduced motion and the Animation switch freeze everything on frame 1. Why: tweens read as a parallax gimmick.
8. **One full, living stage per screen.** A hero, a framed banner or a 96px strip at the top and the ground strip at the bottom, each filling its width with 3 depth layers, 6 to 12 varied props and 3 to 8 lights; never behind text, data or controls. Why: the scene says where you are; a bare band says nothing.
9. **Game-window chrome.** Major regions are windows (4px `color.border.strong` frame, `color.surface.raised`, optional `size.titleBar` bar); headings sit on a dithered rule; separators are 2px dots; scores are block meters. Why: frames, not shadows, make depth.
10. **Hue identifies, never decorates.** Each entity kind or category owns one `color.hue.*`: a 4px top bar, a `size.bullet` square, its icon fill; text and backgrounds stay neutral. Why: eight hues read as cartridge labels only while small.

## Never

- Radius, circles, pills; blurred shadows, glows, glass, gradients outside dither and scene bands.
- `ease`, `linear` travel, `cubic-bezier`, springs, fades, slides, hover lift, shimmer, spinners, smooth progress bars, scroll or entrance animation.
- Bold, italic, synthetic weights, `letter-spacing`, `text-transform: uppercase`, sizes outside 12/16/32/48.
- Pure white text or a pure black ground (pure black is only the night hard shadow).
- Stroke icon sets, emoji, anti-aliased illustrations, photos or text inside art; art behind text, data or forms, or inside list cards; a second gold button.
- These subjects from elsewhere: a lone cabin or house on a hill under a moon, a tall single tree as a motif, a snowy ridge banner, a capped figure sitting with a laptop, a character walking along the footer, coins. Never use downloaded animated sprite files.
- One building centred in the hero beside the text Window: the hero's focal subject is a street, yard or row of several props.
- A marker and a hue bullet on the same chip or row; a 32px title inside a panel; a placeholder or label clipped by its control.
- Detecting automation to skip animation, artificial delays before data, or content hidden until a script runs.

## Signature elements

Build these first, as reusable pieces, then the components. Once, at the app root:

```css
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
:root[data-motion="off"] *,:root[data-motion="off"] *::before,:root[data-motion="off"] *::after{animation:none!important}
*,*::before,*::after{transition:none!important;border-radius:0!important}
```

### Pixel stage

**What.** A low-resolution diorama at an integer scale: dithered sky bands, three depth layers of silhouettes and props, outlined and shaded sprites, 3 to 8 blinking single-unit lights. Placements:
- **Hero**: 480×128 units at `size.unitHero` (1920×`size.hero`), full-bleed, a Window over its left third (below the scene under `breakpoint.lg`, height `size.heroSm`).
- **Banner**: 720×128 units at `size.unit` (1440×`size.banner`) in a Window, title block (h1, lede, meta) below the art.
- **Strip**: 720×48 units at `size.unit` (`size.bannerSm` high), same Window and title block; for product screens.
- **Vignette**: 48×48 units at `size.unit` (`size.vignette` square), 2px `color.border.control` frame; empty and error states.
- **Ground strip**: the footer's top edge on every screen (CSS below).

**Recipe.**
1. One world per app, from its domain: ops dashboard = server yard at night (racks with LEDs, dish, cable poles, crates); store = market street (awnings, crates, barrels, lit signs, lamps); blog = post-office street (mailboxes, lamp posts, parcel carts, lit shop windows); settings = workshop yard (workbenches, switch panels, toolboxes, cable reels). Screens differ by crop, one prop or which lights are on.
2. 1 unit = 1 viewBox unit, integers only; `width`/`height` = units × pixel unit. Never stretch; wider viewports crop. Focal sprite inside the central 180 units (hero: 90) so 390px shows it.
3. Fill the width in three layers. **Back**: `color.art.sky1`…`sky6` bands (strip: sky5, sky6) with 2-unit checker joins; 1 to 3 clouds (`color.art.glint`, 1-unit `color.art.far` underside) or a sun or moon with a 2-unit checker halo. **Middle**: a `color.art.far` stepped ridge (steps 4 to 8 units high) whose top 2 units are checkered with the sky behind, then a `row()` of 6 to 12 props: at least 3 variants, uneven gaps (4 to 24 units), no variant more than twice in a row; vary width, hue or pose. **Front**: the `color.art.near` ground with the focal subject (2 or 3 sprites or a group, never one lone building) and 1 or 2 near props.
4. Objects per rule 1: each sprite in a `<g>` with `--base` from `color.hue.*` or `color.art.far/near`; `.base` fill, `.hi` on the top and left edge, `.shade` on the bottom and right edge, a 1-unit `.ol` outline; no other tones. Sprites 12 to 24 units tall (hero 12 to 32).
5. Lights: 3 to 8 single units in `color.art.lightWarm`, `lightCold`, `star`; at least 3 sit on props (windows, LEDs, lamps, monitors), not only stars. One `beacon` only on error screens.
6. `aria-hidden="true"`; nothing meaningful lives only in the art.
7. Check the 1440px crop: if more than half the width is bare bands, add props; at 200%, a flat single-fill wall or roof is unfinished.

```js
const R=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${c}"/>`;
// Checker pattern of class c; laid over the first 2 rows of the band below it.
const dither=(c)=>`<pattern id="d-${c}" width="2" height="2" patternUnits="userSpaceOnUse">${R(0,0,1,1,c)}${R(1,1,1,1,c)}</pattern>`;
const sky=(w,bh,bands)=>bands.map((c,i)=>R(0,i*bh,w,bh,c)+(i?`<rect x="0" y="${i*bh}" width="${w}" height="2" fill="url(#d-${bands[i-1]})"/>`:"")).join("");
// Stepped silhouette: tops[i] is the height of column block i, `run` units wide, down to y=h.
const ridge=(w,h,run,tops,c)=>`<path class="${c}" d="M0 ${h}${tops.map((y,i)=>`V${y}H${Math.min((i+1)*run,w)}`).join("")}V${h}Z"/>`;
// Sprite from character rows: "." empty, other characters map to classes; runs merge into one rect.
function sprite(rows,map,x0,y0){let s="";rows.forEach((r,y)=>{for(let x=0;x<r.length;){const c=r[x];let n=1;while(r[x+n]===c)n++;if(c!==".")s+=R(x0+x,y0+y,n,1,map[c]);x+=n;}});return s;}
// Middle row: props standing on baseY, uneven gaps, a variant never three times running.
function row(variants,baseY,w,gaps=[6,14,9,22,11,4,17]){let s="",x=8,i=0,a=-1,b=-1;while(x<w-8){let k=(i*5+2)%variants.length;if(k===a&&k===b)k=(k+1)%variants.length;const v=variants[k];s+=`<g style="--base:${v.base}">${sprite(v.rows,v.map,x,baseY-v.rows.length)}</g>`;b=a;a=k;x+=v.rows[0].length+gaps[i++%gaps.length];}return s;}
// Demo only, never ship it: a 5x9 street lamp with outline, highlight and shade.
const lamp={base:"var(--color-art-far)",rows:[".ooo.","owwwo","owwwo",".ooo.","..o..","..o..","..o..",".hbo.","obsso"],map:{o:"ol",w:"warm blink",b:"base",h:"hi",s:"shade"}};
const bands=["sky-1","sky-2","sky-3","sky-4","sky-5","sky-6"];
const svg=`<svg class="scene" viewBox="0 0 720 128" width="1440" height="256" aria-hidden="true"><defs>${bands.map(dither).join("")}</defs>${sky(720,16,bands)}${ridge(720,128,24,[84,80,76,80,72,68,76,84,80,72,76,84,88,80,76,72,80,84,76,80,72,76,80,84,88,84,80,76,80,84],"far")}${row([lamp/* plus 2+ more variants */],104,720)}${ridge(720,128,40,[104,100,104,108,100,96,100,104,108,104,100,104,108,104,100,104,108,104],"near")}</svg>`;
```

```css
.stage{position:relative;overflow:hidden;height:var(--size-banner);background:var(--color-art-sky1)}
.stage--hero{height:var(--size-hero);max-width:1920px;margin-inline:auto}.stage--strip{height:var(--size-banner-sm)}
.stage>.scene{position:absolute;left:50%;bottom:0;translate:-50% 0;max-width:none;shape-rendering:crispEdges;pointer-events:none}
.sky-1{fill:var(--color-art-sky1)}.sky-2{fill:var(--color-art-sky2)}.sky-3{fill:var(--color-art-sky3)}.sky-4{fill:var(--color-art-sky4)}.sky-5{fill:var(--color-art-sky5)}.sky-6{fill:var(--color-art-sky6)}
.far{fill:var(--color-art-far)}.near{fill:var(--color-art-near)}.ol{fill:var(--color-art-outline)}.base{fill:var(--base)}.hi{fill:color-mix(in srgb,var(--base) 60%,var(--color-art-glint))}.shade{fill:color-mix(in srgb,var(--base) 60%,var(--color-art-outline))}.warm{fill:var(--color-art-light-warm)}.cold{fill:var(--color-art-light-cold)}.star{fill:var(--color-art-star)}.beacon{fill:var(--color-art-beacon)}
.ground{position:relative;height:calc(var(--size-ground) + var(--size-ground-edge));margin-top:calc(var(--space-64) + var(--size-ground-sprite));pointer-events:none;
  background:linear-gradient(90deg,var(--color-art-edge-hi) 2px,transparent 0) 0 calc(100% - 2px)/6px 2px repeat-x,linear-gradient(var(--color-art-edge) 0 0) bottom/100% var(--size-ground-edge) no-repeat,repeating-conic-gradient(var(--color-art-ground-hi) 0 25%,transparent 0 50%) 0 0/8px 8px,var(--color-art-ground)}
.ground>svg{position:absolute;bottom:100%;left:50%;translate:-50% 0;width:1440px;max-width:none;height:var(--size-ground-sprite);shape-rendering:crispEdges}
```

Ground strip: grass `color.art.ground` checkered with `groundHi`, a `size.groundEdge` dirt edge with a dotted `edgeHi` row, and a 720×24-unit svg (`size.groundSprite` high, cropped like scenes) with 2 to 4 original sprites from the app's world standing on its top edge, each 12 to 24 units tall (24 to 48px). Smaller props do not read and do not count.

**Motion.** Every scene, from Stepped motion: stars twinkle, lights blink out of sync, one cloud or particle layer drifts, exactly one sprite bobs or swaps 2 frames, one rare event (a shooting light, a bird) every `motion.duration.rare`. At most 2 moving sprites and 8 blinking lights. Reduced motion or Animation off: frame 1, still and complete.

**Where.** Landing or home: hero. Content pages (article, product detail, about): banner. Product screens (dashboard, lists, settings, cart): strip. Empty and error: vignette. Every screen: ground strip.

**Limits.** One of hero, banner or strip per screen, plus the ground strip and at most one vignette. Never behind text, controls, charts, tables or form fields; never in list cards, rows, toasts or badges.

### Stepped motion

**What.** Every animation jumps in whole pixels with `steps()` (`motion.easing.*`); the UI has no transitions.

**Recipe.** 4 CSS px per step: `steps(N)`, N = distance ÷ 4 (in SVG, lengths are viewBox units: 4px = 1 unit at the hero, 2 at banners). Keyframes change only `opacity`, whole-unit `translate`, sparkle `scale`, or `fill`.

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

Give each light its own `--o` (0, −300ms, −700ms…). In SVG, `.bob` takes `--bob:-1px` at the hero and `-2px` in banners. A drifting cloud at 2× moving 800px: `--from:-40px; --to:360px; --n:200`.

**Motion.** Triggers: `loop` (art, the one blinking marker, live lights) and `state-change` (instant). One-shots: the error nudge (2 frames of `motion.duration.nudge`) and the meter fill. Animation switch: a header text button (12px pause/play icon + "Animation on"/"off") sets `data-motion="off"` on `<html>`, persisted in `localStorage`, default on. Resting styles are frame 1 (lights lit, rare event hidden, meters full, ellipsis complete).

**Where.** Scenes; a `size.bullet` live light blinking `motion.duration.ledA` only while a job runs; the loading ellipsis; the field nudge.

**Limits.** Never on text, buttons, rows, cards, data or layout. No load, reveal or scroll animation.

### RPG marker and instant, physical response

**What.** A bevelled ▶ in `color.text.accent`, 4×7 units at `size.unit` (`size.markerW` × `size.markerH`), top edge lit (white at 45%), bottom edge shaded (black at 40%).

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
.card-title{position:relative}
.card-title>.cur{position:absolute;right:calc(100% + var(--space-4));top:50%;translate:0 -50%;visibility:hidden}
.card-link:is(:hover,:focus-visible) .card-title>.cur{visibility:visible;color:var(--color-text-strong)}
:focus-visible{outline:var(--border-width-window) solid var(--color-focus-ring);outline-offset:3px}
:is(.item,tr,summary,[role="option"]):focus-visible{outline-offset:-4px}
.press:active:not(:disabled){translate:2px 2px}
.btn-gold{height:var(--size-control-lg);padding-inline:var(--space-20);background:var(--color-action-primary);color:var(--color-text-on-action);border:var(--border-width-control) solid var(--color-action-primary-edge);box-shadow:var(--shadow-hard)}
.btn-gold:active:not(:disabled){translate:4px 4px;box-shadow:var(--shadow-none)}
```

Markup: `<a class="item" aria-current="page"><span class="cur" aria-hidden="true"></span>Overview</a>`. In `.item` rows (menus, lists, sidebars) the marker keeps its slot when hidden, so labels never shift. In cards it hangs in the left padding (`.card-title`), and the title stays flush with the icon and meta.

**Motion.** Instant. The single "you are here" marker of the main navigation may blink (`nc-swap`, `motion.duration.bob`, `motion.easing.frame`); every other marker is still.

**Where.** Current item: nav, sidebar, contents list, tabs, filters, selected chip, settings sections. Card hover/focus preview. Selected table row (16px gutter); sorted headers (up/down); highlighted options; disclosures (right/down); prev/next; a trailing ▶ (`currentColor`, no bevel) on forward actions.

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

Block meter: `<div class="meter" role="meter" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="Quota">` with 10 to 20 `<i>` (`style="--i:n"`), filled = round(value ÷ max × blocks); value in 48px numerals above. Counts (n of m, m ≤ 20) get one block per item and the count "2 of 6" 12/18 above. Hues: assign `--hue` per category or entity kind in a fixed order (cyan, violet, blue, amber, green, pink, orange, teal) so a thing keeps its hue on every screen.

**Motion.** Static; meters fill one block per `motion.duration.meterStep` when they render.

**Where.** Windows: scene windows, code blocks (title bar: language label + framed copy button), dialogs, settings groups, the danger zone (`color.status.danger` frame). Dither under the header and h2s; dots between list items; hue bars on cards and KPI tiles; meters for scores, quotas, progress and steps.

**Limits.** Four-sided 4px frames on at most 3 regions per screen (scene window, code or dialog, one group). Inline figures and sprite illustrations in prose take a 2px `color.border.control` frame; a footer newsletter is a 2px-framed `color.surface.subtle` panel; ordinary cards are `color.surface.subtle` with a hue bar. `shadow.hard` only on the gold button and dialogs.

### Pixel type for Hangul and Latin

**What.** `font.family.pixel` sets everything at weight 400, `pixelMono` sets code; Hangul and Latin share one bitmap grid. A "Pixel body" switch swaps long reading text to `font.family.readable` (code to `readableMono`); headings, nav, buttons and numerals stay pixel.

**Recipe.**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/neodgm/neodgm-webfont@latest/neodgm/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/neodgm/neodgm-webfont@latest/neodgm_code/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono&display=swap">
```

```css
html{font:var(--font-weight-regular) var(--font-size-body)/var(--font-line-height-ui) var(--font-family-pixel);color:var(--color-text-primary);background:var(--color-surface-default);
  -webkit-font-smoothing:none;font-smooth:never;font-synthesis:none;letter-spacing:normal;text-transform:none;word-break:keep-all;line-break:strict;overflow-wrap:break-word;font-variant-numeric:slashed-zero tabular-nums}
:is(h1,h2,h3,h4,h5,h6,b,strong,th,label,button,legend,dt){font-weight:var(--font-weight-regular)}
:is(h1,h2,h3,h4,strong,b,em,i){color:var(--color-text-strong);font-style:normal}
.prose{max-width:var(--size-prose);line-height:var(--font-line-height-prose)}
:is(code,pre,kbd,samp){font-family:var(--font-family-pixel-mono)}
:not(pre)>code{padding:0 var(--space-4);background:var(--color-surface-code);color:var(--color-text-strong)}
:root[data-body="readable"] :is(.prose p,.prose li,.prose blockquote,td){font-family:var(--font-family-readable)}
:root[data-body="readable"] :is(pre,code){font-family:var(--font-family-readable-mono)}
```

`font.family.pixel` is NeoDunggeunmo and `pixelMono` NeoDunggeunmo Code (both OFL), drawn on a 16px grid: 16, 32 and 48 give solid 2px-wide stems; 12 is the one off-grid size, for meta only. Alternative: Galmuri11 / GalmuriMono11 (OFL, `https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css`), a lighter 12px-grid face on which 16 and 32 render soft. Never mix two pixel faces. Hangul: `word-break: keep-all` wraps at word spaces; keep the 28px prose line height.

**Motion.** Static.

**Where.** Everything. The Pixel body switch (12px "A" icon + "Pixel body on"/"off", `data-body` on `<html>`, persisted) sits in the header of screens with long prose or dense tables.

**Limits.** No bold, italic, tracking or sizes between steps.

## Color use

- Gold per rule 4, on the screen's main commit (subscribe, add to cart, place order, save).
- Surfaces: ground → `subtle` (cards, sidebar, title bars) → `hover`; windows, inputs and code go darker to `raised` inside a frame.
- Text: `strong` headings, values, current items; `primary` body and cells; `secondary` meta, hints, resting nav, placeholders. Links `color.text.link`, 2px `color.border.control` underline at 4px offset.
- Status colours on callout bars, errors, bullets, meters, danger buttons; never behind text. Code: `color.syntax.*` on `color.surface.raised`. Hues under 6% of the screen.
- Day: parchment and ink, same rules; `color.action.primaryEdge` edges the gold button.

## Typography

| Role | Size / line height | Colour |
| --- | --- | --- |
| Hero h1, display numerals (KPIs, prices on detail) | `display` / `display` | strong |
| Page h1, h2, card titles in feature grids | `title` / `title` | strong |
| h3, card titles, table heads, labels, buttons, nav | `body` / `ui` | strong or primary |
| Prose | `body` / `prose`, max `size.prose` | primary |
| Meta, dates, helper, error text, counts, kbd | `caption` / `caption` | secondary |

One h1 per screen; one `display` size per region. Dates `YYYY.MM.DD`; meta joined with " · "; no exclamation marks or emoji.

## Spacing and density

- Base unit 4px, only `space.*`. Sections `space.64` apart (`space.40` under `breakpoint.sm`); content starts `space.40` under the header.
- Window and card padding `space.16`–`space.20`; banner title block `space.24`. Rows `size.row` (`size.touch` under coarse pointers), 2px rules.
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
- **Framed and tool buttons, linked cards**: hover `color.surface.hover` and `color.text.strong` (cards show the marker in their padding); press `translate: 2px 2px`.
- **Links**: hover text and underline → `color.text.strong`.
- **Nav items, rows, menu and dropdown options, settings sections, tabs**: hover `color.surface.hover`; current, selected or highlighted shows the marker and `color.text.strong`.
- **Inputs, selects**: hover frame `color.border.strong`; focus adds the ring; error frame `color.status.danger` plus the nudge.
- **Disclosures** (`<details>`, `color.surface.subtle`, 4px `color.border.control` left bar, right marker): hover `color.surface.hover`, bar `color.hue.cyan`; open: down marker, body in one frame.
- **Switches, checkboxes**: the mark flips in one frame.

## Layout adaptation

- Container max `size.container`, side padding `space.24` (`space.16` under `breakpoint.sm`); 12 columns, gap `space.16`, from `breakpoint.lg`; 1 column under `breakpoint.sm`.
- Shells: `size.sidebar` sidebar, content, optional `size.toc` contents list; under `breakpoint.lg` the sidebar becomes a top menu, the contents list a disclosure.
- Card grids `repeat(auto-fill, minmax(200px, 1fr))`, gap `space.16` (`auto-fit` when items are fewer than the columns, so a grid under a full-width rule fills it); KPI tiles 4 → 2 → 1 columns.
- Panels or columns side by side share a height (`align-items:stretch`), or the shorter column takes the next block; no void over `space.64`. Forms max `size.form`, buttons full width under `breakpoint.sm`.
- Tables scroll in their own wrapper; the page never scrolls sideways at 390px.

## Applying the concept

Dense screens get less, never nothing: every screen has the header dither, the marker, the ground strip and one scene.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing or home | Hero (focal subject a street or yard of several props) with a Window: eyebrow, 48px h1, lede, button, meta; hue card grid | Full |
| Article, product detail, about | Banner Window with title block (hue bullet + category, h1, lede, meta); dither h2s; code windows; callouts; contents list with marker; ◀ ▶ prev/next | Strong |
| Card grid | Subtle cards with a hue bar and 24px hue icon, marker in the padding on hover; missing images → 48×48-unit sprites | One bar per card |
| Store grid and cart | Strip (market street); filter chips with hue bullets; cart totals in a Window; framed ◀ ▶ quantity steppers; one gold button | Strip + chrome |
| Dashboard | Strip (server yard: 3+ lit units on racks, lamps or monitors plus stars; one may blink as the live light); KPI tiles with hue bars, 48px numerals, meters; 32/40 section titles outside panels on the dither rule, panels labelled by bullet + 12/18 caption, panels in a row share a height; n-of-m progress as a block meter; flat bar chart | Strip, meters |
| Data table | No art; subtle head, 2px rules, status = bullet + word, marker gutter on the selected row, up/down markers on sorted headers | Marker only |
| Form | Window around the form or step; gold submit; nudge on error; steps as a block meter | Chrome |
| Settings | Strip (workshop: 3+ lit units, lamp, monitor, panel LEDs, plus stars); section list as a marker menu; groups as Windows with title bars; danger zone framed in `color.status.danger`; current plan marked by the marker | Strip + menu |
| Empty state | Vignette (one object, one blinking light), one sentence, one framed button with the marker | Strong |
| Error, not found | Vignette or banner with lights off and one beacon, a Window with the message, gold "Retry" | Strong |
| Loading | Ellipsis in the pending control, a block meter, or flat skeleton blocks; the scene stays | One loop |
| Toast | 2px framed toast, 12px status icon; no art | Chrome |

## Imagery and icons

- Icons: fill-only pixel icons, `currentColor`, 24px on a 12×12-unit grid (`size.icon`) or 12px on 6×6 (`size.iconSm`), drawn with `sprite()`; no stroke libraries. Category icons take their hue (sidebar included); UI icons `color.text.secondary`.
- Avatars: an 8×8-unit mirrored sprite from a hash of the name (cells and hue) at 4px units on `color.surface.hover`, 40px in lists, 80px on a profile (idle `.bob`).
- Missing product or post images: the item as a sprite at `size.unit` on `color.surface.raised` in a 2px frame; never a grey box.
- Charts: flat square bars in hues, 2px dotted gridlines or none, square legend bullets, 12px axes; lines `step-after`, 2px, square points.
- Photos sit in a 2px `color.border.control` frame, never inside scenes.

## Accessibility

- Text 4.5:1 or more (body 7:1); `color.border.control` frames 3:1; the focus ring never removed; targets `size.touch` under coarse pointers.
- Art and markers `aria-hidden="true"`; state lives in `aria-current`, `aria-selected`, `aria-pressed`; meters `role="meter"`.
- Errors `role="alert"`; one `role="status"` region per screen. No loop frame shorter than 250ms.

## Semantic color tokens — light

| Token | Value |
| --- | --- |
| `color.surface.default` | `#e8e0d0` |
| `color.surface.subtle` | `#f0e8d8` |
| `color.surface.raised` | `#f8f0e0` |
| `color.surface.hover` | `#d8d0c0` |
| `color.surface.overlay` | `#38304099` |
| `color.surface.code` | `#f0d898` |
| `color.text.primary` | `#383040` |
| `color.text.strong` | `#181820` |
| `color.text.secondary` | `#585068` |
| `color.text.disabled` | `#888090` |
| `color.text.onAction` | `#181820` |
| `color.text.link` | `#385880` |
| `color.text.accent` | `#705000` |
| `color.border.default` | `#c8c0b0` |
| `color.border.control` | `#787080` |
| `color.border.strong` | `#383040` |
| `color.action.primary` | `#d8a848` |
| `color.action.primaryHover` | `#d8a848` |
| `color.action.primaryEdge` | `#383040` |
| `color.action.secondary` | `#e0d8c8` |
| `color.focus.ring` | `#705000` |
| `color.shadow.hard` | `#383040` |
| `color.status.success` | `#306030` |
| `color.status.warning` | `#805810` |
| `color.status.danger` | `#983830` |
| `color.status.info` | `#305880` |
| `color.hue.cyan` | `#117799` |
| `color.hue.violet` | `#8844aa` |
| `color.hue.blue` | `#3366aa` |
| `color.hue.amber` | `#996600` |
| `color.hue.green` | `#227733` |
| `color.hue.pink` | `#aa3377` |
| `color.hue.orange` | `#aa4411` |
| `color.hue.teal` | `#117766` |
| `color.syntax.keyword` | `#704888` |
| `color.syntax.type` | `#705810` |
| `color.syntax.function` | `#286870` |
| `color.syntax.literal` | `#904828` |
| `color.syntax.string` | `#486020` |
| `color.syntax.comment` | `#686070` |
| `color.art.sky1` | `#4477cc` |
| `color.art.sky2` | `#5588cc` |
| `color.art.sky3` | `#6699dd` |
| `color.art.sky4` | `#77aadd` |
| `color.art.sky5` | `#99ccee` |
| `color.art.sky6` | `#bbddee` |
| `color.art.far` | `#77aa99` |
| `color.art.near` | `#558877` |
| `color.art.ground` | `#339944` |
| `color.art.groundHi` | `#88cc44` |
| `color.art.edge` | `#443322` |
| `color.art.edgeHi` | `#aa8855` |
| `color.art.outline` | `#111122` |
| `color.art.glint` | `#eeeedd` |
| `color.art.lightWarm` | `#ffcc66` |
| `color.art.lightCold` | `#66ffee` |
| `color.art.star` | `#4477cc` |
| `color.art.beacon` | `#ff5555` |
| `color.art.beaconOff` | `#553344` |

## Semantic color tokens — dark

| Token | Value |
| --- | --- |
| `color.surface.default` | `#181820` |
| `color.surface.subtle` | `#202028` |
| `color.surface.raised` | `#101018` |
| `color.surface.hover` | `#282838` |
| `color.surface.overlay` | `#101018cc` |
| `color.surface.code` | `#383010` |
| `color.text.primary` | `#d0c8c0` |
| `color.text.strong` | `#f0e8d8` |
| `color.text.secondary` | `#a0a0a8` |
| `color.text.disabled` | `#686878` |
| `color.text.onAction` | `#181820` |
| `color.text.link` | `#98b0c8` |
| `color.text.accent` | `#d8a848` |
| `color.border.default` | `#303040` |
| `color.border.control` | `#686878` |
| `color.border.strong` | `#888898` |
| `color.action.primary` | `#d8a848` |
| `color.action.primaryHover` | `#d8a848` |
| `color.action.primaryEdge` | `#d8a848` |
| `color.action.secondary` | `#282830` |
| `color.focus.ring` | `#d8a848` |
| `color.shadow.hard` | `#000000` |
| `color.status.success` | `#88b888` |
| `color.status.warning` | `#d8b070` |
| `color.status.danger` | `#e08880` |
| `color.status.info` | `#88a8c8` |
| `color.hue.cyan` | `#44ccee` |
| `color.hue.violet` | `#cc88ee` |
| `color.hue.blue` | `#66aaee` |
| `color.hue.amber` | `#eeaa22` |
| `color.hue.green` | `#44cc66` |
| `color.hue.pink` | `#ee88cc` |
| `color.hue.orange` | `#ee8844` |
| `color.hue.teal` | `#44ccaa` |
| `color.syntax.keyword` | `#b898c8` |
| `color.syntax.type` | `#d8b870` |
| `color.syntax.function` | `#88b8c0` |
| `color.syntax.literal` | `#d89878` |
| `color.syntax.string` | `#a8c088` |
| `color.syntax.comment` | `#808088` |
| `color.art.sky1` | `#000011` |
| `color.art.sky2` | `#001133` |
| `color.art.sky3` | `#112244` |
| `color.art.sky4` | `#113355` |
| `color.art.sky5` | `#224466` |
| `color.art.sky6` | `#336677` |
| `color.art.far` | `#112233` |
| `color.art.near` | `#001122` |
| `color.art.ground` | `#339944` |
| `color.art.groundHi` | `#88cc44` |
| `color.art.edge` | `#443322` |
| `color.art.edgeHi` | `#aa8855` |
| `color.art.outline` | `#111122` |
| `color.art.glint` | `#eeeedd` |
| `color.art.lightWarm` | `#ffcc66` |
| `color.art.lightCold` | `#66ffee` |
| `color.art.star` | `#ffeecc` |
| `color.art.beacon` | `#ff5555` |
| `color.art.beaconOff` | `#331122` |

## Primitive tokens

| Token | Value |
| --- | --- |
| `font.family.pixel` | `NeoDunggeunmo, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif` |
| `font.family.pixelMono` | `"NeoDunggeunmo Code", NeoDunggeunmo, D2Coding, ui-monospace, monospace` |
| `font.family.readable` | `Pretendard, "Pretendard Variable", "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", system-ui, sans-serif` |
| `font.family.readableMono` | `"Geist Mono", D2Coding, ui-monospace, monospace` |
| `font.size.caption` | `12px` |
| `font.size.body` | `16px` |
| `font.size.title` | `32px` |
| `font.size.display` | `48px` |
| `font.weight.regular` | `400` |
| `font.lineHeight.caption` | `18px` |
| `font.lineHeight.ui` | `24px` |
| `font.lineHeight.prose` | `28px` |
| `font.lineHeight.title` | `40px` |
| `font.lineHeight.display` | `56px` |

| Token | Value |
| --- | --- |
| `space.2` | `2px` |
| `space.4` | `4px` |
| `space.8` | `8px` |
| `space.12` | `12px` |
| `space.16` | `16px` |
| `space.20` | `20px` |
| `space.24` | `24px` |
| `space.32` | `32px` |
| `space.40` | `40px` |
| `space.64` | `64px` |

| Token | Value |
| --- | --- |
| `radius.none` | `0px` |

| Token | Value |
| --- | --- |
| `border.width.control` | `2px` |
| `border.width.window` | `4px` |

| Token | Value |
| --- | --- |
| `shadow.hard` | `4px 4px 0 0 var(--color-shadow-hard)` |
| `shadow.none` | `none` |

| Token | Value |
| --- | --- |
| `size.unit` | `2px` |
| `size.unitHero` | `4px` |
| `size.controlSm` | `28px` |
| `size.control` | `40px` |
| `size.controlLg` | `48px` |
| `size.touch` | `44px` |
| `size.row` | `40px` |
| `size.header` | `64px` |
| `size.rule` | `4px` |
| `size.hero` | `512px` |
| `size.heroSm` | `320px` |
| `size.banner` | `256px` |
| `size.bannerSm` | `96px` |
| `size.vignette` | `96px` |
| `size.ground` | `32px` |
| `size.groundEdge` | `6px` |
| `size.groundSprite` | `48px` |
| `size.markerW` | `8px` |
| `size.markerH` | `14px` |
| `size.icon` | `24px` |
| `size.iconSm` | `12px` |
| `size.bullet` | `6px` |
| `size.meterW` | `12px` |
| `size.meterH` | `16px` |
| `size.titleBar` | `40px` |
| `size.prose` | `720px` |
| `size.sidebar` | `288px` |
| `size.toc` | `200px` |
| `size.dialog` | `560px` |
| `size.form` | `560px` |
| `size.container` | `1296px` |

| Token | Value |
| --- | --- |
| `opacity.dim` | `0.15` |
| `opacity.twinkle` | `0.35` |

| Token | Value |
| --- | --- |
| `motion.duration.instant` | `0ms` |
| `motion.duration.meterStep` | `40ms` |
| `motion.duration.nudge` | `120ms` |
| `motion.duration.dots` | `1200ms` |
| `motion.duration.fan` | `500ms` |
| `motion.duration.ledA` | `900ms` |
| `motion.duration.bob` | `1000ms` |
| `motion.duration.ledB` | `1400ms` |
| `motion.duration.beacon` | `2000ms` |
| `motion.duration.ledC` | `2300ms` |
| `motion.duration.twinkle` | `2400ms` |
| `motion.duration.sparkle` | `3200ms` |
| `motion.duration.rare` | `14000ms` |
| `motion.duration.drift` | `120000ms` |
| `motion.easing.frame` | `steps(1)` |
| `motion.easing.dots` | `steps(3, jump-none)` |

| Token | Value |
| --- | --- |
| `breakpoint.sm` | `600px` |
| `breakpoint.lg` | `1024px` |
| `breakpoint.xl` | `1440px` |

## Components

### Button

**Use.** Gold: the screen's one main commit. Framed: every other action. Tool: header switches and icon actions. Danger: destructive actions, confirmed in a dialog.

**Anatomy.** Label 16/24 pixel; optional 24px pixel icon before it (gap `space.8`); forward actions end with a trailing ▶ (`.cur`, no bevel, `currentColor`). Heights: `size.controlLg` (hero, gold), `size.control` (default), `size.controlSm` (copy, row actions, padding `space.8`). Padding `space.20` (gold), `space.12` (others). Icon-only: square, `aria-label`.

**Variants.**
- Gold: `color.action.primary` fill, `color.text.onAction`, 2px `color.action.primaryEdge` border, `shadow.hard`.
- Framed: transparent, 2px `color.border.control`, `color.text.primary`; optional kbd chip (2px `color.border.default`, 12px).
- Tool: `color.action.secondary` fill or transparent, `color.text.secondary`, label + state word ("Animation on").
- Danger: transparent, 2px `color.status.danger` border and text.

**States.** Hover: gold unchanged; others `color.surface.hover` and `color.text.strong`. Active: gold moves 4px and loses `shadow.hard`; others move 2px. Focus-visible: 4px `color.focus.ring`, offset 3px. Disabled: `color.surface.hover`, `color.text.disabled`, `color.border.default`, no shadow or press. Loading (real request only): gerund + `.ellipsis`, width held, `aria-busy`.

**Keyboard and screen readers.** Native `<button>`; Enter and Space; icons and markers `aria-hidden`; toggles use `aria-pressed`.

**Do / Don't.** Do keep one gold button per screen. Don't give it a hover colour.

### Text field

**Anatomy.** Label above (16/24, `color.text.strong`), `space.8`; control `size.control` high, `color.surface.raised` fill, 2px `color.border.control` frame, padding 0 `space.12`, 16px pixel text, placeholder `color.text.secondary`; helper 12/18 `color.text.secondary`, `space.4` below. Textarea: min 4 rows, padding `space.12`, counter 12px right-aligned under it. Search: 24px pixel magnifier inside at `space.8`, text from `space.40`, kbd hint at the right (hidden under `breakpoint.sm`). Placeholders fit; shorten, never clip.

**States.** Hover: frame `color.border.strong`. Focus-visible and focus: the 4px ring, offset 3px, frame unchanged. Disabled: `color.surface.subtle` fill, `color.border.default` frame, `color.text.disabled`. Read-only: `color.surface.subtle`. Error: frame `color.status.danger`, `.nudge` once on submit, the message replaces the helper: 12px pixel warning icon + text in `color.status.danger`, `aria-invalid="true"`, `aria-describedby`. A failed submit focuses the first invalid field. Loading (async check): `.ellipsis` at the right.

**Keyboard and screen readers.** Visible `<label for>`; "required" in words, not only a symbol.

**Do / Don't.** Do keep the 2px frame. Don't fill the field red.

### Select

**Anatomy.** The text field's box, label, helper and error; `appearance:none`; a down marker (`.cur--d`, `color.text.secondary`) at `space.12` from the right. Prefer native `<select>`. A custom list opens as a Window directly below (2px `color.border.strong` frame, `color.surface.raised`, no shadow), options as marker items (`size.row`), 8 visible, then scroll.

**States.** Hover: frame `color.border.strong`. Focus-visible: ring. Open: down marker swaps to up; the list appears in one frame. Highlighted option: `color.surface.hover` + marker. Selected option: `color.text.strong`, `aria-selected`. Disabled and error: as text field.

**Keyboard and screen readers.** Custom: `role="combobox"` + `listbox`/`option`, `aria-activedescendant`; arrows move the marker, Enter selects, Escape closes.

**Do / Don't.** Do mark the highlighted option. Don't rotate a chevron.

### Checkbox and radio

**Anatomy.** Checkbox: 16px square, 2px `color.border.control` frame, `color.surface.raised` fill; checked shows a pixel check drawn with `sprite()` (6×5 units at `size.unit`: rows `.....x`, `....xx`, `x..xx.`, `xxxx..`, `.xx...`) in `color.text.accent`. Indeterminate: an 8×4px bar in `color.text.accent`. Radio: the same square; selected shows an 8px square in `color.text.accent`, never a circle. Label 16/24 at `space.8`.

**States.** Hover: frame `color.border.strong`. Focus-visible: ring around the box, offset 3px. Checked: mark appears in one frame. Disabled: `color.border.default`, mark and label `color.text.disabled`. Error: frame `color.status.danger`, message under the group.

**Keyboard and screen readers.** Native inputs, visually replaced; `<fieldset>` + `<legend>` for groups.

**Do / Don't.** Do draw the mark in pixels. Don't use a font check glyph.

### Switch

**Anatomy.** Track 32×16px, 2px `color.border.control` frame, `color.surface.raised`; an 8×8px square thumb inside, `color.text.secondary` at the left when off; on: the thumb jumps right in `color.text.accent`, track `color.surface.hover`. A state word follows ("on"/"off", 12px `color.text.secondary`). The whole row (label, 12/18 description, switch) is the target, at least `size.touch`.

**States.** Hover: frame `color.border.strong`. Focus-visible: ring around the track. Selected: one-frame jump, no slide. Disabled: `color.border.default`, thumb `color.text.disabled`. Loading (saved remotely): the state word becomes `.ellipsis`.

**Keyboard and screen readers.** `<button role="switch" aria-checked>` or a checkbox with `role="switch"`; the label names the setting.

**Do / Don't.** Do flip instantly. Don't slide the thumb.

### Tabs

**Anatomy.** A row of tabs on a 2px `color.border.strong` baseline that joins the panel. Tab: `size.control` high, padding 0 `space.12`, 16/24, marker slot before the label. Selected: 2px `color.border.strong` frame on top and sides, panel-coloured bottom covering the baseline, `color.text.strong`, marker visible. Unselected: `color.text.secondary`. Code file tabs: the same on a code Window, frame 4px.

**States.** Hover: `color.surface.hover`, `color.text.primary`. Focus-visible: ring, offset −4px. Selected: as above; the panel swaps in one frame. Disabled: `color.text.disabled`, no hover.

**Keyboard and screen readers.** `role="tablist"`/`tab`/`tabpanel`, roving tabindex, arrows, Home/End, `aria-selected`.

**Do / Don't.** Do frame and mark the selected tab. Don't use an underline or pill.

### Navigation

**Header.** Sticky, `size.header` on `color.surface.default`, a 4px `.dither` rule below, unchanged on scroll. Left: a 24px original pixel mark + product name 16/24 `color.text.strong`; then 3 to 5 nav items (`.item`, marker before the current one, `aria-current="page"`). Right: search as a framed tool button with a kbd hint, the Animation switch, other tools. Dropdowns (user menu, sort) are marker menus: a Window under the trigger, options as `.item`, the highlighted option shows the marker. Search placeholders fit: one word ("Search") or the icon only under `breakpoint.sm`. Under `breakpoint.lg`: mark, search icon, menu button opening a marker-menu Window; Escape closes.

**Sidebar.** `size.sidebar`, `color.surface.subtle`, 2px `color.border.default` right edge. Group titles 12/18 `color.text.secondary`; items are `.item` with a 24px hue icon or a `size.bullet` hue bullet, label, count right in `color.text.secondary`; `.sep-dots` between items; the current item `color.surface.hover` + marker. Collapsible groups use right/down markers.

**Contents list.** 2px `color.border.default` left rule, items 16/24, nested items indented `space.16`, marker on the current heading.

**Breadcrumbs, prev/next, pagination.** Breadcrumbs `color.text.secondary` with " / ", hover `color.text.strong` underlined. Prev/next: two columns, 2px `color.border.strong` top rule, ◀/▶ + 12px label, title 16/24. Pagination: ◀ 1 2 3 ▶ `size.control` squares, current page framed 2px `color.border.strong`, `aria-current`.

**Keyboard and screen readers.** `<nav aria-label>`; the menu button has `aria-expanded`; the mobile menu traps focus until closed.

**Do / Don't.** Do keep one marker per menu. Don't underline the current item.

### Card

**Anatomy.** `color.surface.subtle`, no side or bottom border, a 4px `color.hue.*` top bar for its category or entity kind (neutral cards: a 2px `color.border.default` top rule), padding `space.16` `space.20`. Order: 24px pixel icon in the hue, title (16/24; 32/40 in feature grids) flush with the icon and meta, its marker hanging in the left padding (`.card-title`, never a reserved slot), one-line description `color.text.secondary`, meta 12/18 joined by " · ". Panel: labelled by a `size.bullet` + 12/18 caption, never a 32px title. KPI tile: label row (`size.bullet` + 12px label), 48px numeral `color.text.strong`, delta 12px in a status colour with an up/down marker, block meter. Product card: framed image area (photo, or the item's sprite on `color.surface.raised`), name, price 16/24 `color.text.strong`.

**States.** Hover (linked): `color.surface.hover`, the marker in the left padding beside the title. Focus-visible: ring, offset 3px. Active: `translate: 2px 2px`. Selected (plan, option): marker visible, 2px `color.text.accent` frame. Loading: flat static `color.surface.hover` blocks for icon, title and lines. Error: a callout with a 4px `color.status.danger` bar inside.

**Keyboard and screen readers.** The whole card is one link (the title link stretched); secondary actions are separate buttons.

**Do / Don't.** Do keep one hue per entity. Don't give cards a shadow or a 4px frame.

### Table

**Anatomy.** Head row on `color.surface.subtle`, 16/24 `color.text.strong`, 2px `color.border.strong` rule under it; body rows `size.row`, 2px `color.border.default` rules, no zebra, no vertical rules; cell padding 0 `space.12`; a 16px leading gutter for the marker. Numbers right-aligned in pixel numerals. Status cells: `size.bullet` in the status colour + word. Row actions: `size.controlSm` framed buttons, right. Under `breakpoint.sm` the table scrolls inside its wrapper (`overflow-x:auto`), or rows become stacked label/value cards.

**States.** Hover: row `color.surface.hover`. Focus-visible (interactive rows): ring, offset −4px. Selected: marker in the gutter, `color.text.strong`, `aria-selected`. Sorted header: up/down marker after the label, `aria-sort`. Loading: 5 rows of flat static `color.surface.hover` blocks. Error: a danger callout above with Retry. Empty: the empty state replaces the body.

**Keyboard and screen readers.** Real `<table>`, `<th scope>`, sort buttons inside headers.

**Do / Don't.** Do keep art out. Don't zebra-stripe.

### Badge

**Anatomy.** Status or category chip: `size.bullet` square in the hue or status colour + label 16/24 (12/18 when dense) in `color.text.primary`, padding 0 `space.8`, no fill. Count badge (cart, unread): 20px-high box, `color.surface.hover`, 12px `color.text.strong`, padding 0 `space.4`. Filter chip: the chip as a toggle button, 2px `color.border.default` frame, `size.control` high. Tag: plain `#tag` in `color.text.secondary`.

**States.** Filter chip hover `color.surface.hover`; selected (`aria-pressed="true"`) `color.surface.hover`, `color.text.strong`, the marker in place of the bullet (same slot; never both); focus ring.

**Do / Don't.** Do let the bullet carry the colour. Don't fill badges with a hue.

### Dialog

**Anatomy.** Native `<dialog>` or `role="dialog"`. A Window: 4px `color.border.strong` frame, `color.surface.raised`, `shadow.hard`, width min(`size.dialog`, 100% − `space.32`). Title bar `size.titleBar` with the title 16/24 `color.text.strong` and a framed close button (12px pixel ×). Body padding `space.20`, 16/28. Actions right, gap `space.12`: framed Cancel, then the gold confirm (the screen's gold moves into the dialog); destructive confirms use the danger button. Scrim `color.surface.overlay`, no blur.

**States.** Opens and closes in one frame. Focus moves to the first field or the confirm; focus-visible ring. Loading: confirm shows the gerund + `.ellipsis`, `aria-busy`. Error: a danger callout above the actions.

**Keyboard and screen readers.** `aria-labelledby` the title; Escape closes; focus stays inside and returns to the opener.

**Do / Don't.** Do frame it as a window. Don't fade or blur.

### Toast

**Anatomy.** Bottom-right stack (bottom, full width under `breakpoint.sm`), `space.16` from the edges. 2px `color.border.strong` frame, `color.surface.raised`, padding `space.12` `space.16`, max 400px; 12px pixel status icon or `size.bullet` in the status colour, message 16/24, optional framed action and a 12px × close.

**States.** Appears and disappears in one frame; auto-hides after 5000ms unless it has an action or is hovered; errors stay until dismissed.

**Keyboard and screen readers.** Announced through the screen's one `role="status"` region (errors `role="alert"`); never steals focus.

**Do / Don't.** Do keep toasts art-free. Don't slide or fade them.

### Empty state

**Anatomy.** Centred in the region it replaces, max 400px: a Vignette (48×48 units at `size.unit`, one object from the app's world + one blinking light, 2px `color.border.control` frame), `space.16`, one sentence 16/28 `color.text.secondary` ("No projects match this search."), `space.16`, one framed button with the marker before its label ("Clear filters"). A first-run empty state may use the gold button when it is the screen's only action.

**States.** Error variant: lights off, one `color.art.beacon` light blinking `motion.duration.beacon`, the sentence names the problem, gold "Retry". Reduced motion: still.

**Do / Don't.** Do keep one sentence and one action. Don't use a stock icon.

## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the theme); never retype values. Night (dark) follows `prefers-color-scheme` unless `[data-theme]` overrides it; design night first.
3. Load the fonts (the links in Pixel type) and set up the root: the three-line motion and shape block from Signature elements, the type base, global `:focus-visible`, `html, body{overflow-x:clip}`, the `.dither` rule under the header.
4. Build the signature elements first, as reusable pieces: `PixelScene` (`sky`, `ridge`, `sprite`, `row`, art classes, the four sizes), `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes and both header switches. Pick the app's world and draw at least 3 prop variants, the focal sprites, ground sprites and icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and update date, e.g. `night-cartridge, updated 2026-01-31`), the tokens, and `components.md`: conventions, the app's world, scenes and sprites by screen, the hue of each category.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays) and wait for approval.
2. Map the tokens onto existing variables; a brand action colour becomes `color.action.primary`; remove radius, soft shadows and transition utilities as you restyle.
3. Build the signature elements, then restyle one representative screen as a sample (header with dither and marker, its scene window, ground strip, one marker list) and wait for review.
4. Continue screen by screen, one commit each. Never add delays, fake loading states or `role="status"` regions the screen did not have. Missing images become sprites; spinners become the ellipsis or a meter; the two header switches are expected.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes. Restyle existing markup; keep native inputs (visually replaced, still the real element).
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen gets the signature elements its context calls for; a screen without the marker, the dither header, a scene and the ground strip is unfinished. New scenes stay in the app's world with a new crop or prop.
- Uncovered needs: compose from tokens, note it in `components.md`; conflicting requests (rounding, gradients, spinners, bold, smooth motion): present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files.
- Under reduced motion every scene, light, meter and label is complete on frame 1 and nothing runs; with motion, lights blink out of sync, travel jumps 4px per step, nothing tweens. Never change code or config to review.
- Each screen at 1440px and 390px, light and dark: no sideways scroll; focal sprite visible at 390px; art never behind text or data; crisp edges. Tab through: the gold ring always visible; one marker per list.
- Type at 1440px: 16px body and 48px display show solid 2px-wide stems; thin or blurry stems mean the wrong face, smoothing left on, or a size off the grid.
- Scenes, each still frame at 1440px: 3 depth layers; no more than half the width bare bands; 6 to 12 props, no variant three times in a row; count the lights: 3 to 8; at 200% every wall and roof has its outline, top-left highlight and bottom-right shade. Ground strip: visibly checkered grass, dotted dirt edge, 2 to 4 sprites each 24 to 48px tall.
- Per screen: one gold button, one scene plus the ground strip, count the four-sided 4px frames (at most 3; figures and newsletter are 2px), no rounding, no bold, only the pixel faces. Card titles flush with their icon; a chip shows marker or bullet, not both; panels in a row end level; no placeholder clipped at 390px.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
