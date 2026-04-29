import Link from "next/link";
import { ArrowRight, Github, BookOpen, Star } from "lucide-react";
import {
  BROKEN_TASKS,
  RESUME_TAILORING_LEADERBOARD,
  SITE_STATS,
} from "@/lib/mock-data";
import type { ToolRow } from "@/lib/mock-data";
import { CountUp } from "@/components/count-up";
import { TerminalCard, type TerminalLine } from "@/components/terminal-card";
import { TierBadge } from "@/components/tier-badge";

const RESUME_SORTED = [...RESUME_TAILORING_LEADERBOARD].sort(
  (a, b) => b.score - a.score,
);

const TERMINAL_LINES: TerminalLine[] = [
  {
    kind: "comment",
    text: "# 30 seconds, no API key, runs against your current Claude session",
  },
  {
    kind: "command",
    prompt: "$",
    text: "curl -fsSL https://trapstreet.run/install.sh | bash",
  },
  { kind: "blank" },
  { kind: "comment", text: "# then in any Claude Code session:" },
  {
    kind: "command",
    prompt: "›",
    text: "/trapstreet-eval",
    highlight: true,
    copyable: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Tagline */}
      <section className="container-x pt-20 pb-10">
        <p className="font-mono font-bold text-2xl md:text-4xl leading-tight tracking-tight text-center">
          <span className="text-[var(--color-text-1)]">
            We&rsquo;re heading into
          </span>{" "}
          <span className="text-[var(--color-brand-500)]">
            uncharted territory together.
          </span>
        </p>
      </section>

      {/* Stats row */}
      <section className="container-x pt-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
          <Stat
            value={SITE_STATS.realWorldTasks}
            label="real-world tasks"
            tone="brand"
          />
          <Stat value={SITE_STATS.evalRuns} label="eval runs" tone="brand" />
          <Stat
            value={SITE_STATS.failuresUncovered}
            label="failures uncovered"
            tone="error"
          />
        </div>
      </section>

      {/* Terminal card */}
      <section className="container-x pt-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <SectionHeading className="mb-6">Quick Start</SectionHeading>
          <TerminalCard
            lines={TERMINAL_LINES}
            title="one-liner · install the trapstreet-eval skill"
          />
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[var(--color-text-2)]">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1 hover:text-[var(--color-text-1)] transition-colors"
            >
              No install? Use the browser playground
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://github.com/AntiNoise-ai/trapstreet"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--color-text-1)] transition-colors"
            >
              <Github className="w-4 h-4" />
              View skill source
            </a>
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-1 hover:text-[var(--color-text-1)] transition-colors"
            >
              Why we built this
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Most Broken Tasks */}
      <section className="container-x pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <SectionHeading>Most Broken Tasks</SectionHeading>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-brand-500)] hover:text-[var(--color-brand-300)]"
          >
            View all tasks
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-[var(--color-text-3)] border-b border-[var(--color-bg-3)] bg-[var(--color-bg-2)]/50">
                  <th className="px-6 py-4 font-medium">Task</th>
                  <th className="px-6 py-4 font-medium">Domain</th>
                  <th className="px-6 py-4 font-medium">Dataset</th>
                  <th className="px-6 py-4 font-medium text-right">Runs</th>
                  <th className="px-6 py-4 font-medium">Best System</th>
                  <th className="px-6 py-4 font-medium text-right">% Failure</th>
                </tr>
              </thead>
              <tbody>
                {BROKEN_TASKS.map((t) => (
                  <tr
                    key={t.slug}
                    className="border-b border-[var(--color-bg-3)] last:border-0 hover:bg-[var(--color-bg-2)]/40 transition-colors"
                  >
                    <td className="px-6 py-5 font-medium text-[var(--color-text-1)]">
                      <Link
                        href={`/case/${t.slug}`}
                        className="hover:text-[var(--color-brand-500)]"
                      >
                        {t.task}
                      </Link>
                    </td>
                    <td className="px-6 py-5 text-[var(--color-text-2)]">
                      {t.domain}
                    </td>
                    <td className="px-6 py-5 text-[var(--color-text-2)] tabular-nums">
                      {t.dataset}
                    </td>
                    <td className="px-6 py-5 text-right tabular-nums text-[var(--color-text-2)]">
                      {t.runs}
                    </td>
                    <td className="px-6 py-5 font-mono text-xs text-[var(--color-brand-300)]">
                      {t.bestSystem}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/case/${t.slug}`}
                        className="inline-flex items-center gap-2 tabular-nums hover:text-[var(--color-text-1)]"
                      >
                        <FailurePill pct={t.failurePct} />
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-3)]" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="container-x pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <SectionHeading>Leaderboard</SectionHeading>
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-brand-500)] hover:text-[var(--color-brand-300)]"
          >
            View full leaderboard
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <LeaderboardTable rows={RESUME_SORTED} />

        <div className="mt-3 text-xs text-[var(--color-text-3)]">
          Featured trap probe ·{" "}
          <Link
            href="/wall"
            className="font-mono text-[var(--color-warning)] hover:underline underline-offset-4"
          >
            T-0047 · Quanta Robotics
          </Link>{" "}
          ·{" "}
          <Link
            href="/wall"
            className="hover:text-[var(--color-text-1)] underline-offset-4 hover:underline"
          >
            Trap Street Wall
          </Link>
        </div>
      </section>

      {/* Find the fakes callout */}
      <section className="container-x pb-16">
        <div className="rounded-xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-5 text-sm text-[var(--color-text-2)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span>
              <strong className="text-[var(--color-text-1)]">
                Find the fakes.
              </strong>{" "}
              We plant verifiable truths inside real tasks. Tools that
              fabricate trip the trap and land on the public Wall.
            </span>
            <Link
              href="/manifesto"
              className="text-[var(--color-brand-500)] hover:text-[var(--color-brand-300)] inline-flex items-center gap-1 whitespace-nowrap"
            >
              Read the manifesto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4 small icon tiles, centered */}
      <section className="container-x pb-24">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <Tile
            href="https://github.com/AntiNoise-ai/trapstreet"
            external
            icon={<Github className="w-5 h-5" />}
            label="GitHub"
          />
          <Tile
            href="#"
            external
            icon={<DiscordIcon className="w-5 h-5" />}
            label="Discord"
          />
          <Tile
            href="/how-it-works"
            icon={<BookOpen className="w-5 h-5" />}
            label="Tutorial"
          />
          <Tile
            href="/manifesto"
            icon={<Star className="w-5 h-5" />}
            label="Vision"
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-x pb-32">
        <div className="max-w-xl mx-auto rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-10 md:p-12 text-center">
          <h3 className="text-2xl font-bold tracking-tight mb-3">
            Stay in the loop
          </h3>
          <p className="text-sm text-[var(--color-text-2)] mb-8">
            Get updates on new tasks and eval runs. No spam. Unsubscribe
            anytime.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            action="#"
            method="post"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--color-bg-0)] border border-[var(--color-bg-3)] focus:border-[var(--color-brand-500)] focus:outline-none text-sm placeholder:text-[var(--color-text-3)]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-500)] text-white font-medium text-sm transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-2xl md:text-3xl font-bold tracking-tight ${className}`}
    >
      <span className="text-[var(--color-brand-500)] font-mono mr-2 select-none">
        &gt;
      </span>
      {children}
    </h2>
  );
}

