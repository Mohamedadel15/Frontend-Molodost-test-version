import Image from "next/image";
import type { CSSProperties } from "react";

import { AppearIn } from "@/components/animations/AppearIn";
import { Reveal } from "@/components/animations/Reveal";
import { LotusIcon } from "@/components/decor/BrandIcons";
import { BlobOutline, WaveLines } from "@/components/decor/RefLines";
import { Container } from "@/components/layout/Container/Container";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import { cn } from "@/lib/cn";

export interface ArticleSection {
  heading: string;
  body: string;
}

interface ArticleLayoutProps {
  title: string;
  lede: string;
  date: string;
  image: { src: string };
  sections: ArticleSection[];
  /** Pull quote — production sets it after the second section. */
  quote?: string;
  attribution?: string;
}

// production article mask (314×236), copied from the reference site
const MASK: CSSProperties = {
  maskImage: "url(/images/article-mask.svg)",
  WebkitMaskImage: "url(/images/article-mask.svg)",
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

/** Blob-masked article image with the 128px grain at 10% (production "Image Container A"). */
function ArticleImage({
  src, alt, className, style, priority = false,
}: { src: string; alt: string; className?: string; style?: CSSProperties; priority?: boolean }) {
  return (
    <span className={cn("relative block aspect-[314/236] w-full overflow-hidden", className)} style={{ ...MASK, ...style }}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1200px) 45vw, 640px" className="object-cover" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-repeat opacity-10"
        style={{ backgroundImage: "url('/images/texture-a.png')", backgroundSize: "128px auto" }}
      />
    </span>
  );
}

/*
 * /journal/[slug] — production article template. Desktop: the masked image
 * sits in a sticky, viewport-tall column (6 of 12), a one-column gutter, then
 * the text column (5): an intro block that is itself viewport-tall with its
 * content vertically centred — the 64px accent icon (drops from above at
 * 0.4s), 56px, the serif-xl headline capped at 720px (rises at 0.4s), 32px,
 * the 20px lede capped at 480px (0.6s) — the 14px muted date under it
 * (0.8s), then the rich text 64px below and the attribution line, with a
 * 140px tail. Below desktop the image (with its blob stroke) stacks above
 * the text, capped at 640px, under a 120px top pad.
 *
 * Rich-text rhythm is the reference's paragraph spacing: the first heading on
 * the 34px/600 preset, later ones on the 28px/500 preset 40px below the
 * previous paragraph, body 16px below its heading, and the pull quote —
 * 48px/500 accent behind a 2px accent rule, 42px inset — after the second
 * section. The waves fade in over the first viewport like the other inner
 * pages.
 */
export function ArticleLayout({ title, lede, date, image, sections, quote, attribution }: ArticleLayoutProps) {
  const quoteAfter = sections.length >= 3 ? 1 : sections.length - 1;

  return (
    /* no overflow clip on the section itself — it would disable the sticky
       image column; the waves clip inside their own wrapper */
    <section className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-svh overflow-hidden desktop:block">
        <AppearIn slow from="fade" className="h-full">
          <WaveLines className="absolute left-[calc(50%-3000px)] top-[calc(50%-340px)] h-[680px] w-[6000px]" />
        </AppearIn>
      </div>

      <Container className="relative flex flex-col items-center pt-[120px] desktop:flex-row desktop:items-start desktop:pt-0">
        {/* image column — sticky for the whole article on desktop */}
        <div className="hidden desktop:sticky desktop:top-0 desktop:flex desktop:min-h-svh desktop:flex-[6] desktop:items-center desktop:justify-center">
          <AppearIn from="fade" className="w-full px-2">
            {/* production: the frame is 75% of the viewport height (aspect 1.33) */}
            <ArticleImage src={image.src} alt={title} priority className="mx-auto" style={{ maxWidth: "calc(75svh * 1.3305)" }} />
          </AppearIn>
        </div>
        <div aria-hidden className="hidden desktop:block desktop:flex-1" />

        {/* touch image */}
        <AppearIn from="fade" className="relative w-full max-w-[640px] desktop:hidden">
          <BlobOutline variant={1} className="inset-0 h-full w-full -translate-x-2 translate-y-4" />
          <ArticleImage src={image.src} alt={title} priority />
        </AppearIn>

        {/* text column */}
        <div className="flex w-full flex-col px-2 desktop:flex-[5]">
          <div className="flex flex-col gap-14 pt-12 desktop:min-h-svh desktop:justify-center desktop:pt-0">
            <AppearIn from="down" delay={400}>
              <LotusIcon />
            </AppearIn>
            <div className="flex flex-col gap-8">
              <AppearIn delay={400}>
                <Heading as="h1" preset="serif-xl" className="max-w-[720px] text-balance">
                  {title}
                </Heading>
              </AppearIn>
              <AppearIn delay={600}>
                <p className="max-w-[480px] text-body-lg text-primary">{lede}</p>
              </AppearIn>
            </div>
          </div>
          <AppearIn delay={800} className="pt-4 desktop:pt-0">
            <Text size="sm" tone="muted">
              {date}
            </Text>
          </AppearIn>

          <div className="flex flex-col gap-16 pt-16 pb-20 desktop:pb-[140px]">
            <div className="flex max-w-[640px] flex-col">
              {sections.map((section, index) => (
                <div key={index} className="contents">
                  <Reveal className={index === 0 ? undefined : "mt-10"}>
                    <Heading as={index === 0 ? "h2" : "h3"} preset={index === 0 ? "sans-md" : "sans-sm"}>
                      {section.heading}
                    </Heading>
                  </Reveal>
                  <Reveal className="mt-4">
                    <Text size="md" tone="secondary">
                      {section.body}
                    </Text>
                  </Reveal>
                  {quote && index === quoteAfter ? (
                    <Reveal className="mt-10">
                      <blockquote className="relative ps-[42px] text-sans-lg text-accent before:absolute before:inset-y-0 before:start-0 before:w-0.5 before:bg-accent">
                        {quote}
                      </blockquote>
                    </Reveal>
                  ) : null}
                </div>
              ))}
            </div>
            {attribution ? (
              <Reveal>
                <Text size="sm" tone="muted" className="max-w-[480px]">
                  {attribution}
                </Text>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
