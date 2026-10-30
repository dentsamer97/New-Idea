import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { Theme } from "../themes";

// خلفية القالب مع بقع ضوء بتتحرك ببطء
export const Background: React.FC<{ theme: Theme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 40) * 60;
  const strength = theme.isDark ? "55" : "26";

  return (
    <AbsoluteFill style={{ background: theme.bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          top: -350 + drift,
          right: -400,
          background: `radial-gradient(circle, ${theme.primary}${strength} 0%, transparent 65%)`,
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
          background: `radial-gradient(circle, ${theme.accent}${strength} 0%, transparent 65%)`,
        }}
      />
    </AbsoluteFill>
  );
};
