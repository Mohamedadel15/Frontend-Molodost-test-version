import Image from "next/image";

import { ParallaxY } from "@/components/animations/ParallaxY";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import type { StoryFeatureEntry } from "@/content/stories";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";

interface StoryFeatureProps {
  /** Only the feature fields are read, so detail-less entries are accepted. */
  story: Omit<StoryFeatureEntry, "detail">;
  country: Country;
  locale: Locale;
  ctaLabel: string;
}

/*
 * Featured story: text column at inline-start, layered portrait collage at
 * inline-end bleeding to the page edge (design-inventory §9 StoryFeature).
 * Column order mirrors automatically in RTL. Layer parallax: deferred to the
 * animation-calibration pass.
 */
export function StoryFeature({
  story,
  country,
  locale,
  ctaLabel,
}: StoryFeatureProps) {
  return (
    /* No line art here: the reference's story sections carry no SVG at all —
       verified on /about and on both home stories. */
    <Section paddingTop="md" paddingBottom="md" className="relative overflow-hidden">
      {/* Measured column split: text on 5 of the reference's 12 columns, the
          collage on the last 6, one empty column between them. */}
      <Container className="relative grid items-center gap-14 desktop:grid-cols-[5fr_6fr] desktop:gap-[136px]">
        <div className="flex max-w-[571px] flex-col items-start gap-8">
          <Reveal>
            <Eyebrow tone="accent">{pick(story.tags, locale)}</Eyebrow>
          </Reveal>
          <Reveal>
            <Heading as="h2" preset="serif-xl">
              {pick(story.title, locale)}
            </Heading>
          </Reveal>
          <Reveal>
            <Text size="md" tone="secondary" className="max-w-[480px]">
              {pick(story.excerpt, locale)}
            </Text>
          </Reveal>
          <Reveal>
            <ButtonLink
              href={localePath(country, locale, story.href)}
              variant="navy"
            >
              {ctaLabel}
            </ButtonLink>
          </Reveal>
        </div>

        {/* The reference keeps the collage inside the container — no bleed —
            with the taller layer flush to the column's end edge. */}
        <div className="relative h-[560px] desktop:h-[634px]">
          <Reveal className="absolute start-0 top-[16.9%] z-10 h-[83.1%] w-[51%]">
            <ParallaxY travel={-56} className="h-full">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={story.images.front.src}
                  alt=""
                  fill
                  sizes="(min-width: 1200px) 26vw, 60vw"
                  className="object-cover object-top"
                />
              </div>
            </ParallaxY>
          </Reveal>
          <Reveal className="absolute end-0 top-0 h-full w-[60%]">
            <ParallaxY travel={44} className="h-full">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={story.images.back.src}
                  alt=""
                  fill
                  sizes="(min-width: 1200px) 24vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ParallaxY>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
