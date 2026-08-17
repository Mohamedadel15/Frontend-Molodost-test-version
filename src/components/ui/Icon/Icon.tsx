import { cn } from "@/lib/cn";

export type IconName =
  | "instagram"
  | "threads"
  | "facebook"
  | "whatsapp"
  | "phone"
  | "mail"
  | "menu"
  | "close";

/*
 * Interim 1.5px-stroke glyphs approximating the reference's line icons.
 * To be replaced when original assets are exported (design-inventory §17 #4).
 */
const paths: Record<IconName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  threads: (
    <>
      <path d="M12 21c-4.6 0-7.5-2.9-7.5-9S7.4 3 12 3c3.9 0 6.5 2 7.2 5.4" />
      <path d="M12 13.6c2.6-1.1 6-.5 6 2.2 0 2.4-2.2 3.7-4.4 3.4-2-.3-3.1-1.7-2.9-4.6.2-3 1.4-4.6 3.5-4.6 1.7 0 2.8 1 3.1 2.6" />
    </>
  ),
  facebook: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M13.5 21v-7h2.4l.5-2.7h-2.9V9.6c0-1 .4-1.6 1.6-1.6h1.4V5.6c-.5-.1-1.3-.1-2-.1-2.1 0-3.5 1.2-3.5 3.6v2.2H8.6V14H11v7" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
      <path d="M8.8 8.6c-.3.8-.3 1.9.6 3.3 1 1.5 2.2 2.5 3.9 3.1 1 .3 1.9 0 2.4-.7l.3-.6-2-1.1-.8.8c-1-.4-1.9-1.2-2.5-2.3l.7-.8-1.2-2z" />
    </>
  ),
  phone: (
    <path d="M5 4h4l1.5 4L8 9.7a12 12 0 0 0 6.3 6.3l1.7-2.5 4 1.5v4c0 .8-.7 1.5-1.5 1.5C10 20.5 3.5 14 3.5 5.5 3.5 4.7 4.2 4 5 4Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 7 8.5-7" />
    </>
  ),
  menu: (
    <>
      <path d="M4 9h16" />
      <path d="M4 15h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
    >
      {paths[name]}
    </svg>
  );
}
