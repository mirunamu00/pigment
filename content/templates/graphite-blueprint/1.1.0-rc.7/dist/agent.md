# Graphite Blueprint 1.1.0-rc.7

Design system `graphite-blueprint@1.1.0-rc.7`. A near-black instrument panel: graphite greys, hairlines, pill controls, one indigo for focus. Real UI on spotlit stages, 5x5 dot glyphs for work in progress, isometric hairline blueprints. Suits dev tools, SaaS apps and docs.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

## Character

Quiet and exact; the product's own UI is the image.

## The ten rules that define this look

1. **Graphite ground, one grey step per level.** `color.surface.default` covers at least 80% of every screen;
   depth climbs `subtle` → `card` → `raised` → `hover` → `press`. Why: the ground is the panel.
2. **Four text steps.** `color.text.primary` headings and values, `color.text.body` running text,
   `color.text.secondary` meta and resting nav, `color.text.tertiary` mono labels. Why: hierarchy is tone.
3. **One indigo, at most 3 uses per screen.** `color.accent.default` only for checked controls, the selected-row bar
   and one send button; `color.focus.ring` for focus. The primary action is the inverse pill (`color.action.primary`).
   Status hues only as 16px glyphs, 6px dots, chart marks and 7% tints. Why: color is information.
4. **Hairlines, not shadows.** Edges are `border.width.hairline` in `color.border.subtle` or `default`; drawings
   `border.width.drawing`. Panels lift with `elevation.raised`; only menus, dialogs and
   toasts take `elevation.popover`. Why: machined panels.
5. **Pills for controls, 8px for panels.** Buttons, chips, nav and search `radius.full`; cards, panels, stages, menus
   and code `radius.md`; inputs `radius.sm`; dialogs `radius.lg`. Why: two shapes only.
6. **Inter at 510 and 590, tight.** Content headings 510, app-screen headings 590; `font.tracking.display`
   at 32px and up; sentence case; display lines at most 2. Mono (`.mono-label`) only for
   labels, figure captions, dates, IDs and code. Why: the voice.
7. **Show the product on a stage.** A screen's main image is this product's own UI on a spotlit stage
   (signature 1), one lit stage per viewport. Why: the UI proves itself.
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
- Spinners, progress rings, pulsing skeleton blocks, bouncing loaders; artificial delays to show a working state.
- Shadows on resting cards, rows or buttons; borders over 2px; radii between `radius.xl` and a pill.
- Hover scale-up, parallax, text fading up on scroll, bounce or overshoot easing.
- Stock photos, 3D renders, emoji, mascots, people illustrations, multicolor icons; any reference artwork, logo
  (or a circle cut by parallel diagonal stripes), copy or product names.
- A stage behind text, a form or a table; frames nested more than two deep (card → stage →
  window); a stage or plate holding only an icon.
- A stretched `::after` or link over a checkbox, radio, switch, button or field; a radio circle or indigo dot in a
  segmented option; two hairlines with nothing between them, at any distance; a closing statement under `font.size.h2`.
- Content hidden until script runs; detecting automation or headless browsers; changing motion or config
  for review.
- Sideways page scroll at 390px; exclamation marks in copy; copy that explains the design system or how a
  drawing was made.

## Signature elements

### 1. Spotlit product stage

**What.** A hairline panel whose ground carries a radial light from its top edge. A raised window runs off the bottom
edge, fading over its last 30%, holding this product's real UI at true scale (list, detail,
chart); an optional ghost window behind. **Quiet stage** (`.stage--quiet`): dimmer, even padding, window unfaded.

**Recipe.**

```html
<figure class="stage"><div class="stage-window"><!-- this product's UI --></div></figure>
<p class="fig"><span class="mono-label">FIG 0.1</span><b>Item name</b> One fact about it.</p>
```

```css
.stage{--at:0%;position:relative;isolation:isolate;overflow:hidden;margin:0;padding:var(--space-56) var(--space-56) 0;
  border:var(--border-width-hairline) solid var(--color-border-subtle);border-radius:var(--radius-md);
  background:radial-gradient(120% 70% at 50% var(--at),var(--color-stage-light) 0%,var(--color-stage-mid) 22%,var(--color-stage-ground) 62%);}
.stage--below{--at:100%;}
.stage-window{position:relative;min-height:240px;background:var(--color-stage-window);box-shadow:var(--elevation-raised);
  border-radius:var(--radius-md) var(--radius-md) 0 0;
  -webkit-mask-image:linear-gradient(to bottom,#000 70%,transparent);mask-image:linear-gradient(to bottom,#000 70%,transparent);}
.stage-ghost{position:absolute;inset:var(--space-56) var(--space-56) 0;translate:32px 24px;z-index:-1;opacity:var(--opacity-ghost);filter:blur(2px);}
.stage--quiet{display:flex;flex-direction:column;padding:var(--space-24);background:radial-gradient(120% 90% at 50% 0%,var(--color-stage-mid),var(--color-stage-ground) 70%);}
.stage--quiet .stage-window{flex:1;min-height:0;border-radius:var(--radius-md);-webkit-mask-image:none;mask-image:none;}
.stage.is-armed .stage-window{transform:translateY(var(--motion-distance-settle-from)) scale(1.05);filter:blur(2px);
  transition:transform var(--motion-duration-settle) var(--motion-easing-settle),filter var(--motion-duration-settle) var(--motion-easing-settle);}
.stage.is-armed.is-in .stage-window{transform:none;filter:none;}
.fig{display:grid;gap:var(--space-4);margin-top:var(--space-16);font-size:var(--font-size-body);color:var(--color-text-secondary);}
.fig b{font-weight:var(--font-weight-medium);color:var(--color-text-primary);}
@media (max-width:767px){.stage{padding:var(--space-24) var(--space-24) 0;}.stage-ghost{display:none;}}
```

**Motion.** Frame static; content may live (rows fade in, a caret, one glyph). Landing
and feature sections only: script adds `is-armed` on mount (not under reduced motion), `is-in` at 20% in view, once;
otherwise final.

**Where.** Landing hero and feature sections (lit); quiet: dashboard main chart, product
detail image, a settings preview, error states.

**Limits.** At most two quiet stages per viewport; the window spans at least 60% of the stage. A
stage sits on the ground or in one hairline grid cell, never in a bordered card (a panel that is mainly a quiet stage
drops its border and fill, title above). Panels in a row end together (`align-items:stretch`): beside a
list, the stage is `flex:1` in a flex column (window and chart svg `height:100%`, at least
`size.stageMini`), or the list is capped at the stage's height with "View all →"; no empty band in a panel. A demo window's sample text appears nowhere else and the window is `inert`,
`aria-hidden="true"`; a real chart stays accessible.

### 2. Dot-matrix glyph

