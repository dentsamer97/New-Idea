// كل التوقيتات في مكان واحد. الأرقام بالفريم: 30 فريم = ثانية
import type { AdContent } from "../schema";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const TIMING = {
  // الانتقال الناعم بين المشاهد
  transitionFrames: 10,

  // عرض المنتج (showcase) ونسخته المختصرة (short). 0 = المشهد مش موجود
  showcase: { hook: 90, problem: 120, reveal: 90, feature: 72, maxFeatures: 99, uses: 96, proof: 150, offer: 120, cta: 150 },
  short: { hook: 75, problem: 0, reveal: 66, feature: 66, maxFeatures: 2, uses: 0, proof: 0, offer: 96, cta: 105 },

  // UGC: لقطات ملء الشاشة بقطع مباشر
  ugc: { hook: 75, problem: 66, feature: 63, maxFeatures: 3, result: 60 },
  // POV
  pov: { hook: 75, pov: 90, feature: 45, maxFeatures: 4 },
  // قبل وبعد: rowStart أول سطر، rowGap بين كل سطر والتاني، hold بعد آخر سطر
  compare: { hook: 75, rowStart: 24, rowGap: 30, hold: 70 },
  // 3 أسباب
  reasons: { hook: 75, title: 54, reason: 75, count: 3 },

  // النهاية في الستايلات الجديدة (السعر + زرار الطلب)
  end: { offer: 96, cta: 105 },

  // مشهد الطلب: لحظات ضغط الإيد على الزرار
  ctaTaps: [42, 96],
  ctaTapLength: 16,
};

export type ShowcaseFormat = "showcase" | "short";

export const featureCount = (content: AdContent, format: ShowcaseFormat) =>
  Math.min(content.features.length, TIMING[format].maxFeatures);

// مشهد آراء العملاء بيظهر بس لو فيه تقييمات أو أسئلة حقيقية
export const hasProof = (content: AdContent) => Boolean(content.reviews?.length || content.faq?.length);

export const sceneDurations = (content: AdContent, format: ShowcaseFormat) => {
  const t = TIMING[format];
  return {
    hook: t.hook,
    problem: t.problem,
    reveal: t.reveal,
    features: t.feature * featureCount(content, format),
    uses: t.uses,
    proof: hasProof(content) ? t.proof : 0,
    offer: t.offer,
    cta: t.cta,
  };
};

export const totalDuration = (content: AdContent, format: ShowcaseFormat) => {
  const scenes = Object.values(sceneDurations(content, format)).filter((d) => d > 0);
  return scenes.reduce((a, b) => a + b, 0) - TIMING.transitionFrames * (scenes.length - 1);
};
