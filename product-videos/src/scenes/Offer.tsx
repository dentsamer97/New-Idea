import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CodBadge, CornerRibbon, Price } from "../components/boxes";
import { PhotoCard } from "../components/PhotoCard";
import { Pill } from "../components/Pill";
import { Scene } from "../components/Scene";
import { enter, pop } from "../lib/anim";
import { productImage } from "../lib/media";
import type { AdContent } from "../schema";

export const Offer: React.FC<{ content: AdContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme } = content;

  // السعر بيعد من تحت لفوق
  const counted =
    Math.round(
      interpolate(frame, [8, 34], [content.price * 0.4, content.price], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }) / 1000,
    ) * 1000;

  return (
    <Scene theme={theme}>
      {content.limited ? <CornerRibbon text={content.limited} /> : null}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        <div style={{ scale: String(pop(frame, fps, 0)) }}>
          <PhotoCard media={productImage(content)} theme={theme} width={420} height={600} />
        </div>
        <div style={{ opacity: enter(frame, 6, 8) }}>
          <Price theme={theme} content={content} value={counted} />
        </div>
        {content.offer ? (
          <Pill background={theme.accent} color={theme.onAccent} fontSize={56} style={{ scale: String(pop(frame, fps, 30)) }}>
            {content.offer}
          </Pill>
        ) : null}
        <div style={{ scale: String(pop(frame, fps, 38)) }}>
          <CodBadge theme={theme} />
        </div>
        <div style={{ fontSize: 48, fontWeight: 600, color: theme.muted, opacity: enter(frame, 50, 10) }}>
          تستلم طلبك وبعدين تدفع
        </div>
      </div>
    </Scene>
  );
};
