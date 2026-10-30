import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT_FAMILY } from "../fonts";
import type { Product } from "../schema";
import { Background } from "./Background";

// غلاف كل مشهد: الخلفية + الخط العربي + اتجاه الكتابة من اليمين
export const Scene: React.FC<{
  theme: Product["theme"];
  children: React.ReactNode;
  background?: React.ReactNode;
}> = ({ theme, children, background }) => (
  <AbsoluteFill
    style={{
      direction: "rtl",
      fontFamily: FONT_FAMILY,
      color: "white",
    }}
  >
    {background ?? <Background theme={theme} />}
    <AbsoluteFill style={{ padding: "180px 80px 240px" }}>{children}</AbsoluteFill>
  </AbsoluteFill>
);
