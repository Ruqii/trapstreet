import Link from "next/link";

export const metadata = {
  title: "Manifesto · Trap Street",
};

export default function ManifestoPage() {
  return (
    <article className="container-x py-20 max-w-3xl">
      <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-3">
        Manifesto
      </div>
      <h1 className="text-5xl font-bold tracking-tight leading-tight mb-10">
        We're building the H4 for AI workflows.
      </h1>

      <Quote>
        In the 18th century, navigation was a real problem. Everyone had
        theories. No one had truth. Until Harrison built H4 — a clock that
        didn't drift. That changed everything.
      </Quote>

      <h2 className="text-2xl font-bold mt-12 mb-4">Two stories. Same idea.</h2>

      <h3 className="text-lg font-semibold mt-8 mb-3">
        The clock that didn't drift (1759)
      </h3>
      <p className="text-[var(--color-text-2)] leading-relaxed mb-4">
        Through most of the 1700s, ships couldn't reliably tell where they were
        at sea. Latitude was easy. Longitude was the killer — it required a
        clock that survived rolling, temperature, and salt air. None did.
        Empires lost fleets.
      </p>
      <p className="text-[var(--color-text-2)] leading-relaxed mb-4">
        John Harrison, a self-taught carpenter, spent forty years building four
        clocks. <strong>H4</strong> was the one that worked — accurate to
        within seconds across an Atlantic crossing. Suddenly captains had{" "}
        <em>truth</em> instead of theories. Navigation stopped being a debate.
      </p>

      <h3 className="text-lg font-semibold mt-8 mb-3">
        The street that wasn't there (1930s)
      </h3>
      <p className="text-[var(--color-text-2)] leading-relaxed mb-4">
        Mapmakers had a different but related problem: copycats. Their answer
        was the <strong>trap street</strong> — a tiny, plausible-looking street
        drawn into the map that didn't actually exist on the ground. If a
        competitor's map showed your trap street, the copy was exposed. The
        fake feature is the proof.
      </p>
      <p className="text-[var(--color-text-2)] leading-relaxed mb-4">
        The most famous example is <strong>Agloe, New York</strong> — a paper
        town invented in 1930. Decades later a general store opened on the
        exact spot and named itself after the fake town on the map. The
        fiction had become real.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4">Why this matters for AI</h2>
      <p className="text-[var(--color-text-2)] leading-relaxed mb-4">
        Today's AI workflow market has both problems at once.{" "}
        <strong>Drift</strong> — vendors quote benchmarks that don't survive a
        real task. <strong>Fabrication</strong> — AI tools confidently invent
        work history, cite papers that don't exist, hallucinate API endpoints.
      </p>
      <p className="text-[var(--color-text-2)] leading-relaxed mb-4">
        Trap Street is the H4 for AI workflows, with cartographer's traps
        built in. We plant verifiable truths inside real tasks. Workflows that
        finish the job pass through cleanly. Workflows that fabricate or copy
        trip the trap.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4">What we do, in four lines</h2>
      <Quote>
        <div>We don't fine-tune models.</div>
        <div>We test claims.</div>
        <div>We run real tasks.</div>
        <div>
          We expose what works, what fails, and{" "}
          <span className="text-[var(--color-error)]">what lies</span>.
        </div>
      </Quote>

      <h2 className="text-2xl font-bold mt-12 mb-4">What we will not do</h2>
      <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-2)] leading-relaxed">
        <li>We will not run a vibes leaderboard.</li>
        <li>We will not let vendors self-grade without audit.</li>
        <li>
          We will not lock the eval logic behind a paywall — the harness is
          open source, the public task pool is open data, the audit
          methodology is public.
        </li>
        <li>
          We will not pretend a held-out test set stays held-out forever; we
          rotate.
        </li>
        <li>We will not score what we cannot reproduce.</li>
      </ul>

      <p className="mt-12 text-[var(--color-text-3)] italic">
        The whole point is that someone, somewhere, can clone our repo and
        verify any score on the leaderboard. That is the H4 standard. That is
        the trap street test.
      </p>

      <div className="mt-16 border-t border-[var(--color-bg-3)] pt-8 flex flex-wrap gap-3">
        <Link
          href="/how-it-works"
          className="inline-flex px-5 py-3 rounded-lg bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-500)] text-white font-medium transition-colors"
        >
          See how it works
        </Link>
        <Link
          href="/leaderboard"
          className="inline-flex px-5 py-3 rounded-lg border border-[var(--color-bg-3)] hover:border-[var(--color-brand-500)] font-medium transition-colors"
        >
          View leaderboard
        </Link>
      </div>
    </article>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="font-mono text-[var(--color-text-1)] border-l-2 border-[var(--color-brand-500)] pl-6 py-2 my-6 leading-loose">
      {children}
    </blockquote>
  );
}
