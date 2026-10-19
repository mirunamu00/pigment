## Character

An unhurried, editorial calm: ink on paper, the voice in cel-drawn pictograms and pastel stages, everything else silent.

## The ten rules that define this look

1. **Warm paper, warm ink.** Page `color.surface.default`, text `color.text.primary`; `color.surface.raised` cards, inputs, overlays; `color.surface.subtle` bands, tracks, skeletons. Why: cool gray or black breaks the paper.
2. **Color is a whisper.** The warm accent is only the focus outline, a prompt's send square, the working glyph and one hero drawing fill per page. Why: it is 0.1% of a screen.
3. **Serif headings, quiet sans.** Headings `font.family.serif` at 400 (h1 and larger) or 500, sentence case, no trailing period; everything functional `font.family.sans`; nothing above 500. Why: the serif is the editorial voice.
4. **Prose sections open with a pictogram.** Prose sections (landing, about, features) open with a `size.pictoLg` drawing, list sections (item lists, related, archive) with the h2 alone; a second opener in a viewport is `size.pictoMd`. Product screens: one `size.pictoSm` beside the h1, never per panel. Why: the drawings carry the personality.
5. **Pictograms are cel-drawn ink.** Brush lines of uneven weight, one off-register fill, redrawn frame by frame (`motion.duration.frame`) in one stepped animation on entering view, once, held. Why: it reads as drawn by hand.
6. **Product UI is staged.** Charts, media, previews, offer or choice cards and one highlight panel per dense screen sit on a pastel stage (`color.stage.*`, `radius.stage`) with faint wandering lines; text summaries never. Why: UI is never shown bare.
7. **Motion settles slowly.** Entrances `motion.duration.rise` to `motion.duration.reveal` on `motion.easing.settle`; headings fade in word by word; nothing bounces. Why: the slow settle is the tempo.
8. **Depth from rings and tone.** 1px rings and tonal bands; hover thickens a ring to `border.width.ring`; only overlays get `shadow.overlay`. Why: shadows turn paper into plastic.
9. **Focus is warm, waiting is drawn.** Focus is a `border.width.ring` `color.focus.ring` outline; "working" is the written-loop glyph inside the control that started it, only while a request is pending. Why: waiting stays hand-made and honest.
10. **Leave room.** Wide section gaps (Spacing), text max `size.measure`, headings `size.measureHeading`. Why: emptiness lets the drawings speak.

## Never

- Cool grays, pure black or white page grounds; gradients, textures, noise, blur, glass.
- All-caps, title-case or italic headings.
- Other illustration styles, emoji, 3D, stock art, or any drawing traced or copied.
- A pictogram that tweens, shows a blank frame, loops after drawing (boil excepted), or sits in a cell, row, field, button, nav, badge or toast.
- Disabling or overriding motion, editing test or harness config, or detecting automation to review your work (review under reduced-motion emulation); block rise stays on product screens.
- Artificial delays to show a working state; a glyph beside its button; a second `role="status"` region.
- A star, asterisk, burst or spark shape anywhere.
- Spinners, progress rings, skeleton shimmer, bounce or overshoot easing, parallax, hover scale-up.
- Shadows on controls, rows or resting cards; borders over 2px.
- Pastel fills on buttons, badges, rows or the page.
- A plate or stage holding only an icon or nothing (a flat color block); a drawing or media stage flatter than 16:9; drawing ink spanning under 55% of its box.
- An object cut by a plate or stage edge: only wrists and stage lines leave the frame.
- Notched, dashed or torn strokes; large strokes of one uniform width with blunt ends; ink over the weight targets.
- One item's drawing on another item's card or detail page.
- Creature, spring or mitten hands: coiled, stacked, short, fat or touching fingers; a tick where a finger meets the palm; a ball palm; a wrist ending in the air or inside a stage; a dome or round object held up like a head; one pose on over a third of an app's hands.
- Horizontal scroll at 390px; a row action pushed off-screen; exclamation marks or hype words in copy.

## Signature elements

Once at the app root: two brush filters in three seeds each (the gentle `lg` set for boxes over 160px) and the
frame clip, which keeps a stroke leaving one frame's edge out of its neighbor.

