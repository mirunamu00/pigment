## Character

Quiet and exact; the product's own UI is the image.

## The ten rules that define this look

1. **Graphite ground, one grey step per level.** `color.surface.default` covers 80% of every screen or more;
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
7. **Show the product on a stage.** The main image of a screen is this product's own UI on a spotlit stage
   (signature 1); one lit stage per viewport. Why: the UI proves itself.
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
  segmented option; two hairlines under 32px apart with nothing between; a closing statement under `font.size.h2`.
- Content hidden until script runs; detecting automation, test runners or headless browsers; changing motion or
  config to review your work.
- Sideways page scroll at 390px; exclamation marks or emoji in copy; copy that explains the design system or how a
  drawing was made.

## Signature elements

### 1. Spotlit product stage

**What.** A hairline panel whose ground carries a radial light from its top edge. A raised window runs off the bottom
edge, fading over its last 30%, holding this product's real UI from its own components at true scale (list, detail,
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

**Limits.** At most two quiet stages per viewport; the window spans at least 60% of the stage width. A
stage sits on the ground or in one hairline grid cell, never in a bordered card (a panel that is mainly a quiet stage
drops its border and fill, title above). Panels in a row end together (`align-items:stretch`): beside a
list, the stage's column is a flex column with the stage `flex:1` (window and chart svg `height:100%`, at least
`size.stageMini`), or the list is capped at the stage's height with "View all →"; no empty band in a panel. A demo window's sample text appears nowhere else; it is `inert` and
`aria-hidden="true"`; a functional window (a real chart) stays accessible.

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

