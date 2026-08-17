"use client";

import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";
import { useElementProgress } from "@/components/animations/useElementProgress";
import { cn } from "@/lib/cn";

interface ParallaxYProps {
  /** Total vertical travel in px across the viewport traversal (± half each way). */
  travel: number;
  className?: string;
  children: ReactNode;
}

/*
 * Decorative vertical parallax (animations.md §10): NOT mirrored in RTL,
 * disabled under reduced motion.
 */
export function ParallaxY({ travel, className, children }: ParallaxYProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useElementProgress(ref, { startVh: 1, endVh: 0 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={
        reduced
          ? undefined
          : { translate: `0 ${(0.5 - progress) * travel}px` }
      }
    >
      {children}
    </div>
  );
}
