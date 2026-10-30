// يطلّع الإعلانات الأساسية (هوكات أول زاوية) في فولدر out
//   npm run render:all             → كل المنتجات
//   npm run render:all -- sink     → منتج واحد بس
//   npm run render:all -- sink --theme fresh   → بقالب تاني
import { defaultAds } from "../src/lib/plan";
import { themeArg } from "./lib/theme-arg.mjs";
import { parseArgs } from "./lib/args.mjs";
import { createRenderer } from "./lib/render.mjs";

const { args, positional } = parseArgs();
const themeId = themeArg(args);
const ads = defaultAds(positional[0]).map((ad) => (themeId ? { ...ad, themeId } : ad));
if (ads.length === 0) throw new Error(`مفيش منتج اسمه "${positional[0]}"`);

const render = await createRenderer();
for (const ad of ads) await render(ad);
