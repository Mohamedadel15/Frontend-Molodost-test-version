import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditorialHero } from "@/components/inner/EditorialHero";
import { BigQuote } from "@/components/sections/BigQuote/BigQuote";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { MethodStatement } from "@/components/sections/MethodStatement/MethodStatement";
import { PhilosophyQuote } from "@/components/sections/PhilosophyQuote/PhilosophyQuote";
import { SpecialistRoles } from "@/components/sections/SpecialistRoles/SpecialistRoles";
import { SplitStatement } from "@/components/sections/SplitStatement/SplitStatement";
import { StoryFeature } from "@/components/sections/StoryFeature/StoryFeature";
import { isCountry, type Country } from "@/config/markets";
import { aboutStoryFeature } from "@/content/stories";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const dictionary = await getDictionary(locale as Locale);
  return pageMetadata({
    country: country as Country,
    locale: locale as Locale,
    path: "/about",
    title: dictionary.inner.about.title,
    description: dictionary.inner.about.lede,
  });
}

/*
 * /about — section order taken from the reference page, top to bottom:
 * hero → intro → #the-way-we-help → #meet-anna → specialists → split
 * statement → contact path → #big-quote → story → FAQ.
 */
export default async function AboutPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.about;

  return (
    <>
      <EditorialHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        lede={copy.lede}
        intro={copy.intro}
      />

      <MethodStatement
        id="the-way-we-help"
        label={copy.methodEyebrow}
        statement={copy.methodBody}
        image="/images/about-method-bg.jpg"
      />

      <PhilosophyQuote
        id="meet-anna"
        quoteId="quote-animation"
        title={copy.philosophyTitle}
        body={copy.philosophyBody}
        quoteLead={copy.founderQuoteLead}
        quoteAccent={copy.founderQuoteAccent}
        attribution={copy.founderName}
        image="/images/about-founder.png"
      />

      <SpecialistRoles
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />

      <SplitStatement
        dictionary={dictionary}
        copy={{ title: copy.splitTitle, body: copy.splitBody }}
        href="/services"
        country={typedCountry}
        locale={typedLocale}
        wave={false}
      />

      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        copy={{ body: copy.contactBody }}
        variant="inner"
        wave
      />

      <BigQuote
        id="big-quote"
        text={copy.quote}
        attribution={copy.quoteAttribution}
        image="/images/about-quote-bg.jpg"
      />

      <StoryFeature
        story={aboutStoryFeature}
        country={typedCountry}
        locale={typedLocale}
        ctaLabel={dictionary.actions.readFullStory}
      />

      <FAQSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
    </>
  );
}
