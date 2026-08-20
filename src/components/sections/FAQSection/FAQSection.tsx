import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Accordion } from "@/components/ui/Accordion/Accordion";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import { faqs as staticFaqs, type FaqItem } from "@/content/faqs";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface FAQSectionProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
  /** CMS FAQs; the static list when omitted. */
  items?: FaqItem[];
}

/** FAQ (design-inventory §12.14): intro column + accordion column. */
export function FAQSection({ country, locale, dictionary, items: faqs = staticFaqs }: FAQSectionProps) {
  const copy = dictionary.home.faq;

  return (
    /* the reference lays the FAQ on #FAFAFA so the white rows read as cards */
    <Section paddingTop="md" paddingBottom="md" className="bg-surface">
      {/* intro on 5 of the reference's 12 columns, accordion on the last 6 */}
      <Container className="grid items-stretch gap-16 desktop:grid-cols-[5fr_6fr] desktop:gap-[136px]">
        <div className="flex h-full max-w-[571px] flex-col items-start gap-8">
          <Reveal>
            {/* the reference sets this heading in sans, not the serif display */}
            <Heading as="h2" preset="sans-lg">
              {copy.title}
            </Heading>
          </Reveal>
          <Reveal>
            <Text size="md" tone="secondary">
              {copy.body}
            </Text>
          </Reveal>
          {/* note + CTA pinned together at the bottom of the section
              (production): 14px note, 32px above the pill */}
          <div className="mt-auto flex flex-col items-start gap-8 pt-16">
            <Reveal>
              <Text size="sm" tone="secondary" className="max-w-[420px]">
                {copy.note}
              </Text>
            </Reveal>
            <Reveal>
              <ButtonLink
                href={localePath(country, locale, "/about")}
                variant="navy"
              >
                {copy.cta}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
        <Reveal>
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