**What.** 25 dots on a 3-unit pitch, unlit at `opacity.dotOff`; frames switch with no tween. Sizes `size.glyphXs` to `size.glyphXl`: scale the box, never the dot
count. Three loops: **scan** (working), **rise**
(syncing), **core** (a background job). Stills: **done** (all lit for `motion.duration.done`, then the 16px check icon), **error** (an X in
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

**Motion.** `steps()` loop while the work runs. The `rest` frame shows without script and
under reduced motion.

**Where.** Panel or route loading: 16px scan plus a gerund, centered, after 300ms. Any 1-to-5 level (password strength, a person's load): the dot meter.

**Limits.** At most 3 running glyphs visible. The dot field never sits under body text.

### 3. Isometric hairline blueprint

**What.** Slabs and boxes in 2:1 isometric, 0.5px strokes, vertices rounded but machined; filled faces hide what is
behind, a soft shadow under each slab. Marks: a 5x5 dot grid on a top face, dashed connectors with chevrons for flow. Each drawing sits on the ground, a mono "FIG 0.n"
caption above-left, a 15px/510 title and a secondary line below. Subjects: abstract parts of this product's system
(layers, queues, ports, stacks), never objects.

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
  const seam=`M${f(cx-w+s)},${f(y+q+s/2)}L${f(cx-s)},${f(y+w-s/2)}Q${cx},${y+w} ${f(cx+s)},${f(y+w-s/2)}L${f(cx+w-s)},${f(y+q+s/2)}`
    +(h>=0.3*w?`M${f(cx-w)},${f(y+q+h/2)}L${cx},${f(y+w+h/2)}L${f(cx+w)},${f(y+q+h/2)}`:"");
  let mark="";if(dots){for(let j=0;j<25;j++)mark+=`<circle cx="${f(w*(0.18+0.05*(j%5)))}" cy="${f(w*(0.18+0.05*Math.floor(j/5)))}" r="${f(w*0.012)}"/>`;
    mark=`<g class="bp-mark" transform="matrix(1 .5 -1 .5 ${cx} ${y})">${mark}</g>`;}
  return `<g class="bp-slab" style="--i:${i}"><path class="bp-shadow" d="${body}"/><path class="bp-body" d="${body}"/><path class="bp-seam" d="${seam}"/><path class="bp-edge" d="M${cx},${f(y+w-s/4)}V${f(y+w+h-r/4)}"/>${mark}</g>`;
}
const link=(d)=>`<path class="bp-link" d="${d}"/>`+[0,1,2].map(k=>`<path class="bp-chev" style="--k:${k};offset-path:path('${d}')" d="M-2,-3L1,0L-2,3"/>`).join("");
function pair(cx,y,w,h){const d=2*w,m=h/2; // h at most 0.4w
  return [slab(cx,y,w,h,{dots:true})+link(`M${f(cx+w/2)},${f(y+0.75*w+m)}L${f(cx+1.5*w)},${f(y+1.25*w+m)}`)+slab(cx+d,y+d/2,w,h),
    [[cx,y,w,h],[cx+d,y+d/2,w,h]]];}
function blueprint(inner,boxes,cls="bp--lg"){
  const xs=boxes.flatMap(([cx,,w])=>[cx-w,cx+w]),ys=boxes.flatMap(([,y,w,h])=>[y,y+w+h]);
  const x0=Math.min(...xs),y0=Math.min(...ys),W=Math.max(...xs)-x0,H=Math.max(...ys)-y0,p=0.05*W;
  return `<svg class="bp ${cls}" viewBox="${[x0-p,y0-p,W+2*p,H+2*p].map(f).join(" ")}" aria-hidden="true"><g class="bp-fig">${inner}</g></svg>`;}
// Demo stack (compose your own).
const boxes=[2,1,0].map(k=>[120,20+k*28,80,12]);
const stack=blueprint(boxes.map((b,j)=>slab(...b,{i:j,dots:j===2})).join(""),boxes);
const linked=blueprint(...pair(0,0,80,20));
```

```css
.bp{display:block;overflow:visible;fill:none;}
.bp path{vector-effect:non-scaling-stroke;stroke-width:var(--border-width-drawing);}
.bp-shadow{fill:var(--color-blueprint-face);stroke:none;color-interpolation-filters:sRGB;filter:drop-shadow(0 8px 12px var(--color-blueprint-shadow));}
.bp-body{fill:var(--color-blueprint-face);stroke:var(--color-blueprint-front);}
.bp-seam{stroke:var(--color-blueprint-back);stroke-linecap:round;} .bp-edge{stroke:var(--color-blueprint-front);}
.bp-mark{fill:var(--color-blueprint-mark);}
.bp .bp-link{stroke:var(--color-blueprint-mark);stroke-width:var(--border-width-hairline);stroke-dasharray:2 4;animation:bp-dash var(--motion-duration-dash) linear infinite;}
.bp-chev{stroke:var(--color-blueprint-front);offset-distance:calc(var(--k) * 33% + 16%);animation:bp-flow var(--motion-duration-flow) linear calc(var(--k) * var(--motion-duration-flow) / -3) infinite;}
.bp-slab{transition:transform var(--motion-duration-settle) var(--motion-easing-settle) calc(var(--i) * 60ms);}
.bp.is-lifted .bp-slab{transform:translateY(calc(var(--i) * -1 * var(--motion-distance-lift)));}
@keyframes bp-dash{to{stroke-dashoffset:var(--motion-distance-dash);}}
@keyframes bp-flow{from{offset-distance:0%;opacity:0;}20%,80%{opacity:1;}to{offset-distance:100%;opacity:0;}}
```

Slabs in a stack sit 16 units apart (offset = h + 16); draw the farther (smaller y) first. Side heights 0.15w to 1.5w.

**Motion.** Every connector marches with its chevrons (reverse flow: `animation-direction:reverse`), opener
rows included; only a stopped (disconnected, broken) connection is static. On card hover, or
once at 30% in view on landing pages, script adds `is-lifted` (at most 3 levels). Reduced motion: dashes still,
chevrons evenly spaced, slabs at rest.

**Where.** Landing or about page: a row of three captioned blueprints opening a section: a stack, a connected pair (`pair()`, marching) and a box (one slab, h about 0.7w,
dots on top), never two that differ only in slab count. Integrations:
`pair()`. Error, not found: a broken connector
ending in one 4px `color.status.danger` point. `bp--sm`: plan cards (the only place for 1-2-3 tier stacks) and
dashboard first run (static).

**Limits.** At most 3 per screen, one animated; never in table cells, fields, buttons, dialogs or toasts. Size is the drawn
figure, not the svg: every drawing goes through `blueprint()`, never a fixed or padded viewBox, so `g.bp-fig` spans at
least 85% of the svg width. In a row of three each figure renders about 270px (at least 240px at 1440px; 85% of the
column at 390px). Widths in CSS, never shrunk by grid or flex:

```css
.bp-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,var(--size-blueprint-lg)),1fr));gap:var(--space-32);align-items:start;}
.bp-row>figure{display:grid;grid-row:span 3;grid-template-rows:subgrid;row-gap:var(--space-12);margin:0;} /* caption, svg, title + text */
.bp-row>figure>.bp{align-self:end;}
.bp--lg{width:min(100%,var(--size-blueprint-lg));height:auto;flex:none;}
.bp--md{width:var(--size-blueprint-md);height:auto;} .bp--sm{width:var(--size-blueprint-sm);height:auto;}
@media (max-width:639.98px){.bp--lg{width:100%;}}
```

### 4. Spec plate

**What.** The stand-in for every missing image: a tile with one generative hairline
figure, one of eight kinds picked by the item's id, and a mono caption bottom-left: number and one fact of at most 18 characters (a material, capacity or weight), `FIG 03 · 18 OZ CANVAS` on products, `NO. 07 · DESIGN` on posts; never the number or category alone, never an ellipsis. Same id, same figure everywhere.

**Recipe.**

```js
const hash=(s)=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;return h;};
// Full list order, featured included; later passes of 8 shift by 3. specFigure(id, kinds.get(id)).
function specKinds(ids){const order=[];for(const id of ids.slice(0,8)){let k=hash(id)%8;while(order.includes(k))k=(k+1)%8;order.push(k);}
  for(let k=0;order.length<8;k++)if(!order.includes(k))order.push(k);
  const m=new Map();ids.forEach((id,i)=>m.set(id,order[(i+Math.floor(i/8)*3)%8]));return m;}
