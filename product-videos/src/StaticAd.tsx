import React from "react";
import { CodBadge, CornerRibbon, HotWord, Label, Price } from "./components/boxes";
import { Icon } from "./components/Icon";
import { PhotoCard } from "./components/PhotoCard";
import { Scene } from "./components/Scene";
import { isHighlighted } from "./lib/highlight";
import { productImage } from "./lib/media";
import { resolveAd } from "./lib/resolve";
import type { AdProps } from "./schema";
import { SUCCESS } from "./themes";

// إعلان صورة ثابتة: الهوك + المنتج + أهم 3 مميزات + السعر + زرار الطلب
export const StaticAd: React.FC<AdProps> = (props) => {
  const content = resolveAd(props);
  const { theme, hook } = content;

  return (
    <Scene theme={theme}>
      {content.limited ? <CornerRibbon text={content.limited} /> : null}
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
        <Label theme={theme} size={54}>
          {hook.top}
        </Label>
        <div
          style={{
            marginTop: 24,
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.25,
            textAlign: "center",
            textWrap: "balance",
            fontFamily: theme.fonts.heading,
          }}
        >
          {hook.main.split(" ").map((word, i) => (
            <React.Fragment key={i}>
              {isHighlighted(word, hook.highlight) ? <HotWord theme={theme}>{word}</HotWord> : word}{" "}
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 32 }}>
          <PhotoCard media={productImage(content)} theme={theme} width={400} height={560} />
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {content.features.slice(0, 3).map((feature) => (
              <div key={feature.id} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: theme.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={feature.icon} size={38} color={theme.onAccent} strokeWidth={2.4} />
                </div>
                <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.25, whiteSpace: "nowrap" }}>{feature.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 36, flexShrink: 0 }}>
          <Price theme={theme} content={content} value={content.price} size={130} />
        </div>

        <div
          style={{
            marginTop: 30,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            width: 820,
            height: 150,
            borderRadius: 999,
            background: SUCCESS,
            color: "white",
            boxShadow: "0 24px 60px rgba(22,163,74,0.4)",
            fontSize: 80,
            fontWeight: 900,
            fontFamily: theme.fonts.heading,
          }}
        >
          <Icon name="shopping-cart" size={84} color="white" strokeWidth={2.2} />
          {content.cta.button}
        </div>
        {theme.styles.badge === "burst" ? null : (
          <div style={{ marginTop: 26, flexShrink: 0 }}>
            <CodBadge theme={theme} size={52} />
          </div>
        )}
      </div>
    </Scene>
  );
};
