## Character

A near-black instrument panel, quiet and exact: graphite greys, hairlines and pills, the product's own UI lit on a
stage, and a private dialect of dot glyphs and isometric hairline blueprints for what the machine is doing.

## The ten rules that define this look

1. **Graphite ground, one grey step per level.** `color.surface.default` covers at least 80% of every screen; depth
   climbs `subtle` → `card` → `raised` → `hover` → `press`, each level with a 1px hairline. Why: the ground is the panel.
2. **Four text steps.** `color.text.primary` headings and values, `color.text.body` running text (never primary for
   paragraphs), `color.text.secondary` meta and resting nav, `color.text.tertiary` mono labels. Why: hierarchy is tone.
3. **One indigo, at most 3 uses per screen.** `color.accent.default` only for checked controls, the selected-row bar
   and one send button; `color.focus.ring` for focus. The primary action is the inverse pill (`color.action.primary`),
   never indigo. Status hues only as 16px glyphs, 6px dots, chart marks and 7% tints. Why: color is information.
4. **Hairlines, not shadows.** Edges are `border.width.hairline` in `color.border.subtle` or `default`; drawings
   `border.width.drawing`. Panels lift with `elevation.raised` (ring plus 1px top highlight); only menus, dialogs and
   toasts take `elevation.popover`. Why: the top highlight makes panels look machined.
5. **Pills for controls, 8px for panels.** Buttons, chips, nav and search `radius.full`; cards, panels, stages, menus
   and code `radius.md`; inputs `radius.sm`; dialogs `radius.lg`; nothing else above `radius.xl`. Why: two shapes only.
6. **Inter at 510 and 590, tight.** Content headings 510, app-screen headings 590; `font.tracking.display`
   at 32px and up; sentence case; display lines at most 2. Mono (`font.family.mono`, `font.size.caption`, uppercase)
   only for labels, numbers in captions, dates, IDs, code and figure captions. Why: the voice.
7. **Show the product on a stage.** The main image of a screen is this product's own UI on a spotlit stage that fades
   into the ground (signature 1); one lit stage per viewport. Why: the UI proves itself.
8. **The machine speaks in dots.** Work in progress is the 5x5 dot glyph stepping through frames; working text
   shimmers; live data pulses. Only while something really runs. Why: one honest voice for working.
9. **Explain with blueprints.** Concepts, empty and error states are isometric 0.5px hairline blueprints or spec
   plates with a mono "FIG" caption: no fills, no color, one status point at most. Why: drawings as precise as the UI.
10. **Hairline openers, quick states.** Sections open with a full-width hairline and a split opener or two-tone
    statement; state changes 100 to 160ms, entries 300 to 700ms; every loop stops on a readable frame under reduced
    motion. Why: fast feedback, calm pages.

## Never

- A colored, gradient, glass or textured page ground; section bands; a dark band inside a light page.
- Pure white running text; `color.text.tertiary` for anything essential.
- Indigo buttons, headings, links or fills beyond rule 3; status colors filling buttons, cards or rows.
- Weight 700 or more; all-caps, title-case or italic headings; mono paragraphs or mono buttons.
- Spinners, progress rings, pulsing skeleton blocks, bouncing loaders; any loop for work that is not running;
  artificial delays to show a working state.
- Shadows on resting cards, rows or buttons; borders over 2px; radii between `radius.xl` and a pill.
- Hover scale-up, parallax, text fading up on scroll, bounce or overshoot easing.
- Stock photos, 3D renders, emoji, mascots, people illustrations, multicolor icons; any reference artwork, logo
  (a circle cut by parallel diagonal stripes, or any mark built that way), copy or product names.
- A stage behind text, a form or a table, or inside a bordered card; frames nested more than two deep (card → stage →
  window); a stage or plate holding only an icon.
- An overlay above a native control: no stretched `::after` or link over a checkbox, radio, switch, button or
  field.
- Content hidden until script runs; detecting automation, test runners or headless browsers; changing motion or
  config to review your work.
- Sideways page scroll at 390px; exclamation marks or emoji in copy; copy that explains the design system or how a
  drawing was made.

## Signature elements

Build all six as reusable pieces first; their content is original, written for the product.

### 1. Spotlit product stage

**What.** A panel (`radius.md`, 1px `color.border.subtle`) whose ground carries a radial light from its top edge:
`color.stage.light` at the edge center, `color.stage.mid` at 22%, `color.stage.ground` by 62%. A window
(`color.stage.window`, `elevation.raised`, top corners `radius.md`) is inset `space.56` from top and sides
(`space.24` under `breakpoint.md`), runs off the bottom edge and fades over its last 30%. It holds this product's real
UI from its own components at true scale (list, detail, chart); an optional ghost window sits behind. **Quiet stage**:
peak `color.stage.mid`, padding `space.24` all round, window fully rounded and unfaded.

