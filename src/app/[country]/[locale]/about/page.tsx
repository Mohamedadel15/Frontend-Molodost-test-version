import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/inner/PageHero";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { BigQuote } from "@/components/sections/BigQuote/BigQuote";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { SpecialistsSection } from "@/components/sections/SpecialistsSection/SpecialistsSection";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import { isCountry, type Country } from "@/config/markets";
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

/** /about — clinic story, method, philosophy, team (reference about template). */
export default async function AboutPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.about;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      <Section paddingBottom="md">
        <Container className="flex flex-col gap-24">
          <div className="grid gap-8 desktop:grid-cols-[1fr_2fr] desktop:gap-24">
            <Reveal>
              <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <Heading as="h2" preset="sans-md" className="max-w-[900px]">
                {copy.intro}
              </Heading>
            </Reveal>
          </div>
          <div className="grid gap-8 desktop:grid-cols-[1fr_2fr] desktop:gap-24">
            <Reveal>
              <Eyebrow tone="accent">{copy.methodEyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <Heading as="h2" preset="sans-md" className="max-w-[900px]">
                {copy.methodBody}
              </Heading>
            </Reveal>
          </div>
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center">
            <Reveal>
              <Heading as="h2" preset="serif-md" tone="accent">
                {copy.philosophyTitle}
              </Heading>
            </Reveal>
            <Reveal delay={100}>
              <Text size="md" tone="secondary">
                {copy.philosophyBody}
              </Text>
            </Reveal>
          </div>
        </Container>
      </Section>
      <BigQuote text={copy.founderQuote} attribution={copy.founderName} />
      <SpecialistsSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
    </>
  );
}
