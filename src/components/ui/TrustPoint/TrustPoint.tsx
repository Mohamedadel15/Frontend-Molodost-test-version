import Image from "next/image";

import { TrustStar } from "@/components/decor/BrandIcons";
import { cn } from "@/lib/cn";

const AVATARS = [
  "/images/avatar-1.jpg",
  "/images/avatar-2.jpg",
  "/images/avatar-3.jpg",
  "/images/avatar-4.jpg",
  "/images/avatar-5.jpg",
];

/*
 * The reference separates overlapping avatars with a crescent alpha mask
 * (extracted asset) instead of borders.
 */
const crescentMask = {
  maskImage: "url(/images/avatar-mask.svg)",
  WebkitMaskImage: "url(/images/avatar-mask.svg)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "left",
  WebkitMaskPosition: "left",
} as const;

interface TrustPointProps {
  trustedBy: string;
  rating: string;
  ratingBrand: string;
  /** Avatar cluster links here (production links to the Instagram profile). */
  instagramUrl?: string;
  tone?: "light" | "dark";
  className?: string;
}

function AvatarRow({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        dir="ltr"
        className="flex w-fit items-center"
      >
        {children}
      </a>
    );
  }
  return (
    <div dir="ltr" className="flex items-center">
      {children}
    </div>
  );
}

/** Avatar cluster + rating line (design-inventory §12.7). */
export function TrustPoint({
  trustedBy,
  rating,
  ratingBrand,
  instagramUrl,
  tone = "light",
  className,
}: TrustPointProps) {
  const secondary = tone === "light" ? "text-secondary" : "text-inverse-muted";
  const primary = tone === "light" ? "text-primary" : "text-inverse";

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <p className={cn("text-body-sm", secondary)}>{trustedBy}</p>
      <AvatarRow href={instagramUrl}>
        {AVATARS.map((src, i) => (
          <span
            key={src}
            className={cn(
              "relative size-11 overflow-hidden rounded-pill",
              i > 0 && "-ms-2.5",
            )}
            style={i < AVATARS.length ? crescentMask : undefined}
          >
            <Image src={src} alt="" fill sizes="44px" className="object-cover" />
          </span>
        ))}
        <span
          className="z-10 -ms-2.5 flex size-11 items-center justify-center rounded-pill bg-primary text-[11px] text-inverse"
        >
          +81
        </span>
      </AvatarRow>
      <p className={cn("text-body font-semibold", primary)}>
        {rating} <TrustStar className="mx-1 -mt-1" /> {ratingBrand}
      </p>
    </div>
  );
}
