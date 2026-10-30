// طريقة الـ Winner Creative: من إعلان كسبان نطلّع نسخ، كل نسخة بتغيّر عنصر واحد بس
//   npm run winner -- P-sink_A-kashta_F-showcase_H-kq
//   npm run winner -- P-sink_A-kashta_F-showcase_H-kq --only hook   (فرع واحد: angle | hook | format)
//   npm run winner -- P-sink_A-kashta_F-showcase_H-kq --formats ugc,static   (الفورمات اللي تتجرّب)
//   npm run winner -- P-sink_A-kashta_F-showcase_H-kq --dry         (يعرض الخطة من غير ما يطلّع فيديوهات)
import { formatLabel, patternLabel, winnerPlan } from "../src/lib/plan";
import { adName, findProduct, parseAdName } from "../src/lib/resolve";
import { formats } from "../src/schema";
import { parseArgs, str } from "./lib/args.mjs";
import { logAds } from "./lib/log.mjs";
import { createRenderer } from "./lib/render.mjs";

const { args, positional } = parseArgs();
const winnerName = positional[0];
if (!winnerName) {
  console.log("اكتب اسم الإعلان الكسبان: npm run winner -- P-sink_A-kashta_F-showcase_H-kq");
  process.exit(1);
}
const only = str(args.only) as "angle" | "hook" | "format" | undefined;
if (only && !["angle", "hook", "format"].includes(only)) {
  console.log("--only لازم تكون angle أو hook أو format");
  process.exit(1);
}

const winner = parseAdName(winnerName);
const product = findProduct(winner.productId);
const hook = product.hooks.find((h) => h.id === winner.hookId)!;
const tryFormats = str(args.formats)?.split(",") as (typeof formats)[number][] | undefined;
const unknown = tryFormats?.filter((f) => !formats.includes(f));
if (unknown?.length) {
  console.log(`فورمات مش معروف: ${unknown.join(", ")}. المتاح: ${formats.join(" | ")}`);
  process.exit(1);
}
const { ads, missing } = winnerPlan(winner, only, tryFormats);

console.log(`\nالإعلان الكسبان: ${adName(winner)}`);
console.log(`  الزاوية: ${product.angles.find((a) => a.id === winner.angleId)?.label}`);
console.log(`  الفورمات: ${formatLabel[winner.format]}`);
console.log(`  باترن الهوك: ${patternLabel[hook.pattern] ?? hook.pattern} ← "${hook.main}"\n`);

const groups = { hook: "بيختبر الهوك", format: "بيختبر الفورمات", angle: "بيختبر الزاوية" } as const;
for (const [tests, title] of Object.entries(groups)) {
  const group = ads.filter((ad) => ad.tests === tests);
  if (group.length === 0) continue;
  console.log(`${title}:`);
  for (const ad of group) console.log(`  ${adName(ad)}  ← ${ad.change}`);
}
if (missing.length) {
  console.log("\n⚠️ ناقص في ملف المنتج (اكتبهم عشان الخطة تكمل):");
  for (const m of missing) console.log(`  - ${m}`);
}
console.log(`\nالمجموع: ${ads.length} إعلان جديد`);

if (args.dry || ads.length === 0) process.exit(0);

const render = await createRenderer();
for (const ad of ads) await render(ad);
const logged = logAds(ads, adName(winner));
console.log(`\nاتسجّل ${logged} إعلان في results/ads-log.csv`);
