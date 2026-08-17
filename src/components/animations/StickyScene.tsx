"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

interface StickySceneProps {
  /** Total scene height as a CSS length (e.g. "187svh"). */
  height: string;
  className?: string;
  /** Scene content receives scrub progress 0..1. */
  children: (progress: number) => ReactNode;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/** SSR-safe reduced-motion preference (false on the server). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/*
 * Pinned scroll scene (animations.md §2/§4/§5): a tall container with a
 * 100svh sticky viewport; scroll progress (0..1 over height − 100svh) is
 * fed to the children. Linear scrubs only — no animation library needed.
 * Reduced motion: the scene renders unpinned at its final state.
 */
export function StickyScene({ height, className, children }: StickySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(1);
        return;
      }
      // Quantized to 0.005 steps — skips redundant React re-renders per frame
      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
      const value = Math.round(raw * 200) / 200;
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

  if (reduced) {
    return <div className={className}>{children(1)}</div>;
  }

  return (
    <div ref={containerRef} className={className} style={{ height }}>
      <div className={cn("sticky top-0 h-svh overflow-hidden")}>
        {children(progress)}
      </div>
    </div>
  );
}

/** Map progress into a 0..1 sub-range with clamping. */
export function segment(progress: number, from: number, to: number): number {
  if (to <= from) return progress >= to ? 1 : 0;
  return Math.min(1, Math.max(0, (progress - from) / (to - from)));
}
