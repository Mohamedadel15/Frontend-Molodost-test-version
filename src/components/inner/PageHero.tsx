import type { ReactNode } from "react";

import { AppearIn } from "@/components/animations/AppearIn";
import { Container } from "@/components/layout/Container/Container";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "center" | "start";
  /** Extra row under the lede (meta line, CTA, …). */
  children?: ReactNode;
}

/**
 * Inner-page hero (reference inner pages): label, headline, lede on the light
 * background, offset below the fixed header.
 *
 * The entrance is CSS keyframes on server-rendered markup, not a scroll reveal
 * — this is the LCP region and must be visible without JS (animations.md §1).
 * Delays are the measured entrance timeline: headline drops in from above at
 * 400ms while the lede rises into place on the same beat.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  align = "center",
  children,
}: PageHeroProps) {
  const centered = align === "center";
  return (
    <section className="pt-[calc(var(--header-height)+96px)] pb-(--space-section-sm)">
      <Container
        className={cn(
          "flex flex-col gap-8",
          centered ? "items-center text-center" : "items-start text-start",
        )}
      >
        {eyebrow ? (
          <AppearIn delay={400}>
            <Eyebrow tone="accent">{eyebrow}</Eyebrow>
          </AppearIn>
        ) : null}
        <AppearIn from="down" delay={400}>
          <Heading as="h1" preset="serif-xl" className="max-w-[1000px]">
            {title}
          </Heading>
        </AppearIn>
        {lede ? (
          <AppearIn delay={400}>
            <Text
              size="md"
              tone="secondary"
              className={cn("max-w-[720px]", centered && "mx-auto")}
            >
              {lede}
            </Text>
          </AppearIn>
        ) : null}
        {children ? <AppearIn delay={600}>{children}</AppearIn> : null}
      </Container>
    </section>
  );
}
