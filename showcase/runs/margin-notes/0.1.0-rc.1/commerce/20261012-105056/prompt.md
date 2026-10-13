Apply design system margin-notes@0.1.0-rc.1 to this project.

The complete specification is in `design-packages/margin-notes-0.1.0-rc.1/dist/agent.md`, with exact values in
`tokens.css` and `tokens.json` in the same folder. Read agent.md fully before changing anything, and
follow its "Existing project" section.

This is an unattended run: the plan and the first restyled screen are pre-approved, so do not stop to
ask — go through every screen. Constraints that still apply:

- Preserve every route, behavior, label text, form field, `data-testid` and accessibility attribute.
  The project's smoke tests must keep passing.
- Do not add UI libraries or CSS frameworks. Keep the existing React + CSS setup; load web fonts only as
  the specification allows.
- Support both light and dark appearance if the specification defines both.
- Do not change files under `design-packages/` or `tests/`.

Before you finish, run `npm run build` and fix any errors. End with a short report: what you changed,
anything in the specification you could not apply, and anything you had to decide yourself.