```js
const set=(id,freq,oct,scale)=>[3,8,14].map((seed,i)=>`<filter id="${id}${i}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${oct}" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${scale}" xChannelSelector="R" yChannelSelector="G"/></filter>`).join("");
const brush=set("inkleaf-brush-",0.045,2,2.6)+set("inkleaf-brush-lg-",0.02,1,0.9);
document.body.insertAdjacentHTML("afterbegin",`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${brush}<clipPath id="inkleaf-cel"><rect width="120" height="120"/></clipPath></defs></svg>`);
```

### Cel-drawn ink pictogram

**What.** One everyday object in brush-ink lines (`color.pictogram.ink`) that swell and taper, plus one flat
off-register fill (`color.pictogram.fill` or `fillAlt`; `color.pictogram.accent` only on the hero), filling 60 to 75%
of a square box on empty paper: no ground line, frame or background.

**Recipe.** 120 x 120 viewBox:
1. Subject: write the screen's task as a verb (find, pay, invite, file), list three things a person holds to do
   it off-screen, and take the clearest silhouette the app has not drawn yet that names this app's domain, not
   generic office work (an empty result shows what was looked for). Never vehicles, toys or a subject this spec
   names; skip the first object anyone would draw for the task (the stock symbol for search, mail or payment)
   unless the screen is literally about that object. No two drawings in one app share a silhouette. At least half of
   each app's drawings show a hand (Hands, below); a hand that cannot leave through an edge is left out.
2. Draw the defining feature first, slightly oversized, so it names the subject at 48px (a watering can's spout
   and rose). 7 to 14 strokes, each
   one open path of 1 to 3 cubic curves; widths 2.8, 3.4 or 4.0 units; some joins overshoot 1 to 2 units, others
   stop short. No straight run over 15 units: a rectangular body is 2 to 4 bowed strokes with one overshooting
   corner, never one rectangle path; straight-edged subjects (rulers, frames, flat books) are tilted and bowed or
   replaced.
3. One closed fill path roughly tracing the main body, under the lines, shifted 3 right and 2 down.
4. At `size.pictoSm` draw a simpler version: 5 to 7 strokes, widths 4.0 to 5.0, fill shifted 6 and 5
   (`picto--sm`), so the weight and the off-register edge (at least 2px) survive at 48px. The object is at least
   70% of its ink; a hand comes from the side or below with at most 3 one-stroke fingers 12 units apart; the
   defining feature is the largest shape (an umbrella's canopy, not its handle).
5. One-word test, every drawing (header, plate, stage, empty state): write in `components.md` the word a stranger
   would give it at its size; redraw any that names something else or a creature. Common misreads: a small
   object read as a ball (enlarge its defining part); a held round or domed object read as a head (draw it alone
   or held by its edge or handle); an object drawn without its defining part read as another; a folded or stacked
   item losing its defining detail (show a fold, fringe or stripe).
6. Frames: one per stroke in drawing order (contour, details, hand), the fill joining at about 60%, then 3 "boil"
   frames on alternating brush seeds. Frames = strokes + 3: 8 to 10 at `size.pictoSm`, 10 to 17 above. Never
   pad with repeated or empty frames. They sit in one strip (frame k at x = k x 120); one stepped animation slides
   it, so exactly one frame ever shows.

**Hands.** Built from parts, never a copied pose. Thumb: one stroke from the wrist up to its tip, curling over;
then from the tip down into a V and up to the first finger's base. Fingers (above `size.pictoSm`): 3 or 4 `finger()` hairpins, 4 to 5x
as long as wide, based on the knuckle line 9 to 11 units apart (never at the previous finger's end), never
touching, middle longest, last shortest, the last one's return side running on as the second wrist; no knuckles,
nails or ticks. The wrist strokes, 18 to 26 units apart, leave through the edge the hand enters from (on
a plate or stage, its edge: `wrist-*` classes). A held object touches the fingertips or palm; a handle ends inside
the grip. Poses, rotated or mirrored to enter from any edge:
- Present (from below; the demo): fingers at -53°, lengths 24, 28, 26, 21; a flat or long object rests on the tips.
- Grip (a handle, strap or pole across the palm): 3 fingers 18 to 24 long wrap it, fanned 8 to 12° apart (never
  parallel rungs), tips just past its far edge; the thumb curls over the near side.
- Pinch (from the top or right): thumb and index tips meet on the object's edge; 2 fingers 14 to 18 long fold beside.
- Point (from the side): index 28 to 32 long, tip 4 to 8 units short of the target; 3 fingers 10 to 14 long folded.

One pose on at most a third of an app's hands; neighboring plates never share one; at most half the plates on a
page show a hand.

```js
// A hairpin finger from its base (x,y) on the knuckle line, pointing deg (0 right, -90 up), len units long.
function finger(x,y,deg,len){
  const a=deg*Math.PI/180, c=Math.cos(a), s=Math.sin(a);
  const P=(u,v)=>`${(x+c*u-s*v).toFixed(1)},${(y+s*u+c*v).toFixed(1)}`;
  return `M${P(0,-2.5)}C${P(len*0.35,-2.3)},${P(len*0.75,-2)},${P(len,-1.75)}C${P(len+2.5,-1.5)},${P(len+2.5,1.5)},${P(len,1.75)}C${P(len*0.7,2)},${P(len*0.3,2.3)},${P(0,2.5)}`;
}
// Demo, Present pose: a leaf on an open hand, wrists off the bottom. Never ship this subject.
const knuckle=(i)=>[62+8*i,74+6*i]; // finger bases 10 units apart
const leafOnHand={fillAfter:2, fill:"M28,52C40,30,78,20,100,38C82,56,50,60,28,52Z", strokes:[
  ["M28,52C46,60,80,56,100,38",4.0],["M27,53C38,30,76,20,100,38",3.4],["M18,58C42,52,70,46,96,39",3.4],
  ["M50,49C54,42,58,37,62,33",2.8],["M72,45C76,40,80,35,84,32",2.8],
  ["M36,122C35,104,30,82,29,66C28,60,31,57,34,58",4.0],["M34,58C37,66,41,76,45,83C50,80,55,76,60,73",3.4],
  ...[24,28,26,21].map((len,i)=>[finger(...knuckle(i),-53,len)+(i===3?"C82,100,70,110,62,122":""),i===3?3.4:2.8])]};
