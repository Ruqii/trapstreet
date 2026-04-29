import Link from "next/link";
import { TierBadge } from "@/components/tier-badge";
import { RESUME_TAILORING_LEADERBOARD } from "@/lib/mock-data";

export const metadata = {
  title: "Leaderboard · Resume Tailoring · Trap Street",
};

export default function LeaderboardPage() {
  const sorted = [...RESUME_TAILORING_LEADERBOARD].sort(
    (a, b) => b.score - a.score,
  );

  return (
    <>
      <section className="container-x pt-16 pb-8 border-b border-[var(--color-bg-3)]">
        <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-2">
          Track · Resume Tailoring
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          The leaderboard.
        </h1>
        <p className="text-[var(--color-text-2)] max-w-2xl mb-6">
          200 résumé/JD pairs. 8 tools. 20 of those tasks are trap-street
          probes — we know in advance what the tools should NOT say.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Stat label="Tasks" value="200" />
          <Stat label="Tools" value={String(sorted.length)} />
          <Stat label="Trap probes" value="20" />
          <Stat
            label="Total fabrications caught"
            value={String(sorted.reduce((a, t) => a + t.fabrications, 0))}
            tone="error"
          />
          <Stat label="Last refresh" value="Apr 25, 2026" muted />
        </div>
      </section>

      <section className="container-x py-10">
        <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-bg-2)] text-[var(--color-text-3)]">
              <tr className="text-left">
                <Th className="w-14">#</Th>
                <Th>Tool</Th>
                <Th>Tier</Th>
                <Th className="text-right">Score</Th>
                <Th className="text-right">Fabrications</Th>
                <Th className="text-right">$/task</Th>
                <Th className="text-right">Latency</Th>
                <Th>Patch</Th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((tool, i) => (
                <tr
                  key={tool.slug}
                  className="border-t border-[var(--color-bg-3)] hover:bg-[var(--color-bg-2)]/40 transition-colors"
                >
                  <Td>
                    <span className="font-mono tabular-nums text-[var(--color-text-3)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Td>
                  <Td>
                    <Link
                      href={`/tool/${tool.slug}`}
                      className="font-medium hover:text-[var(--color-brand-500)]"
                    >
                      {tool.name}
                    </Link>
                    <div className="text-xs text-[var(--color-text-3)] mt-0.5">
                      {tool.vendor}
                    </div>
                  </Td>
                  <Td>
                    <TierBadge tier={tool.tier} size="sm" withLabel />
                  </Td>
                  <Td className="text-right">
                    <span className="font-mono tabular-nums">
                      {tool.score.toFixed(1)}
                    </span>
                  </Td>
                  <Td className="text-right">
                    <span
                      className="font-mono tabular-nums"
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
                  </Td>
                  <Td className="text-right font-mono tabular-nums text-[var(--color-text-2)]">
                    ${tool.costUsd.toFixed(3)}
                    {tool.selfReported && (
                      <div className="text-xs font-sans text-[var(--color-text-3)] mt-0.5">
                        self-reported
                      </div>
                    )}
                  </Td>
                  <Td className="text-right font-mono tabular-nums text-[var(--color-text-2)]">
                    {(tool.latencyMs / 1000).toFixed(1)}s
                  </Td>
                  <Td className="text-[var(--color-text-3)]">{tool.patch}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-xs text-[var(--color-text-3)] leading-relaxed">
          <strong className="text-[var(--color-text-2)]">Reading the table.</strong>{" "}
          The tier badge tells you how we know the score (Bronze =
          self-reported, Silver = we audited 10–20% of the run, Gold = we ran
          the entire eval ourselves). The fabrication count includes both LLM-judge
          flags and trap-street trips.
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
    <div>
      <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)]">
        {label}
      </div>
      <div
        className="font-bold text-lg"
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

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
