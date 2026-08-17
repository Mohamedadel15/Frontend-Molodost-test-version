"use client";

import { StickyScene } from "@/components/animations/StickyScene";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { WaveLines } from "@/components/decor/RefLines";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/types/dictionary";

export interface HowItWorksStep {
  title: string;
  body: string;
}

interface HowItWorksProps {
  dictionary: Dictionary;
  steps: HowItWorksStep[];
}

/*
 * Giant step number, replicated from the reference mechanics: a static "0"
 * column plus a rolling 1..N digit strip that translates vertically when the
 * step changes (measured: Inter 500, −4% tracking, navy, digit cell ≈ 545px
 * at a 500px font size → 1.09em).
 */
function RollingNumber({ active, count }: { active: number; count: number }) {
  return (
    <div
      dir="ltr"
      aria-hidden
      className="flex font-(family-name:--font-inter) text-[340px] leading-none font-medium tracking-[-0.04em] text-accent select-none desktop:text-[500px]"
    >
      <span className="block">0</span>
      <span className="block h-[1.09em] overflow-hidden">
        <span
          className="flex flex-col transition-[translate] duration-700 ease-(--ease-inout)"
          style={{ translate: `0 ${-active * 1.09}em` }}
        >
          {Array.from({ length: count }, (_, i) => (
            <span key={i} className="flex h-[1.09em] items-center">
              {i + 1}
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}

/*
 * Pinned steps scene (design-inventory §12.6, animations.md §4): serif title +
 * body at inline-start, rolling navy number at inline-end, the reference's
 * "Long Line" waves as the static backdrop. Reduced motion renders the final
 * state unpinned (StickyScene).
 */
export function HowItWorks({ dictionary, steps }: HowItWorksProps) {
  const copy = dictionary.home.howItWorks;

  return (
    <Section paddingTop="md" paddingBottom="none">
      <Container>
        <Reveal>
          <h2 className="text-display">
            {copy.titlePre}{" "}
            <span className="text-accent">{copy.titleAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-10 max-w-[560px]">
          <p className="text-sans-sm text-primary">{copy.intro}</p>
        </Reveal>
      </Container>

      <StickyScene height="272svh">
        {(p) => {
          const stepCount = steps.length;
          const active = Math.min(
            stepCount - 1,
            Math.floor(p * stepCount * 0.9999),
          );

          return (
            <div className="relative h-full w-full overflow-hidden">
              {/* Reference "Long Line" waves — static within the pinned scene */}
              <WaveLines className="top-2 start-0" />

              <Container className="relative flex h-full items-center">
                <div className="grid w-full items-center gap-10 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="relative min-h-[320px]">
                    {steps.map((step, i) => {
                      const visible = i === active;
                      return (
                        <div
                          key={i}
                          className={cn(
                            "absolute inset-x-0 top-1/2 -translate-y-1/2 transition-[opacity] duration-(--motion-normal) ease-(--ease-inout)",
                            visible
                              ? "opacity-100"
                              : "pointer-events-none opacity-0",
                          )}
                          aria-hidden={!visible}
                        >
                          <h3 className="text-serif-xl text-accent">
                            {step.title}
                          </h3>
                          <p className="mt-8 max-w-[480px] text-body text-secondary">
                            {step.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative hidden h-[70svh] items-center justify-center tablet:flex">
                    <RollingNumber active={active} count={steps.length} />
                  </div>
                </div>
              </Container>
            </div>
          );
        }}
      </StickyScene>

      {/* Full step text for assistive tech (inactive steps are aria-hidden) */}
      <span className="sr-only">
        {steps.map((step) => `${step.title}. ${step.body}`).join(" ")}
      </span>
    </Section>
  );
}
