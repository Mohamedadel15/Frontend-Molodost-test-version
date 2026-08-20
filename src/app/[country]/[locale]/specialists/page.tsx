import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations/Reveal";
import { WaveLines } from "@/components/decor/RefLines";
import { EditorialHero } from "@/components/inner/EditorialHero";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { SpecialistCard } from "@/components/cards/SpecialistCard/SpecialistCard";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { isCountry, type Country } from "@/config/markets";
import { specialists } from "@/content/specialists";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/routes";
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
    path: "/specialists",
    title: dictionary.inner.specialists.title,
    description: dictionary.inner.specialists.lede,
  });
}

/*
 * /specialists — section order taken from the reference frame (Figma 28:8236),
 * top to bottom: editorial hero → two-column team grid with the wave lines
 * threading behind the middle rows → "Begin with clinical clarity" contact
 * block on the #FAFAFA band.
 */
export default async function SpecialistsPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.specialists;

  return (
    <>
      <EditorialHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        lede={copy.lede}
        intro={copy.intro}
        waves={false}
      />
      <Section paddingBottom="md" className="relative overflow-hidden">
        {/* looping wave lines behind the middle card rows (Figma 28:8239:
            a 900px band vertically centred on the grid, lines offset 110px) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[900px] -translate-y-1/2 desktop:block"
        >
          <WaveLines className="left-[-1954px] top-[110px] h-[680px] w-[6000px]" />
        </div>
        {/* Figma 28:8397: 616px cells with an 80px gutter on both axes */}
        <Container className="relative grid gap-x-20 gap-y-20 tablet:grid-cols-2">
          {specialists.map((specialist, index) => (
            <Reveal key={specialist.id} delay={(index % 2) * 100}>
              <SpecialistCard
                specialist={specialist}
                locale={typedLocale}
                href={localePath(
                  typedCountry,
                  typedLocale,
                  `/specialists/${specialist.id}`,
                )}
                readMoreLabel={dictionary.actions.readMore}
              />
            </Reveal>
          ))}
        </Container>
      </Section>
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        variant="inner"
        copy={{
          title: copy.contactTitle,
          body: copy.contactBody,
          cta: copy.contactCta,
        }}
      />
    </>
  );
}