function specFigure(id,kind=hash(id)%8){ // inner SVG for viewBox 0 0 160 120; uses f() from the blueprint recipe
  let h=hash(id);const rnd=()=>(h=Math.imul(h^(h>>>13),1597334677)>>>0)/4294967296;let o="";
  if(kind===0)for(let i=0;i<5;i++){const rx=16+11*i;o+=`<ellipse class="${i%2?"pf-b":"pf-f"}" cx="80" cy="60" rx="${rx}" ry="${f(rx*0.42)}" transform="rotate(${f(-24+48*rnd())} 80 60)"/>`;}
  if(kind===1){const l=66+12*rnd();for(let i=0;i<17;i++){const a=(-160+i*8.75)*Math.PI/180;o+=`<line class="${i%4?"pf-b":"pf-f"}" x1="80" y1="96" x2="${f(80+l*Math.cos(a))}" y2="${f(96+l*Math.sin(a))}"/>`;}}
  if(kind===2){const p=rnd()*6;for(let i=0;i<11;i++)for(let j=0;j<7;j++)o+=`<circle class="${6-j<2.5+2.5*Math.sin(i*0.6+p)?"pf-on":"pf-off"}" cx="${20+12*i}" cy="${24+12*j}" r="1.2"/>`;}
  if(kind===3){const p=rnd()*6;for(let i=0;i<24;i++)for(const s of[1,-1]){const t=i*0.42+p,z=Math.cos(t)*s;o+=`<circle class="${z>0?"pf-on":"pf-off"}" cx="${f(12+i*5.9)}" cy="${f(60+28*Math.sin(t)*s)}" r="${f(1+0.8*z)}"/>`;}}
  if(kind===4)for(let i=0;i<13;i++){const x=26+9*i,v=f(8+28*rnd());o+=`<line class="${i%3?"pf-b":"pf-f"}" x1="${x}" y1="${f(60-v)}" x2="${x}" y2="${f(60+v)}"/>`;}
  if(kind===5){const n=5+Math.floor(rnd()*3);for(let i=0;i<9;i++){const x=16+16*i;o+=`<line class="pf-b" x1="${f(80+(x-80)*0.263)}" y1="32" x2="${x}" y2="88"/>`;}
    for(let j=0;j<=n;j++){const y=32+56*(j/n)**2,w=64*(y-12)/76;o+=`<line class="${j===n?"pf-f":"pf-b"}" x1="${f(80-w)}" y1="${f(y)}" x2="${f(80+w)}" y2="${f(y)}"/>`;}}
  if(kind===6){const t=0.18+0.2*rnd();o+=`<ellipse class="pf-f" cx="80" cy="60" rx="40" ry="40"/>`;for(let k=-3;k<=3;k++){const a=k*0.38,rx=40*Math.cos(a);o+=`<ellipse class="pf-b" cx="80" cy="${f(60+40*Math.sin(a))}" rx="${f(rx)}" ry="${f(rx*t)}"/>`;}}
  if(kind===7)for(let i=0;i<9;i++)for(let j=0;j<5;j++)o+=`<rect class="${rnd()<0.3?"pf-on":"pf-b"}" x="${24+13*i}" y="${30+13*j}" width="8" height="8" rx="1"/>`;
  return o;
}
```

```css
.plate{position:relative;display:grid;place-items:center;aspect-ratio:4 / 3;overflow:hidden;background:var(--color-surface-subtle);
  border:var(--border-width-hairline) solid var(--color-border-subtle);border-radius:var(--radius-md);}
.plate--wide{aspect-ratio:16 / 9;}
.plate svg{width:78%;height:78%;}
.plate :is(ellipse,line,rect:not(.pf-on)){fill:none;stroke-width:var(--border-width-drawing);vector-effect:non-scaling-stroke;}
.pf-f{stroke:var(--color-blueprint-front);} .pf-b{stroke:var(--color-blueprint-mark);}
.pf-on{fill:var(--color-blueprint-front);} .pf-off{fill:var(--color-blueprint-mark);opacity:var(--opacity-dot-off);}
.plate .mono-label{position:absolute;left:var(--space-12);right:var(--space-12);bottom:var(--space-8);overflow:visible;text-overflow:clip;}
```

**Motion.** Static; its card's hover changes the card only.

**Where.** Every product and post (cards, detail, featured, an article's `plate--wide` lead); article image
placeholders (caption below as a `.fig`).

**Limits.** Real photos take `radius.md`. One figure number per plate (its caption or a `.fig`
below, never both); the item name in text, once per viewport (breadcrumbs aside); no shared kind in a grid row, a grid column or between
adjacent posts (`specKinds`).

### 5. Working shimmer and live edges

**What.** A band sweeping a one-line status label; a live edge (a 1px border gradient sliding around a running item's
badge or toast); a live dot whose ring grows and fades; a caret blinking in
hard steps; log entries fading in.

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

**Motion.** Infinite while running, removed the moment the work ends (the label settles to
`color.text.secondary`, the edge to `color.border.strong`). Reduced motion: no sweep, slide or ring; the dot and caret
stay visible.

**Where.** Job logs (current line shimmers, finished lines turn in); a processing
row's status badge (live edge); "Live" beside streaming data (stale: `color.icon.idle` dot, no ring); system status
(pulse when operational, a still `color.status.urgent` dot in an incident).

**Limits.** Never on headings, buttons, static labels or placeholder content; at most 2 shimmering lines and 1 live
edge per screen.

### 6. Split opener, two-tone voice, mono figures

**What.** Under the section's hairline, a headline left and, from the 50% line, a
description with a small secondary link ending in "→" ("↓" for an in-page anchor), never "+". A two-tone statement: a primary lead sentence, the rest secondary, same
size and weight.

**Recipe.**

```css
.opener{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-32);margin-bottom:var(--space-96);padding-top:var(--space-160);
  border-top:var(--border-width-hairline) solid var(--color-border-subtle);}
.opener:has(+.prose){margin-bottom:var(--space-32);}
.opener h2{margin:0;font:var(--font-weight-medium) var(--font-size-h2)/var(--font-line-height-display) var(--font-family-sans);
  letter-spacing:var(--font-tracking-display);color:var(--color-text-primary);text-wrap:balance;}
.opener p{margin:0;max-width:30ch;font-size:var(--font-size-lead);line-height:var(--font-line-height-lead);letter-spacing:var(--font-tracking-lead);color:var(--color-text-body);}
.two-tone{color:var(--color-text-secondary);} .two-tone b{font-weight:inherit;color:var(--color-text-primary);}
.mono-label{font:var(--font-weight-regular) var(--font-size-caption)/var(--font-line-height-caption) var(--font-family-mono);
  text-transform:uppercase;color:var(--color-text-tertiary);font-variant-numeric:tabular-nums;}
.screen-head{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-32);align-items:end;padding-block:var(--space-32) var(--space-24);}
.screen-head,.masthead{border-bottom:var(--border-width-hairline) solid var(--color-border-subtle);}
:is(.screen-head,.masthead)+*,:is(.screen-head,.masthead)+* :is(thead th,.tbl,.opener:first-child){border-top:0;}
:is(.masthead+.opener,.masthead+*>.opener:first-child){padding-top:var(--space-96);}
@media (max-width:767px){.opener,.screen-head{grid-template-columns:1fr;gap:var(--space-16);}.opener{padding-top:var(--space-96);margin-bottom:var(--space-48);}
  .opener h2{font-size:var(--font-size-h3);}.opener p{font-size:var(--font-size-prose);}}
