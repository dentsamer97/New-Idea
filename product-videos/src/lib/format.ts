import type { Product } from "../schema";

const currencyLabel: Record<Product["currency"], string> = {
  IQD: "د.ع",
  SAR: "ر.س",
};

export const formatNumber = (n: number) => n.toLocaleString("en-US");

export const getCurrencyLabel = (currency: Product["currency"]) =>
  currencyLabel[currency];
