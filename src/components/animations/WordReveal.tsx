"use client";

import { useRef, type ElementType } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";
import { useElementProgress } from "@/components/animations/useElementProgress";
import { cn } from "@/lib/cn";

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Opacity of not-yet-revealed words. */
  dimOpacity?: number;
  /** Viewport fraction where the scrub starts (1 = element top at the fold). */
  startVh?: number;
  /** Viewport fraction where the scrub completes. */
  endVh?: number;
}

/*
 * Scroll-scrubbed word fill (animations.md §5): words go from dim to full
 * opacity as the element traverses the viewport — used by the philosophy
 * statement and the big quote on the reference. Reduced motion: full
 * opacity. Reading order handles RTL automatically.
 */
export function WordReveal({
  text,
  as: Tag = "span",
  className,
  dimOpacity = 0.2,
  startVh = 0.85,
  endVh = 0.3,
}: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const progress = useElementProgress(ref, { startVh, endVh });
  const reduced = useReducedMotion();

  const words = text.split(" ");
  const visibleCount = reduced
    ? words.length
    : Math.floor(progress * words.length);

  return (
    <Tag ref={ref} className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="transition-opacity duration-(--motion-fast)"
          style={{ opacity: i < visibleCount ? 1 : dimOpacity }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
