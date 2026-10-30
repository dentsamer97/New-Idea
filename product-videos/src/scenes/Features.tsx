import React from "react";
import { interpolate, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { Counter } from "../components/boxes";
import { Icon } from "../components/Icon";
import { PhotoCard } from "../components/PhotoCard";
import { Scene } from "../components/Scene";
import { entrance, enter, pop } from "../lib/anim";
import { mediaFor, type MediaRef } from "../lib/media";
import type { AdContent, Feature } from "../schema";

export const FeatureCard: React.FC<{
  feature: Feature;
  media: MediaRef;
  index: number;
  count: number;
  theme: AdContent["theme"];
}> = ({ feature, media, index, count, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Scene theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: 50 }}>
          <Counter theme={theme} index={index} count={count} />
        </div>
        <div
          style={{
            opacity: enter(frame, 0, 8),
            translate: `${interpolate(enter(frame, 0, 16), [0, 1], [-200, 0])}px 0px`,
          }}
        >
          <PhotoCard media={media} theme={theme} width={760} height={720} />
        </div>
        <div
          style={{
            marginTop: -70,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: theme.accent,
            border: `8px solid ${theme.isDark ? "#00000055" : "#FFFFFF"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: String(pop(frame, fps, 6)),
          }}
        >
          <Icon name={feature.icon} size={84} color={theme.onAccent} strokeWidth={2.2} />
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 100,
            fontWeight: 900,
            lineHeight: 1.2,
            textAlign: "center",
            fontFamily: theme.fonts.heading,
            ...entrance(theme, frame, fps, 10),
          }}
        >
          {feature.title}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 54,
            fontWeight: 600,
            lineHeight: 1.45,
            textAlign: "center",
            color: theme.muted,
            textWrap: "balance",
            opacity: enter(frame, 16, 10),
          }}
        >
          {feature.text}
        </div>
      </div>
    </Scene>
  );
};

export const Features: React.FC<{ content: AdContent; featureFrames: number }> = ({
  content,
  featureFrames,
}) => (
  <Series>
    {content.features.map((feature, i) => (
      <Series.Sequence key={i} name={feature.title} durationInFrames={featureFrames}>
        <FeatureCard
          feature={feature}
          media={mediaFor(content, { kind: "feature", featureId: feature.id, image: feature.image })!}
          index={i}
          count={content.features.length}
          theme={content.theme}
        />
      </Series.Sequence>
    ))}
  </Series>
);
