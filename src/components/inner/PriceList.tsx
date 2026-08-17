"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Text } from "@/components/ui/Typography/Typography";
import { priceCurrency } from "@/content/services";
import { pendingCategories, priceCategories } from "@/content/prices";
import { pick } from "@/content/types";
import { cn } from "@/lib/cn";

interface PriceListProps {
  locale: "en" | "ar";
  bookHref: string;
  copy: {
    comingSoon: string;
    bookNow: string;
  };
}

interface Tab {
  id: string;
  label: string;
  categoryIndex: number | null;
}

/**
 * /prices category tabs + item list (reference prices template). Categories
 * without published data show the coming-soon note (design-inventory §17).
 */
export function PriceList({ locale, bookHref, copy }: PriceListProps) {
  const tabs: Tab[] = [
    ...priceCategories.map((category, index) => ({
      id: category.id,
      label: pick(category.label, locale),
      categoryIndex: index,
    })),
    ...pendingCategories.map((label, index) => ({
      id: `pending-${index}`,
      label: pick(label, locale),
      categoryIndex: null,
    })),
  ];
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const category =
    active?.categoryIndex != null ? priceCategories[active.categoryIndex] : null;

  return (
    <Section paddingBottom="md">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={tab.id === active?.id}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "rounded-pill px-5 py-2 text-label whitespace-nowrap",
                "transition-[background-color,color] duration-(--motion-fast) ease-(--ease-inout)",
                tab.id === active?.id
                  ? "bg-accent text-inverse"
                  : "bg-surface text-secondary hover:text-accent",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {category ? (
          <ul className="mx-auto flex w-full max-w-[1060px] flex-col">
            {category.items.map((item, index) => (
              <li
                key={index}
                className="flex flex-col gap-4 border-b border-[rgba(46,50,49,0.1)] py-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-10"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-body-md text-primary">
                    {pick(item.name, locale)}
                  </p>
                  {item.note ? (
                    <p className="text-body-sm text-muted">
                      {pick(item.note, locale)}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-6">
                  {item.amount != null ? (
                    <p className="text-sans-sm text-accent">
                      <span dir="ltr">
                        {priceCurrency} {item.amount}
                      </span>
                    </p>
                  ) : null}
                  <ButtonLink href={bookHref} variant="navy">
                    {copy.bookNow}
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Text
            size="md"
            tone="secondary"
            className="mx-auto max-w-[640px] text-center"
          >
            {copy.comingSoon}
          </Text>
        )}
      </Container>
    </Section>
  );
}
