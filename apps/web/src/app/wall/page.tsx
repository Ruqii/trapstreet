import Link from "next/link";
import { Manta } from "@/components/manta";
import { WALL_ENTRIES } from "@/lib/mock-data";

export const metadata = {
  title: "Trap Street Wall · Cheaters get caught",
};

export default function WallPage() {
  return (
    <>
      <section className="brick-pattern border-b border-[var(--color-bg-3)]">
        <div className="container-x py-20">
          <div className="flex items-start gap-6 max-w-4xl">
            <Manta size={96} className="flex-shrink-0" />
            <div>
              <div className="text-xs uppercase tracking-widest text-[var(--color-error)] mb-3">
                The Trap Street Wall
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none">
                CHEATERS
                <br />
                GET CAUGHT.
              </h1>
              <p className="mt-6 text-[var(--color-text-2)] max-w-xl">
                Three of {WALL_ENTRIES.length} entries this week. Each one
                fabricated content that was never in the source. Each one
                tripped a trap street probe. Each one is here forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-12 space-y-8">
        {WALL_ENTRIES.map((e) => (
          <div
            key={e.id}
            className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-8"
          >
            <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
              <div>
                <Link
                  href={`/tool/${e.toolSlug}`}
                  className="text-2xl font-bold hover:text-[var(--color-brand-500)]"
                >
                  {e.toolName}
                </Link>
                <div className="text-sm text-[var(--color-text-3)] mt-1">
                  {e.id} · Caught {e.caughtAt} · Task {e.taskId} · Trap:{" "}
                  <span className="text-[var(--color-warning)]">{e.trap}</span>
                </div>
              </div>
              <div className="px-4 py-2 rounded bg-[var(--color-error)] text-white font-bold tracking-widest text-sm border-2 border-[var(--color-error)]/60">
                CAUGHT
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Box label="What it claimed" tone="error">
                {e.whatItClaimed}
              </Box>
              <Box label="What the truth is" tone="success">
                {e.whatTheTruthIs}
              </Box>
            </div>
            <div className="mt-4 text-xs text-[var(--color-text-3)] leading-relaxed border-t border-[var(--color-bg-3)] pt-4">
              <strong className="text-[var(--color-text-2)]">How we caught it.</strong>{" "}
              {e.evidence}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-dashed border-[var(--color-bg-3)] p-8 text-center text-[var(--color-text-3)]">
          More entries are added every week as we run new evals. The Wall is
          append-only.
        </div>
      </section>
    </>
  );
}

function Box({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "error" | "success";
  children: React.ReactNode;
}) {
  const color =
    tone === "error" ? "var(--color-error)" : "var(--color-success)";
  return (
    <div className="rounded-lg border border-[var(--color-bg-3)] bg-[var(--color-bg-0)] p-5">
      <div
        className="text-xs uppercase tracking-wider mb-2"
        style={{ color }}
      >
        {label}
      </div>
      <div className="font-mono text-sm leading-relaxed text-[var(--color-text-2)]">
        {children}
      </div>
    </div>
  );
}
