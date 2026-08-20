import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import { cn } from "@/lib/cn";

interface SpecialistPortraitProps {
  image: { src: string };
  alt: string;
  quote: string;
  attribution: string;
  /**
   * Which column carries the 120px (story: 160px) top drop. Specialist
   * profiles drop the quote; client stories drop the photo instead.
   */
  offset?: "quote" | "image";
  /** Start rule beside the quote: 1px hairline (profiles) or 2px accent (stories). */
  rule?: "hairline" | "accent";
  noiseOpacity?: number;
}

/*
 * Uniform portrait + pull quote on the specialist profile (production pages):
 * the standing studio shot on columns 2–6 with a slow vertical parallax, the
 * quote on columns 8–11 behind a hairline start rule, dropped 120px below the
 * photo's top edge. The measured frame is ~571×1000 (≈4:7) with the image
 * sliding ~150px through it.
 */
export function SpecialistPortrait({
  image,
  alt,
  quote,
  attribution,
  offset = "quote",
  rule = "hairline",
  noiseOpacity = 0.1,
}: SpecialistPortraitProps) {
  return (
    <Section paddingTop="none" paddingBottom="none">
      <Container className="grid gap-12 tablet:grid-cols-12 tablet:gap-x-10 desktop:gap-x-0">
        <Reveal className={cn("tablet:col-span-6 desktop:col-span-5 desktop:col-start-2", offset === "image" && "desktop:mt-40")}>
          <ParallaxImage
            src={image.src}
            alt={alt}
            travel={150}
            travelTablet={100}
            noiseOpacity={noiseOpacity}
            sizes="(min-width: 1200px) 38vw, (min-width: 810px) 50vw, 92vw"
            className="relative aspect-[4/7] w-full max-w-[571px]"
          />
        </Reveal>
        <div className={cn("tablet:col-span-6 desktop:col-span-4 desktop:col-start-8", offset === "quote" && "desktop:mt-[120px]")}>
          <Reveal
            className={cn(
              "flex flex-col gap-6 ps-8 desktop:ps-10",
              rule === "accent" ? "border-s-2 border-accent" : "border-s border-primary/15",
            )}
          >
            <Heading as="blockquote" preset="sans-md" tone="primary">
              {quote}
            </Heading>
            <Text size="sm" tone="muted">
              — {attribution}
            </Text>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
