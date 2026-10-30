// البوكسات والملصقات: كل قالب بيختار أشكاله منهم (themes.ts ← styles)
import React from "react";
import { formatNumber, getCurrencyLabel } from "../lib/format";
import { DANGER, SUCCESS, type Theme } from "../themes";
import type { AdContent } from "../schema";
import { Icon } from "./Icon";

const BURST =
  "polygon(50% 0,61% 15%,79% 9%,81% 27%,98% 33%,88% 50%,98% 67%,81% 73%,79% 91%,61% 85%,50% 100%,39% 85%,21% 91%,19% 73%,2% 67%,12% 50%,2% 33%,19% 27%,21% 9%,39% 15%)";

// البوكس اللي فوق الهوك: كبسولة، شريط مائل، فقاعة كلام، خطين، مربع، أو نيون
export const Label: React.FC<{ theme: Theme; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  theme,
  children,
  size = 56,
  style,
}) => {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
    fontSize: size,
    fontWeight: 800,
    lineHeight: 1.3,
    fontFamily: theme.fonts.heading,
  };
  const variants: Record<Theme["styles"]["label"], React.CSSProperties> = {
    pill: { background: theme.accent, color: theme.onAccent, padding: `${size * 0.22}px ${size * 0.7}px`, borderRadius: 999 },
    square: { background: theme.primary, color: theme.onAccent, padding: `${size * 0.22}px ${size * 0.6}px`, borderRadius: 12 },
    ribbon: {
      background: theme.accent,
      color: theme.onAccent,
      padding: `${size * 0.2}px ${size * 1.1}px`,
      rotate: "-4deg",
      clipPath: "polygon(0 0,100% 0,94% 50%,100% 100%,0 100%,6% 50%)",
    },
    bubble: {
      background: "white",
      color: theme.text,
      padding: `${size * 0.3}px ${size * 0.7}px`,
      borderRadius: size * 0.8,
      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    },
    lines: {
      color: theme.accent,
      padding: `${size * 0.15}px ${size * 0.5}px`,
      borderTop: `2px solid ${theme.accent}`,
      borderBottom: `2px solid ${theme.accent}`,
      letterSpacing: 1,
    },
    glow: {
      color: theme.accent,
      padding: `${size * 0.18}px ${size * 0.6}px`,
      border: `4px solid ${theme.accent}`,
      borderRadius: 999,
      boxShadow: `0 0 24px ${theme.accent}, inset 0 0 14px ${theme.accent}66`,
      textShadow: `0 0 16px ${theme.accent}`,
    },
  };
  return <div style={{ ...base, ...variants[theme.styles.label], ...style }}>{children}</div>;
};

// الكلمة المهمة: لون، قلم فسفوري، دايرة بخط اليد، خط تحتها، أو توهّج
export const HotWord: React.FC<{ theme: Theme; children: React.ReactNode }> = ({ theme, children }) => {
  switch (theme.styles.highlight) {
    case "marker":
      return (
        <span style={{ background: theme.text, color: theme.accent === "#E5484D" ? "#FFD60A" : theme.accent, padding: "0 0.2em", borderRadius: 8 }}>
          {children}
        </span>
      );
    case "circle":
      return (
        <span style={{ position: "relative", display: "inline-block", color: theme.accent }}>
          {children}
          <svg viewBox="0 0 200 90" preserveAspectRatio="none" style={{ position: "absolute", top: "-12%", left: "-12%", width: "124%", height: "124%" }}>
            <path d="M20 50 C 10 10, 190 5, 185 45 C 180 85, 30 90, 15 45" fill="none" stroke={DANGER} strokeWidth={5} strokeLinecap="round" />
          </svg>
        </span>
      );
    case "swoosh":
      return (
        <span style={{ position: "relative", display: "inline-block", color: theme.accent }}>
          {children}
          <svg viewBox="0 0 200 30" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: "-0.12em", width: "100%", height: "0.28em" }}>
            <path d="M5 20 Q 100 0 195 18" fill="none" stroke={theme.accent} strokeWidth={9} strokeLinecap="round" />
          </svg>
        </span>
      );
    case "glow":
      return <span style={{ color: theme.primary, textShadow: `0 0 22px ${theme.primary}` }}>{children}</span>;
    default:
      return <span style={{ color: theme.accent }}>{children}</span>;
  }
};

// بوكس «الدفع عند الاستلام»
export const CodBadge: React.FC<{ theme: Theme; size?: number; text?: string }> = ({ theme, size = 66, text = "الدفع عند الاستلام" }) => {
  const icon = <Icon name="hand-coins" size={size * 1.25} color="currentColor" strokeWidth={2} />;
  const base: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: size * 0.4,
    fontSize: size,
    fontWeight: 900,
    fontFamily: theme.fonts.heading,
    padding: `${size * 0.45}px ${size * 0.8}px`,
  };
  switch (theme.styles.badge) {
    case "burst":
      return (
        <div
          style={{
            width: size * 6.2,
            height: size * 6.2,
            background: theme.accent,
            color: theme.onAccent,
            clipPath: BURST,
            rotate: "8deg",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: size * 0.95,
            fontWeight: 900,
            lineHeight: 1.2,
            fontFamily: theme.fonts.heading,
          }}
        >
          الدفع
          <br />
          عند الاستلام
        </div>
      );
    case "pill":
      return <div style={{ ...base, background: "white", color: SUCCESS, borderRadius: 999, boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}>{icon}{text}</div>;
    case "dashed":
      return <div style={{ ...base, border: `5px dashed ${theme.accent}`, color: theme.accent, borderRadius: 32 }}>{icon}{text}</div>;
    case "glass":
      return (
        <div style={{ ...base, background: "rgba(255,255,255,0.1)", border: `3px solid ${theme.border}`, color: theme.accent, borderRadius: 28, boxShadow: `0 0 30px ${theme.accent}44` }}>
          {icon}
          {text}
        </div>
      );
    case "outline":
      return <div style={{ ...base, border: `2px solid ${theme.accent}`, color: theme.accent, borderRadius: 4, fontWeight: 700 }}>{text}</div>;
    default:
      return <div style={{ ...base, background: SUCCESS, color: "white", borderRadius: 36, boxShadow: "0 24px 60px rgba(22,163,74,0.4)" }}>{icon}{text}</div>;
  }
};

