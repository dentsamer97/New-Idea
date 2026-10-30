import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { Product } from "../schema";

// خلفية داكنة بلون المنتج مع بقع ضوء بتتحرك ببطء
export const Background: React.FC<{ theme: Product["theme"] }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 40) * 60;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.dark, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          top: -350 + drift,
          right: -400,
          background: `radial-gradient(circle, ${theme.primary}88 0%, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          bottom: -380 - drift,
          left: -380,
          background: `radial-gradient(circle, ${theme.accent}33 0%, transparent 65%)`,
        }}
      />
    </AbsoluteFill>
  );
};
