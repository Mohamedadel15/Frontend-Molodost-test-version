"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

const DIGIT_STRIP = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

interface OdometerProps {
  value: number;
  suffix?: string;
  className?: string;
}

/*
 * Rolling digit counter (animations.md §6): each digit is a vertical 0–9
 * strip that translates to its target on viewport enter, once. Digits are
 * always Western (latn) in both locales (design-inventory §15) and the
 * digit order stays LTR in RTL context.
 */
export function Odometer({ value, suffix = "", className }: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const digits = String(value).split("");

  return (
    <span
      ref={ref}
      dir="ltr"
      className={cn("inline-flex overflow-hidden", className)}
      aria-label={`${value}${suffix}`}
    >
      {digits.map((digit, i) => (
        <span key={i} aria-hidden className="relative h-[1em] overflow-hidden">
          <span
            className="flex flex-col leading-none transition-[translate] ease-(--ease-out-soft)"
            style={{
              translate: active ? `0 -${Number(digit) * 1}em` : "0 0",
              transitionDuration: "var(--motion-slow)",
              transitionDelay: `${i * 90}ms`,
            }}
          >
            {DIGIT_STRIP.map((d) => (
              <span key={d} className="h-[1em]">
                {d}
              </span>
            ))}
          </span>
        </span>
      ))}
      <span aria-hidden>{suffix}</span>
    </span>
  );
}
