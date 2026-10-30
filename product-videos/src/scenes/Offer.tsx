import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Icon } from "../components/Icon";
import { PhotoCard } from "../components/PhotoCard";
import { Pill } from "../components/Pill";
import { Scene } from "../components/Scene";
import { enter, pop } from "../lib/anim";
import { formatNumber, getCurrencyLabel } from "../lib/format";
import type { Product } from "../schema";

export const Offer: React.FC<{ product: Product }> = ({ product }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme } = product;

  // السعر بيعد من تحت لفوق
  const counted =
    Math.round(
      interpolate(frame, [8, 34], [product.price * 0.4, product.price], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }) / 1000,
    ) * 1000;

  return (
    <Scene theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ scale: String(pop(frame, fps, 0)) }}>
          <PhotoCard src={product.images.product} width={420} height={600} />
        </div>

        {product.oldPrice ? (
          <div
            style={{
              marginTop: 40,
              fontSize: 64,
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              textDecoration: "line-through",
              opacity: enter(frame, 6, 10),
            }}
          >
            {formatNumber(product.oldPrice)} {getCurrencyLabel(product.currency)}
          </div>
        ) : null}

        <div
          style={{
            marginTop: product.oldPrice ? 0 : 50,
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            color: theme.accent,
            opacity: enter(frame, 6, 8),
          }}
        >
          <span style={{ fontSize: 180, fontWeight: 900, lineHeight: 1.1 }}>
            {formatNumber(counted)}
          </span>
          <span style={{ fontSize: 80, fontWeight: 800 }}>{getCurrencyLabel(product.currency)}</span>
        </div>

        {product.offer ? (
          <Pill
            background={theme.accent}
            color={theme.dark}
            fontSize={56}
            style={{ marginTop: 20, scale: String(pop(frame, fps, 30)) }}
          >
            {product.offer}
          </Pill>
        ) : null}

        <div
          style={{
            marginTop: 50,
            display: "flex",
            alignItems: "center",
            gap: 30,
            padding: "34px 56px",
            borderRadius: 40,
            background: "#16A34A",
            boxShadow: "0 24px 60px rgba(22,163,74,0.45)",
            scale: String(pop(frame, fps, 38)),
          }}
        >
          <Icon name="cash" size={96} color="white" strokeWidth={2} />
          <div style={{ fontSize: 70, fontWeight: 900 }}>الدفع عند الاستلام</div>
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 48,
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            opacity: enter(frame, 50, 10),
          }}
        >
          تستلم طلبك وبعدين تدفع
        </div>
      </div>
    </Scene>
  );
};
