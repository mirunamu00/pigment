# Night Cartridge 1.2.0-rc.5

Design system `night-cartridge@1.2.0-rc.5`. A 16-bit console booted as a product: night-blue ground, cream pixel type for Hangul and Latin, hard-edged game windows, an RPG menu marker and small pixel scenes that move in stepped frames. Suits docs, dev tools and playful products.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

## Character

A console's night screen: one dense pixel diorama per screen, quiet game windows around it, gold only for the player.

## The ten rules that define this look

1. **Everything sits on the pixel grid.** `radius.none`; borders 2px or 4px; art: filled rects at integer scale, `crispEdges`, each object with a 1-unit `color.art.outline`, a top-left highlight, a bottom-right shade. Why: one soft edge breaks the console.
2. **Quantized night colour.** Ground `color.surface.default`, panels `color.surface.subtle`, windows `color.surface.raised` inside a light frame; text `color.text.primary`, headings `color.text.strong`; art only from `color.art.*`. Why: free colours break the palette.
3. **One pixel typeface, one weight.** `font.family.pixel` (16px-grid bitmap), smoothing off, weight 400, sizes 12/16/32/48; emphasis is `color.text.strong`. Why: the bitmap voice is the costume.
4. **Gold is the player.** `color.action.primary` fills one button per screen, the page content's main commit (with `shadow.hard`); `color.text.accent` is the marker and selection marks; `color.focus.ring` the 4px focus outline. Nothing else is gold (never header, search or navigation); no content commit, no gold. Why: scarce gold leads the eye.
5. **Selection is an RPG marker.** A bevelled ▶ marks the current item in every menu, list and table; its down/right forms are the disclosure chevrons. Why: a tinted row alone is any app.
6. **Instant, physical response.** Transitions `motion.duration.instant`; hover `color.surface.hover`; press moves a control 2px, or 4px into its hard shadow, which disappears. Why: consoles answer on the next frame.
7. **Motion is stepped.** `steps(n)`, n = travel in px ÷ 4; loops only in art, the marker and live lights; no entrance, scroll or hover animation; reduced motion and the Animation switch freeze frame 1. Why: tweens read as a gimmick.
8. **One composed, living stage per screen.** A hero, a framed banner or a 96px strip at the top and the ground strip at the bottom: one focal group leads, smaller props cluster across open ground, graded ridges and ground, 3–8 lights. Why: the scene says where you are.
9. **Game-window chrome.** Major regions are 4px-framed windows; headings sit on a dithered rule; separators are 2px dots; scores, quotas and every n-of-m count (Showing n of m) are block meters against a real maximum. Why: frames, not shadows, make depth.
10. **Hue identifies, never decorates.** Each entity kind or category owns one `color.hue.*`: a 4px top bar, a `size.bullet` square, its icon fill; text and backgrounds stay neutral. Why: hues work as labels only while small.

The report (Verification) opens with the sprite and variant tables, computed from code; a missing part fails it.

## Never

- Radius, circles, pills; blurred shadows, glows, glass, gradients outside dither and scene bands.
- `ease`, `linear` travel, `cubic-bezier`, springs, fades, slides, hover lift, shimmer, spinners, smooth progress bars, scroll or entrance animation.
- Bold, italic, synthetic weights, `letter-spacing`, `text-transform:uppercase`, sizes outside 12/16/32/48.
- Pure white text or a pure black ground.
- Stroke icon sets, emoji, anti-aliased art, photos; text in art except a sign's real 3×5 letters (never letter-like marks); art behind text, data or forms, or in list cards.
- A square moon; a ridge with one repeating period; a background gap between sky and ridge.
- A catalogue row (same-height or evenly spaced props); a lead without its subject's features; a sprite in pieces; two identical props in one scene; the same scene on two screens; one flat tone over 25% of a scene's height; full-hue walls; a prop under the hero Window.
- These subjects: a lone cabin under a moon, a tall single tree motif, a snowy ridge banner, a capped figure with a laptop, a character walking the footer, coins; downloaded animated sprites.
- Detecting automation to skip animation, artificial delays before data, or content hidden until a script runs.
- Clipping overflow on `html` or `body`; clip the piece that overflows (`.stage`, `.ground`, a table wrapper).

## Signature elements

At the app root, once:

```css
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
:root[data-motion="off"] *,:root[data-motion="off"] *::before,:root[data-motion="off"] *::after{animation:none!important}
*,*::before,*::after{transition:none!important;border-radius:0!important}
```

### Pixel stage

**What.** An integer-scale pixel diorama, placed as:
- **Hero**: 480×128 units at `size.unitHero` (1920×`size.hero`), full-bleed; a 464px Window at the content's left edge (x 84–200 at 1440), props from x 216. Under `breakpoint.lg` the Window sits below, framed on four sides inside the gutter, and `size.heroSm` crops y 24–104, x `--lx`±48 at 390px (`style="--lx:300"` on the svg = the lead's centre x; CSS below): the lead (≤80 units wide, base y 86–100, top y ≥40) whole under 16+ units of sky; 2+ stars in y 26–34.
  The near ground rises 8–16 units over 1.5–3× the focal group's width (`near=rise(near,x0,x1,h)`), the group on it (base `at(near,x)+2`); rim: a continuous 1-unit `.sky-6` line on every top edge over a 1-unit `.haze` line; `path(doorX,doorBaseY)`: steps from the lead's door down-right to the bottom edge; its end, doorX+2×(128−doorBaseY)+2, must be in x 366–416 (move the lead or its rise); 25+ hand-placed tufts (`.far`, `.haze`) and stones (`.haze` over `.ol`), in the 120.
- **Banner**: 720×128 units at `size.unit` (1440×`size.banner`) in a Window, the title block below the art. Under `breakpoint.lg` it crops centred on the focal group (`--lx`, CSS below).
- **Strip**: 720×48 units at `size.unit` (`size.bannerSm` high), same Window and title block.
- **Vignette**: 48×48 units at `size.unit` (`size.vignette` square), 2px `color.border.control` frame; empty and error states. A scene, not an icon: sky, ridge, ground, a focal pair (figure or object with a tree, lamp or sign) half the width or more, 2–3 details.
- **Figure**: an inline prose scene filling a 2px `color.border.control` frame (sky, ridge, ground), the subject half its width or more.
- **Ground strip**: the footer's top edge on every screen (CSS below).

