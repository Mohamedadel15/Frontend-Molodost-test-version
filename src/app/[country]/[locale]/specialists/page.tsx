import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/inner/PageHero";
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

/** /specialists — full team grid linking to detail pages. */
export default async function SpecialistsPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.specialists;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      <Section paddingBottom="md">
        <Container className="grid gap-x-10 gap-y-20 tablet:grid-cols-2 desktop:grid-cols-3">
          {specialists.map((specialist, index) => (
            <Reveal key={specialist.id} delay={(index % 3) * 100}>
              <Link
                href={localePath(
                  typedCountry,
                  typedLocale,
                  `/specialists/${specialist.id}`,
                )}
                className="block transition-opacity duration-(--motion-fast) hover:opacity-80"
              >
                <SpecialistCard specialist={specialist} locale={typedLocale} />
              </Link>
            </Reveal>
          ))}
        </Container>
      </Section>
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
    </>
  );
}
