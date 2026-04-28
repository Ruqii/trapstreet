# Platform v1 Spec — Community Edition

> Locked: 2026-04-29.
> Supersedes the v0 community-edition design in [`architecture.md`](architecture.md)
> and the page map in [`pm-design.md`](pm-design.md) for everything below.
> [`trust-tiers.md`](trust-tiers.md) and [`eval-stack.md`](eval-stack.md)
> remain the authoritative references for trust mechanics and the
> Pydantic Evals + Langfuse stack choice.

---

## Decisions locked

### A. Cases are community-authored. Two visibility modes.

The case pool is **open to community submission**, not curator-only.
Every case carries a visibility mode chosen by its author:

| Mode | Inputs | Expected output / trap rule | Public sees |
|---|---|---|---|
| **open** | public | public | full case body |
| **closed (trap)** | public | **server-private** | anonymized stub: case id, n submissions, aggregated tool scores |

**Invariant for both modes:** the platform owns the eval mechanic
(input handling, expected output / trap rule storage, scoring code).
Authors own case CONTENT. Authors never write grader CODE — graders are
the open-source primitives in [`src/lib/eval/graders.ts`](../../trapstreet-landing/src/lib/eval/graders.ts).
Case authors compose graders with parameters; they cannot inject
arbitrary scoring logic.

This preserves the trap-street mechanic: closed-trap cases let
submitters plant verifiable falsehoods that only the platform can verify
against, while keeping the rest of the catalogue auditable.

### B. Default ranking is a single composite. Stack metadata is filter/sort only.

Every leaderboard has **one canonical ordering**, computed per case:

```
score = w_a * accuracy
      + w_t * (1 - latency_norm)
      + w_c * (1 - cost_norm)
```

`accuracy` is the grader pipeline's verdict (0–1). `latency_norm` and
`cost_norm` are min-max normalised across submissions in the case's
30-day window. Per-case weights `w_a, w_t, w_c` are set by the case
author (default 0.7 / 0.2 / 0.1) and cannot be silently re-weighted
after publication — re-weighting forks the case to a new id.

Submission metadata is **collected** but **does not enter the score**:

- model id (`claude-opus-4-7`, `claude-sonnet-4-6`, `gpt-4o`, …)
- model provider tier (`free` / `pro` / `api` / `enterprise`)
- harness version (`claude-cli@2.x.y`, `cursor`, `custom`, …)
- skills / MCPs installed (list of slugs)
- OS family (macos / linux / windows / ios)
- region (country-level only — no IP geo)
- timestamp

