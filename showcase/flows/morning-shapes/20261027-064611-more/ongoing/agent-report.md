I built the three screens. They're listed in `pigment.app.json` and open directly in a browser at `/goals/run-a-10k`, `/insights` and `/habits`. `npm run typecheck` and the build both pass. I checked the screenshots at 1440px and 390px in light and dark, fixed what was wrong, and re-ran them; there's no horizontal overflow. Today and New goal are unchanged.

**What's on each screen**
- **Goal** (`/goals/run-a-10k`, "Run a 10k together"): a green Goals header band with one on-field "Cheer them on" button. Below it are three cream panels:
  - **Progress:** "7.5 km of 10 km · 75%", a progress bar, and a bar chart of the longest run each week with a 10 km goal line.
  - **Recent check-ins:** who ran, when, how far and their note.
  - **People on it:** each runner's role, when they last ran and their best distance.
- **Insights** (`/insights`): a violet Insights header band. Below it are four panels:
  - **This week** and **This month**, side by side: a percentage, the check-ins done out of those possible, a progress bar and a bar chart each.
  - **Streaks:** the team ranked by current streak.
  - **Who needs a nudge:** anyone who hasn't checked in for two days or more. Each row has a "Nudge" button that becomes "Nudged" and shows a confirmation with Undo.
- **Habits** (`/habits`): a blue Habits header band and a table of 12 habits with owner, cadence, streak, the last 7 days, and status (On track, Behind, Paused). You can filter by status (tabs with counts), cadence and owner, and sort by habit or streak. A live count shows how many match, and when nothing does, an empty row offers "Clear filters".

**Design system parts used:** the area colours from `components.md` (Habits blue, Goals green, Insights violet), the `HeaderBand` with each area's existing illustration, cream cards, plates with the existing pictograms, avatars, and the existing `Button`, `Tabs`, pill `Select`, `Badge`, table and toast components. Lists use ruled rows like Today's streak list. All new CSS uses tokens only.

**Decisions I made instead of asking:**
- **No stat tiles on Goal or Insights.** The system allows one saturated colour block per screen, and on these screens the header band is that block. Coloured stat tiles would be a second one, so the headline numbers sit in cream cards.
- **Charts are green on Insights too, not violet.** The bars need to stand out from the card in both light and dark. Yellow fails on the cream card, and blue and violet fail on the dark card; green passes in both. Insights keeps violet everywhere else.
- **"This week" means the last 7 days, and "This month" the last four weeks.** Otherwise on a Monday or Tuesday the week would look almost empty.
- **The Habits table scrolls sideways on phones**, with the habit name column fixed in place. The spec says both this and "stacked rows on phones"; I followed the layout rule because the existing table component already supports it.
- **No "New habit" button on Habits**, because there's no habit form to open yet.
- **Cream buttons on cream cards get a white fill.** Otherwise they blend into the card in light mode. This applies only to the new screens.

**New pieces:** the spec has rules for charts but no chart component, so I added `BarChart` and a progress bar (`Meter`) in `src/ui/Chart.tsx`, built from existing tokens. On phones, charts with eight or more bars label every other one so the dates don't run together. I documented both, plus the screen notes, in `design-system/components.md`. Sample data for the new screens is in `src/data/team.ts`.

**Not changed:** the spot plates (the round backgrounds behind the small pictures) are cream, so they disappear on cream cards in light mode and only the picture shows. Today already does the same, so I left it alone.