"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";

interface CountUpProps {
  value: number;
  suffix?: string;
  /** Tween duration in ms. */
  duration?: number;
  className?: string;
}

/*
 * Numeric count-up (the reference stats tween through intermediate values —
 * e.g. 428+ was captured mid-flight toward 450+ — rather than rolling digit
 * strips). Starts once on viewport enter, ease-out. Digits stay Western
 * (latn) in both locales; digit order stays LTR in RTL context.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1600,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || startedRef.current) continue;
          startedRef.current = true;
          observer.disconnect();
          if (reduced) {
            setDisplay(value);
            return;
          }
          const t0 = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, reduced]);

  return (
    <span ref={ref} dir="ltr" className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden>
        {display}
        {suffix}
      </span>
    </span>
  );
}
