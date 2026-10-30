import React from "react";
import { AbsoluteFill } from "remotion";
import type { Theme } from "../themes";
import { Background } from "./Background";

// غلاف كل مشهد: خلفية القالب + خطه + اتجاه الكتابة من اليمين
export const Scene: React.FC<{
  theme: Theme;
  children: React.ReactNode;
  background?: React.ReactNode;
}> = ({ theme, children, background }) => (
  <AbsoluteFill
    style={{
      direction: "rtl",
      fontFamily: theme.fonts.body,
      color: theme.text,
    }}
  >
    {background ?? <Background theme={theme} />}
    <AbsoluteFill style={{ padding: "180px 80px 240px" }}>{children}</AbsoluteFill>
  </AbsoluteFill>
);
