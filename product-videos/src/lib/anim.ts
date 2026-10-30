import type React from "react";
import { Easing, interpolate, spring } from "remotion";
import type { Theme } from "../themes";

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

// blurIn: الكلام بيظهر من ضباب لحد ما يوضح
export const blurIn = (frame: number, start: number, duration = 14): React.CSSProperties => {
  const p = enter(frame, start, duration);
  return {
    opacity: p,
    filter: p < 1 ? `blur(${(1 - p) * 18}px)` : undefined,
    scale: String(interpolate(p, [0, 1], [1.08, 1])),
  };
};

// حركة ظهور الكلام حسب القالب: rise (طالع لفوق)، blur (من ضباب)، pop (نطة)
// visibleAtStart: ظاهر من أول فريم (للهوك، عشان أول فريم في الفيديو ميبقاش فاضي)
export const entrance = (
  theme: Theme,
  frame: number,
  fps: number,
  start: number,
  visibleAtStart = false,
): React.CSSProperties => {
  if (visibleAtStart) {
    const settle = enter(frame, 0, 12);
    return { scale: String(interpolate(settle, [0, 1], [1.06, 1])) };
  }
  switch (theme.styles.entrance) {
    case "blur":
      return blurIn(frame, start);
    case "pop":
      return { scale: String(pop(frame, fps, start)) };
    default:
      return {
        opacity: enter(frame, start, 10),
        translate: `0px ${interpolate(enter(frame, start, 14), [0, 1], [40, 0])}px`,
      };
  }
};
