import type { Product } from "../schema";

// مدة كل مشهد بالفريم (30 فريم = ثانية)
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const DURATIONS = {
  hook: 90,
  problem: 120,
  reveal: 90,
  feature: 72, // لكل ميزة
  uses: 96,
  offer: 120,
  cta: 150,
};

export const TRANSITION_FRAMES = 10;

export const featuresDuration = (product: Product) =>
  DURATIONS.feature * product.features.length;

export const totalDuration = (product: Product) => {
  const d = DURATIONS;
  const scenes = [d.hook, d.problem, d.reveal, featuresDuration(product), d.uses, d.offer, d.cta];
  return scenes.reduce((a, b) => a + b, 0) - TRANSITION_FRAMES * (scenes.length - 1);
};