```

**Motion.** Static.

**Where.** Content sections; app screens:
`.screen-head`, mono label and h1 left, a one-line two-tone summary (`font.size.body`) right. App sections (cart,
checkout, settings groups, long forms): a mono "01 / 02" counter and 590 `font.size.body` title left, a one-line
secondary description right.

**Limits.** One two-tone statement per section, 1 to 3 sentences. Every content section opens with the full opener;
filters, counts or "View all" go below it, never instead. One h2-size
headline per section. A content home's featured block continues the
masthead: a "FEATURED" `.mono-label` over its plate and text, no h2; one large headline in the first viewport, the
plate's top above 900px at 1440px. Prose beside an opener is one paragraph; longer prose goes under it in `.prose`
at `size.measure`, never below a figure row in one half. The description repeats no phrase of the
prose; each destination is linked once per section. A rule always has content directly on both sides.

## Color use

- Tooltips `color.surface.raised`, code blocks `color.surface.code`.
- Inline links `color.text.primary`, 1px underline in `color.icon.idle`, 3px offset.
- Status: the hue (rule 3) plus a `color.text.body` label; only danger colors text.
- Charts: `color.chart.mark`, others `muted`, one series `highlight`, at most 3 `color.chart.grid` lines, no frame.

## Typography

Size / line height, weight, tracking (`font.size.*`, `font.lineHeight.*`, `font.tracking.*`), color:

- Landing h1: `clamp(var(--font-size-h3),6vw,var(--font-size-h1))` / display, 510, display, primary.
- Content h1 and section h2: `clamp(var(--font-size-h3),5vw,var(--font-size-h2))` / display, 510, display. Closing statement:
  `clamp(var(--font-size-h2),6vw,var(--font-size-display))`, two sentences of at most 12 characters ("Over $100? Ships free."), each one tone in a `white-space:nowrap` span (the first in `<b>`): one line from
  `breakpoint.lg` (no max-width under it), two at 390px, breaking only between sentences; longer copy goes in the
  form's helper line.
- Counts and result lines ("SHOWING 6 OF 6 POSTS") and the label over a closing are
  `.mono-label` in every app.
- App-screen h1: `lead` / heading, 590, lead. Product name, KPI value: `h3` / heading, 510, display, tabular.
- Lead and opener text: `lead` / lead (`prose` under `breakpoint.md`), 400, lead, body color.
- Article: body `prose` / prose, 400, body color; h2 `lead`, h3 `title`, both 590 / heading.
- Body and panel text `body` / body, 400. Panel, card and group titles `body` / ui, 590 app or 510 content, primary.
- Meta `small` / ui, 400.

Numbers use `tabular-nums`. Prose max `size.measure`. Code: mono `small`. One h1 per screen.

## Spacing and density

- Base 4px, rhythm 8px, half-step `space.6`. Content sections: the opener recipe, `padding-top:space.128` under `breakpoint.xl`.
- App screens: page padding `space.32` (`space.20` under `breakpoint.md`); `.screen-head` then content after
  `space.24`; panels `space.16` apart; panel title to content `space.12`.
- Forms: fields `space.20` apart, label to control `space.6`, helper `space.6` below, actions `space.32` below.
  Settings groups are `.settings-group` siblings, the gap built in:

```css
.settings-group{padding-bottom:var(--space-48);}
.settings-group+.settings-group{margin-top:0;padding-top:var(--space-48);border-top:var(--border-width-hairline) solid var(--color-border-subtle);}
.settings-group>:last-child,.settings-group :is(.card-grid,.form-actions,form):last-child{margin-bottom:0;}
:is(.settings-group,.stack) [role=status]:empty{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;}
```

Filled, it shows in flow; measure the 48px with it empty.

## Shape and depth

- Inline code `radius.xs`; tooltip `radius.sm`.
- Sticky header: `color-mix(in srgb,var(--color-surface-default) 80%,transparent)` with
  `backdrop-filter:blur(20px)` and a hairline bottom border.

## Motion

Tokens `motion.duration.*`, `motion.easing.*`:

- Hover tint: one step of background, text or border, `hover`, `ease`. Press (every button and chip): `scale(0.971)`, `hover`, `standard`.
- Disclosure: `grid-template-rows:0fr→1fr` and opacity, chevron 180°, `open`, `standard`.
- Tab indicator: left and width, `tab`, `enter`. Menu, tooltip, dialog: opacity and `scale(0.98)→1`, `ui`, `standard`; close 60% as long.
- Toast or new row: opacity 0→1, `enter`, `enter`. Chart marks, first view: `scale(0.4)→1` and opacity, `chart`, `standard`, 8ms stagger per column.

Never animated: text on load, scroll position, layout widths, backgrounds. Reduced motion, globally (loops end on their base frame):

```css
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:var(--motion-duration-instant)!important;
  animation-iteration-count:1!important;animation-delay:0s!important;transition-duration:var(--motion-duration-instant)!important;transition-delay:0s!important;}
  .btn:active{transform:none;}}
