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

export const productSchema = z.object({
  // معرّف المنتج بالإنجليزي (حروف صغيرة وشرطة): بيتكتب في اسم الفيديو
  id: z.string(),
  name: z.string(),
  tagline: z.string(),
  currency: z.enum(["IQD", "SAR"]),
  price: z.number(),
  // سعر قبل الخصم (اختياري): بيظهر عليه خط
  oldPrice: z.number().optional(),
  // عرض إضافي (اختياري) مثل: "قطعتين بـ 170,000"
  offer: z.string().optional(),
  // كل Hook بيطلع فيديو مستقل عشان تجربهم في الإعلانات
  hooks: z
    .array(
      z.object({
        top: z.string(),
        main: z.string(),
        // كلمة من جملة main تتلوّن
        highlight: z.string(),
      }),
    )
    .min(1),
  problems: z.array(z.string()).min(1),
  features: z
    .array(
      z.object({
        icon: z.enum(iconNames),
        title: z.string(),
        text: z.string(),
        image: z.string(),
      }),
    )
    .min(1),
  usesTitle: z.string(),
  uses: z.array(z.object({ icon: z.enum(iconNames), label: z.string() })),
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

export const adSchema = z.object({
  product: productSchema,
  hookIndex: z.number().int().min(0),
});

export type Product = z.infer<typeof productSchema>;
export type AdProps = z.infer<typeof adSchema>;
export type IconName = (typeof iconNames)[number];