// السعر: رقم كبير أو تيكت سعر، ولو فيه سعر قديم بيظهر فوقه عليه خط
export const Price: React.FC<{ theme: Theme; content: AdContent; value: number; size?: number }> = ({ theme, content, value, size = 180 }) => {
  const currency = getCurrencyLabel(content.currency);
  const number = (
    <span style={{ display: "flex", alignItems: "baseline", gap: size * 0.12 }}>
      <span style={{ fontSize: size, fontWeight: 900, lineHeight: 1.1 }}>{formatNumber(value)}</span>
      <span style={{ fontSize: size * 0.44, fontWeight: 800 }}>{currency}</span>
    </span>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: theme.fonts.heading }}>
      {content.oldPrice ? (
        <div style={{ fontSize: size * 0.36, fontWeight: 700, color: theme.muted, textDecoration: "line-through", textDecorationColor: DANGER, textDecorationThickness: 6 }}>
          {formatNumber(content.oldPrice)} {currency}
        </div>
      ) : null}
      {theme.styles.price === "tag" ? (
        <div
          style={{
            background: theme.accent,
            color: theme.onAccent,
            padding: `${size * 0.04}px ${size * 0.4}px ${size * 0.04}px ${size * 0.25}px`,
            borderRadius: 18,
            clipPath: "polygon(0 0,88% 0,100% 50%,88% 100%,0 100%)",
          }}
        >
          {number}
        </div>
      ) : (
        <div style={{ color: theme.accent }}>{number}</div>
      )}
    </div>
  );
};

// عدّاد المميزات: نقط، دواير بأرقام، أو شريط
export const Counter: React.FC<{ theme: Theme; index: number; count: number }> = ({ theme, index, count }) => {
  if (theme.styles.counter === "steps") {
    return (
      <div style={{ display: "flex", gap: 16 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `4px solid ${i === index ? theme.accent : theme.border}`,
              background: i === index ? theme.accent : "transparent",
              color: i === index ? theme.onAccent : theme.muted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    );
  }
  if (theme.styles.counter === "bar") {
    return (
      <div style={{ width: 520, height: 12, borderRadius: 6, background: theme.surface, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
        <div style={{ width: `${((index + 1) / count) * 100}%`, height: "100%", background: theme.accent }} />
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: 14 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: i === index ? 70 : 22, height: 22, borderRadius: 11, background: i === index ? theme.accent : theme.border }} />
      ))}
    </div>
  );
};

// صورة بروفايل دايرية: صورة، أو أول حرف من الاسم
export const Avatar: React.FC<{ name: string; size: number; color: string; textColor?: string }> = ({ name, size, color, textColor = "white" }) => (
  <div
    style={{
      flexShrink: 0,
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      color: textColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.48,
      fontWeight: 900,
    }}
  >
    {name.trim().charAt(0)}
  </div>
);

// تقييم عميل حقيقي
export const ReviewCard: React.FC<{ theme: Theme; review: NonNullable<AdContent["reviews"]>[number] }> = ({ theme, review }) => (
  <div style={{ background: "white", color: "#111", borderRadius: 36, padding: "32px 40px", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 20px 50px rgba(0,0,0,0.18)" }}>
    <div style={{ color: "#F5A623", fontSize: 52, letterSpacing: 6 }}>★★★★★</div>
    <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.35 }}>«{review.text}»</div>
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <Avatar name={review.name} size={110} color={theme.accent} textColor={theme.onAccent} />
      <div style={{ fontSize: 44, fontWeight: 800, color: "#444" }}>
        {review.name}
        {review.city ? `، ${review.city}` : ""}
      </div>
    </div>
  </div>
);

// سؤال وجواب حقيقي بشكل رسايل واتساب
export const ChatQA: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: 48, fontWeight: 700, color: "#111" }}>
    <div style={{ alignSelf: "flex-start", background: "white", padding: "18px 30px", borderRadius: "34px 34px 34px 8px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>{q}</div>
    <div style={{ alignSelf: "flex-end", background: "#DCF8C6", padding: "18px 30px", borderRadius: "34px 34px 8px 34px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
      {a} <span style={{ color: "#34B7F1", fontSize: 36 }}>✓✓</span>
    </div>
  </div>
);

// شارة ركن مائلة: للجملة الحقيقية بس (مثلاً «الكمية محدودة»)
export const CornerRibbon: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", top: 0, left: 0, width: 420, height: 420, overflow: "hidden", pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        top: 90,
        left: -110,
        width: 520,
        textAlign: "center",
        background: DANGER,
        color: "white",
        fontSize: 44,
        fontWeight: 900,
        padding: "12px 0",
        rotate: "-38deg",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      {text}
    </div>
  </div>
);
