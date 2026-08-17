"use client";

import {
  useEffect,
  useRef,
  useState,
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

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
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
      const value = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(value);
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
