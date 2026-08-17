import Image from "next/image";

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
  story: StoryFeatureEntry;
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
    <Section paddingTop="md" paddingBottom="md" className="overflow-hidden">
      <Container className="grid items-center gap-14 desktop:grid-cols-2">
        <div className="flex max-w-[520px] flex-col items-start gap-8">
          <Reveal>
            <Eyebrow tone="accent">{pick(story.tags, locale)}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Heading as="h2" preset="serif-xl">
              {pick(story.title, locale)}
            </Heading>
          </Reveal>
          <Reveal delay={160}>
            <Text size="lg" tone="secondary">
              {pick(story.excerpt, locale)}
            </Text>
          </Reveal>
          <Reveal delay={240}>
            <ButtonLink
              href={localePath(country, locale, story.href)}
              variant="navy"
            >
              {ctaLabel}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="relative -me-(--container-gutter) h-[560px] desktop:h-[640px]">
          <Reveal className="absolute inset-y-0 start-0 z-10 w-[52%]">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={story.images.front.src}
                alt=""
                fill
                sizes="(min-width: 1200px) 26vw, 60vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="absolute end-0 top-[8%] h-[68%] w-[46%]">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={story.images.back.src}
                alt=""
                fill
                sizes="(min-width: 1200px) 24vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
