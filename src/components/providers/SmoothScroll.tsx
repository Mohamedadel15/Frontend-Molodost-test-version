"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";

/*
 * Lenis smooth scrolling — the production site loads lenis@1.3.x for its
 * inertial scroll feel. Disabled under prefers-reduced-motion. Native
 * scroll events still fire, so all scroll-driven scenes keep working.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true });
    // Exposed for programmatic scrolls (QA tooling, anchor helpers)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