// Inner HTML of <svg class="picto" viewBox="0 0 120 120" aria-hidden="true">. weight: 1 up to 160px, 0.7 on plates,
// 0.6 on drawing stages and the hero. Below 1: lg filter, each stroke 6 nested copies, shorter and wider (45% wide
// end to end, 100% over the middle 40%), so it swells and tapers.
function celStrip({strokes,fill,fillAfter},{weight=1,boil=3}={}){
  const layers=weight<1?[0,1,2,3,4,5].map((j)=>[0.45+0.11*j,0.06*j,1-0.12*j]):[[1,0,1]];
  const counts=strokes.map((_,i)=>i+1).concat(Array(boil).fill(strokes.length)), n=counts.length;
  const frames=counts.map((c,k)=>{
    const ink=strokes.slice(0,c).flatMap(([d,w])=>layers.map(([m,from,len])=>
      `<path d="${d}" stroke-width="${w*weight*m}" pathLength="1" stroke-dasharray="${len} 2" stroke-dashoffset="${-from}"/>`)).join("");
    const paint=c>fillAfter?`<path class="picto-fill" d="${fill}"/>`:"";
    return `<g transform="translate(${k*120} 0)" clip-path="url(#inkleaf-cel)" filter="url(#inkleaf-brush-${weight<1?"lg-":""}${(n-1-k)%3})">${paint}<g class="picto-ink">${ink}</g></g>`;
  });
  return `<g class="cel-strip" style="--n:${n}">${frames.join("")}</g>`;
}
// Unless reduced motion: "is-ready" on mount; "is-playing" once 30% is in view (IntersectionObserver 0.3, unobserve).
```

```css
.picto{display:block;width:var(--size-picto-lg);aspect-ratio:1;overflow:hidden;color:var(--color-pictogram-ink);}
.picto-ink{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;}
.picto-fill{fill:var(--picto-fill,var(--color-pictogram-fill));transform:translate(3px,2px);}
.picto--sm{width:var(--size-picto-sm);} .picto--sm .picto-fill{transform:translate(6px,5px);}
.cel-strip{transform:translateX(calc((1 - var(--n)) * 120px));} /* final frame: no script, reduced motion */
.picto.is-ready .cel-strip{transform:translateX(0);} /* first stroke, never blank */
.picto.is-playing .cel-strip{animation:cel-run calc(var(--n) * var(--motion-duration-frame)) steps(var(--n),jump-none) forwards;}
.picto.is-boiling .cel-strip{animation:cel-boil calc(3 * var(--motion-duration-frame)) steps(3,jump-none) infinite;}
@keyframes cel-run{from{transform:translateX(0);} to{transform:translateX(calc((1 - var(--n)) * 120px));}}
@keyframes cel-boil{from{transform:translateX(calc((3 - var(--n)) * 120px));} to{transform:translateX(calc((1 - var(--n)) * 120px));}}
@media (prefers-reduced-motion:reduce) {
  .picto:is(.is-ready,.is-playing,.is-boiling) .cel-strip{animation:none;transform:translateX(calc((1 - var(--n)) * 120px));}}
