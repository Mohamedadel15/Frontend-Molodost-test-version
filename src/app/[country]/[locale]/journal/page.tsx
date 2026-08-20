import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations/Reveal";
import { ArticleCard } from "@/components/cards/ArticleCard/ArticleCard";
import { EditorialHero } from "@/components/inner/EditorialHero";
import { Container } from "@/components/layout/Container/Container";
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

/*
 * /journal — section order from production (molodostlongevity.com/journal):
 * editorial hero (waves on, 10 : 2 headline row, 3 : 9 label/intro row) →
 * the article cards on a two-column grid, 80px gutters (64 tablet, 48
 * stacked on phone), every card centred in its cell and capped at 480px,
 * all on the same blob mask → contact block as the #FAFAFA inner variant
 * with the journal's own wording.
 */
export default async function JournalPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.journal;

  return (
    <>
      <EditorialHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} intro={copy.intro} />
      <section className="pb-20 tablet:pb-[120px] desktop:pb-40">
        <Container className="grid items-start gap-12 tablet:grid-cols-2 tablet:gap-16 desktop:gap-20">
          {articles.map((article) => (
            <Reveal key={article.id}>
              <ArticleCard
                article={article}
                href={localePath(typedCountry, typedLocale, article.href)}
                locale={typedLocale}
                readMoreLabel={dictionary.actions.readMore}
                mask={1}
              />
            </Reveal>
          ))}
        </Container>
      </section>
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        variant="inner"
        copy={{ title: copy.contactTitle, body: copy.contactBody }}
      />
    </>
  );
}
