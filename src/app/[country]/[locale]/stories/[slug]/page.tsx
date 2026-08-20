import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SpecialistApproach } from "@/components/inner/SpecialistApproach";
import { SpecialistPortrait } from "@/components/inner/SpecialistPortrait";
import { StoryHero } from "@/components/inner/StoryHero";
import { StoryOutcome } from "@/components/inner/StoryOutcome";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { isCountry, type Country } from "@/config/markets";
import { storyFeatures } from "@/content/stories";
import { pick } from "@/content/types";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return storyFeatures.map((story) => ({ slug: story.id }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const story = storyFeatures.find((entry) => entry.id === slug);
  if (!story) return {};
  const typedLocale = locale as Locale;
  return pageMetadata({
    country: country as Country,
    locale: typedLocale,
    path: `/stories/${slug}`,
    title: pick(story.title, typedLocale),
    description: pick(story.detail.lede, typedLocale),
  });
}

/*
 * /stories/[slug] — section for section the production story page
 * (molodostlongevity.com/stories/<id>): full-bleed fixed hero → "The
 * challenge" band (word scrub) → name + "The Journey" editorial with the
 * Starting Point / Our Approach blocks → portrait + pull quote → outcome +
 * "Read next story" link → contact CTA on the #FAFAFA band.
 */
export default async function StoryDetailPage({ params }: PageParams) {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const index = storyFeatures.findIndex((entry) => entry.id === slug);
  const story = storyFeatures[index];
  if (!story) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.stories;
  const detail = story.detail;
  const person = pick(detail.personName, typedLocale);
  // The entry after this one, wrapping to the first.
  const nextStory =
    storyFeatures.length > 1 ? storyFeatures[(index + 1) % storyFeatures.length] : undefined;

  return (
    <>
      <StoryHero
        tags={pick(story.tags, typedLocale)}
        title={pick(story.title, typedLocale)}
        lede={pick(detail.lede, typedLocale)}
        image={story.images.back}
        imagePosition="center 30%"
        challengeLabel={pick(detail.challengeTitle, typedLocale)}
        challenge={pick(detail.challenge, typedLocale)}
      />
      {/* positioned so it stacks above the scene's fixed backdrop, but NOT
          opaque: the backdrop has already dissolved to white when this block
          arrives (SceneBackdrop), so an opaque block would only add an edge */}
      <div className="relative">
        <SpecialistApproach
          eyebrow={person}
          title={pick(detail.journeyTitle, typedLocale)}
          intro={pick(detail.journeyIntro, typedLocale)}
          blocks={[
            {
              heading: pick(detail.startingPointTitle, typedLocale),
              body: pick(detail.startingPoint, typedLocale),
            },
            {
              heading: pick(detail.approachTitle, typedLocale),
              body: pick(detail.approach, typedLocale),
            },
          ]}
        />
        <div className="pt-16 tablet:pt-20 desktop:pt-[80px]">
          <SpecialistPortrait
            image={story.images.front}
            alt={person}
            quote={pick(detail.quote, typedLocale)}
            attribution={person}
            offset="image"
            rule="accent"
            noiseOpacity={0.05}
          />
        </div>
        <StoryOutcome
          outcome={pick(detail.outcome, typedLocale)}
          nextHref={nextStory ? localePath(typedCountry, typedLocale, nextStory.href) : undefined}
          nextLabel={dictionary.actions.readNextStory}
        />
        <ContactPath
          country={typedCountry}
          locale={typedLocale}
          dictionary={dictionary}
          variant="inner"
          copy={{ title: copy.detailContactTitle, body: copy.detailContactBody }}
        />
      </div>
    </>
  );
}
