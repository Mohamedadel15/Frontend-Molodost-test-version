"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";

interface RollingNumberProps {
  value: number;
  /** Rendered before the digits, e.g. "AED ". */
  prefix?: string;
  suffix?: string;
  /** Tween duration in ms. */
  duration?: number;
  className?: string;
}

/*
 * Odometer for a value that changes in place (the reference pricing amount
 * rolls to the new number when the ONE / UP TO +3 switch is flipped). Unlike
 * CountUp it does not fire on viewport entry — the price is already legible
 * by then, so mount renders `value` and only a CHANGE tweens, from whatever
 * is currently on screen so a flip mid-flight picks up where the last one
 * left off. Same ease-out as CountUp but ~3x quicker; the reference roll is
 * a beat, not a count-up. Digits stay Western (latn) in both locales and
 * LTR-ordered in RTL context.
 */
export function RollingNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 500,
  className,
}: RollingNumberProps) {
  const [display, setDisplay] = useState(value);
  // Mirrors `display` for the effect: reading it from state would make the
  // tween restart on every frame it schedules.
  const displayRef = useRef(value);
  const mountedRef = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Mount already renders `value`; nothing to animate from.
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (reduced || displayRef.current === value) {
      displayRef.current = value;
      setDisplay(value);
      return;
    }
    const from = displayRef.current;
    const delta = value - from;
    const t0 = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + eased * delta);
      displayRef.current = next;
      setDisplay(next);
      frame = t < 1 ? requestAnimationFrame(tick) : 0;
    };
    frame = requestAnimationFrame(tick);
    // Cancelling here is what stops a superseded tween from writing over a
    // newer value: the next run starts from displayRef, mid-roll.
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration, reduced]);

  return (
    <span
      dir="ltr"
      className={className}
      aria-label={`${prefix}${value}${suffix}`}
    >
      <span aria-hidden>
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
