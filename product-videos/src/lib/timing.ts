import type { AdContent } from "../schema";

// مدة كل مشهد بالفريم (30 فريم = ثانية)
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const TRANSITION_FRAMES = 10;

export type VideoFormat = "showcase" | "short";

// 0 = المشهد مش موجود في الفورمات ده
export const FORMAT_TIMING: Record<
  VideoFormat,
  {
    hook: number;
    problem: number;
    reveal: number;
    feature: number;
    maxFeatures: number;
    uses: number;
    offer: number;
    cta: number;
  }
> = {
  // فيديو عرض المنتج كامل (~32 ثانية)
  showcase: { hook: 90, problem: 120, reveal: 90, feature: 72, maxFeatures: 99, uses: 96, offer: 120, cta: 150 },
  // نسخة مختصرة (~14 ثانية): هوك، المنتج، أهم ميزتين، السعر، الطلب
  short: { hook: 75, problem: 0, reveal: 66, feature: 66, maxFeatures: 2, uses: 0, offer: 96, cta: 105 },
};

export const featureCount = (content: AdContent, format: VideoFormat) =>
  Math.min(content.features.length, FORMAT_TIMING[format].maxFeatures);

export const sceneDurations = (content: AdContent, format: VideoFormat) => {
  const t = FORMAT_TIMING[format];
  return {
    hook: t.hook,
    problem: t.problem,
    reveal: t.reveal,
    features: t.feature * featureCount(content, format),
    uses: t.uses,
    offer: t.offer,
    cta: t.cta,
  };
};

export const totalDuration = (content: AdContent, format: VideoFormat) => {
  const scenes = Object.values(sceneDurations(content, format)).filter((d) => d > 0);
  return scenes.reduce((a, b) => a + b, 0) - TRANSITION_FRAMES * (scenes.length - 1);
};
