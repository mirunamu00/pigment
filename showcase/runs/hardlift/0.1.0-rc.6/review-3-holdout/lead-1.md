```json
{
  "findings": [
    {
      "severity": "major",
      "area": "polish",
      "summary": "At phone width, when a table reflows into stacked label/value blocks, inline code inside a value cell becomes a separate grid item. The code chip and the rest of the sentence drop into the label column on their own lines, so descriptions break apart ('Named sets of overrides, selected with' / '--profile' / '.', 'Set to' / 'false' / 'for tasks…'). The text is all there, but it no longer reads as one sentence in the value column. The spec's reflow rule says each other cell becomes one label/value line, but it never says that the value keeps its inline content in one text flow.",
      "samples": 1,
      "of": 1,
      "specCaused": true,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout/sheets/docs--page--docs-guides-configuration--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout/sheets/docs--page--docs-guides-configuration--mobile-dark.png",
        "showcase/runs/hardlift/0.1.0-rc.6/docs/20261019-222324-s1/screenshots/docs-guides-configuration-mobile-light.png"
      ],
      "items": [
        "docs--page--docs-guides-configuration--mobile-light",
        "docs--page--docs-guides-configuration--mobile-dark"
      ],
      "promptFix": "In the phone-width table reflow, each reflowed cell becomes exactly two layout items: its label (taken from the column header, for example a data-label attribute shown with ::before) and one value wrapper that holds all of the cell's content. Never make the cell's child nodes grid or flex items. Inline code, links and emphasis inside a value stay in the text flow and wrap with their sentence. At 390px, check that every value reads as one continuous run of text in the value column.",
      "holdoutOnly": true
    },
    {
      "severity": "minor",
      "area": "componentStates",
      "summary": "At phone width the plan-comparison table (a feature column plus three plan columns) scrolls sideways inside its bordered box instead of reflowing. The third column header is cut part-way at the right edge and the last plan column is out of view. The spec allows this for a read-only table of three or four short columns and uses the cut column as the scroll cue, so the agent followed it. For a comparison of options the cue is weak, because the top plan's column is the one that ends up hidden. Graded minor: the content can be reached by scrolling inside the box, the page does not scroll sideways, and the spec was followed.",
      "samples": 1,
      "of": 1,
      "specCaused": true,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout/sheets/landing--page--pricing--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout/sheets/landing--page--pricing--mobile-dark.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout/sheets/landing--state--pricing-yearly--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.6/landing/20261019-222324-s1/screenshots/pricing-mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.6/landing/20261019-222324-s1/screenshots/state-pricing-yearly-mobile-light.png"
      ],
      "items": [
        "landing--page--pricing--mobile-light",
        "landing--page--pricing--mobile-dark",
        "landing--state--pricing-yearly--mobile-light"
      ],
      "promptFix": "",
      "holdoutOnly": true
    },
    {
      "severity": "minor",
      "area": "spacingRhythm",
      "summary": "On desktop the single featured quote card fills only the left half of the container. It sits under a full-width band and above a full-width grid, so the section looks stranded with a large empty area on the right.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout/sheets/landing--page--customers--desktop-light.png"
      ],
      "items": [
        "landing--page--customers--desktop-light"
      ],
      "promptFix": "",
      "holdoutOnly": true
    }
  ],
  "referenceFidelity": 4,
  "crossAppConsistency": 4,
  "hierarchy": 4,
  "spacingRhythm": 4,
  "componentStates": 4,
  "polish": 3,
  "signature": 4,
  "notes": [
    "Review: 76/76 checklist items from 4 reviewers (showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout). I opened the reference sheet, both holdout home sheets (landing and docs, desktop light), the pricing mobile sheet and the configuration mobile sheet, and read the spec's layout and Table/Phone width rules.",
    "Merged: the two landing reviewers' comparison-table findings (pricing page and the pricing-yearly state) are one problem, the same table breaking the same rule, so they are now one finding.",
    "Regraded: the comparison table goes from major to minor. The spec (Table, Phone width) explicitly allows sideways scroll inside the box for a read-only table of three or four short columns, with the last visible column cut part-way as the cue. The table has four columns, is read-only, keeps its bordered box and does not scroll the page, and its third header is cut at the edge as the spec describes. So the spec was followed, nothing is unreachable, and it is not a blocker. I marked it spec-caused because the allowance does not separate a comparison of options, where the hidden column is the one people need, from a plain data table.",
    "Kept major: the inline-code split in reflowed option tables. The value text breaks into the label column and the sentences no longer read in order. That makes the table clearly worse than a plain stacked block at the same job. Its promptFix is a general rule about reflow structure.",
    "Family: the docs and landing apps read as one system. They share the paper-and-ink ground, the regular-weight grotesk display, one full-width colour band per section with ink text (teal, yellow and periwinkle), raised outlined cards, ink current-page pills that turn paper in dark mode, one pink lift action per view, pink price tags and the same dark mapping.",
    "Recognition: someone who knows the reference would recognize it. Both heroes carry tilted, edge-cropped, heavy-outlined flat stickers (a pink coin with an extruded yellow rim, a star, a tag) around a centred display title with a single pink CTA, the way the reference's 'Go from 0 to $1' hero does. The landing page adds a linear tag wall and full-bleed yellow and ink bands.",
    "Signature elements carry to new structures: section bands on docs pages and the changelog, outline pills (tabs, status pills with icon and word, filters), sticker art used sparingly (hero, feedback bubble in the section colour, FAQ and empty-search stickers), the hard lift on the Copied button and dropdowns, the pink halo on focused inputs, and drift that is tied to scroll instead of a time loop. No sticker sits inside a page-header band.",
    "Regressions against rc.5 critic-2 and rc.6 critic-1/critic-2: none. At phone width the hero stickers stay static below the text, the primary actions stay in the flow, and status is never shown by colour alone.",
    "Not re-raised (earlier minors): sticker colours in dark mode, bold titles in reflowed table blocks, the leftover column-label strip on mobile tables.",
    "Verdict: one major (spec-caused inline content breaking out of reflowed table values) and two minors. No blockers. The language carries to the holdout structures."
  ]
}
```