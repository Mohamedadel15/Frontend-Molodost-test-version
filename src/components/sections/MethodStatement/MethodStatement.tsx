import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { WordReveal } from "@/components/animations/WordReveal";
import { LoveIcon } from "@/components/decor/BrandIcons";
import { Eyebrow } from "@/components/ui/Typography/Typography";

interface MethodStatementProps {
  /** Small uppercase label under the icon. */
  label: string;
  /** Statement body — revealed word by word on scroll. */
  statement: string;
  /** Full-bleed background photograph, parallaxed behind the copy. */
  image: string;
  id?: string;
}

/*
 * "The Molodost' Method" (/about, reference section #the-way-we-help): a
 * full-bleed panel one viewport tall at every breakpoint — Figma frame 2:8632
 * is 1440 × 1080, exactly 100vh at the design's artboard width; the background
 * image node inside it is 1440 × 1580, so that surplus 500px belongs to the
 * parallaxed image, not to the panel. Over the photograph on black sit the
 * centred icon + label, then the statement scrubbing word by word from 20% to
 * full white as the panel crosses the viewport.
 *
 * `data-header-invert` hands the fixed header its light variant for the panel's
 * height, matching the other dark sections.
 */
export function MethodStatement({
  label,
  statement,
  image,
  id,
}: MethodStatementProps) {
  return (
    <section
      id={id}
      data-header-invert
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-black py-(--space-section-md)"
    >
      <ParallaxImage
        src={image}
        travel={300}
        travelTablet={300}
        noiseOpacity={0.1}
        sizes="100vw"
        className="absolute inset-0 bg-black"
      />
      <div className="relative flex w-full flex-col items-center gap-12 tablet:gap-14 desktop:gap-16">
        <Reveal className="flex flex-col items-center gap-6 text-inverse">
          <LoveIcon />
          <Eyebrow tone="inverse">{label}</Eyebrow>
        </Reveal>
        <div className="flex w-full justify-center px-4 tablet:px-10 desktop:px-16">
          {/* Scrub window measured from the reference: starts as the block's
              top reaches the fold, completes a quarter down the viewport. */}
          <WordReveal
            as="h2"
            text={statement}
            startVh={1}
            endVh={0.25}
            className="text-statement max-w-[1200px] text-center text-inverse"
          />
        </div>
      </div>
    </section>
  );
}
