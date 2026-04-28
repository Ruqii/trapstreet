import Link from "next/link";
import { Manta } from "./manta";

const navItems = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/wall", label: "Wall" },
  { href: "/manifesto", label: "Manifesto" },
];

export function Header() {
  return (
    <header className="border-b border-[var(--color-bg-3)] bg-[var(--color-bg-0)]/90 backdrop-blur sticky top-0 z-40">
      <div className="container-x flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Trap Street home"
        >
          <Manta size={32} />
          <div className="leading-tight">
            <div className="font-bold tracking-tight">
              <span className="text-[var(--color-text-1)]">trapstreet</span>
              <span className="text-[var(--color-brand-500)]">.run</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-3)] -mt-0.5">
              H4 for AI workflows
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-md text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-bg-1)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/AntiNoise-ai/trapstreet"
            target="_blank"
            rel="noreferrer"
            className="ml-2 px-3 py-1.5 rounded-md border border-[var(--color-bg-3)] hover:border-[var(--color-brand-500)] text-[var(--color-text-2)] hover:text-[var(--color-text-1)] transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
