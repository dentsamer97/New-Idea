import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Icon } from "../components/Icon";
import { BlurredMedia } from "../components/BlurredMedia";
import { Scene } from "../components/Scene";
import { entrance, pop } from "../lib/anim";
import { mediaFor } from "../lib/media";
import type { AdContent } from "../schema";

export const Uses: React.FC<{ content: AdContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme } = content;

  const background = (
    <AbsoluteFill>
      <BlurredMedia media={mediaFor(content, { kind: "lifestyle" })!} />
      <AbsoluteFill style={{ background: theme.isDark ? "rgba(0,0,0,0.66)" : "rgba(255,255,255,0.74)" }} />
    </AbsoluteFill>
  );

  return (
    <Scene theme={theme} background={background}>
      <div
        style={{
          marginTop: 120,
          fontSize: 104,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.2,
          fontFamily: theme.fonts.heading,
          ...entrance(theme, frame, fps, 0),
        }}
      >
        {content.usesTitle}
      </div>
      <div
        style={{
          marginTop: 90,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 36,
        }}
      >
        {content.uses.map((use, i) => (
          <div
            key={i}
            style={{
              height: 330,
              borderRadius: 44,
              background: theme.surface,
              border: `2px solid ${theme.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 26,
              scale: String(pop(frame, fps, 10 + i * 7)),
            }}
          >
            <Icon name={use.icon} size={120} color={theme.accent} strokeWidth={1.8} />
            <div style={{ fontSize: 52, fontWeight: 800, textAlign: "center", lineHeight: 1.3 }}>
              {use.label}
            </div>
          </div>
        ))}
      </div>
    </Scene>
  );
};
