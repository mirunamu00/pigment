# Night Cartridge 0.1.0-rc.4

Design system `night-cartridge@0.1.0-rc.4`. A 16-bit console booted as a product: night-blue ground, cream pixel type for Hangul and Latin, hard-edged game windows, an RPG menu marker and small pixel scenes that move in stepped frames. Suits docs, dev tools and playful products.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

## Character

Night ground, chunky cream pixel type, hard-edged game windows, a gold RPG marker, and one dense pixel diorama per screen that moves in whole-pixel steps.

## The ten rules that define this look

1. **Everything sits on the pixel grid.** `radius.none`; borders 2px or 4px; art is filled rects at an integer scale (`size.unit`, `size.unitHero`), `crispEdges`; every drawn object has a 1-unit `color.art.outline`, one top-left highlight and one bottom-right shade. Why: one soft edge breaks the console.
2. **Quantized night colour.** Ground `color.surface.default`, panels `color.surface.subtle`, windows darker (`color.surface.raised`) inside a light frame; text `color.text.primary`, headings `color.text.strong`; art only from `color.art.*`. Why: free colours break the quantized look.
3. **One pixel typeface, one weight.** `font.family.pixel`, a chunky 16px-grid bitmap face, for Hangul and Latin; smoothing off; weight 400; sizes 12/16/32/48, prose 16/28, UI 16/24, no tracking; emphasis is `color.text.strong`, never bold or italic. Why: the bitmap voice is the costume.
4. **Gold is the player.** `color.action.primary` fills one button per screen, the page content's main commit (with `shadow.hard`); `color.text.accent` is the marker and selection marks; `color.focus.ring` the 4px focus outline. Nothing else is gold: never the header, search or navigation; a screen without a content commit has none. Why: scarce gold leads the eye to the page's action.
5. **Selection is an RPG marker.** A bevelled ▶ (4×7 units at `size.unit`) marks the current item in every menu, list, sidebar, table and settings list; its down/right forms are the disclosure chevrons. Why: a tinted row alone is any app.
6. **Instant, physical response.** Every transition is `motion.duration.instant`; hover swaps to `color.surface.hover`; press moves a control 2px, or 4px into its hard shadow, which disappears. Why: consoles answer on the next frame.
7. **Motion is stepped.** Every animation uses `steps(n)`, n = travel in px ÷ 4; loops only in art, the marker and live-status lights; no entrance, scroll or hover animation; reduced motion and the Animation switch freeze everything on frame 1. Why: tweens read as a parallax gimmick.
8. **One full, living stage per screen.** A hero, a framed banner or a 96px strip at the top and the ground strip at the bottom, each filling its width with 3 depth layers, 6 to 12 solid props and 3 to 8 visible lights; never behind text, data or controls. Why: the scene says where you are.
9. **Game-window chrome.** Major regions are windows (4px `color.border.strong` frame, `color.surface.raised`, optional `size.titleBar` bar); headings sit on a dithered rule; separators are 2px dots; scores, quotas and n-of-m progress are block meters against a real maximum; bare "2 of 6" text is unfinished. Why: frames, not shadows, make depth.
10. **Hue identifies, never decorates.** Each entity kind or category owns one `color.hue.*`: a 4px top bar, a `size.bullet` square, its icon fill; text and backgrounds stay neutral. Why: hues work as labels only while small.

## Never

- Radius, circles, pills; blurred shadows, glows, glass, gradients outside dither and scene bands.
- `ease`, `linear` travel, `cubic-bezier`, springs, fades, slides, hover lift, shimmer, spinners, smooth progress bars, scroll or entrance animation.
- Bold, italic, synthetic weights, `letter-spacing`, `text-transform: uppercase`, sizes outside 12/16/32/48.
- Pure white text or a pure black ground.
- Stroke icon sets, emoji, anti-aliased illustrations, photos or text inside art; art behind text, data or forms, or in list cards; a second gold button, or gold in the header or on search.
- A square moon or sun; a ridge with one repeating period; a background gap between sky and ridge; a flat front wall wider than 12 units.
- A meter with an invented maximum, or directly inside a `dl` group, `ul` or `tr`.
- These subjects: a lone cabin under a moon, a tall single tree motif, a snowy ridge banner, a capped figure with a laptop, a character walking the footer, coins; downloaded animated sprites; one building centred beside the hero's text Window.
- A marker and a hue bullet on the same chip or row; a 32px title inside a panel; a placeholder or label clipped by its control.
- Detecting automation to skip animation, artificial delays before data, or content hidden until a script runs.
- Clipping overflow on `html` or `body`; clip the piece that overflows (`.stage`, `.ground`, a table wrapper).

## Signature elements

Build these first, as reusable pieces, then the components. Once, at the app root:

```css
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
:root[data-motion="off"] *,:root[data-motion="off"] *::before,:root[data-motion="off"] *::after{animation:none!important}
*,*::before,*::after{transition:none!important;border-radius:0!important}
```

### Pixel stage

**What.** An integer-scale pixel diorama. Placements:
- **Hero**: 480×128 units at `size.unitHero` (1920×`size.hero`), full-bleed, a Window over its left third (below the scene under `breakpoint.lg`, height `size.heroSm`).
- **Banner**: 720×128 units at `size.unit` (1440×`size.banner`) in a Window, title block (h1, lede, meta) below the art.
- **Strip**: 720×48 units at `size.unit` (`size.bannerSm` high), same Window and title block; for product screens.
- **Vignette**: 48×48 units at `size.unit` (`size.vignette` square), 2px `color.border.control` frame; empty and error states.
- **Figure**: an inline prose scene sized to its 2px-framed box: sky, ridge and ground fill it, the subject spans half its width or more, no flat fill over 40%.
- **Ground strip**: the footer's top edge on every screen (CSS below).

