import type { Localized } from "./types";

export interface StoryFeatureEntry {
  id: string;
  tags: Localized;
  title: Localized;
  excerpt: Localized;
  images: {
    front: { src: string; width: number; height: number };
    back: { src: string; width: number; height: number };
  };
  href: string;
}

/** Featured client stories (home Story A / Story B). */
export const storyFeatures: StoryFeatureEntry[] = [
  {
    id: "reclaiming-peak-vitality",
    tags: {
      en: "Longevity, Biohacking, Burnout Recovery",
      ar: "طول العمر، التحسين البيولوجي، التعافي من الإرهاق",
    },
    title: {
      en: "Reclaiming Peak Vitality",
      ar: "استعادة ذروة الحيوية",
    },
    excerpt: {
      en: "After years of executive stress, Elena accepted exhaustion as the cost of success. Through Molodost' precision diagnostics, she did not just recover — she reversed her biological decline and reclaimed her energy.",
      ar: "بعد سنوات من ضغوط العمل القيادي، تقبّلت إيلينا الإرهاق ثمنًا للنجاح. من خلال التشخيص الدقيق في مولودوست، لم تتعافَ فحسب — بل عكست تدهورها البيولوجي واستعادت طاقتها.",
    },
    images: {
      front: { src: "/images/story-a-front.png", width: 826, height: 1868 },
      back: { src: "/images/story-a-back.png", width: 704, height: 1254 },
    },
    href: "/stories/reclaiming-peak-vitality",
  },
  {
    id: "optimizing-energy-at-the-source",
    tags: {
      en: "Diagnostics, Regeneration, Vitality",
      ar: "التشخيص، التجديد، الحيوية",
    },
    title: {
      en: "Optimizing Energy at the Source",
      ar: "تحسين الطاقة من مصدرها",
    },
    excerpt: {
      en: "A personalized longevity protocol helped identify the hidden drivers of fatigue and rebuild energy through measurable, physician-guided care.",
      ar: "ساعد بروتوكول شخصي لطول العمر في تحديد الأسباب الخفية للإرهاق وإعادة بناء الطاقة من خلال رعاية قابلة للقياس بإشراف الأطباء.",
    },
    images: {
      front: { src: "/images/story-b-front.jpg", width: 826, height: 1868 },
      back: { src: "/images/story-b-back.jpg", width: 704, height: 1254 },
    },
    href: "/stories/optimizing-energy-at-the-source",
  },
];
