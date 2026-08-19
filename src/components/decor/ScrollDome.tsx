"use client";

import { useRef } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";
import { useElementProgress } from "@/components/animations/useElementProgress";
import { ContactWave } from "@/components/decor/RefLines";
import { cn } from "@/lib/cn";

/*
 * The FAFAFA dome on the seam above a dark panel, flattening as you scroll.
 *
 * Measured on the reference: the artwork is a 1516 × 443 box centred on the
 * seam and it carries a scroll-linked rotateX — 0° while the seam is still
 * below 1.06 × viewport height, rising linearly to 90° by 0.06 × viewport
 * height, then held. There is no perspective, so the rotation reads as a
 * vertical squash about the seam: the arc dips 219px into the panel at the
 * page edges when the seam appears, and has collapsed to a straight edge by
 * the time the panel fills the viewport.
 *
 * Callers position the box; it must straddle the seam, so the caller's offset
 * is half the height.
 */
export function ScrollDome({ className }: { className?: string }) {
  const seam = useRef<HTMLDivElement>(null);
  const progress = useElementProgress(seam, { startVh: 1.06, endVh: 0.06 });
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      {/* zero-height marker on the seam itself — the rotation is keyed to it,
          not to the top of the box that straddles it */}
      <div ref={seam} className="absolute inset-x-0 top-1/2 h-0" />
      <div
        className="absolute inset-0"
        style={{ transform: `rotateX(${(reduced ? 0 : progress) * 90}deg)` }}
      >
        <ContactWave className="inset-0 h-full w-full" />
      </div>
    </div>
  );
}
