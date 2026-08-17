import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ContactWave } from "@/components/decor/RefLines";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import type { Dictionary } from "@/types/dictionary";

interface SplitStatementProps {
  dictionary: Dictionary;
}

/*
 * Two-column text section (design-inventory §12.9): sans headline at
 * inline-start, navy body copy at inline-end.
 */
export function SplitStatement({ dictionary }: SplitStatementProps) {
  const copy = dictionary.home.split;

  return (
    <Section paddingTop="md" paddingBottom="md" className="relative z-10">
      <Container className="grid gap-12 desktop:grid-cols-2 desktop:gap-24">
        <Reveal>
          <Heading as="h2" preset="sans-lg" className="max-w-[620px]">
            {copy.title}
          </Heading>
        </Reveal>
        <Reveal delay={120} className="desktop:justify-self-end">
          <Text size="lg" tone="accent" className="max-w-[480px]">
            {copy.body}
          </Text>
        </Reveal>
      </Container>
      {/* FAFAFA dome easing into the Big Quote section (measured seam overlap ~220px) */}
      <ContactWave className="-bottom-[220px] inset-x-0 h-[443px] w-full" />
    </Section>
  );
}
