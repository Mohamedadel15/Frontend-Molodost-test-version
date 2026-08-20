import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Text } from "@/components/ui/Typography/Typography";

interface StoryOutcomeProps {
  outcome: string;
  nextHref?: string;
  nextLabel: string;
}

/*
 * Closing block of a client story (production): the outcome paragraph in the
 * 480px column at grid column 4, then — 120px below, centred — the
 * "Read Next Story" text link: 20px/170% semibold accent with a hairline that
 * draws in from the start edge on hover. Section padding 120 / 160 on desktop
 * (90 / 120 tablet, 64 / 80 phone).
 */
export function StoryOutcome({ outcome, nextHref, nextLabel }: StoryOutcomeProps) {
  return (
    <section className="overflow-hidden pt-16 pb-20 tablet:pt-[90px] tablet:pb-[120px] desktop:pt-[120px] desktop:pb-40">
      <Container className="flex flex-col items-center gap-20 tablet:gap-[100px] desktop:gap-[120px]">
        <div className="w-full desktop:grid desktop:grid-cols-12">
          <Reveal className="max-w-[480px] desktop:col-span-6 desktop:col-start-4">
            <Text tone="secondary">{outcome}</Text>
          </Reveal>
        </div>
        {nextHref ? (
          <Reveal>
            <Link
              href={nextHref}
              className="group relative inline-block pb-1 text-body-lg font-semibold text-accent"
            >
              {nextLabel}
              <span
                aria-hidden
                className="absolute bottom-0 start-0 h-px w-0 bg-accent transition-[width] duration-(--motion-normal) ease-(--ease-inout) group-hover:w-full"
              />
            </Link>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
