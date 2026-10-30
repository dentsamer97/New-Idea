import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { PhotoCard } from "../components/PhotoCard";
import { Pill } from "../components/Pill";
import { Scene } from "../components/Scene";
import { enter, entrance, pop } from "../lib/anim";
import { mediaFor } from "../lib/media";
import type { AdContent } from "../schema";
import { SUCCESS } from "../themes";

export const Reveal: React.FC<{ content: AdContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme } = content;

  return (
    <Scene theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: theme.fonts.heading }}>
        <Pill background={SUCCESS} color="white" fontSize={60} style={{ scale: String(pop(frame, fps, 0)) }}>
          الحل
        </Pill>
        <div style={{ marginTop: 30, fontSize: 124, fontWeight: 900, lineHeight: 1.2, ...entrance(theme, frame, fps, 6) }}>
          {content.name}
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, color: theme.accent, lineHeight: 1.2, ...entrance(theme, frame, fps, 12) }}>
          {content.tagline}
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
          <PhotoCard media={mediaFor(content, { kind: "reveal" })!} theme={theme} width={600} height={880} />
        </div>
      </div>
    </Scene>
  );
};