**Recipe.**

```html
<figure class="stage"><div class="stage-window"><!-- this product's UI --></div></figure>
<p class="fig"><span class="mono-label">FIG 0.1</span><b>Item name</b> One fact about it.</p>
```

```css
.stage{position:relative;isolation:isolate;overflow:hidden;margin:0;padding:var(--space-56) var(--space-56) 0;
  border:var(--border-width-hairline) solid var(--color-border-subtle);border-radius:var(--radius-md);
  background:radial-gradient(120% 70% at 50% 0%,var(--color-stage-light) 0%,var(--color-stage-mid) 22%,var(--color-stage-ground) 62%);}
.stage--below{background:radial-gradient(120% 70% at 50% 100%,var(--color-stage-light) 0%,var(--color-stage-mid) 22%,var(--color-stage-ground) 62%);}
.stage-window{position:relative;min-height:240px;background:var(--color-stage-window);box-shadow:var(--elevation-raised);
  border-radius:var(--radius-md) var(--radius-md) 0 0;
  -webkit-mask-image:linear-gradient(to bottom,#000 70%,transparent);mask-image:linear-gradient(to bottom,#000 70%,transparent);}
.stage-ghost{position:absolute;inset:var(--space-56) var(--space-56) 0;translate:32px 24px;z-index:-1;opacity:var(--opacity-ghost);filter:blur(2px);}
.stage--quiet{padding:var(--space-24);background:radial-gradient(120% 90% at 50% 0%,var(--color-stage-mid),var(--color-stage-ground) 70%);}
.stage--quiet .stage-window{min-height:0;border-radius:var(--radius-md);-webkit-mask-image:none;mask-image:none;}
.stage.is-armed .stage-window{transform:translateY(var(--motion-distance-settle-from)) scale(1.05);filter:blur(2px);
  transition:transform var(--motion-duration-settle) var(--motion-easing-settle),filter var(--motion-duration-settle) var(--motion-easing-settle);}
.stage.is-armed.is-in .stage-window{transform:none;filter:none;}
.fig{display:grid;gap:var(--space-4);margin-top:var(--space-16);font-size:var(--font-size-body);color:var(--color-text-secondary);}
.fig b{font-weight:var(--font-weight-medium);color:var(--color-text-primary);}
@media (max-width:767px){.stage{padding:var(--space-24) var(--space-24) 0;}.stage-ghost{display:none;}}
```

**Motion.** The frame is static. Its content may live: new rows fade in (`motion.duration.enter`), a caret blinks, one
dot glyph runs. Landing and feature sections only: script adds `is-armed` on mount (never under reduced motion) and `is-in` at 20% in view, once.
Without script or with reduced motion: final.

