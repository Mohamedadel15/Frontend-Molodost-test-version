import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ProgramCard } from "@/components/cards/ProgramCard/ProgramCard";
import type { Country } from "@/config/markets";
import { programs } from "@/content/programs";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface ProgramsGridProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/** Home "Our Services": 4-up cards, 16px gap (design-inventory §12.3). */
export function ProgramsGrid({
  country,
  locale,
  dictionary,
}: ProgramsGridProps) {
  return (
    <Section paddingTop="sm" paddingBottom="none">
      <Container>
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          {programs.map((program, index) => (
            <Reveal key={program.id} delay={index * 100}>
              <ProgramCard
                program={program}
                href={localePath(country, locale, program.href)}
                locale={locale}
                readMoreLabel={dictionary.actions.readMore}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
