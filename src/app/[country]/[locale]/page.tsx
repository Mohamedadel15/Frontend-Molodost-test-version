import { notFound } from "next/navigation";

import { BigQuote } from "@/components/sections/BigQuote/BigQuote";
import { ConsultationSection } from "@/components/sections/ConsultationSection/ConsultationSection";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { Hero } from "@/components/sections/Hero/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks/HowItWorks";
import { JournalSection } from "@/components/sections/JournalSection/JournalSection";
import { PhilosophyStatement } from "@/components/sections/PhilosophyStatement/PhilosophyStatement";
import { ProgramsGrid } from "@/components/sections/ProgramsGrid/ProgramsGrid";
import { SpecialistsSection } from "@/components/sections/SpecialistsSection/SpecialistsSection";
import { SplitStatement } from "@/components/sections/SplitStatement/SplitStatement";
import { StatsSection } from "@/components/sections/StatsSection/StatsSection";
import { StoryFeature } from "@/components/sections/StoryFeature/StoryFeature";
import { ToggleScene } from "@/components/sections/ToggleScene/ToggleScene";
import { isCountry, type Country } from "@/config/markets";
import { storyFeatures } from "@/content/stories";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

/** Home — section order per design-inventory §12. */
export default async function HomePage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const [storyA, storyB] = storyFeatures;

  return (
    <>
      <Hero country={typedCountry} locale={typedLocale} dictionary={dictionary} />
      <ToggleScene dictionary={dictionary} />
      <ProgramsGrid country={typedCountry} locale={typedLocale} />
      <PhilosophyStatement
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      {storyA ? (
        <StoryFeature
          story={storyA}
          country={typedCountry}
          locale={typedLocale}
          ctaLabel={dictionary.actions.readFullStory}
        />
      ) : null}
      <HowItWorks
        dictionary={dictionary}
        steps={dictionary.home.howItWorks.steps}
      />
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      <SpecialistsSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      <SplitStatement dictionary={dictionary} />
      <BigQuote
        text={dictionary.home.quote.text}
        attribution={dictionary.home.quote.attribution}
      />
      {storyB ? (
        <StoryFeature
          story={storyB}
          country={typedCountry}
          locale={typedLocale}
          ctaLabel={dictionary.actions.readFullStory}
        />
      ) : null}
      <JournalSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      <StatsSection locale={typedLocale} dictionary={dictionary} />
      <FAQSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      <ConsultationSection country={typedCountry} dictionary={dictionary} />
    </>
  );
}
