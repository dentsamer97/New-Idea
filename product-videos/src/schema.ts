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

// أشكال الإعلان اللي المشروع بيطلّعها
//  showcase: فيديو عرض المنتج كامل (~32 ثانية)
//  short:    نسخة مختصرة (~14 ثانية)
//  static:   صورة ثابتة
export const formats = ["showcase", "short", "static"] as const;

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

// المحتوى النهائي اللي المشاهد بتعرضه بعد اختيار الزاوية والهوك
export type AdContent = Pick<
  Product,
  "name" | "tagline" | "currency" | "price" | "oldPrice" | "offer" | "cta" | "images" | "theme"
> & {
  hook: Hook;
  problems: string[];
  features: Feature[];
  usesTitle: string;
  uses: Angle["uses"];
};