```

## Interaction

Focus-visible everywhere: `outline:var(--border-width-hairline) solid var(--color-focus-ring);outline-offset:2px`
(-2px on rows and menu items), instant; inputs also take a `color.accent.default` border. Hover, then open or selected:

- Inverse pill: `color.action.primary` → `primaryHover`.
- Secondary pill: `color.action.secondary` → `secondaryHover`, text body → primary; pressed `color.surface.press`.
- Ghost and nav pill: text secondary → primary on `color.action.ghostHover`; current page: text primary on `color.surface.tint`, `aria-current`.
- Icon button: `color.icon.idle` → `active` on `ghostHover`; pressed `color.surface.press`.
- Filter chip: text primary, border `color.border.strong`; `aria-pressed` adds `color.surface.press`.
- Text link: underline → `color.text.primary`.
- Linked card: `color.surface.hover`, border strong, `motion.duration.ui`; no press.
- Table row: `color.surface.tint`; selected `color.accent.subtle` plus a 2px accent bar at the left.
- Input, select: border default → strong.
- Disclosure row: text primary on `color.surface.hover`; open per Motion.
- Checkbox, switch: outline → `color.text.secondary`.

Hover rules sit inside `@media (hover:hover) and (pointer:fine)`. Disabled: `opacity.disabled`, no hover or press,
`cursor:not-allowed`.

## Layout adaptation

- One left edge per page (the header brand's x): container max `size.container` everywhere; articles and docs
  narrow from the right (body `size.measure`, rail right), never centered in `size.containerProse` or inset. Side padding
  `clamp(var(--space-20),4vw,var(--space-48))`; 12 columns from `breakpoint.lg`, gap `space.24`; 4 columns below
  `breakpoint.md`. Grid and flex children `min-width:0`.
- Card grids are hairline grids: container `border-top` and `border-left`, each cell
  `box-shadow:1px 0 0 var(--color-border-subtle),0 1px 0 var(--color-border-subtle)`, padding `space.24`; 3 or 4
  columns, 2 under `breakpoint.lg`, 1 under `breakpoint.sm`.
- Forms one column, max `size.form`; a preview (above the fields) or banner in that column takes the same width. Cards, grids and tables in a settings group (payment
  method, plans, invoices) span the controls column's full width. Under `breakpoint.md` actions stack full width, primary first.

## Applying the concept

Dense screens get less, never nothing.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing hero | Lit stage (from below) with the core screen, h1 left, two pills | Full |
| Content section | Split opener; a stage, a 3-blueprint row or a hairline grid below | Every section |
| Closing: newsletter, store and blog lists | Centered two-tone statement and two pills over the dot field (a store: its shipping or returns promise) | Once per page |
| Dashboard | KPI cards; dot-column chart on a quiet stage as the panel, level with the activity list beside it, else spanning the row, activity below | One quiet stage |
| Data table | Table component; a 1-to-5 load as the dot meter beside its number | Type and dots |
| Store grid | Opener; hairline grid of plate cards, mono category labels; filter chips | Plates |
| Product detail | Spec figure on a quiet stage, its caption the only FIG; mono `CATEGORY · IN STOCK` over the name; segmented pills; Details rows numbered in mono (`01`) | One quiet stage |
| Cart, checkout form | App section heads; confirmation: joined-parts blueprint, two-tone sentence | Light |
| Blog | `.masthead` (h1 left, two-tone lead right), then an opener per section; featured post as in Signature 6, no card; mono dates | Plates, openers |
| Article | Breadcrumb, h1, meta, lead plate (`plate--wide`); contents list a side rail from `breakpoint.lg`, else after the plate in a closed `<details>`, never above the h1 | Lead plate |
| Settings | Groups as split rows (title and description left, controls right); tier slabs on plans | Light |
| Empty, error, not found | Empty state component (error variant) | Strong |
| Loading | Glyph (signature 2); skeletons are static `color.surface.card` bars | One glyph |

## Imagery and icons

- Icons: 16px grid (20px in toolbars), 1.5px butt-cap strokes or solid simple shapes, `currentColor`; idle
  `color.icon.idle`, active `color.icon.active`.
- Status icons, 14px: todo an empty 1.5px ring, `color.icon.idle`; in progress a half-filled ring,
  `color.status.warning`; done a filled circle with a check, `color.status.success`; paused a ring with two bars;
  canceled a ring with an X, `color.icon.idle`; urgent a filled rounded square with "!", `color.status.urgent`.
  Priority: three ascending bars lit to the level.
- Charts: bars are dot columns (r 1.5, 6px pitch, lit to the value, track dots above at `opacity.dotTrack`); trends
  1px lines with 3px point dots; axis labels mono caption.
- Avatars: circles (16px rows, 32px profiles), initials `font.size.micro` 590 on `color.surface.press`.

## Accessibility

- Text 4.5:1 on every surface up to `raised` (body 7:1); control outlines `color.border.check` 3:1.
- Touch targets at least 44px through padding.
- Glyphs, plates and blueprints are `aria-hidden="true"`; their state is also in words, announced through the
  screen's one `role="status"` region (reuse an existing one, never add a second); errors `role="alert"`.

## Semantic color tokens — light

| Token | Value |
| --- | --- |
| `color.surface.default` | `#FFFFFF` |
| `color.surface.subtle` | `#FAFAFA` |
| `color.surface.card` | `#FAFAFA` |
| `color.surface.raised` | `#FFFFFF` |
| `color.surface.code` | `#F9F8F9` |
| `color.surface.hover` | `#F1F1F2` |
| `color.surface.press` | `#EAEAEB` |
| `color.surface.tint` | `#0000000F` |
| `color.surface.overlay` | `#08090A40` |
| `color.text.primary` | `#282A30` |
| `color.text.body` | `#3C4149` |
| `color.text.secondary` | `#6F6E77` |
| `color.text.tertiary` | `#6E727A` |
| `color.text.onAction` | `#FFFFFF` |
| `color.text.onAccent` | `#FFFFFF` |
| `color.text.onDanger` | `#FFFFFF` |
| `color.border.subtle` | `#EEEEEE` |
| `color.border.default` | `#E9E8EA` |
| `color.border.strong` | `#DCDBDD` |
| `color.border.check` | `#8A8F98` |
| `color.action.primary` | `#282A30` |
| `color.action.primaryHover` | `#08090A` |
| `color.action.secondary` | `#F1F1F2` |
| `color.action.secondaryHover` | `#EAEAEB` |
| `color.action.ghostHover` | `#0000000F` |
| `color.action.danger` | `#C93636` |
| `color.accent.default` | `#5E6AD2` |
| `color.accent.subtle` | `#5E6AD21A` |
| `color.focus.ring` | `#5E6AD2` |
| `color.status.success` | `#1A7F35` |
| `color.status.warning` | `#9A7400` |
| `color.status.danger` | `#C93636` |
| `color.status.info` | `#0A73AD` |
| `color.status.urgent` | `#C2551F` |
| `color.status.successTint` | `#27A64412` |
| `color.status.dangerTint` | `#EB575712` |
| `color.icon.idle` | `#8A8F98` |
| `color.icon.active` | `#282A30` |
| `color.stage.light` | `#D3D6DA` |
| `color.stage.mid` | `#E8EAED` |
| `color.stage.ground` | `#F5F6F7` |
| `color.stage.window` | `#FFFFFF` |
| `color.blueprint.front` | `#3C4149` |
| `color.blueprint.back` | `#D6D7DA` |
| `color.blueprint.face` | `#FFFFFF` |
| `color.blueprint.mark` | `#8A8F98` |
| `color.blueprint.shadow` | `#0000000F` |
| `color.glyph.dot` | `#3C4149` |
| `color.chart.mark` | `#3C4149` |
| `color.chart.muted` | `#DCDBDD` |
| `color.chart.highlight` | `#00808F` |
| `color.chart.grid` | `#EEEEEE` |

## Semantic color tokens — dark

| Token | Value |
| --- | --- |
| `color.surface.default` | `#08090A` |
| `color.surface.subtle` | `#0F1011` |
| `color.surface.card` | `#141516` |
| `color.surface.raised` | `#1C1C1F` |
| `color.surface.code` | `#1C1C1F` |
| `color.surface.hover` | `#232326` |
| `color.surface.press` | `#28282C` |
| `color.surface.tint` | `#FFFFFF0D` |
| `color.surface.overlay` | `#08090AB3` |
| `color.text.primary` | `#F7F8F8` |
| `color.text.body` | `#D0D6E0` |
| `color.text.secondary` | `#8A8F98` |
| `color.text.tertiary` | `#80858F` |
| `color.text.onAction` | `#08090A` |
| `color.text.onAccent` | `#FFFFFF` |
| `color.text.onDanger` | `#08090A` |
| `color.border.subtle` | `#FFFFFF0D` |
| `color.border.default` | `#FFFFFF14` |
| `color.border.strong` | `#34343A` |
| `color.border.check` | `#62666D` |
| `color.action.primary` | `#E5E5E6` |
| `color.action.primaryHover` | `#FFFFFF` |
| `color.action.secondary` | `#FFFFFF0D` |
| `color.action.secondaryHover` | `#232326` |
| `color.action.ghostHover` | `#FFFFFF14` |
| `color.action.danger` | `#EB5757` |
| `color.accent.default` | `#5E6AD2` |
| `color.accent.subtle` | `#5E6AD21F` |
| `color.focus.ring` | `#5E6AD2` |
| `color.status.success` | `#27A644` |
| `color.status.warning` | `#F0BF00` |
| `color.status.danger` | `#EB5757` |
| `color.status.info` | `#21B3FF` |
| `color.status.urgent` | `#FC7840` |
| `color.status.successTint` | `#27A64412` |
| `color.status.dangerTint` | `#EB575712` |
| `color.icon.idle` | `#62666D` |
| `color.icon.active` | `#F7F8F8` |
| `color.stage.light` | `#7A7F83` |
| `color.stage.mid` | `#45494A` |
| `color.stage.ground` | `#08090A` |
| `color.stage.window` | `#0F1011` |
| `color.blueprint.front` | `#D0D6E0` |
| `color.blueprint.back` | `#2E2E32` |
| `color.blueprint.face` | `#08090A` |
| `color.blueprint.mark` | `#62666D` |
| `color.blueprint.shadow` | `#08090A` |
| `color.glyph.dot` | `#D0D6E0` |
| `color.chart.mark` | `#D0D6E0` |
| `color.chart.muted` | `#3E3E44` |
| `color.chart.highlight` | `#00B8CC` |
| `color.chart.grid` | `#FFFFFF0D` |

## Primitive tokens

| Token | Value |
| --- | --- |
| `font.family.sans` | `Inter, system-ui, "Segoe UI", Roboto, Pretendard, "Noto Sans KR", sans-serif` |
| `font.family.mono` | `"Geist Mono", "JetBrains Mono", ui-monospace, Consolas, D2Coding, monospace` |
| `font.size.display` | `72px` |
| `font.size.h1` | `64px` |
| `font.size.h2` | `48px` |
| `font.size.h3` | `32px` |
| `font.size.lead` | `24px` |
| `font.size.title` | `20px` |
| `font.size.prose` | `17px` |
| `font.size.body` | `15px` |
| `font.size.dense` | `14px` |
| `font.size.small` | `13px` |
| `font.size.caption` | `12px` |
| `font.size.micro` | `11px` |
| `font.weight.regular` | `400` |
| `font.weight.medium` | `510` |
| `font.weight.semibold` | `590` |
| `font.lineHeight.display` | `1` |
| `font.lineHeight.heading` | `1.125` |
| `font.lineHeight.lead` | `1.33` |
| `font.lineHeight.prose` | `1.6` |
| `font.lineHeight.body` | `1.6` |
| `font.lineHeight.ui` | `1.5` |
| `font.lineHeight.caption` | `1.4` |
| `font.tracking.display` | `-0.022em` |
| `font.tracking.lead` | `-0.012em` |
| `font.tracking.body` | `-0.011em` |

