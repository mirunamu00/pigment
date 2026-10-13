## Character

TODO(three sentences: what this system feels like, what it is for, what it refuses to do)

## The ten rules that define this look

Each rule: the rule, then why, in one line each. Reference tokens by name.

1. TODO(rule) — TODO(why)
2. TODO(rule) — TODO(why)
3. TODO(rule) — TODO(why)
4. TODO(rule) — TODO(why)
5. TODO(rule) — TODO(why)
6. TODO(rule) — TODO(why)
7. TODO(rule) — TODO(why)
8. TODO(rule) — TODO(why)
9. TODO(rule) — TODO(why)
10. TODO(rule) — TODO(why)

## Never

Defaults a coding agent tends to add that would break this look.

- TODO(e.g. "No gradients on surfaces or buttons.")

## Signature elements

What makes this system recognizable beyond its tokens. Each one is a recipe an agent rebuilds from scratch —
original artwork in this style, never copied — with where it goes and how much of it a screen takes.

### TODO(signature name)

**What.** TODO(what it is and how it looks, with token names and measured values)

**Recipe.**

```css
/* TODO(construction: markup structure, stroke and shape rules, CSS using the system's tokens) */
```

**Motion.** TODO(trigger, keyframes, duration and easing tokens, iterations, and what it does under reduced motion — or "static")

**Where.** TODO(the contexts it appears in and what each gets: page headers, empty states, loading, onboarding, FAQ, section breaks, data screens)

**Limits.** TODO(how many per screen, where never)

## Color use

TODO(how much accent per screen, where status colors may appear, how surfaces stack)

## Typography

TODO(which size for what, maximum sizes per screen, weight usage, line length)

## Spacing and density

TODO(base unit, component padding, section spacing, how density changes on dense data screens)

## Shape and depth

TODO(radius per component size, when to use border vs shadow, elevation levels)

## Motion

TODO(durations and easing per interaction type; load, scroll, hover and looping motion; what never animates)

## Interaction

TODO(for buttons, links, cards, inputs, disclosures and tabs: what changes on hover, focus-visible, press and open — color, border, shadow, transform, underline — by how much and with which motion tokens)

## Layout adaptation

TODO(grid, max content width, content priority on narrow screens, touch targets; no page templates)

## Applying the concept

Where the signature elements and patterns go, so every screen carries the concept. Dense screens get less,
never nothing.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Page header | TODO(signature elements and patterns) | TODO(e.g. one, small) |
| Hero or landing section | TODO(signature elements and patterns) | TODO(how strongly) |
| Section break | TODO(signature elements and patterns) | TODO(how strongly) |
| Card grid | TODO(signature elements and patterns) | TODO(how strongly) |
| FAQ or help | TODO(signature elements and patterns) | TODO(how strongly) |
| Form | TODO(signature elements and patterns) | TODO(how strongly) |
| Settings | TODO(signature elements and patterns) | TODO(how strongly) |
| Dashboard | TODO(signature elements and patterns) | TODO(how strongly) |
| Data table | TODO(signature elements and patterns) | TODO(how strongly) |
| Empty state | TODO(signature elements and patterns) | TODO(how strongly) |
| Error | TODO(signature elements and patterns) | TODO(how strongly) |
| Loading | TODO(signature elements and patterns) | TODO(how strongly) |
| Toast or confirmation | TODO(signature elements and patterns) | TODO(how strongly) |

## Imagery and icons

TODO(icon style, stroke width, size grid; illustration and photo treatment)

## Accessibility

Text contrast at least 4.5:1 (7:1 for body text on the default surface), visible focus using `color.focus.ring`
at 2px with 2px offset, touch targets at least 44px, motion reduced when the user asks for it.
