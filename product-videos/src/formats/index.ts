import { TRANSITION_FRAMES } from "../lib/timing";
import type { AdContent, Format } from "../schema";
import { buildCompare } from "./compare";
import { buildPov } from "./pov";
import { buildReasons } from "./reasons";
import { buildShowcase } from "./showcase";
import type { BuiltAd } from "./types";
import { buildUgc } from "./ugc";

export type VideoFormat = Exclude<Format, "static">;

export const buildAd = (content: AdContent, format: VideoFormat): BuiltAd => {
  switch (format) {
    case "showcase":
    case "short":
      return buildShowcase(content, format);
    case "ugc":
      return buildUgc(content);
    case "pov":
      return buildPov(content);
    case "compare":
      return buildCompare(content);
    case "reasons":
      return buildReasons(content);
  }
};

export const builtDuration = ({ scenes, cuts }: BuiltAd) =>
  scenes.reduce((sum, s) => sum + s.frames, 0) - (cuts ? 0 : TRANSITION_FRAMES * (scenes.length - 1));
