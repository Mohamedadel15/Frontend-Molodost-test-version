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
 * parallax beside a quote set off by a 2px accent rule, the portrait column
 * dropped 160px so the quote sits above it — the columns are 5:4 with 1-unit
 * gutters that fall away as the viewport narrows, and the whole thing stacks at
 * phone (text first).
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
      <Container className="mx-auto max-w-[1600px] desktop:ps-[25%]">
        <div className="flex flex-col gap-4">
          <Reveal>
            <Heading as="h2" preset="serif-xl">
              {title}
            </Heading>
          </Reveal>
          <Reveal>
            <Text size="md" tone="secondary">
              {body}
            </Text>
          </Reveal>
        </div>
      </Container>

      <Container className="mx-auto flex max-w-[1600px] flex-col gap-12 tablet:flex-row tablet:items-start">
        {/* start gutter — desktop only, matching the reference's 1:5:1:4 split */}
        <div aria-hidden className="hidden desktop:block desktop:flex-[1]" />

        <div className="tablet:flex-[5] desktop:pt-(--space-section-md)">
          <Reveal>
            <ParallaxImage
              src={image}
              travel={300}
              sizes="(min-width: 1200px) 30vw, (min-width: 810px) 45vw, 100vw"
              className="h-[400px] w-full tablet:aspect-[0.668712] tablet:h-[534px] desktop:h-[654px]"
            />
          </Reveal>
        </div>

        <div aria-hidden className="hidden tablet:block tablet:flex-[1]" />

        <div className="tablet:flex-[4]">
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