**Where.** Landing hero and feature sections (lit); quiet: dashboard main chart (`size.stageMini` tall), product
detail image (the item's spec figure), a settings preview, empty and error states.

**Limits.** One lit stage per viewport, at most two quiet ones; never a page background; the window spans at least 60% of the
stage width. A stage sits directly on the ground or in one hairline grid cell, never inside a bordered card: when a panel's main content is a quiet stage, drop the panel's border and
fill so the stage is the panel, its title above it. Panels in one row use `align-items:start`; no empty band under a
caption. A demo window's sample text appears nowhere else on the screen (tests look strings up) and it is `inert`
with `aria-hidden="true"`; a functional window (a real chart) stays accessible.

### 2. Dot-matrix glyph

**What.** 25 dots (r 1 on a 3-unit pitch in a 15-unit box) in `color.glyph.dot`: lit dots at full opacity, unlit at
`opacity.dotOff`. Frames switch with no tween. Sizes `size.glyphXs` to `size.glyphXl`: scale the box, never the dot
count. Patterns are data, 25-character masks (`#` lit). Three loops: **scan** (working, `motion.duration.glyph`),
**rise** (syncing, `motion.duration.glyphSlow`), **core** (a background job, `motion.duration.glyphCore`). Still
frames: **done** (all lit for `motion.duration.done`, then the 16px check icon), **error** (an X in
`color.status.danger`), **empty**.

**Recipe.**

```js
const M=(on)=>Array.from({length:25},(_,i)=>on(i%5,Math.floor(i/5))?"#":".").join("");
const cheb=(x,y)=>Math.max(Math.abs(x-2),Math.abs(y-2));
const PATTERN={
  scan:{ms:"var(--motion-duration-glyph)",frames:[3,4,3,2,1,0,1,2].map(k=>M(x=>x===k)),rest:7},
  rise:{ms:"var(--motion-duration-glyph-slow)",frames:[0,1,2,3,4,5,6,7,8,9].map(t=>M((x,y)=>4-y<Math.round(2.5+2.5*Math.sin(t*0.628-x*0.8)))),rest:5},
  core:{ms:"var(--motion-duration-glyph-core)",frames:[0,1,2,2,1,0,0,0].map(r=>M((x,y)=>r<2?cheb(x,y)<=r:cheb(x,y)!==1)),rest:1},
  done:{frames:[M(()=>true)]}, error:{frames:[M((x,y)=>x===y||x===4-y)]},
  empty:{frames:[M((x,y)=>(x%4===0&&y%4===0)||(x===2&&y===2))]},
};
function dotGlyph({frames,ms,rest=0}){
  const dots=frames.map((f,k)=>[...f].map((c,i)=>`<circle cx="${k*15+1.5+3*(i%5)}" cy="${1.5+3*Math.floor(i/5)}" r="1"${c==="#"?' class="on"':""}/>`).join("")).join("");
  return `<svg class="dm${frames.length>1?" dm--run":""}" viewBox="0 0 15 15" aria-hidden="true" style="--dm-n:${frames.length};--dm-rest:${rest};--dm-dur:${ms||"0s"}"><g class="dm-strip">${dots}</g></svg>`;
}
```

```css
.dm{display:inline-block;flex:none;width:var(--size-glyph-sm);height:var(--size-glyph-sm);
  overflow:hidden;vertical-align:middle;color:var(--color-glyph-dot);}
.dm circle{fill:currentColor;opacity:var(--opacity-dot-off);} .dm circle.on{opacity:1;}
.dm-strip{transform:translateX(calc(var(--dm-rest) * -15px));}
.dm--run .dm-strip{animation:dm-step var(--dm-dur) steps(var(--dm-n)) infinite;}
@keyframes dm-step{from{transform:translateX(0);}to{transform:translateX(calc(var(--dm-n) * -15px));}}
.dot-field{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:var(--opacity-dot-field);
  background:radial-gradient(circle,var(--color-glyph-dot) 1px,transparent 1.5px) 0 0/12px 12px;
  -webkit-mask-image:linear-gradient(90deg,#000,transparent 30% 70%,#000);mask-image:linear-gradient(90deg,#000,transparent 30% 70%,#000);}
.dot-meter{display:inline-flex;gap:var(--space-4);} .dot-meter i{width:var(--space-6);height:var(--space-6);border-radius:var(--radius-full);background:var(--color-glyph-dot);opacity:var(--opacity-dot-off);}
.dot-meter i.on{opacity:1;background:var(--meter,var(--color-glyph-dot));}
```

**Motion.** `steps()` loop, infinite while the work runs, removed when it ends. The `rest` frame of the pattern data
shows without script and under reduced motion.

**Where.** Button waiting on a real request: 12px scan (Button). Panel or route loading: 16px scan plus a gerund,
centered, after 300ms. Syncing row: 12px rise in the status cell. Background job: 16px core in a toast, then done,
then the check. Empty and error states: 48px stills. Any 1-to-5 level (password strength): the dot meter. Closing
sections and newsletter: the dot field.

**Limits.** At most 3 running glyphs visible; never decorative or idle. The dot field stays at `opacity.dotField`,
masked to the outer 30% each side, never under body text.

### 3. Isometric hairline blueprint

**What.** Slabs and boxes in 2:1 isometric with rounded vertices, drawn in `border.width.drawing` strokes: outlines
`color.blueprint.front`, the top-face seam `color.blueprint.back` with round caps, faces filled
`color.blueprint.face` so stacked slabs hide what is behind them, a soft shadow under each slab. Vertex rounding is
about 8% of the half-width (5% at the sides): machined, not pillowy. Marks: a 5x5 dot grid on a top face
(`color.blueprint.mark`), dashed connectors with chevrons for flow. Each drawing sits on the ground, a mono "FIG 0.n"
caption above-left, a 15px/510 title and a secondary line below. Subjects: abstract parts of this product's system
(layers, queues, ports, stacks), never objects, logos or people.

**Recipe.**

```js
const f=(n)=>+n.toFixed(2);
function roundPoly(p,rs){return p.map(([x,y],i)=>{const[px,py]=p[(i+p.length-1)%p.length],[nx,ny]=p[(i+1)%p.length];
  const a=rs[i]/Math.hypot(px-x,py-y),b=rs[i]/Math.hypot(nx-x,ny-y);
  return `${i?"L":"M"}${f(x+(px-x)*a)},${f(y+(py-y)*a)}Q${x},${y} ${f(x+(nx-x)*b)},${f(y+(ny-y)*b)}`;}).join("")+"Z";}
// Slab: top vertex (cx,y), half-width w, side height h; the top face is w tall. i = lift level (0 = bottom).
function slab(cx,y,w,h,{i=0,dots=false}={}){
  const r=w*0.08,s=w*0.05,q=w/2;
  const body=roundPoly([[cx,y],[cx+w,y+q],[cx+w,y+q+h],[cx,y+w+h],[cx-w,y+q+h],[cx-w,y+q]],[r,s,s,r,s,s]);
  const seam=`M${f(cx-w+s)},${f(y+q+s/2)}L${f(cx-s)},${f(y+w-s/2)}Q${cx},${y+w} ${f(cx+s)},${f(y+w-s/2)}L${f(cx+w-s)},${f(y+q+s/2)}`;
  let mark="";if(dots){for(let j=0;j<25;j++)mark+=`<circle cx="${f(w*(0.18+0.05*(j%5)))}" cy="${f(w*(0.18+0.05*Math.floor(j/5)))}" r="${f(w*0.012)}"/>`;
    mark=`<g class="bp-mark" transform="matrix(1 .5 -1 .5 ${cx} ${y})">${mark}</g>`;}
  return `<g class="bp-slab" style="--i:${i}"><path class="bp-shadow" d="${body}"/><path class="bp-body" d="${body}"/><path class="bp-seam" d="${seam}"/>${mark}</g>`;
}
// Flow: marching dashes plus 3 chevrons on the same path.
const link=(d)=>`<path class="bp-link" d="${d}"/>`+[0,1,2].map(k=>`<path class="bp-chev" style="--k:${k};offset-path:path('${d}')" d="M-2,-3L1,0L-2,3"/>`).join("");
// Demo shape only (a 3-layer stack, viewBox 0 0 240 200); compose your own. Draw back and bottom first.
const demo=[2,1,0].map(k=>slab(120,20+k*28,80,12,{i:2-k,dots:k===0})).join("");
```

```css
.bp{display:block;overflow:visible;fill:none;}
.bp path{vector-effect:non-scaling-stroke;stroke-width:var(--border-width-drawing);}
.bp-shadow{fill:var(--color-blueprint-face);stroke:none;color-interpolation-filters:sRGB;filter:drop-shadow(0 8px 12px var(--color-blueprint-shadow));}
.bp-body{fill:var(--color-blueprint-face);stroke:var(--color-blueprint-front);}
.bp-seam{stroke:var(--color-blueprint-back);stroke-linecap:round;}
.bp-mark{fill:var(--color-blueprint-mark);}
.bp .bp-link{stroke:var(--color-blueprint-mark);stroke-width:var(--border-width-hairline);stroke-dasharray:2 4;animation:bp-dash var(--motion-duration-dash) linear infinite;}
.bp-chev{stroke:var(--color-blueprint-front);offset-distance:calc(var(--k) * 33% + 16%);animation:bp-flow var(--motion-duration-flow) linear calc(var(--k) * var(--motion-duration-flow) / -3) infinite;}
.bp-slab{transition:transform var(--motion-duration-settle) var(--motion-easing-settle) calc(var(--i) * 60ms);}
.bp.is-lifted .bp-slab{transform:translateY(calc(var(--i) * -1 * var(--motion-distance-lift)));}
@keyframes bp-dash{to{stroke-dashoffset:var(--motion-distance-dash);}}
@keyframes bp-flow{from{offset-distance:0%;opacity:0;}20%,80%{opacity:1;}to{offset-distance:100%;opacity:0;}}
```

Slabs in a stack sit 16px apart (offset = h + 16). Side by side, draw the farther (smaller y) first. Half-widths 40
to 80; side heights 12 to 120.

**Motion.** Every connector marches (`motion.duration.dash`, constant speed, infinite; reverse flow:
`animation-direction:reverse`) with chevrons riding it (`motion.duration.flow`), the illustrative one in an about or
landing opener row included. Only a stopped connection (disconnected, broken) is static. On card hover, or once at 30%
in view on landing pages, script adds `is-lifted`: slabs part by `motion.distance.lift` per level (at most 3),
staggered 60ms. Reduced motion: dashes and chevrons still (chevrons evenly spaced), slabs at rest.

**Where.** Landing or about page: a row of three captioned blueprints at `size.blueprintLg` opening a section.
Empty states: a stack at `size.blueprintMd`, `opacity:0.8`. Integrations: two slabs and a connector, marching while
connected. Order or setup confirmation: the parts joined. Error and not-found: a broken connector ending in one 4px
`color.status.danger` point. Plan cards: 1 to 3 slabs by tier at `size.blueprintSm`. Dashboard first run:
`size.blueprintSm`, static.

**Limits.** At most 3 per screen, one animated; never smaller than `size.blueprintSm`; never in table cells, fields,
buttons or toasts; no colored fills.

### 4. Spec plate

**What.** The stand-in for every missing image: a tile (4:3 in grids, 16:9 featured) with one generative hairline
figure picked by the item's id (orbits, fan, dot lattice, dot helix) and a mono caption bottom-left ("FIG 03", the
category or short code). Same id, same figure everywhere. The figure's bounding box is centred, inside the central 78%.

