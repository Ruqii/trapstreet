import Link from "next/link";
import { Manta } from "./manta";

const navItems = [
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/explore", label: "Explore Tasks" },
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
          <div className="font-bold tracking-tight text-xl md:text-2xl leading-none">
            <span className="text-[var(--color-text-1)]">trapstreet</span>
            <span className="text-[var(--color-brand-500)]">.run</span>
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
          <Link
            href="/submit"
            className="ml-2 px-4 py-2 rounded-md bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-500)] text-white font-medium transition-colors"
          >
            Submit Task
          </Link>
        </nav>
      </div>
    </header>
  );
}
