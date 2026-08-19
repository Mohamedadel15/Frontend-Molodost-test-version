import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { ServiceLines } from "@/components/decor/RefLines";
import { Container } from "@/components/layout/Container/Container";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import { serviceRows } from "@/content/services";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface ServicePanelsProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/*
 * /services full-bleed service panels. Measured on the reference at a 1239px
 * viewport: four contiguous edge-to-edge panels, tops at 928 / 1609 / 2291 /
 * 2972 — a 681-682px pitch with no gaps, each `padding: 100px 0 64px` over a
 * parallaxed photograph on black. Every panel sets its copy at the inline
 * start; the reference does not alternate sides.
 *
 * `data-header-invert` hands the fixed header its light variant for the
 * stack's height, as the other dark sections do.
 */
export function ServicePanels({
  country,
  locale,
  dictionary,
}: ServicePanelsProps) {
  const bookHref = localePath(country, locale, "/book-a-session");

  return (
    /* Positioning context for the shared line art, and the clip that crops it. */
    <div className="relative overflow-clip">
      {serviceRows.map((row) => (
        <section
          key={row.id}
          data-header-invert
          /*
           * 682px is the measured desktop panel height, held as a floor and not
           * a fixed height: text-display relaxes to line-height 1.05 in Arabic
           * and those titles wrap to three lines, so the stack outgrows 682px
           * and a hard height would amputate the CTA below it. Smaller
           * breakpoints were not measured, so there this is a 560px floor
           * rather than a scaled guess. No clip of its own is needed —
           * ParallaxImage crops itself and the line art is cropped by the
           * wrapper.
           */
          className="relative min-h-[560px] bg-black desktop:min-h-[682px]"
        >
          {/* travel 500 = the image layer's measured 1182px height over a
              682px frame; the same figure the Big Quote background uses. */}
          <ParallaxImage
            src={row.image.src}
            travel={500}
            travelTablet={300}
            noiseOpacity={0.1}
            sizes="100vw"
            className="absolute inset-0 bg-black"
          />
          {/*
           * The line art is a sibling of the panels and paints after them, so
           * it sits over the photographs; `z-10` lifts the copy back above it.
           */}
          <Container className="relative z-10 pt-16 pb-16 desktop:pt-[100px]">
            <Reveal className="flex flex-col items-start gap-10 desktop:gap-16">
              <div className="flex flex-col gap-6 desktop:gap-8">
                <Heading as="h2" preset="display" tone="inverse">
                  {pick(row.title, locale)}
                </Heading>
                <Text size="md" tone="inverse" className="max-w-[640px]">
                  {pick(row.body, locale)}
                </Text>
              </div>
              <ButtonLink href={bookHref} variant="white">
                {dictionary.actions.bookASession}
              </ButtonLink>
            </Reveal>
          </Container>
        </section>
      ))}
      {/*
       * ONE 680 × 6000 artwork spans the whole four-panel stack, not one per
       * panel: measured at 548.088px of 1239 (44.24%) from the stack's top-left
       * and fully drawn — unlike the Big Quote, nothing here scrubs on scroll.
       */}
      <ServiceLines className="start-[44.24%] top-0 h-[6000px] w-[680px]" />
    </div>
  );
}
