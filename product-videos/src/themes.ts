// القوالب: كل قالب بيحدد الألوان والخطوط وشكل البوكسات والكروت والحركة
// المنتج بيختار قالب بـ theme في ملفه، ولو مختارش بياخد قالب ثابت محسوب من اسمه

export const fontNames = [
  "Cairo",
  "Tajawal",
  "Almarai",
  "IBMPlexArabic",
  "Changa",
  "ElMessiri",
  "Lalezar",
  "ReemKufi",
  "ReadexPro",
  "NotoKufiArabic",
  "BalooBhaijaan2",
  "Marhey",
  "Lemonada",
  "Rubik",
  "Mada",
] as const;
export type FontName = (typeof fontNames)[number];

export const themeIds = ["night", "clean", "bold", "desert", "neon", "fresh", "fun", "luxury"] as const;
export type ThemeId = (typeof themeIds)[number];

export type Theme = {
  id: ThemeId;
  name: string;
  isDark: boolean;
  fonts: { heading: FontName; body: FontName };
  // الخلفية (CSS background)
  bg: string;
  text: string;
  muted: string;
  // خلفية الكروت والبوكسات
  surface: string;
  border: string;
  accent: string;
  // لون الكلام اللي فوق لون الـ accent
  onAccent: string;
  primary: string;
  styles: {
    // البوكس اللي فوق الهوك
    label: "pill" | "ribbon" | "bubble" | "lines" | "square" | "glow";
    // تمييز الكلمة المهمة
    highlight: "color" | "marker" | "circle" | "swoosh" | "glow";
    // شكل كارت الصورة
    card: "rounded" | "soft" | "tilt" | "arch" | "neon" | "leaf" | "circle" | "frame";
    // بوكس «الدفع عند الاستلام»
    badge: "solid" | "pill" | "burst" | "dashed" | "glass" | "outline";
    price: "plain" | "tag";
    // عدّاد المميزات
    counter: "dots" | "steps" | "bar";
    // حركة ظهور الكلام
    entrance: "rise" | "blur" | "pop";
  };
};

export const SUCCESS = "#16A34A";
export const SUCCESS_LIGHT = "#4ADE80";
export const DANGER = "#E5484D";

