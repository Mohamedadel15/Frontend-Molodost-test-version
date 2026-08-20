import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Heading, Text } from "@/components/ui/Typography/Typography";

export interface ApproachBlock {
  /** Optional — CMS paragraphs arrive without headings. */
  heading?: string;
  body: string;
}

interface SpecialistApproachProps {
  /** The specialist's name, repeated as the accent eyebrow over the title. */
  eyebrow: string;
  title: string;
  intro: string;
  blocks: ApproachBlock[];
}

/*
 * "The Medical Approach" editorial on the specialist profile (production
 * pages): the name as an accent eyebrow at grid column 4, the display serif
 * title across the full container, the indented lead paragraph, then the
 * method blocks in the 480px offset column — heading, 16px gap, body, 64px
 * between blocks. Measured rhythm: eyebrow → title 32px, title → intro 56px,
 * intro → blocks 120px.
 */
export function SpecialistApproach({
  eyebrow,
  title,
  intro,
  blocks,
}: SpecialistApproachProps) {
  return (
    <Section paddingTop="md" paddingBottom="none">
      <Container className="flex flex-col desktop:grid desktop:grid-cols-12">
        <Reveal className="desktop:col-span-9 desktop:col-start-4">
          <Heading as="p" preset="sans-md" tone="accent">
            {eyebrow}
          </Heading>
        </Reveal>
        <Reveal className="mt-8 desktop:col-span-12">
          <Heading as="h2" preset="display" tone="primary">
            {title}
          </Heading>
        </Reveal>
        <Reveal className="mt-10 desktop:col-span-9 desktop:col-start-4 desktop:mt-14">
          <p className="text-sans-sm text-primary desktop:[text-indent:calc(20%+16px)]">
            {intro}
          </p>
        </Reveal>
        <div className="mt-16 flex flex-col gap-12 desktop:col-span-8 desktop:col-start-4 desktop:mt-[120px] desktop:gap-16">
          {blocks.map((block, index) => (
            <Reveal key={index} className="flex max-w-[480px] flex-col gap-4">
              {block.heading ? (
                <Heading as="h3" preset="sans-lg">
                  {block.heading}
                </Heading>
              ) : null}
              <Text size="md" tone="secondary">
                {block.body}
              </Text>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
