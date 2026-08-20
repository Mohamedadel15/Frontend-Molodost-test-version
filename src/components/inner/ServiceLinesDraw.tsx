"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";
import { ServiceLines } from "@/components/decor/RefLines";

/*
 * Scroll-drawn instance of the /services line art (production's path-draw
 * scroll effect, enter → leave): 0 as the artwork's top reaches the bottom of
 * the viewport, 1 once its bottom has left the top — progress =
 * (viewport height − top) / (height + viewport height). Because the 6000px
 * artwork runs well past the four-panel stack, the stroke head lags the
 * bottom edge and sits mid-viewport while the panels scroll through, which is
 * where production shows it. Quantized to 0.001 to skip redundant renders.
 * Reduced motion: fully drawn.
 */
export function ServiceLinesDraw({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const raw = (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
      // 0.001 steps: on a 6000px run, coarser quantization reads as visible jumps
      const value = Math.min(1, Math.max(0, Math.round(raw * 1000) / 1000));
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
  }, [reduced]);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute ${className ?? ""}`}>
      <ServiceLines className="inset-0 h-full w-full" progress={reduced ? 1 : progress} />
    </div>
  );
}
