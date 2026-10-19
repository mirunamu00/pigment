# night-cartridge@1.3.0-rc.1 — evaluation 1

Verdict: **fail** · 2026-10-19T00:26:40.727Z

Agent spend: this candidate $31 · family $31 over 4 runs

## blog (20261018-235602)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## commerce (20261018-235602)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## dashboard (20261018-235602)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 0.998 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261018-235602)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.938 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0 | reported |
| reference-output-palette-distance | pass | 2.51 | reported |
| reference-fontSize-overlap | pass | 0.774 | reported |
| reference-radius-overlap | pass | 1 | reported |
| reference-spacing-overlap | pass | 0.892 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major (spec) | signature | 1 of 1 | Two catalogue sprites come out well under half their window, which makes the system worse than published here. At 1440px the backpack's ink is about 57px in a window about 201px wide (about 28%; about 32% at 390px), and the tote's is about 76px (about 38%). The other nine sprites are 41–45%. In the published version every grid sprite was 43–48% (1.2.0-rc.9 s2 home-desktop-dark.png) and detail sprites were 48–49%. 1.2.0 needed three rounds and a computed per-sprite check to reach that. This update replaced the explicit 40–50% band and its check with 'ink about half the window'. The agent then drew a tall item narrower than the 19-unit minimum and nothing caught it. The spec still has the 19–23-unit rule, but 'about half' with no lower bound or computed check lets it slip. |
| minor | signature | 1 of 1 | Several item sprites fail the name test at 1x. The skillet is a disc on a 1-unit handle, and the key ring is a large ring on a straight shaft. Both read as magnifying glasses. The tote is one arch over a box and reads close to a padlock, most visibly on the detail page. The tea towels are two plain upright slabs. Published samples had the same kind of misses (key ring and towels, skillet 1 of 3, tote 2 of 3), so this is not a regression. |
| minor | signature | 1 of 1 | The blog's ground strip is under its recipe. The cart sprite is about 10 units tall (the minimum is 14). The right-hand sprite shows only two floating light rails and a dash, because its legs are drawn in the outline tone, which disappears on the page ground. None reaches the 20–24-unit lead size. The other three apps' ground sprites (crates, kiosk, tree) are fine. The reference's footer trees and figure read clearly at the same size (p1-desktop-light.png). |
| minor | polish | 1 of 1 | On every settings route the sidebar panel stops about 50px above the ground strip, leaving a band of page ground under it. The spec's shell rule says the sidebar runs from the header to the ground strip, and the dashboard in this sample does that. |
| minor | crossAppConsistency | 1 of 1 | The apps disagree on two shell details. The store drops the container's side padding, so its content runs 72–1368px while the blog runs 96–1344px. The dashboard sidebar rows have neither the hue icon nor the bullet the Sidebar spec asks for, while settings uses bullets. |
| minor | hierarchy | 1 of 1 | The blog's 'Subscribe to the newsletter' h2 has no dithered rule under it, unlike every other section h2 in the app and the published version's newsletter. The panel itself is the framed subtle panel the update asks for. |

## Reasons

- critic major (1 of 1, spec): Two catalogue sprites come out well under half their window, which makes the system worse than published here. At 1440px the backpack's ink is about 57px in a window about 201px wide (about 28%; about 32% at 390px), and the tote's is about 76px (about 38%). The other nine sprites are 41–45%. In the published version every grid sprite was 43–48% (1.2.0-rc.9 s2 home-desktop-dark.png) and detail sprites were 48–49%. 1.2.0 needed three rounds and a computed per-sprite check to reach that. This update replaced the explicit 40–50% band and its check with 'ink about half the window'. The agent then drew a tall item narrower than the 19-unit minimum and nothing caught it. The spec still has the 19–23-unit rule, but 'about half' with no lower bound or computed check lets it slip.
