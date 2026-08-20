import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Heading, Text } from "@/components/ui/Typography/Typography";

interface SpecialistProfileProps {
  /** Outcome paragraph after the quote — what patients get. */
  outcome: string;
  /** "At Molodost … 5D Longevity Framework" paragraph. */
  framework: string;
  specialisationsTitle: string;
  specialisations: string[];
  languagesTitle: string;
  languages: string;
}

/*
 * Closing profile facts (production pages): outcome + framework paragraphs,
 * the Specialisations bullet list, and languages — all in the same 480px
 * offset column the approach section writes in (grid column 4).
 */
export function SpecialistProfile({
  outcome,
  framework,
  specialisationsTitle,
  specialisations,
  languagesTitle,
  languages,
}: SpecialistProfileProps) {
  return (
    <Section paddingBottom="md" className="pt-20 desktop:pt-[120px]">
      <Container className="desktop:grid desktop:grid-cols-12">
        <div className="flex max-w-[480px] flex-col desktop:col-span-8 desktop:col-start-4">
          <Reveal>
            <Text tone="secondary">{outcome}</Text>
          </Reveal>
          <Reveal className="mt-4">
            <Text tone="secondary">{framework}</Text>
          </Reveal>
          <Reveal className="mt-10">
            <Heading as="h2" preset="sans-sm">
              {specialisationsTitle}
            </Heading>
          </Reveal>
          <Reveal className="mt-4">
            {/* production marks items with a literal bullet glyph */}
            <ul className="flex flex-col gap-4">
              {specialisations.map((item) => (
                <li key={item} className="text-body text-secondary">
                  • {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-10">
            <Heading as="h2" preset="sans-sm">
              {languagesTitle}
            </Heading>
          </Reveal>
          <Reveal className="mt-4">
            <Text tone="secondary">{languages}</Text>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