**Recipe.**

```js
function specFigure(id){ // inner SVG for viewBox 0 0 160 120; uses f() from the blueprint recipe
  let h=2166136261;for(const c of String(id))h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;
  const kind=h%4,rnd=()=>(h=Math.imul(h^(h>>>13),1597334677)>>>0)/4294967296;let o="";
  if(kind===0)for(let i=0;i<5;i++){const rx=16+11*i;o+=`<ellipse class="${i%2?"pf-b":"pf-f"}" cx="80" cy="60" rx="${rx}" ry="${f(rx*0.42)}" transform="rotate(${f(-24+48*rnd())} 80 60)"/>`;}
  if(kind===1){const l=66+12*rnd();for(let i=0;i<17;i++){const a=(-160+i*8.75)*Math.PI/180;o+=`<line class="${i%4?"pf-b":"pf-f"}" x1="80" y1="96" x2="${f(80+l*Math.cos(a))}" y2="${f(96+l*Math.sin(a))}"/>`;}}
  if(kind===2){const p=rnd()*6;for(let i=0;i<11;i++)for(let j=0;j<7;j++)o+=`<circle class="${6-j<2.5+2.5*Math.sin(i*0.6+p)?"pf-on":"pf-off"}" cx="${20+12*i}" cy="${24+12*j}" r="1.2"/>`;}
  if(kind===3){const p=rnd()*6;for(let i=0;i<24;i++)for(const s of[1,-1]){const t=i*0.42+p,z=Math.cos(t)*s;o+=`<circle class="${z>0?"pf-on":"pf-off"}" cx="${f(12+i*5.9)}" cy="${f(60+28*Math.sin(t)*s)}" r="${f(1+0.8*z)}"/>`;}}
  return o;
}
```

