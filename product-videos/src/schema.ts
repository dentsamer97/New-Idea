import { z } from "zod";

export const iconNames = [
  "foot",
  "drop",
  "soap",
  "car",
  "sun",
  "tent",
  "family",
  "farm",
  "road",
  "check",
] as const;

// أشكال الإعلان (Format) اللي المشروع بيطلّعها
//  showcase: عرض المنتج كامل (~32 ث)       short:   نسخة مختصرة (~14 ث)
//  static:   صورة ثابتة                    ugc:     لقطات ملء الشاشة وكلام بستايل تيك توك (~19 ث)
//  compare:  قبل وبعد / مقارنة (~15 ث)     reasons: 3 أسباب (~19 ث)
//  pov:      POV: لما تكون... (~18 ث)
export const formats = ["showcase", "short", "static", "ugc", "compare", "reasons", "pov"] as const;

// نوع اللقطة الحقيقية: المشروع بيحط كل لقطة في المشهد المناسب ليها
//  hook: لقطة تشد في الأول        problem: المشكلة أو الطريقة القديمة   before: البديل القديم (للمقارنة)
//  unbox: فتح الكرتونة            demo: المنتج وهو شغال                 feature: لقطة لميزة معينة
//  result: النتيجة                lifestyle: المنتج في مكان استخدامه    talking: حد بيتكلم عن المنتج
export const clipRoles = [
  "hook",
  "problem",
  "before",
  "unbox",
  "demo",
  "feature",
  "result",
  "lifestyle",
  "talking",
] as const;

const clipSchema = z.object({
  id: z.string(),
  // مسار الملف جوه public، مثلاً products/portable-sink/clips/demo.mp4
  file: z.string(),
  role: z.enum(clipRoles),
  // لو role = feature: الـ id بتاع الميزة
  feature: z.string().optional(),
  // لو اللقطة مناسبة لزاوية معينة بس
  angle: z.string().optional(),
  // لو الملف فيديو طويل: من ثانية كام لكام
  start: z.number().optional(),
  end: z.number().optional(),
  // true = صوت اللقطة يشتغل (مثلاً حد بيتكلم). الافتراضي من غير صوت
  audio: z.boolean().optional(),
});

const useSchema = z.object({ icon: z.enum(iconNames), label: z.string() });

export const productSchema = z.object({
  // معرّف المنتج بالإنجليزي (حروف صغيرة وشرطة)
  id: z.string(),
  // اسم قصير بيتكتب في اسم الإعلان: P-<code>
  code: z.string(),
  name: z.string(),
  tagline: z.string(),
  currency: z.enum(["IQD", "SAR"]),
  price: z.number(),
  // سعر قبل الخصم (اختياري): بيظهر عليه خط
  oldPrice: z.number().optional(),
  // عرض إضافي (اختياري) مثل: "قطعتين بـ 170,000"
  offer: z.string().optional(),
  features: z
    .array(
      z.object({
        id: z.string(),
        icon: z.enum(iconNames),
        title: z.string(),
        text: z.string(),
        image: z.string(),
      }),
    )
    .min(1),
  // الزاوية (Angle): العميل هيشتري ليه. كل زاوية ليها مشاكلها وترتيب مميزاتها
  angles: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        problems: z.array(z.string()).min(1),
        // ترتيب المميزات بالـ id (الأهم الأول)
        featureOrder: z.array(z.string()),
        usesTitle: z.string(),
        uses: z.array(useSchema),
        // ستايل POV (اختياري): الجملة اللي بعد "POV:"
        pov: z.string().optional(),
        // ستايل المقارنة (اختياري). لو مش موجود: المشاكل قصاد المميزات
        compare: z
          .object({
            beforeLabel: z.string(),
            rows: z.array(z.object({ before: z.string(), after: z.string() })),
          })
          .optional(),
      }),
    )
    .min(1),
  // الهوك: أول 3 ثواني. كل هوك تابع لزاوية وليه باترن (فضول، سؤال، رقم...)
  hooks: z
    .array(
      z.object({
        id: z.string(),
        angle: z.string(),
        pattern: z.string(),
        top: z.string(),
        main: z.string(),
        // كلمة أو أكتر من جملة main تتلوّن
        highlight: z.string(),
      }),
    )
    .min(1),
  cta: z.object({
    headline: z.string(),
    button: z.string(),
    line: z.string(),
    whatsapp: z.string().optional(),
  }),
  // لقطات حقيقية (اختياري). من غيرها المشروع بيستخدم الصور
  clips: z.array(clipSchema).optional(),
  images: z.object({
    // صورة المنتج الأساسية
    product: z.string(),
    // صورة المنتج وهو مستخدم (خلفية مشهد الاستخدامات)
    lifestyle: z.string(),
  }),
  theme: z.object({
    dark: z.string(),
    primary: z.string(),
    accent: z.string(),
  }),
});

// الإعلان = منتج × زاوية × هوك × فورمات
export const adSchema = z.object({
  productId: z.string(),
  angleId: z.string(),
  hookId: z.string(),
  format: z.enum(formats),
});

export type Product = z.infer<typeof productSchema>;
export type AdProps = z.infer<typeof adSchema>;
export type Format = (typeof formats)[number];
export type IconName = (typeof iconNames)[number];
export type Feature = Product["features"][number];
export type Angle = Product["angles"][number];
export type Hook = Product["hooks"][number];
export type Clip = z.infer<typeof clipSchema>;
export type ClipRole = (typeof clipRoles)[number];

// المحتوى النهائي اللي المشاهد بتعرضه بعد اختيار الزاوية والهوك
export type AdContent = Pick<
  Product,
  "name" | "tagline" | "currency" | "price" | "oldPrice" | "offer" | "cta" | "images" | "theme"
> & {
  angle: Angle;
  clips: Clip[];
  hook: Hook;
  problems: string[];
  features: Feature[];
  usesTitle: string;
  uses: Angle["uses"];
};
