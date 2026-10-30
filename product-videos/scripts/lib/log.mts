// دفتر النتايج: كل إعلان بيطلع بيتسجّل في results/ads-log.csv
// انت بتملا أرقامه بعد ما يشتغل (الصرف، Hook Rate، CTR، الطلبات...)
import fs from "node:fs";
import path from "node:path";
import { formatLabel, patternLabel, type PlannedAd } from "../../src/lib/plan";
import { adName, findProduct } from "../../src/lib/resolve";
import { root } from "./render.mjs";

const LOG = path.join(root, "results", "ads-log.csv");

const HEADER = [
  "التاريخ",
  "اسم الإعلان",
  "المنتج",
  "الزاوية",
  "الفورمات",
  "الهوك",
  "باترن الهوك",
  "الإعلان الأصلي",
  "اللي اتغيّر",
  "الصرف",
  "الظهور",
  "Hook Rate",
  "CTR",
  "الطلبات",
  "المؤكد",
  "المستلم",
  "تكلفة الطلب المؤكد",
  "الحكم",
];

const cell = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

export const logAds = (ads: PlannedAd[], parent: string) => {
  if (!fs.existsSync(LOG)) {
    fs.mkdirSync(path.dirname(LOG), { recursive: true });
    // BOM عشان Excel يقرأ العربي صح
    fs.writeFileSync(LOG, "﻿" + HEADER.join(",") + "\n");
  }
  const existing = fs.readFileSync(LOG, "utf8");
  const today = new Date().toISOString().slice(0, 10);
  const rows = ads
    .filter((ad) => !existing.includes(`,${adName(ad)},`))
    .map((ad) => {
      const product = findProduct(ad.productId);
      const hook = product.hooks.find((h) => h.id === ad.hookId)!;
      const angle = product.angles.find((a) => a.id === ad.angleId)!;
      return [
        today,
        adName(ad),
        product.name,
        angle.label,
        formatLabel[ad.format],
        hook.main,
        patternLabel[hook.pattern] ?? hook.pattern,
        parent,
        ad.change,
        ...Array(HEADER.length - 9).fill(""),
      ]
        .map(cell)
        .join(",");
    });
  if (rows.length) fs.appendFileSync(LOG, rows.join("\n") + "\n");
  return rows.length;
};