```

Frameworks: render the strip from the same data, toggle classes in an effect. Hero:
`style="--picto-fill:var(--color-pictogram-accent)"`. Rendered ink line at a stroke's middle, measured on the
reference's drawings: 2.2 to 3.2px at 96px, 3.3 to 4.7px at 200px, 5.8 to 8.3px at 416px. Large strokes stay solid,
without notches, and swell and taper like a brush: full middles, thin ends.

**Motion.** The strip steps once and holds (CSS above); boil only while real work is pending; reduced motion: final frame.

**Where.** Hero `size.pictoHero` with the accent fill (`size.pictoXl` under
`breakpoint.md`); feature, offer and onboarding cards `size.pictoMd`, top-left; success confirmations
`size.pictoLg`; full-screen loading boils; the rest per Applying the concept.

**Limits.** One per section; openers per rule 4; one accent fill per page; never scattered, tiled or a background;
never a sprout in a mound, stacked or dropped blocks, a hand catching a ball or globe, a toolbox, tiered plants, a gauge.

### Pastel stage with wandering lines

**What.** A clipped panel in one `color.stage.*` color, `radius.stage` (hero `radius.stageLg`), padding
`space.48`, crossed by 3 to 6 faint freehand lines that run off its edges; cards on it get
`shadow.float`, optionally over a tray (`radius.tile`, a second stage color, 90% wide, `space.16` higher). Drawing
and media stages are 16:9 to 1:1; card and chart stages hug their content plus padding. A **drawing stage** (a featured item's, long-form page's or
item's main image without a photo) is 4:3. A **plate** is the quiet sibling for grid images: stage color, `radius.tile`, no lines,
4:3, holding the photo or, without one, the item's own drawing (Imagery). On both, the drawing's box is square,
92% of the height (never sized by width, so nothing is cut), at most `size.pictoHero`, centered or anchored to
the edge its wrist leaves through; both are at most `size.pictoHero` x 1.25 high, so a wide one never leaves over
35% of its height empty above the drawing. Plates wider than 520px get wandering lines.

**Recipe.**

```html
<figure class="stage" style="--stage: var(--color-stage-sage)">
  <svg class="stage-lines" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
    <path d="M-20,70C60,30,120,120,210,80S350,20,420,60"/>
    <path d="M-10,240C80,200,150,280,260,230S360,170,430,210"/>
    <path d="M300,-20C280,60,360,110,330,180S300,280,350,330"/>
  </svg>
  <div class="stage-content"><!-- chart, raised card, screenshot or pictogram --></div>
</figure>
```

```css
.stage{position:relative;isolation:isolate;overflow:hidden;display:grid;align-items:center;
  margin:0;padding:var(--space-48);border-radius:var(--radius-stage);background:var(--stage);}
