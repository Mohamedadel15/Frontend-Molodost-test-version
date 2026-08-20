"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Viewport-fixed backdrop of the specialist / story opening scene, with the
 * reference's end-of-scene dissolve: as the band (and its line draw) ends,
 * the navy and photo fade to white BEFORE the next section arrives, so that
 * section enters onto white rather than sliding over a still-visible
 * backdrop. The fade is keyed to the band copy's OWN exit (the element
 * flagged `data-scene-copy` inside the scene): the backdrop holds at full
 * strength the whole time the statement is lighting up and being read, starts
 * thinning only once the statement's bottom edge has risen to the middle of
 * the viewport, and is gone by the time that edge leaves the top — the
 * scene's 320px tail and the next block's 160px top pad then pass on plain
 * white before any copy arrives. The following content is NOT an opaque block
 * (no background of its own), so nothing slides over the backdrop with an
 * edge — the navy simply goes to white and the next section flows in on
 * white, as on production. The stack is then hidden outright so no colour
 * lingers behind the content or footer.
 *
 * The same value is published as `--scene-opacity` on the scene section so
 * the band copy and the arc strokes dissolve WITH the backdrop (white text
 * must never be left over a white page).
 *
 * The measurer (an absolute box filling the scene section, so the component
 * needs a positioned parent) also carries the header's `data-header-invert`
 * flag, and only while the backdrop is still dark (opacity above ½): the
 * header flips back to its dark variant together with the dissolve instead
 * of staying white over a white page. Scroll-linked, so reduced motion gets
 * the same fade.
 */
export function SceneBackdrop({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const copy = el.parentElement?.querySelector<HTMLElement>("[data-scene-copy]");
      const bottom = (copy ?? el).getBoundingClientRect().bottom;
      const vh = window.innerHeight;
      const next = Math.max(0, Math.min(1, bottom / (0.5 * vh)));
      el.parentElement?.style.setProperty("--scene-opacity", next.toFixed(3));
      setOpacity((prev) => (Math.abs(prev - next) < 0.002 ? prev : next));
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
  }, []);

  return (
    <>
      <div
        ref={ref}
        aria-hidden
        data-header-invert={opacity > 0.5 ? "" : undefined}
        className="pointer-events-none absolute inset-0"
      />
      <div
        className="fixed inset-0"
        aria-hidden
        style={{ opacity, visibility: opacity === 0 ? "hidden" : "visible" }}
      >
        {children}
      </div>
    </>
  );
}
