import { cn } from "@/lib/cn";

/*
 * Decorative line art — path data extracted VERBATIM from the reference
 * site's published SVGs (see docs/design-inventory.md; .ref-svgs/ holds the
 * originals). Do not hand-edit the `d` strings.
 */

const WAVE_A =
  "M 258.784 0 C 172.776 235.538 179.274 526.363 486.263 603.62 C 793.252 680.877 193.717 233.573 155.057 603.62 C 116.397 973.667 836.552 940.009 503.173 983.738 C 169.794 1027.467 588.875 1760.187 111.673 1393.045 C -365.528 1025.903 868.694 1619.076 425.173 1846.885 C -18.348 2074.694 495.457 2268.192 212.173 2328.747 C -71.111 2389.301 806.443 1867.048 470.173 2451 C 133.903 3034.952 112.591 3053.182 288.673 3014.5 C 464.755 2975.818 789.478 3168.482 444.173 3469.102 C 98.868 3769.722 467.924 3891.534 567.173 3825.369 C 666.422 3759.204 258.499 3589.284 168.173 3942.457 C 77.848 4295.629 457.414 3896.327 567.173 4025.519 C 676.933 4154.711 467.466 4413.512 285.673 4327.746 C 103.88 4241.979 546.582 4385.053 339.423 4843.132 C 132.265 5301.212 405.515 5167.326 425.173 5072.805 C 444.831 4978.283 66.831 5142.487 198.173 5338.504 C 329.515 5534.52 864.701 5541.779 486.173 5370 C 107.645 5198.221 -173.336 5577.671 204.673 5715.5 C 582.682 5853.329 339.423 6000 339.423 6000";

const WAVE_B =
  "M 266.813 0 C 69.979 399.076 301.736 546.046 468.313 585.5 C 634.89 624.954 489.208 422.451 286.813 455 C 84.419 487.549 147.193 842.381 413.167 893.147 C 679.14 943.913 396.509 879.201 365.184 1124.592 C 333.859 1369.983 400.707 1632.667 158.757 1454.439 C -83.193 1276.211 -35.114 1162.574 211.738 1365.074 C 458.591 1567.574 758.721 1672.598 427.661 1872.647 C 96.602 2072.695 396.36 2164.647 317.201 2272.781 C 238.041 2380.914 5.572 2358.863 328.313 2208.5 C 651.055 2058.137 585.19 2188.893 345.691 2667.894 C 106.191 3146.894 216.714 3014.308 413.167 3014.308 C 609.619 3014.308 671.66 3264.748 453.652 3438.039 C 235.644 3611.329 218.585 3814.198 453.652 3833.654 C 688.72 3853.111 597.002 3747.287 468.147 3730.232 C 339.292 3713.176 279.82 3748.217 211.738 3823.613 C 143.656 3899.009 25.115 4195.552 365.184 4044.515 C 705.253 3893.478 665.324 4378.029 386.676 4344.741 C 108.028 4311.453 329.372 4286.613 413.167 4562.631 C 496.961 4838.648 156.457 5058.856 254.723 5157.56 C 352.989 5256.264 530.053 4901.845 345.691 5019.998 C 161.329 5138.152 70.663 5323.513 274.216 5441.72 C 477.769 5559.928 823.225 5528.704 413.167 5369.927 C 3.108 5211.15 -61.485 5612.896 211.738 5699.774 C 484.961 5786.652 483.079 5926.801 328.197 6000";

const HERO_LINE_A =
  "M 568.5 0 C -446.766 669.726 420.757 754.867 688 543.5 C 955.243 332.133 149.225 460.324 381 1140";

const HERO_LINE_B =
  "M 555 0 C -514.95 653.314 502.942 726.558 720 509.5 C 937.058 292.442 174.231 575.033 381 1140";

const QUOTE_LINE_A =
  "M 288.784 -4000 C 202.776 -3764.462 209.274 -3473.637 516.263 -3396.38 C 823.252 -3319.123 223.717 -3766.427 185.057 -3396.38 C 146.397 -3026.333 866.552 -3059.991 533.173 -3016.262 C 199.794 -2972.533 618.875 -2239.813 141.673 -2606.955 C -335.528 -2974.097 898.694 -2380.924 455.173 -2153.115 C 11.652 -1925.306 525.457 -1731.808 242.173 -1671.253 C -41.111 -1610.699 836.443 -2132.952 500.173 -1549 C 163.903 -965.048 142.591 -946.818 318.673 -985.5 C 494.755 -1024.182 819.478 -831.518 474.173 -530.898 C 128.868 -230.278 497.924 -108.466 597.173 -174.631 C 696.422 -240.796 288.499 -410.716 198.173 -57.543 C 107.848 295.629 487.414 -103.673 597.173 25.519 C 706.933 154.711 497.466 413.512 315.673 327.746 C 133.88 241.979 576.582 385.053 369.423 843.132 C 162.265 1301.212 435.515 1167.326 455.173 1072.805 C 474.831 978.283 96.831 1142.487 228.173 1338.504 C 359.515 1534.52 894.701 1541.779 516.173 1370 C 137.645 1198.221 -143.336 1577.671 234.673 1715.5 C 612.682 1853.329 369.423 2000 369.423 2000";

