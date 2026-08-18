import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/inner/PageHero";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ArticleCard } from "@/components/cards/ArticleCard/ArticleCard";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { isCountry, type Country } from "@/config/markets";
import { articles } from "@/content/articles";
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
    path: "/journal",
    title: dictionary.inner.journal.title,
    description: dictionary.inner.journal.lede,
  });
}

/** /journal — article index (reference journal template). */
export default async function JournalPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.journal;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      <Section paddingBottom="md">
        <Container className="grid items-start gap-x-24 gap-y-16 tablet:grid-cols-2 desktop:grid-cols-3">
          {articles.map((article, index) => (
            <Reveal
              key={article.id}
              delay={(index % 3) * 100}
              className={index % 3 === 1 ? "desktop:mt-28" : undefined}
            >
              <ArticleCard
                article={article}
                href={localePath(typedCountry, typedLocale, article.href)}
                locale={typedLocale}
                readMoreLabel={dictionary.actions.readMore}
                mask={((index % 3) + 1) as 1 | 2 | 3}
              />
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
