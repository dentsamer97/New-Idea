import type React from "react";

export type BuiltScene = { name: string; frames: number; el: React.ReactNode };

// cuts = true: قطع مباشر بين المشاهد (ستايل UGC). false: انتقال ناعم
export type BuiltAd = { scenes: BuiltScene[]; cuts: boolean };

// مدة النهاية (السعر + زرار الطلب) في الستايلات الجديدة
export const END_FRAMES = { offer: 96, cta: 105 };
