import { Manta } from "./manta";

export type Tier = "bronze" | "silver" | "gold";

const META: Record<
  Tier,
  { label: string; color: string; ring: string; description: string }
> = {
  bronze: {
    label: "BRONZE",
    color: "var(--color-bronze)",
    ring: "ring-[var(--color-bronze)]/40",
    description: "Self-reported by the builder",
  },
  silver: {
    label: "SILVER",
    color: "var(--color-silver)",
    ring: "ring-[var(--color-silver)]/40",
    description: "Audited — 10–20% re-run on our infra",
  },
  gold: {
    label: "GOLD",
    color: "var(--color-gold)",
    ring: "ring-[var(--color-gold)]/40",
    description: "Full eval on our infra + Live Mode",
  },
};

export function TierBadge({
  tier,
  size = "md",
  withLabel = false,
}: {
  tier: Tier;
  size?: "sm" | "md" | "lg";
  withLabel?: boolean;
}) {
  const m = META[tier];
  const px = size === "sm" ? 24 : size === "md" ? 36 : 64;
  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <span
        className={`inline-flex items-center justify-center rounded-full ring-2 ${m.ring} bg-[var(--color-bg-1)]`}
        style={{ width: px, height: px }}
        title={`${m.label} — ${m.description}`}
      >
        <Manta size={Math.round(px * 0.7)} />
      </span>
      {withLabel && (
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: m.color }}
        >
          {m.label}
        </span>
      )}
    </span>
  );
}

export function TierBadgeFull({ tier }: { tier: Tier }) {
  const m = META[tier];
  return (
    <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[var(--color-bg-1)] p-6 text-center">
      <TierBadge tier={tier} size="lg" />
      <div
        className="mt-3 text-sm font-bold tracking-wider"
        style={{ color: m.color }}
      >
        {m.label}
      </div>
      <div className="mt-2 text-sm text-[var(--color-text-3)]">
        {m.description}
      </div>
    </div>
  );
}