export const themes: Record<ThemeId, Theme> = {
  night: {
    id: "night",
    name: "ليلي",
    isDark: true,
    fonts: { heading: "Cairo", body: "Cairo" },
    bg: "radial-gradient(circle at 85% 8%, #1E6FD9 0%, #0A1F3C 55%)",
    text: "#FFFFFF",
    muted: "rgba(255,255,255,0.86)",
    surface: "rgba(255,255,255,0.09)",
    border: "rgba(255,255,255,0.16)",
    accent: "#FFC233",
    onAccent: "#0A1F3C",
    primary: "#1E6FD9",
    styles: { label: "pill", highlight: "color", card: "rounded", badge: "solid", price: "plain", counter: "dots", entrance: "rise" },
  },
  clean: {
    id: "clean",
    name: "فاتح نظيف",
    isDark: false,
    fonts: { heading: "Tajawal", body: "Tajawal" },
    bg: "linear-gradient(180deg, #F7F9FC 0%, #E3EAF4 100%)",
    text: "#0F172A",
    muted: "#334155",
    surface: "#FFFFFF",
    border: "rgba(15,23,42,0.08)",
    accent: "#1E6FD9",
    onAccent: "#FFFFFF",
    primary: "#1E6FD9",
    styles: { label: "pill", highlight: "swoosh", card: "soft", badge: "pill", price: "tag", counter: "steps", entrance: "blur" },
  },
  bold: {
    id: "bold",
    name: "جريء",
    isDark: false,
    fonts: { heading: "Lalezar", body: "Cairo" },
    bg: "#FFD60A",
    text: "#111111",
    muted: "#222222",
    surface: "rgba(0,0,0,0.08)",
    border: "#111111",
    accent: "#E5484D",
    onAccent: "#FFFFFF",
    primary: "#111111",
    styles: { label: "ribbon", highlight: "marker", card: "tilt", badge: "burst", price: "tag", counter: "steps", entrance: "pop" },
  },
  desert: {
    id: "desert",
    name: "صحراوي دافئ",
    isDark: false,
    fonts: { heading: "Changa", body: "Changa" },
    bg: "linear-gradient(180deg, #FBEBD0 0%, #E9B872 100%)",
    text: "#3B2412",
    muted: "#5B3A22",
    surface: "rgba(59,36,18,0.08)",
    border: "rgba(59,36,18,0.25)",
    accent: "#B5541C",
    onAccent: "#FBEBD0",
    primary: "#3B2412",
    styles: { label: "square", highlight: "color", card: "arch", badge: "solid", price: "plain", counter: "bar", entrance: "rise" },
  },
  neon: {
    id: "neon",
    name: "نيون تقني",
    isDark: true,
    fonts: { heading: "ReadexPro", body: "ReadexPro" },
    bg: "radial-gradient(circle at 20% 15%, #3B0764 0%, #05010F 60%)",
    text: "#FFFFFF",
    muted: "#C7D2FE",
    surface: "rgba(255,255,255,0.07)",
    border: "rgba(34,211,238,0.35)",
    accent: "#22D3EE",
    onAccent: "#05010F",
    primary: "#F472B6",
    styles: { label: "glow", highlight: "glow", card: "neon", badge: "glass", price: "plain", counter: "bar", entrance: "blur" },
  },
  fresh: {
    id: "fresh",
    name: "طبيعي أخضر",
    isDark: false,
    fonts: { heading: "Almarai", body: "Almarai" },
    bg: "linear-gradient(180deg, #E8F7EE 0%, #BFE8CF 100%)",
    text: "#0B3B24",
    muted: "#1F5A3B",
    surface: "rgba(255,255,255,0.65)",
    border: "rgba(21,128,61,0.25)",
    accent: "#15803D",
    onAccent: "#FFFFFF",
    primary: "#15803D",
    styles: { label: "pill", highlight: "circle", card: "leaf", badge: "dashed", price: "plain", counter: "dots", entrance: "rise" },
  },
  fun: {
    id: "fun",
    name: "مرح",
    isDark: false,
    fonts: { heading: "Marhey", body: "BalooBhaijaan2" },
    bg: "linear-gradient(160deg, #FDE2F3 0%, #E0E7FF 100%)",
    text: "#3B0764",
    muted: "#5B2A86",
    surface: "rgba(255,255,255,0.7)",
    border: "rgba(124,58,237,0.2)",
    accent: "#DB2777",
    onAccent: "#FFFFFF",
    primary: "#7C3AED",
    styles: { label: "bubble", highlight: "swoosh", card: "circle", badge: "pill", price: "tag", counter: "steps", entrance: "pop" },
  },
  luxury: {
    id: "luxury",
    name: "فاخر",
    isDark: true,
    fonts: { heading: "ElMessiri", body: "ElMessiri" },
    bg: "linear-gradient(180deg, #141414 0%, #000000 100%)",
    text: "#F5E6C8",
    muted: "#CBB994",
    surface: "rgba(212,175,55,0.06)",
    border: "rgba(212,175,55,0.45)",
    accent: "#D4AF37",
    onAccent: "#111111",
    primary: "#D4AF37",
    styles: { label: "lines", highlight: "color", card: "frame", badge: "outline", price: "plain", counter: "bar", entrance: "blur" },
  },
};

// قالب ثابت لكل منتج من اسمه، عشان المنتجات تطلع مختلفة من غير ما تختار
export const autoTheme = (productId: string): ThemeId => {
  let hash = 0;
  for (const ch of productId) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return themeIds[hash % themeIds.length];
};
