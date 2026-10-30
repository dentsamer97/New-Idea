import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_FAMILY = "Cairo";

loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/Cairo.ttf"),
  weight: "200 1000",
});