| Token | Value |
| --- | --- |
| `space.2` | `2px` |
| `space.4` | `4px` |
| `space.6` | `6px` |
| `space.8` | `8px` |
| `space.12` | `12px` |
| `space.16` | `16px` |
| `space.20` | `20px` |
| `space.24` | `24px` |
| `space.32` | `32px` |
| `space.48` | `48px` |
| `space.56` | `56px` |
| `space.96` | `96px` |
| `space.128` | `128px` |
| `space.160` | `160px` |

| Token | Value |
| --- | --- |
| `radius.xs` | `4px` |
| `radius.sm` | `6px` |
| `radius.md` | `8px` |
| `radius.lg` | `12px` |
| `radius.xl` | `16px` |
| `radius.full` | `9999px` |

| Token | Value |
| --- | --- |
| `border.width.drawing` | `0.5px` |
| `border.width.hairline` | `1px` |
| `border.width.bar` | `2px` |

| Token | Value |
| --- | --- |
| `shadow.raised` | `inset 0 0 0 1px #FFFFFF08, inset 0 1px 0 #FFFFFF0A, 0 0 0 1px #00000099, 0 4px 4px #0000001A` |
| `shadow.raisedLight` | `0 0 0 1px #00000014, 0 1px 4px -1px #00000017` |
| `shadow.popover` | `0 0 0 1px #3E3E44, -5px 12px 28px #00000066` |
| `shadow.popoverLight` | `0 0 0 1px #00000014, 0 12px 28px #0000001F` |
| `shadow.ring` | `0 0 0 1px #3E3E44` |
| `shadow.ringLight` | `0 0 0 1px #00000014` |

| Token | Value |
| --- | --- |
| `size.controlSm` | `28px` |
| `size.control` | `32px` |
| `size.field` | `36px` |
| `size.controlLg` | `40px` |
| `size.touch` | `44px` |
| `size.rowDense` | `32px` |
| `size.row` | `40px` |
| `size.header` | `64px` |
| `size.sidebar` | `240px` |
| `size.icon` | `16px` |
| `size.iconLg` | `20px` |
| `size.glyphXs` | `12px` |
| `size.glyphSm` | `16px` |
| `size.glyphMd` | `24px` |
| `size.glyphLg` | `48px` |
| `size.glyphXl` | `96px` |
| `size.stageMini` | `240px` |
| `size.blueprintSm` | `96px` |
| `size.blueprintMd` | `160px` |
| `size.blueprintLg` | `300px` |
| `size.dialog` | `480px` |
| `size.toast` | `360px` |
| `size.form` | `560px` |
| `size.measure` | `65ch` |
| `size.container` | `1344px` |
| `size.containerProse` | `1160px` |

| Token | Value |
| --- | --- |
| `motion.duration.instant` | `0.01ms` |
| `motion.duration.hover` | `100ms` |
| `motion.duration.ui` | `160ms` |
| `motion.duration.open` | `180ms` |
| `motion.duration.enter` | `300ms` |
| `motion.duration.tab` | `350ms` |
| `motion.duration.chart` | `420ms` |
| `motion.duration.settle` | `700ms` |
| `motion.duration.done` | `400ms` |
| `motion.duration.dash` | `1000ms` |
| `motion.duration.caret` | `1250ms` |
| `motion.duration.glyph` | `1600ms` |
| `motion.duration.pulse` | `2000ms` |
| `motion.duration.shimmer` | `2400ms` |
| `motion.duration.flow` | `2500ms` |
| `motion.duration.glyphSlow` | `2800ms` |
| `motion.duration.glyphCore` | `3200ms` |
| `motion.easing.ease` | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| `motion.easing.standard` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `motion.easing.settle` | `cubic-bezier(0.645, 0.045, 0.355, 1)` |
| `motion.easing.enter` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `motion.distance.settleFrom` | `16px` |
| `motion.distance.lift` | `12px` |
| `motion.distance.dash` | `-6px` |

| Token | Value |
| --- | --- |
| `opacity.dotOff` | `0.3` |
| `opacity.dotTrack` | `0.15` |
| `opacity.dotField` | `0.12` |
| `opacity.ghost` | `0.5` |
| `opacity.disabled` | `0.5` |

| Token | Value |
| --- | --- |
| `breakpoint.sm` | `640px` |
| `breakpoint.md` | `768px` |
| `breakpoint.lg` | `1024px` |
| `breakpoint.xl` | `1280px` |

## Components

### Button

**Use.** One inverse pill per region (form, dialog, header); secondary for the rest; ghost in toolbars and nav.

**Anatomy.** Pill, label `font.size.small` 510, sentence case, verb first, 1 to 3 words; optional
trailing arrow or 16px icon, gap `space.6`. Sizes: `size.control` (padding 0 `space.12`), `size.controlLg` (0
`space.16`; forms and content actions), `size.touch` (0 `space.20`, `font.size.body`; landing hero only). Icon
button: square `size.controlSm`, `aria-label`. Full width: `display:flex;width:100%`, centered.

**Variants.** Inverse: `color.action.primary`, `color.text.onAction`. Secondary: `color.action.secondary`,
`color.text.body`. Bordered: transparent, `color.text.secondary`, 1px `color.border.default`. Ghost: transparent,
`color.text.secondary`. Danger: `color.action.danger`, `color.text.onDanger`. Send (message composers only): a
`color.accent.default` circle with a `color.text.onAccent` icon.

**States.** Hover, press, focus-visible, disabled: Interaction. Loading, only
while a real request runs: a 12px scan glyph replaces the trailing icon, the label becomes a gerund ("Saving"), width
held, `aria-busy="true"`. Done: the label returns.

### Text field

**Anatomy.** Label above (`font.size.small` 510, `color.text.body`); control `size.field` high,
`radius.sm`, `color.surface.card`, 1px `color.border.default`, padding 0 `space.12`, text `font.size.dense`
`color.text.primary`, placeholder `color.text.tertiary`; helper in `font.size.caption` sans,
`color.text.secondary`. Textarea: min 3 rows, padding `space.8` `space.12`, a mono counter right of the helper
("120 / 160"). Search: pill, `size.control`, 16px icon at `space.12`, text from 36px.

**States.** Hover and focus-visible: Interaction.
Disabled: `opacity.disabled` on `color.surface.subtle`. Error: border `color.status.danger`; the message replaces the
helper in `color.status.danger`, `aria-invalid="true"`, `aria-describedby`; never a red fill. Every failed submit,
one-field forms too, shows a banner directly above the actions (`space.32` gap, hairline box,
`color.status.dangerTint` wash, 6px danger dot, "2 fields need attention" in `color.text.body`, `role="alert"`), never
bare red text. Focus moves to the first invalid field, scrolled into view. If it is over one viewport above the banner, a second banner also opens the form.
Async checking: the helper becomes a "Checking" shimmer line.

**Keyboard and screen readers.** Native input; the visible label is its `<label for>`.

### Select

**Anatomy.** Trigger as Text field, value `color.text.primary`, 16px chevron `color.icon.idle` at the right. Prefer a native
`<select>` (`appearance:none`). Custom menus: `color.surface.raised`, `radius.md`,
`elevation.popover`, padding `space.4`, rows `size.rowDense` with `radius.sm`, section labels `.mono-label`,
a 16px check at the right of the selected row.

**States.** Hover, focus-visible: as Text field. Open: chevron and menu per Motion,
the current option highlighted. Option hover or active: `color.surface.hover`. Disabled: `opacity.disabled`. Error: as Text field.

**Keyboard and screen readers.** Custom menus: `role="listbox"`, arrows move, Enter selects, Escape closes and returns focus.

