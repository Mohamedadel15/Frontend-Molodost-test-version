import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ArticleCard } from "@/components/cards/ArticleCard/ArticleCard";
import { LotusIcon } from "@/components/decor/BrandIcons";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import { articles as staticArticles, type Article } from "@/content/articles";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface JournalSectionProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
  /** CMS articles (latest three); the static list when omitted. */
  articles?: Article[];
}

/** Journal (design-inventory §12.12): header row + 3 article cards with wide gutters. */
export function JournalSection({
  country,
  locale,
  dictionary,
  articles = staticArticles,
}: JournalSectionProps) {
  const copy = dictionary.home.journal;

  return (
    <Section paddingTop="md" paddingBottom="md" className="relative overflow-hidden">
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <LotusIcon />
          <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Heading as="h2" preset="sans-lg" className="max-w-[1100px]">
            {copy.title}
          </Heading>
        </Reveal>
        <Reveal delay={140}>
          <Text size="md" tone="secondary" className="max-w-[640px]">
            {copy.body}
          </Text>
        </Reveal>
        <Reveal delay={200}>
          <ButtonLink
            href={localePath(country, locale, "/journal")}
            variant="navy"
          >
            {copy.cta}
          </ButtonLink>
        </Reveal>
      </Container>
      <Container className="relative mt-20 grid items-start gap-x-24 gap-y-16 tablet:grid-cols-2 desktop:grid-cols-3">
        {articles.map((article, index) => (
          <Reveal
            key={article.id}
            delay={index * 100}
            className={index === 1 ? "desktop:mt-28" : undefined}
          >
            <ArticleCard
              article={article}
              href={localePath(country, locale, article.href)}
              locale={locale}
              readMoreLabel={dictionary.actions.readMore}
              mask={((index % 3) + 1) as 1 | 2 | 3}
            />
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
