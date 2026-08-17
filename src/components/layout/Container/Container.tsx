import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Content gutters (design-inventory §5): 64px inline at desktop, scaling down
 * on smaller viewports via --container-gutter. No max-width — the reference
 * is fluid up to at least 1600px (behavior above 1600px: Open Questions #10).
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("w-full px-(--container-gutter)", className)}>
      {children}
    </Tag>
  );
}