**Where.** Panel or route loading: 16px scan plus a gerund, centered, after 300ms. Buttons, syncing rows, toasts,
empty states: their components. Any 1-to-5 level (password strength, a person's load): the dot meter. Closing sections: the dot field.

**Limits.** At most 3 running glyphs visible. The dot field never sits under body text.

### 3. Isometric hairline blueprint

**What.** Slabs and boxes in 2:1 isometric, 0.5px strokes, vertices rounded but machined; filled faces hide what is
behind, a soft shadow under each slab. Marks: a 5x5 dot grid on a top face, dashed connectors with chevrons for flow. Each drawing sits on the ground, a mono "FIG 0.n"
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
// viewBox = slab bounds + 5%: g.bp-fig fills 91% of the svg.
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

**Motion.** Every connector marches with its chevrons (reverse flow: `animation-direction:reverse`), the
illustrative one in an opener row too; only a stopped connection (disconnected, broken) is static. On card hover, or
once at 30% in view on landing pages, script adds `is-lifted` (at most 3 levels). Reduced motion: dashes still,
chevrons evenly spaced, slabs at rest.

**Where.** Landing or about page: a row of three captioned blueprints opening a section, three
subjects: a stack, a connected pair (`pair()`, marching) and a box (one slab, h about 0.7w,
dots on top), never two that differ only in slab count; captions and titles level across the row. Integrations:
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
figure, one of eight kinds picked by the item's id, and a mono caption bottom-left: number and one fact, `FIG 03 · 18 OZ CANVAS` on products, `NO. 07 · DESIGN` on posts; never the number or category alone. Same id, same figure everywhere.

**Recipe.**

```js
const hash=(s)=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;return h;};
// Kinds over the full list's own order (featured item included); a kind repeats only after all 8 are used:
// specFigure(id, kinds.get(id)) on every screen.
function specKinds(ids){const m=new Map(),seq=[];for(const id of ids){let k=hash(id)%8;while(seq.slice(-7).includes(k))k=(k+1)%8;seq.push(k);m.set(id,k);}return m;}
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
.plate .mono-label{position:absolute;left:var(--space-12);bottom:var(--space-8);}
```

**Motion.** Static. Hovering its card changes the card only.

**Where.** Product cards, product detail (same figure, larger), blog post cards, the featured
post and an article's lead plate (`plate--wide`), article image placeholders (caption below as a `.fig`).

**Limits.** Real photos take `radius.md`. One figure number per plate (its caption or a `.fig`
below, never both); the item name in text, once per viewport (breadcrumbs aside); no shared kind in a grid row or between adjacent
posts (`specKinds`).

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

**What.** A section opens with a full-width hairline, a headline left and, from the 50% line, a
description with a small secondary link ending in "→" or "+". A two-tone statement sets a lead sentence in `color.text.primary` that continues
in `color.text.secondary` at the same size and weight. Mono labels number figures and steps.

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
.screen-head+*,.screen-head+* :is(thead th,.tbl){border-top:0;}
@media (max-width:767px){.opener,.screen-head{grid-template-columns:1fr;gap:var(--space-16);}.opener{padding-top:var(--space-96);}
  .opener h2{font-size:var(--font-size-h3);}.opener p{font-size:var(--font-size-prose);}}
```

**Motion.** Static.

**Where.** Content sections (opener; a centered closing statement with two pills). App screens:
`.screen-head`, mono label and h1 left, a one-line two-tone summary (`font.size.body`) right. App sections (cart,
checkout, settings groups, long forms): a mono "01 / 02" counter and 590 `font.size.body` title left, a one-line
secondary description right.

**Limits.** One two-tone statement per section, 1 to 3 sentences. Every content section down the page opens with the
full opener, h2 at the Typography size (48px at 1440px) and the description right; filters, counts or "View all" go
below it, never instead. Never shrink section h2s to protect the h1; no second h2-size headline in a
section. A section's prose follows its opener (right column under the
description, or at `size.measure` from the left edge), never below a figure row in one half; the description never
repeats its first sentence.

## Color use

- Tooltips `color.surface.raised`, code blocks `color.surface.code`.
- Inline links `color.text.primary`, 1px underline in `color.icon.idle`, 3px offset.
- Status: the hue (rule 3) plus a `color.text.body` label; only danger colors text; banners per Text field.
- Charts: `color.chart.mark`, others `muted`, one series `highlight`, at most 3 `color.chart.grid` lines, no frame.
- **Appearance.** Dark is canonical (New project, step 1); stages, blueprints, plates and glyphs switch with their
  tokens.

## Typography

Size / line height, weight, tracking (`font.size.*`, `font.lineHeight.*`, `font.tracking.*`), color:

- Landing h1: `clamp(var(--font-size-h3),6vw,var(--font-size-h1))` / display, 510, display, primary.
- Content h1 and section h2: `clamp(var(--font-size-h3),5vw,var(--font-size-h2))` / display, 510, display. Closing statement:
  `clamp(var(--font-size-h2),6vw,var(--font-size-display))`, at most 24 characters ("New posts. One email.", "Free shipping over $100."):
  at most 2 lines, 48px at 390px; longer copy goes in the form's helper line.
- App-screen h1: `lead` / heading, 590, lead. Product name, KPI value: `h3` / heading, 510, display, tabular.
- Lead and opener text: `lead` / lead (`prose` under `breakpoint.md`), 400, lead, body color.
- Article: body `prose` / prose, 400, body color; h2 `lead`, h3 `title`, both 590 / heading.
- Body and panel text `body` / body, 400. Panel, card and group titles `body` / ui, 590 app or 510 content, primary.
- Meta `small` / ui, 400.

Numbers use `tabular-nums`. Prose max `size.measure`. Code: mono `small`. One h1 per screen.

## Spacing and density

- Base 4px, rhythm 8px, half-step `space.6`. Content sections: opener `padding-top` per its recipe, `space.128` under `breakpoint.xl`; opener to its stage or grid `space.96` (`space.48` mobile).
- App screens: page padding `space.32` (`space.20` under `breakpoint.md`); `.screen-head` then content after
  `space.24`; panels `space.16` apart; panel title to content `space.12`.
- Forms: fields `space.20` apart, label to control `space.6`, helper `space.6` below, actions `space.32` below.
  Settings groups: `space.48` from one group's last content (card grids too; no margin under a grid) to the next
  group's hairline.

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
- Stage settle, slab lift, loops: signatures 1, 2, 3, 5.

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
- Text link: underline `color.icon.idle` → `color.text.primary`.
- Linked card: `color.surface.hover`, border strong, `motion.duration.ui`; no press.
- Table row: `color.surface.tint`; selected `color.accent.subtle` plus a 2px accent bar at the left.
- Input, select: border default → strong.
- Disclosure row: text primary on `color.surface.hover`; open per Motion.
- Checkbox, switch: outline → `color.text.secondary`.

Hover rules sit inside `@media (hover:hover) and (pointer:fine)`. Disabled: `opacity.disabled`, no hover or press,
`cursor:not-allowed`.

## Layout adaptation

- Container max `size.container` (`size.containerProse` for docs and articles), side padding
  `clamp(var(--space-20),4vw,var(--space-48))`; 12 columns from `breakpoint.lg`, gap `space.24`; 4 columns below
  `breakpoint.md`. Grid and flex children `min-width:0`.
- Card grids are hairline grids: container `border-top` and `border-left`, each cell
  `box-shadow:1px 0 0 var(--color-border-subtle),0 1px 0 var(--color-border-subtle)`, padding `space.24`; 3 or 4
  columns, 2 under `breakpoint.lg`, 1 under `breakpoint.sm`.
- Forms one column, max `size.form`; a preview, banner or panel stacked in that column takes the same width, a preview above the fields, never before the actions; under `breakpoint.md` actions stack full width, primary first.
- Wide tables: Table → Small screens (actions column pinned).

## Applying the concept

Dense screens get less, never nothing.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing hero | Lit stage (from below) with the core screen, h1 left, two pills | Full |
| Content section | Split opener; a stage, a 3-blueprint row or a hairline grid below | Every section |
| Closing: newsletter, store and blog lists | Centered two-tone statement over the dot field (a store: its shipping or returns promise) | Once per page |
| Dashboard | KPI cards; dot-column chart on a quiet stage that is the panel, ending level with the activity list beside it (else the chart spans the row, activity below) | One quiet stage |
| Data table | Table component; a 1-to-5 load as the dot meter beside its number (number only in the pin under `breakpoint.sm`) | Type and dots |
| Store grid | Opener; hairline grid of plate cards, mono category labels; filter chips | Plates |
| Product detail | Spec figure on a quiet stage, its caption the only FIG; mono `CATEGORY · IN STOCK` over the name; segmented pills; Details rows numbered in mono (`01`) | One quiet stage |
| Cart, checkout form | App section heads (Signature 6 → Where); confirmation: joined-parts blueprint, two-tone sentence | Light |
| Blog | Split masthead, then an opener per section; featured post: wide plate and text, no card around them; mono dates | Plates, an opener per section |
| Article | Breadcrumb, h1, meta, lead plate (`plate--wide`, `NO. 05 · TOPIC`); contents list a side rail from `breakpoint.lg`, else after the plate in a closed `<details>`, never above the h1 | Lead plate |
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
