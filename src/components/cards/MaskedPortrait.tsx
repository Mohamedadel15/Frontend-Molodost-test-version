import Image from "next/image";

import { BlobOutline } from "@/components/decor/RefLines";
import { cn } from "@/lib/cn";

export type MaskVariant = 1 | 2 | 3;

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
 * Geometry is measured from the reference card: a square frame, inside it a
 * 1.33:1 masked image centred on both axes, and the outline stroke inset to
 * 94% × 81% at 2.5% / 2.83%.
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
      <BlobOutline
        variant={mask}
        className="start-[2.5%] top-[2.833%] h-[81%] w-[94%]"
      />
      <div
        /* centring is direction-neutral, so physical left/translate is fine */
        className="absolute left-1/2 top-1/2 aspect-[1.33051] w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={maskStyle(mask)}
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
