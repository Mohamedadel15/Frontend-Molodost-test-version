"use client";

import { useRef } from "react";

import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotion } from "@/components/animations/StickyScene";
import { useElementProgress } from "@/components/animations/useElementProgress";
import { Container } from "@/components/layout/Container/Container";
import { QuoteLines } from "@/components/decor/RefLines";
import { Heading, Text } from "@/components/ui/Typography/Typography";

interface BigQuoteProps {
  text: string;
  attribution: string;
  /** Full-bleed background photograph. */
  image?: string;
  id?: string;
}

/*
 * Full-bleed dark quote (design-inventory §12.10). Measured from the
 * reference: at least 120vh tall (80vh below desktop) over a parallaxed
 * photograph on black, content pushed to the bottom and set at the inline
 * start — a plain white serif heading with the muted attribution under it.
 *
 * The quote does NOT scrub word by word; that treatment belongs to the method
 * panel alone. Both this and the home quote are ordinary fade-in reveals. The
 * decorative loops still draw themselves as the section passes.
 */
export function BigQuote({
  text,
  attribution,
  image = "/images/quote-hand.jpg",
  id,
}: BigQuoteProps) {
  const ref = useRef<HTMLElement>(null);
  const progress = useElementProgress(ref, { startVh: 0.9, endVh: 0.05 });
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      id={id}
      data-header-invert
      className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden bg-black py-(--space-section-md) desktop:min-h-[120svh]"
    >
      <ParallaxImage
        src={image}
        travel={500}
        travelTablet={300}
        noiseOpacity={0.1}
        sizes="100vw"
        className="absolute inset-0 bg-black"
      />
      <QuoteLines
        progress={reduced ? 1 : progress}
        className="start-[52%] top-[-55%] h-[210%] w-[44%]"
      />
      <Container className="relative flex flex-col gap-6 tablet:gap-7 desktop:gap-8">
        <Reveal>
          <Heading as="h2" preset="serif-xl" tone="inverse" className="max-w-[720px]">
            {text}
          </Heading>
        </Reveal>
        <Reveal>
          <Text size="sm" tone="inverse-muted">
            {attribution}
          </Text>
        </Reveal>
      </Container>
    </section>
  );
}
