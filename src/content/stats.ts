import type { Localized } from "./types";

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: Localized;
}

/** Home statistics (values measured from the reference odometer targets). */
export const stats: Stat[] = [
  {
    id: "sessions",
    value: 450,
    suffix: "+",
    label: { en: "Therapy sessions\ncompleted", ar: "جلسة علاجية\nمكتملة" },
  },
  {
    id: "clients",
    value: 80,
    suffix: "+",
    label: { en: "Clients\nsupported", ar: "عميل\nحظي بالدعم" },
  },
  {
    id: "years",
    value: 9,
    suffix: "+",
    label: {
      en: "Years of professional\nexperience",
      ar: "سنوات من الخبرة\nالمهنية",
    },
  },
  {
    id: "programs",
    value: 25,
    suffix: "+",
    label: { en: "Programs and\ntools offered", ar: "برنامجًا وأداة\nمتاحة" },
  },
];