```css
.plate{position:relative;display:grid;place-items:center;aspect-ratio:4 / 3;overflow:hidden;background:var(--color-surface-subtle);
  border:var(--border-width-hairline) solid var(--color-border-subtle);border-radius:var(--radius-md);}
.plate--wide{aspect-ratio:16 / 9;}
.plate svg{width:78%;height:78%;}
.plate :is(ellipse,line){fill:none;stroke-width:var(--border-width-drawing);vector-effect:non-scaling-stroke;}
.pf-f{stroke:var(--color-blueprint-front);} .pf-b{stroke:var(--color-blueprint-mark);}
.pf-on{fill:var(--color-blueprint-front);} .pf-off{fill:var(--color-blueprint-mark);opacity:var(--opacity-dot-off);}
.plate .mono-label{position:absolute;left:var(--space-12);bottom:var(--space-8);}
```

**Motion.** Static. Hovering its card changes the card only.

**Where.** Product cards, product detail (the same figure larger, on a quiet stage), blog post cards, the featured
post (`plate--wide`), article image placeholders (caption below as a `.fig`).

**Limits.** Only where there is no real image; real photos keep their content at `radius.md`. The svg is
`aria-hidden="true"`; the item name stays in text. FIG captions and `.fig` lines describe the item (name, category, a
fact about it), never the drawing, the placeholder or the system: no "spec figure", "drawn from the id" or "until
photography is ready".

### 5. Working shimmer and live edges

**What.** Motion for work in progress. A band sweeps a one-line status label ("Checking name") from
`color.text.secondary` to `color.text.primary`. A live edge: a 1px border gradient sliding around a running item's
badge or toast. A live dot: 6px `color.status.success` with a ring
that grows and fades. A caret: a 1px bar blinking in hard steps. Running-log entries fade in.

**Recipe.**

