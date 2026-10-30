// اختبار الزوايا (قبل ما يبقى عندك إعلان كسبان): كل زاوية بنفس الفورمات ونفس باترن الهوك
//   npm run angles -- sink
//   npm run angles -- sink --format static --pattern curiosity
//   npm run angles -- sink --dry
//   npm run angles -- sink --theme bold
import { formats } from "../src/schema";
import { anglesPlan, formatLabel } from "../src/lib/plan";
import { adName, findProduct } from "../src/lib/resolve";
import { parseArgs, str } from "./lib/args.mjs";
import { themeArg } from "./lib/theme-arg.mjs";
import { logAds } from "./lib/log.mjs";
import { createRenderer } from "./lib/render.mjs";

const { args, positional } = parseArgs();
const product = findProduct(positional[0] ?? "");
const format = (str(args.format) ?? "showcase") as (typeof formats)[number];
if (!formats.includes(format)) {
  console.log(`--format لازم يكون واحد من: ${formats.join(" | ")}`);
  process.exit(1);
}

const themeId = themeArg(args);
const plan = anglesPlan(product.id, format, str(args.pattern));
const ads = plan.ads.map((ad) => (themeId ? { ...ad, themeId } : ad));
const { missing } = plan;
console.log(`\nاختبار الزوايا لـ ${product.name} (${formatLabel[format]}):`);
for (const ad of ads) console.log(`  ${adName(ad)}  ← ${ad.change}`);
if (missing.length) {
  console.log("\n⚠️ ناقص في ملف المنتج:");
  for (const m of missing) console.log(`  - ${m}`);
}

if (args.dry || ads.length === 0) process.exit(0);

const render = await createRenderer();
for (const ad of ads) await render(ad);
const logged = logAds(ads, "اختبار زوايا");
console.log(`\nاتسجّل ${logged} إعلان في results/ads-log.csv`);
