import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type Tone =
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "inverse"
  | "inverse-muted";

const toneClasses: Record<Tone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  muted: "text-muted",
  accent: "text-accent",
  inverse: "text-inverse",
  "inverse-muted": "text-inverse-muted",
};

export type HeadingPreset =
  | "display"
  | "serif-xl"
  | "serif-md"
  | "sans-xl"
  | "sans-lg"
  | "sans-md"
  | "sans-sm";

const headingPresetClasses: Record<HeadingPreset, string> = {
  display: "text-display",
  "serif-xl": "text-serif-xl",
  "serif-md": "text-serif-md",
  "sans-xl": "text-sans-xl",
  "sans-lg": "text-sans-lg",
  "sans-md": "text-sans-md",
  "sans-sm": "text-sans-sm",
};

interface HeadingProps {
  as?: ElementType;
  preset: HeadingPreset;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  id?: string;
}

/**
 * Two-tone headings (e.g. "How ␣ It Works"): pass a nested
 * <span className="text-accent"> in children — span order follows the DOM,
 * which is already correct for RTL.
 */
export function Heading({
  as: Tag = "h2",
  preset,
  tone = "primary",
  className,
  children,
  id,
}: HeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(headingPresetClasses[preset], toneClasses[tone], className)}
    >
      {children}
    </Tag>
  );
}

export type TextSize = "lg" | "md" | "sm";

const textSizeClasses: Record<TextSize, string> = {
  lg: "text-body-lg",
  md: "text-body",
  sm: "text-body-sm",
};

interface TextProps {
  as?: ElementType;
  size?: TextSize;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export function Text({
  as: Tag = "p",
  size = "md",
  tone = "primary",
  className,
  children,
}: TextProps) {
  return (
    <Tag className={cn(textSizeClasses[size], toneClasses[tone], className)}>
      {children}
    </Tag>
  );
}

interface EyebrowProps {
  as?: ElementType;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export function Eyebrow({
  as: Tag = "p",
  tone = "accent",
  className,
  children,
}: EyebrowProps) {
  return (
    <Tag className={cn("text-label", toneClasses[tone], className)}>
      {children}
    </Tag>
  );
}
