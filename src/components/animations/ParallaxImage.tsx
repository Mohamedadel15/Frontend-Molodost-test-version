"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";
import { cn } from "@/lib/cn";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  /**
   * Vertical travel in px at desktop. The image is rendered this much taller
   * than its frame and slides across the full range as the frame crosses the
   * viewport.
   */
  travel?: number;
  /** Travel between the tablet and desktop breakpoints; defaults to `travel`. */
  travelTablet?: number;
  /** Disable the travel below this width (reference: the phone breakpoint). */
  disableBelow?: number;
  /** Grain opacity — 0.15 on the founder portrait, 0.1 on section backgrounds. */
  noiseOpacity?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/*
 * Clipped image with vertical parallax and a noise overlay — the treatment on
 * the About page's founder portrait (design-inventory §12; reference component
 * "Image Parallax Vertical + Noize").
 *
 * Progress is the reference's own formula: 0 while the frame's top sits at the
 * viewport bottom, 1 once the frame has fully passed above it, normalised over
 * `viewport height + frame height` — a full traversal, not the shorter window
 * used by `useElementProgress`. The overlay travels with the image so the grain
 * stays locked to it. Decorative, so it is not mirrored in RTL and is disabled
 * under reduced motion.
 */
export function ParallaxImage({
  src,
  alt = "",
  travel = 300,
  travelTablet,
  disableBelow = 810,
  noiseOpacity = 0.15,
  priority = false,
  sizes = "(min-width: 1200px) 30vw, 100vw",
  className,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(travel);
  const [range, setRange] = useState(travel);
  const [wide, setWide] = useState(false);
  const reduced = useReducedMotion();
  const enabled = wide && !reduced;

  useEffect(() => {
    if (reduced) return;
    const query = window.matchMedia(`(min-width: ${disableBelow}px)`);
    const desktop = window.matchMedia("(min-width: 1200px)");
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!query.matches) {
        setWide(false);
        return;
      }
      setWide(true);
      const distance = desktop.matches ? travel : (travelTablet ?? travel);
      setRange((prev) => (prev === distance ? prev : distance));
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const entered = viewport - rect.top;
      const span = viewport + rect.height;
      const progress =
        entered < 0 ? 0 : -rect.bottom > 0 ? 1 : Math.min(1, entered / span);
      const next = Math.round(distance - progress * distance);
      setOffset((prev) => (prev === next ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    query.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      query.removeEventListener("change", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [disableBelow, reduced, travel, travelTablet]);

  const layerStyle = enabled
    ? { height: `calc(100% + ${range}px)`, translate: `0 ${-offset}px` }
    : { height: "100%" };

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-background", className)}>
      <div className="absolute inset-x-0 top-0" style={layerStyle}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 bg-repeat mix-blend-overlay"
        style={{
          ...layerStyle,
          opacity: noiseOpacity,
          /* texture-b is the reference's overlay grain (100px tile);
             texture-a is the finer 128px tile used inside cards. */
          backgroundImage: "url('/images/texture-b.png')",
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
}
