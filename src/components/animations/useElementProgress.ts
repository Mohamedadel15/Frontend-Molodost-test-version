"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Scroll progress (0..1) of an element's traversal through the viewport:
 * 0 when its top crosses `startVh` of the viewport height, 1 at `endVh`.
 * Quantized to 0.01 steps to avoid redundant renders.
 */
export function useElementProgress(
  ref: RefObject<HTMLElement | null>,
  { startVh = 0.9, endVh = 0.25 }: { startVh?: number; endVh?: number } = {},
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
      const raw = (vh * startVh - rect.top) / (vh * (startVh - endVh));
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
  }, [ref, startVh, endVh]);

  return progress;
}
