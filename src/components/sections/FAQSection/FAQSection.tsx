import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Accordion } from "@/components/ui/Accordion/Accordion";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import { faqs } from "@/content/faqs";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface FAQSectionProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/** FAQ (design-inventory §12.14): intro column + accordion column. */
export function FAQSection({ country, locale, dictionary }: FAQSectionProps) {
  const copy = dictionary.home.faq;

  return (
    <Section paddingTop="md" paddingBottom="md">
      <Container className="grid items-stretch gap-16 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] desktop:gap-24">
        <div className="flex h-full max-w-[420px] flex-col items-start gap-8">
          <Reveal>
            <Heading as="h2" preset="serif-xl">
              {copy.title}
            </Heading>
          </Reveal>
          <Reveal delay={80}>
            <Text size="md" tone="secondary">
              {copy.body}
            </Text>
          </Reveal>
          <Reveal delay={140}>
            <Text size="md" tone="secondary">
              {copy.note}
            </Text>
          </Reveal>
          {/* CTA pinned to the bottom of the section (production) */}
          <Reveal delay={200} className="mt-auto pt-8">
            <ButtonLink
              href={localePath(country, locale, "/about")}
              variant="navy"
            >
              {copy.cta}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <Accordion
            items={faqs.map((faq) => ({
              id: faq.id,
              question: pick(faq.question, locale),
              answer: pick(faq.answer, locale),
            }))}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
