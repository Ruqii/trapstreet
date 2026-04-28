# @trapstreet/web

Product demo prototype for `trapstreet.run`.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- TypeScript strict
- All data is mocked in `src/lib/mock-data.ts` — no backend in this prototype

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, manifesto strip, three trust tiers, "Why H4" cards |
| `/how-it-works` | Step-by-step walkthrough of one real eval task — the differentiator |
| `/leaderboard` | Resume Tailoring leaderboard with mocked tools |
| `/tool/[slug]` | Per-tool detail (rank, score, fabrications, Wall entries) |
| `/wall` | Trap Street Wall — three CAUGHT cases on a brick background |
| `/manifesto` | Long-form brand story |

## Dev

```bash
pnpm install
pnpm dev    # http://localhost:3000
pnpm build
```

## Brand

Color tokens, typography, and spacing all derive from
[`docs/brand-system.md`](../../docs/brand-system.md). The reference brand
sheet is at [`assets/brand/brand-sheet-v1.png`](../../assets/brand/brand-sheet-v1.png).

## Status

Prototype build for the May 29, 2026 Claude Code London demo. Not production
infrastructure — all evaluation data is hand-curated. The runner pipeline,
submission gateway, and Live Mode are described conceptually but not
implemented in this app.
