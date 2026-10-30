import React from "react";
import type { MediaRef } from "../lib/media";
import { Media } from "./Media";

// صورة أو لقطة جوه كارت بحواف دايرية
export const PhotoCard: React.FC<{
  media: MediaRef;
  width: number;
  height: number;
  style?: React.CSSProperties;
}> = ({ media, width, height, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 48,
      overflow: "hidden",
      boxShadow: "0 40px 90px rgba(0,0,0,0.45)",
      border: "6px solid rgba(255,255,255,0.9)",
      ...style,
    }}
  >
    <Media media={media} />
  </div>
);
