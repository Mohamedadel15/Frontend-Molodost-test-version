import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type AppearFrom = "up" | "down" | "fade";

const fromClasses: Record<AppearFrom, string> = {
  up: "appear-up",
  down: "appear-down",
  fade: "",
};

interface AppearInProps {
  as?: ElementType;
  /** `up` rises 20px, `down` drops 20px, `fade` is opacity only. */
  from?: AppearFrom;
  /** Delay in ms, from the measured entrance timeline. */
  delay?: number;
  /** 2s / ease-out — the reference uses this only for the decorative waves. */
  slow?: boolean;
  className?: string;
  children?: ReactNode;
}

/*
 * Page-load entrance (animations.md §1). CSS keyframes on server-rendered
 * markup — this wraps LCP content, so it must never become a client component
 * or gate visibility on JS.
 *
 * Measured defaults: 1000ms on cubic-bezier(.2,0,.2,1) from opacity 0.001 with
 * a 20px approach; the decorative waves use 2000ms on cubic-bezier(.4,0,.2,1)
 * and no translate. Per-element delays live at the call site so the page reads
 * as the timeline it is.
 */
export function AppearIn({
  as: Tag = "div",
  from = "up",
  delay = 0,
  slow = false,
  className,
  children,
}: AppearInProps) {
  const style = delay
    ? ({ "--appear-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <Tag
      style={style}
      className={cn("appear", fromClasses[from], slow && "appear-slow", className)}
    >
      {children}
    </Tag>
  );
}
