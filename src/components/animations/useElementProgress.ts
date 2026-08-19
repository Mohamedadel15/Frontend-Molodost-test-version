"use client";

import { useEffect, useState, type RefObject } from "react";

interface ElementProgressOptions {
  startVh?: number;
  endVh?: number;
  /**
   * Opt into a fixed-pixel scrub measured from the element's *bottom* edge
   * instead of the viewport-relative window: 0 while the bottom sits `rangePx`
   * below the viewport top, 1 as it crosses it. The reference drives its long
   * decorative line draws this way — a constant scroll distance that does not
   * shrink with the viewport, so the stroke creeps rather than snapping.
   */
  rangePx?: number;
}

/**
 * Scroll progress (0..1) of an element's traversal through the viewport:
 * 0 when its top crosses `startVh` of the viewport height, 1 at `endVh`.
 * Quantized to 0.01 steps to avoid redundant renders.
 */
export function useElementProgress(
  ref: RefObject<HTMLElement | null>,
  { startVh = 0.9, endVh = 0.25, rangePx }: ElementProgressOptions = {},
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = rangePx
        ? 1 - rect.bottom / rangePx
        : (vh * startVh - rect.top) / (vh * (startVh - endVh));
      const value = Math.min(1, Math.max(0, Math.round(raw * 100) / 100));
      setProgress((prev) => (prev === value ? prev : value));
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
  }, [ref, startVh, endVh, rangePx]);

  return progress;
}
