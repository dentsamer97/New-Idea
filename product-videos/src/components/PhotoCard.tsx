import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// صورة بحواف دايرية وزووم بطيء (Ken Burns)
export const PhotoCard: React.FC<{
  src: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
}> = ({ src, width, height, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
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
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, durationInFrames], [1.04, 1.16]),
        }}
      />
    </div>
  );
};
