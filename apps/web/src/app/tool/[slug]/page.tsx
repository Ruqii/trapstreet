import Link from "next/link";
import { notFound } from "next/navigation";
import { TierBadge } from "@/components/tier-badge";
import {
  RESUME_TAILORING_LEADERBOARD,
  WALL_ENTRIES,
} from "@/lib/mock-data";

export async function generateStaticParams() {
  return RESUME_TAILORING_LEADERBOARD.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = RESUME_TAILORING_LEADERBOARD.find((t) => t.slug === slug);
  return {
    title: tool ? `${tool.name} · Trap Street` : "Tool not found",
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = RESUME_TAILORING_LEADERBOARD.find((t) => t.slug === slug);
  if (!tool) notFound();

  const sorted = [...RESUME_TAILORING_LEADERBOARD].sort(
    (a, b) => b.score - a.score,
  );
  const rank = sorted.findIndex((t) => t.slug === tool.slug) + 1;
  const wallEntries = WALL_ENTRIES.filter((e) => e.toolSlug === tool.slug);

  return (
    <>
      <section className="container-x pt-16 pb-8 border-b border-[var(--color-bg-3)]">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div>
            <Link
              href="/leaderboard"
              className="text-sm text-[var(--color-text-3)] hover:text-[var(--color-text-1)]"
            >
              ← Resume Tailoring leaderboard
            </Link>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              {tool.name}
            </h1>
            <div className="mt-2 text-[var(--color-text-3)]">
              {tool.vendor} · {tool.pricing}
            </div>
            {tool.notes && (
              <p className="mt-4 text-[var(--color-text-2)] max-w-2xl leading-relaxed">
                {tool.notes}
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6 min-w-[260px]">
            <TierBadge tier={tool.tier} size="lg" withLabel />
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)]">
                  Rank
                </div>
                <div className="font-bold text-2xl tabular-nums">#{rank}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)]">
                  Score
                </div>
                <div className="font-bold text-2xl tabular-nums">
                  {tool.score.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-10 grid md:grid-cols-4 gap-4">
        <Stat label="Fabrications" value={String(tool.fabrications)} tone="error" />
        <Stat label="$/task" value={`$${tool.costUsd.toFixed(3)}`} />
        <Stat label="Latency" value={`${(tool.latencyMs / 1000).toFixed(1)}s`} />
        <Stat label="Pricing" value={tool.pricing} muted />
      </section>

      {wallEntries.length > 0 && (
        <section className="container-x py-8">
          <h2 className="text-2xl font-bold mb-4">
            On the Wall ({wallEntries.length})
          </h2>
          <div className="space-y-4">
            {wallEntries.map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-[var(--color-text-3)]">
                    {e.id} · Task {e.taskId} · {e.caughtAt}
                  </div>
                  <span className="px-2 py-1 rounded bg-[var(--color-error)]/15 text-[var(--color-error)] font-bold text-xs tracking-widest">
                    CAUGHT
                  </span>
                </div>
                <div className="font-semibold mb-2">{e.trap}</div>
                <div className="font-mono text-sm text-[var(--color-text-2)] leading-relaxed">
                  {e.whatItClaimed}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/wall"
              className="text-sm text-[var(--color-brand-500)] hover:underline"
            >
              See all entries on the Wall →
            </Link>
          </div>
        </section>
      )}

      <section className="container-x py-8">
        <h2 className="text-2xl font-bold mb-4">How this score was earned</h2>
        <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6 text-sm space-y-3">
          <Row k="Eval set" v="resume-tailoring · v1 · 200 tasks" />
          <Row k="Public / held-out / trap split" v="20 / 160 / 20" />
          <Row
            k="Tier evidence"
            v={
              tool.tier === "gold"
                ? "Full evaluation on Trap Street infra (200/200 tasks)"
                : tool.tier === "silver"
                  ? "Builder-self-reported, 10–20% audited by Trap Street"
                  : "Builder-self-reported via @trapstreet/cli"
            }
          />
          <Row k="Run window" v="2026-04-22 → 2026-04-25" />
          <Row k="Judge model" v="gpt-4o-mini · prompt v3.1" />
          <Row k="Reproducibility" v="Public traces · seeds locked · re-runnable" />
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  tone,
  muted,
}: {
  label: string;
  value: string;
  tone?: "error";
  muted?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-5">
      <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)]">
        {label}
      </div>
      <div
        className="font-bold text-2xl mt-1 tabular-nums"
        style={{
          color:
            tone === "error"
              ? "var(--color-error)"
              : muted
                ? "var(--color-text-3)"
                : "var(--color-text-1)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-[var(--color-bg-3)] pb-3 last:border-b-0 last:pb-0">
      <div className="text-[var(--color-text-3)] uppercase tracking-wider text-xs w-44 flex-shrink-0 mt-0.5">
        {k}
      </div>
      <div className="font-mono text-[var(--color-text-2)]">{v}</div>
    </div>
  );
}
