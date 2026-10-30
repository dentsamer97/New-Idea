import type { Product } from "../schema";

export const portableSink: Product = {
  id: "portable-sink",
  code: "sink",
  name: "مغسلة متحركة",
  tagline: "سهلة التنقل",
  currency: "IQD",
  // ⚠️ غيّر السعر لسعر البيع اللي تختاره (سعر المورد 81,000 وأقل سعر بيع 85,000)
  price: 99000,
  features: [
    {
      id: "foot",
      icon: "footprints",
      title: "تشتغل برجلك",
      text: "مضخة قدم بدون كهرباء وبدون ما تلمس شي",
      image: "products/portable-sink/foot.jpg",
    },
    {
      id: "tank",
      icon: "droplet",
      title: "خزان 19 لتر",
      text: "يكفي أكثر من 100 غسلة للعائلة كلها",
      image: "products/portable-sink/sink.jpg",
    },
    {
      id: "soap",
      icon: "soap",
      title: "صابون مدمج 3 لتر",
      text: "مضخة صابون فوق الحوض جاهزة دايماً",
      image: "products/portable-sink/hands.jpg",
    },
    {
      id: "fold",
      icon: "car",
      title: "تتفكك بثواني",
      text: "خفيفة، بعجلات ومقبض، وتدخل بصندوق السيارة",
      image: "products/portable-sink/carry.jpg",
    },
    {
      id: "hdpe",
      icon: "sun",
      title: "بلاستيك HDPE قوي",
      text: "يتحمل الصدمات وحر الصيف وبرد الشتاء",
      image: "products/portable-sink/sink.jpg",
    },
  ],
  angles: [
    {
      id: "kashta",
      label: "الكشتات والسفرات",
      problems: [
        "بالكشتة والمزرعة ماكو مغسلة ولا ماي جاري",
        "تغسل بالقناني والماي يخلص بسرعة",
        "إيدك تتوسخ قبل الأكل وبعده",
      ],
      featureOrder: ["foot", "tank", "soap", "fold", "hdpe"],
      usesTitle: "رفيقك الأول في",
      uses: [
        { icon: "tent", label: "الكشتات والتخييم" },
        { icon: "route", label: "السفر" },
        { icon: "users", label: "السفرات العائلية" },
        { icon: "tractor", label: "المزارع" },
      ],
    },
    {
      id: "wudu",
      label: "الوضوء بالبر",
      problems: [
        "بالبر ما تلكى مكان تتوضأ بيه",
        "الوضوء بالقنينة يضيّع الماي ويبلل هدومك",
        "تحتاج أحد يصب لك الماي",
      ],
      featureOrder: ["foot", "tank", "fold", "hdpe", "soap"],
      usesTitle: "تتوضأ براحتك في",
      uses: [
        { icon: "tent", label: "الكشتات" },
        { icon: "route", label: "السفر" },
        { icon: "tractor", label: "المزارع" },
        { icon: "users", label: "التجمعات العائلية" },
      ],
    },
    {
      id: "family",
      label: "نظافة العائلة قبل الأكل",
      problems: [
        "الأطفال يأكلون بإيد وسخة بالسفرة",
        "الكل يلمس نفس القنينة وتنتقل الجراثيم",
        "المناديل ما تنظف زين",
      ],
      featureOrder: ["foot", "soap", "tank", "fold", "hdpe"],
      usesTitle: "نظافة العائلة في",
      uses: [
        { icon: "users", label: "السفرات العائلية" },
        { icon: "tent", label: "الكشتات" },
        { icon: "route", label: "الحدائق والمتنزهات" },
        { icon: "tractor", label: "المزارع" },
      ],
    },
    {
      id: "farm",
      label: "المزارع والشغل",
      problems: [
        "الحنفية بعيدة عن مكان الشغل",
        "إيدك تتوسخ بالطين والشحم",
        "ما تكدر تمد بوري لكل مكان",
      ],
      featureOrder: ["fold", "tank", "hdpe", "foot", "soap"],
      usesTitle: "تفيدك في",
      uses: [
        { icon: "tractor", label: "المزرعة" },
        { icon: "car", label: "الورشة" },
        { icon: "route", label: "مواقع الشغل" },
        { icon: "tent", label: "البر والتخييم" },
      ],
    },
  ],
  // الباترن: question = سؤال، curiosity = فضول، number = رقم/فايدة واضحة
  hooks: [
    { id: "kq", angle: "kashta", pattern: "question", top: "بالبر وماكو ماي؟", main: "بعدك تغسل إيدك بالقنينة؟", highlight: "بالقنينة" },
    { id: "kc", angle: "kashta", pattern: "curiosity", top: "لكيت حل للكشتات", main: "مغسلة كاملة تاخذها وياك بالسيارة", highlight: "وياك" },
    { id: "kn", angle: "kashta", pattern: "number", top: "أكثر من 100 غسلة", main: "بدون كهرباء وبدون ما تلمس الحنفية", highlight: "بدون كهرباء" },
    { id: "wq", angle: "wudu", pattern: "question", top: "وقت الصلاة بالبر؟", main: "شلون تتوضأ وماكو حنفية؟", highlight: "ماكو حنفية" },
    { id: "wc", angle: "wudu", pattern: "curiosity", top: "شوفوا شلون صار الوضوء بالكشتة", main: "تتوضأ براحتك بدون ما أحد يصب لك", highlight: "بدون ما أحد يصب لك" },
    { id: "wn", angle: "wudu", pattern: "number", top: "19 لتر ماي", main: "تكفي وضوء العائلة كلها طول الكشتة", highlight: "العائلة كلها" },
    { id: "fq", angle: "family", pattern: "question", top: "بالسفرة ويا الأطفال؟", main: "شلون يغسلون إيدهم قبل الأكل؟", highlight: "قبل الأكل" },
    { id: "fc", angle: "family", pattern: "curiosity", top: "حل ذكي للعوائل", main: "الأطفال يغسلون بدون ما يلمسون الحنفية", highlight: "بدون ما يلمسون" },
    { id: "fn", angle: "family", pattern: "number", top: "صابون 3 لتر + ماي 19 لتر", main: "نظافة كاملة للعائلة وين ما تروحون", highlight: "وين ما تروحون" },
    { id: "mq", angle: "farm", pattern: "question", top: "عندك مزرعة؟", main: "كل مرة تمشي للحنفية حتى تغسل إيدك؟", highlight: "تمشي للحنفية" },
    { id: "mc", angle: "farm", pattern: "curiosity", top: "أصحاب المزارع لازم يشوفون هذا", main: "مغسلة تنسحب وياك وين ما تشتغل", highlight: "وين ما تشتغل" },
    { id: "mn", angle: "farm", pattern: "number", top: "تتفكك بثواني", main: "تنقلها بين الشغل والبيت بدون تعب", highlight: "بدون تعب" },
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
  theme: "night",
};
