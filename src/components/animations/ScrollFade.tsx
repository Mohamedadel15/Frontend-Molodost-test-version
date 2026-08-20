"use client";

import { useEffect, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";

interface ScrollFadeProps {
  className?: string;
  children: ReactNode;
}

/*
 * Scroll-linked fade-out for viewport-fixed hero layers (production specialist
 * hero): opacity = 1 − scrollY / viewport height, exactly linear — measured
 * 0.712 / 0.424 / 0.135 at 200 / 400 / 600px of scroll on a 695px viewport.
 * The layer under it (the shared clinic backdrop) stays put, so the hero
 * darkens toward the backdrop as the copy scrolls away.
 *
 * Reduced motion: stays at 1 — the section scrolls away normally.
 */
export function ScrollFade({ className, children }: ScrollFadeProps) {
  const [opacity, setOpacity] = useState(1);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = Math.max(
        0,
        Math.min(1, 1 - window.scrollY / window.innerHeight),
      );
      setOpacity((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div className={className} style={{ opacity: reduced ? 1 : opacity }}>
      {children}
    </div>
  );
}