### Checkbox and radio

**Anatomy.** 14px box, `radius.xs` (radio: circle), 1px `color.border.check`, transparent fill; label
`font.size.small` `color.text.body`, gap `space.8`; row height `size.rowDense`. Group label:
`.mono-label` or a 590 `font.size.body` title.

**States.** Hover: Interaction. Focus-visible: outline on the box. Checked: fill and border
`color.accent.default` over `motion.duration.hover`, 1.5px `color.text.onAccent` check (radio: 6px inner dot).
Indeterminate: a 6px bar. Disabled: `opacity.disabled`. Error: outline `color.status.danger` plus the field message.

**Implementation.** Native input (`appearance:none`). The `<label>` wraps input and text (or is padded) as the hit area, never an overlay (Never).

### Switch

**Anatomy.** Track 28x16 `radius.full`; off: `color.surface.press` with 1px `color.border.check`, 12px thumb
`color.text.secondary` inset 2px. On: track `color.accent.default`, thumb `color.text.onAccent` at the right. Label
left in `font.size.small` `color.text.primary`, description below in `color.text.secondary`; the switch right-aligned
in settings rows (`size.row`, hairline between rows).

**States.** Hover: Interaction. Focus-visible: outline on the track. Toggle: thumb and track over
`motion.duration.hover`, `motion.easing.standard`. Disabled: `opacity.disabled`.

**Implementation.** `<input type="checkbox" role="switch">` stays native and drives the visuals.

### Tabs

**Anatomy.** Text tabs: `font.size.small` 510 `color.text.secondary`, height `size.control`, gap `space.24`, a
`color.border.subtle` hairline under the row; the selected tab `color.text.primary` with a 2px `color.text.primary`
indicator on the hairline that slides (Motion). Segmented pills (inside panels,
option pickers): track `color.surface.card`, `radius.full`, padding `space.2`; items `size.controlSm`; the selected
item `color.surface.press` with `elevation.ring`, text primary. Option pickers: native radios in labels, the input
visually hidden (`position:absolute;opacity:0;width:1px;height:1px`); `:has(:checked)`
selects the segment, `:has(:focus-visible)` outlines it.

**States.** Hover: `color.text.body`. Focus-visible: outline. Selected: as above, `aria-selected="true"`. Disabled:
`opacity.disabled`. No panel animation. Keyboard: arrows, Home, End.

### Navigation

**Header.** `size.header`, sticky. Left: the product name as text (`font.size.body` 590); ghost nav pills (`size.control`, `font.size.small` 510, gap `space.4`); right:
secondary links, a 1px 16px-tall `color.border.default` divider, one inverse pill. Cart or inbox: icon button with a
count badge at its top right. Under `breakpoint.md`: name, inverse pill and a menu icon button opening a sheet
(`color.surface.subtle`, rows `size.row`, hairlines).

**Section current.** On a detail route the section's link also gets class `is-section` (pathname starts with its
path), styled as current; `end` and `aria-current` unchanged.

**Sidebar.** `size.sidebar`, `color.surface.subtle`, hairline right edge, padding `space.12` `space.8`; group labels
`.mono-label`, `space.16` above; rows `size.rowDense`, `radius.sm`, 16px icon `color.icon.idle`,
`font.size.dense` `color.text.secondary`. Current row: `color.surface.tint`, text and icon primary,
`aria-current="page"`. Under `breakpoint.lg`: text-only nav pills (no icons) that wrap (`flex-wrap:wrap`, gap
`space.4`), so every item shows at 390px; over 6 items, one full-width secondary pill named after the current page
opens the sheet.

**Contents list.** `font.size.small` secondary links; the current one primary with a 2px `color.text.primary` bar
on a hairline track at its left. Breadcrumbs: " / " separators.

**Footer.** Hairline top; `font.size.small` secondary link columns under 510 primary titles.

### Card

**Anatomy.** `color.surface.card`, 1px `color.border.default`, `radius.md`, padding `space.20` (app) or `space.24`
(content). `.mono-label` meta above the title; body
`color.text.secondary`. Media on top: a spec plate or photo, flush, the card padding below. KPI card: mono label on one line
(ellipsis, full label in `title`; under `breakpoint.sm` a shorter label or one card per row) so values align; change in `font.size.small` with a 6px status dot. Plan card:
tier slabs, name, price `font.size.h3`, 16px checks.

**States.** Linked card: the title link's `::after` covers the card; controls inside get `position:relative;z-index:1`.
Current or selected: border `color.border.strong` plus a "Current" badge. Loading: static bars on
`color.surface.hover`. Error: a danger banner inside with Retry.

### Table

