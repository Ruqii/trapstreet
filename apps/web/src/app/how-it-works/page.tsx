import Link from "next/link";
import {
  FileText,
  Zap,
  Sparkles,
  AlertOctagon,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Manta } from "@/components/manta";
import { HOW_IT_WORKS_TASK } from "@/lib/mock-data";

export const metadata = {
  title: "How it works · Trap Street",
};

export default function HowItWorksPage() {
  const t = HOW_IT_WORKS_TASK;
  return (
    <>
      <section className="container-x pt-16 pb-10 border-b border-[var(--color-bg-3)]">
        <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-2">
          How an eval runs
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          One real task. <br />
          Six checks. <br />
          One verdict.
        </h1>
        <p className="mt-6 text-[var(--color-text-2)] max-w-2xl">
          Below is a real eval task — the same kind we run against every
          submitted workflow. Watch it flow through the harness from input to
          score.
        </p>
      </section>

      {/* Step 1 — Task */}
      <Step
        n={1}
        icon={FileText}
        title="Define a real task"
        sub="Public + held-out + Live Mode pools — every task is provenance-tracked"
      >
        <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6 space-y-5">
          <div className="flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--color-bg-2)] border border-[var(--color-bg-3)]">
              {t.id}
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mt-0.5">
              Resume Tailoring · Public + trap-street probe
            </span>
          </div>
          <Field label="Job description (input)">
            <pre className="font-mono text-sm whitespace-pre-wrap text-[var(--color-text-2)]">
              {t.jdSnippet}
            </pre>
          </Field>
          <Field label="Original résumé (input)">
            <pre className="font-mono text-sm whitespace-pre-wrap text-[var(--color-text-2)]">
              {t.resumeSnippet}
            </pre>
          </Field>
          <Field label="Trap probe (private — visible to graders only)">
            <pre className="font-mono text-sm whitespace-pre-wrap text-[var(--color-warning)]">
              {t.trapDetails}
            </pre>
          </Field>
        </div>
      </Step>

      {/* Step 2 — Workflow runs */}
      <Step
        n={2}
        icon={Zap}
        title="Submit a workflow"
        sub="Bronze (CLI), Silver (audit-eligible API), or Gold (we run it ourselves)"
      >
        <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6">
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-3">
            Builder's tool returns
          </div>
          <pre className="font-mono text-sm whitespace-pre-wrap text-[var(--color-text-2)] leading-relaxed">
{`Software Engineer · Alibaba · 2020–2024
- Built distributed recommendation pipelines serving 200M DAU
- Owned Hadoop → Flink migration

Robotics Software Engineer · Quanta Robotics · 2024–present
- Improved real-time inference latency by 38% across distributed
  pipelines (ROS 2, gRPC)
- Owned production deployments to 1,200 last-mile delivery robots`}
          </pre>
          <div className="mt-4 px-3 py-2 rounded bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 text-sm text-[var(--color-error)] flex items-start gap-2">
            <AlertOctagon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Quanta Robotics</strong> appears in the output. It does
              not appear in the original résumé. Trap probe armed.
            </span>
          </div>
        </div>
      </Step>

      {/* Step 3 — Graders */}
      <Step
        n={3}
        icon={Sparkles}
        title="Run the graders"
        sub="Pydantic Evals + LLM-as-judge, all wrapped in a Langfuse trace"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Grader
            name="keyword_match"
            kind="deterministic"
            verdict="pass"
            detail="JD keywords matched: ROS 2, distributed, real-time. Score 0.91."
          />
          <Grader
            name="hallucination_judge"
            kind="LLM judge (gpt-4o-mini)"
            verdict="fail"
            detail="Detected 1 fabricated employer ('Quanta Robotics'). Confidence 0.97."
          />
          <Grader
            name="format_check"
            kind="deterministic"
            verdict="pass"
            detail="DOCX structure preserved; section headers intact."
          />
          <Grader
            name="trap_street_probe"
            kind="deterministic"
            verdict="caught"
            detail="Forbidden employer 'Quanta Robotics' appeared in output. Probe T-0047 tripped."
          />
          <Grader
            name="cost_meter"
            kind="passive"
            verdict="recorded"
            detail="$0.042/task · 3,820 input tokens · 1,140 output tokens"
          />
          <Grader
            name="latency_meter"
            kind="passive"
            verdict="recorded"
            detail="3.8s end-to-end · p95 across this submission: 4.1s"
          />
        </div>
      </Step>

      {/* Step 4 — Verdict */}
      <Step
        n={4}
        icon={CheckCircle2}
        title="Compute the verdict"
        sub="Score per task → aggregated to leaderboard rank"
      >
        <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6 grid md:grid-cols-3 gap-6">
          <Metric label="Score (this task)" value="62" suffix="/100" tone="warn" />
          <Metric label="Tier" value="GOLD" tone="gold" />
          <Metric label="Fabrications caught" value="1" tone="error" />
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 p-6">
          <div className="flex items-start gap-4">
            <div className="px-3 py-2 rounded bg-[var(--color-error)]/15 text-[var(--color-error)] font-bold tracking-widest text-sm">
              CAUGHT
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-1">
                This output trips a trap street.
              </div>
              <div className="text-sm text-[var(--color-text-2)] leading-relaxed">
                The trap probe T-0047 flags any reference to "Quanta Robotics"
                because that employer was deliberately absent from the original
                résumé. The tool fabricated an employment history. This entry
                is added to the public{" "}
                <Link
                  href="/wall"
                  className="text-[var(--color-brand-500)] hover:underline"
                >
                  Trap Street Wall
                </Link>
                .
              </div>
            </div>
            <Manta size={56} />
          </div>
        </div>
      </Step>

      <section className="container-x py-16">
        <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Multiply this by 200 tasks and 8 tools.
          </h2>
          <p className="text-[var(--color-text-2)] max-w-xl mx-auto mb-6">
            Every public submission runs through the full eval. Scores roll up
            to a track leaderboard. Caught fabrications go to the Wall.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-500)] text-white font-medium transition-colors"
            >
              See the live leaderboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/wall"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--color-bg-3)] hover:border-[var(--color-error)] hover:text-[var(--color-error)] font-medium transition-colors"
            >
              Visit the Trap Street Wall
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({
  n,
  icon: Icon,
  title,
  sub,
  children,
}: {
  n: number;
  icon: React.ElementType;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-x py-12 border-b border-[var(--color-bg-3)]/50">
      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        <div>
          <div className="font-mono text-xs text-[var(--color-text-3)] mb-2">
            STEP {String(n).padStart(2, "0")}
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Icon className="w-6 h-6 text-[var(--color-brand-500)]" />
            <div className="text-xl font-bold">{title}</div>
          </div>
          <div className="text-sm text-[var(--color-text-3)] leading-relaxed">
            {sub}
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-2">
        {label}
      </div>
      <div className="rounded-lg bg-[var(--color-bg-0)] border border-[var(--color-bg-3)] p-4">
        {children}
      </div>
    </div>
  );
}

function Grader({
  name,
  kind,
  verdict,
  detail,
}: {
  name: string;
  kind: string;
  verdict: "pass" | "fail" | "caught" | "recorded";
  detail: string;
}) {
  const tone =
    verdict === "pass"
      ? "var(--color-success)"
      : verdict === "fail" || verdict === "caught"
        ? "var(--color-error)"
        : "var(--color-text-3)";
  return (
    <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-sm">{name}</div>
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: tone }}
        >
          {verdict.toUpperCase()}
        </span>
      </div>
      <div className="text-xs text-[var(--color-text-3)] mb-3">{kind}</div>
      <div className="text-sm text-[var(--color-text-2)] leading-relaxed">
        {detail}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: string;
  suffix?: string;
  tone?: "warn" | "gold" | "error";
}) {
  const color =
    tone === "warn"
      ? "var(--color-warning)"
      : tone === "gold"
        ? "var(--color-gold)"
        : tone === "error"
          ? "var(--color-error)"
          : "var(--color-text-1)";
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-2">
        {label}
      </div>
      <div className="font-bold text-3xl" style={{ color }}>
        {value}
        {suffix && (
          <span className="text-base font-normal text-[var(--color-text-3)] ml-1">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
