import React from "react";

export const Pill: React.FC<{
  children: React.ReactNode;
  background: string;
  color: string;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({ children, background, color, fontSize = 52, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 18,
      padding: `${fontSize * 0.25}px ${fontSize * 0.75}px`,
      borderRadius: 999,
      background,
      color,
      fontSize,
      fontWeight: 800,
      lineHeight: 1.3,
      ...style,
    }}
  >
    {children}
  </div>
);