**Recipe.**
1. One world per app, from its domain: dashboard = server yard (racks with LEDs, dish, crates); store = market street (shopfronts, striped stalls, crates, lamps); blog = post-office street (multi-storey buildings with window grids, mailboxes, parcel carts); settings = workshop yard (workbenches, switch panels, cable reels). Screens differ by crop, a prop or which lights are on.
2. 1 unit = 1 viewBox unit, integers only; `width`/`height` = units × pixel unit; never stretch, wider viewports crop. Focal sprite inside the central 180 units (hero: 90).
3. Three layers fill the width. **Back**: `color.art.sky1`…`sky6` bands (strip: sky5, sky6), checkered joins, down to the far ridge's lowest top + 2 (`sky()`, `lowest()`): no background between sky and ridge. Sky at most 40%: far tops at 28 to 36% of the height (y 36 to 46 at 128 units, 14 to 18 in a strip). Optional: 1 to 3 clouds (`color.art.glint`, `color.art.far` underside), a round `moon()`. **Middle**: the `color.art.far` ridge from `tops()`, a new seed per scene (never the demo's seed, numbers or detail list, never one repeating period), top checkered by `edge()`; then a `row()` of 6 to 12 props: 3+ variants, gaps 4 to 24 units, no variant three times running. Props at least 4 units wide, 16 to 32 tall in a banner (hero 12 to 32); in a strip 12 to 20 tall, at most twice as wide as tall, half taller than wide. 1-unit poles, cables and antennas are details, not props. **Front**: `color.art.near` ground in the bottom 12 to 16% (y 108 to 112; strip 42 to 44) via `edge()`, the focal group (2 or 3 sprites, never one lone building) 24 to 40 units tall (strip 16 to 24), and 1 or 2 near props.
4. Objects per rule 1: each sprite a `<g>` with `--base` from `color.hue.*` or `color.art.far/near`; `.base`, `.hi` top and left, `.shade` bottom and right, a 1-unit `.ol` outline; no other tones, no random speckle. Walls wider than 12 units carry a window grid, a framed door, a sign, siding every 4 units or a trim, never one flat field with two windows. A shopfront has a door, a lit window and an awning or sign above its roofline.
5. Lights: 3 to 8, each at least 2×2 units, `color.art.lightWarm` or `lightCold`, at least 3 on props: lit windows and signs (steady), LEDs, lamps, monitors (`light()`). Stars do not count. A `beacon` only on error screens.
6. **Detail pass, by hand.** The helpers make only the skeleton. Then type a `dot()` list entry by entry (a pixel or a 2 to 6-unit run), placed while looking at the render, never by loop or `rng()`: hero 120+, banner 60+, strip or figure 30+, vignette 15+. Kinds, all present: 12+ stars in the top two bands (strip 6) at three levels (`.star-dim`, `.star`, a `.star` with 4 `.star-dim` arms); lit window pixels (`.warm`, `.cold`, steady) and sign glyphs; texture runs on walls, roofs and ground (siding, shingles, bricks, cracks, tufts); `.hi` and `.shade` units on prop edges; 1 to 3 bits of life (a bird, smoke, a cat, laundry). Each prop gets 3+ entries; repeated variants differ by 4+ units (lit windows, a sign, a crack): no two props match.
7. **Review by eye, two rounds or more.** Render the scene alone at 2× its page size or more (a temporary page or the component on a blank screen, `image-rendering:pixelated`) and look. List three concrete differences from this recipe and the step 6 counts ("third shop has a flat roof", "41 of 60 entries"), fix them, look again. Then in place at 1440px and 390px: props cover a third of the lower half; no bare stretch over a quarter of the width; 3+ lit points on props; at 200% no flat wall or roof.

