"use client";

import { useId, useState } from "react";

import { RollingNumber } from "@/components/animations/RollingNumber";
import { Reveal } from "@/components/animations/Reveal";
import { WavesIcon } from "@/components/decor/BrandIcons";
import { CircledWord } from "@/components/decor/CircledWord";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import { priceCurrency, pricingTiers as staticTiers, type PricingTier } from "@/content/services";
import { pick } from "@/content/types";
import { cn } from "@/lib/cn";

interface PricingSectionProps {
  locale: "en" | "ar";
  bookHref: string;
  copy: {
    eyebrow: string;
    title: string;
    body: string;
    toggleOne: string;
    toggleBundle: string;
    bookNow: string;
  };
  /** CMS programs mapped to tiers; the static tiers when omitted. */
  tiers?: PricingTier[];
}

/*
 * The reference circles the tail of the pricing title — "your biology." in
 * "Programs built around your biology." Taking the last two whitespace-run
 * words reproduces that from the copy prop instead of hardcoding English, and
 * lands on "حول بيولوجيتك." in the Arabic dictionary, which is the same
 * phrase. A title of two words or fewer is circled whole so the lead never
 * swallows the entire string and the ellipse never wraps nothing.
 */
const CIRCLED_TAIL_WORDS = 2;

function splitCircledTail(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length <= CIRCLED_TAIL_WORDS) {
    return { lead: "", tail: words.join(" ") };
  }
  return {
    lead: words.slice(0, -CIRCLED_TAIL_WORDS).join(" "),
    tail: words.slice(-CIRCLED_TAIL_WORDS).join(" "),
  };
}

/** Circled check bullet — the Accordion plus icon's geometry (24px box, r9 ring, 1px stroke). */
function CheckMark() {
  return (
    <svg
      aria-hidden
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="shrink-0 text-accent"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

/**
 * /services pricing tiers with the ONE / UP TO +3 (20% off) switch
 * (reference services template). Client component — flipping the switch rolls
 * every tier's amount to its discounted figure.
 */
export function PricingSection({ locale, bookHref, copy, tiers: pricingTiers = staticTiers }: PricingSectionProps) {
  const [bundle, setBundle] = useState(false);
  const bundleLabelId = useId();
  const { lead, tail } = splitCircledTail(copy.title);

  return (
    <Section paddingTop="md" paddingBottom="md" className="bg-surface">
      <Container className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <WavesIcon />
        </Reveal>
        <Reveal delay={80}>
          <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={140}>
          <Heading as="h2" preset="sans-lg" className="max-w-[900px]">
            {lead ? `${lead} ` : null}
            {tail ? <CircledWord>{tail}</CircledWord> : null}
          </Heading>
        </Reveal>
        <Reveal delay={200}>
          <Text size="md" tone="secondary" className="max-w-[640px]">
            {copy.body}
          </Text>
        </Reveal>
        <Reveal delay={260}>
          {/* Both labels stay visible and flank the track (reference); the track
              itself carries the state, the label tint only reinforces it. */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={cn(
                "text-label transition-colors duration-(--motion-fast) ease-(--ease-inout)",
                bundle ? "text-muted" : "text-primary",
              )}
            >
              {copy.toggleOne}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={bundle}
              /* The switch turns the bundle price ON, so the bundle label names
                 it — pointing at the visible text keeps label-in-name intact. */
              aria-labelledby={bundleLabelId}
              onClick={() => setBundle((current) => !current)}
              className={cn(
                // measured track 64x32, knob 24 → 4px inset, 32px of travel
                "flex h-8 w-16 shrink-0 items-center rounded-pill p-1",
                "transition-colors duration-(--motion-fast) ease-(--ease-inout)",
                // no neutral token exists (--color-* is reset); primary ink at
                // low alpha, same convention as the hairline outlines
                bundle ? "bg-accent" : "bg-[rgba(46,50,49,0.14)]",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-6 rounded-pill bg-background",
                  "transition-transform duration-(--motion-fast) ease-(--ease-inout)",
                  // transforms do not mirror on their own — flip in RTL, as
                  // MobileMenu's drawer does
                  bundle ? "translate-x-8 rtl:-translate-x-8" : "translate-x-0",
                )}
              />
            </button>
            <span
              id={bundleLabelId}
              className={cn(
                "text-label transition-colors duration-(--motion-fast) ease-(--ease-inout)",
                bundle ? "text-primary" : "text-muted",
              )}
            >
              {copy.toggleBundle}
            </span>
          </div>
        </Reveal>
      </Container>
      <Container className="mt-16 grid items-stretch gap-6 desktop:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          /* Card styling lives on an inner element: a `transition-*` utility on
             the Reveal node would replace its opacity transition outright, since
             utilities outrank the .reveal component layer. */
          <Reveal key={tier.id} delay={index * 100} className="flex">
            <article
              className={cn(
                "flex flex-1 flex-col gap-10 rounded-[16px] bg-background p-8 text-start",
                "transition-shadow duration-(--motion-fast) ease-(--ease-inout)",
                "hover:shadow-[0_0_0_1px_rgba(46,50,49,0.12)]",
              )}
            >
              <h3 className="text-serif-md text-primary">{pick(tier.title, locale)}</h3>
              <p className="text-body-sm text-secondary">{pick(tier.tagline, locale)}</p>
              <p>
                {/* Reference price is 48px Inter 500. text-sans-lg is the only
                    500-weight sans utility and lands at 44px on desktop (48px
                    ≥1600) — nearest existing step, no new utility invented. */}
                <RollingNumber
                  value={bundle ? tier.priceBundle : tier.priceOne}
                  prefix={`${priceCurrency} `}
                  className="text-sans-lg text-accent"
                />
              </p>
              <ul className="flex flex-col gap-3">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 text-body-sm text-secondary"
                  >
                    <CheckMark />
                    {pick(feature, locale)}
                  </li>
                ))}
              </ul>
              {/* mt-auto lines the three CTAs up despite unequal feature counts */}
              <ButtonLink href={bookHref} variant="navy" className="mt-auto self-start">
                {copy.bookNow}
              </ButtonLink>
            </article>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
