import type { Product } from "../schema";

export const portableSink: Product = {
  id: "portable-sink",
  name: "مغسلة متحركة",
  tagline: "سهلة التنقل",
  currency: "IQD",
  // ⚠️ غيّر السعر لسعر البيع اللي تختاره (سعر المورد 81,000 وأقل سعر بيع 85,000)
  price: 99000,
  hooks: [
    {
      top: "بالبر وماكو ماي؟",
      main: "بعدك تغسل إيدك بالقنينة؟",
      highlight: "بالقنينة",
    },
    {
      top: "لكيت حل للكشتات",
      main: "مغسلة كاملة تاخذها وياك بالسيارة",
      highlight: "وياك",
    },
    {
      top: "أكثر من 100 غسلة",
      main: "بدون كهرباء وبدون ما تلمس الحنفية",
      highlight: "بدون كهرباء",
    },
  ],
  problems: [
    "بالكشتة والمزرعة ماكو مغسلة ولا ماي جاري",
    "تغسل بالقناني والماي يخلص بسرعة",
    "إيدك تتوسخ قبل الأكل وبعده",
  ],
  features: [
    {
      icon: "foot",
      title: "تشتغل برجلك",
      text: "مضخة قدم بدون كهرباء وبدون ما تلمس شي",
      image: "products/portable-sink/foot.jpg",
    },
    {
      icon: "drop",
      title: "خزان 19 لتر",
      text: "يكفي أكثر من 100 غسلة للعائلة كلها",
      image: "products/portable-sink/sink.jpg",
    },
    {
      icon: "soap",
      title: "صابون مدمج 3 لتر",
      text: "مضخة صابون فوق الحوض جاهزة دايماً",
      image: "products/portable-sink/hands.jpg",
    },
    {
      icon: "car",
      title: "تتفكك بثواني",
      text: "خفيفة، بعجلات ومقبض، وتدخل بصندوق السيارة",
      image: "products/portable-sink/carry.jpg",
    },
    {
      icon: "sun",
      title: "بلاستيك HDPE قوي",
      text: "يتحمل الصدمات وحر الصيف وبرد الشتاء",
      image: "products/portable-sink/sink.jpg",
    },
  ],
  usesTitle: "رفيقك الأول في",
  uses: [
    { icon: "tent", label: "الكشتات والتخييم" },
    { icon: "road", label: "السفر" },
    { icon: "family", label: "السفرات العائلية" },
    { icon: "farm", label: "المزارع" },
  ],
  cta: {
    headline: "اطلبها هسه",
    button: "اطلب الآن",
    line: "اضغط الزر اللي تحت الفيديو",
  },
  images: {
    product: "products/portable-sink/sink.jpg",
    lifestyle: "products/portable-sink/camping.jpg",
  },
  theme: {
    dark: "#0A1F3C",
    primary: "#1E6FD9",
    accent: "#FFC233",
  },
};