```js
const R=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${c}"/>`;
// Checker pattern of class c.
const dither=(c)=>`<pattern id="d-${c}" width="2" height="2" patternUnits="userSpaceOnUse">${R(0,0,1,1,c)}${R(1,1,1,1,c)}</pattern>`;
// Bands from y 0 to `bottom`, joins checkered.
const sky=(w,bottom,bands)=>{const bh=Math.ceil(bottom/bands.length);return bands.map((c,i)=>R(0,i*bh,w,bh,c)+(i?`<rect x="0" y="${i*bh}" width="${w}" height="2" fill="url(#d-${bands[i-1]})"/>`:"")).join("");};
// Seeded random, seed 1 to 2147483646.
const rng=(s)=>()=>(s=s*16807%2147483647)/2147483647;
// Irregular skyline, [run, top] pairs: runs 4 to 16, steps 2 to 8, tops in lo..hi.
function tops(w,lo,hi,r){const t=[];let y=Math.round((lo+hi)/2);for(let x=0;x<w;){const run=4+Math.floor(r()*13);y=Math.min(hi,Math.max(lo,y+(r()<.5?-1:1)*(2+Math.floor(r()*7))));t.push([run,y]);x+=run;}return t;}
const lowest=(t)=>Math.max(...t.map(([,y])=>y));
const ridge=(w,h,t,c)=>{let x=0,d=`M0 ${h}`;for(const[run,y]of t)d+=`V${y}H${Math.min(x+=run,w)}`;return `<path class="${c}" d="${d}V${h}Z"/>`;};
// Silhouette with its top 2 units checkered with pattern p.
const edge=(w,h,t,c,p)=>ridge(w,h,t,c)+`<g fill="url(#d-${p})">${ridge(w,h,t,"")}</g>`+ridge(w,h,t.map(([run,y])=>[run,y+2]),c);
// Stepped round disc, one rect per row.
const disc=(cx,cy,r,c)=>{let s="";for(let dy=-r;dy<r;dy++){const h=Math.round(Math.sqrt(r*r-(dy+.5)**2));s+=R(cx-h,cy+dy,2*h,1,c);}return s;};
// Moon or sun: 10-unit disc, two craters, checkered ring halo (needs d-glint).
const moon=(cx,cy)=>disc(cx,cy,7,"halo")+disc(cx,cy,5,"glint")+R(cx-2,cy-2,2,2,"far")+R(cx+1,cy+1,1,1,"far");
// Sprite from character rows: "." empty, other characters map to classes.
function sprite(rows,map,x0,y0){let s="";rows.forEach((r,y)=>{for(let x=0;x<r.length;){const c=r[x];let n=1;while(r[x+n]===c)n++;if(c!==".")s+=R(x0+x,y0+y,n,1,map[c]);x+=n;}});return s;}
// Props standing on baseY, uneven gaps.
function row(variants,baseY,w,gaps=[6,14,9,22,11,4,17]){let s="",x=8,i=0,a=-1,b=-1;while(x<w-8){let k=(i*5+2)%variants.length;if(k===a&&k===b)k=(k+1)%variants.length;const v=variants[k];s+=`<g style="--base:${v.base}">${sprite(v.rows,v.map,x,baseY-v.rows.length)}</g>`;b=a;a=k;x+=v.rows[0].length+gaps[i++%gaps.length];}return s;}
// A blinking 2x2-unit light.
const light=(x,y,c,o=0)=>`<rect x="${x}" y="${y}" width="2" height="2" class="${c} blink" style="--o:${o}ms"/>`;
// Detail pass (step 6): [x, y, class, run=1], typed by hand, drawn last.
const dot=(l)=>l.map(([x,y,c,w=1])=>R(x,y,w,1,c)).join("");
const detail=dot([[131,4,"star"],[377,9,"star-dim"],[208,6,"star"],[207,6,"star-dim"],[209,6,"star-dim"],[208,5,"star-dim"],[208,7,"star-dim"], // stars, one bright
  [10,97,"cold"],[11,93,"ol",3],[10,99,"shade",2],[14,99,"shade",2],[10,102,"shade"],[11,103,"shade"], // window pixel, sign glyph, siding, crack
  [9,94,"glint"],[16,106,"ol"],[96,20,"ol"],[97,19,"ol"],[98,20,"ol"]]); // edge units, a bird