.stage--media{aspect-ratio:16 / 9;} /* content may grow it to 1:1; card and chart stages have no ratio */
.stage-lines{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;}
.stage-lines path{fill:none;stroke:color-mix(in srgb,var(--stage) 70%,var(--color-stage-line-mix));stroke-width:8;stroke-linecap:round;vector-effect:non-scaling-stroke;opacity:var(--opacity-stage-line);}
.stage-content > .card{box-shadow:var(--shadow-float);}
.stage--drawing{aspect-ratio:4 / 3;max-height:calc(var(--size-picto-hero) * 1.25);}
.plate{position:relative;isolation:isolate;aspect-ratio:4 / 3;max-height:calc(var(--size-picto-hero) * 1.25);overflow:hidden;border-radius:var(--radius-tile);background:var(--stage);}
.stage--drawing .picto,.plate .picto{position:absolute;left:50%;top:50%;width:auto;height:min(92%,var(--size-picto-hero));translate:-50% -50%;}
:is(.stage--drawing,.plate) .picto.wrist-bottom{top:auto;bottom:0;translate:-50% 0;}
:is(.stage--drawing,.plate) .picto.wrist-top{top:0;translate:-50% 0;}
:is(.stage--drawing,.plate) .picto.wrist-right{left:auto;right:0;translate:0 -50%;}
:is(.stage--drawing,.plate) .picto.wrist-left{left:0;translate:0 -50%;}
.plate img{display:block;width:100%;height:100%;object-fit:cover;}
@media (max-width:833px){.stage{padding:var(--space-24);border-radius:var(--radius-card);}}
```

Lines enter from outside and leave through another edge or end in a free tail: smooth, 1 to 3 bumps, no corners
or closed shapes, at most one crossing, a new set per stage. Stage colors rotate down a
page: sage, lilac, apricot, lake; neighbors never match; `color.stage.lake` only behind a card or drawing. A
plate's color follows its item: (sum of the item id's char codes) mod 4 over sage, lilac, apricot, lake, so an item
keeps its color on every screen; neighbors may match.

**Motion.** Block rise, trays 100ms later; lines never move. Reduced motion: no rise.

**Where.** Hero previews; drawing stages; a dense screen's primary visualization or highlight panel; offer or
choice cards; first-run empty states; plates for card-grid images. Stages take the next color in the rotation, plates their
item's color.

**Limits.** A stage holds a chart, media, a pictogram, offer cards or a ghosted preview, never text, a key-value
summary or a form. A raised card on it spans at least 60% of the inner width, charts and media 100%. Under
`breakpoint.md` its cards stack in source order, each fully visible, the stage kept; never a horizontal strip. One
stage per viewport on dense screens; never the page background.

### Serif headline that writes itself in

**What.** h1 and h2 in `font.family.serif`, `text-wrap:balance`, max `size.measureHeading`, sentence case,
fading in word by word.

**Recipe.**

```js
function writeIn(h){
  const words=h.textContent.trim().split(/\s+/);
  h.setAttribute("aria-label",words.join(" "));
  h.replaceChildren(...words.flatMap((w,i)=>{
    const s=document.createElement("span");
    s.className="w";s.ariaHidden="true";s.style.setProperty("--i",i);s.textContent=w;
    return i?[" ",s]:[s];
  }));
  h.classList.add("write-in");
  requestAnimationFrame(()=>requestAnimationFrame(()=>h.classList.add("is-in")));
}
```

```css
.write-in .w{opacity:0;transition:opacity var(--motion-duration-reveal) var(--motion-easing-settle) calc(var(--i) * var(--motion-duration-stagger));}
.write-in.is-in .w{opacity:1;}
@media (prefers-reduced-motion:reduce){.write-in .w{opacity:1;transition:none;}}
```

Frameworks: render the spans directly. Text, id and accessible name stay identical; headings with links or
markup stay static.

**Motion.** h1 on route load, h2 and empty-state titles at 30% in view; once; word delay = index x
`motion.duration.stagger`. The lede and actions rise `motion.distance.riseSm`, 200ms later. Reduced motion: instant.

**Where.** The h1 of every screen; content h2s; empty-state titles. Other serif titles stay static.

**Limits.** At most 12 words; never body, labels, numbers or buttons.

### Written-loop working glyph

**What.** Three cursive loops, 16px high, in `color.accent.glyph`, writing themselves in 12 steps, holding 2 and
clearing in 2 (`motion.duration.glyph`), with a gerund ("Saving"). Companion: the breathing dot for running list
items. Done: a 16px check-circle and "Saved".

**Recipe.**

```html
<span class="working"><svg class="glyph" viewBox="0 0 24 16" aria-hidden="true"><path pathLength="1"
  d="M2,12C6,12,8,3,6,3C3,3,5,13,10,12C14,11,15,3,13,3C10,3,12,13,17,12C20,11,22,6,22,6"/></svg>Saving</span>
```

```css
.working{display:inline-flex;align-items:center;gap:var(--space-8);font-size:var(--font-size-small);color:var(--color-text-secondary);}
.btn .working{font-size:inherit;color:inherit;}
.glyph{width:calc(var(--size-icon) * 1.5);height:var(--size-icon);overflow:visible;}
.glyph path{fill:none;stroke:var(--color-accent-glyph);stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round;
  stroke-dasharray:1;stroke-dashoffset:1;animation:glyph-write var(--motion-duration-glyph) linear infinite;}
