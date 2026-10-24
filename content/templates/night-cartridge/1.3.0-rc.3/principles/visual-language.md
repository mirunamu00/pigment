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
9. **Game-window chrome.** Major regions are 4px-framed windows; headings sit on a dithered rule; separators are 2px dots; progress against a real, fixed maximum (a score, a quota, steps done, capacity, items enabled out of a set) is a block meter. Why: frames, not shadows, make depth.
10. **Hue identifies, never decorates.** Each entity kind or category owns one `color.hue.*`: a 4px top bar, a `size.bullet` square, its icon fill; text and backgrounds stay neutral. Why: hues work as labels only while small.

## Never

- Radius, circles, pills; blurred shadows, glows, glass, gradients outside dither and scene bands.
- `ease`, `linear` travel, `cubic-bezier`, springs, fades, slides, hover lift, shimmer, spinners, smooth progress bars, scroll or entrance animation.
- Bold, italic, synthetic weights, `letter-spacing`, `text-transform:uppercase`, sizes outside 12/16/32/48.
- Pure white text or a pure black ground.
- Stroke icon sets, emoji, anti-aliased art, photos; text in art except a sign's real 3×5 letters (never letter-like marks); art behind text, data or forms, or in list cards.
- A square moon; a ridge with one repeating period; a background gap between sky and ridge.
- A catalogue row (same-height or evenly spaced props); a lead without its subject's features; a sprite in pieces; two identical props in one scene; the same scene on two kinds of screen; one flat tone over 25% of a scene's height; full-hue walls; a prop under the hero Window.
- These subjects: a lone cabin under a moon, a tall single tree motif, a snowy ridge banner, a capped figure with a laptop, a character walking the footer, coins; downloaded animated sprites.
- Detecting automation to skip animation, artificial delays before data, or content hidden until a script runs.
- Clipping overflow on `html` or `body`; clip the piece that overflows (`.stage`, `.ground`, a table wrapper).

## Signature elements

At the app root, once:

```css
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
:root[data-motion="off"] *,:root[data-motion="off"] *::before,:root[data-motion="off"] *::after{animation:none!important}
*,*::before,*::after{box-sizing:border-box;transition:none!important;border-radius:0!important}
```

### Pixel stage

**What.** An integer-scale pixel diorama, placed as:
- **Hero**: 480×128 units at `size.unitHero` (1920×`size.hero`), full-bleed; a 464px Window at the content's left edge (x 84–200 at 1440), props from x 216. Under `breakpoint.lg` the Window sits below, framed on four sides inside the gutter, and `size.heroSm` crops y 24–104, x `--lx`±48 at 390px (`--lx` on the svg = the lead's centre x): the lead (≤80 units wide, base y 86–100, top y ≥40) whole under 16+ units of sky; 2+ stars in y 26–34.
  The near ground rises 8–16 units over 1.5–3× the focal group's width (`near=rise(near,x0,x1,h)`), the group on it (base `at(near,x)+2`); rim: a continuous 1-unit `.sky-6` line on every top edge over a 1-unit `.haze` line; `path(doorX,doorBaseY)`: steps from the lead's door down-right to the bottom edge; its end, doorX+2×(128−doorBaseY)+2, must be in x 366–416 (move the lead or its rise); 25+ hand-placed tufts (`.far`, `.haze`) and stones (`.haze` over `.ol`), in the 120.
- **Banner**: 720×128 units at `size.unit` (1440×`size.banner`) in a Window, the title block below the art. Under `breakpoint.lg` it crops centred on the focal group (`--lx`, CSS below).
- **Strip**: 720×48 units at `size.unit` (`size.bannerSm` high), same Window and title block.
- **Vignette**: 48×48 units at `size.unit` (`size.vignette` square), 2px `color.border.control` frame; empty and error states. A scene, not an icon: sky, ridge, ground, a focal pair (figure or object with a tree, lamp or sign) half the width or more, 2–3 details.
- **Figure**: an inline prose scene filling a 2px `color.border.control` frame (sky, ridge, ground), the subject half its width or more.
- **Ground strip**: the footer's top edge on every screen (CSS below).

