import { AppearIn } from "@/components/animations/AppearIn";
import { WaveLines } from "@/components/decor/RefLines";
import { Container } from "@/components/layout/Container/Container";
import { Eyebrow, Text } from "@/components/ui/Typography/Typography";

interface EditorialHeroProps {
  eyebrow: string;
  title: string;
  lede: string;
  intro: string;
  /**
   * The looping wave lines in the top band. /specialists turns them off —
   * its reference frame threads the waves through the card grid instead
   * (Figma 28:8239), so the hero must not double them.
   */
  waves?: boolean;
}

/*
 * Shared editorial hero for the inner pages that open on the display headline
 * (/about, /services). Structurally its own thing, not a PageHero: the
 * reference lays the headline and lede out as a 10 : 2 row, bottom-aligned,
 * and reverses their order below desktop so the lede reads first. Under it
 * sits a 3 : 9 row with the page label — desktop only — beside the lead
 * paragraph.
 *
 * Above both, a 40vh band (120px below desktop) holds the two looping wave
 * lines, 6000px wide and vertically centred in it.
 *
 * The entrance is CSS keyframes on server-rendered markup: this is the LCP
 * region and must not wait on JS.
 */
export function EditorialHero({
  eyebrow,
  title,
  lede,
  intro,
  waves = true,
}: EditorialHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {waves ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-svh overflow-hidden desktop:block"
        >
          <AppearIn slow from="fade" className="h-full">
            <WaveLines className="absolute left-0 top-[calc(50%-340px)] h-[680px] w-[6000px]" />
          </AppearIn>
        </div>
      ) : null}

      {/* top band — the fixed header floats over it */}
      <div aria-hidden className="h-[120px] desktop:h-[40vh]" />

      <div className="relative flex flex-col items-center gap-10 pb-16 tablet:gap-12 desktop:gap-16 desktop:pb-(--space-section-md)">
        <Container className="flex flex-col gap-8 desktop:flex-row desktop:items-end desktop:gap-0">
          <div className="order-2 desktop:order-1 desktop:flex-[10]">
            <AppearIn from="down" delay={400}>
              <h1 className="text-display text-accent">{title}</h1>
            </AppearIn>
          </div>
          <div className="order-1 desktop:order-2 desktop:flex-[2] desktop:self-stretch">
            <AppearIn delay={400}>
              <Text size="sm" tone="secondary">
                {lede}
              </Text>
            </AppearIn>
          </div>
        </Container>

        <Container className="flex flex-col gap-8 desktop:flex-row desktop:gap-0">
          <div className="hidden desktop:block desktop:flex-[3]">
            <AppearIn delay={400}>
              <Eyebrow tone="accent">{eyebrow}</Eyebrow>
            </AppearIn>
          </div>
          <div className="desktop:flex-[9]">
            <AppearIn delay={400}>
              {/*
                One flowing paragraph with the first line indented past the
                first column — the reference's Text Indent override. Its markup
                also carries a column-count, but on a flex container, so multicol
                never applies and the reference renders a single column.
              */}
              <h2 className="text-sans-sm text-primary desktop:[text-indent:calc(20%+16px)]">
                {intro}
              </h2>
            </AppearIn>
          </div>
        </Container>
      </div>
    </section>
  );
}
