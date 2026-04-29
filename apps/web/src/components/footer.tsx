import Link from "next/link";
import { Manta } from "./manta";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-bg-3)] mt-24">
      <div className="container-x py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <Manta size={28} />
            <span className="font-bold">
              trapstreet
              <span className="text-[var(--color-brand-500)]">.run</span>
            </span>
          </Link>
          <p className="text-[var(--color-text-3)] leading-relaxed">
            H4 for AI workflows. Find the fakes.
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-2">
            Product
          </div>
          <Link
            href="/how-it-works"
            className="block text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
          >
            How it works
          </Link>
          <Link
            href="/leaderboard"
            className="block text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
          >
            Leaderboard
          </Link>
          <Link
            href="/wall"
            className="block text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
          >
            Trap Street Wall
          </Link>
        </div>
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-2">
            Community
          </div>
          <a
            href="https://github.com/AntiNoise-ai/trapstreet"
            className="block text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
          >
            GitHub
          </a>
          <a
            href="#"
            className="block text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
          >
            Discord
          </a>
          <a
            href="#"
            className="block text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
          >
            Blog
          </a>
        </div>
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-3)] mb-2">
            About
          </div>
          <Link
            href="/manifesto"
            className="block text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
          >
            Manifesto
          </Link>
          <Link
            href="/submit"
            className="block text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
          >
            Submit a task
          </Link>
          <Link
            href="/explore"
            className="block text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
          >
            Explore tasks
          </Link>
        </div>
      </div>
      <div className="container-x pb-10 pt-6 border-t border-[var(--color-bg-3)] flex justify-between items-center text-xs text-[var(--color-text-3)]">
        <div>© 2026 AntiNoise · Apache-2.0 · Prototype build</div>
        <div className="font-mono">trapstreet.run</div>
      </div>
    </footer>
  );
}