@keyframes glyph-write {
  0%{stroke-dashoffset:1;animation-timing-function:steps(12,jump-start);}
  75%,87.5%{stroke-dashoffset:0;animation-timing-function:steps(2,jump-start);}
  100%{stroke-dashoffset:-1;}}
.dot-breathe{display:inline-block;width:var(--space-6);height:var(--space-6);border-radius:var(--radius-full);background:currentColor;
  animation:breathe var(--motion-duration-breathe) var(--motion-easing-hover) infinite;}
@keyframes breathe{0%,100%{opacity:var(--opacity-breathe-low);} 50%{opacity:1;}}
@media (prefers-reduced-motion:reduce){.glyph path{animation:none;stroke-dashoffset:0;} .dot-breathe{animation:none;}}
```

**Motion.** Stepped, never tweened or rotated, only while the request is pending. Reduced motion: static line, steady dot.

**Where.** Inside the submitting button; page and panel loading, centered; background-task toasts; a loading
search field, right; breathing dots in status cells and job lists. Announce in the screen's one `role="status"`.

**Limits.** One glyph per screen, other running items use the dot; never decorative or idle; a synchronous action goes straight to its result.

### Ink-and-paper ring controls

**What.** Ink, paper and stone controls drawn with box-shadow rings instead of borders, so hover thickens a ring
without moving anything; press scales to 0.985; focus-visible is the warm outline.

**Recipe.**

```css
.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-8);height:var(--size-control);padding:0 var(--space-16);
  border:0;border-radius:var(--radius-control);font:var(--font-weight-medium) var(--font-size-ui)/1 var(--font-family-sans);white-space:nowrap;
  transition:box-shadow var(--motion-duration-hover) var(--motion-easing-hover),color var(--motion-duration-press) var(--motion-easing-hover),
    background-color var(--motion-duration-press) var(--motion-easing-hover),transform var(--motion-duration-press) var(--motion-easing-hover);}
