"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

/*
 * FAQ accordion (design-inventory §12.14, animations.md §9): white 16px-radius
 * cards 8px apart, plus icon at inline-end rotating 45° when open, height
 * animation via the grid 0fr/1fr technique. One item open at a time, the first
 * open on load — as the reference ships it.
 */
export function Accordion({ items }: AccordionProps) {
  /* the reference ships the first row open */
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => {
        const open = item.id === openId;
        return (
          <div key={item.id} className="rounded-[16px] bg-background p-6">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 text-start"
              >
                <span className="text-body-lg font-semibold text-primary">
                  {item.question}
                </span>
                <svg
                  aria-hidden
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className={cn(
                    "shrink-0 text-secondary transition-transform duration-(--motion-fast) ease-(--ease-inout)",
                    open && "rotate-45",
                  )}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </button>
            </h3>
            <div
              id={`faq-${item.id}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-(--motion-normal) ease-(--ease-inout)",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[600px] pt-3 text-body text-secondary">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
