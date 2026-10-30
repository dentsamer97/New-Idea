import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Caption";
import { FullMedia } from "../components/FullMedia";
import { Label } from "../components/boxes";
import { enter, pop } from "../lib/anim";
import type { MediaRef } from "../lib/media";
import type { AdContent } from "../schema";

// لقطة ملء الشاشة وعليها كلام: أساس ستايل UGC و POV
//  middle: الكلام في النص (UGC)     top: الكلام فوق في بوكس أبيض (POV)
export const Shot: React.FC<{
  media: MediaRef;
  theme: AdContent["theme"];
  caption: string;
  highlight?: string;
  label?: string;
  sub?: string;
  // كلمة إنجليزي قبل الكلام (مثلاً POV:) بتتعرض في اتجاهها الصح
  prefix?: string;
  position?: "middle" | "top";
  // ظاهر من أول فريم (للهوك)
  visibleAtStart?: boolean;
}> = ({ media, theme, caption, highlight, label, sub, prefix, position = "middle", visibleAtStart = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const boxed = position === "top";

  return (
    <AbsoluteFill style={{ direction: "rtl", fontFamily: theme.fonts.heading, color: "white" }}>
      <FullMedia media={media} dim={boxed ? 0.1 : 0.3} />
      <AbsoluteFill
        style={{
          padding: "0 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: boxed ? "flex-start" : "center",
          paddingTop: boxed ? 230 : 0,
          gap: 26,
        }}
      >
        {label ? (
          <div style={{ scale: visibleAtStart ? "1" : String(pop(frame, fps, 0)) }}>
            <Label theme={theme} size={54}>
              {label}
            </Label>
          </div>
        ) : null}
        {boxed ? (
          <div
            style={{
              background: "white",
              color: "#111",
              borderRadius: 28,
              padding: "18px 36px",
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.35,
              textAlign: "center",
              textWrap: "balance",
              scale: String(pop(frame, fps, 2)),
            }}
          >
            {prefix ? <bdi style={{ display: "inline-block", color: theme.primary, marginInlineEnd: 18 }}>{prefix}</bdi> : null}
            {caption}
          </div>
        ) : (
          <Caption text={caption} highlight={highlight} accent={theme.accent} delay={label ? 4 : 0} visibleAtStart={visibleAtStart} />
        )}
        {sub ? (
          <div
            style={{
              fontSize: 50,
              fontWeight: 700,
              textAlign: "center",
              textWrap: "balance",
              textShadow: "0 3px 14px rgba(0,0,0,0.9)",
              opacity: enter(frame, 12, 10),
            }}
          >
            {sub}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
