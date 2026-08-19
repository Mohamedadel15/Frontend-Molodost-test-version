import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Content gutters (design-inventory §5): 64 / 40 / 16px inline via
 * --container-gutter, capped at 1600px and centred — every section row on the
 * reference carries `max-width: 1600px`, which settles Open Questions #10.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1600px] px-(--container-gutter)",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
