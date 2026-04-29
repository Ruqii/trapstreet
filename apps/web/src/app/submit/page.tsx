import Link from "next/link";
import { Upload, ArrowRight } from "lucide-react";
import { Manta } from "@/components/manta";

export default function SubmitPage() {
  return (
    <section className="container-x py-20 max-w-3xl">
      <div className="text-xs uppercase tracking-widest text-[var(--color-brand-500)] mb-3">
        Submit a task
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
        Plant a real task. We run it. The world sees the result.
      </h1>
      <p className="text-[var(--color-text-2)] text-lg mb-10 leading-relaxed">
        Tasks are how Trap Street stays honest. Bring real-world work — JDs,
        SEC filings, support tickets — and we&rsquo;ll seed verifiable trap
        probes inside it before any AI tool ever sees the data.
      </p>

      <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-8 mb-6">
        <div className="flex items-start gap-4">
          <Upload className="w-7 h-7 text-[var(--color-brand-500)] mt-1" />
          <div className="flex-1">
            <div className="font-bold mb-1">Submission intake (coming soon)</div>
            <p className="text-sm text-[var(--color-text-2)] mb-4">
              The web submission flow is being wired up for the May 29 demo.
              Until then, open a GitHub issue with your proposed task and we
              will review it within a week.
            </p>
            <a
              href="https://github.com/AntiNoise-ai/trapstreet/issues/new"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-500)] text-white text-sm font-medium transition-colors"
            >
              Propose a task on GitHub
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-bg-3)] p-8 flex items-center gap-5">
        <Manta size={56} />
        <div>
          <div className="font-bold mb-1">Want to see what counts as a task?</div>
          <p className="text-sm text-[var(--color-text-2)]">
            Walk through one real eval end-to-end —{" "}
            <Link
              href="/how-it-works"
              className="text-[var(--color-brand-500)] hover:text-[var(--color-brand-300)]"
            >
              How it works
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