**Anatomy.** No outer box: a hairline above the head and under each row (`color.border.subtle`), no zebra, no
vertical rules. Head: `.mono-label`, height `size.rowDense`. Rows `size.row`
(`size.rowDense` from 20 rows), cells `font.size.small` `color.text.body`, padding 0 `space.12`, 0 at the outer ends (text on the section
head's edges); first column
`color.text.primary` 510; IDs, timestamps and codes mono caption; numbers right-aligned tabular (`.num` on `th` and `td`). Status: 14px status
icon plus word. Row actions: bordered pills (`size.controlSm`) or icon buttons at the right, the same style at every
width. A badge naming the row ("This device") sits inline at the end of the first line's span
(`margin-left:space.8`), never in the pin or beside the lines. Sort: a 12px chevron after the head label, rendered only on the sorted column (no placeholder); in a right-aligned head (`.num`, `.pin`) it comes first, so the
label ends on the cells' edge (CSS below).

**States.** Hover, focus-visible (interactive rows) and selected (`aria-selected`): Interaction. Sorted head
`color.text.secondary`, `aria-sort`. Syncing row: a 12px rise glyph in its status cell. Loading: 5 static rows of
`color.surface.card` bars. Empty: the empty state in one full-width cell. Error: a danger banner above with Retry.

**Small screens.** From `breakpoint.sm` to `breakpoint.md` the table scrolls in its wrapper, first column
`white-space:nowrap`, `min-width:160px`; the pinned column (row actions, else status, else the key number) is `.pin` on
`th` and `td`: one value, empty on a row without it, never wider than its widest value plus `space.24`.
Its head is one short visible mono word ("PROJECTS", "STATUS"), or the value carries its unit ("4 projects") under an
`.sr-only` head; only an actions pin's head may be empty. Under `breakpoint.sm` the first cell holds at most two one-line spans with an ellipsis: the primary value, then its own second span
(email, ID) or a hidden column's value via `data-sub` (never duplicated in the DOM); if one row has a second line, all
do (`data-sub=""`). Markup: `table.tbl` in
`.tbl-wrap`; first `td` > `.cell-first` > avatar, `.cell-lines` > one or two spans.

```css
.tbl :is(th,td):first-child{padding-left:0;} .tbl :is(th,td):last-child{padding-right:0;}
.tbl .pin{position:sticky;right:0;z-index:1;text-align:right;background:var(--pin-bg,var(--color-surface-default));box-shadow:inset 1px 0 0 var(--color-border-subtle);}
.pin::before{content:"";position:absolute;inset-block:0;right:100%;width:var(--space-16);pointer-events:none;
  background:linear-gradient(90deg,transparent,var(--pin-bg,var(--color-surface-default)));}
tr:hover .pin{background:linear-gradient(var(--color-surface-tint),var(--color-surface-tint)),var(--pin-bg,var(--color-surface-default));}
.tbl .sort-button{display:inline-flex;align-items:center;gap:var(--space-4);padding-inline:0;}
.tbl :is(.num,.pin) .sort-button{flex-direction:row-reverse;}
.cell-first{display:flex;align-items:center;gap:var(--space-12);min-width:0;}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}
@media (max-width:639.98px){ /* breakpoint.sm */
  .tbl-wrap{overflow-x:visible;}
  .tbl{width:100%;}
  .tbl :is(th,td):not(:first-child):not(.pin){display:none;}
  .tbl :is(th,td):first-child{width:100%;max-width:0;overflow:hidden;}
  .tbl .pin{width:1%;white-space:nowrap;}
  .tbl .pin::before{display:none;}
  .cell-lines{flex:1;min-width:0;}
  .cell-lines>*,.cell-lines[data-sub]::after{display:block;line-height:var(--font-line-height-ui);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .cell-lines[data-sub]::after{content:attr(data-sub) "\00a0";color:var(--color-text-tertiary);}
  .cell-lines .badge{padding:0;border:0;} .cell-lines .badge-label{position:absolute;clip:rect(0 0 0 0);}
}
```

Inside a card set `--pin-bg:var(--color-surface-card)`.

**Accessibility.** Real `<table>`, `<th scope>`, sort buttons inside head cells.

### Badge

**Anatomy.** Height 20px, `radius.full`, padding 0 `space.8`, 1px `color.border.default`, transparent fill,
`font.size.caption` sans 510 `color.text.body`; a leading 6px dot in the status hue (or a 12px status icon), gap
`space.6`; the text in a `.badge-label` span. Count badge: its own class, never combined with `.badge`; on an
icon button it sits inside the button (`position:absolute`, `pointer-events:none`):

```css
.count{display:inline-grid;place-items:center;min-width:16px;height:16px;padding:0 var(--space-4);border:0;
  border-radius:var(--radius-full);background:var(--color-action-primary);color:var(--color-text-on-action);
  font:var(--font-weight-semibold) var(--font-size-micro)/1 var(--font-family-sans);font-variant-numeric:tabular-nums;}
```

**States.** Static; interactive chips: Interaction (filter chip). Current: border `color.border.strong`.

### Dialog

**Anatomy.** Native `<dialog>` where it exists. Panel max `size.dialog`, `color.surface.subtle`, `radius.lg`,
`elevation.popover`, padding `space.24`: mono caption label (the object or step), title `font.size.title` 590, body
`font.size.body` `color.text.body`; footer right-aligned, gap `space.8`: bordered Cancel, then the inverse pill
(danger for destructive confirms). Scrim `color.surface.overlay` with `backdrop-filter:blur(4px)`. Under
`breakpoint.sm`: full width at the bottom, top corners `radius.lg`, actions stacked, primary first.

**States.** Open and close: Motion; the scrim fades.
Focus goes to the first control; Escape or Cancel closes and refocuses the trigger. Submitting: button
loading state. Error: a danger banner above the footer. `aria-labelledby` the title.

### Toast

**Anatomy.** Bottom right, `space.24` from the edges (full width minus `space.16` under `breakpoint.sm`), width
`size.toast`, `color.surface.raised`, `radius.md`, `elevation.popover`, padding `space.12` `space.16`: a 16px leading
status icon (the core glyph while running), text `font.size.small` `color.text.primary`, optional ghost
action and close icon button. Up to 3 stacked, `space.8` apart.

**States.** Enter and leave: opacity (Motion; leave `motion.duration.ui`). Running: live edge, title shimmer, core
glyph; done: the done frame, then the check icon.
Error: error icon, message, Retry. Auto-dismiss after 5s unless it has an action or focus.

**Accessibility.** Text goes through the status region; never steals focus.

### Empty state

**Anatomy.** Centered in its container, max 360px wide, padding `space.48` `space.24`: a drawing (the 48px empty
glyph in panels and tables; a `bp--md` stack at `opacity:0.8` on full screens), `space.16`, a mono caption
("NO RESULTS"), `space.8`, a two-tone sentence in `font.size.body` (what is empty, then what to do), `space.20`, one
secondary pill (inverse if the screen's only action). Error variant: the error glyph or the broken-connector
blueprint on a quiet stage, a mono code ("ERR 404"), a 590 heading and two pills.

**States.** Static.

## New project

1. Inspect the stack; propose an installation plan and wait for approval. Ask which appearances the product supports. Both: tokens.css follows the device; a theme switch sets `data-theme` on `html` only if the product has or asks for one. One: dark (`<html data-theme="dark">`, `color-scheme: dark`) unless the user asks for light.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the theme).
3. Self-host Inter (variable, weights 400, 510 and 590) and Geist Mono 400 (the npm font packages or local files, `@font-face` with `font-display:swap`); never a font CDN. Root: body `color.surface.default`, `color.text.body`, sans `font.size.body`, `font.lineHeight.body`, `font.tracking.body`; headings primary, `text-wrap:balance`; `p, li{text-wrap:pretty}`; `fieldset{margin:0;padding:0;border:0;min-width:0} legend{padding:0}`; `pre, code, kbd, samp` mono; global `:focus-visible`; the reduced-motion block; `html, body{overflow-x:clip}`.
4. Build the six signature elements first, as reusable pieces, one per recipe with all its helpers (`pair`, `blueprint`, `specKinds`, dot meter, `ScreenHead`, `.mono-label`). Review them (Verification) before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (`graphite-blueprint, updated <the spec's update date>`), the tokens, and `components.md`: conventions, where each signature element is used, each blueprint's subject by screen.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan and wait for approval. Ask about appearances as in New project.
2. Map the tokens onto the existing variables (aliasing old names). A brand action color becomes `color.action.primary` (the inverse pill), never the accent. Fonts and root setup as in New project step 3.
3. Build the signature elements, restyle one representative screen with them as a sample, and wait for review.
4. Continue screen by screen, one commit each.
5. Preserve routes, logic, API contracts, form fields and validation, test ids, text used by tests and accessibility attributes. Restyle existing markup; keep native inputs.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; use semantic tokens and existing components; no hard-coded colors, sizes, radii, shadows or durations.
- Every new screen gets the signature elements its context calls for in Applying the concept; a screen without them is unfinished.
- Uncovered needs: compose from tokens and note it in `components.md`. Conflicting requests (colored primary, spinner, bold headings): present options.

## Verification

- Build passes; run the project's unit and end-to-end tests if they exist, else report they were not run.
- Review loop, two rounds or more: render each signature piece alone at 2x, dark and light, in a temporarily edited existing page (never a new file); compare with its recipe (light falloff, 0.5px strokes, vertex rounding, hidden faces, lit and unlit dots, caption position), note three or more differences, fix, render again.
- Each screen at 1440px and 390px, dark and light: no sideways scroll; status and row actions visible; no bare `serif` or `monospace` text; captions name the item; every badge, chip and count legible at 2x; columns of a row end within 48px of each other (1440px).
- At 390px: every nav item fully visible; the closing at most 2 lines; tables show only the first and the pinned column, no stray glyph, no word cut except by an ellipsis, equal rows, a badged row's second line uncut; KPI values level.
- Measure at 1440px and 390px and paste the numbers with the method (a browser's `getBoundingClientRect()`, or pixels ÷ 2 in a native-size 2x screenshot; never computed from CSS): each `.bp-fig` width against Signature 3 → Limits; each right-aligned head's right x (numbers, pin) beside its cells' (equal); each settings group's last visible block to the next rule, status regions empty (48); an article's left x for brand, breadcrumb, h1, Related and footer (one value).
- Check: blueprint-row captions and titles level; section prose beside or under its opener, no phrase or link twice in a section; a content home's first viewport has one large headline; articles put h1, meta and lead plate before the contents list; every pin head readable; no two hairlines with nothing between, no plate caption ending in an ellipsis, no "+" on a link; a failed submit focuses the first invalid field, a banner within one viewport of it; across apps, counts, result lines and the closing's label are the same uppercase `.mono-label`, the closing one line at 1440px, one tone per sentence.
- Reduced motion (emulated): nothing loops, glyphs show their rest frame, every block is final.
- Tab through every screen: the indigo outline always visible. Click each checkbox, radio and switch on the box, not its label.
- Walk the ten rules and the Never list. Check the diff: no review edit, page or script remains. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and the signature pieces are separate commits, reverted last.
