import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import { adName } from "../../src/lib/resolve";
import type { AdProps } from "../../src/schema";

export const root = path.resolve(import.meta.dirname, "../..");

// لو عايز تستخدم متصفح معين: REMOTION_BROWSER=/path/to/chrome
const browserExecutable = process.env.REMOTION_BROWSER || null;

// عدد الصفحات اللي بتترندر في نفس الوقت. الافتراضي نص أنوية الجهاز
// لو الجهاز قوي: RENDER_CONCURRENCY=8 npm run ...
const concurrency = process.env.RENDER_CONCURRENCY ? Number(process.env.RENDER_CONCURRENCY) : null;

export type RenderOptions = {
  // جزء من الفيديو بس (بالفريم): [من، لحد]
  frameRange?: [number, number];
  // فريم واحد كصورة
  still?: number;
  // 0.5 = نص الجودة (أسرع للتجربة)
  scale?: number;
  outDir?: string;
};

export const createRenderer = async () => {
  console.log("تجهيز المشروع...");
  const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });

  return async (ad: AdProps, options: RenderOptions = {}) => {
    const name = adName(ad);
    const inputProps = { ...ad };
    const outDir = options.outDir ?? path.join(root, "out");
    if (options.still !== undefined && ad.format !== "static") {
      const output = path.join(outDir, `${name}_${options.still}.png`);
      const composition = await selectComposition({ serveUrl, id: "Ad", inputProps, browserExecutable });
      await renderStill({ serveUrl, composition, inputProps, output, frame: options.still, scale: options.scale, browserExecutable });
      console.log(`✓ ${path.relative(root, output)}`);
      return output;
    }
    if (ad.format === "static") {
      const output = path.join(outDir, `${name}.png`);
      const composition = await selectComposition({ serveUrl, id: "AdStatic", inputProps, browserExecutable });
      await renderStill({ serveUrl, composition, inputProps, output, scale: options.scale, browserExecutable });
      console.log(`✓ ${path.relative(root, output)}`);
      return output;
    }
    const outputLocation = path.join(outDir, `${name}.mp4`);
    const composition = await selectComposition({ serveUrl, id: "Ad", inputProps, browserExecutable });
    await renderMedia({
      serveUrl,
      composition,
      inputProps,
      codec: "h264",
      outputLocation,
      browserExecutable,
      concurrency,
      frameRange: options.frameRange,
      scale: options.scale,
      onProgress: ({ progress }) => process.stdout.write(`\r${name}: ${Math.round(progress * 100)}%`),
    });
    console.log(`\n✓ ${path.relative(root, outputLocation)}`);
    return outputLocation;
  };
};
