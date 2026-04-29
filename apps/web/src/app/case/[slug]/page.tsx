import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CASE_DETAILS } from "@/lib/mock-data";
import type { CaseDetail } from "@/lib/mock-data";
import { TierBadge } from "@/components/tier-badge";

export function generateStaticParams() {
  return Object.keys(CASE_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASE_DETAILS[slug];
  if (!c) return {};
  return { title: `${c.task} · Case · Trap Street` };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASE_DETAILS[slug];
  if (!c) notFound();

  return (
    <>
      {/* Header */}
      <section className="container-x pt-12 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-3)] hover:text-[var(--color-text-1)] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)]">
            Case · {c.domain}
          </div>
          {c.status === "pending" && (
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md bg-[var(--color-warning)]/15 text-[var(--color-warning)]">
              Leaderboard pending
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
          {c.task}
        </h1>
        <p className="text-[var(--color-text-2)] max-w-3xl leading-relaxed">
          {c.summary}
        </p>
      </section>

      {/* Stats strip */}
      <section className="container-x pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6">
          <Stat label="Dataset" value={c.dataset} />
          <Stat label="Runs" value={c.runs.toLocaleString()} />
          <Stat label="Best system" value={c.bestSystem} mono />
          <Stat
            label="% Failure"
            value={`${c.failurePct}%`}
            tone={
              c.failurePct >= 35
                ? "error"
                : c.failurePct >= 20
                  ? "warning"
                  : "success"
            }
          />
          <Stat
            label="Status"
            value={c.status === "live" ? "Live" : "Pending"}
            tone={c.status === "live" ? "success" : "warning"}
          />
        </div>
      </section>

      {/* Trap probe + example */}
      {(c.trapProbe || c.exampleQuestion) && (
        <section className="container-x pb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            <span className="text-[var(--color-brand-500)] font-mono mr-2 select-none">
              &gt;
            </span>
            What the eval checks
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {c.trapProbe && (
              <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6">
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-2">
                  Trap probe
                </div>
                <p className="text-sm text-[var(--color-text-2)] leading-relaxed">
                  {c.trapProbe}
                </p>
              </div>
            )}
            {c.exampleQuestion && (
              <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6 font-mono text-sm">
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] font-sans mb-2">
                  Example
                </div>
                <div className="text-[var(--color-text-1)] mb-3">
                  Q: {c.exampleQuestion}
                </div>
                {c.exampleGroundTruth && (
                  <div className="text-[var(--color-success)]">
                    A: {c.exampleGroundTruth}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Leaderboard */}
      <section className="container-x pb-24">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
          <span className="text-[var(--color-brand-500)] font-mono mr-2 select-none">
            &gt;
          </span>
          Leaderboard
        </h2>

        {c.leaderboard && c.leaderboard.length > 0 ? (
          <CaseLeaderboard rows={c.leaderboard} />
        ) : (
          <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-10 text-center text-[var(--color-text-2)]">
            <p className="mb-4">
              This case is in the queue. We are still recruiting tools to
              evaluate against it.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-500)] text-white text-sm font-medium transition-colors"
            >
              Submit a tool
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  tone,
  mono,
}: {
  label: string;
  value: string;
  tone?: "error" | "warning" | "success";
  mono?: boolean;
}) {
  const color =
    tone === "error"
      ? "text-[var(--color-error)]"
      : tone === "warning"
        ? "text-[var(--color-warning)]"
        : tone === "success"
          ? "text-[var(--color-success)]"
          : "text-[var(--color-text-1)]";
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-1">
        {label}
      </div>
      <div
        className={`font-bold text-lg ${color} ${mono ? "font-mono" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

function CaseLeaderboard({ rows }: { rows: CaseDetail["leaderboard"] }) {
  if (!rows) return null;
  return (
    <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-[var(--color-text-3)] border-b border-[var(--color-bg-3)] bg-[var(--color-bg-2)]/50">
              <th className="px-5 py-4 font-medium w-12">#</th>
              <th className="px-5 py-4 font-medium">Tool</th>
              <th className="px-5 py-4 font-medium">Tier</th>
              <th className="px-5 py-4 font-medium text-right">Score</th>
              <th className="px-5 py-4 font-medium text-right">Fabrications</th>
              <th className="px-5 py-4 font-medium text-right">$/task</th>
              <th className="px-5 py-4 font-medium text-right">Latency</th>
              <th className="px-5 py-4 font-medium">Patch</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tool, i) => (
              <tr
                key={tool.slug}
                className="border-b border-[var(--color-bg-3)] last:border-0 hover:bg-[var(--color-bg-2)]/40 transition-colors"
              >
                <td className="px-5 py-4 font-mono tabular-nums text-[var(--color-text-3)]">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={`/tool/${tool.slug}`}
                    className="font-medium text-[var(--color-text-1)] hover:text-[var(--color-brand-500)]"
                  >
                    {tool.name}
                  </Link>
                  <div className="text-xs text-[var(--color-text-3)] mt-0.5">
                    {tool.vendor}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <TierBadge tier={tool.tier} size="sm" withLabel />
                </td>
                <td className="px-5 py-4 text-right font-mono tabular-nums">
                  {tool.score.toFixed(1)}
                </td>
                <td className="px-5 py-4 text-right font-mono tabular-nums">
                  <span
                    style={{
                      color:
                        tool.fabrications === 0
                          ? "var(--color-success)"
                          : tool.fabrications >= 5
                            ? "var(--color-error)"
                            : "var(--color-warning)",
                    }}
                  >
                    {tool.fabrications}
                  </span>
                </td>
                <td className="px-5 py-4 text-right font-mono tabular-nums text-[var(--color-text-2)]">
                  ${tool.costUsd.toFixed(3)}
                  {tool.selfReported && (
                    <div className="text-xs font-sans text-[var(--color-text-3)] mt-0.5">
                      self-reported
                    </div>
                  )}
                </td>
                <td className="px-5 py-4 text-right font-mono tabular-nums text-[var(--color-text-2)]">
                  {(tool.latencyMs / 1000).toFixed(1)}s
                </td>
                <td className="px-5 py-4 text-[var(--color-text-3)]">
                  {tool.patch}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
