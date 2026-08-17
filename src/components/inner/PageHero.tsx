import type { ReactNode } from "react";

import { Reveal } from "@/components/animations/Reveal";
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
 * Inner-page hero (reference inner pages): label, serif headline, lede on the
 * light background, offset below the fixed header.
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
          <Reveal>
            <Eyebrow tone="accent">{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delay={80}>
          <Heading as="h1" preset="serif-xl" className="max-w-[1000px]">
            {title}
          </Heading>
        </Reveal>
        {lede ? (
          <Reveal delay={160}>
            <Text
              size="md"
              tone="secondary"
              className={cn("max-w-[720px]", centered && "mx-auto")}
            >
              {lede}
            </Text>
          </Reveal>
        ) : null}
        {children ? <Reveal delay={220}>{children}</Reveal> : null}
      </Container>
    </section>
  );
}
