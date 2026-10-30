import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PhotoCard } from "../components/PhotoCard";
import { Pill } from "../components/Pill";
import { Scene } from "../components/Scene";
import { enter, pop } from "../lib/anim";
import type { Product } from "../schema";

export const Reveal: React.FC<{ product: Product }> = ({ product }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme } = product;

  return (
    <Scene theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Pill background="#22C55E" color="white" fontSize={60} style={{ scale: String(pop(frame, fps, 0)) }}>
          الحل
        </Pill>
        <div
          style={{
            marginTop: 30,
            fontSize: 124,
            fontWeight: 900,
            lineHeight: 1.2,
            opacity: enter(frame, 6, 10),
            translate: `0px ${interpolate(enter(frame, 6, 14), [0, 1], [50, 0])}px`,
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: theme.accent,
            lineHeight: 1.2,
            opacity: enter(frame, 12, 10),
          }}
        >
          {product.tagline}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 190,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 1000,
            height: 1000,
            marginLeft: -500,
            marginTop: -500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.accent}55 0%, transparent 60%)`,
            opacity: enter(frame, 10, 20),
          }}
        />
        <div style={{ scale: String(pop(frame, fps, 10)) }}>
          <PhotoCard src={product.images.product} width={600} height={880} />
        </div>
      </div>
    </Scene>
  );
};