// Demo only, never ship: a 10x16 kiosk with two lit windows.
const kiosk={base:"var(--color-hue-amber)",rows:["oooooooooo","ohhhhhhhso","oooooooooo","ohbbbbbbso","ohwwbbwwso","ohwwbbwwso","ohbbbbbbso","ohbbbbbbso","ohbboobbso","ohbboobbso","ohbboobbso","ohbboobbso","ohbboobbso","ohbbbbbbso","osssssssso","oooooooooo"],map:{o:"ol",w:"warm",b:"base",h:"hi",s:"shade"}};
const bands=["sky-1","sky-2","sky-3","sky-4","sky-5","sky-6"], r=rng(4271), far=tops(720,36,46,r), near=tops(720,108,112,r);
const svg=`<svg class="scene" viewBox="0 0 720 128" width="1440" height="256" aria-hidden="true"><defs>${[...bands,"glint","far"].map(dither).join("")}</defs>${sky(720,lowest(far)+2,bands)}${moon(540,18)}${edge(720,128,far,"far","sky-6")}${row([kiosk/* plus 2+ more variants, 16 to 32 tall */],108,720)}${edge(720,128,near,"near","far")}${detail}</svg>`;
```

```css
.stage{position:relative;overflow:hidden;height:var(--size-banner);background:var(--color-art-sky1)}
.stage--hero{height:var(--size-hero);max-width:1920px;margin-inline:auto}.stage--strip{height:var(--size-banner-sm)}
.stage>.scene{position:absolute;left:50%;bottom:0;translate:-50% 0;max-width:none;shape-rendering:crispEdges;pointer-events:none}
.sky-1{fill:var(--color-art-sky1)}.sky-2{fill:var(--color-art-sky2)}.sky-3{fill:var(--color-art-sky3)}.sky-4{fill:var(--color-art-sky4)}.sky-5{fill:var(--color-art-sky5)}.sky-6{fill:var(--color-art-sky6)}
.far{fill:var(--color-art-far)}.near{fill:var(--color-art-near)}.ol{fill:var(--color-art-outline)}.base{fill:var(--base)}.hi{fill:color-mix(in srgb,var(--base) 60%,var(--color-art-glint))}.shade{fill:color-mix(in srgb,var(--base) 60%,var(--color-art-outline))}.warm{fill:var(--color-art-light-warm)}.cold{fill:var(--color-art-light-cold)}.star{fill:var(--color-art-star)}.star-dim{fill:color-mix(in srgb,var(--color-art-star) 50%,var(--color-art-sky1))}.beacon{fill:var(--color-art-beacon)}.glint{fill:var(--color-art-glint)}.halo{fill:url(#d-glint)}
.ground{position:relative;overflow-x:clip;height:calc(var(--size-ground) + var(--size-ground-edge));margin-top:calc(var(--space-64) + var(--size-ground-sprite));pointer-events:none;
  background:linear-gradient(90deg,var(--color-art-edge-hi) 2px,transparent 0) 0 calc(100% - 2px)/6px 2px repeat-x,linear-gradient(var(--color-art-edge) 0 0) bottom/100% var(--size-ground-edge) no-repeat,repeating-conic-gradient(var(--color-art-ground-hi) 0 25%,transparent 0 50%) 0 0/8px 8px,var(--color-art-ground)}
.ground>svg{position:absolute;bottom:100%;left:50%;translate:-50% 0;width:1440px;max-width:none;height:var(--size-ground-sprite);shape-rendering:crispEdges}
```

Ground strip (CSS above): grass, dirt edge and a 720×24-unit svg (`size.groundSprite` high, cropped like scenes) with 2 to 4 sprites from the app's world on its top edge: one 20 to 24 units tall (40 to 48px), the others 14 to 24; each at least 6 units wide (a pole is not a sprite); each in a different quarter, at least 120 units apart, one inside the central 180.

**Motion.** Every scene: stars twinkle, lights blink out of sync, one cloud or particle layer drifts, exactly one sprite bobs or swaps 2 frames, one rare event (a shooting light, a bird) every `motion.duration.rare`; at most 2 moving sprites. Reduced motion or Animation off: frame 1, still and complete.

**Where.** Home hero, content banner, product strip, empty and error vignette, prose figure; ground strip everywhere.

**Limits.** One of hero, banner or strip per screen, plus the ground strip, at most one vignette, and figures in prose. Never behind text, controls, charts, tables or fields; never in list cards, rows, toasts or badges.

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

Each light gets its own `--o` (0, −300ms, −700ms…). In SVG `.bob` takes `--bob:-1px` (hero) or `-2px` (banner). A cloud at 2× moving 800px: `--from:-40px; --to:360px; --n:200`.

**Motion.** Triggers: `loop` (art, the blinking marker, live lights) and `state-change`. One-shots: the error nudge (2 frames of `motion.duration.nudge`) and the meter fill. Animation switch: a `.tool` header button (12px pause/play icon + "Animation on"/"off") sets `data-motion="off"` on `<html>`, persisted, default on. Resting styles are frame 1 (lights lit, rare event hidden, meters full).

**Where.** Scenes; a `size.bullet` live light blinking `motion.duration.ledA` only while a job runs; the loading ellipsis; the field nudge.

**Limits.** Never on text, buttons, rows, cards, data or layout.

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

Markup: `<a class="item" aria-current="page"><span class="cur" aria-hidden="true"></span>Overview</a>`. In `.item` rows the marker keeps its slot when hidden, so labels never shift; in cards it hangs in the left padding (`.card-title`).

**Motion.** Instant. The single "you are here" marker of the main navigation may blink (`nc-swap`, `motion.duration.bob`, `motion.easing.frame`); every other marker is still.

**Where.** Current item: nav, sidebar, contents list (the first heading on load), tabs, filters, selected chip, settings sections. Card hover/focus preview. Selected table row (16px gutter); sorted headers (up/down); highlighted options; disclosures (right/down); prev/next; a trailing ▶ (`currentColor`, no bevel) on forward actions.

**Limits.** One visible marker per list or menu, never decorative on headings. Press offsets 2px or 4px, nothing else moves.

### Game-window chrome

**What.** Windows, dithered rules, dotted separators, hue bars and bullets, block meters, callouts.

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

Block meter: `<div class="meter" role="meter" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="Quota">` with 10 to 20 `<i>` (`style="--i:n"`), filled = round(value ÷ max × blocks); value in 48px numerals above. Counts (n of m, m ≤ 20) get one block per item and the count "2 of 6" 12/18 above. A meter needs a real limit, target or count (quota, n of m, % of 100): never invent a maximum; a lower-is-better metric without a target shows only its delta. In a `dl` the meter goes inside the `dd` (`<div><dt>Tasks</dt><dd><span>2 of 6 complete</span><span class="meter" role="meter" aria-valuenow="2" aria-valuemin="0" aria-valuemax="6" aria-label="Tasks complete">…</span></dd></div>`; `dl` groups hold only `dt` and `dd`), in a table inside the `td`, in a list inside the `li`; use `span`s where only phrasing content is allowed. Hues: assign `--hue` per category or entity kind in a fixed order (cyan, violet, blue, amber, green, pink, orange, teal) so a thing keeps its hue on every screen.

**Motion.** Static; meters fill one block per `motion.duration.meterStep` when they render.

**Where.** Windows: scene windows, code blocks (title bar: language label + framed copy button), dialogs, settings groups, the danger zone (`color.status.danger` frame). Dither under the header and h2s; dots between list items; hue bars on cards and KPI tiles.

**Limits.** Four-sided 4px frames on at most 3 regions per screen (scene window, code or dialog, one group). Inline figures take a 2px `color.border.control` frame; a footer newsletter is a 2px-framed `color.surface.subtle` panel; cards are `color.surface.subtle` with a hue bar.

### Pixel type for Hangul and Latin

**What.** One bitmap face for Hangul and Latin, `pixelMono` for code; the Pixel body switch swaps long reading text to `font.family.readable` (code `readableMono`).

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

`font.family.pixel` (NeoDunggeunmo) and `pixelMono` (NeoDunggeunmo Code), both OFL, sit on a 16px grid: 16, 32 and 48 give solid 2px stems; 12 is for meta only.

**Motion.** Static.

**Where.** Everything. The Pixel body switch (`.tool`, 12px "A" icon + "Pixel body on"/"off", `data-body` on `<html>`, persisted) sits in the header of screens with long prose or dense tables; headings, nav, buttons and numerals stay pixel.

**Limits.** No bold, italic, tracking or sizes between steps.

## Color use

- Surfaces: ground → `subtle` (cards, sidebar, title bars) → `hover`; windows, inputs and code go darker to `raised` inside a frame.
- Text: `strong` headings, values, current items; `primary` body and cells; `secondary` meta, hints, resting nav, placeholders. Links `color.text.link`, 2px `color.border.control` underline at 4px offset.
- Status colours on callout bars, errors, bullets, meters, danger buttons, never behind text; code `color.syntax.*`; hues under 6% of the screen.

## Typography

Hero h1 and display numerals (KPIs, detail prices): `display`/`display`, strong. Page h1, h2, feature-grid card titles: `title`/`title`, strong. h3, card titles, table heads, labels, buttons, nav: `body`/`ui`, strong or primary. Prose: `body`/`prose`, max `size.prose`, primary. Meta, dates, helper and error text, counts, kbd: `caption`/`caption`, secondary.

One h1 per screen. Dates `YYYY.MM.DD`; meta joined with " · "; no exclamation marks or emoji.

## Spacing and density

- Base unit 4px, only `space.*`. Sections `space.64` apart (`space.40` under `breakpoint.sm`); content starts `space.40` under the header.
- Window and card padding `space.16`–`space.20`; banner title block `space.24`; an h2 sits `space.48`–`space.64` below a window or panel. Rows `size.row` (`size.touch` under coarse pointers).
- Forms: fields `space.20` apart, label to control `space.8`, helper `space.4`, actions `space.32` below.
- Dense screens shed art, never type size.

## Shape and depth

- `radius.none` on everything, avatars and images included. Borders: 2px controls and rules, 4px windows and hue or status bars. Depth is a frame around a darker interior; `shadow.hard` only on the gold button and dialogs.

## Motion

UI states are `motion.duration.instant`; overlays, menus, tabs and disclosures appear in one frame. Loading is the ellipsis (only while a real request is pending) or a block meter; skeletons are static `color.surface.hover` blocks.

```css
.ellipsis{display:inline-block;width:3ch;overflow:hidden;vertical-align:bottom;white-space:nowrap}
.ellipsis::before{content:"..."}
.is-loading .ellipsis{animation:nc-dots var(--motion-duration-dots) var(--motion-easing-dots) infinite}
@keyframes nc-dots{from{width:1ch}to{width:3ch}}
```

## Interaction

All instant (`motion.duration.instant`). Focus-visible: the 4px `color.focus.ring` outline at 3px (rows, menu items, summaries: −4px).

- **Hover**: buttons, linked cards, rows, nav items, options and tabs take `color.surface.hover` + `color.text.strong`; the gold button stays unchanged; links turn text and underline `color.text.strong`; inputs and selects turn their frame `color.border.strong`.
- **Press**: gold `translate: 4px 4px` into its shadow (`shadow.none`); other buttons and cards 2px. Current or highlighted items show the marker. Error: `color.status.danger` frame + nudge.
- **Disclosures** (`<details>`, `color.surface.subtle`, 4px `color.border.control` left bar, right marker): hover `color.surface.hover`, bar `color.hue.cyan`; open: down marker.

## Layout adaptation

- Container max `size.container`, side padding `space.24` (`space.16` under `breakpoint.sm`); 12 columns, gap `space.16`, from `breakpoint.lg`; 1 column under `breakpoint.sm`.
- Shells: `size.sidebar` sidebar, content, optional `size.toc` contents list; the sidebar panel runs from header to ground strip (`min-height:100%`). Under `breakpoint.lg` the sidebar becomes a top menu, the contents list a disclosure.
- Card grids `repeat(auto-fit, minmax(200px, 1fr))`, gap `space.16`; KPI tiles 4 → 2 → 1 columns.
- Side-by-side panels share a height by sizing content (a chart grows into its panel; a short window aligns to the top and the next block fills the column), never by stretching an empty window; no interior over `space.64` empty. Forms max `size.form`, buttons full width under `breakpoint.sm`.

## Applying the concept

Dense screens get less, never nothing: every screen has the header dither, the marker, the ground strip and one scene.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing or home | Hero (a street or yard of several props) with a Window: eyebrow, 48px h1, lede, button, meta; hue card grid | Full |
| Article, product detail, about | Banner Window with title block (hue bullet + category, h1, lede, meta); dither h2s; code windows; callouts; contents list; Figure scenes; ◀ ▶ prev/next | Strong |
| Card grid | Subtle cards, hue bar, 24px hue icon; missing images → sprites | One bar per card |
| Store grid and cart | Strip (market street: upright shopfronts with doors, lit windows, awnings); filter chips with hue bullets; totals in a Window; framed ◀ ▶ steppers | Strip + chrome |
| Dashboard | Strip (server yard, racks with LEDs); KPI tiles per Card; each panel group under its own 32/40 h2 on the dither rule, outside the panels; bar chart filling its panel; gold only for a content commit | Strip, meters |
| Data table | No art; Table component: marker gutter, sort markers, status bullets | Marker only |
| Form | Window around the form; gold submit; nudge on error; steps as a meter | Chrome |
| Settings | Strip (workshop, lit lamp and monitor); section list as a marker menu in a full-height sidebar; groups as Windows with title bars; danger zone in a `color.status.danger` frame | Strip + menu |
| Empty state | Vignette (one object, one blinking light), one sentence, a framed button with the marker | Strong |
| Error, not found | Vignette or banner, lights off, one beacon; a Window with the message; gold "Retry" | Strong |
| Loading | Ellipsis in the pending control, a meter, or static skeletons; the scene stays | One loop |

## Imagery and icons

- Icons: fill-only, `currentColor`, 24px on a 12×12-unit grid (`size.icon`) or 12px on 6×6 (`size.iconSm`), drawn with `sprite()`. Category icons take their hue; UI icons `color.text.secondary`.
- Avatars: an 8×8-unit mirrored sprite hashed from the name, 4px units on `color.surface.hover`, 40px in lists, 80px on a profile.
- Missing images: the item as a sprite on `color.surface.raised` in a 2px frame, never a grey box.
- Charts: flat square bars in hues, 2px dotted gridlines or none, square legend bullets, 12px axes; lines `step-after`, 2px, square points.

## Accessibility

- Text 4.5:1 or more (body 7:1); control frames 3:1; the focus ring never removed; targets `size.touch` under coarse pointers.
- Art and markers `aria-hidden="true"`, nothing meaningful only in the art; state lives in `aria-current`, `aria-selected`, `aria-pressed`; meters `role="meter"`.
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

**Anatomy.** Label 16/24 pixel; optional 24px pixel icon before it (gap `space.8`); forward actions end with a trailing ▶ (`.cur`, no bevel, `currentColor`). Heights: `size.controlLg` (hero, gold), `size.control` (default), `size.controlSm` (copy, row actions, padding `space.8`). Padding `space.20` (gold), `space.12` (others). Icon-only: square.

**Variants.**
- Gold, the one main commit in the page content (never header or search; no commit, no gold): `color.action.primary` fill, `color.text.onAction`, 2px `color.action.primaryEdge` border, `shadow.hard`.
- Framed, every other action: transparent, 2px `color.border.control`, `color.text.primary`; optional kbd chip (2px `color.border.default`, 12px).
- Tool, header switches and icon actions: `.tool` in Navigation; label + state word ("Animation on").
- Danger, destructive actions confirmed in a dialog: transparent, 2px `color.status.danger` border and text.

**States.** Hover: gold unchanged; others `color.surface.hover` and `color.text.strong`. Active: gold moves 4px and loses `shadow.hard`; others move 2px. Focus-visible: 4px `color.focus.ring`, offset 3px. Disabled: `color.surface.hover`, `color.text.disabled`, `color.border.default`, no shadow or press. Loading (real request only): gerund + `.ellipsis`, width held, `aria-busy`.

**Accessibility.** Native `<button>`; icons and markers `aria-hidden`; icon-only buttons `aria-label`; toggles `aria-pressed`.

### Text field

**Anatomy.** Label above (16/24, `color.text.strong`), `space.8`; control `size.control` high, `color.surface.raised` fill, 2px `color.border.control` frame, padding 0 `space.12`, 16px pixel text, placeholder `color.text.secondary`; helper 12/18 `color.text.secondary`, `space.4` below. Textarea: min 4 rows, padding `space.12`. Search: 24px pixel magnifier inside at `space.8`, text from `space.40`, kbd hint at the right (hidden under `breakpoint.sm`).

**States.** Hover: frame `color.border.strong`. Focus: the ring, frame unchanged. Disabled: `color.surface.subtle` fill, `color.border.default` frame, `color.text.disabled`. Read-only: `color.surface.subtle`. Error: frame `color.status.danger`, `.nudge` once on submit; the message (12px pixel warning icon + text in `color.status.danger`) replaces the helper, `aria-invalid`, `aria-describedby`; a failed submit focuses the first invalid field. Loading (async check): `.ellipsis` at the right.

**Accessibility.** Visible `<label for>`; "required" in words, not only a symbol.

### Select

**Anatomy.** The text field's box, label, helper and error; `appearance:none`; a down marker (`.cur--d`, `color.text.secondary`) at `space.12` from the right. Prefer native `<select>`. A custom list opens as a Window directly below (2px `color.border.strong` frame, `color.surface.raised`, no shadow), options as marker items (`size.row`), 8 visible, then scroll.

**States.** Hover: frame `color.border.strong`. Focus-visible: ring. Open: down marker swaps to up; the list appears in one frame with the selected option (or the first) already highlighted. Highlighted option: `color.surface.hover` + marker. Selected option: `color.text.strong`, `aria-selected`. Disabled and error: as text field.

**Accessibility.** Custom: `role="combobox"` + `listbox`/`option`, `aria-activedescendant`; arrows move the marker, Enter selects, Escape closes.

### Checkbox and radio

**Anatomy.** Checkbox: 16px square, 2px `color.border.control` frame, `color.surface.raised` fill; checked shows a pixel check drawn with `sprite()` (6×5 units at `size.unit`: rows `.....x`, `....xx`, `x..xx.`, `xxxx..`, `.xx...`) in `color.text.accent`. Indeterminate: an 8×4px bar in `color.text.accent`. Radio: the same square; selected shows an 8px square in `color.text.accent`, never a circle. Label 16/24 at `space.8`.

**States.** Hover: frame `color.border.strong`. Focus-visible: ring around the box, offset 3px. Checked: mark appears in one frame. Disabled: `color.border.default`, mark and label `color.text.disabled`. Error: frame `color.status.danger`, message under the group.

**Accessibility.** Native inputs, visually replaced; `<fieldset>` + `<legend>` for groups.

### Switch

**Anatomy.** Track 32×16px, 2px `color.border.control` frame, `color.surface.raised`; an 8×8px square thumb, `color.text.secondary` at the left when off, at the right in `color.text.accent` on a `color.surface.hover` track when on; a 12px state word follows. The whole row is the target, at least `size.touch`.

**States.** Hover: frame `color.border.strong`. Focus-visible: ring around the track. Selected: one-frame jump, no slide. Disabled: `color.border.default`, thumb `color.text.disabled`. Loading (saved remotely): the state word becomes `.ellipsis`.

**Accessibility.** `<button role="switch" aria-checked>` or a checkbox with `role="switch"`; the label names the setting.

### Tabs

**Anatomy.** A row of tabs on a 2px `color.border.strong` baseline that joins the panel. Tab: `size.control` high, padding 0 `space.12`, 16/24, marker slot before the label. Selected: 2px `color.border.strong` frame on top and sides, panel-coloured bottom covering the baseline, `color.text.strong`, marker visible. Unselected: `color.text.secondary`.

**States.** Hover: `color.surface.hover`, `color.text.primary`. Focus-visible: ring, offset −4px. Selected: as above; the panel swaps in one frame. Disabled: `color.text.disabled`, no hover.

**Accessibility.** `role="tablist"`/`tab`/`tabpanel`, roving tabindex, arrows, Home/End, `aria-selected`.

### Navigation

**Header.** Sticky, `size.header` on `color.surface.default`, a 4px `.dither` rule below. Left: a 24px original pixel mark + product name 16/24 `color.text.strong`; then 3 to 5 nav items (`.item`, marker before the current one, `aria-current="page"`). Right: search as a framed button with a kbd hint (never gold, even as the screen's only submit), then the Animation and Pixel body switches as `.tool` text buttons, never tint-filled or framed:

```css
.tool{display:inline-flex;align-items:center;gap:var(--space-8);height:var(--size-control);padding-inline:var(--space-8);background:transparent;border:0;color:var(--color-text-secondary)}
.tool:hover{background:var(--color-surface-hover);color:var(--color-text-primary)}
```

Dropdowns (user menu, sort) are marker menus: a Window under the trigger, options as `.item`. On open, in the same frame, focus moves to the current (or first) option, highlighted with marker, `color.surface.hover` and `color.text.strong`; arrows move both; Escape closes and refocuses the trigger. Search placeholders fit: one word ("Search") or the icon only under `breakpoint.sm`. Under `breakpoint.lg`: mark, search icon, menu button opening a marker-menu Window.

**Sidebar.** `size.sidebar`, `color.surface.subtle`, 2px `color.border.default` right edge. Group titles 12/18 `color.text.secondary`; items are `.item` with a 24px hue icon or a `size.bullet` hue bullet, label, count right in `color.text.secondary`; `.sep-dots` between items; the current item `color.surface.hover` + marker. Collapsible groups use right/down markers.

**Contents list.** 2px `color.border.default` left rule, items 16/24, nested items indented `space.16`, marker on the current heading. One item is always current: on load the first heading (`aria-current="location"`), then the heading under the header as the reader scrolls.

**Breadcrumbs, prev/next, pagination.** Breadcrumbs `color.text.secondary` with " / ", hover `color.text.strong` underlined. Prev/next: two columns, 2px `color.border.strong` top rule, ◀/▶ + 12px label, title 16/24. Pagination: ◀ 1 2 3 ▶ `size.control` squares, current page framed 2px `color.border.strong`, `aria-current`.

**Accessibility.** `<nav aria-label>`; the menu button has `aria-expanded`; the mobile menu traps focus until closed.

### Card

**Anatomy.** `color.surface.subtle`, no side or bottom border, a 4px `color.hue.*` top bar for its category or entity kind (neutral cards: a 2px `color.border.default` top rule), padding `space.16` `space.20`. Order: 24px pixel icon in the hue, title (16/24; 32/40 in feature grids) flush with icon and meta, its marker in the left padding (`.card-title`), one-line description `color.text.secondary`, meta 12/18. Panel: a `size.bullet` + 12/18 caption, never a 32px title (the group's 32/40 h2 sits outside, on the dither rule). KPI tile: label row (`size.bullet` + 12px label), 48px numeral `color.text.strong`, delta 12px in a status colour with an up/down marker, a block meter only against a real maximum. Product card: framed image area (photo, or the item's sprite on `color.surface.raised`), name, price 16/24 `color.text.strong`.

**States.** Hover (linked): `color.surface.hover`, marker beside the title. Focus-visible: ring, offset 3px. Active: `translate: 2px 2px`. Selected (plan, option): marker visible, 2px `color.text.accent` frame. Loading: static `color.surface.hover` blocks. Error: a callout with a 4px `color.status.danger` bar inside.

**Accessibility.** The whole card is one link (the title link stretched); secondary actions are separate buttons.

### Table

**Anatomy.** Head row on `color.surface.subtle`, 16/24 `color.text.strong`, 2px `color.border.strong` rule under it; body rows `size.row`, 2px `color.border.default` rules, no zebra, no vertical rules; cell padding 0 `space.12`; a 16px leading gutter for the marker. Numbers right-aligned in pixel numerals. Status cells: `size.bullet` in the status colour + word. Row actions: `size.controlSm` framed buttons, right. Under `breakpoint.sm` it scrolls in its wrapper or rows stack as label/value cards. A meter goes inside its `td`.

**States.** Hover: row `color.surface.hover`. Focus-visible (interactive rows): ring, offset −4px. Selected: marker in the gutter, `color.text.strong`, `aria-selected`. Sorted header: up/down marker after the label, `aria-sort`. Loading: 5 rows of flat static `color.surface.hover` blocks. Error: a danger callout above with Retry. Empty: the empty state replaces the body.

**Accessibility.** Real `<table>`, `<th scope>`, sort buttons inside headers.

### Badge

**Anatomy.** Status or category chip: `size.bullet` square in the hue or status colour + label 16/24 (12/18 when dense) in `color.text.primary`, padding 0 `space.8`, no fill. Count badge: 20px-high box, `color.surface.hover`, 12px `color.text.strong`, padding 0 `space.4`. Filter chip: the chip as a toggle button, 2px `color.border.default` frame, `size.control` high. Tag: plain `#tag` in `color.text.secondary`.

**States.** Filter chip hover `color.surface.hover`; selected (`aria-pressed="true"`) `color.surface.hover`, `color.text.strong`, the marker in place of the bullet (same slot; never both); focus ring.

### Dialog

**Anatomy.** Native `<dialog>` or `role="dialog"`. A Window: 4px `color.border.strong` frame, `color.surface.raised`, `shadow.hard`, width min(`size.dialog`, 100% − `space.32`). Title bar `size.titleBar` with the title 16/24 `color.text.strong` and a framed close button (12px pixel ×). Body padding `space.20`, 16/28. Actions right, gap `space.12`: framed Cancel, then the gold confirm (the screen's gold moves into the dialog); destructive confirms use the danger button. Scrim `color.surface.overlay`, no blur.

**States.** Opens and closes in one frame. Focus moves to the first field or the confirm; focus-visible ring. Loading: confirm shows the gerund + `.ellipsis`, `aria-busy`. Error: a danger callout above the actions.

**Accessibility.** `aria-labelledby` the title; Escape closes; focus stays inside and returns to the opener.

### Toast

**Anatomy.** Bottom-right stack, `space.16` from the edges (full width under `breakpoint.sm`). 2px `color.border.strong` frame, `color.surface.raised`, padding `space.12` `space.16`, max 400px; 12px pixel status icon or `size.bullet` in the status colour, message 16/24, optional framed action and a 12px × close.

**States.** Appears and disappears in one frame; auto-hides after 5000ms unless it has an action or is hovered; errors stay until dismissed.

**Accessibility.** Announced through the screen's one `role="status"` region (errors `role="alert"`); never steals focus.

### Empty state

**Anatomy.** Centred in the region it replaces, max 400px: a Vignette (48×48 units at `size.unit`, one object from the app's world + one blinking light, 2px `color.border.control` frame), `space.16`, one sentence 16/28 `color.text.secondary`, `space.16`, one framed button with the marker before its label. A first-run empty state may use the gold button when it is the screen's only action.

**States.** Error variant: lights off, one `color.art.beacon` light blinking `motion.duration.beacon`, the sentence names the problem, gold "Retry". Reduced motion: still.

## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); never retype values. Night follows `prefers-color-scheme` unless `[data-theme]` overrides it; design night first.
3. Load the fonts (the links in Pixel type) and set up the root: the three-line motion and shape block from Signature elements, the type base, global `:focus-visible`, the `.dither` rule under the header.
4. Build the signature elements first, as reusable pieces: `PixelScene` (`sky`, `tops`, `ridge`, `edge`, `sprite`, `row`, `moon`, `dot`, art classes, the placements; per-scene detail lists), `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes and both header switches. Pick the app's world; draw 3+ prop variants, focal and ground sprites and icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and update date, e.g. `night-cartridge, updated 2026-01-31`), the tokens, and `components.md`: the app's world, scenes by screen, the hue of each category.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays) and wait for approval.
2. Map the tokens onto existing variables; a brand action colour becomes `color.action.primary`; remove radius, soft shadows and transition utilities as you restyle.
3. Build the signature elements, then restyle one screen as a sample (header with dither and marker, scene window, ground strip, a marker list) and wait for review.
4. Continue screen by screen, one commit each. Never add delays, fake loading states or `role="status"` regions.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes. Keep native inputs (visually replaced).
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen follows Applying the concept; new scenes stay in the app's world with a new crop, prop and skyline seed.
- Uncovered needs: compose from tokens and note it in `components.md`; for conflicting requests (rounding, gradients, bold, smooth motion) present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files. An axe scan of every screen shows no violations, and no `definition-list`, `list` or `listitem` errors: every meter sits inside its `dd`, `li` or `td`.
- Reduced motion: every scene, meter and label complete on frame 1, nothing runs; with motion, lights blink out of sync, travel jumps 4px per step. Never change app code or config to pass a check.
- Each screen at 1440px and 390px, light and dark: no sideways scroll; focal sprite visible at 390px; crisp edges. Tab through: the gold ring always visible; one marker per list.
- Type at 1440px: 16px and 48px show solid 2px stems.
- Scenes: each passed two Pixel stage step 7 rounds or more and meets the step 6 counts (hero 120, banner 60, strip 30 hand-placed entries, every kind); report each scene's count and the differences fixed. Each still frame at 1440px: steps 3 and 4 (no gap between sky and ridge, a ridge generated for this scene, detailed walls, a round moon if any) and the ground-strip rule (one sprite 40 to 48px); inline figures fill their frame.
- Per screen: at most one gold button, in the page content (never header or search); one scene plus the ground strip; at most 3 four-sided 4px frames; no rounding, no bold. Card titles flush with their icon; a chip shows marker or bullet, not both; every "n of m" count has a block meter, no meter an invented maximum; the contents list shows a marker on load; panels in a row end level; the sidebar reaches the ground strip; an h2 at least `space.40` below a window; no placeholder clipped at 390px.
- Dashboard: each panel group (KPIs, chart, activity, table) has its own 32/40 h2 on the dither rule outside it, never only a 12px caption.
- Open each dropdown and custom select: the current or first option shows the marker and `color.surface.hover` at once, before any pointer or arrow key.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