const QUOTE_LINE_B =
  "M 298.313 -4000 C 101.479 -3600.924 333.236 -3453.954 499.813 -3414.5 C 666.39 -3375.046 520.708 -3577.549 318.313 -3545 C 115.919 -3512.451 178.693 -3157.619 444.667 -3106.853 C 710.64 -3056.087 428.009 -3120.799 396.684 -2875.408 C 365.359 -2630.017 432.207 -2367.333 190.257 -2545.561 C -51.693 -2723.789 -3.614 -2837.426 243.238 -2634.926 C 490.091 -2432.426 790.221 -2327.402 459.161 -2127.353 C 128.102 -1927.305 427.86 -1835.353 348.701 -1727.219 C 269.541 -1619.086 37.072 -1641.137 359.813 -1791.5 C 682.555 -1941.863 616.69 -1811.107 377.191 -1332.106 C 137.691 -853.106 248.214 -985.692 444.667 -985.692 C 641.119 -985.692 703.16 -735.252 485.152 -561.961 C 267.144 -388.671 250.085 -185.802 485.152 -166.346 C 720.22 -146.889 628.502 -252.713 499.647 -269.768 C 370.792 -286.824 311.587 -259.663 243.238 -176.387 C 174.889 -93.111 56.615 195.552 396.684 44.515 C 736.753 -106.522 696.824 378.029 418.176 344.741 C 139.528 311.453 360.872 286.613 444.667 562.631 C 528.461 838.648 187.957 1058.856 286.223 1157.56 C 384.489 1256.264 561.553 901.845 377.191 1019.998 C 192.829 1138.152 102.163 1323.513 305.716 1441.72 C 509.269 1559.928 854.725 1528.704 444.667 1369.927 C 34.608 1211.15 -32.126 1591.926 243.238 1699.774 C 518.602 1807.622 514.579 1926.801 359.697 2000";

const CONTACT_WAVE =
  "M0 441V0H1514V441C1514 441 1214.5 229 757 229C299.5 229 0 441 0 441Z";

const BLOB_OUTLINES: Record<1 | 2 | 3, { viewBox: string; d: string }> = {
  1: {
    viewBox: "-1 -1 302 265",
    d: "M123.693 262.825C237.067 265.825 357.616 133.825 269.118 110.325C180.619 86.8249 96.9392 -53.6727 29.4542 22.3249C-34.8092 94.6945 10.3198 259.825 123.693 262.825Z",
  },
  2: {
    viewBox: "0 0 293 254",
    d: "M13.013 89.829c-52.508 167.719 66.63 135.575 130.863 116.16s187.688-14.692 143.955-97.6S65.521-77.89 13.013 89.829",
  },
  3: {
    viewBox: "-1 -1 265 259",
    d: "M299.371 37.497c71.678 93.882-140.257 275.01-199.025 163.175S-21.431 89.682 7.074 47.254c28.505-42.427 241.57-76.198 292.297-9.757",
  },
};

/**
 * The two looping "Long Line" waves (6000×680): the vertical squiggle
 * rotated 90°, navy at 0.4/0.1 opacity. Static within the pinned
 * How-It-Works scene and reused across the footer seam on the reference.
 */
export function WaveLines({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 6000 680"
      className={cn("pointer-events-none absolute", className)}
      width="6000"
      height="680"
      fill="none"
    >
      <path
        d={WAVE_A}
        transform="translate(2689.827 -2660) rotate(90 309.75 3000)"
        stroke="var(--color-accent)"
        opacity="0.4"
        fill="transparent"
      />
      <path
        d={WAVE_B}
        transform="translate(2695.687 -2660) rotate(90 304 3000)"
        stroke="var(--color-accent)"
        opacity="0.1"
        fill="transparent"
      />
    </svg>
  );
}

/*
 * Draw-on-scroll support: pathLength is normalized to 1 so a dash offset of
 * (1 − progress) draws the stroke progressively. progress defaults to 1
 * (fully drawn) so the components stay server-renderable.
 */
function drawn(progress: number) {
  return {
    pathLength: 1,
    strokeDasharray: "1",
    strokeDashoffset: 1 - progress,
    /* the offset only updates once per animation frame from scroll events —
       a short linear tween between values keeps the head gliding instead of
       stepping, without lagging noticeably behind the scroll */
    style: { transition: "stroke-dashoffset 120ms linear" },
  } as const;
}

/** Hero "Animated Lines" (780×1140, white 2px) — positioned by the caller. */
export function HeroLines({
  className,
  progress = 1,
}: {
  className?: string;
  progress?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 780 1140"
      preserveAspectRatio="xMidYMid meet"
      className={cn("pointer-events-none absolute", className)}
      fill="none"
    >
      <path
        d={HERO_LINE_A}
        stroke="#fff"
        strokeWidth="2"
        fill="transparent"
        {...drawn(progress)}
      />
      <path
        d={HERO_LINE_B}
        stroke="#fff"
        strokeWidth="2"
        fill="transparent"
        {...drawn(Math.max(0, progress * 1.15 - 0.15))}
      />
    </svg>
  );
}

