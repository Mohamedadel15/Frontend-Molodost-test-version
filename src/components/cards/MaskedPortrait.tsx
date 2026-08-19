import Image from "next/image";

import { BlobOutline } from "@/components/decor/RefLines";
import { cn } from "@/lib/cn";

export type MaskVariant = 1 | 2 | 3;

/*
 * Each blob is a different shape, so each keeps its own ratio — the reference
 * sizes the masked image to the mask file's own width : height.
 */
const maskAspect: Record<MaskVariant, number> = {
  1: 314 / 211,
  2: 297 / 222,
  3: 314 / 236,
};

/*
 * Each card's outline is its own frame, not one shared inset: Figma's Stroke
 * frames inside the 357.33px square measure x 2.50% / y 2.83% / 94% × 81%
 * (mask 3, node 2:9036), x 9.16% / y 7.25% / 79% × 88% (mask 2, node 2:9062)
 * and x 9.25% / y 4.75% / 88% × 87% (mask 1, node 2:9088). The stored path
 * viewBoxes do not share those aspects, so BlobOutline is told to stretch —
 * the vector fills its frame in Figma too.
 */
const outlineBox: Record<MaskVariant, string> = {
  1: "start-[9.249%] top-[4.75%] h-[87%] w-[88%]",
  2: "start-[9.164%] top-[7.25%] h-[88%] w-[79%]",
  3: "start-[2.5%] top-[2.833%] h-[81%] w-[94%]",
};

/* Reference blob mask files (extracted from the production site). */
const maskStyle = (mask: MaskVariant) => ({
  maskImage: `url(/images/mask-${mask}.svg)`,
  WebkitMaskImage: `url(/images/mask-${mask}.svg)`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
});

interface MaskedPortraitProps {
  src: string;
  alt: string;
  mask: MaskVariant;
  /** Focal point, e.g. "50.6% 33.4%" — the reference sets one per photo. */
  objectPosition?: string;
  /** Grain over the image — the reference layers it at 10% on a 128px tile. */
  noise?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Blob-masked portrait with the offset outline behind it — the shared shell
 * under the specialist and discipline cards.
 *
 * Geometry is measured from the reference card: a square frame, inside it the
 * masked image at its mask's own ratio centred on both axes, and the outline
 * stroke in the per-variant box above.
 */
export function MaskedPortrait({
  src,
  alt,
  mask,
  objectPosition,
  noise = false,
  sizes = "(min-width: 1200px) 30vw, (min-width: 810px) 45vw, 90vw",
  className,
}: MaskedPortraitProps) {
  return (
    <div className={cn("relative aspect-square w-full", className)}>
      {/* reference blob outline decoration (exact path) */}
      <BlobOutline variant={mask} stretch className={outlineBox[mask]} />
      <div
        /* centring is direction-neutral, so physical left/translate is fine */
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{ ...maskStyle(mask), aspectRatio: `${maskAspect[mask]}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
        {noise ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-repeat opacity-10"
            style={{
              backgroundImage: "url('/images/texture-a.png')",
              backgroundSize: "128px auto",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
