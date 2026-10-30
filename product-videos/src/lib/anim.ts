import { Easing, interpolate, spring } from "remotion";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// من 0 لـ 1 بحركة ناعمة تبدأ عند start
export const enter = (frame: number, start: number, duration = 15) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

// ظهور بنطة خفيفة (scale)
export const pop = (frame: number, fps: number, start: number) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping: 11, stiffness: 170, mass: 0.8 },
  });
