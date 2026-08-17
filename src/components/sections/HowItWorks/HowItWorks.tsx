"use client";

import { StickyScene } from "@/components/animations/StickyScene";
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
 * Giant step number: static "0" + rolling digit strip (reference mechanics —
 * Inter 500, −4% tracking, navy, digit cell ≈ 1.09em at 500px).
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
          className="flex flex-col transition-[translate] duration-[900ms] ease-(--ease-inout)"
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
 * Pinned How It Works scene, restructured to match production: the display
 * heading + indented intro are STAGE 0 of the pinned scene, followed by the
 * three numbered steps — everything shares the pinned "Long Line" backdrop.
 * Reduced motion renders the final state unpinned (StickyScene).
 */
export function HowItWorks({ dictionary, steps }: HowItWorksProps) {
  const copy = dictionary.home.howItWorks;
  const stageCount = steps.length + 1; // heading stage + steps

  return (
    <Section paddingTop="none" paddingBottom="none">
      <StickyScene height="430svh">
        {(p) => {
          const stage = Math.min(
            stageCount - 1,
            Math.floor(p * stageCount * 0.9999),
          );
          const activeStep = Math.max(0, stage - 1);

          return (
            <div className="relative h-full w-full overflow-hidden">
              {/* Reference "Long Line" waves — pinned behind all stages */}
              <WaveLines className="top-2 start-0" />

              {/* Stage 0 — heading + indented intro (production layout) */}
              <Container
                className={cn(
                  "absolute inset-x-0 top-0 flex h-full flex-col justify-center gap-14",
                  "transition-opacity duration-[700ms] ease-(--ease-inout)",
                  stage === 0 ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                aria-hidden={stage !== 0}
              >
                <h2 className="text-display">
                  {copy.titlePre}{" "}
                  <span className="text-accent">{copy.titleAccent}</span>
                </h2>
                {/* Indented paragraph, offset toward the end (production) */}
                <p className="max-w-[1060px] self-end text-sans-sm text-primary [text-indent:16%]">
                  {copy.intro}
                </p>
              </Container>

              {/* Stages 1..n — steps + rolling number */}
              <Container
                className={cn(
                  "relative flex h-full items-center",
                  "transition-opacity duration-[700ms] ease-(--ease-inout)",
                  stage > 0 ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                aria-hidden={stage === 0}
              >
                <div className="grid w-full items-center gap-10 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="relative min-h-[320px]">
                    {steps.map((step, i) => {
                      const visible = stage > 0 && i === activeStep;
                      return (
                        <div
                          key={i}
                          className={cn(
                            "absolute inset-x-0 top-1/2 -translate-y-1/2 transition-[opacity] duration-[700ms] ease-(--ease-inout)",
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
                    <RollingNumber active={activeStep} count={steps.length} />
                  </div>
                </div>
              </Container>
            </div>
          );
        }}
      </StickyScene>

      {/* Full content for assistive tech (stages are aria-hidden while inactive) */}
      <span className="sr-only">
        {copy.titlePre} {copy.titleAccent}. {copy.intro}{" "}
        {steps.map((step) => `${step.title}. ${step.body}`).join(" ")}
      </span>
    </Section>
  );
}
