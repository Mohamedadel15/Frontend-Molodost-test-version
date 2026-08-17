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
      <path d="M12.1 21c-3.2 0-5.6-1.1-7-3.2C3.9 16 3.3 14.2 3.3 12c0-2.2.6-4.1 1.8-5.8 1.4-2.1 3.8-3.2 7-3.2 2.7 0 4.8.8 6.3 2.4.9 1 1.5 2.2 1.9 3.6l-2 .6c-.5-2.1-1.8-3.5-3.6-4.1" />
      <path d="M8.7 10.6c.9-1.3 2.3-2 4-1.9 1.2 0 2.2.4 2.9 1.1.6.6 1 1.5 1.1 2.5.6.3 1.2.6 1.6 1 .8.7 1.2 1.6 1.2 2.6 0 1.3-.6 2.5-1.7 3.3-1 .8-2.3 1.2-3.8 1.2" />
      <path d="M16.7 12.3c-.9-.4-2-.6-3.2-.5-1.9.1-3.2 1-3.1 2.5.1 1.4 1.3 2.2 2.9 2.1 2.1-.1 3.3-1.4 3.4-4.1Z" />
    </>
  ),
  facebook: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5H14c-.8 0-1.5.7-1.5 1.5v11" />
      <path d="M9.5 13h5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
      <path d="M9 8.5c-.4 0-.8.4-.9.8-.2.9.1 2 .9 3.1 1 1.4 2.2 2.4 3.8 2.9.6.2 1.2.1 1.6-.3.3-.3.5-.6.4-1-.1-.3-1.3-.9-1.6-.9-.4 0-.7.8-1 .7-.9-.2-2.1-1.3-2.4-2.2-.1-.3.6-.7.6-1.1 0-.3-.5-1.5-.8-1.8A.9.9 0 0 0 9 8.5Z" />
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
