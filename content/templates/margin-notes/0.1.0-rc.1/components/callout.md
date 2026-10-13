### Callout

**Use.** An inline message for a section or form: info, success, warning, danger.

**Anatomy.** 16px icon, optional title (`font.size.ui`, `font.weight.semibold`), body `font.size.small` `color.text.body`, optional text action. Padding `space.14` `space.16`, gap `space.10`, `radius.callout`, ground `color.status.{tone}Subtle`, a 3px bar as `inset 3px 0 0` plus icon in `color.status.{tone}`. Info is the only functional use of the hue family.

**States.** Static; a dismiss ghost icon button (`aria-label="Dismiss"`) when dismissible.

**A11y.** Danger callouts that appear after an action use `role="alert"`; the title or first word names the tone.

**Do / Don't.** Do keep it to 1 to 3 lines. Don't stack 2 callouts in one section.
