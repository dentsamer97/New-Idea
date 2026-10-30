import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import { adName } from "../../src/lib/resolve";
import type { AdProps } from "../../src/schema";

export const root = path.resolve(import.meta.dirname, "../..");

// لو عايز تستخدم متصفح معين: REMOTION_BROWSER=/path/to/chrome
const browserExecutable = process.env.REMOTION_BROWSER || null;

export const createRenderer = async () => {
  console.log("تجهيز المشروع...");
  const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });

  return async (ad: AdProps) => {
    const name = adName(ad);
    const inputProps = { ...ad };
    if (ad.format === "static") {
      const output = path.join(root, "out", `${name}.png`);
      const composition = await selectComposition({ serveUrl, id: "AdStatic", inputProps, browserExecutable });
      await renderStill({ serveUrl, composition, inputProps, output, browserExecutable });
      console.log(`✓ ${name}.png`);
      return output;
    }
    const outputLocation = path.join(root, "out", `${name}.mp4`);
    const composition = await selectComposition({ serveUrl, id: "Ad", inputProps, browserExecutable });
    await renderMedia({
      serveUrl,
      composition,
      inputProps,
      codec: "h264",
      outputLocation,
      browserExecutable,
      onProgress: ({ progress }) => process.stdout.write(`\r${name}: ${Math.round(progress * 100)}%`),
    });
    console.log(`\n✓ ${name}.mp4`);
    return outputLocation;
  };
};
