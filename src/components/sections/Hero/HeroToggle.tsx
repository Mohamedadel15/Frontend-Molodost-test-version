"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";
import { HeroLines } from "@/components/decor/RefLines";

import { HeroVideo } from "./HeroVideo";

interface HeroToggleProps {
  hero: ReactNode;
  toggle: ReactNode;
}

/*
 * Shared pinned backdrop for Hero + Toggle (the reference's "Image
 * Container"): ONE sticky video layer spans both sections, so there is no
 * seam when scrolling from the hero into the toggle scene. The white
 * "Animated Lines" live on the same pinned layer and DRAW progressively
 * with scroll across the combined range (reference behavior).
 */
export function HeroToggle({ hero, toggle }: HeroToggleProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [draw, setDraw] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      // Fully drawn by ~65% of the combined hero+toggle scroll
      const raw = Math.min(1, Math.max(0, -rect.top / (scrollable * 0.65)));
      const value = Math.round(raw * 100) / 100;
      setDraw((prev) => (prev === value ? prev : value));
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

  return (
    <div ref={wrapRef} className="relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="hero-image-in absolute inset-0">
            <HeroVideo />
          </div>
          {/* "Animated Lines" (measured: x 24%, w 51%) drawing with scroll */}
          <HeroLines
            progress={reduced ? 1 : Math.max(0.12, draw)}
            className="start-[24%] top-0 h-[139%] w-[51%]"
          />
        </div>
      </div>
      {hero}
      {toggle}
    </div>
  );
}
