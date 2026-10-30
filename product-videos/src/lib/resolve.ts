import { products } from "../products";
import { formats, type AdContent, type AdProps, type Product } from "../schema";
import { autoTheme, themes, type Theme, type ThemeId } from "../themes";

// القالب: المكتوب في الأمر، أو في ملف المنتج، أو الثابت المحسوب من اسمه
export const productThemeId = (product: Product, override?: ThemeId): ThemeId =>
  override ?? product.theme ?? autoTheme(product.id);

const resolveTheme = (product: Product, override?: ThemeId): Theme => {
  const base = themes[productThemeId(product, override)];
  return {
    ...base,
    ...product.colors,
    fonts: { ...base.fonts, ...product.fonts },
  };
};

export const findProduct = (productId: string): Product => {
  const product = products.find((p) => p.id === productId || p.code === productId);
  if (!product) throw new Error(`المنتج "${productId}" مش موجود في src/products`);
  return product;
};

// يجمع بيانات الإعلان: المنتج + الزاوية + الهوك
export const resolveAd = ({ productId, angleId, hookId, themeId }: AdProps): AdContent => {
  const product = findProduct(productId);
  const angle = product.angles.find((a) => a.id === angleId);
  if (!angle) throw new Error(`الزاوية "${angleId}" مش موجودة في ${product.id}`);
  const hook = product.hooks.find((h) => h.id === hookId);
  if (!hook) throw new Error(`الهوك "${hookId}" مش موجود في ${product.id}`);

  const ordered = angle.featureOrder
    .map((id) => product.features.find((f) => f.id === id))
    .filter((f) => f !== undefined);
  const rest = product.features.filter((f) => !angle.featureOrder.includes(f.id));

  return {
    name: product.name,
    tagline: product.tagline,
    currency: product.currency,
    price: product.price,
    oldPrice: product.oldPrice,
    offer: product.offer,
    cta: product.cta,
    images: product.images,
    reviews: product.reviews,
    faq: product.faq,
    limited: product.limited,
    music: product.music,
    sfx: product.sfx ?? true,
    theme: resolveTheme(product, themeId),
    angle,
    clips: product.clips ?? [],
    hook,
    problems: angle.problems,
    features: [...ordered, ...rest],
    usesTitle: angle.usesTitle,
    uses: angle.uses,
  };
};

// اسم الإعلان بنظام ثابت: P-منتج_A-زاوية_F-فورمات_H-هوك
export const adName = (ad: AdProps) => {
  const product = findProduct(ad.productId);
  const name = `P-${product.code}_A-${ad.angleId}_F-${ad.format}_H-${ad.hookId}`;
  // قالب متغيّر للتجربة بيتكتب في الآخر عشان الملف ميتكتبش فوق التاني
  return ad.themeId ? `${name}_T-${ad.themeId}` : name;
};

export const parseAdName = (name: string): AdProps => {
  const match = new RegExp(`^P-(.+)_A-(.+)_F-(${formats.join("|")})_H-(.+?)(?:_T-(\\w+))?$`).exec(
    name.replace(/\.(mp4|png)$/, ""),
  );
  if (!match) throw new Error(`اسم الإعلان "${name}" مش بالشكل P-منتج_A-زاوية_F-فورمات_H-هوك`);
  const [, code, angleId, format, hookId, themeId] = match;
  return {
    productId: findProduct(code).id,
    angleId,
    format: format as AdProps["format"],
    hookId,
    ...(themeId ? { themeId: themeId as ThemeId } : {}),
  };
};