/** Big Quote white loops (680×2000, white 2px). */
export function QuoteLines({
  className,
  progress = 1,
}: {
  className?: string;
  progress?: number;
}) {
  return (
    <svg
      aria-hidden
      /*
       * The extracted path data starts at y −4000; the reference frames the
       * same curves from y −3535, so the window is lifted 465 units to put the
       * identical crop in the box. Without it the whole visible band is the
       * empty run-in above the first loop.
       */
      viewBox="0 -465 680 2000"
      preserveAspectRatio="xMidYMid meet"
      className={cn("pointer-events-none absolute", className)}
      fill="none"
    >
      <path
        d={QUOTE_LINE_A}
        stroke="#fff"
        strokeWidth="2"
        fill="transparent"
        {...drawn(progress)}
      />
      {/* both strokes share one progress — the reference's two paths carry
          identical dash offsets, with no stagger between them. Figma stacks
          the two 680×2000 containers at the same position with the second at
          20% (node 2:8824 against 2:8821 at full opacity). */}
      <path
        d={QUOTE_LINE_B}
        stroke="#fff"
        strokeWidth="2"
        opacity="0.2"
        fill="transparent"
        {...drawn(progress)}
      />
    </svg>
  );
}

/*
 * The same two loops as the Big Quote, but as the single piece of art spanning
 * the whole /services panel stack (680×6000, white 2px, the second loop at
 * 20%). Production draws both strokes on scroll at runtime (its path-draw
 * effect is applied by script, which is why the static HTML shows them fully
 * drawn) — `progress` scrubs the dash offset the same way; it defaults to 1
 * so the component stays server-renderable.
 */
export function ServiceLines({ className, progress = 1 }: { className?: string; progress?: number }) {
  return (
    <svg
      aria-hidden
      /*
       * The stored path data starts at y −4000. Unlike the Big Quote crop, the
       * reference frames this instance from the path's own start, so the origin
       * sits at −4000 and the full 6000-unit run is shown.
       */
      viewBox="0 -4000 680 6000"
      preserveAspectRatio="xMidYMid meet"
      className={cn("pointer-events-none absolute", className)}
      fill="none"
    >
      <path d={QUOTE_LINE_A} stroke="#fff" strokeWidth="2" fill="transparent" {...drawn(progress)} />
      <path d={QUOTE_LINE_B} stroke="#fff" strokeWidth="2" opacity="0.2" fill="transparent" {...drawn(progress)} />
    </svg>
  );
}

/*
 * Specialist-page arc strokes (1500×1500, white 2px), extracted verbatim from
 * the production profile pages: `hero` sweeps in from the top edge on the
 * right half of the frame; `band` is its mirrored counterpart on the left,
 * opening the Clinical Focus panel. Both render at 50% opacity there.
 */
const SPECIALIST_ARCS = {
  hero: "M 1259.5 -0.357 L 858.511 -0.357 C 592.26 316.949 633.648 790.015 950.954 1056.27 C 1109.607 1189.395 1307.201 1245.61 1498.413 1228.881",
  band: "M 379.929 0.357 C 646.18 317.664 604.792 790.73 287.486 1056.985 C 128.833 1190.11 -68.761 1246.325 -259.973 1229.595",
} as const;

export function SpecialistArc({
  variant,
  className,
  progress = 1,
}: {
  variant: keyof typeof SPECIALIST_ARCS;
  className?: string;
  /** Draw-on-scroll progress 0..1; defaults to fully drawn. */
  progress?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1500 1500"
      className={cn("pointer-events-none absolute", className)}
      width="1500"
      height="1500"
      fill="none"
    >
      <path d={SPECIALIST_ARCS[variant]} stroke="#fff" strokeWidth="2" fill="transparent" {...drawn(progress)} />
    </svg>
  );
}

/** FAFAFA dome divider (1516×443) above the Big Quote section. */
export function ContactWave({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="-1 -1 1516 443"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute", className)}
      fill="none"
    >
      <path d={CONTACT_WAVE} fill="var(--color-surface)" />
    </svg>
  );
}

/** Sage outline ellipse decorating specialist/journal imagery. */
export function BlobOutline({
  variant,
  stretch = false,
  className,
}: {
  variant: 1 | 2 | 3;
  /**
   * Let the path fill the box instead of being letterboxed inside it — the
   * specialist cards size each outline to its own Figma frame, whose aspect
   * does not match the stored viewBox.
   */
  stretch?: boolean;
  className?: string;
}) {
  const blob = BLOB_OUTLINES[variant];
  return (
    <svg
      aria-hidden
      viewBox={blob.viewBox}
      preserveAspectRatio={stretch ? "none" : undefined}
      className={cn("pointer-events-none absolute", className)}
      fill="none"
    >
      {/* The published markup shows a stale sage fallback here; the token it
          points at resolves to the navy accent. Opacity 0.21 is the real value. */}
      <path
        d={blob.d}
        stroke="var(--color-accent)"
        opacity="0.21"
        fill="none"
      />
    </svg>
  );
}
