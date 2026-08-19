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
 * decorative loops are the only scroll-linked thing here — see below.
 */
export function BigQuote({
  text,
  attribution,
  image = "/images/quote-hand.jpg",
  id,
}: BigQuoteProps) {
  const linesRef = useRef<HTMLDivElement>(null);
  /*
   * The lines are a slow crawl, not a draw-on: measured on the reference, the
   * stroke advances a constant ~1/5900 per scrolled pixel and completes only
   * once the 2000px artwork has cleared the top of the viewport. It is already
   * ~44% drawn as the panel enters and only ~66% by the time the quote is
   * centred, so the section never shows it empty or finished.
   */
  const progress = useElementProgress(linesRef, { rangePx: 5900 });
  const reduced = useReducedMotion();

  return (
    <section
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
      {/* 680 × 2000 artwork pinned to the panel's top edge at 49.3% across —
          the reference's own box, so the visible crop is the same and the
          viewBox is not letterboxed. The panel's overflow clips the rest. */}
      <div
        ref={linesRef}
        aria-hidden
        className="pointer-events-none absolute start-[49.3%] top-0 h-[2000px] w-[680px]"
      >
        <QuoteLines
          progress={reduced ? 1 : progress}
          className="inset-0 h-full w-full"
        />
      </div>
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
