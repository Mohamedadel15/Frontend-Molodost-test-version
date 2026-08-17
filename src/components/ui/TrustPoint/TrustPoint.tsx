import Image from "next/image";

import { cn } from "@/lib/cn";

const AVATARS = [
  "/images/avatar-1.jpg",
  "/images/avatar-2.jpg",
  "/images/avatar-3.jpg",
  "/images/avatar-4.jpg",
  "/images/avatar-5.jpg",
];

interface TrustPointProps {
  trustedBy: string;
  rating: string;
  ratingBrand: string;
  tone?: "light" | "dark";
  className?: string;
}

/*
 * Avatar cluster + rating line (design-inventory §12.7): 5 overlapping
 * avatars, a "+81" chip, "Excellent 4.9 out of 5 ★ TrustPoint".
 */
export function TrustPoint({
  trustedBy,
  rating,
  ratingBrand,
  tone = "light",
  className,
}: TrustPointProps) {
  const secondary = tone === "light" ? "text-secondary" : "text-inverse-muted";
  const primary = tone === "light" ? "text-primary" : "text-inverse";

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <p className={cn("text-body-sm", secondary)}>{trustedBy}</p>
      <div className="flex items-center" dir="ltr">
        {AVATARS.map((src, i) => (
          <span
            key={src}
            className={cn(
              "relative size-11 overflow-hidden rounded-pill border-2 border-background",
              i > 0 && "-ms-3",
            )}
          >
            <Image src={src} alt="" fill sizes="44px" className="object-cover" />
          </span>
        ))}
        <span className="z-10 -ms-3 flex size-11 items-center justify-center rounded-pill border-2 border-background bg-primary text-[11px] text-inverse">
          +81
        </span>
      </div>
      <p className={cn("text-body font-semibold", primary)}>
        {rating}{" "}
        <span aria-hidden className="text-[#27ae60]">
          ★
        </span>{" "}
        <span className="font-semibold">{ratingBrand}</span>
      </p>
    </div>
  );
}
