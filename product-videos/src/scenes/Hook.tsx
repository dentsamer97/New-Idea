import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PhotoCard } from "../components/PhotoCard";
import { Pill } from "../components/Pill";
import { Scene } from "../components/Scene";
import { enter, pop } from "../lib/anim";
import { isHighlighted } from "../lib/highlight";
import type { AdContent } from "../schema";

export const Hook: React.FC<{ content: AdContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme, hook } = content;
  const words = hook.main.split(" ");

  return (
    <Scene theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        <Pill
          background={theme.accent}
          color={theme.dark}
          fontSize={60}
          style={{ scale: String(pop(frame, fps, 0)) }}
        >
          {hook.top}
        </Pill>
        <div
          style={{
            fontSize: 112,
            fontWeight: 900,
            lineHeight: 1.25,
            textAlign: "center",
            textShadow: "0 8px 30px rgba(0,0,0,0.35)",
          }}
        >
          {words.map((word, i) => {
            const start = 8 + i * 4;
            const isHot = isHighlighted(word, hook.highlight);
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  marginInline: 14,
                  color: isHot ? theme.accent : "white",
                  opacity: enter(frame, start, 8),
                  translate: `0px ${interpolate(enter(frame, start, 10), [0, 1], [40, 0])}px`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: enter(frame, 18, 12),
          translate: `0px ${interpolate(enter(frame, 18, 20), [0, 1], [300, 0])}px`,
        }}
      >
        <PhotoCard src={content.images.product} width={600} height={880} />
      </div>
    </Scene>
  );
};
