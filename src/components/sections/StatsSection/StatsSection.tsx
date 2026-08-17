import { CountUp } from "@/components/animations/CountUp";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import { stats } from "@/content/stats";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/types/dictionary";

interface StatsSectionProps {
  locale: Locale;
  dictionary: Dictionary;
}

/*
 * Statistics (design-inventory §12.13): two-column intro + 4 odometer
 * counters (Inter 600 72 navy) with small multiline labels.
 */
export function StatsSection({ locale, dictionary }: StatsSectionProps) {
  const copy = dictionary.home.stats;

  return (
    <Section paddingTop="md" paddingBottom="md">
      <Container className="grid gap-12 desktop:grid-cols-2 desktop:gap-24">
        <Reveal>
          <Heading as="h2" preset="sans-lg" className="max-w-[660px]">
            {copy.title}
          </Heading>
        </Reveal>
        <Reveal delay={120}>
          <Text
            size="sm"
            tone="secondary"
            className="max-w-[460px] desktop:justify-self-end"
          >
            {copy.body}
          </Text>
        </Reveal>
      </Container>
      <Container className="mt-24 grid grid-cols-2 gap-x-8 gap-y-16 desktop:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.id} delay={index * 100} className="flex flex-col gap-8">
            <span className="text-sans-xl text-accent">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-body-sm whitespace-pre-line text-secondary">
              {pick(stat.label, locale)}
            </span>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
