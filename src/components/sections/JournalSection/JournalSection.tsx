import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ArticleCard } from "@/components/cards/ArticleCard/ArticleCard";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import { articles } from "@/content/articles";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface JournalSectionProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/** Journal (design-inventory §12.12): header row + 3 article cards with wide gutters. */
export function JournalSection({
  country,
  locale,
  dictionary,
}: JournalSectionProps) {
  const copy = dictionary.home.journal;

  return (
    <Section paddingTop="md" paddingBottom="md">
      <Container className="grid items-end gap-10 desktop:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="flex flex-col items-start gap-8">
          <Reveal>
            <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Heading as="h2" preset="serif-xl" className="max-w-[680px]">
              {copy.title}
            </Heading>
          </Reveal>
        </div>
        <Reveal
          delay={160}
          className="flex flex-col items-start gap-8 desktop:items-end desktop:justify-self-end desktop:text-end"
        >
          <Text size="md" tone="secondary" className="max-w-[380px]">
            {copy.body}
          </Text>
          <ButtonLink
            href={localePath(country, locale, "/journal")}
            variant="navy"
          >
            {copy.cta}
          </ButtonLink>
        </Reveal>
      </Container>
      <Container className="mt-20 grid gap-x-24 gap-y-16 tablet:grid-cols-2 desktop:grid-cols-3">
        {articles.map((article, index) => (
          <Reveal key={article.id} delay={index * 100}>
            <ArticleCard
              article={article}
              href={localePath(country, locale, article.href)}
              locale={locale}
              readMoreLabel={dictionary.actions.readMore}
            />
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
