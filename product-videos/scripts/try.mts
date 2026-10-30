// تجربة سريعة قبل ما تطلّع الفيديو كله: جزء صغير بنص الجودة، أو فريم واحد كصورة
//   npm run try -- P-sink_A-kashta_F-ugc_H-kq                 أول 3 ثواني
//   npm run try -- P-sink_A-kashta_F-ugc_H-kq --from 5 --to 9   من ثانية 5 لـ 9
//   npm run try -- P-sink_A-kashta_F-ugc_H-kq --still 2         صورة من ثانية 2
//   npm run try -- P-sink_A-kashta_F-ugc_H-kq --theme neon      بقالب تاني
// الملفات بتطلع في out/try
import path from "node:path";
import { parseAdName } from "../src/lib/resolve";
import { themeIds, type ThemeId } from "../src/themes";
import { parseArgs, str } from "./lib/args.mjs";
import { createRenderer, root } from "./lib/render.mjs";

const FPS = 30;
const { args, positional } = parseArgs();
if (!positional[0]) {
  console.log("اكتب اسم الإعلان: npm run try -- P-sink_A-kashta_F-ugc_H-kq");
  process.exit(1);
}
const ad = parseAdName(positional[0]);
const theme = str(args.theme);
if (theme) {
  if (!themeIds.includes(theme as ThemeId)) {
    console.log(`القالب لازم يكون واحد من: ${themeIds.join(" | ")}`);
    process.exit(1);
  }
  ad.themeId = theme as ThemeId;
}

const render = await createRenderer();
const outDir = path.join(root, "out", "try");
const still = str(args.still);
if (still !== undefined || ad.format === "static") {
  await render(ad, { still: Math.round(Number(still ?? 0) * FPS), outDir });
} else {
  const from = Number(str(args.from) ?? 0);
  const to = Number(str(args.to) ?? from + 3);
  await render(ad, { frameRange: [Math.round(from * FPS), Math.round(to * FPS) - 1], scale: 0.5, outDir });
}
