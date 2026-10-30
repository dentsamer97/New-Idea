// يوريك اللقطات الحقيقية اللي عند المنتج، وأنهي أماكن لسه بتستخدم صور
//   npm run clips -- sink
import fs from "node:fs";
import path from "node:path";
import { findProduct } from "../src/lib/resolve";
import { clipRoles } from "../src/schema";
import { parseArgs } from "./lib/args.mjs";
import { root } from "./lib/render.mjs";

const roleLabel: Record<(typeof clipRoles)[number], string> = {
  hook: "لقطة تشد في الأول",
  problem: "المشكلة / الطريقة القديمة",
  before: "البديل القديم (للمقارنة)",
  unbox: "فتح الكرتونة",
  demo: "المنتج وهو شغال",
  feature: "لقطة لميزة معينة",
  result: "النتيجة",
  lifestyle: "المنتج في مكان استخدامه",
  talking: "حد بيتكلم عن المنتج",
};

const { positional } = parseArgs();
const product = findProduct(positional[0] ?? "");
const clips = product.clips ?? [];

console.log(`\nلقطات ${product.name}: ${clips.length}\n`);
for (const clip of clips) {
  const exists = fs.existsSync(path.join(root, "public", clip.file));
  const range = clip.start !== undefined || clip.end !== undefined ? ` (${clip.start ?? 0}ث ← ${clip.end ?? "الآخر"}ث)` : "";
  const extra = [clip.feature && `ميزة: ${clip.feature}`, clip.angle && `زاوية: ${clip.angle}`, clip.audio && "بالصوت"]
    .filter(Boolean)
    .join("، ");
  console.log(`  ${exists ? "✓" : "✗ الملف مش موجود"}  ${clip.id}  [${clip.role}]${range}${extra ? `  ${extra}` : ""}`);
}

console.log("\nالأنواع:");
for (const role of clipRoles) {
  if (role === "feature") continue;
  const count = clips.filter((c) => c.role === role).length;
  console.log(`  ${count ? "✓" : "·"} ${role.padEnd(9)} ${roleLabel[role]}${count ? ` (${count})` : ""}`);
}
console.log("\nالمميزات:");
for (const feature of product.features) {
  const has = clips.some((c) => c.role === "feature" && c.feature === feature.id);
  console.log(`  ${has ? "✓ لقطة" : "· صورة"}  ${feature.id}  ${feature.title}`);
}
console.log("\n· = لسه بيستخدم صورة. ضيف لقطة من النوع ده عشان تتبدل لوحدها.");
