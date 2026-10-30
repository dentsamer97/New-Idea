import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { HotWord, Label } from "../components/boxes";
import { PhotoCard } from "../components/PhotoCard";
import { Scene } from "../components/Scene";
import { enter, entrance } from "../lib/anim";
import { isHighlighted } from "../lib/highlight";
import { mediaFor } from "../lib/media";
import type { AdContent } from "../schema";

// الهوك ظاهر من أول فريم: أول فريم هو صورة الفيديو قبل ما يشتغل
export const Hook: React.FC<{ content: AdContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme, hook } = content;

  return (
    <Scene theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        <div style={entrance(theme, frame, fps, 0, true)}>
          <Label theme={theme} size={60}>
            {hook.top}
          </Label>
        </div>
        <div
          style={{
            fontSize: 112,
            fontWeight: 900,
            lineHeight: 1.3,
            textAlign: "center",
            textWrap: "balance",
            fontFamily: theme.fonts.heading,
            ...entrance(theme, frame, fps, 0, true),
          }}
        >
          {hook.main.split(" ").map((word, i) => (
            <React.Fragment key={i}>
              {isHighlighted(word, hook.highlight) ? <HotWord theme={theme}>{word}</HotWord> : word}{" "}
            </React.Fragment>
          ))}
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
          translate: `0px ${interpolate(enter(frame, 0, 18), [0, 1], [60, 0])}px`,
        }}
      >
        <PhotoCard media={mediaFor(content, { kind: "hook" })!} theme={theme} width={600} height={880} />
      </div>
    </Scene>
  );
};