**Recipe.**
1. **One world per app, derived from its domain.** Ask where the product's work would happen if it were a place at night, and build that place as a street or yard: 4–6 kinds of building or structure, each with 3+ features only that domain has, plus the yard props around them (carts, crates, lamps, signs). Examples: a booking product = a station square (station house with clock face and platform canopy, ticket booth with queue rail, luggage carts, signal mast); a fitness tracker = a training ground (gym hall with skylight roof, running track with lane fence, bleachers, floodlight masts). An abstract product takes the physical place where people did the same work before software (a messaging tool: a telegraph office and its wires). Write the world and its subjects in `components.md` before drawing. Each kind of screen (home, a listing, a detail page, settings, a dashboard) has its own scene: its own lead sprite (another subject or outline; mirrored, recoloured or relit is the same) and arrangement. Detail pages of one kind (every item, article or record) share their kind's Banner, or vary it by category: each category's pages take one lead or one sign word of their own, never another category's; never a scene per record. The emblem lead (the building that names the domain most directly) is the hero's or first strip's alone; the others take other subjects of the world, 3+ features each; never the same sign pictogram on two leads.
2. Integer units (1 unit = 1 viewBox unit); `width`/`height` = units × pixel unit; never stretch, wider viewports crop.
3. **Graded layers**, back to front, each from `tops()` with a new seed (never the demo's), checkered by `edge()` into the layer behind: sky bands `color.art.sky1`…`sky6` (strip: sky5, sky6) to the haze ridge's lowest top + 2 (`sky()`, `lowest()`), ≤40% of the height, optional 1–3 clouds (`color.art.glint`, `color.art.far` underside) and a round `moon()`; `.haze` ridge tops y 36–46 (strip 14–18); `.far` ridge tops y 66–76 (strip 26–30) with 4+ `roof()`, `tree()` or domain silhouettes (masts, towers, cranes) per 360 units, varied, 30–90 apart, never bare noise; `.near` ground tops y 100–106 (strip 39–42). Flat-tone limit (Never): 32 units, strip 12.
4. **Compose in clusters, never a row** (hero, banner, strip), props placed by hand with `put()`. *Focal group*: 2–4 sprites (never one lone building), the most detailed; the lead 48–64 visible units tall, topmost non-`ol` unit to base (strip 20–26; hero 40–52); a banner unit is 2px at every width, so 48 = 96px minimum, aim 52–60, top at y ≤ 70; 4+ taller than any other prop, in front (base y 110–118; strip 44–46; hero on its rise), centred 60–100 units off the scene centre, a sprite in the central 180 (hero 90). The lead names its world by 3+ features of 2+ units (station house: clock face, platform canopy, timetable board), never a plain window-grid block. A sign plate holds one pictogram of the domain (8×8+ units with a closed outline), one real word (≤4 letters, 3×5 units, 1-unit gaps) or nothing, never a 1–2-glyph mark. *No letter-like marks*: a free-standing 1-unit vertical run 2–6 tall (alone or in 2–4s) on a wall, board or plate, or a horizontal run touching one, reads as I, T, H or F; verticals only edge a door, window or wall. A pictogram whose silhouette is a letter (a hammer is T, a wrench Y, a pin I) is replaced by a closed shape (a gear with 2-unit teeth and a 2×2 hole, a clock face, a leaf) or left out. *Supporting props*: 4–8 (strip 3–6), 2 units into the ground, 20–36 tall (strip 12–18) in 3+ heights, smaller farther out, each 4+ units wide (poles and cables are details); in a hero or banner 2+ tall verticals (tree, tower, mast; ≤8 wide, ≤44 tall) top the far ridge by 4+ at their column (`at(far,x)`) at hero x 216–376 or banner x 116–604, one within 40 units of the focal group, the other in a cluster. *Crop edges*: no prop crosses the 1440px crop (hero x 60/420, banner 38/682) or the scene's ends; at most one prop per side in the outer 10% (hero x >384, banner <102 or >618). *Clusters*: the focal group plus 1–2 clusters of 2–4 props, gaps 2–10 or overlaps inside, 60–160 units of open ground between (details only: tufts, a fence, a pole); no propless stretch over 160 units, crop edges included; no three consecutive gaps within 4 units of each other (overlaps count negative). Hero: x 216–420 holds the focal group, both verticals and one cluster 16–60 units from it; a second may sit at x 424–476 (seen at 1920, not counted at 1440). Strip props at most twice as wide as tall, half taller than wide (benches, stalls, counters get an awning, sign, shelf or person above). 3+ variants; a repeated one differs by 4+ units (lit windows, a sign, a roof).
5. Objects per rule 1: each sprite a `<g>` with `--base` (`color.hue.*` or `color.art.far/near`) using only `.base`, `.hi`, `.shade`, `.ol`; no speckle; lights, signs, stars and moon stay full. Walls over 12 units wide carry a window grid, framed door, sign, 4-unit siding or trim; a building front has a door, a lit window and an awning or sign.
6. Lights: 3–8, each 2×2+ units, `color.art.lightWarm` or `lightCold`, 3+ on props: lit windows and signs (steady), LEDs, lamps, monitors (`light()`); stars don't count; a `beacon` only on error screens.
7. **Detail pass, by hand.** `dot()` entries typed one by one (a pixel or a 2–6-unit run), never by loop or `rng()`: hero 120+, banner 60+, strip or figure 30+, vignette 15+, 3+ per prop: 12+ stars in the top two bands (strip 6) at three levels (`.star-dim`, `.star`, a `.star` with 4 `.star-dim` arms); lit window pixels (`.warm`, `.cold`) and sign glyphs; texture runs (siding, shingles, bricks, cracks, tufts); `.hi`/`.shade` edge units; 1–3 bits of life (bird, smoke, cat).
8. **Review, two rounds or more.** Render the scene alone at 2×+ (temporary page, `image-rendering:pixelated`); squint: the focal group reads first; same heights or even spacing: recompose. List three differences from the recipe and counts, fix, repeat. In place at 1440px and 390px: every quarter of a banner or strip (hero: of x 216–420) has a prop, pole or fence; at 200% no flat wall or roof; at 1x every strip prop shows its outline and a lit point.

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

Markup: `<a class="item" aria-current="page"><span class="cur" aria-hidden="true"></span>Home</a>`. In rows the hidden marker keeps its slot.

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

Block meter, only for progress against a real, fixed maximum (a quota, steps done, capacity, items enabled out of a set): `<div class="meter" role="meter" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="Quota">` with 10–20 `<i style="--i:n">`, filled = round(value ÷ max × blocks), the value above (48px numerals in a KPI tile, 12/18 caption in a row or list). Search and filter result counts have no maximum to fill: they stay 12/18 caption text. A lower-is-better metric without a target shows only its delta. It sits inside the `dd`, `td` or `li` (`span`s in phrasing content). Hue order (`--hue`, rule 10), fixed on every screen: cyan, violet, blue, amber, green, pink, orange, teal.

**Motion.** Static; meters fill one block per `motion.duration.meterStep` when they render.

**Where.** Windows: scenes, code blocks (title bar: language label + framed copy button), dialogs, settings groups, the danger zone. Dither under the header and h2s; dots between list items; hue bars on cards and KPI tiles.

**Limits.** Four-sided 4px frames on at most 3 regions per screen (scene window, code or dialog, one group). A small standalone form outside the main content (a sign-up, a contact form) is a 2px-framed `color.surface.subtle` panel opened by a section heading, never a full Window.

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

Hero h1, KPI and price numerals: `display`/`display`, strong. Page h1, h2, feature-grid titles: `title`/`title`, strong; a standalone section or small form, wherever it sits, opens with such an h2, never a 16px label. h3, card titles, table heads, labels, buttons, nav: `body`/`ui`. Prose: `body`/`prose`, max `size.prose`, primary. Meta, dates, helper and error text, counts, kbd: `caption`/`caption`, secondary.

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
- Card grids by content, one width per kind on every route: `.tiles` for an icon, a title and one line (categories); `.cards` for anything with a summary (articles, records, listings), 320px+, at most 3 columns; `.items` for an image, a name and a value, 240px+.
- KPI tiles share one row (`.kpis`, `--n` = tile count); under `breakpoint.lg` they wrap evenly, every row holding the same count or one fewer (`--n-md` = the count up to 3, else half the count rounded up: 4 → 2+2, 5 → 3+2, 6 → 3+3), never a lone tile under a full row; one column under `breakpoint.sm`.
- Side-by-side panels in a row share one height (`.panels`), bottoms level: balance by adding content to the shorter or trimming the longer (a trimmed list ends in a "View all" link); no interior over `space.64` empty. Column widths follow content: a panel holding a chart, a table or a wide list takes `.wide` (twice the share), the others one share each; panels wrap below 320px.
- Two-column layouts (an image beside its facts and actions, a form beside a summary): the shorter column sticks under the header (`position:sticky`) or grows, so neither column ends 160px+ above the other.
- **Controls sharing a row share one height.** Buttons, inputs, selects, chips and steppers side by side (an input with its submit, a submit with its cancel or reset, a toolbar, dialog actions) are all `size.control` high, frame included (`box-sizing:border-box`, set by `height`, never by padding), so their tops and bottoms are level to the pixel; the gold button joins at `size.control` and keeps `shadow.hard`. `size.controlLg` is for a gold button alone on its row (hero, a lone submit, an empty state); `size.controlSm` only where every control in the row is small (table row actions, outside `.controls`). Wrap every other row of controls in `.controls`.
- Single-column forms max `size.form`, buttons full width under `breakpoint.sm`. A form window wider than 720px puts short fields in two `.fields` columns, long ones across both, an image field beside the first row or above; no column ends `space.64`+ above the others.

```css
.tiles,.cards,.items,.kpis{display:grid;gap:var(--space-16)}
.tiles{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.cards{grid-template-columns:repeat(auto-fill,minmax(min(100%,max(320px,(100% - 2 * var(--space-16)) / 3)),1fr))}
.items{grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr))}
.kpis{grid-template-columns:repeat(var(--n),minmax(0,1fr))}
.fields{display:grid;gap:var(--space-20) var(--space-24);grid-template-columns:1fr 1fr}.fields>.wide{grid-column:1/-1}
.panels{display:flex;flex-wrap:wrap;align-items:stretch;gap:var(--space-16)}.panels>*{flex:1 1 320px;display:flex;flex-direction:column}.panels>.wide{flex-grow:2}
.controls{display:flex;flex-wrap:wrap;align-items:flex-end;gap:var(--space-12)}.controls :is(button,input:not([type=checkbox],[type=radio]),select,[role=button],.btn-gold){height:var(--size-control)}
@media (max-width:1023px){.kpis{grid-template-columns:repeat(var(--n-md),minmax(0,1fr))}}
@media (max-width:599px){.fields,.kpis{grid-template-columns:1fr}}
```

## Applying the concept

Dense screens get less art, never smaller type, never nothing: every screen has the header dither, the marker, the ground strip and one scene.

|Context|What it uses|How strongly|
|---|---|---|
|Landing or home|Hero with a Window: eyebrow, 48px h1, lede, button, meta; hue card grid|Full|
|Article, product detail, about|Banner Window with title block (hue bullet + category, h1, lede, meta); dither h2s; code windows; callouts; contents list; Figures; ◀ ▶ prev/next|Strong|
|Card grid|Subtle cards, hue bar, 24px hue icon; missing images → sprites per Imagery|One bar per card|
|Catalogue, listing and cart|Strip; `.items` grid; filter chips with hue bullets; item card category labels carry their 12px hue icon; result counts as captions; a cart or summary's totals in a Window; quantities as framed ◀ ▶ steppers in a `.controls` row. Item detail: its kind's Banner per Pixel stage step 1, two columns per Layout adaptation|Strip + chrome|
|Dashboard|Strip; KPI tiles per Card in `.kpis`; panel groups under their own dither h2s; chart per Imagery, under the KPIs' weight|Strip, meters|
|Data table|No art; Table component|Marker only|
|Form|Window around the form; gold submit; nudge on error; steps as a meter|Chrome|
|Settings|Strip; marker menu in a full-height sidebar; titled Windows as wide as the scene window; danger zone in a `color.status.danger` frame|Strip + menu|
|Empty state|Empty state component (Vignette)|Strong|
|Error, not found|Vignette or banner, lights off, one beacon; a Window with the message; gold "Retry"|Strong|
|Loading|Per Motion; the scene stays|One loop|

## Imagery and icons

- Icons: fill-only `currentColor` `sprite()`s, 24px on a 12×12-unit grid (`size.icon`) or 12px on 6×6 (`size.iconSm`); category icons in their hue, UI icons `color.text.secondary`.
- Avatars, one treatment in every app: 1–2 pixel initials in `color.text.strong` (16px on a 40px list square; 32px on an 80px profile square) on a name-hashed `color.hue.*` mixed 55% into `color.art.sky1`; never monochrome; never change copy.
- Missing images: the item drawn as a sprite (`item()`) on `color.surface.raised` in a 2px-framed `.pic` window, never a grey box, in grids and on detail at every width.
  1. **One silhouette.** One 4-connected region with `ol` only around its outside; light from the top left (`hi` on top and left edges, `shade` on bottom and right). Draw the item in the view that shows its defining parts apart from the body: front-on and laid out, with limbs, handles, sleeves, spouts, legs or straps extended outward as far as the real object lets them; never tucked, folded or hanging down against the body. A part that is attached in the real object touches the body fill against fill along its whole joint (never `ol` or background between them) and angles away from the body: 1 unit outward every 1–3 rows, and its far end lies 3+ units outside the body's own width (the body measured without its parts, on the joint's row); never a straight bar parallel to the body with background beside it, never a part that only flares at the hem or base. A part on the body's side (sleeve, arm, handle, strap) leaves the body in the top half of the body's height, so the joint and the background notch below it show there, not only at the hem or base. Background shows only where the real object is open (inside a loop, 4×3+ units; between parts below their joint); joined parts never show a gap.
  2. **Defining parts.** 2–3, the ones you would name to describe the object; solid parts 2+ units thick; the part that names it spans 30–60% of the width; the sprite keeps the real object's width ÷ height within ±0.2.
  3. **Size: 40–50% of the window, checked.** Every item sprite is 19–23 visible units wide (count `hi`, `base`, `shade` and lights, never `ol`, which vanishes on the window), and its visible ink spans 40–50% of the `.pic` window's inner width (inside frame and padding) at the narrowest and the widest width its grid reaches and on the detail page. `item()` trims empty edges and sets `--w` (drawn columns) and `--v` (visible columns); `.pic` sets the unit to floor(inner width ÷ 2 ÷ `--v`). An item taller than wide (a bag, a bottle, a lamp, a figure) keeps 19–23 visible columns and gets more rows: never draw it narrower, never cap the sprite's height (no `max-height`, no fixed-height window that scales it down); the window grows to fit it. Check from the code, never by eye: for each sprite and each window width, `pct()` gives visible columns × unit ÷ inner width; a row outside 40–50% is redrawn (fewer than 19 visible columns: widen the body and its defining parts; floor rounding under 40% at a narrow window: one visible column more or fewer, still 19–23) and checked again.
     ```js
     function item(v){let t=v.rows;const k=t.map(r=>/[^.]/.test(r)),ink=t.filter(r=>/[^.]/.test(r)),l=Math.min(...ink.map(r=>r.search(/[^.]/))),e=Math.max(...ink.map(r=>r.replace(/\.+$/,"").length)),w=e-l;t=t.slice(k.indexOf(true),k.lastIndexOf(true)+1).map(r=>r.padEnd(e,".").slice(l,e));const lit=t.filter(r=>/[^.o]/.test(r)),vis=Math.max(...lit.map(r=>r.replace(/[.o]+$/,"").length))-Math.min(...lit.map(r=>r.search(/[^.o]/)));return `<svg viewBox="0 0 ${w} ${t.length}" style="--w:${w};--v:${vis};--base:${v.base}" aria-hidden="true">${sprite(t,v.map,0,0)}</svg>`;}
     const pct=(name,v,win)=>{const px=Math.floor(win/2/v)*v,p=Math.round(px/win*100);return `${name} | ${v} | ${px} | ${win} | ${p}%${v<19||v>23||p<40||p>50?" REDRAW":""}`;};
     ```
     ```css
     .pic{container-type:inline-size}.pic>svg{display:block;margin:auto;width:calc(round(down,50cqi/var(--v),1px)*var(--w));height:auto;shape-rendering:crispEdges}
     ```
  4. **Set-mates** (items in one grid or category) differ in outline at 1x, never only in hue or an inner detail: at least two of length, width ÷ height (by 0.2+), openings and part count differ.
  5. **Name test, concretely.** Fill the sprite's whole silhouette with one colour (cover every inner detail, light and hue) and look at it at 1x: each defining part from step 2 is still a separate lobe sticking out of the body's outline, and the shape is nameable as itself, not as a set-mate or another object. A defining part that does not stick out of the outline is redrawn extended per step 1; then check again.
- Charts: flat square bars in hues mixed 55% into `color.surface.subtle`, 2px dotted gridlines or none, square legend bullets; bars ≤40% of their slot; the panel caption sits at its top padding, the plot right under it, at most `size.chart` high; a 12px y-axis with 3–5 values on the gridlines; lines `step-after`, 2px, square points.

## Accessibility

- Text 4.5:1 or more (body 7:1); control frames 3:1; the focus ring never removed; targets `size.touch` under coarse pointers.
- Art and markers `aria-hidden="true"`, nothing meaningful only in the art; state lives in `aria-current`, `aria-selected`, `aria-pressed`.
- Errors `role="alert"`; one `role="status"` region per screen. No loop frame shorter than 250ms.
