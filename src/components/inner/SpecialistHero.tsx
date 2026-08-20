import Image from "next/image";
import type { CSSProperties } from "react";

import { AppearIn } from "@/components/animations/AppearIn";
import { ScrollFade } from "@/components/animations/ScrollFade";
import { Reveal } from "@/components/animations/Reveal";
import { WordReveal } from "@/components/animations/WordReveal";
import { MeditationIcon } from "@/components/decor/BrandIcons";
import { SceneArcs } from "@/components/inner/SceneArcs";
import { SceneBackdrop } from "@/components/inner/SceneBackdrop";
import { Container } from "@/components/layout/Container/Container";
import { Eyebrow } from "@/components/ui/Typography/Typography";

interface SpecialistHeroProps {
  name: string;
  /** Uppercase roles line; `years` renders as its own line right under it. */
  roles: string;
  years: string;
  bio: string;
  image: { src: string };
  /** Per-specialist `object-position` crop, measured from production. */
  imagePosition: string;
  /** "The Clinical Focus" label under the band icon. */
  focusLabel: string;
  /** Band statement scrubbed word by word — continues the label as one sentence. */
  focusStatement: string;
}

/*
 * /specialists/[slug] opening scene — hero AND the Clinical Focus band share
 * ONE viewport-locked backdrop, exactly like production: the navy gradient
 * (the same "Navy blue Background" asset the home toggle uses) sits at the
 * bottom of a fixed stack, the specialist's photo above it fades out linearly
 * over the first viewport of scroll (ScrollFade), and the band itself has NO
 * background of its own — the navy showing through the dissolving photo IS
 * its color, so the photo still ghosts through while the band enters.
 *
 * The stack is deliberately NOT clipped to this section: on production the
 * navy keeps filling the viewport as the band's copy scrolls out, and the
 * next (opaque, positioned) sections slide up OVER it — the page wraps
 * everything after this scene in a positioned `bg-background` block, and the
 * footer is `relative` with its own surface, so the fixed layers are always
 * covered once the scene is passed.
 *
 * Entrance = the production page's own appear payload (its
 * __framer__appearAnimationsContent block): navy backdrop fades first (2s at
 * 0), the photo over it at 1s (2s), the arcs to 50% at 0.4s (2s), the
 * roles/years labels DROP from above at 0.4s, the bio rises at 0.6s — and the
 * name enters word by word (10px rise, ~80ms apart) at ~2s once the photo has
 * resolved. All CSS keyframes on server markup: LCP region, no JS gate.
 *
 * Band scrub matches the measurement there: first word lights as the
 * statement reaches the fold, the last a quarter down the viewport.
 *
 */
export function SpecialistHero({
  name,
  roles,
  years,
  bio,
  image,
  imagePosition,
  focusLabel,
  focusStatement,
}: SpecialistHeroProps) {
  const words = name.split(" ");

  return (
    /* header inversion lives on the SceneBackdrop measurer, so it lifts with the dissolve */
    <section className="relative">
      <SceneBackdrop>
        {/* navy gradient base — what the scene dissolves into */}
        <AppearIn from="fade" slow className="absolute inset-0">
          <Image
            src="/images/navy-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </AppearIn>
        {/* the specialist photo fades out linearly over the first viewport of
            scroll (measured on production), exposing the navy beneath */}
        <ScrollFade className="absolute inset-0">
          <AppearIn from="fade" slow delay={1000} className="absolute inset-0">
            <Image
              src={image.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </AppearIn>
        </ScrollFade>
        {/* reference grain tile over the photograph */}
        <div
          className="pointer-events-none absolute inset-0 bg-repeat opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/texture-b.png')",
            backgroundSize: "100px 100px",
          }}
        />
        {/* measured legibility scrim: 30% #2F3332 at both edges, clear middle */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(47,51,50,0.3)_0%,rgba(47,51,50,0)_26.5%,rgba(47,51,50,0)_73.8%,rgba(47,51,50,0.3)_100%)]" />
      </SceneBackdrop>

      {/* both arc strokes: one layer over hero + band, drawn on scroll */}
      <SceneArcs />

      {/* hero viewport */}
      <div className="relative flex h-svh min-h-[640px] flex-col overflow-hidden">
        <Container className="relative flex flex-1 flex-col pt-[calc(var(--header-height)+64px)] pb-10 desktop:pt-[calc(var(--header-height)+112px)] desktop:pb-14">
          <AppearIn from="down" delay={400} className="max-w-[450px]">
            <p className="text-label text-inverse">{roles}</p>
            <p className="text-label text-inverse">{years}</p>
          </AppearIn>
          <div className="mt-auto flex flex-col gap-8 pt-16 desktop:flex-row desktop:items-end desktop:justify-between desktop:gap-16">
            <h1 className="text-display text-inverse desktop:max-w-[880px]">
              {words.map((word, index) => (
                <span key={index}>
                  <span
                    className="appear appear-up-sm"
                    style={
                      {
                        "--appear-delay": `${2000 + index * 80}ms`,
                      } as CSSProperties
                    }
                  >
                    {word}
                  </span>
                  {/* separator OUTSIDE the inline-block span — a trailing
                      space inside it is trimmed by line-box processing */}
                  {index < words.length - 1 ? " " : null}
                </span>
              ))}
            </h1>
            <AppearIn delay={600} className="desktop:max-w-[454px]">
              <p className="text-body text-inverse desktop:[text-indent:calc(20%+16px)]">
                {bio}
              </p>
            </AppearIn>
          </div>
        </Container>
      </div>

      {/* Clinical Focus band — transparent over the shared backdrop */}
      <div className="relative overflow-hidden">
        {/* band copy dissolves with the backdrop (SceneBackdrop publishes --scene-opacity) */}
        <div style={{ opacity: "var(--scene-opacity, 1)" }}>
        <Container className="relative flex flex-col items-center gap-16 py-40 text-center desktop:py-[320px]">
          <Reveal className="flex flex-col items-center gap-6">
            <MeditationIcon className="fill-inverse" />
            <Eyebrow tone="inverse">{focusLabel}</Eyebrow>
          </Reveal>
          {/* the statement itself keys the backdrop dissolve (SceneBackdrop) */}
          <div data-scene-copy>
          <WordReveal
            as="h2"
            text={focusStatement}
            startVh={1}
            endVh={0.25}
            className="text-statement max-w-[1100px] text-center text-inverse"
          />
          </div>
        </Container>
        </div>
      </div>
    </section>
  );
}
