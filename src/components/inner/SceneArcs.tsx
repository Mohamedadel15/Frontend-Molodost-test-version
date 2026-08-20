"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import { AppearIn } from "@/components/animations/AppearIn";
import { useReducedMotion } from "@/components/animations/StickyScene";
import { SpecialistArc } from "@/components/decor/RefLines";

/*
 * Enter → leave scroll progress of a box: 0 as its top reaches the bottom of
 * the viewport, 1 once its bottom has left the top. Quantized to 0.001.
 */
function useDrawProgress(ref: RefObject<HTMLElement | null>, enabled: boolean): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const raw = (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
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
  }, [ref, enabled]);
  return progress;
}

/*
 * The "Animated Lines" layer of the specialist / story opening scene, as on
 * production: one absolute layer over the whole hero + band, desktop only,
 * holding the two 1500×1500 arc strokes at 50% — A at the top, B 880px down,
 * both centred — each behind a gradient mask that fades its tail out (A:
 * horizontal, clear to 84% then gone; B: vertical, in from 16%, out by 76%).
 * Both fade in over 2s at 0.4s on load, then DRAW on scroll (the reference's
 * path-draw effect, enter → leave) and scroll away with the copy over the
 * fixed backdrop. Reduced motion: fully drawn.
 */
export function SceneArcs() {
  const refA = useRef<HTMLDivElement>(null);
  const refB = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const progressA = useDrawProgress(refA, !reduced);
  const progressB = useDrawProgress(refB, !reduced);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-hidden desktop:block"
      style={{ opacity: "var(--scene-opacity, 1)" }}
    >
      <div
        ref={refA}
        className="absolute left-[calc(50%-750px)] top-0 size-[1500px] opacity-50"
        style={{
          maskImage: "linear-gradient(90deg, #000 84%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, #000 84%, transparent 100%)",
        }}
      >
        <AppearIn slow from="fade" delay={400} className="size-full">
          <SpecialistArc variant="hero" className="inset-0" progress={reduced ? 1 : progressA} />
        </AppearIn>
      </div>
      <div
        ref={refB}
        className="absolute left-[calc(50%-750px)] top-[880px] size-[1500px] opacity-50"
        style={{
          maskImage: "linear-gradient(transparent 0%, #000 16%, #000 63%, transparent 75.6%)",
          WebkitMaskImage: "linear-gradient(transparent 0%, #000 16%, #000 63%, transparent 75.6%)",
        }}
      >
        <AppearIn slow from="fade" delay={400} className="size-full">
          <SpecialistArc variant="band" className="inset-0" progress={reduced ? 1 : progressB} />
        </AppearIn>
      </div>
    </div>
  );
}
