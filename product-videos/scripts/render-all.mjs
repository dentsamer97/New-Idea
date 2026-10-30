// يطلّع كل الفيديوهات (كل منتج × كل Hook) في فولدر out
// الاستخدام:
//   npm run render:all                 → كل المنتجات
//   npm run render:all -- portable-sink → منتج واحد بس
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const filter = process.argv[2];
// لو عايز تستخدم متصفح معين: REMOTION_BROWSER=/path/to/chrome
const browserExecutable = process.env.REMOTION_BROWSER || null;

console.log("تجهيز المشروع...");
const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const compositions = await getCompositions(serveUrl, { browserExecutable });

const targets = compositions.filter(
  (c) => !c.id.startsWith("Scene-") && (!filter || c.id.startsWith(filter)),
);

for (const composition of targets) {
  const outputLocation = path.join(root, "out", `${composition.id}.mp4`);
  console.log(`جاري إخراج ${composition.id}...`);
  await renderMedia({
    serveUrl,
    composition,
    codec: "h264",
    outputLocation,
    browserExecutable,
    onProgress: ({ progress }) => process.stdout.write(`\r${Math.round(progress * 100)}%`),
  });
  console.log(`\n✓ ${outputLocation}`);
}
