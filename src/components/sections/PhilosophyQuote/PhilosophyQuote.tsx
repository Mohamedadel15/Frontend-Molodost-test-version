import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Heading, Text } from "@/components/ui/Typography/Typography";

interface PhilosophyQuoteProps {
  title: string;
  body: string;
  /** Quote opening, in primary ink. */
  quoteLead: string;
  /** Quote close, in accent navy — the reference sets the second clause apart. */
  quoteAccent: string;
  attribution: string;
  image: string;
  id?: string;
  quoteId?: string;
}

/*
 * Clinical philosophy + founder quote (/about, reference section #meet-anna).
 *
 * Two stacked blocks. The first is a start-aligned serif statement inset a
 * quarter of the way in at desktop. The second is a portrait with vertical
 * parallax beside a quote set off by a 2px accent rule. Figma drops the
 * portrait column 160px (node 2:8665, top y=160) and the quote column 320px
 * (node 2:8670), so the quote's rule starts 160px BELOW the portrait's top
 * edge — the columns are 5:4 with 1-unit gutters that fall away as the
 * viewport narrows, and the whole thing stacks at phone (text first).
 */
export function PhilosophyQuote({
  title,
  body,
  quoteLead,
  quoteAccent,
  attribution,
  image,
  id,
  quoteId,
}: PhilosophyQuoteProps) {
  return (
    <section
      id={id}
      /* reference pads 160 top+bottom at desktop, top-only below it */
      className="flex flex-col items-center gap-10 overflow-hidden pt-(--space-section-md) tablet:gap-12 desktop:gap-(--space-section-md) desktop:pb-(--space-section-md)"
    >
      <Container className="mx-auto max-w-[1600px]">
        {/* Inset three of the reference's twelve columns (3 cols + 3 × 16px
            gutters = 25.27% of the container's content box), so the block
            starts on column 4 rather than a quarter of the full viewport. */}
        <div className="flex flex-col gap-4 desktop:ps-[25.27%]">
          <Reveal>
            <Heading as="h2" preset="serif-xl">
              {title}
            </Heading>
          </Reveal>
          <Reveal>
            {/* the reference caps the lead paragraph well short of the column */}
            <Text size="md" tone="secondary" className="max-w-[640px]">
              {body}
            </Text>
          </Reveal>
        </div>
      </Container>

      {/* At desktop this is the reference's own twelve-column grid with 16px
          gutters: portrait on columns 2–6, quote on 8–11. Below it, the
          simpler 5 : 1 : 4 flex row. */}
      <Container className="mx-auto flex max-w-[1600px] flex-col gap-12 tablet:flex-row tablet:items-start desktop:grid desktop:grid-cols-12 desktop:gap-4">
        <div className="tablet:flex-[5] desktop:col-span-5 desktop:col-start-2 desktop:pt-(--space-section-md)">
          <Reveal>
            <ParallaxImage
              src={image}
              travel={300}
              sizes="(min-width: 1200px) 30vw, (min-width: 810px) 45vw, 100vw"
              className="relative h-[400px] w-full tablet:aspect-[0.668712] tablet:h-auto"
            />
          </Reveal>
        </div>

        <div aria-hidden className="hidden tablet:block tablet:flex-[1] desktop:hidden" />

        {/* 2 × 160 = the 320px Figma sets on the quote Section (2:8670), one
            unit more than the portrait beside it */}
        <div className="tablet:flex-[4] desktop:col-span-4 desktop:col-start-8 desktop:pt-[calc(var(--space-section-md)*2)]">
          <Reveal>
            <blockquote
              id={quoteId}
              className="m-0 flex flex-col gap-5 border-s-2 border-accent ps-10 tablet:gap-[22px] desktop:gap-6"
            >
              <p className="text-sans-md text-primary">
                {quoteLead} <span className="text-accent">{quoteAccent}</span>
              </p>
              <footer className="text-body-sm text-muted">{attribution}</footer>
            </blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
