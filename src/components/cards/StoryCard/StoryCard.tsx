import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { ParallaxY } from "@/components/animations/ParallaxY";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import type { StoryFeatureEntry } from "@/content/stories";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";

interface StoryCardProps {
  story: Omit<StoryFeatureEntry, "detail">;
  country: Country;
  locale: Locale;
  ctaLabel: string;
}

/*
 * /stories index entry — the production "Story Card" component, measured from
 * its published CSS (framer-gWhxt):
 *
 *   row 1  [ 5: tags ]               [ 7 ]                align-end
 *   row 2  [ 5: title/excerpt/CTA ] [ 1 ] [ 6: collage ]  align-start
 *
 * rows 48px apart on desktop (40 tablet, 32 phone). Tablet re-weights row 2
 * to 3 : 1 : 4. Phone stacks: collage first (tall image at 100% x 400px),
 * copy under it, 40px apart — so the collage is DOM-first and the copy
 * column takes `order` on tablet and up.
 *
 * Collage: the tall image is 60% wide at the column's inline-end (aspect
 * 0.651) with the shorter one (50%, aspect 0.668) pinned bottom-start over
 * it — both run the reference "Image Parallax Vertical + Noize" treatment,
 * 300px of travel on the tall one and 100px on the short one, 0.15 grain.
 * On top of that the FRAMES scroll at different speeds (the reference puts a
 * scroll transform on each link): the tall one lags, the short one leads, so
 * their bottoms drift apart mid-scroll and line up again at rest.
 *
 * Copy reveals are the reference's plain 800ms fade (opacity 0 → 1, no
 * translate, replayed on every entry); the images carry no reveal at all.
 */
export function StoryCard({ story, country, locale, ctaLabel }: StoryCardProps) {
  const href = localePath(country, locale, story.href);
  const title = pick(story.title, locale);

  return (
    <article className="flex w-full flex-col gap-8 tablet:gap-10 desktop:gap-12">
      {/* row 1 — tags sit over the text column */}
      <div className="hidden items-end tablet:flex">
        <div className="flex-[5] px-2">
          <Reveal>
            <Eyebrow tone="accent">{pick(story.tags, locale)}</Eyebrow>
          </Reveal>
        </div>
        <div aria-hidden className="flex-[7]" />
      </div>

      {/* row 2 — copy | gutter | collage (collage first in DOM for the phone stack) */}
      <div className="flex flex-col gap-10 tablet:flex-row tablet:items-start tablet:gap-0">
        <div className="relative flex w-full flex-col items-end px-2 tablet:order-3 tablet:flex-[4] desktop:flex-[6]">
          <ParallaxY
            travel={100}
            className="relative z-10 h-[400px] w-full tablet:aspect-[0.651338] tablet:h-auto tablet:w-[60%]"
          >
            <a href={href} aria-label={title} className="absolute inset-0 block select-none">
              <ParallaxImage
                src={story.images.back.src}
                travel={300}
                travelTablet={200}
                sizes="(min-width: 1200px) 30vw, (min-width: 810px) 34vw, 100vw"
                className="absolute inset-0"
              />
            </a>
          </ParallaxY>
          <ParallaxY
            travel={-140}
            className="absolute bottom-0 start-2 z-10 aspect-[0.668342] w-[50%]"
          >
            <a href={href} aria-label={title} className="absolute inset-0 block select-none">
              <ParallaxImage
                src={story.images.front.src}
                travel={100}
                travelTablet={60}
                sizes="(min-width: 1200px) 25vw, (min-width: 810px) 28vw, 50vw"
                className="absolute inset-0"
              />
            </a>
          </ParallaxY>
        </div>

        <div aria-hidden className="hidden tablet:order-2 tablet:block tablet:flex-1" />

        <div className="flex flex-col items-start gap-10 px-2 tablet:order-1 tablet:flex-[3] desktop:flex-[5] desktop:gap-12">
          <Reveal className="tablet:hidden">
            <Eyebrow tone="accent">{pick(story.tags, locale)}</Eyebrow>
          </Reveal>
          <div className="flex w-full flex-col items-start gap-6">
            <Reveal className="w-full">
              <Heading as="h2" preset="serif-xl">
                {title}
              </Heading>
            </Reveal>
            <Reveal className="w-full">
              <Text size="md" tone="secondary" className="max-w-[480px]">
                {pick(story.excerpt, locale)}
              </Text>
            </Reveal>
          </div>
          <Reveal>
            <ButtonLink href={href} variant="navy">
              {ctaLabel}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
