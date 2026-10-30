import { sceneDurations, TIMING } from "../lib/timing";
import type { AdContent } from "../schema";
import { Cta } from "../scenes/Cta";
import { Features } from "../scenes/Features";
import { Hook } from "../scenes/Hook";
import { Offer } from "../scenes/Offer";
import { Problem } from "../scenes/Problem";
import { Proof } from "../scenes/Proof";
import { Reveal } from "../scenes/Reveal";
import { Uses } from "../scenes/Uses";
import type { BuiltAd } from "./types";

// عرض المنتج (showcase) والنسخة المختصرة (short)
export const buildShowcase = (full: AdContent, format: "showcase" | "short"): BuiltAd => {
  const content = { ...full, features: full.features.slice(0, TIMING[format].maxFeatures) };
  const d = sceneDurations(content, format);
  const scenes = [
    { name: "Hook", frames: d.hook, el: <Hook content={content} /> },
    { name: "Problem", frames: d.problem, el: <Problem content={content} /> },
    { name: "Reveal", frames: d.reveal, el: <Reveal content={content} /> },
    {
      name: "Features",
      frames: d.features,
      el: <Features content={content} featureFrames={TIMING[format].feature} />,
    },
    { name: "Uses", frames: d.uses, el: <Uses content={content} /> },
    { name: "Proof", frames: d.proof, el: <Proof content={content} /> },
    { name: "Offer", frames: d.offer, el: <Offer content={content} /> },
    { name: "Cta", frames: d.cta, el: <Cta content={content} /> },
  ].filter((s) => s.frames > 0);
  return { scenes, cuts: false };
};
