import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { fontNames } from "./themes";

// كل الخطوط جوه public/fonts، فمش محتاجين إنترنت وقت الـ render
// (الرخص في public/fonts/licenses)
for (const family of fontNames) {
  loadFont({
    family,
    url: staticFile(`fonts/${family}.ttf`),
    weight: "100 1000",
  });
}