function Stat({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: "brand" | "error";
}) {
  const color =
    tone === "error"
      ? "text-[var(--color-error)]"
      : "text-[var(--color-brand-500)]";
  return (
    <div>
      <CountUp
        to={value}
        className={`block text-5xl md:text-6xl font-bold tracking-tight tabular-nums ${color}`}
      />
      <div className="mt-4 text-sm uppercase tracking-wider text-[var(--color-text-3)]">
        {label}
      </div>
    </div>
  );
}

function LeaderboardTable({ rows }: { rows: ToolRow[] }) {
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
              <th className="px-5 py-4 font-medium">Pricing</th>
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
                </td>
                <td className="px-5 py-4 text-right font-mono tabular-nums text-[var(--color-text-2)]">
                  {(tool.latencyMs / 1000).toFixed(1)}s
                </td>
                <td className="px-5 py-4 text-[var(--color-text-3)]">
                  {tool.pricing}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FailurePill({ pct }: { pct: number }) {
  const tone =
    pct >= 35
      ? "bg-[var(--color-error)]/15 text-[var(--color-error)]"
      : pct >= 20
        ? "bg-[var(--color-warning)]/15 text-[var(--color-warning)]"
        : "bg-[var(--color-success)]/15 text-[var(--color-success)]";
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md font-mono text-xs ${tone}`}
    >
      {pct}%
    </span>
  );
}

function Tile({
  href,
  external,
  icon,
  label,
}: {
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  const className =
    "group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] hover:border-[var(--color-brand-500)] hover:bg-[var(--color-bg-2)] transition-colors text-sm";
  const inner = (
    <>
      <span className="text-[var(--color-text-2)] group-hover:text-[var(--color-brand-300)] transition-colors">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.07.07 0 0 0-.075.035c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.65 12.65 0 0 0-.617-1.25.073.073 0 0 0-.075-.034A19.74 19.74 0 0 0 5.937 4.37a.064.064 0 0 0-.03.027C2.533 9.046 1.611 13.58 2.07 18.057a.082.082 0 0 0 .031.056 19.93 19.93 0 0 0 6.002 3.029.077.077 0 0 0 .084-.027 14.09 14.09 0 0 0 1.226-1.994.075.075 0 0 0-.041-.104 13.13 13.13 0 0 1-1.872-.892.075.075 0 0 1-.008-.125c.126-.094.252-.192.372-.291a.075.075 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.099.246.198.373.292a.075.075 0 0 1-.006.125 12.32 12.32 0 0 1-1.873.891.075.075 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.86 19.86 0 0 0 6.012-3.029.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.03-.029ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.955 2.418-2.157 2.418Zm7.974 0c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}
