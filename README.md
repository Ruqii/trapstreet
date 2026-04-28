# Trap Street

> **Find the fakes. Run real evals. Share the results.**
> [trapstreet.run](https://trapstreet.run)

Trap Street is the community evaluation harness for AI workflows, agents, and skills.
Not a model leaderboard — a **"does this thing actually finish the job, and is it
telling you the truth"** leaderboard.

We plant verifiable truths. We run real tasks. We watch who copies, who fabricates,
and who ships.

---

## The story

In the 18th century, navigation was a real problem. Everyone had theories.
No one had truth — until John Harrison built **H4**, a clock that didn't drift.

Two centuries later, mapmakers had the same problem with copycats. Their answer
was the **trap street**: a fictitious street drawn into a real map. If a competitor
copied your map, the fake street appeared in their version too — instant proof
of fraud.

That's the playbook. We plant verifiable truths inside real tasks. AI tools that
**actually do the job** pass through cleanly. AI tools that **fabricate, hallucinate,
or copy** trip the trap.

→ Full naming + brand rationale: [`docs/name-rationale.md`](docs/name-rationale.md)

---

## The four verbs

```
Define real tasks  →  Explore tasks  →  Submit a task  →  Run an eval
```

Everything in this product is one of those four verbs.

---

## The mascot

A pixel-art manta ray. Manta rays glide along constant bearings across thousands
of kilometers of open water without a map — silent, deliberate, hard to fool.

![Trap Street mascot](assets/mascot/manta-ray-v2.png)

---

## How it works (the short version)

Three trust tiers. The leaderboard shows them with different badges.

| Tier | Who runs the eval | Tasks used | What it costs us |
|---|---|---|---|
| 🥉 **Bronze** — self-reported | Builder, locally | Public only | $0 |
| 🥈 **Silver** — verified | Builder + 10% audit by us | Public + sampled held-out | low |
| 🥇 **Gold** — full eval | Us, on builder's endpoint | Public + held-out + Live Mode | bounded (top 20 only) |

Builders cheat at the Silver tier? They land on the **Trap Street Wall** — a
public failure gallery of "this tool reported X, audit revealed Y." That's both
our credibility moat and our viral content engine.

→ Full design: [`docs/trust-tiers.md`](docs/trust-tiers.md)

---

## What's in this directory

```
trapstreet/
├── README.md                              this file
├── docs/
│   ├── manifesto.md                       H4 + Trap Street story
│   ├── brand-system.md                    LOCKED brand spec v1.0
│   ├── name-rationale.md                  Why "Trap Street" (vs Rhumb, vs Driftless)
│   ├── trust-tiers.md                     Bronze / Silver / Gold model
│   ├── pm-design.md                       Pages, features, the 5 weapons
│   ├── eval-stack.md                      Pydantic Evals + Langfuse stack
│   ├── architecture.md                    System architecture, data model
│   └── source-pm-conversation.md          Original CTO conversation
├── plans/
│   └── v0-mvp.md                          6-week MVP plan
└── assets/
    ├── brand/                             brand-sheet-v1.png + lockups
    ├── mascot/                            manta ray pixel art
    ├── error-states/                      sad manta 404, etc.
    └── reference/                         original H4 handwritten note
```

---

## Tagline candidates

- **Find the fakes.**
- **We plant the truth. We watch who copies.**
- **Real tasks. Hidden traps. Honest scores.**
- **The map is the test.**

---

## Status

Domain registered: **trapstreet.run**
Brand locked: **Trap Street**
Architecture: tiered trust model (Bronze / Silver / Gold)
Stack: Pydantic Evals + Langfuse + custom submission/runner/leaderboard

**Phase 1 mission:** support CEO Ruqi as a speaker at the Claude Code London
Event on **May 29, 2026.** All work between now and the show date is
subordinate to the live demo on stage.

- Active demo plan: [`plans/demo-may29.md`](plans/demo-may29.md)
- Immediate 48h deliverable (speaker prep call 30 Apr): [`plans/speaker-prep-apr30.md`](plans/speaker-prep-apr30.md)
- Original V0 plan (deprecated, kept for reference): [`plans/v0-mvp.md`](plans/v0-mvp.md)
