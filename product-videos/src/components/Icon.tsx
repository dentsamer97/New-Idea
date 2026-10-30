import React from "react";
import type { IconName } from "../schema";

const paths: Record<IconName | "x" | "cart" | "cash" | "arrowDown" | "hand", React.ReactNode> = {
  foot: (
    <path d="M3 18v-5.5l3.5-.8L9.5 7l3.2.8-.8 4 6.6 2.2A2.5 2.5 0 0 1 20.2 16.4V18zM3 18h17.2" />
  ),
  drop: <path d="M12 2.8s-6.5 7.4-6.5 11.7a6.5 6.5 0 0 0 13 0C18.5 10.2 12 2.8 12 2.8z" />,
  soap: (
    <>
      <path d="M9 2.5h5M11.5 2.5v4" />
      <path d="M8.5 6.5h6a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 6 19V9a2.5 2.5 0 0 1 2.5-2.5z" />
      <path d="M9.5 13.5h4" />
    </>
  ),
  car: (
    <>
      <path d="M3 16.5v-4l2.2-5h13.6l2.2 5v4z" />
      <path d="M3 12.5h18" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </>
  ),
  tent: (
    <>
      <path d="M2.5 20.5 12 4l9.5 16.5z" />
      <path d="M12 4v16.5M9 20.5l3-6 3 6" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="7" r="2.5" />
      <circle cx="16.5" cy="8.5" r="2" />
      <path d="M3.5 20v-3.5A4.5 4.5 0 0 1 8 12a4.5 4.5 0 0 1 4.5 4.5V20M13 20v-3a3.5 3.5 0 0 1 7 0v3" />
    </>
  ),
  farm: (
    <>
      <path d="M3 20.5V10l6-5 6 5v10.5z" />
      <path d="M7 20.5v-5h4v5M15 13h6v7.5h-6M3 20.5h18" />
    </>
  ),
  road: (
    <>
      <path d="M8 3 4 21M16 3l4 18" />
      <path d="M12 4v3M12 10.5v3M12 17v3" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  cart: (
    <>
      <path d="M2.5 3.5h3l2.2 11.2h11l2-8H6.6" />
      <circle cx="9" cy="19.2" r="1.6" />
      <circle cx="17" cy="19.2" r="1.6" />
    </>
  ),
  cash: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.5v5M18 9.5v5" />
    </>
  ),
  arrowDown: <path d="M12 3.5v16M5.5 13l6.5 6.5 6.5-6.5" />,
  hand: (
    <path d="M9 11.5V4.8a1.8 1.8 0 0 1 3.6 0v5.7l5 .9a2.5 2.5 0 0 1 2 2.9l-.9 4.7a3 3 0 0 1-3 2.5h-4.6a3 3 0 0 1-2.4-1.2l-3.8-5a1.7 1.7 0 0 1 2.6-2.2z" />
  ),
};

export type AnyIcon = keyof typeof paths;

export const Icon: React.FC<{
  name: AnyIcon;
  size: number;
  color: string;
  strokeWidth?: number;
  fill?: string;
}> = ({ name, size, color, strokeWidth = 2, fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {paths[name]}
  </svg>
);
