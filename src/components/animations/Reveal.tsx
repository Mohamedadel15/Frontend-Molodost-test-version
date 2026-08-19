"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface RevealProps {
  as?: ElementType;
  /**
   * Transition delay in ms. The reference staggers nothing on scroll (every
   * revealed node has delay 0) — only pass this where a section deliberately
   * departs from that.
   */
  delay?: number;
  /**
   * Reveal once and stay visible. The reference re-animates on every viewport
   * entry, so this defaults to false; opt in where replaying would be noisy.
   */
  once?: boolean;
  className?: string;
  children: ReactNode;
}

/*
 * Viewport reveal (animations.md §3), measured from the reference rather than
 * estimated: a plain 800ms opacity fade on cubic-bezier(.44,0,.56,1) with no
 * translate, threshold 0, delay 0, replayed each time the element re-enters
 * (Framer's `__framer__animateOnce: false`, `__framer__threshold: 0`).
 *
 * The hidden state only applies when JS is running (html.js — set inline in
 * the layout) so content is never lost without scripting. Reduced motion is
 * handled globally (transition-duration cap).
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  once = false,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            // Reference resets to hidden instantly on exit (exit transition
            // duration 0) so the fade replays in full on the next entry.
            setVisible(false);
          }
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: visible ? `${delay}ms` : "0ms" } : undefined}
      className={cn("reveal", visible && "reveal-visible", className)}
    >
      {children}
    </Tag>
  );
}