**Recipe.**
1. One world per app, from its domain: dashboard = server yard (racks with LEDs, dish, crates); store = market street (shopfronts, striped stalls, lamps); blog = post-office street (buildings with window grids, mailboxes, carts); settings = workshop yard (workbenches, switch panels, cable reels). Each scene has its own lead and focal group: the hero's stays in the hero; each strip, the about page and each item of one type (articles, products, projects) gets another lead sprite (subject or outline; mirrored is the same) in another arrangement; recoloured or relit is the same scene.
2. Integer units (1 unit = 1 viewBox unit); `width`/`height` = units × pixel unit; never stretch, wider viewports crop.
3. **Graded layers**, back to front, each from `tops()` with a new seed (never the demo's), checkered by `edge()` into the layer behind: sky bands `color.art.sky1`…`sky6` (strip: sky5, sky6) to the haze ridge's lowest top + 2 (`sky()`, `lowest()`), ≤40% of the height, optional 1–3 clouds (`color.art.glint`, `color.art.far` underside) and a round `moon()`; `.haze` ridge tops y 36–46 (strip 14–18); `.far` ridge tops y 66–76 (strip 26–30) with 4+ `roof()`, `tree()` or rack silhouettes per 360 units, varied, 30–90 apart, never bare noise; `.near` ground tops y 100–106 (strip 39–42). Flat-tone limit (Never): 32 units, strip 12.
4. **Compose in clusters, never a row** (hero, banner, strip), props placed by hand with `put()`. *Focal group*: 2–4 sprites (never one lone building), the most detailed; the lead 48–64 units tall (strip 20–26; hero 40–52), 4+ taller than any other prop, in front (base y 110–118; strip 44–46; hero on its rise), centred 60–100 units off the scene centre, a sprite in the central 180 (hero 90). The lead names its world by 3+ features of 2+ units (post office: envelope plate, flagpole, mail slot; shop: awning, display window, hanging sign; server hut: dish, LED rack door, cable; workshop: saw-tooth roof, open bay, gear plate), never a plain window-grid block. A sign plate holds one pictogram (envelope, cup, gear), one real word in 3×5-unit letters (1-unit gaps, ≤4 letters) or nothing, and no 1–2-glyph mark beside it. *No letter-like marks*: on walls, boards and plates a free-standing 1-unit vertical run 2–6 tall (alone or in 2–4s), or a horizontal run touching one, reads as I, T, H or F at 1x; verticals only edge a door, window or wall. Workshop plates: a gear (8×8+ units, 2-unit teeth, 2×2 hole), a 6×3 saw blade with 1-unit teeth, or plain; never hammers or wrenches (T, Y). *Supporting props*: 4–8 (strip 3–6), 2 units into the ground, 20–36 tall (strip 12–18) in 3+ heights, smaller farther out, each 4+ units wide (poles and cables are details); in a hero or banner 2+ tall verticals (tree, tower, mast; ≤8 wide, ≤44 tall) top the far ridge by 4+ at their column (`at(far,x)`) inside 12–88% of the 1440px crop (hero x 216–376, banner 116–604), one within 40 units of the focal group, the other in a cluster. *Crop edges*: no prop crosses the 1440px crop (hero x 60/420, banner 38/682) or the scene's ends; at most one prop per side in the outer 10% (hero x >384, banner <102 or >618). *Clusters*: the focal group plus 1–2 clusters of 2–4 props, gaps 2–10 or overlaps inside, 60–160 units of open ground between (details only: tufts, a fence, a pole); no propless stretch over 160 units, crop edges included; no three consecutive gaps within 4 units of each other (overlaps count negative). Hero: x 216–420 holds the focal group, both verticals and one cluster 16–60 units from it; a second may sit at x 424–476 (seen at 1920, not counted at 1440). Strip props at most twice as wide as tall, half taller than wide (benches, stalls, counters get an awning, sign, shelf or person above). 3+ variants; a repeated one differs by 4+ units (lit windows, a sign, a roof).
5. Objects per rule 1: each sprite a `<g>` with `--base` (`color.hue.*` or `color.art.far/near`) using only `.base`, `.hi`, `.shade`, `.ol`; no speckle; `.base` is `--base` 55% into `color.art.sky1`; lights, signs, stars and moon stay full. Walls over 12 units wide carry a window grid, framed door, sign, 4-unit siding or trim; a shopfront has a door, a lit window and an awning or sign.
6. Lights: 3–8, each 2×2+ units, `color.art.lightWarm` or `lightCold`, 3+ on props: lit windows and signs (steady), LEDs, lamps, monitors (`light()`); stars don't count; a `beacon` only on error screens.
7. **Detail pass, by hand.** `dot()` entries typed one by one (a pixel or a 2–6-unit run), never by loop or `rng()`: hero 120+, banner 60+, strip or figure 30+, vignette 15+, 3+ per prop: 12+ stars in the top two bands (strip 6) at three levels (`.star-dim`, `.star`, a `.star` with 4 `.star-dim` arms); lit window pixels (`.warm`, `.cold`) and sign glyphs; texture runs (siding, shingles, bricks, cracks, tufts); `.hi`/`.shade` edge units; 1–3 bits of life (bird, smoke, cat).
8. **Review, two rounds or more.** Render the scene alone at 2×+ (temporary page, `image-rendering:pixelated`); squint: the focal group reads first; same heights or even spacing: recompose. List three differences from the recipe and counts, fix, repeat. In place at 1440px and 390px: a banner lead 96px+ tall (props only in the bottom third: scale up); every quarter of a banner or strip (hero: of x 216–420) has a prop, pole or fence; at 200% no flat wall or roof; at 1x every strip prop shows its outline and a lit point.

```js
const R=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${c}"/>`,
dither=(c)=>`<pattern id="d-${c}" width="2" height="2" patternUnits="userSpaceOnUse">${R(0,0,1,1,c)}${R(1,1,1,1,c)}</pattern>`,
sky=(w,bottom,bands)=>{const bh=Math.ceil(bottom/bands.length);return bands.map((c,i)=>R(0,i*bh,w,bh,c)+(i?`<rect x="0" y="${i*bh}" width="${w}" height="2" fill="url(#d-${bands[i-1]})"/>`:"")).join("");},
rng=(s)=>()=>(s=s*16807%2147483647)/2147483647;
// Skyline: [run,top] pairs.
function tops(w,lo,hi,r){const t=[];let y=Math.round((lo+hi)/2);for(let x=0;x<w;){const run=4+Math.floor(r()*13);y=Math.min(hi,Math.max(lo,y+(r()<.5?-1:1)*(2+Math.floor(r()*7))));t.push([run,y]);x+=run;}return t;}
const lowest=(t)=>Math.max(...t.map(([,y])=>y)),
at=(t,x)=>{let e=0;for(const[run,y]of t)if(x<(e+=run))return y;return t.at(-1)[1];},
rise=(t,x0,x1,h)=>{let e=0;return t.map(([run,y])=>{const m=e+run/2;e+=run;return [run,y-2*Math.floor(Math.min(h,Math.max(0,Math.min(m-x0,x1-m)/3))/2)];});},
ridge=(w,h,t,c)=>{let x=0,d=`M0 ${h}`;for(const[run,y]of t)d+=`V${y}H${Math.min(x+=run,w)}`;return `<path class="${c}" d="${d}V${h}Z"/>`;},
// Top 2 units checkered.
edge=(w,h,t,c,p)=>ridge(w,h,t,c)+`<g fill="url(#d-${p})">${ridge(w,h,t,"")}</g>`+ridge(w,h,t.map(([run,y])=>[run,y+2]),c),
disc=(cx,cy,r,c)=>{let s="";for(let dy=-r;dy<r;dy++){const h=Math.round(Math.sqrt(r*r-(dy+.5)**2));s+=R(cx-h,cy+dy,2*h,1,c);}return s;},
moon=(cx,cy)=>disc(cx,cy,7,"halo")+disc(cx,cy,5,"glint")+R(cx-2,cy-2,2,2,"far")+R(cx+1,cy+1,1,1,"far");
// Rows: "." empty, map char→class.
function sprite(rows,map,x0,y0){let s="";rows.forEach((r,y)=>{for(let x=0;x<r.length;){const c=r[x];let n=1;while(r[x+n]===c)n++;if(c!==".")s+=R(x0+x,y0+y,n,1,map[c]);x+=n;}});return s;}
// Left x, base y.
const put=(v,x,baseY)=>`<g style="--base:${v.base}">${sprite(v.rows,v.map,x,baseY-v.rows.length)}</g>`,
// Hero path: after near, before the focal group.
path=(dx,dy)=>{let s="";for(let x=dx,y=dy;y<128;x+=4,y+=2)s+=R(x,y,6,2,"haze");return s;},
// Far-ridge silhouettes, after the far ridge.
roof=(t,x,w,h)=>{const y=at(t,x)-h;let s=R(x,y,w,h+2,"far");for(let i=1;2*i<w;i++)s+=R(x+i,y-i,w-2*i,1,"far");return s;},
tree=(t,x,h)=>{const y=at(t,x)-h;let s="";for(let i=0;i<h;i++)s+=R(x-1-(i>>1),y+i,2+2*(i>>1),1,"far");return s;},
light=(x,y,c,o=0)=>`<rect x="${x}" y="${y}" width="2" height="2" class="${c} blink" style="--o:${o}ms"/>`,
// Step 7, by hand, drawn last.
dot=(l)=>l.map(([x,y,c,w=1])=>R(x,y,w,1,c)).join(""),
detail=dot([[131,4,"star"],[377,9,"star-dim"],[208,6,"star"],[207,6,"star-dim"],[209,6,"star-dim"],[208,5,"star-dim"],[208,7,"star-dim"],
  [152,93,"cold"],[153,89,"ol",3],[152,95,"shade",2],[156,95,"shade",2],[152,98,"shade"],[153,99,"shade"],
  [151,90,"glint"],[158,102,"ol"],[96,20,"ol"],[97,19,"ol"],[98,20,"ol"]]),
// Demo kiosk, too small to ship.
kiosk={base:"var(--color-hue-amber)",rows:["oooooooooo","ohhhhhhhso","oooooooooo","ohbbbbbbso","ohwwbbwwso","ohwwbbwwso","ohbbbbbbso","ohbbbbbbso","ohbboobbso","ohbboobbso","ohbboobbso","ohbboobbso","ohbboobbso","ohbbbbbbso","osssssssso","oooooooooo"],map:{o:"ol",w:"warm",b:"base",h:"hi",s:"shade"}},
bands=["sky-1","sky-2","sky-3","sky-4","sky-5","sky-6"],haze=tops(720,36,46,rng(4271)),far=tops(720,66,76,rng(911)),near=tops(720,100,106,rng(3307)),
svg=`<svg class="scene" viewBox="0 0 720 128" width="1440" height="256" aria-hidden="true"><defs>${[...bands,"glint","haze","far"].map(dither).join("")}</defs>${sky(720,lowest(haze)+2,bands)}${moon(540,18)}${edge(720,128,haze,"haze","sky-6")}${edge(720,128,far,"far","haze")}${roof(far,40,12,8)+tree(far,96,12)/* 4+ per 360 units */}${put(kiosk,150,at(near,150)+2)/* supporting clusters, step 4 */}${edge(720,128,near,"near","far")}${""/* focal group, step 4 */}${detail}</svg>`;
```

```css
.stage{position:relative;overflow:hidden;height:var(--size-banner);background:var(--color-art-sky1)}
.stage--hero{height:var(--size-hero);max-width:1920px;margin-inline:auto}.stage--strip{height:var(--size-banner-sm)}
.stage>.scene{position:absolute;left:50%;bottom:0;translate:-50% 0;max-width:none;shape-rendering:crispEdges;pointer-events:none}
@media (max-width:1023px){.stage--hero{height:var(--size-hero-sm)}.stage.stage--hero>.scene{translate:calc(-50% + (240 - var(--lx))*var(--size-unit-hero)) calc(24*var(--size-unit-hero))}.stage:not(.stage--hero)>.scene{translate:calc(-50% + (360 - var(--lx,360))*var(--size-unit)) 0}}
.sky-1{fill:var(--color-art-sky1)}.sky-2{fill:var(--color-art-sky2)}.sky-3{fill:var(--color-art-sky3)}.sky-4{fill:var(--color-art-sky4)}.sky-5{fill:var(--color-art-sky5)}.sky-6{fill:var(--color-art-sky6)}
.haze{fill:color-mix(in srgb,var(--color-art-far) 50%,var(--color-art-sky6))}.far{fill:var(--color-art-far)}.near{fill:var(--color-art-near)}.ol{fill:var(--color-art-outline)}
.base{fill:color-mix(in srgb,var(--base) 55%,var(--color-art-sky1))}
.hi{fill:color-mix(in srgb,color-mix(in srgb,var(--base) 55%,var(--color-art-sky1)) 60%,var(--color-art-glint))}
.shade{fill:color-mix(in srgb,color-mix(in srgb,var(--base) 55%,var(--color-art-sky1)) 60%,var(--color-art-outline))}
.warm{fill:var(--color-art-light-warm)}.cold{fill:var(--color-art-light-cold)}.star{fill:var(--color-art-star)}.star-dim{fill:color-mix(in srgb,var(--color-art-star) 50%,var(--color-art-sky1))}.beacon{fill:var(--color-art-beacon)}.glint{fill:var(--color-art-glint)}.halo{fill:url(#d-glint)}
.ground{position:relative;overflow-x:clip;height:calc(var(--size-ground) + var(--size-ground-edge));margin-top:calc(var(--space-64) + var(--size-ground-sprite));pointer-events:none;
  background:linear-gradient(90deg,var(--color-art-edge-hi) 2px,transparent 0) 0 calc(100% - 2px)/6px 2px repeat-x,linear-gradient(var(--color-art-edge) 0 0) bottom/100% var(--size-ground-edge) no-repeat,repeating-conic-gradient(var(--color-art-ground-hi) 0 25%,transparent 0 50%) 0 0/8px 8px,var(--color-art-ground)}
.ground>svg{position:absolute;bottom:100%;left:50%;translate:-50% 0;width:1440px;max-width:none;height:var(--size-ground-sprite);shape-rendering:crispEdges}
```

Ground strip (CSS above): grass, dirt edge and a 720×24-unit svg (`size.groundSprite` high, cropped like scenes) with 2–4 sprites of the app's world: one 20–24 units tall, the others 14–24, each 6+ wide (poles and lamps don't count), in different quarters, 120+ apart, one in the central 180.

**Motion.** Every scene: stars twinkle, lights blink out of sync, one cloud or particle layer drifts, one sprite bobs or swaps 2 frames, a rare event (shooting light, bird) every `motion.duration.rare`; at most 2 moving sprites.

**Where.** The placements above, per Applying the concept.

**Limits.** At most one vignette per screen; never in rows, toasts or badges.

### Stepped motion

**What.** Whole-pixel `steps()` animation (`motion.easing.*`).

**Recipe.** Steps per rule 7 (in SVG, lengths are viewBox units: 4px = 1 unit at the hero, 2 at banners). Keyframes change only `opacity`, whole-unit `translate`, sparkle `scale`, or `fill`.

```css
@keyframes nc-blink{50%{opacity:var(--opacity-dim)}}
@keyframes nc-twinkle{60%{opacity:var(--opacity-twinkle)}80%{opacity:1}}
@keyframes nc-sparkle{70%{transform:scale(.34)}85%{transform:scale(1)}}
@keyframes nc-bob{50%{transform:translateY(var(--bob,-4px))}}
@keyframes nc-swap{50%{opacity:0}}
@keyframes nc-beacon{50%{fill:var(--color-art-beacon-off)}}
@keyframes nc-drift{from{transform:translateX(var(--from))}to{transform:translateX(var(--to))}}
@keyframes nc-rare{0%,90%{opacity:0;transform:none;animation-timing-function:steps(1)}90.1%{opacity:1;transform:none;animation-timing-function:steps(5)}100%{opacity:1;transform:translate(var(--dx),var(--dy))}}
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

Lights take their own `--o` (0, −300ms, −700ms…). Per instance: `--from`, `--to`, `--n` (drift); `--dx`, `--dy` (rare: 5 frames of about 277ms); `--tone` (a status colour). In SVG `.bob` takes `--bob:-1px` (hero) or `-2px` (banner).

**Motion.** One-shots: the error nudge (2 frames of `motion.duration.nudge`) and the meter fill. Animation switch: a `.tool` header button (12px pause/play icon + "Animation on"/"off") sets `data-motion="off"` on `<html>`, persisted, default on. Resting styles are frame 1 (lights lit, rare event hidden, meters full).

**Where.** Scenes; a `size.bullet` live light blinking `motion.duration.ledA` only while a job runs; the loading ellipsis.

**Limits.** Per rule 7.

### RPG marker and instant, physical response

**What.** A bevelled ▶ in `color.text.accent`, 4×7 units at `size.unit` (`size.markerW` × `size.markerH`), top edge lit, bottom edge shaded (`--cur-bevel`).

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
.btn-gold{height:var(--size-control-lg);padding-inline:var(--space-20);background:var(--color-action-primary);color:var(--color-text-on-action);border:var(--border-width-control) solid var(--color-action-primary);box-shadow:var(--shadow-hard)}
.btn-gold:active:not(:disabled){translate:4px 4px;box-shadow:var(--shadow-none)}
```

Markup: `<a class="item" aria-current="page"><span class="cur" aria-hidden="true"></span>Overview</a>`. In rows the hidden marker keeps its slot.

**Motion.** The single "you are here" marker of the main navigation may blink (`nc-swap`, `motion.duration.bob`, `motion.easing.frame`); every other marker is still.

**Where.** Per rule 5 (nav, sidebar, contents list, tabs, chips, options, rows); card hover and focus; sort, disclosures, prev/next, forward actions.

**Limits.** One visible marker per list or menu, never decorative on headings.

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

Block meter: `<div class="meter" role="meter" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="Quota">` with 10–20 `<i style="--i:n">`, filled = round(value ÷ max × blocks), value in 48px numerals above; counts (n of m, m ≤ 20): a block per item, "2 of 6" 12/18 above. A lower-is-better metric without a target shows only its delta. It sits inside the `dd`, `td` or `li` (`span`s in phrasing content). Hue order (`--hue`, rule 10), fixed on every screen: cyan, violet, blue, amber, green, pink, orange, teal.

**Motion.** Static; meters fill one block per `motion.duration.meterStep` when they render.

**Where.** Windows: scenes, code blocks (title bar: language label + framed copy button), dialogs, settings groups, the danger zone. Dither under the header and h2s; dots between list items; hue bars on cards and KPI tiles.

**Limits.** Four-sided 4px frames on at most 3 regions per screen (scene window, code or dialog, one group). A footer newsletter is a 2px-framed `color.surface.subtle` panel.

### Pixel type for Hangul and Latin

**What.** One bitmap face for Hangul and Latin, `pixelMono` for code; the Pixel body switch swaps long text to `font.family.readable`.

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

Both faces (OFL) sit on a 16px grid: 16, 32 and 48 give solid 2px stems.

**Motion.** Static.

**Where.** Everything. The Pixel body switch (`.tool`, 12px "A" icon + "Pixel body on"/"off", `data-body` on `<html>`, persisted) sits in the header of every route of an app with long prose or dense tables; headings, nav, buttons and numerals stay pixel.

**Limits.** Per rule 3.

## Color use

- Dark only: no light theme or theme switch; an app that needs light is not a fit.
- Surfaces: cards, sidebar and title bars `subtle`; windows, inputs and code darker, `raised` in a frame.
- Text: `strong` headings, values, current items; `primary` body and cells; `secondary` meta, hints, resting nav, placeholders. Links `color.text.link`, 2px `color.border.control` underline at 4px offset.
- Status colours on callout bars, errors, bullets, meters and danger buttons, never behind text; hues under 6% of the screen.

## Typography

Hero h1, KPI and price numerals: `display`/`display`, strong. Page h1, h2, feature-grid titles: `title`/`title`, strong; standalone sections (newsletter, contact, also in the footer) open with such an h2, never a 16px label. h3, card titles, table heads, labels, buttons, nav: `body`/`ui`. Prose: `body`/`prose`, max `size.prose`, primary. Meta, dates, helper and error text, counts, kbd: `caption`/`caption`, secondary.

One h1 per screen. Dates `YYYY.MM.DD`; meta joined with " · "; no exclamation marks.

## Spacing and density

- Base unit 4px, only `space.*`. Sections `space.64` apart (`space.40` under `breakpoint.sm`); content starts `space.40` under the header.
- Window and card padding `space.16`–`space.20`; banner title block `space.24`; an h2 sits `space.48`–`space.64` below a window or panel.
- Forms: fields `space.20` apart, label to control `space.8`, helper `space.4`, actions `space.32` below.

## Shape and depth

- `shadow.hard` only on the gold button and dialogs.

## Motion

Overlays, menus, tabs and disclosures appear in one frame. Loading is the ellipsis (only while a real request is pending) or a block meter; skeletons are static `color.surface.hover` blocks.

```css
.ellipsis{display:inline-block;width:3ch;overflow:hidden;vertical-align:bottom;white-space:nowrap}
.ellipsis::before{content:"..."}
.is-loading .ellipsis{animation:nc-dots var(--motion-duration-dots) var(--motion-easing-dots) infinite}
@keyframes nc-dots{from{width:1ch}to{width:3ch}}
```

## Interaction

- **Focus-visible**: the 4px ring (rule 4). **Hover**: buttons, linked cards, rows, nav items, options, tabs: `color.surface.hover` + `color.text.strong`; the gold button never changes; links turn text and underline `color.text.strong`; inputs and selects turn their frame `color.border.strong`.
- **Press**: per rule 6, cards too. Error: `color.status.danger` frame + nudge.
- **Disclosures** (`<details>`, `color.surface.subtle`, 4px `color.border.control` left bar, right marker): hover `color.surface.hover` with a `color.hue.cyan` bar; open: down marker.

## Layout adaptation

- Container max `size.container`, side padding `space.24` (`space.16` under `breakpoint.sm`); 12 columns, gap `space.16`, from `breakpoint.lg`; 1 column under `breakpoint.sm`.
- Shells: `size.sidebar` sidebar, content, optional `size.toc` contents list; the sidebar panel runs from header to ground strip (`min-height:100%`). Under `breakpoint.lg` the sidebar becomes a top menu, the contents list a disclosure.
- Card grids by content, one width per kind on every route: `.tiles` for an icon, a title and one line (categories); `.cards` for anything with a summary (posts, projects), 320px+, at most 3 columns; product grids per Imagery; KPI tiles 4/2/1 columns.
- Side-by-side panels in a row share one height (`.panels`), bottoms level: grow the shorter (plot up to `size.chart`, more list rows) or trim the longer (5–8 activity items + "View all"); no interior over `space.64` empty.
- Forms max `size.form`, buttons full width under `breakpoint.sm`.

```css
.tiles,.cards,.panels{display:grid;gap:var(--space-16)}
.tiles{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.cards{grid-template-columns:repeat(auto-fill,minmax(min(100%,max(320px,(100% - 2 * var(--space-16)) / 3)),1fr))}
.panels{grid-template-columns:2fr 1fr;align-items:stretch}.panels>*{display:flex;flex-direction:column}
@media (max-width:1023px){.panels{grid-template-columns:1fr}}
```

## Applying the concept

Dense screens get less art, never smaller type, never nothing: every screen has the header dither, the marker, the ground strip and one scene.

|Context|What it uses|How strongly|
|---|---|---|
|Landing or home|Hero with a Window: eyebrow, 48px h1, lede, button, meta; hue card grid|Full|
|Article, product detail, about|Banner Window with title block (hue bullet + category, h1, lede, meta); dither h2s; code windows; callouts; contents list; Figures; ◀ ▶ prev/next|Strong|
|Card grid|Subtle cards, hue bar, 24px hue icon; missing images → sprites per Imagery|One bar per card|
|Store grid and cart|Strip (market street); filter chips with hue bullets; totals in a Window; framed ◀ ▶ steppers. Product detail: its own Banner; the picture window sticky or as tall as the purchase column, neither column ending 160px+ above the other|Strip + chrome|
|Dashboard|Strip (server yard); KPI tiles per Card; panel groups under their own dither h2s; chart per Imagery, under the KPIs' weight|Strip, meters|
|Data table|No art; Table component|Marker only|
|Form|Window around the form; gold submit; nudge on error; steps as a meter|Chrome|
|Settings|Strip (workshop); marker menu in a full-height sidebar; titled Windows as wide as the scene window (or a helper aside fills the rest); danger zone in a `color.status.danger` frame|Strip + menu|
|Empty state|Empty state component (Vignette)|Strong|
|Error, not found|Vignette or banner, lights off, one beacon; a Window with the message; gold "Retry"|Strong|
|Loading|Per Motion; the scene stays|One loop|

## Imagery and icons

- Icons: fill-only `currentColor` `sprite()`s, 24px on a 12×12-unit grid (`size.icon`) or 12px on 6×6 (`size.iconSm`); category icons in their hue, UI icons `color.text.secondary`.
- Avatars, one treatment in every app: 1–2 pixel initials in `color.text.strong` (16px on a 40px list square; 32px on an 80px profile square) on a name-hashed `color.hue.*` mixed 55% into `color.art.sky1`; never monochrome; never change copy.
- Missing images: the item as a sprite on `color.surface.raised` in a 2px frame, never a grey box, in grids and on detail at every width:
  1. **Tight box.** Every grid and detail sprite 19–23 units wide (key ring and pan as wide as the bags); `item()` trims empty edge rows and columns, so the viewBox is the ink and `--w` its drawn columns.
  2. **Size.** Unit = floor(inner window px ÷ 2 ÷ `--w`), so 19–23 units give 42–50%: grid windows are 192px inner at 1440 ((1248−4×16)÷5 − 2×20 padding − 2×2 frame), 314px at 390 (358−40−4). Product grids `repeat(auto-fill,minmax(236px,1fr))`, at most 5 columns at 1440px. `pct()` writes the sprite table row.
     ```js
     function item(v){let t=v.rows;const k=t.map(r=>/[^.]/.test(r)),ink=t.filter(r=>/[^.]/.test(r)),l=Math.min(...ink.map(r=>r.search(/[^.]/))),e=Math.max(...ink.map(r=>r.replace(/\.+$/,"").length)),w=e-l;t=t.slice(k.indexOf(true),k.lastIndexOf(true)+1).map(r=>r.padEnd(e,".").slice(l,e));return `<svg viewBox="0 0 ${w} ${t.length}" style="--w:${w};--base:${v.base}" aria-hidden="true">${sprite(t,v.map,0,0)}</svg>`;}
     const pct=(name,w,win)=>{const px=Math.floor(win/2/w)*w;return `${name} | ${px} | ${win} | ${Math.round(px/win*100)}%`;};
     ```
     ```css
     .pic{container-type:inline-size}.pic>svg{display:block;margin:auto;width:calc(round(down,50cqi/var(--w),1px)*var(--w));height:auto;shape-rendering:crispEdges}
     ```
  3. **One silhouette.** `ol` only around the outside: where a sleeve, cuff, hem, strap or handle meets the body, the touching units are fill, never `ol` or background. Shoulders one line, the collar a 1-row dip, no bumps. Sweater (o `ol`, h `hi`, b `base`, s `shade`; vary it), cuffs and hem straight under fill:
     ```
     ...oooo......oooo...
     ..ohhhhoooooohhhho..
     .ohbbbbbbbbbbbbbbso.
     ohbbbbbbbbbbbbbbbbso
     ohbbbbbbbbbbbbbbbbso
     ohboobbbbbbbbbboobso
     ohbo.obbbbbbbso.obso
     ohbo.obbbbbbbso.obso
     ohbo.obbbbbbbso.obso
     osso.obbbbbbbso.osso
     oooo.obbbbbbbso.oooo
     .....osssssssso.....
     .....oooooooooo.....
     ```
  4. **Outlines.** Duffel: a barrel 2–2.5× as wide as tall, stepped corners, 2–3-unit `shade` end caps, a handle arch over the middle spanning 40%+, a zip run on top; not a box on posts (toaster). Set-mates differ in silhouette at 1x, not only in hue: the tote is the tallest bag, the duffel the lowest. Skillet: a top-down `disc()` pan 60%+ of the width, 1-unit `hi` rim, `shade` floor, a straight handle 2–3 thick, 30–40% of the width; not a dot with a stub. Key ring: a flat key is the largest part (6×6 bow with a 2×2 hole, 2-thick shaft 11–14 long, 2–3 teeth of 2×2 at its end), a 1-unit ring at most 6 across through the bow's corner; not a big ring with a tag or handle (magnifier). Others: 2–3 defining parts at 2+ units. Coat (20×22): one body block, sleeves outside it, a 2-row V collar dip, a `hi` button column; the fronts never part below the collar:
     ```
     ...oooo......oooo...
     ..ohhhho....ohhhho..
     .ohbbbbboooobbbbbso.
     ohbbbbbsbbbbsbbbbbso
     ohbbbbbbsshhbbbbbbso
     ohboobbbbbbbbbboobso
     ohbo.obbbbbbbso.obso
     ohbo.obbbbhhbso.obso
     ohbo.obbbbbbbso.obso
     ohbo.obbbbbbbso.obso
     ohbo.obbbbhhbso.obso
     ohbo.obbbbbbbso.obso
     ohbo.obbbbbbbso.obso
     ohbo.obbbbhhbso.obso
     osso.obbbbbbbso.osso
     oooo.obbbbbbbso.oooo
     ....obbbbbbbbbso....
     ....obbbbbbbbbso....
     ....obbbbbbbbbso....
     ....ohbbbbbbbbso....
     ....osssssssssso....
     ....oooooooooooo....
     ```
     Tote (20×27): body w÷h 0.8–1.0 (as tall as wide or taller), sides stepping 1 unit in toward the bottom; two 1-unit straps from ¼ and ¾ of the top meet in a soft arch half the body width or more, background between straps and body; never a 2-unit squared loop or a box under a hollow arch (padlock):
     ```
     ......hhhhhhhh......
     .....hh......hh.....
     ....hh........hh....
     ....h..........h....
     ....h..........h....
     ....h..........h....
     oooohoooooooooohoooo
     ohhhhhhhhhhhhhhhhhho
     osssssssssssssssssso
     ohbbbbbbbbbbbbbbbbso
     ohbbbbbbbbbbbbbbbbso
     ohbbbbbbbbbbbbbbbbso
     ohbbbbbbbbbbbbbbbbso
     ohbbbbbbbbbbbbbbbbso
     ohbbbbbbbbbbbbbbbbso
     ohbbbbbbbbbbbbbbbbso
     ohbbbbbbbbbbbbbbbbso
     ohbbbbbbbbbbbbbbbbso
     .ohbbbbbbbbbbbbbbso.
     .ohbbbbbbbbbbbbbbso.
     .ohbbbbbbbbbbbbbbso.
     .ohbbbbbbbbbbbbbbso.
     .ohbbbbbbbbbbbbbbso.
     .ohbbbbbbbbbbbbbbso.
     .ohbbbbbbbbbbbbbbso.
     .osssssssssssssssso.
     .oooooooooooooooooo.
     ```
  5. **Name test.** At 1x, name each sprite from its silhouette; if it reads as another object (padlock, magnifier, book, toaster, arch, trousers, a letter, its set-mate), redraw.
- Charts: flat square bars in hues mixed 55% into `color.surface.subtle`, 2px dotted gridlines or none, square legend bullets; bars ≤40% of their slot; the panel caption sits at its top padding, the plot right under it; a 12px y-axis with 3–5 values on the gridlines; lines `step-after`, 2px, square points.

## Accessibility

- Text 4.5:1 or more (body 7:1); control frames 3:1; the focus ring never removed; targets `size.touch` under coarse pointers.
- Art and markers `aria-hidden="true"`, nothing meaningful only in the art; state lives in `aria-current`, `aria-selected`, `aria-pressed`.
- Errors `role="alert"`; one `role="status"` region per screen. No loop frame shorter than 250ms.

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
| `size.chart` | `240px` |
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

**Anatomy.** Label 16/24 pixel; optional 24px pixel icon before it (gap `space.8`); forward actions end with a trailing ▶ (`.cur`, no bevel, `currentColor`). Heights: `size.controlLg` (gold), `size.control` (default), `size.controlSm` (copy, row actions; padding `space.8`). Padding `space.20` gold, `space.12` others. Icon-only: square.

**Variants.**
- Gold, the page content's one main commit (rule 4): `.btn-gold` (RPG marker recipe).
- Framed, every other action: transparent, 2px `color.border.control`, `color.text.primary`; optional kbd chip (2px `color.border.default`, 12px).
- Tool, header switches and icon actions: `.tool` (Navigation), label + state word.
- Danger, destructive actions (confirmed in a dialog): transparent, 2px `color.status.danger` border and text.

**States.** Hover, press, focus-visible: per Interaction. Disabled: `color.surface.hover`, `color.text.disabled`, `color.border.default`, no shadow or press. Loading (real request only): gerund + `.ellipsis`, width held, `aria-busy`.

**Accessibility.** Native `<button>`; icons and markers `aria-hidden`; icon-only buttons `aria-label`; toggles `aria-pressed`.

### Text field

**Anatomy.** Label above (16/24 `color.text.strong`), `space.8` gap; control `size.control` high, `color.surface.raised` fill, 2px `color.border.control` frame, padding 0 `space.12`, 16px pixel text, placeholder `color.text.secondary`; helper 12/18 `color.text.secondary`, `space.4` below. Textarea: min 4 rows, padding `space.12`. Search: 24px pixel magnifier at `space.8`, text from `space.40`, kbd hint right (hidden under `breakpoint.sm`).

**States.** Hover and focus per Interaction. Disabled: `color.surface.subtle` fill, `color.border.default` frame, `color.text.disabled`. Read-only: `color.surface.subtle`. Error: frame `color.status.danger`, `.nudge` once on submit; the message (12px "!" icon of 6×6 units, rows `..xx..` ×4, `......`, `..xx..`, never a triangle or padlock, + text in `color.status.danger`) replaces the helper, `aria-invalid`, `aria-describedby`; a failed submit focuses the first invalid field. Loading (async check): `.ellipsis` at the right.

**Accessibility.** Visible `<label for>`; "required" in words, not only a symbol.

### Select

**Anatomy.** The text field's box, label, helper and error; `appearance:none`; a down marker (`.cur--d`, `color.text.secondary`) at `space.12` from the right. Prefer native `<select>`. A custom list opens as a Window directly below (2px `color.border.strong` frame, `color.surface.raised`, no shadow), options as marker items (`size.row`), 8 visible, then scroll.

**States.** Hover and focus per Interaction. Open: the down marker turns up; the list opens with the selected (or first) option highlighted. Highlighted option: `color.surface.hover` + marker. Selected option: `color.text.strong`, `aria-selected`. Disabled and error: as text field.

**Accessibility.** Custom: `role="combobox"` + `listbox`/`option`, `aria-activedescendant`; arrows move the marker, Enter selects, Escape closes.

### Checkbox and radio

**Anatomy.** Checkbox: 16px square, 2px `color.border.control` frame, `color.surface.raised` fill; checked shows a pixel check drawn with `sprite()` (6×5 units at `size.unit`: rows `.....x`, `....xx`, `x..xx.`, `xxxx..`, `.xx...`) in `color.text.accent`. Indeterminate: an 8×4px bar in `color.text.accent`. Radio: the same square; selected shows an 8px square in `color.text.accent`, never a circle. Label 16/24 at `space.8`.

**States.** Hover and focus per Interaction (ring around the box). Disabled: `color.border.default`, mark and label `color.text.disabled`. Error: frame `color.status.danger`, message under the group.

**Accessibility.** Native inputs, visually replaced; `<fieldset>` + `<legend>` for groups.

### Switch

**Anatomy.** Track 32×16px, 2px `color.border.control` frame, `color.surface.raised`; an 8×8px square thumb, `color.text.secondary` at the left when off, at the right in `color.text.accent` on a `color.surface.hover` track when on; a 12px state word follows. The whole row is the target, at least `size.touch`.

**States.** Hover and focus per Interaction (ring around the track). On: one-frame jump, no slide. Disabled: `color.border.default`, thumb `color.text.disabled`. Loading (saved remotely): the state word becomes `.ellipsis`.

**Accessibility.** `<button role="switch" aria-checked>` or a checkbox with `role="switch"`; the label names the setting.

### Tabs

**Anatomy.** A row of tabs on a 2px `color.border.strong` baseline that joins the panel. Tab: `size.control` high, padding 0 `space.12`, 16/24, marker slot before the label. Selected: 2px `color.border.strong` frame on top and sides, panel-coloured bottom covering the baseline, `color.text.strong`, marker visible. Unselected: `color.text.secondary`.

**States.** Hover and focus (offset −4px) per Interaction. Disabled: `color.text.disabled`, no hover.

**Accessibility.** `role="tablist"`/`tab`/`tabpanel`, roving tabindex, arrows, Home/End, `aria-selected`.

### Navigation

**Header.** Sticky, `size.header` on `color.surface.default`, a 4px `.dither` rule below. Left: a 24px original pixel mark + product name 16/24 `color.text.strong`, then 3–5 nav items (`.item`, marker on the current one, `aria-current="page"`). Right: search as a framed button with a kbd hint, then the Animation and Pixel body switches as `.tool` text buttons, the same set on every route of the app:

```css
.tool{display:inline-flex;align-items:center;gap:var(--space-8);height:var(--size-control);padding-inline:var(--space-8);background:transparent;border:0;color:var(--color-text-secondary)}
.tool:hover{background:var(--color-surface-hover);color:var(--color-text-primary)}
```

Dropdowns (user menu, sort): a Window of `.item` options under the trigger; opening focuses and highlights the current (or first) option in the same frame; arrows move it; Escape closes and refocuses the trigger. Search placeholder: "Search", the icon only under `breakpoint.sm`. Under `breakpoint.lg`: mark, product name, search icon and a menu button opening a marker-menu Window; the name never hides (nav items move into the menu).

**Sidebar.** `size.sidebar`, `color.surface.subtle`, 2px `color.border.default` right edge. Group titles 12/18 `color.text.secondary`; `.item` rows: 24px hue icon or `size.bullet`, label, count right (`color.text.secondary`); `.sep-dots` between; current `color.surface.hover` + marker.

**Contents list.** 2px `color.border.default` left rule, items 16/24, nested ones indented `space.16`, marker on the current heading. One item is always current (`aria-current="location"`): the first heading on load, then the heading under the header as the reader scrolls.

**Breadcrumbs, prev/next, pagination.** Breadcrumbs `color.text.secondary` with " / ", hover `color.text.strong` underlined. Prev/next: two columns, 2px `color.border.strong` top rule, ◀/▶ + 12px label, title 16/24. Pagination: ◀ 1 2 3 ▶ `size.control` squares, current page framed 2px `color.border.strong`, `aria-current`.

**Accessibility.** `<nav aria-label>`; the menu button has `aria-expanded`; the mobile menu traps focus until closed.

### Card

**Anatomy.** `color.surface.subtle`, no side or bottom border, a 4px `color.hue.*` top bar (category or entity kind; neutral: a 2px `color.border.default` top rule), padding `space.16` `space.20`. Order: 24px hue icon; title (16/24; 32/40 in feature grids) flush with icon and meta, marker in the left padding (`.card-title`); description `color.text.secondary` clamped at 2 lines (`-webkit-line-clamp:2`, never 1); meta 12/18. Panel: `size.bullet` + 12/18 caption, never a 32px title (its ruled h2 sits outside). KPI tile: label row (`size.bullet` + 12px label), 48px numeral `color.text.strong`, 12px delta in a status colour with an up/down marker, a block meter. Product card: framed picture window (photo or sprite per Imagery; 4:3 under `breakpoint.sm`, never square), name, price 16/24 `color.text.strong`.

**States.** Hover (linked) per Interaction, marker beside the title. Selected (plan, option): marker visible, 2px `color.text.accent` frame. Error: a callout with a 4px `color.status.danger` bar inside.

**Accessibility.** The whole card is one link (the title link stretched); secondary actions are separate buttons.

### Table

**Anatomy.** Head row `color.surface.subtle`, 16/24 `color.text.strong`, 2px `color.border.strong` rule under it; body rows `size.row`, 2px `color.border.default` rules, no zebra or vertical rules; cell padding 0 `space.12`; a 16px leading gutter for the marker. Numbers right-aligned in pixel numerals. Status cells: `size.bullet` in the status colour + word. Row actions: `size.controlSm` framed buttons, right.

**Small screens.** Under `breakpoint.sm` only `data-pin` columns show: the first (`data-pin="first"`, marker gutter inside) and one or two short ones (status, key value); hidden ones stay in the DOM. The first shows 16+ characters at 390px before its ellipsis (else pin one fewer); no sideways scroll.

```css
@media (max-width:599px){.table{width:100%}
.table :is(th,td):not([data-pin]){display:none}
.table :is(th,td){height:var(--size-row);white-space:nowrap}.table .sub{display:none}
.table [data-pin="first"]{width:100%;max-width:0;overflow:hidden;text-overflow:ellipsis}
.table [data-pin]:not([data-pin="first"]){width:1%}}
```

**States.** Hover and focus (interactive rows, −4px) per Interaction. Selected: marker in the gutter, `color.text.strong`, `aria-selected`. Sorted header: up/down marker after the label, `aria-sort`. Loading: 5 rows of flat static `color.surface.hover` blocks. Error: a danger callout above with Retry. Empty: the empty state replaces the body.

**Accessibility.** Real `<table>`, `<th scope>`, sort buttons inside headers.

### Badge

**Anatomy.** Status or category chip: `size.bullet` in the hue or status colour + label 16/24 (12/18 dense), `color.text.primary`, padding 0 `space.8`, no fill. Count: 20px high, `color.surface.hover`, 12px `color.text.strong`, padding 0 `space.4`. Filter chip: a toggle button, 2px `color.border.default` frame, `size.control` high. Tag: plain `#tag`, `color.text.secondary`.

**States.** Filter chip hover `color.surface.hover`; selected (`aria-pressed="true"`) adds `color.text.strong` and the marker in the bullet's slot (never both); focus ring.

### Dialog

**Anatomy.** Native `<dialog>` or `role="dialog"`. A `.window` with `shadow.hard`, width min(`size.dialog`, 100% − `space.32`). Title bar `size.titleBar`: title 16/24 `color.text.strong`, framed close button (12px pixel ×). Body padding `space.20`, 16/28. Actions right, gap `space.12`: framed Cancel, then the gold confirm (the screen's gold moves here) or, if destructive, the danger button. Scrim `color.surface.overlay`, no blur.

**States.** Focus moves to the first field or the confirm. Loading: confirm shows the gerund + `.ellipsis`, `aria-busy`. Error: a danger callout above the actions.

**Accessibility.** `aria-labelledby` the title; Escape closes; focus stays inside and returns to the opener.

### Toast

**Anatomy.** Bottom-right stack, `space.16` from the edges (full width under `breakpoint.sm`). 2px `color.border.strong` frame, `color.surface.raised`, padding `space.12` `space.16`, max 400px; 12px pixel status icon or `size.bullet` in the status colour, message 16/24, optional framed action and a 12px × close.

**States.** Auto-hides after 5000ms unless it has an action or is hovered; errors stay until dismissed.

**Accessibility.** Announced through the screen's `role="status"` region; never steals focus.

### Empty state

**Anatomy.** Centred in the region it replaces, max 400px: a Vignette (Pixel stage; one blinking light), `space.16`, one sentence 16/28 `color.text.secondary`, `space.16`, one framed button with the marker before its label. First-run: the gold button if it is the screen's only action.

**States.** Error variant: per Applying the concept (Error); the sentence names the problem.

## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); add `color-scheme: dark` on `:root`.
3. Load the fonts (Pixel type links); set up the root block, type base, `:focus-visible` and header `.dither` (Signature elements).
4. Build the signature elements first, as reusable pieces: `PixelScene`, `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes and both header switches. Pick the app's world; draw 3+ prop variants, focal, ground and product sprites and icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and update date), the tokens, and `components.md`: the app's world, scenes by screen, the hue of each category.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays); wait for approval.
2. Map the tokens onto existing variables (a brand action colour becomes `color.action.primary`); remove radius, soft shadows, transitions, any light theme and theme switch as you restyle.
3. Build the signature elements, restyle one screen as a sample (header with dither and marker, scene window, ground strip, a marker list), wait for review.
4. Continue screen by screen, one commit each.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen follows Applying the concept; new scenes follow Pixel stage step 1.
- Uncovered needs: compose from tokens and note it in `components.md`; for conflicting requests (rounding, gradients, bold, smooth motion) present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files; axe: no violations on any screen. Never change app code or config to pass a check.
- Reduced motion: scenes, meters and labels complete on frame 1, nothing runs; with motion, lights blink out of sync and travel jumps 4px per step.
- Each screen at 1440px and 390px: no sideways scroll; focal group visible and centred at 390px; crisp edges; 16px and 48px type with solid 2px stems; tabbing always shows the gold ring.
- Numbers come from code, never by eye: sprite rows by `pct()`, scene numbers from your `put()`, `path()`, `dot()` and `light()` coordinates; show each computation. Scenes passed two step 8 rounds.
- Hero: a continuous `color.art.sky6` rim; the path ends in x 366–416 (from `path()`'s arguments); at 390px the lead whole under 64px+ of sky, the Window framed.
- Product sprites pass Imagery steps 1–5 (one 4-connected region each; the tote no padlock).
- Per screen: at most one gold button, in the content; at most 3 four-sided 4px frames; panels in a row end level; summary cards 320px+, ≤3 per row; newsletter titles 32px; every "Showing n of m" or "n of m on" count has its block meter; header switches the same on every route; avatars are hued initials; at 390px every header shows mark and name, tables pinned-only, one-line, equal rows, first column 16+ characters; the error icon reads "!" at 1x.
- Walk the ten rules and the Never list. Write the report last; missing a part fails it: (1) sprite table `sprite | ink px | window px | %` from `pct()`, a row per grid and detail sprite at 1440px and 390px, every row 40–50%, every sprite 19–23 units wide, or "Sprite table: no item sprites"; (2) variant table `variant | x positions | what differs (4+ units)`; (3) per scene, the numbers steps 3, 4 and 7 set (details by kind, lead height, gaps left to right, verticals' x spans, the hero's path end), its lead's subject, features and signs (unique: not shared, mirrored, recoloured or relit), its focal group, and fixes; (4) files changed, what you could not apply, decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
