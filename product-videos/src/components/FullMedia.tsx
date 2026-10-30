import React from "react";
import { AbsoluteFill } from "remotion";
import type { MediaRef } from "../lib/media";
import { Media } from "./Media";

// لقطة ملء الشاشة. لو صورة: الصورة كاملة في النص وخلفيتها مموّهة، عشان صور المورد غالبًا مش 9:16
export const FullMedia: React.FC<{ media: MediaRef; dim?: number }> = ({ media, dim = 0.25 }) => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    {media.type === "clip" ? (
      <Media media={media} />
    ) : (
      <>
        <AbsoluteFill style={{ filter: "blur(30px) brightness(0.7)", scale: "1.2" }}>
          <Media media={media} zoom={[1, 1]} />
        </AbsoluteFill>
        <AbsoluteFill style={{ top: 200, bottom: 200 }}>
          <Media media={media} zoom={[1, 1.08]} fit="contain" />
        </AbsoluteFill>
      </>
    )}
    <AbsoluteFill style={{ background: `rgba(0,0,0,${dim})` }} />
  </AbsoluteFill>
);
