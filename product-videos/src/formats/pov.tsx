import { mediaFor } from "../lib/media";
import type { AdContent } from "../schema";
import { Cta } from "../scenes/Cta";
import { Offer } from "../scenes/Offer";
import { Shot } from "./Shot";
import { TIMING } from "../lib/timing";
import type { BuiltAd } from "./types";

// POV: «POV: لما تكون...» في بوكس أبيض فوق، ولقطات سريعة للمنتج
export const buildPov = (content: AdContent): BuiltAd => {
  const { theme, hook } = content;
  const povLine = content.angle.pov ?? `لما تكون الوحيد اللي جايب ${content.name}`;
  const t = TIMING.pov;
  const features = content.features.slice(0, t.maxFeatures);

  return {
    cuts: true,
    scenes: [
      {
        name: "Hook",
        frames: t.hook,
        el: (
          <Shot
            media={mediaFor(content, { kind: "hook" })!}
            theme={theme}
            label={hook.top}
            caption={hook.main}
            highlight={hook.highlight}
            visibleAtStart
          />
        ),
      },
      {
        name: "POV",
        frames: t.pov,
        el: (
          <Shot media={mediaFor(content, { kind: "lifestyle" })!} theme={theme} prefix="POV:" caption={povLine} position="top" />
        ),
      },
      ...features.map((feature, i) => ({
        name: feature.title,
        frames: t.feature,
        el: (
          <Shot
            media={mediaFor(content, { kind: "feature", featureId: feature.id, image: feature.image }, i)!}
            theme={theme}
            caption={feature.title}
            position="top"
          />
        ),
      })),
      { name: "Offer", frames: TIMING.end.offer, el: <Offer content={content} /> },
      { name: "Cta", frames: TIMING.end.cta, el: <Cta content={content} /> },
    ],
  };
};
