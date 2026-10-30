import React from "react";
import type { MediaRef } from "../lib/media";
import type { Theme } from "../themes";
import { Media } from "./Media";

// صورة أو لقطة جوه كارت، وشكل الكارت من القالب
export const PhotoCard: React.FC<{
  media: MediaRef;
  theme: Theme;
  width: number;
  height: number;
  style?: React.CSSProperties;
}> = ({ media, theme, width, height, style }) => {
  const shapes: Record<Theme["styles"]["card"], React.CSSProperties> = {
    rounded: { borderRadius: 48, border: "6px solid rgba(255,255,255,0.9)", boxShadow: "0 40px 90px rgba(0,0,0,0.45)" },
    soft: { borderRadius: 44, boxShadow: "0 30px 70px rgba(15,23,42,0.22)" },
    tilt: { borderRadius: 8, border: `8px solid ${theme.text}`, rotate: "-3deg", boxShadow: `18px 18px 0 ${theme.text}` },
    arch: { borderRadius: `${width / 2}px ${width / 2}px 36px 36px`, border: `7px solid ${theme.text}` },
    neon: { borderRadius: 32, border: `4px solid ${theme.accent}`, boxShadow: `0 0 40px ${theme.accent}99` },
    leaf: { borderRadius: "90px 14px 90px 14px", border: "8px solid white", boxShadow: "0 24px 60px rgba(0,0,0,0.15)" },
    circle: { borderRadius: "50%", border: "10px solid white", boxShadow: "0 24px 60px rgba(0,0,0,0.15)" },
    frame: { borderRadius: 4, border: `2px solid ${theme.accent}`, padding: 14, background: "transparent" },
  };
  const isCircle = theme.styles.card === "circle";
  const size = isCircle ? Math.min(width, height) : undefined;

  return (
    <div style={{ width: size ?? width, height: size ?? height, overflow: "hidden", flexShrink: 0, ...shapes[theme.styles.card], ...style }}>
      <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: theme.styles.card === "frame" ? 2 : undefined }}>
        <Media media={media} />
      </div>
    </div>
  );
};
