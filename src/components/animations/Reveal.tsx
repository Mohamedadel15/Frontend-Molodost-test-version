"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

interface RevealProps {
  as?: ElementType;
  /** Transition delay in ms (use for staggering siblings). */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/*
 * Viewport-enter reveal (animations.md §3): fade + rise 40px, once,
 * threshold ~20%. The hidden state only applies when JS is running
 * (html.js — set inline in the layout) so content is never lost without
 * scripting. Reduced motion is handled globally (transition-duration cap).
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
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
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay
    ? { transitionDelay: visible ? `${delay}ms` : "0ms" }
    : undefined;

  return (
    <Tag
      ref={ref}
      style={style}
      className={cn("reveal", visible && "reveal-visible", className)}
    >
      {children}
    </Tag>
  );
}
