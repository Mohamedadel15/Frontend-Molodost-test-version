import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StoryCard } from "@/components/cards/StoryCard/StoryCard";
import { EditorialHero } from "@/components/inner/EditorialHero";
import { Container } from "@/components/layout/Container/Container";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { StoriesCta } from "@/components/sections/StoriesCta/StoriesCta";
import { isCountry, type Country } from "@/config/markets";
import { storyFeatures } from "@/content/stories";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const dictionary = await getDictionary(locale as Locale);
  return pageMetadata({
    country: country as Country,
    locale: locale as Locale,
    path: "/stories",
    title: dictionary.inner.stories.title,
    description: dictionary.inner.stories.lede,
  });
}

/*
 * /stories — section order from production, top to bottom: editorial hero
 * (waves on, 40vh band, 10 : 2 headline row, 3 : 9 label/intro row) → the
 * story list, one card per client journey stacked 200px apart on desktop
 * (160 tablet / 64 phone) with the same distance below the last card →
 * "Ready to find your path?" band on #FAFAFA → shared contact block.
 */
export default async function StoriesPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.stories;

  return (
    <>
      <EditorialHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} intro={copy.intro} />
      <section className="pb-16 tablet:pb-[160px] desktop:pb-[200px]">
        <Container className="flex flex-col gap-16 tablet:gap-[160px] desktop:gap-[200px]">
          {storyFeatures.map((story) => (
            <div key={story.id} id={`${story.id}-story`} className="scroll-mt-(--header-height)">
              <StoryCard
                story={story}
                country={typedCountry}
                locale={typedLocale}
                ctaLabel={dictionary.actions.readFullStory}
              />
            </div>
          ))}
        </Container>
      </section>
      <StoriesCta country={typedCountry} locale={typedLocale} dictionary={dictionary} />
      <ContactPath country={typedCountry} locale={typedLocale} dictionary={dictionary} />
    </>
  );
}
