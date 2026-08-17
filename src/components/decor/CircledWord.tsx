"use client";

import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";
import { useElementProgress } from "@/components/animations/useElementProgress";
import { cn } from "@/lib/cn";

/*
 * Hand-drawn open ellipse around a phrase (reference specialists heading).
 * The stroke draws SCRUBBED to scroll progress (user-reviewed behavior),
 * not one-shot on view. Reduced motion renders it fully drawn.
 */
export function CircledWord({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const progress = useElementProgress(ref, { startVh: 0.95, endVh: 0.45 });
  const reduced = useReducedMotion();
  const drawn = reduced ? 1 : progress;

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 300 110"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-[8%] -inset-y-[18%] h-[136%] w-[116%]"
        fill="none"
      >
        <path
          d="M 46 96 C -24 76, 4 18, 118 10 C 226 3, 306 24, 296 56 C 287 86, 194 104, 112 100"
          stroke="#7FA69B"
          strokeWidth="3"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - drawn}
        />
      </svg>
    </span>
  );
}
