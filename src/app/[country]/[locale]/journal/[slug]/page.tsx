import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/inner/PageHero";
import { ProseSections } from "@/components/inner/ProseSections";
import { RelatedArticles } from "@/components/inner/RelatedArticles";
import { Container } from "@/components/layout/Container/Container";
import { isCountry, type Country } from "@/config/markets";
import { articles } from "@/content/articles";
import { pick } from "@/content/types";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return articles.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const article = articles.find((entry) => entry.id === slug);
  if (!article) return {};
  const typedLocale = locale as Locale;
  return pageMetadata({
    country: country as Country,
    locale: typedLocale,
    path: `/journal/${slug}`,
    title: pick(article.title, typedLocale),
    description: pick(article.excerpt, typedLocale),
  });
}

/** /journal/[slug] — article detail (reference article template). */
export default async function ArticlePage({ params }: PageParams) {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const article = articles.find((entry) => entry.id === slug);
  if (!article) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <>
      <PageHero
        eyebrow={pick(article.date, typedLocale)}
        title={pick(article.title, typedLocale)}
        lede={pick(article.excerpt, typedLocale)}
      />
      <Container className="pb-(--space-section-sm)">
        <Reveal className="relative mx-auto aspect-[768/578] w-full max-w-[980px] overflow-hidden rounded-[16px]">
          <Image
            src={article.image.src}
            alt={pick(article.title, typedLocale)}
            fill
            sizes="(min-width: 810px) 980px, 92vw"
            className="object-cover"
            priority
          />
        </Reveal>
      </Container>
      <ProseSections
        blocks={article.sections.map((section) => ({
          heading: pick(section.heading, typedLocale),
          body: pick(section.body, typedLocale),
        }))}
        closing={pick(article.closing, typedLocale)}
      />
      <RelatedArticles
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        excludeId={article.id}
      />
    </>
  );
}
