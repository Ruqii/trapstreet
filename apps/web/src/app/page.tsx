import Link from "next/link";
import {
  Target,
  Eye,
  Upload,
  PlayCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Manta } from "@/components/manta";
import { TierBadgeFull } from "@/components/tier-badge";
import { RESUME_TAILORING_LEADERBOARD } from "@/lib/mock-data";

export default function HomePage() {
  const fabsCaught = RESUME_TAILORING_LEADERBOARD.reduce(
    (a, t) => a + t.fabrications,
    0,
  );

  return (
    <>
      {/* Hero */}
      <section className="container-x pt-20 pb-16">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-bg-3)] text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              Open source · Apache-2.0 · Prototype build
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
              H4 for{" "}
              <span className="text-[var(--color-brand-500)]">AI workflows</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[var(--color-text-2)] max-w-2xl leading-relaxed">
              In the 18th century, navigation had no truth — until Harrison
              built H4. We're building the H4 for AI workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-500)] text-white font-medium transition-colors"
              >
                See how it works
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--color-bg-3)] hover:border-[var(--color-brand-500)] font-medium transition-colors"
              >
                View the leaderboard
              </Link>
              <Link
                href="/wall"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--color-error)]/40 hover:border-[var(--color-error)] hover:text-[var(--color-error)] font-medium transition-colors"
              >
                The Trap Street Wall →
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md text-sm">
              <div>
                <div className="text-2xl font-bold tabular-nums">
                  {RESUME_TAILORING_LEADERBOARD.length}
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)]">
                  Tools evaluated
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums">200</div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)]">
                  Real tasks
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums text-[var(--color-error)]">
                  {fabsCaught}
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)]">
                  Fabrications caught
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-[var(--color-brand-700)]/10 rounded-full blur-3xl" />
            <Manta size={240} className="relative" />
          </div>
        </div>
      </section>

      {/* Manifesto strip */}
      <section className="border-y border-[var(--color-bg-3)] bg-[var(--color-bg-1)]">
        <div className="container-x py-14 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-[var(--color-brand-500)] mb-4">
            What we do, in four lines
          </div>
          <div className="font-mono text-2xl md:text-3xl leading-loose text-[var(--color-text-1)]">
            <div>We don't fine-tune models.</div>
            <div>We test claims.</div>
            <div>We run real tasks.</div>
            <div>
              We expose what works, what fails, and{" "}
              <span className="text-[var(--color-error)]">what lies</span>.
            </div>
          </div>
        </div>
      </section>

      {/* Four verbs */}
      <section className="container-x py-20">
        <div className="text-xs uppercase tracking-widest text-[var(--color-text-3)] mb-3">
          The four verbs
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Define real tasks. Explore tasks. Submit a task. Run an eval.
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Verb
            n="01"
            icon={Target}
            title="Define real tasks"
            body="Real JDs, real résumés, real SEC filings — never synthetic, never gameable. Trap-street probes are seeded into the held-out set."
          />
          <Verb
            n="02"
            icon={Eye}
            title="Explore tasks"
            body="Public tasks are open data. Anyone can browse what the world is being measured on. Held-out and Live Mode tasks remain private."
          />
          <Verb
            n="03"
            icon={Upload}
            title="Submit a task"
            body="Three submission tiers: Bronze (CLI), Silver (audit-eligible API), Gold (we run it ourselves on held-out + Live Mode)."
          />
          <Verb
            n="04"
            icon={PlayCircle}
            title="Run an eval"
            body="Pydantic Evals + LLM-as-judge wrapped in Langfuse traces. 200 tasks. 5 minutes. Scores published with full provenance."
          />
        </div>
      </section>

      {/* Trust tiers */}
      <section className="container-x py-16 border-t border-[var(--color-bg-3)]">
        <div className="text-xs uppercase tracking-widest text-[var(--color-text-3)] mb-3">
          Trust tiers
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Every score wears its evidence on its sleeve.
        </h2>
        <p className="text-[var(--color-text-2)] max-w-2xl mb-10">
          The user's question is "how do I know this score is real?", not "how
          good is the tool?" The tier badge answers the first question. The
          score answers the second.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          <TierBadgeFull tier="bronze" />
          <TierBadgeFull tier="silver" />
          <TierBadgeFull tier="gold" />
        </div>
      </section>

      {/* Why H4 */}
      <section className="container-x py-16">
        <div className="text-xs uppercase tracking-widest text-[var(--color-text-3)] mb-3">
          Why H4
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Truth, not theories.
        </h2>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
          <Card
            icon={ShieldCheck}
            title="Reproducible"
            body="Every score is re-runnable. Anyone can clone the harness, replay our traces, and verify the verdict. That's the H4 standard."
          />
          <Card
            icon={Sparkles}
            title="Live Mode"
            body="Today's SEC filings. Today's LinkedIn JDs. Tasks that did not exist in any model's training data. A moat that renews itself daily."
          />
          <Card
            icon={Target}
            title="Trap streets"
            body="We seed verifiable falsehoods inside held-out tasks. Workflows that fabricate trip the trap and land on the public Wall."
          />
          <Card
            icon={Eye}
            title="Transparent judges"
            body="Our LLM judges are open. Their prompts are versioned. Agreement with human annotators is published. No black boxes."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <div className="rounded-3xl border border-[var(--color-bg-3)] bg-gradient-to-br from-[var(--color-bg-1)] to-[var(--color-bg-0)] p-10 md:p-14 text-center">
          <Manta size={64} className="mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Find the fakes.
          </h2>
          <p className="text-[var(--color-text-2)] max-w-2xl mx-auto mb-8">
            Built on Pydantic Evals + Langfuse. Open source. The community
            edition is free forever. The hosted edition is how we eat.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-500)] text-white font-medium transition-colors"
            >
              See an eval run
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/AntiNoise-ai/trapstreet"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--color-bg-3)] hover:border-[var(--color-brand-500)] font-medium transition-colors"
            >
              Read the code
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Verb({
  n,
  icon: Icon,
  title,
  body,
}: {
  n: string;
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6 hover:border-[var(--color-brand-500)] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-6 h-6 text-[var(--color-brand-500)]" />
        <span className="font-mono text-xs text-[var(--color-text-3)]">
          {n}
        </span>
      </div>
      <div className="font-bold text-lg mb-2">{title}</div>
      <p className="text-sm text-[var(--color-text-2)] leading-relaxed">
        {body}
      </p>
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6">
      <Icon className="w-6 h-6 text-[var(--color-brand-500)] mb-3" />
      <div className="font-bold text-lg mb-2">{title}</div>
      <p className="text-sm text-[var(--color-text-2)] leading-relaxed">
        {body}
      </p>
    </div>
  );
}
