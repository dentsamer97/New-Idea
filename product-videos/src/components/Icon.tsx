import React from "react";
import { icons, type LucideIcon } from "lucide-react";

// أيقونات مش موجودة في Lucide
const custom: Record<string, React.ReactNode> = {
  soap: (
    <>
      <path d="M9 2.5h5M11.5 2.5v4" />
      <path d="M8.5 6.5h6a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 6 19V9a2.5 2.5 0 0 1 2.5-2.5z" />
      <path d="M9.5 13.5h4" />
    </>
  ),
};

// أسامي قديمة في المشروع ← اسمها في Lucide
const aliases: Record<string, string> = {
  foot: "footprints",
  drop: "droplet",
  family: "users",
  farm: "tractor",
  road: "route",
  cash: "banknote",
  cart: "shopping-cart",
  arrowDown: "arrow-down",
  hand: "pointer",
};

const toPascal = (name: string) =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

// أي أيقونة من lucide.dev/icons باسمها، مثلاً truck أو gift أو shield-check
export const Icon: React.FC<{
  name: string;
  size: number;
  color: string;
  strokeWidth?: number;
  fill?: string;
}> = ({ name, size, color, strokeWidth = 2, fill = "none" }) => {
  if (custom[name]) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {custom[name]}
      </svg>
    );
  }
  const lucide = (icons as Record<string, LucideIcon>)[toPascal(aliases[name] ?? name)];
  if (!lucide) throw new Error(`الأيقونة "${name}" مش موجودة. دوّر على الاسم الصح في lucide.dev/icons`);
  return React.createElement(lucide, { size, color, strokeWidth, fill });
};
