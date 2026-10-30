import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Icon } from "../components/Icon";
import { Media } from "../components/Media";
import { Scene } from "../components/Scene";
import { enter, pop } from "../lib/anim";
import { mediaFor } from "../lib/media";
import type { AdContent } from "../schema";

export const Uses: React.FC<{ content: AdContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme } = content;

  const background = (
    <AbsoluteFill style={{ backgroundColor: theme.dark }}>
      <AbsoluteFill style={{ filter: "blur(14px)", scale: "1.15" }}>
        <Media media={mediaFor(content, { kind: "lifestyle" })!} zoom={[1, 1.15]} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `${theme.dark}C8` }} />
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
          opacity: enter(frame, 0, 10),
          translate: `0px ${interpolate(enter(frame, 0, 14), [0, 1], [40, 0])}px`,
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
              background: "rgba(255,255,255,0.12)",
              border: "2px solid rgba(255,255,255,0.22)",
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
