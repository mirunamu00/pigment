## Character

Night ground, chunky cream pixel type, hard-edged game windows, a gold RPG marker, and one dense pixel diorama per screen that moves in whole-pixel steps.

## The ten rules that define this look

1. **Everything sits on the pixel grid.** `radius.none`; borders 2px or 4px; art is filled rects at an integer scale, `crispEdges`; every drawn object has a 1-unit `color.art.outline`, one top-left highlight and one bottom-right shade. Why: one soft edge breaks the console.
2. **Quantized night colour.** Ground `color.surface.default`, panels `color.surface.subtle`, windows `color.surface.raised` inside a light frame; text `color.text.primary`, headings `color.text.strong`; art only from `color.art.*`. Why: free colours break the palette.
3. **One pixel typeface, one weight.** `font.family.pixel` (16px-grid bitmap), smoothing off, weight 400, sizes 12/16/32/48, no tracking; emphasis is `color.text.strong`, never bold or italic. Why: the bitmap voice is the costume.
4. **Gold is the player.** `color.action.primary` fills one button per screen, the page content's main commit (with `shadow.hard`); `color.text.accent` is the marker and selection marks; `color.focus.ring` the 4px focus outline. Nothing else is gold (never header, search or navigation); no content commit, no gold. Why: scarce gold leads the eye.
5. **Selection is an RPG marker.** A bevelled ▶ marks the current item in every menu, list and table; its down/right forms are the disclosure chevrons. Why: a tinted row alone is any app.
6. **Instant, physical response.** Transitions `motion.duration.instant`; hover `color.surface.hover`; press moves a control 2px, or 4px into its hard shadow, which disappears. Why: consoles answer on the next frame.
7. **Motion is stepped.** `steps(n)`, n = travel in px ÷ 4; loops only in art, the marker and live lights; no entrance, scroll or hover animation; reduced motion and the Animation switch freeze frame 1. Why: tweens read as a gimmick.
8. **One composed, living stage per screen.** A hero, a framed banner or a 96px strip at the top and the ground strip at the bottom: one focal group leads, smaller props cluster across open ground, graded ridges and ground, 3 to 8 lights; never behind text, data or controls. Why: the scene says where you are.
9. **Game-window chrome.** Major regions are windows (4px `color.border.strong` frame, `color.surface.raised`, optional `size.titleBar` bar); headings sit on a dithered rule; separators are 2px dots; scores, quotas and n-of-m progress are block meters against a real maximum. Why: frames, not shadows, make depth.
10. **Hue identifies, never decorates.** Each entity kind or category owns one `color.hue.*`: a 4px top bar, a `size.bullet` square, its icon fill; text and backgrounds stay neutral. Why: hues work as labels only while small.

## Never