```css
.shimmer{background:linear-gradient(90deg,var(--color-text-secondary) 40%,var(--color-text-primary) 50%,var(--color-text-secondary) 60%) 100% 0/300% 100%;
  color:transparent;-webkit-background-clip:text;background-clip:text;animation:shimmer var(--motion-duration-shimmer) linear infinite;}
@keyframes shimmer{0%{background-position:100% 0;}75%,100%{background-position:0 0;}}
.live-edge{border:var(--border-width-hairline) solid transparent;animation:edge var(--motion-duration-pulse) ease infinite;
  background:linear-gradient(var(--color-surface-raised),var(--color-surface-raised)) padding-box,
    linear-gradient(90deg,var(--color-border-strong),var(--color-text-secondary),var(--color-border-strong)) 0 0/120px 100% border-box;}
@keyframes edge{to{background-position:0 0,120px 0;}}
.pulse{position:relative;display:inline-block;width:var(--space-6);height:var(--space-6);border-radius:var(--radius-full);background:var(--color-status-success);}
.pulse::after{content:"";position:absolute;inset:-5px;border-radius:inherit;background:inherit;opacity:0;animation:pulse var(--motion-duration-pulse) ease-out infinite;}
@keyframes pulse{0%{transform:scale(.375);opacity:.7;}60%,100%{transform:scale(1);opacity:0;}}
.caret{display:inline-block;width:1px;height:1em;vertical-align:text-bottom;background:var(--color-text-primary);animation:caret var(--motion-duration-caret) steps(1) infinite;}
@keyframes caret{50%{opacity:0;}}
.turn-in{animation:turn-in var(--motion-duration-enter) var(--motion-easing-enter) both;}
@keyframes turn-in{from{opacity:0;}}
```

**Motion.** Loops as above, infinite while running; removed the moment the work ends (the label settles to
`color.text.secondary`, the edge to `color.border.strong`). Reduced motion: no sweep, slide or ring; the dot and caret
stay visible.

**Where.** Async field checks ("Checking"); job logs (current line shimmers, finished lines turn in); a processing
row's status badge (live edge); "Live" beside streaming data (stale: `color.icon.idle` dot, no ring); system status
(pulse when operational, a still `color.status.urgent` dot in an incident); a background-job toast title.

**Limits.** Never on headings, buttons, static labels or placeholder content; at most 2 shimmering lines and 1 live
edge per screen.

### 6. Split opener, two-tone voice, mono figures

**What.** A section opens with a full-width hairline, then a headline (`font.size.h2`, 510, at most 2 lines) in the
left half and, from the 50% line, a description (`font.size.lead`, 400, `color.text.body`, max 30ch) with a small
secondary link ending in "→" or "+". A two-tone statement sets a lead sentence in `color.text.primary` that continues
in `color.text.secondary` at the same size and weight. Mono labels number figures ("FIG 0.2"), steps ("02 / 04") and dates.

**Recipe.**

```css
.opener{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-32);padding-top:var(--space-160);
  border-top:var(--border-width-hairline) solid var(--color-border-subtle);}
.opener h2{margin:0;font:var(--font-weight-medium) var(--font-size-h2)/var(--font-line-height-display) var(--font-family-sans);
  letter-spacing:var(--font-tracking-display);color:var(--color-text-primary);text-wrap:balance;}
.opener p{margin:0;max-width:30ch;font-size:var(--font-size-lead);line-height:var(--font-line-height-lead);letter-spacing:var(--font-tracking-lead);color:var(--color-text-body);}
.two-tone{color:var(--color-text-secondary);} .two-tone b{font-weight:inherit;color:var(--color-text-primary);}
.mono-label{font:var(--font-weight-regular) var(--font-size-caption)/var(--font-line-height-caption) var(--font-family-mono);
  text-transform:uppercase;color:var(--color-text-tertiary);font-variant-numeric:tabular-nums;}
.screen-head{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-32);align-items:end;padding-block:var(--space-32) var(--space-24);
  border-bottom:var(--border-width-hairline) solid var(--color-border-subtle);}
@media (max-width:767px){.opener,.screen-head{grid-template-columns:1fr;gap:var(--space-16);}.opener{padding-top:var(--space-96);}
  .opener h2{font-size:var(--font-size-h3);}.opener p{font-size:var(--font-size-prose);}}
```

**Motion.** Static: text never fades or rises.

**Where.** Content sections (opener; a centered `font.size.display` closing statement with two pills). App screens:
`.screen-head`, mono label and h1 (`font.size.lead`, 590) left, a one-line two-tone summary (`font.size.body`) right.
Settings groups, long forms, timelines.

**Limits.** One two-tone statement per section, 1 to 3 sentences; one headline of `font.size.h2` or larger per
viewport.

## Color use

- Surfaces: sidebar, dialog `color.surface.subtle`; cards, inputs, plates `card`; menus, toasts, tooltips `raised`;
  code `color.surface.code`; active sidebar row and row hover `color.surface.tint`.
- Text per rule 2. Inline links `color.text.primary` with a 1px underline in `color.icon.idle`, 3px offset.
- Status: a 6px dot or 14px icon in the hue plus a `color.text.body` label; only danger colors text. Banners: hairline
  box with a `color.status.*Tint` wash.
- Charts: `color.chart.mark`, others `muted`, one series `highlight`, at most 3 `color.chart.grid` lines, no frame.
- **Appearance.** Dark is canonical (New project, step 1). Stages, blueprints, plates and glyphs switch with their
  tokens; nothing stays dark in light.