.btn--primary{background:var(--color-action-primary);color:var(--color-text-on-action);box-shadow:0 0 0 0 var(--color-action-primary-hover);}
.btn--primary:hover{box-shadow:0 0 0 var(--border-width-ring) var(--color-action-primary-hover);}
.btn--secondary{background:var(--color-action-secondary);color:var(--color-text-secondary);box-shadow:inset 0 0 0 var(--border-width-hairline) var(--color-border-control);}
.btn--secondary:hover{color:var(--color-text-primary);box-shadow:inset 0 0 0 var(--border-width-ring) var(--color-border-strong);}
.btn--tertiary{background:var(--color-action-tertiary);color:var(--color-text-primary);}
.btn--tertiary:hover{background:var(--color-action-tertiary-hover);}
.btn:active:not(:disabled){transform:scale(0.985);}
:focus-visible{outline:var(--border-width-ring) solid var(--color-focus-ring);outline-offset:2px;}
.btn:focus-visible{outline-offset:4px;}
.send{width:var(--size-control);padding:0;background:var(--color-action-send);color:var(--color-text-inverse);}
```

**Motion.** Per Interaction. Reduced motion: no scale.

**Where.** Every button, chip, input and select; row actions secondary `size.controlSm`; filter chips tertiary,
selected ink; the send square only ends a prompt field.

**Limits.** One ink primary per region (card, dialog, form, toolbar).

## Color use

- Text: `primary` headings, body, values; `secondary` ledes, descriptions, resting nav; `tertiary` meta,
  placeholders, table heads.
- Inline links: `color.text.primary`, 1px `color.border.strong` underline at 3px offset; hover underline ink.
- Status colors only in badge text and dots, field errors, stat changes and the danger button; never fills.
  Success is an ink check-circle plus words.
- Charts: bars `color.chart.rest`, current bar `color.chart.ink`, one series `color.chart.highlight`; lines 1.5px;
  at most 3 `color.border.default` gridlines, no frame; labels caption, tertiary, `tabular-nums`.

## Typography

- h1, serif 400, `tight`: hero `clamp(var(--font-size-h3), 6vw, var(--font-size-display))`; content pages
  `clamp(var(--font-size-h3), 5vw, var(--font-size-h1))`; long-form page title `h2`.
- Product screen h1: serif 400, `h3` (`h4` under `breakpoint.md`), `heading`, identical on every product screen. Its lede: sans 400 `body`, `color.text.secondary`, `space.8` below.
- Content h2: serif 500, `clamp(var(--font-size-plan), 5vw, var(--font-size-h2))`, `heading`. Long-form prose h2 `h4`, h3 `h5`. Panel h2, feature title: 500 `h4`. Card, group, FAQ titles: 500 `h5`. Offer names, pull quotes: 400 `plan`, `tight`.
- Content lede: sans 400, `lede`, `color.text.secondary`, max `size.measure`. Body `body`; long-form prose `bodyLg`.
- Controls `ui` (labels 500); table cells `dense`, `title`; hints `small`; meta `caption`; table heads, eyebrows `micro`, 500, uppercase, tracking `micro`, tertiary; code `font.family.mono` `small` (root rule, New project).

One h1 per screen. Numbers are sans `tabular-nums`, never serif.

## Spacing and density

- Content sections `space.96` apart (`space.128` from `breakpoint.xl`, `space.64` under
  `breakpoint.md`); landing hero top padding `space.128` (`space.64` mobile).
- Section opener: pictogram, `space.24`, h2, `space.16`, lede, `space.32`, actions (gap `space.12`).
- Product screen header, same on every product screen: padding `space.48` top, `space.32` bottom;
  `grid-template-columns:var(--size-picto-sm) 1fr auto`, gap `space.16`; row one drawing, h1, actions; the lede
  `grid-column:1 / -1`, starting at the drawing's left edge, never under the h1 text. Under
  `breakpoint.md`: one column, drawing above the h1.
- Panels `space.24` apart; rows `size.rowDense`.
- Forms: fields `space.24` apart, label to control `space.8`, hint `space.6`, actions `space.32` below.
- Dense never goes below `size.rowDense`, `font.size.dense` or `size.touch` targets.

## Shape and depth

- Radius grows with the surface: `radius.badge` badge, `chip`, `control` button and input, `tile` plate and toast,
  `card`, `stage` stage and dialog, `stageLg` hero stage.
- Elevation: flat at rest; `shadow.hover` hovered linked card; `shadow.float` cards on a stage, sticky bars;
  `shadow.overlay` dialogs, menus, toasts (dark: `shadow.overlayNight` plus a 1px `color.border.default` ring).

## Motion

- Site header, first load: translateY -`motion.distance.rise` → 0 and fade, `motion.duration.reveal`, `settle`.
- Block rise, 15% in view, once: opacity and translateY `motion.distance.riseSm` (text) or `rise` (cards, media) → 0, `motion.duration.rise`, `settle`; siblings +100ms, max 4.
- Content swap on tab or step change: translateY `motion.distance.raise` → 0 and opacity, `motion.duration.raise`, `settle`.
- Disclosure and menu open: opacity and `grid-template-rows:0fr → 1fr` (menus translateY -4px), `motion.duration.open`, `motion.easing.quart`; close 60% as long.
- Dialog: scrim fade; panel translateY `motion.distance.overlay` → 0, `motion.duration.open`, `quart`.
- Toast: rise `motion.distance.rise` over `motion.duration.raise`, `settle`; leave by fading over `motion.duration.open`.

Only script hides a block: on mount it adds `is-rise-ready` (opacity 0, translated; the transition lives on the
block) to blocks below the fold, removed at 15% in view, once. Without script, in print and under reduced motion
every block is final. Never animated: rows, backgrounds, stage lines, widths, scroll. Product screens: block rise on
a route's first visit only. Reduced motion, globally:

```css
@media (prefers-reduced-motion:reduce) {
  *,*::before,*::after{animation-duration:var(--motion-duration-instant) !important;animation-delay:0s !important;
    animation-iteration-count:1 !important;transition-duration:var(--motion-duration-instant) !important;transition-delay:0s !important;}
}
```

## Interaction

Focus-visible is always the warm outline (offset 4px on buttons and linked cards, 2px elsewhere, -2px on rows and
menu items), instant. Rings `motion.duration.hover`, colors and press `motion.duration.press`, on `motion.easing.hover`.

- Buttons, chips: ring-controls recipe; a selected chip is ink; a ghost on the inverse band hovers to
  `color.surface.inverseRaised`.
- Nav link: secondary → primary over `motion.duration.nav`, `motion.easing.expo`; dropdown chevron rotates 180° on open.
- Linked card: hover `shadow.hover` and title underline; no press.
- Segmented tab pill slides `motion.duration.open`, `quart`; FAQ "+" rotates 45° open.
- Table row, menu item: hover `color.surface.hover` (`color.surface.subtle` on raised surfaces); a selected row is
  `color.surface.subtle` with a 2px inset ink rule at the left.

Disabled: `color.text.disabled`, rings `color.border.default`, no hover or press, `cursor:not-allowed`.

## Layout adaptation

- One container: max `size.container`, centered, side padding `clamp(var(--space-20), 4vw, var(--space-64))`;
  12 columns from `breakpoint.lg`, 8 from `breakpoint.md`, 4 below; gaps `space.24` (`space.32` from `breakpoint.xl`).
- Grid and flex children `min-width:0`.
- Card grids `align-items:start`; same-kind rows (offers, items, stats) share a height.
- Product-screen panel rows: `align-items:stretch`, each title inside its own card, so neighbors share edges. A
  panel stretched to a taller neighbor is `display:flex;flex-direction:column` and its main content (chart, list,
  map) takes `flex:1` (a chart at least 240px): no empty band. Stat rows wrap evenly whatever their count (equal
  columns, never one card alone on the last row).
- Forms one column, max `size.form`; short pairs side by side from `breakpoint.md`; below it actions stack full
  width, primary first.
- A transaction summary (totals, selection, booking) is a plain card in a narrow side column (4 of 12) from
  `breakpoint.lg`, sticky at `size.header` + `space.24`; below it, after the main content.
- Image card grids: 3 or 4 columns, 2 under `breakpoint.md` with card body padding `space.12`.
- A featured item: its image or drawing stage (never a plate) beside its text from `breakpoint.lg`; under it,
  above the text.
- A long-form page: its lead image or drawing spans the text column; a contents list sits beside the text from
  `breakpoint.lg`; under it, a collapsed disclosure after the lead. An image without a photo becomes a drawing of
  the page's or item's own subject (Imagery), never removed.

## Applying the concept

Dense screens get less, never nothing.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing hero | `size.pictoHero` accent drawing or a hero stage with UI | Full |
| Content section | Prose: centered `size.pictoLg` drawing, h2 write-in, lede, action; lists: h2 alone | Rule 4 |
| Product page header | `size.pictoSm` drawing (once per session), h1 write-in | Small, every screen |
| Card grid | `size.pictoMd` in feature and offer cards; plates with photos or the item's own drawing | One per card |
| Form | Header drawing; glyph in the pending submit; `size.pictoLg` confirmation | Light |
| Settings | Header drawing, serif group titles, glyph in a pending save, then "Saved" | Light |
| Dashboard | Header drawing; the screen's primary visualization on one stage; breathing dots for running work | One stage |
| Data table | Nothing drawn inside; serif group rows, breathing dots | Type and loops |
| Item list and detail | Header drawing on every screen, detail included; plates; the detail's main image on a stage | Plates, one stage |
| Long-form content | Masthead `size.pictoLg`; a featured item or lead image on a drawing stage; plates | One stage |
| Empty state | `size.pictoLg` drawing, title write-in, one line, one button | Strong |
| Error, not found | `size.pictoXl` drawing from the app's domain, serif h1, two actions | Strong |
| Loading | Inline glyph; full-screen boiling drawing; static skeletons | One glyph |

## Imagery and icons

- Icons: outlines, 1.5px stroke, round caps, `currentColor`, `size.icon` dense, `size.iconLg` elsewhere. Only filled icon: the 16px check-circle (ink circle, `color.surface.raised` tick); unavailable
  is a thin cross in `color.text.tertiary`.
- Illustration is only the pictogram. Photos warm, unfiltered; screenshots and videos sit on stages.
- Missing images: the item's own subject, drawn as itself (subject bans do not apply), on a plate in grids (final frame,
  no state classes) and on a drawing stage on its detail page, the same drawing. A category drawing only when one
  object is true of every item. Never an icon on a plate or a gray box.

## Accessibility

- Text 4.5:1 or more (body 7:1); control outlines 3:1 (`color.border.check`); visible labels; targets `size.touch`.
- Drawings `aria-hidden` unless meaningful (then `role="img"`, `aria-label`); one `role="status"` region per screen (reuse an existing one); errors
  `role="alert"`.
