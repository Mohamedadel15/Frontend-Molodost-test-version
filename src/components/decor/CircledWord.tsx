"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/*
 * Hand-drawn open ellipse around a phrase (reference specialists heading):
 * the sage circle draws itself when scrolled into view.
 */
export function CircledWord({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
          style={{
            strokeDashoffset: drawn ? 0 : 1,
            transition:
              "stroke-dashoffset 900ms var(--ease-inout) 200ms",
          }}
        />
      </svg>
    </span>
  );
}