## Typography

Size / line height, weight, tracking, color (sizes are `font.size.*`, line heights `font.lineHeight.*`, tracking `font.tracking.*`):

- Landing h1: `clamp(var(--font-size-h3), 6vw, var(--font-size-h1))` / display, 510, display, primary.
- Content h1 and section h2: `clamp(var(--font-size-h3), 5vw, var(--font-size-h2))` / display, 510, display. Closing statement: `display` size.
- App-screen h1: `lead` / heading, 590, lead. Product name, KPI value: `h3` / heading, 510, display, tabular.
- Lead and opener text: `lead` / lead (`prose` under `breakpoint.md`), 400, lead, body color.
- Article: body `prose` / prose, 400, body color; h2 `lead`, h3 `title`, both 590 / heading.
- Body and panel text `body` / body, 400. Panel, card and group titles `body` / ui, 590 app or 510 content, primary.
- Inputs and sidebar `dense` / ui. Buttons, nav, table cells, meta `small` / ui (510 controls, 400 cells).
- Mono label, table head, timestamp: mono `caption` / caption, 400, uppercase, tertiary.

Numbers use `tabular-nums`. Prose max `size.measure`. Code: mono `small`. One h1 per screen.

## Spacing and density

- Base 4px, rhythm 8px, half-step `space.6`.
- Content sections: opener `padding-top` `space.160` (`space.128` under `breakpoint.xl`, `space.96` under
  `breakpoint.md`); opener to its stage or grid `space.96` (`space.48` mobile).
- App screens: page padding `space.32` (`space.20` under `breakpoint.md`); `.screen-head` then content after
  `space.24`; panels `space.16` apart, padding `space.20`; panel title to content `space.12`.
- Forms: fields `space.20` apart, label to control `space.6`, helper `space.6` below, actions `space.32` below.
  Settings groups: `space.48` apart, hairline above each.

## Shape and depth

- Radius by role (rule 5). Inline code and checkbox `radius.xs`; tooltip `radius.sm`; toast `radius.md`.
- Resting cards: hairline `color.border.default`, no shadow; elevation per rule 4, nothing else casts a shadow. `elevation.*` resolves to `shadow.raised`,
  `popover`, `ring` in dark and their `Light` versions in light.
- Sticky header: `color-mix(in srgb, var(--color-surface-default) 80%, transparent)` with
  `backdrop-filter:blur(20px)` and a hairline bottom border.

## Motion

Duration and easing tokens (`motion.duration.*`, `motion.easing.*`):

- Hover tint: one step of background, text or border, `hover`, `ease`. Press: `scale(0.971)`, `hover`, `standard`.
- Disclosure: `grid-template-rows:0fr→1fr` and opacity, chevron 180°, `open`, `standard`.
- Tab indicator: left and width, `tab`, `enter`. Menu, tooltip, dialog: opacity and `scale(0.98)→1`, `ui`, `standard`; close 60% as long.
- Toast or new row: opacity 0→1, `enter`, `enter`. Chart marks, first view: `scale(0.4)→1` and opacity, `chart`, `standard`, 8ms stagger per column.
- Stage settle, slab lift and loops: signatures 1, 2, 3 and 5; loops only while running.

`steps()` for glyphs and carets, constant speed for dashes and shimmer. Never animated: text on load or scroll, scroll
position, layout widths, backgrounds. Script-armed reveals only transform visible content. Reduced motion, globally
(loops end on their readable base frame):

```css
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:var(--motion-duration-instant)!important;
  animation-iteration-count:1!important;animation-delay:0s!important;transition-duration:var(--motion-duration-instant)!important;transition-delay:0s!important;}
  .btn:active{transform:none;}}
```

## Interaction

Focus-visible everywhere: `outline:var(--border-width-hairline) solid var(--color-focus-ring);outline-offset:2px`
(-2px on rows and menu items), instant; inputs also take a `color.accent.default` border. Press on every button and
chip: `scale(0.971)`. Hover, then open or selected:

- Inverse pill: `color.action.primary` → `primaryHover`.
- Secondary pill: `color.action.secondary` → `secondaryHover`, text body → primary; pressed `color.surface.press`.
- Ghost and nav pill: text secondary → primary on `color.action.ghostHover`; current page: text primary on `color.surface.tint`, `aria-current`.
- Icon button: `color.icon.idle` → `active` on `ghostHover`; pressed `color.surface.press`.
- Filter chip: text primary, border `color.border.strong`; `aria-pressed`: `color.surface.press`, text primary, border strong.
- Text link: underline `color.icon.idle` → `color.text.primary`.
- Linked card: `color.surface.hover`, border strong, over `motion.duration.ui`; no press.
- Table row: `color.surface.tint`; selected `color.accent.subtle` plus a 2px accent bar at the left.
- Input, select: border default → strong; an open menu takes `elevation.popover`.
- Tab: text secondary → body; selected primary with the sliding 2px indicator.
- Disclosure row: text primary on `color.surface.hover` (`motion.duration.ui`); open: chevron 180°, panel opens.
- Menu item: `color.surface.hover`; checked: 16px check at the right.
- Checkbox, switch: outline → `color.text.secondary`; checked `color.accent.default` over `motion.duration.hover`.

