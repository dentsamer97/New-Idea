import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PhotoCard } from "../components/PhotoCard";
import { Scene } from "../components/Scene";
import { enter, entrance, pop } from "../lib/anim";
import { mediaFor, type MediaRef } from "../lib/media";
import type { AdContent, Feature } from "../schema";
import { Cta } from "../scenes/Cta";
import { Hook } from "../scenes/Hook";
import { Offer } from "../scenes/Offer";
import { TIMING } from "../lib/timing";
import type { BuiltAd } from "./types";

const REASONS = TIMING.reasons.count;

const ReasonsTitle: React.FC<{ content: AdContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene theme={content.theme}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 300, fontWeight: 900, lineHeight: 1, color: content.theme.accent, fontFamily: content.theme.fonts.heading, scale: String(pop(frame, fps, 0)) }}>
          {REASONS}
        </div>
        <div style={{ fontSize: 110, fontWeight: 900, lineHeight: 1.2, fontFamily: content.theme.fonts.heading, ...entrance(content.theme, frame, fps, 6) }}>أسباب</div>
        <div
          style={{
            marginTop: 20,
            fontSize: 64,
            fontWeight: 800,
            textAlign: "center",
            textWrap: "balance",
            opacity: enter(frame, 12, 10),
          }}
        >
          تخليك تطلب {content.name}
        </div>
      </div>
    </Scene>
  );
};

const Reason: React.FC<{ content: AdContent; feature: Feature; media: MediaRef; number: number }> = ({
  content,
  feature,
  media,
  number,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme } = content;
  return (
    <Scene theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: "50%",
            background: theme.accent,
            color: theme.onAccent,
            fontFamily: theme.fonts.heading,
            fontSize: 120,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: String(pop(frame, fps, 0)),
          }}
        >
          {number}
        </div>
        <div
          style={{
            marginTop: 36,
            opacity: enter(frame, 4, 8),
            translate: `0px ${interpolate(enter(frame, 4, 16), [0, 1], [120, 0])}px`,
          }}
        >
          <PhotoCard media={media} theme={theme} width={760} height={680} />
        </div>
        <div style={{ marginTop: 40, fontSize: 96, fontWeight: 900, textAlign: "center", fontFamily: theme.fonts.heading, ...entrance(theme, frame, fps, 10) }}>
          {feature.title}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 52,
            fontWeight: 600,
            textAlign: "center",
            textWrap: "balance",
            color: theme.muted,
            opacity: enter(frame, 16, 10),
          }}
        >
          {feature.text}
        </div>
      </div>
    </Scene>
  );
};

// 3 أسباب: أهم 3 مميزات للزاوية، كل سبب برقم كبير
export const buildReasons = (content: AdContent): BuiltAd => ({
  cuts: false,
  scenes: [
    { name: "Hook", frames: TIMING.reasons.hook, el: <Hook content={content} /> },
    { name: "Title", frames: TIMING.reasons.title, el: <ReasonsTitle content={content} /> },
    ...content.features.slice(0, REASONS).map((feature, i) => ({
      name: `Reason ${i + 1}`,
      frames: TIMING.reasons.reason,
      el: (
        <Reason
          content={content}
          feature={feature}
          number={i + 1}
          media={mediaFor(content, { kind: "feature", featureId: feature.id, image: feature.image }, i)!}
        />
      ),
    })),
    { name: "Offer", frames: TIMING.end.offer, el: <Offer content={content} /> },
    { name: "Cta", frames: TIMING.end.cta, el: <Cta content={content} /> },
  ],
});
