import { Reveal } from "@/components/animations/Reveal";
import { WordReveal } from "@/components/animations/WordReveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Eyebrow, Heading } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface PhilosophyStatementProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/** Centered philosophy statement + CTA (design-inventory §12.4, 200px top pad). */
export function PhilosophyStatement({
  country,
  locale,
  dictionary,
}: PhilosophyStatementProps) {
  const copy = dictionary.home.philosophy;

  return (
    <Section paddingTop="lg" paddingBottom="sm">
      <Container className="flex flex-col items-center gap-10 text-center">
        <Reveal>
          <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Heading as="h2" preset="sans-lg" className="max-w-[1240px]">
          <WordReveal text={copy.statement} />
        </Heading>
        <Reveal delay={200}>
          <ButtonLink
            href={localePath(country, locale, "/about")}
            variant="navy"
          >
            {copy.cta}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