Hover rules sit inside `@media (hover:hover) and (pointer:fine)`. Disabled: `opacity.disabled`, no hover or press,
`cursor:not-allowed`.

## Layout adaptation

- Container max `size.container` (`size.containerProse` for docs and articles), side padding
  `clamp(var(--space-20), 4vw, var(--space-48))`; 12 columns from `breakpoint.lg`, gap `space.24`; 4 columns below
  `breakpoint.md`. Grid and flex children `min-width:0`.
- Card grids are hairline grids, not boxes: container `border-top` and `border-left`, each cell
  `box-shadow:1px 0 0 var(--color-border-subtle),0 1px 0 var(--color-border-subtle)`, padding `space.24`; 3 or 4
  columns, 2 under `breakpoint.lg`, 1 under `breakpoint.sm`.
- Forms one column, max `size.form`; under `breakpoint.md` actions stack full width, primary first.
- Wide tables scroll inside their wrapper (Table); status and row actions stay visible (pin the actions column).

## Applying the concept

Dense screens get less, never nothing.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing hero | Lit stage (from below) with the core screen; h1 left; two pills | Full |
| Content section | Split opener; a stage, a 3-blueprint row or a hairline grid below | Every section |
| Closing section, newsletter | Centered statement over the dot field; pills or the field | Once per page |
| App screen header | `.screen-head`: mono label, 590 h1, two-tone summary | Every app screen |
| Dashboard | Screen head; KPI cards (mono labels, `h3` values); main chart as dot columns on a quiet stage that is the panel (no card around it); status icons, mono timestamps | One quiet stage |
| Data table | Mono heads and IDs, status icons, hairline rows; rise glyph for syncing rows | Type and dots |
| Store grid | Opener-style header; hairline grid of cards with spec plates, mono category labels; chips for filters | Plates |
| Product detail | Spec figure on a quiet stage (FIG caption), `font.size.h3` name, segmented pill options | One quiet stage |
| Cart, checkout form | `.screen-head`; split section headers with "01 / 02" mono counters; confirmation: joined-parts blueprint + two-tone sentence | Light |
| Blog, article | Split masthead; featured post: wide plate and text on the ground or in one hairline cell, no card around them; mono dates; placeholders as plates with `.fig` | Plates, one opener |
| Settings | Groups as split rows (title and description left, controls right); mono counts; dot meter for strength; tier slabs on plans | Light |
| Empty state | Empty state component: 48px glyph or dimmed stack, mono caption, two-tone sentence | Strong |
| Error, not found | Empty state, error variant (quiet stage, broken connector, mono code) | Strong |
| Loading | Glyph per signature 2; skeletons are static `color.surface.card` bars | One glyph |
| Dialog | Mono step or object label above the 590 title; no drawings | Type only |

## Imagery and icons

- Icons: 16px grid (20px in toolbars), 1.5px butt-cap strokes or solid simple shapes, `currentColor`; idle
  `color.icon.idle`, active `color.icon.active`.
- Status icons, 14px: todo an empty 1.5px ring, `color.icon.idle`; in progress a half-filled ring,
  `color.status.warning`; done a filled circle with a check, `color.status.success`; paused a ring with two bars;
  canceled a ring with an X, `color.icon.idle`; urgent a filled rounded square with "!", `color.status.urgent`.
  Priority: three ascending bars, lit to the level.
- Charts: bars are dot columns (r 1.5, 6px pitch, lit to the value, track dots above at `opacity.dotTrack`); trends are
  1px lines with 3px dots at points; axis labels mono caption, tertiary.
- Avatars: circles (16px rows, 32px profiles), initials `font.size.micro` 590 on `color.surface.press`.
- Illustration is only the blueprint and the spec plate; photos and video at `radius.md`, never on a stage.

## Accessibility

- Text 4.5:1 on every surface up to `raised` (body 7:1); control outlines `color.border.check` 3:1.
- Focus always visible (Interaction); targets at least 44px on touch through padding.
- Glyphs, plates and blueprints are `aria-hidden="true"`; their state is also in words, announced through the
  screen's one `role="status"` region (reuse an existing one); errors `role="alert"`.
- Loops stop under reduced motion on a readable frame; nothing depends on motion to be understood.
