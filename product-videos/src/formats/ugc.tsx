import { mediaFor } from "../lib/media";
import type { AdContent } from "../schema";
import { Cta } from "../scenes/Cta";
import { Offer } from "../scenes/Offer";
import { Shot } from "./Shot";
import { TIMING } from "../lib/timing";
import type { BuiltAd } from "./types";

// UGC: لقطات ملء الشاشة بقطع سريع، والكلام مكتوب عليها بستايل تيك توك
export const buildUgc = (content: AdContent): BuiltAd => {
  const { theme, hook } = content;
  const problemMedia = mediaFor(content, { kind: "problem" }) ?? mediaFor(content, { kind: "lifestyle" })!;
  const t = TIMING.ugc;
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
        name: "Problem",
        frames: t.problem,
        el: <Shot media={problemMedia} theme={theme} caption={content.problems[0]} />,
      },
      ...features.map((feature, i) => ({
        name: feature.title,
        frames: t.feature,
        el: (
          <Shot
            media={mediaFor(content, { kind: "feature", featureId: feature.id, image: feature.image }, i)!}
            theme={theme}
            caption={feature.title}
            sub={feature.text}
          />
        ),
      })),
      {
        name: "Result",
        frames: t.result,
        el: (
          <Shot
            media={mediaFor(content, { kind: "result" })!}
            theme={theme}
            caption={`${content.name} ${content.tagline}`}
            highlight={content.tagline}
          />
        ),
      },
      { name: "Offer", frames: TIMING.end.offer, el: <Offer content={content} /> },
      { name: "Cta", frames: TIMING.end.cta, el: <Cta content={content} /> },
    ],
  };
};
