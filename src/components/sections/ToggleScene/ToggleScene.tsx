"use client";

import Image from "next/image";

import { segment, StickyScene } from "@/components/animations/StickyScene";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/types/dictionary";

interface ToggleSceneProps {
  dictionary: Dictionary;
}

/*
 * The signature pinned scroll scene (animations.md §2), measured at ~187svh
 * with a 100svh sticky viewport:
 *   0–30%: hero imagery washes out; navy scene + OFF headline fade in
 *   30–55%: VITALITY label + switch assemble (OFF)
 *   55–100%: background turns white, switch flips ON, headline swaps
 *
 * The navy backdrop uses the reference's actual "Navy blue Background"
 * asset; the circle line-art is an approximated SVG (polish pass).
 */
export function ToggleScene({ dictionary }: ToggleSceneProps) {
  const copy = dictionary.home.toggle;

  return (
    <StickyScene height="187svh">
      {(p) => {
        const heroFade = segment(p, 0, 0.28);
        const navyIn = segment(p, 0.05, 0.3);
        const contentIn = segment(p, 0.12, 0.35);
        const switchIn = segment(p, 0.3, 0.45);
        const whiteIn = segment(p, 0.55, 0.78);
        // Sequential swap (reference): OFF text is gone before ON arrives
        const offOut = 1 - segment(whiteIn, 0, 0.45);
        const onIn = segment(whiteIn, 0.55, 1);
        const on = whiteIn > 0.35;
        const dark = whiteIn < 0.5;

        return (
          <div
            data-header-invert={dark ? "" : undefined}
            className="relative h-full w-full overflow-hidden bg-background"
          >
            {/* Navy scene (under the hero image; revealed as it fades) */}
            <div
              className="absolute inset-0"
              style={{ opacity: navyIn * (1 - whiteIn) }}
            >
              <Image
                src="/images/navy-bg.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              {/* circle line-art */}
              <svg
                aria-hidden
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 h-full w-full opacity-25"
              >
                <circle cx="760" cy="330" r="380" fill="none" stroke="#fff" strokeWidth="0.7" />
                <circle cx="1120" cy="520" r="300" fill="none" stroke="#fff" strokeWidth="0.5" />
                <circle cx="380" cy="620" r="330" fill="none" stroke="#fff" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Continuation of the hero backdrop, fading into the navy scene */}
            <div className="absolute inset-0" style={{ opacity: 1 - heroFade }}>
              <Image
                src="/images/hero-poster.png"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* White stage */}
            <div
              className="absolute inset-0 bg-background"
              style={{ opacity: whiteIn }}
            />

            {/* Content */}
            <div
              className="relative flex h-full flex-col items-center justify-center gap-8 px-(--container-gutter) text-center"
              style={{
                opacity: contentIn,
                translate: `0 ${(1 - contentIn) * 32}px`,
              }}
            >
              <div
                className="flex items-center gap-4"
                style={{ opacity: switchIn }}
              >
                <span
                  className={cn(
                    "text-label transition-colors duration-(--motion-fast)",
                    dark ? "text-inverse-muted" : "text-secondary",
                  )}
                >
                  {copy.label}
                </span>
                <span
                  role="presentation"
                  className={cn(
                    "relative h-[30px] w-[52px] rounded-pill transition-colors duration-(--motion-normal) ease-(--ease-inout)",
                    on ? "bg-accent" : "bg-inverse-muted",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-[3px] size-6 rounded-pill bg-background shadow-sm",
                      "transition-[inset-inline-start] duration-(--motion-normal) ease-(--ease-inout)",
                      on ? "start-[25px]" : "start-[3px]",
                    )}
                  />
                </span>
              </div>

              {/* OFF / ON headline crossfade */}
              <div className="relative max-w-[1000px]">
                <h2
                  className="text-sans-xl text-inverse"
                  style={{ opacity: offOut }}
                >
                  {copy.offTitle}
                </h2>
                <h2
                  className="absolute inset-0 text-sans-xl text-primary"
                  style={{ opacity: onIn }}
                  aria-hidden={!on}
                >
                  {copy.onTitle}
                </h2>
              </div>
              <div className="relative max-w-[540px]">
                <p
                  className="text-body text-inverse-muted"
                  style={{ opacity: offOut }}
                >
                  {copy.offBody}
                </p>
                <p
                  className="absolute inset-0 text-body text-secondary"
                  style={{ opacity: onIn }}
                  aria-hidden={!on}
                >
                  {copy.onBody}
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </StickyScene>
  );
}
