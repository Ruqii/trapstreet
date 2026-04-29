# Isolated pages

Snapshot of pages that lost a primary navigation entry after the home-page
redesign on **2026-04-29**. "Isolated" here means *not surfaced from the
top nav or the home page body* — direct URL and footer access still work.

Use this as a checklist when deciding whether to promote a page back into
the main nav, fold it into another page, or accept that it lives only in
the footer.

---

## Top-nav after redesign

| Position | Label | Route |
|---|---|---|
| Left | logo → home | `/` |
| Nav | Leaderboard | `/leaderboard` |
| Nav | Explore Tasks | `/explore` *(new)* |
| CTA | Submit Task | `/submit` *(new)* |

## Home-page body links after redesign

| Block | Target |
|---|---|
| Stats row | (no links) |
| Terminal card | (no links — display only) |
| Most Broken Tasks · "View all tasks" | `/explore` |
| Tile · GitHub | `https://github.com/AntiNoise-ai/trapstreet` |
| Tile · Discord | `#` *(placeholder, no real channel yet)* |
| Tile · Tutorial | `/how-it-works` |
| Tile · Vision | `/manifesto` |
| Newsletter | `<form action="#">` *(no backend)* |

---

## Pages that became isolated

### `/wall` — Trap Street Wall

- **What it is**: public failure gallery — three CAUGHT cases on a brick
  background. Designed as the credibility moat / viral content engine.
- **Old surfaces** (before redesign): hero red CTA on `/`, top-nav entry
  "Wall", footer Product link.
- **Current surfaces**: footer **only** (Product → Trap Street Wall).
- **Why it's worth resurfacing**: the README and `docs/pm-design.md` both
  call out the Wall as one of the "5 weapons" — losing it from the home
  page weakens the founding pitch.
- **Resurface options**:
  1. Replace the Discord tile (currently `#`-placeholder anyway) with a
     **Wall** tile.
  2. Add a "→ See on the Wall" link on each `Most Broken Tasks` row whose
     `failurePct ≥ 35`.
  3. Add a 4th nav item between Leaderboard and Explore Tasks.

### `/tool/[slug]` — per-tool detail

- **What it is**: dynamic route. Rank, score, fabrications, Wall entries
  for one tool.
- **Old surfaces**: rows on `/leaderboard`.
- **Current surfaces**: still reached only from `/leaderboard`. Not a
  regression — just noting it has no direct nav entry, which is correct.
- **Action**: none. Detail pages should stay drill-down only.

---

## Pages still surfaced (not isolated)

For completeness, so future audits can diff against the same baseline:

| Route | Surfaced from |
|---|---|
| `/` | logo |
| `/leaderboard` | top-nav, Explore Tasks rows ("View"), footer |
| `/explore` | top-nav, "View all tasks" link on home, footer |
| `/submit` | top-nav CTA, footer |
| `/how-it-works` | Tutorial tile, footer |
| `/manifesto` | Vision tile, footer |

---

## Procedure for the next nav change

When the IA changes again, do this in the same commit:

1. Update the table in **"Top-nav after redesign"** above with the new
   layout.
2. For each route that lost a primary surface, add an entry under
   **"Pages that became isolated"** including: what it is, the old
   surfaces, the current surfaces, why it matters, and resurface options.
3. Update the **"Pages still surfaced"** table.

Keeping this doc in sync with the actual `Header`, home `page.tsx`, and
`Footer` is what makes it useful — otherwise it rots into a snapshot of a
state nobody ships against.
