import { AppearIn } from "@/components/animations/AppearIn";
import { Reveal } from "@/components/animations/Reveal";
import { WaveLines } from "@/components/decor/RefLines";
import { Container } from "@/components/layout/Container/Container";
import { Heading, Text } from "@/components/ui/Typography/Typography";

interface LegalLayoutProps {
  title: string;
  /** "Last updated: …" — the first colon breaks onto its own line like production. */
  updated: string;
  intro: string;
  sections: Array<{ heading: string; body: string; items?: string[] }>;
}

/*
 * Legal template (production /privacy-policy and /terms-of-use): the looping
 * wave lines over the first viewport (2s fade, desktop only) above a 40vh
 * band (120px below desktop); a 10 : 2 row with the display headline and the
 * 14px "Last updated" note in the end column; 64px under it a 3 : 9 row —
 * empty lead column, then the indented 28px intro and the sections, 80px
 * apart, each a 480px block of the 34px/600 heading and its body 16px below.
 * Section closes 160px (120 / 80) above the FAQ band. Copy reveals on scroll.
 */
export function LegalLayout({ title, updated, intro, sections }: LegalLayoutProps) {
  const colon = updated.indexOf(":");
  const updatedLabel = colon > -1 ? updated.slice(0, colon + 1) : updated;
  const updatedValue = colon > -1 ? updated.slice(colon + 1).trim() : "";

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-svh overflow-hidden desktop:block">
        <AppearIn slow from="fade" className="h-full">
          <WaveLines className="absolute left-[-400px] top-[calc(50%-340px)] h-[680px] w-[6000px]" />
        </AppearIn>
      </div>

      <div aria-hidden className="h-[120px] desktop:h-[40vh]" />

      <div className="relative flex flex-col gap-12 pb-20 tablet:pb-[120px] desktop:gap-16 desktop:pb-40">
        <Container className="flex flex-col gap-6 desktop:flex-row desktop:items-start desktop:gap-0">
          <div className="px-2 desktop:flex-[10]">
            <Reveal>
              <h1 className="text-display text-primary">{title}</h1>
            </Reveal>
          </div>
          <div className="max-w-[480px] px-2 desktop:flex-[2]">
            <Reveal>
              <Text size="sm" tone="secondary">
                {updatedLabel}
                {updatedValue ? (
                  <>
                    <br />
                    {updatedValue}
                  </>
                ) : null}
              </Text>
            </Reveal>
          </div>
        </Container>

        <Container className="flex flex-col desktop:flex-row desktop:items-end">
          <div aria-hidden className="hidden desktop:block desktop:flex-[3]" />
          <div className="flex flex-col gap-12 desktop:flex-[9] desktop:gap-20">
            <Reveal className="px-2">
              <p className="text-sans-sm text-primary desktop:[text-indent:calc(20%+16px)]">{intro}</p>
            </Reveal>
            {sections.map((section, index) => (
              <Reveal key={index} className="flex max-w-[480px] flex-col gap-4 px-2">
                <Heading as="h2" preset="sans-md">
                  {section.heading}
                </Heading>
                <Text size="md" tone="secondary">
                  {section.body}
                </Text>
                {section.items?.length ? (
                  <ul className="flex list-disc flex-col gap-2 ps-6 text-body text-secondary">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
