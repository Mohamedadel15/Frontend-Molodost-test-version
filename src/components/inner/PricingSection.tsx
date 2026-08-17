"use client";

import { useState } from "react";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import { priceCurrency, pricingTiers } from "@/content/services";
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
}

/**
 * /services pricing tiers with the ONE / UP TO +3 (20% off) switch
 * (reference services template). Client component — the toggle swaps the
 * displayed amount per tier.
 */
export function PricingSection({ locale, bookHref, copy }: PricingSectionProps) {
  const [bundle, setBundle] = useState(false);

  const options = [
    { key: "one", label: copy.toggleOne, active: !bundle },
    { key: "bundle", label: copy.toggleBundle, active: bundle },
  ];

  return (
    <Section paddingTop="md" paddingBottom="md" className="bg-surface">
      <Container className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Heading as="h2" preset="sans-lg" className="max-w-[900px]">
            {copy.title}
          </Heading>
        </Reveal>
        <Reveal delay={140}>
          <Text size="md" tone="secondary" className="max-w-[640px]">
            {copy.body}
          </Text>
        </Reveal>
        <Reveal delay={200}>
          <div
            role="group"
            className="flex items-center gap-1 rounded-pill bg-background p-1 shadow-[0_0_0_1px_rgba(46,50,49,0.08)]"
          >
            {options.map((option) => (
              <button
                key={option.key}
                type="button"
                aria-pressed={option.active}
                onClick={() => setBundle(option.key === "bundle")}
                className={cn(
                  "rounded-pill px-5 py-2 text-label whitespace-nowrap",
                  "transition-[background-color,color] duration-(--motion-fast) ease-(--ease-inout)",
                  option.active
                    ? "bg-accent text-inverse"
                    : "text-secondary hover:text-accent",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Reveal>
      </Container>
      <Container className="mt-16 grid items-stretch gap-6 desktop:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <Reveal
            key={tier.id}
            delay={index * 100}
            className="flex flex-col gap-6 rounded-[16px] bg-background p-10"
          >
            <h3 className="text-serif-md text-accent">{pick(tier.title, locale)}</h3>
            <p className="text-body-sm text-secondary">{pick(tier.tagline, locale)}</p>
            <ul className="flex flex-col gap-3 text-start">
              {tier.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-baseline gap-3 text-body-sm text-secondary"
                >
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 translate-y-[-2px] rounded-pill bg-accent"
                  />
                  {pick(feature, locale)}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-4 text-sans-md text-accent">
              <span dir="ltr">
                {priceCurrency} {bundle ? tier.priceBundle : tier.priceOne}
              </span>
            </p>
            <ButtonLink href={bookHref} variant="navy" className="self-center">
              {copy.bookNow}
            </ButtonLink>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
