// يطلّع الإعلانات الأساسية (هوكات أول زاوية) في فولدر out
//   npm run render:all             → كل المنتجات
//   npm run render:all -- sink     → منتج واحد بس
import { defaultAds } from "../src/lib/plan";
import { parseArgs } from "./lib/args.mjs";
import { createRenderer } from "./lib/render.mjs";

const { positional } = parseArgs();
const ads = defaultAds(positional[0]);
if (ads.length === 0) throw new Error(`مفيش منتج اسمه "${positional[0]}"`);

const render = await createRenderer();
for (const ad of ads) await render(ad);
