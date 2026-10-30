import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Icon } from "../components/Icon";
import { Media } from "../components/Media";
import { Pill } from "../components/Pill";
import { Scene } from "../components/Scene";
import { enter, pop } from "../lib/anim";
import { mediaFor, productImage, type MediaRef } from "../lib/media";
import type { AdContent } from "../schema";
import { DANGER, SUCCESS, type Theme } from "../themes";
import { Cta } from "../scenes/Cta";
import { Hook } from "../scenes/Hook";
import { Offer } from "../scenes/Offer";
import { TIMING } from "../lib/timing";
import type { BuiltAd } from "./types";

const { rowStart: ROW_START, rowGap: ROW_GAP } = TIMING.compare;

type Row = { before: string; after: string };

// الصفوف: من بيانات الزاوية، ولو مش موجودة: كل مشكلة قصاد ميزة
const compareRows = (content: AdContent): Row[] =>
  content.angle.compare?.rows ??
  content.problems
    .slice(0, Math.min(3, content.features.length))
    .map((problem, i) => ({ before: problem, after: content.features[i].title }));

const Panel: React.FC<{
  good: boolean;
  title: string;
  media: MediaRef | null;
  items: string[];
  theme: Theme;
}> = ({ good, title, media, items, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = good ? SUCCESS : DANGER;

  return (
    <div
      style={{
        flex: 1,
        borderRadius: 44,
        padding: 32,
        background: good ? "rgba(34,197,94,0.14)" : "rgba(229,72,77,0.14)",
        border: `4px solid ${color}`,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        opacity: enter(frame, good ? 8 : 0, 10),
      }}
    >
      <Pill background={color} color="white" fontSize={52} style={{ alignSelf: "flex-start", fontFamily: theme.fonts.heading }}>
        {title}
      </Pill>
      <div style={{ display: "flex", gap: 28, alignItems: "center", flex: 1 }}>
        <div
          style={{
            flexShrink: 0,
            width: 240,
            height: 320,
            borderRadius: 32,
            overflow: "hidden",
            background: theme.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: good ? undefined : "grayscale(0.6)",
          }}
        >
          {media ? <Media media={media} /> : <Icon name="x" size={160} color={color} strokeWidth={2.4} />}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {items.map((item, i) => {
            const start = ROW_START + i * ROW_GAP + (good ? 8 : 0);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: enter(frame, start, 8),
                  translate: `${interpolate(enter(frame, start, 12), [0, 1], [-60, 0])}px 0px`,
                }}
              >
                <div style={{ flexShrink: 0, scale: String(pop(frame, fps, start)) }}>
                  <Icon name={good ? "check" : "x"} size={52} color={good ? SUCCESS : DANGER} strokeWidth={3.2} />
                </div>
                <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.3 }}>{item}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Compare: React.FC<{ content: AdContent }> = ({ content }) => {
  const rows = compareRows(content);
  const beforeLabel = content.angle.compare?.beforeLabel ?? "الطريقة القديمة";

  return (
    <Scene theme={content.theme}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 36 }}>
        <Panel
          good={false}
          title={`قبل: ${beforeLabel}`}
          media={mediaFor(content, { kind: "before" })}
          items={rows.map((r) => r.before)}
          theme={content.theme}
        />
        <Panel
          good
          title={`بعد: ${content.name}`}
          media={mediaFor(content, { kind: "result" }) ?? productImage(content)}
          items={rows.map((r) => r.after)}
          theme={content.theme}
        />
      </div>
    </Scene>
  );
};

// قبل وبعد / مقارنة: الطريقة القديمة قصاد المنتج، سطر سطر
export const buildCompare = (content: AdContent): BuiltAd => {
  const rows = compareRows(content);
  return {
    cuts: false,
    scenes: [
      { name: "Hook", frames: TIMING.compare.hook, el: <Hook content={content} /> },
      { name: "Compare", frames: ROW_START + rows.length * ROW_GAP + TIMING.compare.hold, el: <Compare content={content} /> },
      { name: "Offer", frames: TIMING.end.offer, el: <Offer content={content} /> },
      { name: "Cta", frames: TIMING.end.cta, el: <Cta content={content} /> },
    ],
  };
};
