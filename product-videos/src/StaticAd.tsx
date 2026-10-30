import React from "react";
import { Icon } from "./components/Icon";
import { PhotoCard } from "./components/PhotoCard";
import { Pill } from "./components/Pill";
import { Scene } from "./components/Scene";
import { formatNumber, getCurrencyLabel } from "./lib/format";
import { isHighlighted } from "./lib/highlight";
import { productImage } from "./lib/media";
import { resolveAd } from "./lib/resolve";
import type { AdProps } from "./schema";

// إعلان صورة ثابتة: الهوك + المنتج + أهم 3 مميزات + السعر + زرار الطلب
export const StaticAd: React.FC<AdProps> = (props) => {
  const content = resolveAd(props);
  const { theme, hook } = content;

  return (
    <Scene theme={theme}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Pill background={theme.accent} color={theme.dark} fontSize={54}>
          {hook.top}
        </Pill>
        <div
          style={{
            marginTop: 24,
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.2,
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          {hook.main.split(" ").map((word, i) => (
            <span key={i} style={{ color: isHighlighted(word, hook.highlight) ? theme.accent : "white" }}>
              {word}{" "}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 32 }}>
          <PhotoCard media={productImage(content)} width={440} height={640} />
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {content.features.slice(0, 3).map((feature) => (
              <div key={feature.id} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#22C55E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="check" size={40} color="white" strokeWidth={3.2} />
                </div>
                <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.25, whiteSpace: "nowrap" }}>
                  {feature.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 50, display: "flex", alignItems: "baseline", gap: 20, color: theme.accent }}>
          <span style={{ fontSize: 150, fontWeight: 900, lineHeight: 1.1 }}>{formatNumber(content.price)}</span>
          <span style={{ fontSize: 68, fontWeight: 800 }}>{getCurrencyLabel(content.currency)}</span>
        </div>
        {content.offer ? (
          <Pill background={theme.accent} color={theme.dark} fontSize={50} style={{ marginTop: 10 }}>
            {content.offer}
          </Pill>
        ) : null}

        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            width: 820,
            height: 170,
            borderRadius: 999,
            background: "#22C55E",
            boxShadow: "0 24px 60px rgba(34,197,94,0.45)",
            fontSize: 84,
            fontWeight: 900,
          }}
        >
          <Icon name="cart" size={88} color="white" strokeWidth={2.2} />
          {content.cta.button}
        </div>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 60,
            fontWeight: 800,
            color: "#4ADE80",
          }}
        >
          <Icon name="cash" size={68} color="#4ADE80" />
          الدفع عند الاستلام
        </div>
      </div>
    </Scene>
  );
};
