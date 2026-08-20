import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { SpecialistCard } from "@/components/cards/SpecialistCard/SpecialistCard";
import { MeditationIcon } from "@/components/decor/BrandIcons";
import { CircledWord } from "@/components/decor/CircledWord";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import { specialists as staticSpecialists, type Specialist } from "@/content/specialists";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface SpecialistsSectionProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
  /** CMS specialists (first six); the static team when omitted. */
  specialists?: Specialist[];
}

/** Specialists (design-inventory §12.8): centered header + 3×2 blob-mask grid. */
export function SpecialistsSection({
  country,
  locale,
  dictionary,
  specialists = staticSpecialists,
}: SpecialistsSectionProps) {
  const copy = dictionary.home.specialists;

  return (
    <Section paddingTop="md" paddingBottom="none">
      <Container className="flex flex-col items-center gap-10 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <MeditationIcon />
          <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Heading as="h2" preset="sans-lg" className="max-w-[900px]">
            {copy.titlePre}
            <CircledWord>{copy.titleCircled}</CircledWord>
            {copy.titlePost}
          </Heading>
        </Reveal>
        <Reveal delay={160}>
          <Text size="md" tone="secondary" className="max-w-[620px]">
            {copy.body}
          </Text>
        </Reveal>
        <Reveal delay={220}>
          <ButtonLink
            href={localePath(country, locale, "/specialists")}
            variant="navy"
          >
            {copy.cta}
          </ButtonLink>
        </Reveal>
      </Container>
      <Container className="mt-20 grid gap-x-10 gap-y-20 tablet:grid-cols-2 desktop:grid-cols-3">
        {specialists.map((specialist, index) => (
          <Reveal key={specialist.id} delay={(index % 3) * 100}>
            <SpecialistCard specialist={specialist} locale={locale} />
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
