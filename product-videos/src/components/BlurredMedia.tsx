import React from "react";
import { AbsoluteFill } from "remotion";
import type { MediaRef } from "../lib/media";
import { Media } from "./Media";

// خلفية مموّهة سريعة: الـ blur بيتعمل على نسخة صغيرة (ربع الحجم) وبعدين بتتكبّر،
// فالـ render أسرع بكتير من blur على الشاشة كلها
export const BlurredMedia: React.FC<{ media: MediaRef; brightness?: number }> = ({ media, brightness = 1 }) => (
  <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "black" }}>
    <div
      style={{
        position: "absolute",
        left: -14,
        top: -24,
        width: 298,
        height: 528,
        filter: `blur(7px) brightness(${brightness})`,
        transform: "scale(4)",
        transformOrigin: "0 0",
      }}
    >
      <Media media={media} zoom={[1, 1.1]} />
    </div>
  </AbsoluteFill>
);
