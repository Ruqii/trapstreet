import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BROKEN_TASKS } from "@/lib/mock-data";

export default function ExploreTasksPage() {
  return (
    <section className="container-x py-16">
      <div className="text-xs uppercase tracking-widest text-[var(--color-brand-500)] mb-3">
        Explore tasks
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
        Every task we measure on, in the open.
      </h1>
      <p className="text-[var(--color-text-2)] text-lg mb-10 max-w-2xl leading-relaxed">
        Public tasks are open data. Browse domains, datasets, and the systems
        that have been measured against them. Held-out and Live Mode probes
        remain private.
      </p>

      <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-[var(--color-text-3)] border-b border-[var(--color-bg-3)] bg-[var(--color-bg-2)]/50">
                <th className="px-5 py-3 font-medium">Task</th>
                <th className="px-5 py-3 font-medium">Domain</th>
                <th className="px-5 py-3 font-medium">Dataset</th>
                <th className="px-5 py-3 font-medium text-right">Runs</th>
                <th className="px-5 py-3 font-medium">Best System</th>
                <th className="px-5 py-3 font-medium text-right">% Failure</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {BROKEN_TASKS.map((t) => (
                <tr
                  key={t.slug}
                  className="border-b border-[var(--color-bg-3)] last:border-0 hover:bg-[var(--color-bg-2)]/40 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-[var(--color-text-1)]">
                    {t.task}
                  </td>
                  <td className="px-5 py-4 text-[var(--color-text-2)]">
                    {t.domain}
                  </td>
                  <td className="px-5 py-4 text-[var(--color-text-2)] tabular-nums">
                    {t.dataset}
                  </td>
                  <td className="px-5 py-4 text-right tabular-nums text-[var(--color-text-2)]">
                    {t.runs}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[var(--color-brand-300)]">
                    {t.bestSystem}
                  </td>
                  <td className="px-5 py-4 text-right tabular-nums">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md font-mono text-xs ${
                        t.failurePct >= 35
                          ? "bg-[var(--color-error)]/15 text-[var(--color-error)]"
                          : t.failurePct >= 20
                            ? "bg-[var(--color-warning)]/15 text-[var(--color-warning)]"
                            : "bg-[var(--color-success)]/15 text-[var(--color-success)]"
                      }`}
                    >
                      {t.failurePct}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/case/${t.slug}`}
                      className="inline-flex items-center gap-1 text-xs text-[var(--color-brand-500)] hover:text-[var(--color-brand-300)]"
                    >
                      View
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-6 text-sm text-[var(--color-text-3)]">
        Looking at one task in depth? Try the{" "}
        <Link
          href="/leaderboard"
          className="text-[var(--color-brand-500)] hover:text-[var(--color-brand-300)]"
        >
          Résumé Tailoring leaderboard
        </Link>
        .
      </p>
    </section>
  );
}
