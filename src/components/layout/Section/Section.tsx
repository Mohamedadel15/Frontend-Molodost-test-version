import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionPadding = "none" | "sm" | "md" | "lg";

const paddingClasses: Record<SectionPadding, string> = {
  none: "",
  sm: "py-(--space-section-sm)",
  md: "py-(--space-section-md)",
  lg: "py-(--space-section-lg)",
};

const paddingTopClasses: Record<SectionPadding, string> = {
  none: "",
  sm: "pt-(--space-section-sm)",
  md: "pt-(--space-section-md)",
  lg: "pt-(--space-section-lg)",
};

const paddingBottomClasses: Record<SectionPadding, string> = {
  none: "",
  sm: "pb-(--space-section-sm)",
  md: "pb-(--space-section-md)",
  lg: "pb-(--space-section-lg)",
};

interface SectionProps {
  id?: string;
  /** Symmetric block padding from the section rhythm scale (design-inventory §5). */
  padding?: SectionPadding;
  /** Override top/bottom independently (several reference sections pad one side only). */
  paddingTop?: SectionPadding;
  paddingBottom?: SectionPadding;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  padding,
  paddingTop,
  paddingBottom,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        padding && paddingClasses[padding],
        paddingTop && paddingTopClasses[paddingTop],
        paddingBottom && paddingBottomClasses[paddingBottom],
        className,
      )}
    >
      {children}
    </section>
  );
}
