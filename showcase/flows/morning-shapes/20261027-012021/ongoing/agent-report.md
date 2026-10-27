I built both screens: Today at `/` and New goal at `/goals/new`. Both are listed in `pigment.app.json` for capture. `npm run build` and the typecheck pass. I checked the screenshots at 1440px and 390px in light and dark, and the snap tool reports no horizontal overflow.

## Today (`/`)
The spec treats this as a dashboard, so it has no header band:
- **Greeting:** a white header saying "Good morning, Jules" with today's date and how many habits you have left, plus one breathing crescent glyph.
- **Four stat tiles:** your check-ins (yellow), team check-ins (orange), longest streak (blue) and goals on track (green). Each tile's hue is its area's hue, each has a small plate with a different pictogram, and together they are the page's one saturated field. On phones they stay 2×2 and the plates are dropped.
- **Today's habits:** a cream panel with All / To do / Done filter tabs. Each habit is a white row showing:
  - its cadence
  - one dot per teammate showing who has checked in ("5 of 6 in")
  - its current streak
  - a "Check in" button. Once you check in it becomes "Done" with a green tick, and a toast offers Undo.
  
  An empty filter shows a large glyph, one line and a "Show all" button.
- **Current streaks:** a cream panel listing teammates by streak, with their initials, best streak and a "Restart today" badge for a broken streak.

## New goal (`/goals/new`)
- A green Goals header band with the existing trophy cluster.
- The form sits on white at reading width:
  - goal name
  - owner and target date side by side (a dropdown of 6 teammates and a date field)
  - cadence as three option tiles (Daily, Weekly, Monthly), each with a still glyph
- **Validation:** the name must be 3–60 characters, owner and cadence are required, and the date must be after today and within five years. Errors show when you leave a field and when you submit. Submitting with errors shows a summary at the top with links to each field and moves focus to the first problem.
- "Create goal" shows a loading state, then a success toast, and takes you back to Today. "Cancel" is a cream button.
- On desktop the first field and the submit button are both visible without scrolling.

## Design system parts used
- Tokens from `tokens.css`. The new layout CSS in `src/screens/screens.css` uses token variables only.
- Existing components: `HeaderBand`, `GoalsCluster`, `StatTile`, `Plate` with pictograms, `Glyph`, `Tabs`, `Button`/`ButtonLink`, `Avatar`, `Badge`, `TextField`, `Select`, `ChoiceGroup`/`ChoiceRow`, the error-summary style, toasts and `AppShell`.

## Decisions I made without asking
- **Routes:** Today now lives at `/`, and `/today` redirects there. The design-system reference page that was at `/` moved to `/design-system`, and its footer link now points there. The top-bar button changed from "New habit" to "New goal".
- **Snapshot list:** `pigment.app.json` now lists only these two screens. I removed `/today`, `/habits` and `/settings`, which are placeholders or redirects.
- **Dark-mode fix:** in dark mode the cream button colour is the same as the white row, so "Done" disappeared. Inside habit rows that button now uses `surface.subtle`. The empty check-in dots use `border.rule` so they show in both modes.
- **Kit bug fix:** the pill styles were overriding the "Skip to content" link's positioning. That put it in the page flow, pushing the top bar down 48px and making every page 16px wider than the screen. I fixed it in `src/ui/morning-shapes.css`.
- **Sample data:** the team, habits and goals are hard-coded in `src/data/team.ts`, and check-ins reset on reload. There is no backend.
- **Avatar colour:** your avatar stays violet to match the top bar, so the Today screen shows five hues instead of the four the spec recommends.

These decisions are also recorded in `design-system/components.md`.