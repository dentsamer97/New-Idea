import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ChatQA, ReviewCard } from "../components/boxes";
import { Scene } from "../components/Scene";
import { enter } from "../lib/anim";
import type { AdContent } from "../schema";

// آراء العملاء والأسئلة: بيظهر بس لو المنتج فيه تقييمات أو أسئلة حقيقية
export const Proof: React.FC<{ content: AdContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { theme } = content;
  const items = [
    ...(content.reviews ?? []).slice(0, 2).map((review, i) => <ReviewCard key={`r${i}`} theme={theme} review={review} />),
    ...(content.faq ?? []).slice(0, 2).map((item, i) => <ChatQA key={`q${i}`} q={item.q} a={item.a} />),
  ].slice(0, 3);

  return (
    <Scene theme={theme}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 50 }}>
        <div style={{ fontSize: 96, fontWeight: 900, textAlign: "center", fontFamily: theme.fonts.heading, opacity: enter(frame, 0, 10) }}>
          {content.reviews?.length ? "آراء عملائنا" : "أسئلتكم"}
        </div>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              opacity: enter(frame, 10 + i * 22, 10),
              translate: `0px ${interpolate(enter(frame, 10 + i * 22, 16), [0, 1], [80, 0])}px`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </Scene>
  );
};
