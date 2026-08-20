import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ProgramCard } from "@/components/cards/ProgramCard/ProgramCard";
import type { Country } from "@/config/markets";
import { programs as staticPrograms, type Program } from "@/content/programs";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

/*
 * Desktop card heights live in globals.css (`.programs-row`): all four rest at
 * the row height, the hovered card grows tallest, its immediate neighbours
 * rise to a middle height and the far cards keep the default — a ripple that
 * needs sibling selectors (:has() for the previous neighbour), which Tailwind
 * variants cannot express. Below desktop every card is 400px.
 */
const CARD_HEIGHT = "h-[400px]";

interface ProgramsGridProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
  /** CMS programs; the static cards when omitted. */
  programs?: Program[];
}

/** Home "Our Services": 4-up cards, 16px gap (design-inventory §12.3). */
export function ProgramsGrid({
  country,
  locale,
  dictionary,
  programs = staticPrograms,
}: ProgramsGridProps) {
  return (
    <Section paddingTop="sm" paddingBottom="none">
      <Container>
        {/*
          Production desktop: one 560px row, 16px gutters, the four cards
          vertically centred at the same 440px rest height; hovering one grows it,
          lifts its neighbours a little and leaves the far cards alone
          (overflow stays visible so the growth can spill past the row).
          Tablet: 2 × 2 grid of 400px cards; phone: a single 400px column.
        */}
        <div className="programs-row grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:flex desktop:h-[560px] desktop:items-center desktop:overflow-visible">
          {programs.map((program, index) => (
            <Reveal key={program.id} delay={index * 100} className="desktop:min-w-0 desktop:flex-1">
              <ProgramCard
                program={program}
                href={localePath(country, locale, program.href)}
                locale={locale}
                readMoreLabel={dictionary.actions.readMore}
                className={CARD_HEIGHT}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
