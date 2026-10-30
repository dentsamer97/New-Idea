import { products } from "../products";
import type { AdContent, AdProps, Product } from "../schema";

export const findProduct = (productId: string): Product => {
  const product = products.find((p) => p.id === productId || p.code === productId);
  if (!product) throw new Error(`المنتج "${productId}" مش موجود في src/products`);
  return product;
};

// يجمع بيانات الإعلان: المنتج + الزاوية + الهوك
export const resolveAd = ({ productId, angleId, hookId }: AdProps): AdContent => {
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
    theme: product.theme,
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
  return `P-${product.code}_A-${ad.angleId}_F-${ad.format}_H-${ad.hookId}`;
};

export const parseAdName = (name: string): AdProps => {
  const match = /^P-(.+)_A-(.+)_F-(showcase|short|static)_H-(.+)$/.exec(name.replace(/\.(mp4|png)$/, ""));
  if (!match) throw new Error(`اسم الإعلان "${name}" مش بالشكل P-منتج_A-زاوية_F-فورمات_H-هوك`);
  const [, code, angleId, format, hookId] = match;
  return { productId: findProduct(code).id, angleId, format: format as AdProps["format"], hookId };
};