These surface in the leaderboard UI as **filter chips** ("Sonnet 4.6
only", "Pro tier only", "macOS only") and **sort axes** ("ascending
$/task", "descending tokens"). The default leaderboard is always "all
submissions, ranked by composite score" — sliced views are personal,
not authoritative.

This intentionally avoids fragmenting "the truth" into 100 stack-specific
mini-rankings while still giving every user a way to find their tribe.

---

## Architectural consequence: v1 is no longer static

Closed-trap cases require the platform to hold expected outputs and trap
rules outside of the client. Static export to GitHub Pages is no longer
sufficient.

**Hosting target for v1:** Next.js with API routes on Vercel (or
equivalent — Cloudflare Pages + Functions, Railway, etc.). Domain
remains `trapstreet.run`. The current `trapstreet-landing` repo can be
upgraded in place (drop `output: "export"`, add `app/api/*`) or split
into `trapstreet-landing` (marketing) + `trapstreet-app` (platform).
TBD; see open questions.

**Pre-May-29 demo does NOT need the backend.** Stage demo runs against
a static snapshot of curated data + a Tally waitlist for "submit your
tool". v1 backend ships post-stage.

---

## Data model

Minimum viable schema. Specifics (timestamps, indexes, constraints) per
the implementation, but these are the entities and relations.

### `case`

```
case_id          uuid pk
title            text
description      text                      -- visible regardless of visibility mode
visibility       enum('open','closed')
author_user_id   fk → user.user_id
author_anon      bool                      -- show submitter as anonymous in UI
inputs_public    jsonb                     -- always public
inputs_private   jsonb                     -- closed-trap only; null for open
expected         jsonb                     -- expected output / trap rule; private regardless of mode
graders          jsonb                     -- list of {grader: 'trap_street_probe', params: {...}}
weights          jsonb                     -- {accuracy: 0.7, latency: 0.2, cost: 0.1}
status           enum('pending','approved','rejected')
created_at       timestamptz
approved_at      timestamptz
```

`inputs_public` is what the prompt-runner sees and what the public can
read. `inputs_private` is data the platform injects only when the
platform itself runs the eval (Silver / Gold tiers) — used to plant
trap-street probes inside otherwise normal-looking inputs.

### `submission`

```
submission_id    uuid pk
case_id          fk → case.case_id
submitter_id     fk → user.user_id
tool_id          fk → tool.tool_id           -- which workflow / tool was tested
tool_output      text
metadata         jsonb                       -- model, harness, skills, OS, region
report           jsonb                       -- runEval() output, grader-by-grader
score            float                       -- composite from §B
trust_tier       enum('bronze','silver','gold')
verified_at      timestamptz null
verifier_id      fk null → user.user_id
created_at       timestamptz
```

### `user`, `tool`, `comment`, `vote`

```
user(user_id pk, handle, github_login null, created_at)
tool(tool_id pk, slug, name, vendor, pricing, notes)
comment(comment_id pk, target_kind enum('case','submission'),
        target_id, author_id fk, body, created_at)
vote(vote_id pk, target_kind enum('case'), target_id,
     voter_id fk, direction enum('approve','reject'), created_at)
```

Comments and votes scoped to the moderation flow in §UGC moderation.

---

## Trust tiers — concrete in v1

Same Bronze / Silver / Gold framework from [`trust-tiers.md`](trust-tiers.md),
specified here for v1 implementation:

| Tier | Tool runs on | Inputs verified by | Outputs verified by | Cost to platform |
|---|---|---|---|---|
| 🥉 **Bronze** | submitter, locally | submitter | submitter (local grader pipeline) | $0 |
| 🥈 **Silver** | submitter, locally | submitter | platform, on a 10–20 % sample | judge calls only |
| 🥇 **Gold** | platform, on submitter's API endpoint | platform | platform | bounded — top 20 / case + paid tier |

All three tiers exist on the same leaderboard, each row carrying its
tier badge. UI default surfaces all tiers; "Silver+ only" and "Gold
only" are filter chips. A submission cannot self-promote tiers — Silver
audits are scheduled by the platform, Gold runs are platform-initiated.

**Closed-trap cases force at least Silver.** A Bronze submission to a
closed case is meaningless because the submitter can't run the grader
locally (the trap rule lives server-side). For closed cases the skill
calls `POST /api/case/{id}/run` with the tool output and metadata; the
platform runs the grader and returns the verdict.

---

## Submission flow

The existing `trapstreet-eval` skill becomes the canonical Bronze
client. Pseudocode (open-case path):

```
$ claude-cli skill trapstreet-eval

Trapstreet — Bronze submission

  Pick a case:
    [1] FinanceBench · 5 SEC 10-K extraction questions
    [2] Resume Tailoring · Quanta Robotics trap (T-0047)
    [3] Open question — 12 active cases ▾

> 2

  Running case T-0047 against your current Claude session…
    model    claude-opus-4-7
    harness  claude-cli@2.4.1
    skills   12 installed (showing top 5)

  ✓ Output captured                       1.4s · 198 tokens · $0.008
  ✓ Local grader pipeline ran             6 graders, 0.18s

  Verdict: 100/100 · trap probe clean · 0 fabrications

  Submit this run to trapstreet.run/case/T-0047 ? [y/N]
> y

  Trapstreet wants to attach the following metadata to your submission:
    handle           ruqi
    model            claude-opus-4-7
    provider tier    pro
    harness          claude-cli@2.4.1
    skills           [trapstreet-eval, content-engine, deep-research, ...]
    OS               macos
    region           HK

  Edit · [a]llow all  [s]elect fields  [d]eny all  [c]ancel
> a

  Submitted — view at https://trapstreet.run/u/ruqi/runs/abc123
```

Closed-case path differs only at the grader step: skill ships the
output to `/api/case/{id}/run`, server runs the grader, returns the
verdict. Same UX.

---

## UGC moderation

```
case submitted (status = pending)
  ↓
either:
  community votes → approve count − reject count ≥ 5
or:
  platform reviewer approves
  ↓
status = approved → enters leaderboard rotation
```

Spam controls:

- per-user rate limit: max 5 pending cases simultaneously
- duplicate-input similarity check soft-rejects clones
- closed-trap cases require platform reviewer review (no community vote — the trap rule isn't visible to community voters)
- cases that ship and then get repeatedly disputed land on the **Trap Street Wall** in a separate "withdrawn" lane (mirror of the CAUGHT mechanic, applied to the eval itself)

---

## Privacy / opt-in

Skill at first use:

```
Trapstreet collects the following when you submit a run:
  - model id, provider tier, harness version
  - list of installed skill / MCP slugs (names only)
  - OS family + country code

We never collect: prompt contents beyond the case inputs you ran,
files outside the run, IP address, browser fingerprints.

You can edit which fields are sent on every submission, see exactly
what was sent on your profile page, and revoke any time via
trapstreet.run/u/{handle}/data.

Continue? [y/N]
```

Per-submission `[s]elect fields` lets users opt out of any individual
metadata field. Submissions still go through with reduced metadata —
they show on the leaderboard but can't be filtered by the dropped
fields.

---

## API surface (v1, minimal)

All write endpoints rate-limited per user/IP. Auth via GitHub OAuth.

```
GET  /api/cases                              list approved cases, paginated
GET  /api/case/{id}                          public case detail (closed → stub only)
POST /api/case                                community submit; status='pending'
POST /api/submission                          bronze submit, open case (client-graded)
POST /api/case/{id}/run                       bronze/silver submit, closed case (server-graded)
GET  /api/leaderboard/{case_id}?filter=…&sort=…
GET  /api/u/{handle}                          public profile + run history
POST /api/comment
POST /api/vote
```

---

## Page architecture (delta from current `trapstreet-landing`)

| Route | Status | Notes |
|---|---|---|
| `/` | existing | hero CTA → Submit your tool / Try the playground |
| `/playground` | existing | unchanged; demo of the local grader pipeline |
| `/cases` | **new** | browse approved cases, filter by tag / visibility |
| `/case/[id]` | **new** | per-case leaderboard, comments, "run this" CTA |
| `/case/new` | **new** | community submit form (open or closed) |
| `/leaderboard` | upgrade | data-driven, with filter / sort UI |
| `/tool/[slug]` | upgrade | submission history, fabrications by case |
| `/wall` | existing | curated CAUGHT cases — closed-trap reveals after dispute window |
| `/u/[handle]` | **new** | user profile + run history + badges |
| `/submit` | **new** | "submit your tool's run" landing |
| `/manifesto` | existing | unchanged |

---

## May 29 demo subset

What ships on stage. Intentionally small.

| Surface | State by 29 May |
|---|---|
| `/playground` | shipped, no change required |
| `/leaderboard` | populated from a static snapshot of the curated 200-task eval; filter UI hidden behind a feature flag if not ready |
| `/wall` | 3 hand-curated CAUGHT cases (already in [`plans/demo-may29.md`](../plans/demo-may29.md)) |
| `/case/[id]` | one read-only page for the Quanta Robotics task (T-0047) |
| `/submit` | Tally / Formspree waitlist — no real backend |
| skill (`trapstreet-eval`) | local-grader path stable; "submit to trapstreet.run" is a stub that prints "coming with the May 29 launch" |

Backend (DB, API routes, OAuth, real submissions) is **post-stage v1**.
Demo runs on a frozen snapshot.

---

## Open questions for next discussion

These didn't block the spec but block implementation. Resolve before the
backend work starts.

1. **Backend stack.** Next.js API routes + Postgres on Vercel? Cloudflare
   Pages + D1? Separate FastAPI service behind the Next.js app? Stack
   choice drives migration shape and per-month cost.
2. **Repo split.** Stay single repo (`trapstreet-landing` → drop static
   export, become a full Next.js app) or split into `trapstreet-landing`
   (marketing) + `trapstreet-app` (platform)? Single is simpler;
   splitting lets marketing keep auto-cached static export.
3. **GitHub OAuth vs handle-only.** Forcing GitHub login slows
   onboarding but kills throwaway-account abuse. Anonymous handles let
   any cheater spawn 100 accounts. Probably GitHub OAuth + per-account
   submission cap, but worth confirming.
4. **Skill distribution.** Stay as the existing `trapstreet-eval` skill
   bundled in the user's Claude install? Ship as `npx trapstreet eval`?
   Both? The skill route is faster to iterate on; npx route is more
   discoverable for non-Claude-Code users.
5. **Pricing kick-in.** When does Silver ($99–499/yr per
   [`trust-tiers.md`](trust-tiers.md)) start charging? Free through 5/29
   is obvious; what about month-2?

---

## Out of scope for v1

Listed so they don't sneak back in:

- Live Mode (today's SEC filings auto-pulled) — v1.1
- Embed badges on builders' sites — v1.1
- Prediction markets on tool fabrication rate — research, not roadmap
- Auto-rotating private held-out task pool — v1.1
- White-label private leaderboards for VCs / enterprise — v1.2 commercial
