"use client";

import { useEffect, useState } from "react";

export function CountUp({
  to,
  duration = 1400,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    const start = performance.now();

    setValue(0);

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      cancelAnimationFrame(raf);
      const replayStart = performance.now();
      setValue(0);
      const replay = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - replayStart) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(to * eased));
        if (t < 1) raf = requestAnimationFrame(replay);
      };
      raf = requestAnimationFrame(replay);
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [to, duration]);

  return (
    <span className={className} aria-label={to.toLocaleString()}>
      {value.toLocaleString()}
    </span>
  );
}
