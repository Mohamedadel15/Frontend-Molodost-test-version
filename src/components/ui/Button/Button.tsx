import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "navy" | "white";

/*
 * Pill CTA (design-inventory §7): 39px tall, 999px radius, label 12/600/uppercase,
 * asymmetric padding (20px label side / 48px dot side). Hover inverts colors and
 * the dot travels to the opposite end — pure CSS, so this stays a Server
 * Component; logical properties make RTL mirroring automatic.
 *
 * Resting dot side is variant-specific per the measured header states (§6):
 * navy pill = dot at inline-end, white pill = dot at inline-start; hovering
 * swaps to the other configuration (colors and dot together).
 *
 * Deferred: the `slate` variant (Story B CTA — exact color to be sampled at
 * build time, §7) and disabled/loading styling (Phase 12 forms).
 */
const baseClasses = cn(
  "group relative inline-flex h-(--button-height) items-center justify-center",
  "rounded-pill text-label whitespace-nowrap select-none",
  "transition-[background-color,color,padding,box-shadow]",
  "duration-(--motion-fast) ease-(--ease-inout)",
);

const variantClasses: Record<ButtonVariant, string> = {
  navy: cn(
    "ps-5 pe-12 hover:ps-12 hover:pe-5",
    "bg-accent text-inverse",
    // hover surface is white — hairline keeps it visible on light sections
    // (hover treatment on light backgrounds unverified, see design-inventory §7)
    "hover:bg-background hover:text-accent hover:shadow-[0_0_0_1px_rgba(46,50,49,0.12)]",
  ),
  white: cn(
    "ps-12 pe-5 hover:ps-5 hover:pe-12",
    "bg-background text-accent",
    "hover:bg-accent hover:text-inverse",
  ),
};

const dotBase =
  "absolute size-(--button-dot-size) rounded-pill bg-current transition-opacity duration-(--motion-fast)";

function ButtonInner({
  variant,
  children,
}: {
  variant: ButtonVariant;
  children: ReactNode;
}) {
  const startDotVisible = variant === "white";
  return (
    <>
      <span
        aria-hidden
        className={cn(
          dotBase,
          "start-(--button-dot-inset)",
          startDotVisible
            ? "opacity-100 group-hover:opacity-0"
            : "opacity-0 group-hover:opacity-100",
        )}
      />
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          dotBase,
          "end-(--button-dot-inset)",
          startDotVisible
            ? "opacity-0 group-hover:opacity-100"
            : "opacity-100 group-hover:opacity-0",
        )}
      />
    </>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "navy",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...rest}
    >
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
}

export function ButtonLink({
  href,
  variant = "navy",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...rest}
    >
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </Link>
  );
}
