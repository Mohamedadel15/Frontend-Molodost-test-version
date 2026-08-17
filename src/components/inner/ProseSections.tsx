import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Heading, Text } from "@/components/ui/Typography/Typography";

export interface ProseBlock {
  heading?: string;
  body: string;
}

interface ProseSectionsProps {
  intro?: string;
  blocks: ProseBlock[];
  closing?: string;
}

/**
 * Narrow reading column for detail/legal pages: optional intro, then
 * heading + paragraph blocks (reference article/legal template).
 */
export function ProseSections({ intro, blocks, closing }: ProseSectionsProps) {
  return (
    <Container className="pb-(--space-section-md)">
      <div className="mx-auto flex max-w-[820px] flex-col gap-12">
        {intro ? (
          <Reveal>
            <Text size="md" tone="secondary">
              {intro}
            </Text>
          </Reveal>
        ) : null}
        {blocks.map((block, index) => (
          <Reveal key={index} className="flex flex-col gap-4">
            {block.heading ? (
              <Heading as="h2" preset="serif-md" tone="accent">
                {block.heading}
              </Heading>
            ) : null}
            <Text size="md" tone="secondary">
              {block.body}
            </Text>
          </Reveal>
        ))}
        {closing ? (
          <Reveal>
            <Text size="md" tone="secondary">
              {closing}
            </Text>
          </Reveal>
        ) : null}
      </div>
    </Container>
  );
}
