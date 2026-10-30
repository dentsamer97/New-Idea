import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Icon } from "../components/Icon";
import { Scene } from "../components/Scene";
import { enter, pop } from "../lib/anim";
import type { Product } from "../schema";

// لحظات ضغط الإيد على الزرار
const TAPS = [42, 96];
const TAP_LENGTH = 16;

export const Cta: React.FC<{ product: Product }> = ({ product }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme, cta } = product;

  const tap = TAPS.find((t) => frame >= t - 10 && frame < t + TAP_LENGTH);
  const press = tap === undefined ? 0 : interpolate(frame, [tap - 10, tap, tap + TAP_LENGTH], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple = tap === undefined ? 0 : enter(frame, tap, TAP_LENGTH + 6);

  return (
    <Scene theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            marginTop: 120,
            fontSize: 140,
            fontWeight: 900,
            lineHeight: 1.2,
            scale: String(pop(frame, fps, 0)),
          }}
        >
          {cta.headline}
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 64,
            fontWeight: 800,
            color: "#4ADE80",
            opacity: enter(frame, 8, 10),
          }}
        >
          <Icon name="cash" size={72} color="#4ADE80" />
          والدفع عند الاستلام
        </div>

        <div style={{ position: "relative", marginTop: 170 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              border: "6px solid #4ADE80",
              opacity: interpolate(ripple, [0, 1], [ripple > 0 ? 0.9 : 0, 0]),
              scale: String(interpolate(ripple, [0, 1], [1, 1.35])),
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
              width: 800,
              height: 190,
              borderRadius: 999,
              background: "#22C55E",
              boxShadow: "0 30px 70px rgba(34,197,94,0.5)",
              fontSize: 88,
              fontWeight: 900,
              scale: String(
                pop(frame, fps, 14) * (1 + Math.sin(frame / 6) * 0.025 - press * 0.06),
              ),
            }}
          >
            <Icon name="cart" size={92} color="white" strokeWidth={2.2} />
            {cta.button}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -150,
              left: 230,
              opacity: enter(frame, 24, 8),
              translate: `${interpolate(press, [0, 1], [40, 0])}px ${interpolate(press, [0, 1], [50, 0])}px`,
              scale: String(1 - press * 0.1),
            }}
          >
            <Icon name="hand" size={190} color={theme.dark} fill="white" strokeWidth={1.2} />
          </div>
        </div>

        <div
          style={{
            marginTop: 230,
            fontSize: 54,
            fontWeight: 700,
            opacity: enter(frame, 30, 10),
          }}
        >
          {cta.line}
        </div>
        <div
          style={{
            marginTop: 16,
            opacity: enter(frame, 34, 10),
            translate: `0px ${Math.abs(Math.sin(frame / 7)) * 30}px`,
          }}
        >
          <Icon name="arrowDown" size={110} color={theme.accent} strokeWidth={2.6} />
        </div>
        {cta.whatsapp ? (
          <div style={{ marginTop: 20, fontSize: 56, fontWeight: 800, direction: "ltr" }}>
            واتساب: {cta.whatsapp}
          </div>
        ) : null}
      </div>
    </Scene>
  );
};