- Radius, circles, pills; blurred shadows, glows, glass, gradients outside dither and scene bands.
- `ease`, `linear` travel, `cubic-bezier`, springs, fades, slides, hover lift, shimmer, spinners, smooth progress bars, scroll or entrance animation.
- Bold, italic, synthetic weights, `letter-spacing`, `text-transform: uppercase`, sizes outside 12/16/32/48.
- Pure white text or a pure black ground.
- Stroke icon sets, emoji, anti-aliased art, photos or text inside art; art behind text, data or forms, or in list cards; a second gold button.
- A square moon; a ridge with one repeating period; a background gap between sky and ridge; a flat front wall wider than 12 units.
- A catalogue row (same-height or evenly spaced props); two identical props in one scene; one flat tone over 25% of a scene's height; full-hue walls; a prop under the hero Window.
- A meter with an invented maximum, or directly inside a `dl` group, `ul` or `tr`.
- These subjects: a lone cabin under a moon, a tall single tree motif, a snowy ridge banner, a capped figure with a laptop, a character walking the footer, coins; downloaded animated sprites.
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
- **Hero**: 480×128 units at `size.unitHero` (1920×`size.hero`), full-bleed, a Window over its left third; under it only sky, ridges and ground, props start 16 units right of its edge (check 1440px and 1920px). Under `breakpoint.lg` the Window sits below; the stage, `size.heroSm` high, shows y 48–128, so walls and figures stay below y 48 (only a roof peak, mast or tree rises higher). The near ground is a landform: a rise 8–16 units high under the focal group (`near=rise(near,x0,x1,h)`, 1.5–3× the group's width), the group on it (base `at(near,x)+2`); a path of 2-unit steps (`.far` runs) from the bottom edge up to it; 25+ hand-placed tufts (`.far`, `.haze`) and stones (`.haze` over `.ol`), counted in the 120.
- **Banner**: 720×128 units at `size.unit` (1440×`size.banner`) in a Window, title block (h1, lede, meta) below the art.
- **Strip**: 720×48 units at `size.unit` (`size.bannerSm` high), same Window and title block; for product screens.
- **Vignette**: 48×48 units at `size.unit` (`size.vignette` square), 2px `color.border.control` frame; empty and error states. A small scene, not an icon: sky bands, ridge, ground, a focal pair (a figure or object with a tree, lamp or sign) spanning half the width or more, 2 or 3 details.
- **Figure**: an inline prose scene sized to its 2px-framed box: sky, ridge and ground fill it, the subject spans half its width or more, no flat tone over 25% of its height.
- **Ground strip**: the footer's top edge on every screen (CSS below).

**Recipe.**
1. One world per app, from its domain: dashboard = server yard (racks with LEDs, dish, crates); store = market street (shopfronts, striped stalls, lamps); blog = post-office street (buildings with window grids, mailboxes, carts); settings = workshop yard (workbenches, switch panels, cable reels). Screens differ by crop, props or lit lights.
2. Integer units (1 unit = 1 viewBox unit); `width`/`height` = units × pixel unit; never stretch, wider viewports crop.
3. **Graded layers**, back to front, each from `tops()` with a new seed (never the demo's) and checkered by `edge()` with the layer behind: sky bands `color.art.sky1`…`sky6` (strip: sky5, sky6), checkered joins, down to the haze ridge's lowest top + 2 (`sky()`, `lowest()`), at most 40% of the height, optional 1–3 clouds (`color.art.glint`, `color.art.far` underside) and a round `moon()`; the `.haze` ridge, tops y 36–46 (strip 14–18); the `.far` ridge, tops y 66–76 (strip 26–30), roofs, trees or racks in its outline; the `.near` ground, tops y 100–106 (strip 39–42). No column shows one flat tone over 25% of the height (32 units; strip 12).
4. **Compose in clusters, never a row** (hero, banner, strip). Place props by hand with `put()`. *Focal group*: 2–4 sprites (never one lone building), the most detailed; the lead 48–64 units tall (strip 20–26; hero 40–52), 4+ taller than any other prop; in front (base y 110–118; strip 44–46; hero on its rise); centre 60–100 units off the scene centre, nearest sprite inside the central 180 units (hero 90). *Supporting props*: 4–8 (strip 3–6), 2 units into the ground, 20–36 tall (strip 12–18) in 3+ heights, smaller farther out; in a hero or banner 2+ are tall verticals (tree, tower, mast; ≤8 wide, ≤44 tall) topping the far ridge by 4+ at their column (`at(far,x)`). *Clusters*: the focal group plus 1 or 2 clusters of 2–4 supporting props, gaps 2–10 or overlaps inside, 60–160 units of open ground (only details: tufts, a fence, a pole) between; no three consecutive gaps within 4 units of each other (overlaps count negative). At most 12 props (strip 5–9), each 4+ units wide; poles and cables are details. Strip props at most twice as wide as tall, half taller than wide (benches, stalls and counters get an awning, sign, shelf or person above). 3+ variants; a repeated variant differs by 4+ units (lit windows, a sign, a roof).
5. Objects per rule 1: each sprite a `<g>` with `--base` (`color.hue.*` or `color.art.far/near`); `.base`, `.hi` top and left, `.shade` bottom and right, 1-unit `.ol` outline; no other tones or random speckle. `.base` mixes `--base` 55% into `color.art.sky1` (CSS below); lights, signs, stars and moon stay full. Walls over 12 units wide carry a window grid, framed door, sign, siding every 4 units or trim; a shopfront has a door, a lit window and an awning or sign.
6. Lights: 3–8, each at least 2×2 units, `color.art.lightWarm` or `lightCold`, at least 3 on props: lit windows and signs (steady), LEDs, lamps, monitors (`light()`). Stars do not count. A `beacon` only on error screens.
7. **Detail pass, by hand.** The helpers make only the skeleton. Type a `dot()` list entry by entry (a pixel or a 2–6-unit run) while looking at the render, never by loop or `rng()`: hero 120+, banner 60+, strip or figure 30+, vignette 15+, 3+ per prop. All kinds: 12+ stars in the top two bands (strip 6) at three levels (`.star-dim`, `.star`, a `.star` with 4 `.star-dim` arms); lit window pixels (`.warm`, `.cold`) and sign glyphs; texture runs (siding, shingles, bricks, cracks, tufts); `.hi`/`.shade` edge units; 1–3 bits of life (a bird, smoke, a cat).
8. **Review by eye, two rounds or more.** Render the scene alone at 2× or more (a temporary page or the component on a blank screen, `image-rendering:pixelated`). Squint: the focal group reads first; same heights or even spacing: recompose. List three differences from this recipe and the counts, fix, look again. Then in place at 1440px and 390px: a banner lead 96px or taller (props only in the bottom third: scale up); outside the hero Window every quarter of the width has a prop, pole or fence; 3+ lit points on props; at 200% no flat wall or roof; at 1x in dark every strip prop shows its outline and a lit point.

```js
const R=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${c}"/>`;
// Checker pattern of class c.
const dither=(c)=>`<pattern id="d-${c}" width="2" height="2" patternUnits="userSpaceOnUse">${R(0,0,1,1,c)}${R(1,1,1,1,c)}</pattern>`;
// Bands from y 0 to `bottom`, joins checkered.
const sky=(w,bottom,bands)=>{const bh=Math.ceil(bottom/bands.length);return bands.map((c,i)=>R(0,i*bh,w,bh,c)+(i?`<rect x="0" y="${i*bh}" width="${w}" height="2" fill="url(#d-${bands[i-1]})"/>`:"")).join("");};
// Seeded random (seed 1 to 2147483646).
const rng=(s)=>()=>(s=s*16807%2147483647)/2147483647;
// Skyline as [run, top] pairs, tops in lo..hi.
function tops(w,lo,hi,r){const t=[];let y=Math.round((lo+hi)/2);for(let x=0;x<w;){const run=4+Math.floor(r()*13);y=Math.min(hi,Math.max(lo,y+(r()<.5?-1:1)*(2+Math.floor(r()*7))));t.push([run,y]);x+=run;}return t;}
const lowest=(t)=>Math.max(...t.map(([,y])=>y));
// Top y of skyline t at column x.
const at=(t,x)=>{let e=0;for(const[run,y]of t)if(x<(e+=run))return y;return t.at(-1)[1];};
// Hero rise: lift t by up to h between x0 and x1.
const rise=(t,x0,x1,h)=>{let e=0;return t.map(([run,y])=>{const m=e+run/2;e+=run;return [run,y-2*Math.floor(Math.min(h,Math.max(0,Math.min(m-x0,x1-m)/3))/2)];});};
const ridge=(w,h,t,c)=>{let x=0,d=`M0 ${h}`;for(const[run,y]of t)d+=`V${y}H${Math.min(x+=run,w)}`;return `<path class="${c}" d="${d}V${h}Z"/>`;};
// Silhouette, top 2 units checkered with p.
const edge=(w,h,t,c,p)=>ridge(w,h,t,c)+`<g fill="url(#d-${p})">${ridge(w,h,t,"")}</g>`+ridge(w,h,t.map(([run,y])=>[run,y+2]),c);
// Stepped disc.
const disc=(cx,cy,r,c)=>{let s="";for(let dy=-r;dy<r;dy++){const h=Math.round(Math.sqrt(r*r-(dy+.5)**2));s+=R(cx-h,cy+dy,2*h,1,c);}return s;};
// Moon: disc, two craters, checkered halo (needs d-glint).
const moon=(cx,cy)=>disc(cx,cy,7,"halo")+disc(cx,cy,5,"glint")+R(cx-2,cy-2,2,2,"far")+R(cx+1,cy+1,1,1,"far");
// Sprite from character rows ("." empty, map: char to class).
function sprite(rows,map,x0,y0){let s="";rows.forEach((r,y)=>{for(let x=0;x<r.length;){const c=r[x];let n=1;while(r[x+n]===c)n++;if(c!==".")s+=R(x0+x,y0+y,n,1,map[c]);x+=n;}});return s;}
// One prop, left edge x, standing on baseY.
const put=(v,x,baseY)=>`<g style="--base:${v.base}">${sprite(v.rows,v.map,x,baseY-v.rows.length)}</g>`;
// A blinking 2x2-unit light.
const light=(x,y,c,o=0)=>`<rect x="${x}" y="${y}" width="2" height="2" class="${c} blink" style="--o:${o}ms"/>`;
// Detail pass (step 7): [x, y, class, run=1], typed by hand, drawn last.
const dot=(l)=>l.map(([x,y,c,w=1])=>R(x,y,w,1,c)).join("");
const detail=dot([[131,4,"star"],[377,9,"star-dim"],[208,6,"star"],[207,6,"star-dim"],[209,6,"star-dim"],[208,5,"star-dim"],[208,7,"star-dim"], // stars, one bright
  [152,93,"cold"],[153,89,"ol",3],[152,95,"shade",2],[156,95,"shade",2],[152,98,"shade"],[153,99,"shade"], // window pixel, sign glyph, siding, crack
  [151,90,"glint"],[158,102,"ol"],[96,20,"ol"],[97,19,"ol"],[98,20,"ol"]]); // edge units, a bird
// Demo only, too small to ship: a 10x16 kiosk.
const kiosk={base:"var(--color-hue-amber)",rows:["oooooooooo","ohhhhhhhso","oooooooooo","ohbbbbbbso","ohwwbbwwso","ohwwbbwwso","ohbbbbbbso","ohbbbbbbso","ohbboobbso","ohbboobbso","ohbboobbso","ohbboobbso","ohbboobbso","ohbbbbbbso","osssssssso","oooooooooo"],map:{o:"ol",w:"warm",b:"base",h:"hi",s:"shade"}};
const bands=["sky-1","sky-2","sky-3","sky-4","sky-5","sky-6"], haze=tops(720,36,46,rng(4271)), far=tops(720,66,76,rng(911)), near=tops(720,100,106,rng(3307));
const svg=`<svg class="scene" viewBox="0 0 720 128" width="1440" height="256" aria-hidden="true"><defs>${[...bands,"glint","haze","far"].map(dither).join("")}</defs>${sky(720,lowest(haze)+2,bands)}${moon(540,18)}${edge(720,128,haze,"haze","sky-6")}${edge(720,128,far,"far","haze")}${put(kiosk,150,at(near,150)+2)/* supporting props in clusters, by hand (step 4) */}${edge(720,128,near,"near","far")}${""/* focal group: 2 to 4 sprites, lead 48 to 64 tall, base y 110 to 118 */}${detail}</svg>`;
```

```css
.stage{position:relative;overflow:hidden;height:var(--size-banner);background:var(--color-art-sky1)}
.stage--hero{height:var(--size-hero);max-width:1920px;margin-inline:auto}.stage--strip{height:var(--size-banner-sm)}
.stage>.scene{position:absolute;left:50%;bottom:0;translate:-50% 0;max-width:none;shape-rendering:crispEdges;pointer-events:none}
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

Ground strip (CSS above): grass, dirt edge and a 720×24-unit svg (`size.groundSprite` high, cropped like scenes) with 2–4 sprites from the app's world: one 20–24 units tall (40–48px), the others 14–24, each 6+ units wide (poles and lamps are not sprites), in different quarters, 120+ units apart, one inside the central 180.

**Motion.** Every scene: stars twinkle, lights blink out of sync, one cloud or particle layer drifts, exactly one sprite bobs or swaps 2 frames, one rare event (a shooting light, a bird) every `motion.duration.rare`; at most 2 moving sprites. Reduced motion or Animation off: frame 1, still and complete.

**Where.** The placements above, per Applying the concept.

**Limits.** One of hero, banner or strip per screen, plus the ground strip, at most one vignette, and prose figures. Never in list cards, rows, toasts or badges.

### Stepped motion

**What.** Every animation jumps in whole pixels with `steps()` (`motion.easing.*`); the UI has no transitions.

**Recipe.** 4px per step: `steps(N)`, N = distance ÷ 4 (in SVG, lengths are viewBox units: 4px = 1 unit at the hero, 2 at banners). Keyframes change only `opacity`, whole-unit `translate`, sparkle `scale`, or `fill`.

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

**Motion.** Loops: art, the main-nav marker, live lights; one-shots: the error nudge (2 frames of `motion.duration.nudge`) and the meter fill. Animation switch: a `.tool` header button (12px pause/play icon + "Animation on"/"off") sets `data-motion="off"` on `<html>`, persisted, default on. Resting styles are frame 1 (lights lit, rare event hidden, meters full).

**Where.** Scenes; a `size.bullet` live light blinking `motion.duration.ledA` only while a job runs; the loading ellipsis; the field nudge.

**Limits.** Never on text, buttons, rows, cards, data or layout.

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
.btn-gold{height:var(--size-control-lg);padding-inline:var(--space-20);background:var(--color-action-primary);color:var(--color-text-on-action);border:var(--border-width-control) solid var(--color-action-primary-edge);box-shadow:var(--shadow-hard)}
.btn-gold:active:not(:disabled){translate:4px 4px;box-shadow:var(--shadow-none)}
```

Markup: `<a class="item" aria-current="page"><span class="cur" aria-hidden="true"></span>Overview</a>`. In `.item` rows the hidden marker keeps its slot; in cards it hangs in the left padding (`.card-title`).

**Motion.** Instant. The single "you are here" marker of the main navigation may blink (`nc-swap`, `motion.duration.bob`, `motion.easing.frame`); every other marker is still.

**Where.** Current item in nav, sidebar, contents list, tabs, filters, chips, settings sections; card hover and focus; selected table rows; sorted headers (up/down); highlighted options; disclosures (right/down); prev/next; trailing ▶ on forward actions.

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

Block meter: `<div class="meter" role="meter" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="Quota">` with 10 to 20 `<i>` (`style="--i:n"`), filled = round(value ÷ max × blocks); value in 48px numerals above. Counts (n of m, m ≤ 20) get one block per item and the count "2 of 6" 12/18 above. A meter needs a real limit, target or count, never an invented maximum; a lower-is-better metric without a target shows only its delta. In a `dl` the meter goes inside the `dd` (`<dd><span>2 of 6 complete</span><span class="meter" role="meter" …>…</span></dd>`; `dl` groups hold only `dt` and `dd`), in a table inside the `td`, in a list inside the `li`; use `span`s where only phrasing content is allowed. Hues: assign `--hue` per category or entity kind in a fixed order (cyan, violet, blue, amber, green, pink, orange, teal), the same on every screen.

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

- Dark only: the night values are the only theme; no light theme, no theme switch.
- Surfaces: ground → `subtle` (cards, sidebar, title bars) → `hover`; windows, inputs and code go darker to `raised` inside a frame.
- Text: `strong` headings, values, current items; `primary` body and cells; `secondary` meta, hints, resting nav, placeholders. Links `color.text.link`, 2px `color.border.control` underline at 4px offset.
- Status colours on callout bars, errors, bullets, meters and danger buttons, never behind text; hues under 6% of the screen.

## Typography

Hero h1, KPI and price numerals: `display`/`display`, strong. Page h1, h2, feature-grid titles: `title`/`title`, strong. h3, card titles, table heads, labels, buttons, nav: `body`/`ui`. Prose: `body`/`prose`, max `size.prose`, primary. Meta, dates, helper and error text, counts, kbd: `caption`/`caption`, secondary.

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
- **Press**: gold `translate: 4px 4px` into its shadow (`shadow.none`); other buttons and cards 2px. Error: `color.status.danger` frame + nudge.
- **Disclosures** (`<details>`, `color.surface.subtle`, 4px `color.border.control` left bar, right marker): hover `color.surface.hover`, bar `color.hue.cyan`; open: down marker.

## Layout adaptation

- Container max `size.container`, side padding `space.24` (`space.16` under `breakpoint.sm`); 12 columns, gap `space.16`, from `breakpoint.lg`; 1 column under `breakpoint.sm`.
- Shells: `size.sidebar` sidebar, content, optional `size.toc` contents list; the sidebar panel runs from header to ground strip (`min-height:100%`). Under `breakpoint.lg` the sidebar becomes a top menu, the contents list a disclosure.
- Card grids `repeat(auto-fit, minmax(200px, 1fr))`, gap `space.16`; KPI tiles 4 → 2 → 1 columns.
- Side-by-side panels share a height by sizing content (a chart grows into its panel; a short window aligns top and the next block fills the column), never by stretching an empty window; no interior over `space.64` empty. Forms max `size.form`, buttons full width under `breakpoint.sm`.

## Applying the concept

Dense screens get less, never nothing: every screen has the header dither, the marker, the ground strip and one scene.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing or home | Hero with a Window: eyebrow, 48px h1, lede, button, meta; hue card grid | Full |
| Article, product detail, about | Banner Window with title block (hue bullet + category, h1, lede, meta); dither h2s; code windows; callouts; contents list; Figures; ◀ ▶ prev/next | Strong |
| Card grid | Subtle cards, hue bar, 24px hue icon; missing images → sprites | One bar per card |
| Store grid and cart | Strip (market street); filter chips with hue bullets; totals in a Window; framed ◀ ▶ steppers. Product detail: picture window sticky or as tall as the purchase column (or Details spans both); no column ends 160px+ above its neighbour | Strip + chrome |
| Dashboard | Strip (server yard); KPI tiles per Card; panel groups under their own dither h2s; chart filling its panel | Strip, meters |
| Data table | No art; Table component: marker gutter, sort markers, status bullets | Marker only |
| Form | Window around the form; gold submit; nudge on error; steps as a meter | Chrome |
| Settings | Strip (workshop); section marker menu in a full-height sidebar; groups as Windows with title bars; danger zone in a `color.status.danger` frame | Strip + menu |
| Empty state | Vignette, one sentence, a framed button with the marker | Strong |
| Error, not found | Vignette or banner, lights off, one beacon; a Window with the message; gold "Retry" | Strong |
| Loading | Ellipsis in the pending control, a meter or static skeletons; scene stays | One loop |

## Imagery and icons

- Icons: fill-only, `currentColor`, 24px on a 12×12-unit grid (`size.icon`) or 12px on 6×6 (`size.iconSm`), drawn with `sprite()`. Category icons take their hue; UI icons `color.text.secondary`.
- Avatars: an 8×8-unit mirrored sprite hashed from the name, 4px units on `color.surface.hover`, 40px in lists, 80px on a profile.
- Missing images: the item as a sprite on `color.surface.raised` in a 2px frame, never a grey box.
- Charts: flat square bars in hues, 2px dotted gridlines or none, square legend bullets, 12px axes; lines `step-after`, 2px, square points.

## Accessibility

- Text 4.5:1 or more (body 7:1); control frames 3:1; the focus ring never removed; targets `size.touch` under coarse pointers.
- Art and markers `aria-hidden="true"`, nothing meaningful only in the art; state lives in `aria-current`, `aria-selected`, `aria-pressed`; meters `role="meter"`.
- Errors `role="alert"`; one `role="status"` region per screen. No loop frame shorter than 250ms.
