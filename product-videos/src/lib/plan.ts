// خطط الإعلانات: الأساسية، اختبار الزوايا، وطريقة الـ Winner Creative
import { products } from "../products";
import { formats, type AdProps } from "../schema";
import { findProduct } from "./resolve";

export type PlannedAd = AdProps & {
  // الإعلان ده بيختبر أنهي عنصر (هو الحاجة الوحيدة اللي اتغيرت)
  tests: "hook" | "format" | "angle" | "base";
  change: string;
};

export type Plan = { ads: PlannedAd[]; missing: string[] };

export const patternLabel: Record<string, string> = {
  question: "سؤال",
  curiosity: "فضول",
  number: "رقم/فايدة",
};

export const formatLabel: Record<AdProps["format"], string> = {
  showcase: "عرض المنتج",
  short: "مختصر",
  static: "صورة ثابتة",
  ugc: "UGC",
  compare: "قبل وبعد / مقارنة",
  reasons: "3 أسباب",
  pov: "POV",
};

// الإعلانات الأساسية: هوكات أول زاوية بفورمات العرض الكامل
export const defaultAds = (productId?: string): AdProps[] =>
  products
    .filter((p) => !productId || p.id === productId || p.code === productId)
    .flatMap((product) => {
      const angle = product.angles[0];
      return product.hooks
        .filter((hook) => hook.angle === angle.id)
        .map((hook) => ({ productId: product.id, angleId: angle.id, hookId: hook.id, format: "showcase" as const }));
    });

// اختبار الزوايا: كل زاوية بنفس الفورمات ونفس باترن الهوك عشان المقارنة تبقى عادلة
export const anglesPlan = (productId: string, format: AdProps["format"], pattern?: string): Plan => {
  const product = findProduct(productId);
  const wanted = pattern ?? product.hooks[0].pattern;
  const missing: string[] = [];
  const ads = product.angles.flatMap((angle) => {
    const hook = product.hooks.find((h) => h.angle === angle.id && h.pattern === wanted);
    if (!hook) {
      missing.push(`هوك باترن "${wanted}" للزاوية "${angle.id}"`);
      return [];
    }
    return [{ productId: product.id, angleId: angle.id, hookId: hook.id, format, tests: "angle" as const, change: `زاوية: ${angle.label}` }];
  });
  return { ads, missing };
};

// طريقة الـ Winner Creative:
// الإعلان الكسبان = Angle + Hook + Format، وكل واحد ساهم بنسبة مختلفة.
// كل نسخة جديدة بتغيّر عنصر واحد بس، فالنتايج بتقول أنهي عنصر كان السبب.
//  - Winner Angle: نفس الزاوية + هوك تاني (نفس الفورمات)، ونفس الزاوية + فورمات تاني (نفس الهوك)
//  - Winner Hook: نفس "باترن" الهوك على زوايا تانية، وعلى فورمات تانية
//  - Winner Format: نفس الفورمات بزوايا تانية وهوكات تانية
// tryFormats: الفورمات اللي تتجرّب كـ «فورمات تاني» (الافتراضي: كلهم)
export const winnerPlan = (
  winner: AdProps,
  only?: "angle" | "hook" | "format",
  tryFormats: readonly AdProps["format"][] = formats,
): Plan => {
  const product = findProduct(winner.productId);
  const winnerHook = product.hooks.find((h) => h.id === winner.hookId);
  if (!winnerHook) throw new Error(`الهوك "${winner.hookId}" مش موجود في ${product.id}`);
  const missing: string[] = [];
  // القالب بيفضل زي ما هو في كل النسخ (تغييره = تغيير عنصر رابع)
  const base = { productId: product.id, ...(winner.themeId ? { themeId: winner.themeId } : {}) };

  // نفس الزاوية والفورمات، هوك تاني (بيختبر الهوك)
  const newHooks: PlannedAd[] = product.hooks
    .filter((h) => h.angle === winner.angleId && h.id !== winner.hookId)
    .map((h) => ({
      ...base,
      angleId: winner.angleId,
      format: winner.format,
      hookId: h.id,
      tests: "hook",
      change: `هوك جديد (${patternLabel[h.pattern] ?? h.pattern})`,
    }));
  if (newHooks.length === 0) missing.push(`هوكات تانية للزاوية "${winner.angleId}"`);

  // نفس الزاوية والهوك، فورمات تاني (بيختبر الفورمات)
  const newFormats: PlannedAd[] = tryFormats
    .filter((f) => f !== winner.format)
    .map((f) => ({
      ...base,
      angleId: winner.angleId,
      hookId: winner.hookId,
      format: f,
      tests: "format",
      change: `فورمات: ${formatLabel[f]}`,
    }));

  // نفس باترن الهوك ونفس الفورمات، زاوية تانية (بيختبر الزاوية)
  const newAngles: PlannedAd[] = product.angles
    .filter((a) => a.id !== winner.angleId)
    .flatMap((a) => {
      const hook = product.hooks.find((h) => h.angle === a.id && h.pattern === winnerHook.pattern);
      if (!hook) {
        missing.push(`هوك باترن "${winnerHook.pattern}" للزاوية "${a.id}"`);
        return [];
      }
      return [
        {
          ...base,
          angleId: a.id,
          hookId: hook.id,
          format: winner.format,
          tests: "angle" as const,
          change: `زاوية: ${a.label} (نفس باترن الهوك)`,
        },
      ];
    });

  const branches = {
    angle: [...newHooks, ...newFormats],
    hook: [...newAngles, ...newFormats],
    format: [...newHooks, ...newAngles],
  };
  const chosen = only ? branches[only] : [...newHooks, ...newFormats, ...newAngles];
  const seen = new Set<string>();
  const ads = chosen.filter((ad) => {
    const key = `${ad.angleId}|${ad.hookId}|${ad.format}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return { ads, missing };
};
