import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, pop } from "../lib/anim";
import { isHighlighted } from "../lib/highlight";

// كلام بستايل تيك توك: أبيض بحدود سودا، والكلمات بتظهر ورا بعض
export const Caption: React.FC<{
  text: string;
  highlight?: string;
  accent: string;
  fontSize?: number;
  delay?: number;
  // ظاهر من أول فريم من غير ما الكلمات تستنى بعض
  visibleAtStart?: boolean;
  style?: React.CSSProperties;
}> = ({ text, highlight = "", accent, fontSize = 88, delay = 0, visibleAtStart = false, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const outline = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return `${(Math.cos(a) * 6).toFixed(1)}px ${(Math.sin(a) * 6).toFixed(1)}px 0 #000`;
  }).join(", ");

  return (
    <div
      style={{
        fontSize,
        fontWeight: 900,
        lineHeight: 1.3,
        textAlign: "center",
        textWrap: "balance",
        textShadow: outline,
        ...style,
      }}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginInline: fontSize * 0.14,
            color: highlight && isHighlighted(word, highlight) ? accent : "white",
            scale: visibleAtStart
              ? String(interpolate(enter(frame, 0, 10), [0, 1], [1.08, 1]))
              : String(pop(frame, fps, delay + i * 3)),
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};
