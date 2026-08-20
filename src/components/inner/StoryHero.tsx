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

interface StoryHeroProps {
  /** Uppercase tag line over the headline ("Diagnostics, Regeneration, Vitality"). */
  tags: string;
  title: string;
  lede: string;
  image: { src: string };
  /** `object-position` crop for the hero photo. */
  imagePosition?: string;
  /** "The challenge" label under the band icon. */
  challengeLabel: string;
  /** Band statement scrubbed word by word. */
  challenge: string;
}

/*
 * Three faint circles (2px white, 10%) behind the hero photo on production's
 * story pages — measured width / centre position in % of the frame.
 */
const CIRCLES = [
  { width: "76%", top: "107%", left: "85%" },
  { width: "60%", top: "36%", left: "89%" },
  { width: "68%", top: "73%", left: "-2%" },
];

/*
 * /stories/[slug] opening scene — the same viewport-locked stack production
 * uses on the specialist profiles, re-dressed for a client story: navy base,
 * the story photo over it dissolving linearly across the first viewport of
 * scroll, grain, the measured 30% #2F3332 edge scrim (multiply), the two arc
 * strokes at 50% and three 10% circles.
 *
 * Hero copy: the tag line drops from above at 0.4s; the headline (7 of 11
 * columns) enters word by word once the photo has resolved; the lede (4
 * columns, first line indented past the first column) rises at 0.6s.
 *
 * Band: a 320px spacer either side of the icon + "The challenge" label and
 * the centred statement, the statement lighting up word by word as it
 * traverses the viewport. Transparent — the navy under the fading photo IS
 * its background, exactly as on production.
 *
 * The fixed stack is deliberately not clipped: the page wraps everything
 * after this scene in a positioned `bg-background` block so the following
 * sections slide up over it.
 */
export function StoryHero({
  tags,
  title,
  lede,
  image,
  imagePosition = "center",
  challengeLabel,
  challenge,
}: StoryHeroProps) {
  const words = title.split(" ");

  return (
    /* header inversion lives on the SceneBackdrop measurer, so it lifts with the dissolve */
    <section className="relative">
      <SceneBackdrop>
        <AppearIn from="fade" slow className="absolute inset-0">
          <Image src="/images/navy-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        </AppearIn>
        <ScrollFade className="absolute inset-0">
          <AppearIn from="fade" slow className="absolute inset-0">
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
        {/* reference grain tile (128px, 10%, overlay) */}
        <div
          className="pointer-events-none absolute inset-0 bg-repeat opacity-10 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/texture-a.png')", backgroundSize: "128px auto" }}
        />
        {/* circles, desktop only like the reference */}
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden desktop:block">
          {CIRCLES.map((circle, index) => (
            <span
              key={index}
              className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-inverse opacity-10"
              style={circle}
            />
          ))}
        </div>
        {/* legibility scrim: 30% #2F3332 at both edges, clear middle */}
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply bg-[linear-gradient(rgba(47,51,50,0.3)_0%,rgba(47,51,50,0)_26.5%,rgba(47,51,50,0)_73.8%,rgba(47,51,50,0.3)_100%)]" />
      </SceneBackdrop>

      {/* both arc strokes: one layer over hero + band, drawn on scroll */}
      <SceneArcs />

      {/* hero viewport */}
      <div className="relative flex h-svh min-h-[640px] flex-col overflow-hidden">
        <Container className="relative flex flex-1 flex-col pt-[calc(var(--header-height)+64px)] pb-10 desktop:pt-[calc(var(--header-height)+100px)] desktop:pb-16">
          <AppearIn from="down" delay={400}>
            <Eyebrow tone="inverse">{tags}</Eyebrow>
          </AppearIn>
          <div className="mt-auto flex flex-col gap-8 pt-16 desktop:flex-row desktop:items-end desktop:gap-0">
            <h1 className="text-display text-inverse desktop:flex-[7]">
              {words.map((word, index) => (
                <span key={index}>
                  <span
                    className="appear appear-up-sm"
                    style={{ "--appear-delay": `${2000 + index * 80}ms` } as CSSProperties}
                  >
                    {word}
                  </span>
                  {index < words.length - 1 ? " " : null}
                </span>
              ))}
            </h1>
            <AppearIn delay={600} className="desktop:flex-[4] desktop:px-2">
              <p className="text-body text-inverse desktop:[text-indent:calc(20%+16px)]">{lede}</p>
            </AppearIn>
          </div>
        </Container>
      </div>

      {/* "The challenge" band — transparent over the shared backdrop */}
      <div className="relative overflow-hidden">
        {/* band copy dissolves with the backdrop (SceneBackdrop publishes --scene-opacity) */}
        <div style={{ opacity: "var(--scene-opacity, 1)" }}>
        <Container className="relative flex flex-col items-center gap-16 py-20 text-center tablet:py-[120px] desktop:py-[320px]">
          <Reveal className="flex flex-col items-center gap-6">
            <MeditationIcon className="fill-inverse" />
            <Eyebrow tone="inverse">{challengeLabel}</Eyebrow>
          </Reveal>
          {/* the statement itself keys the backdrop dissolve (SceneBackdrop) */}
          <div data-scene-copy>
          <WordReveal
            as="h2"
            text={challenge}
            startVh={1}
            endVh={0.25}
            className="text-statement max-w-[1200px] text-center text-inverse"
          />
          </div>
        </Container>
        </div>
      </div>
    </section>
  );
}
