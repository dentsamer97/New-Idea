import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Icon } from "../components/Icon";
import { Pill } from "../components/Pill";
import { Scene } from "../components/Scene";
import { enter, pop } from "../lib/anim";
import type { AdContent } from "../schema";
import { DANGER } from "../themes";

export const Problem: React.FC<{ content: AdContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme } = content;

  return (
    <Scene theme={theme}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <Pill background={DANGER} color="white" fontSize={60} style={{ fontFamily: theme.fonts.heading, scale: String(pop(frame, fps, 0)) }}>
          المشكلة
        </Pill>
        <div style={{ display: "flex", flexDirection: "column", gap: 44, width: "100%" }}>
          {content.problems.map((problem, i) => {
            const start = 12 + i * 22;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 36,
                  padding: "40px 44px",
                  borderRadius: 40,
                  background: theme.surface,
                  border: `2px solid ${theme.border}`,
                  opacity: enter(frame, start, 10),
                  translate: `${interpolate(enter(frame, start, 16), [0, 1], [-140, 0])}px 0px`,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: DANGER,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    scale: String(pop(frame, fps, start + 4)),
                  }}
                >
                  <Icon name="x" size={64} color="white" strokeWidth={3.2} />
                </div>
                <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.35, textWrap: "balance" }}>{problem}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};
