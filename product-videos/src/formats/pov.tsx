import { mediaFor } from "../lib/media";
import type { AdContent } from "../schema";
import { Cta } from "../scenes/Cta";
import { Offer } from "../scenes/Offer";
import { Shot } from "./Shot";
import { END_FRAMES, type BuiltAd } from "./types";

// POV: «POV: لما تكون...» في بوكس أبيض فوق، ولقطات سريعة للمنتج
export const buildPov = (content: AdContent): BuiltAd => {
  const { theme, hook } = content;
  const povLine = content.angle.pov ?? `لما تكون الوحيد اللي جايب ${content.name}`;
  const features = content.features.slice(0, 4);

  return {
    cuts: true,
    scenes: [
      {
        name: "Hook",
        frames: 75,
        el: (
          <Shot
            media={mediaFor(content, { kind: "hook" })!}
            theme={theme}
            label={hook.top}
            caption={hook.main}
            highlight={hook.highlight}
          />
        ),
      },
      {
        name: "POV",
        frames: 90,
        el: (
          <Shot media={mediaFor(content, { kind: "lifestyle" })!} theme={theme} prefix="POV:" caption={povLine} position="top" />
        ),
      },
      ...features.map((feature, i) => ({
        name: feature.title,
        frames: 45,
        el: (
          <Shot
            media={mediaFor(content, { kind: "feature", featureId: feature.id, image: feature.image }, i)!}
            theme={theme}
            caption={feature.title}
            position="top"
          />
        ),
      })),
      { name: "Offer", frames: END_FRAMES.offer, el: <Offer content={content} /> },
      { name: "Cta", frames: END_FRAMES.cta, el: <Cta content={content} /> },
    ],
  };
};
