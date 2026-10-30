import { mediaFor } from "../lib/media";
import type { AdContent } from "../schema";
import { Cta } from "../scenes/Cta";
import { Offer } from "../scenes/Offer";
import { Shot } from "./Shot";
import { END_FRAMES, type BuiltAd } from "./types";

// UGC: لقطات ملء الشاشة بقطع سريع، والكلام مكتوب عليها بستايل تيك توك
export const buildUgc = (content: AdContent): BuiltAd => {
  const { theme, hook } = content;
  const problemMedia = mediaFor(content, { kind: "problem" }) ?? mediaFor(content, { kind: "lifestyle" })!;
  const features = content.features.slice(0, 3);

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
        name: "Problem",
        frames: 66,
        el: <Shot media={problemMedia} theme={theme} caption={content.problems[0]} />,
      },
      ...features.map((feature, i) => ({
        name: feature.title,
        frames: 63,
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
        frames: 60,
        el: (
          <Shot
            media={mediaFor(content, { kind: "result" })!}
            theme={theme}
            caption={`${content.name} ${content.tagline}`}
            highlight={content.tagline}
          />
        ),
      },
      { name: "Offer", frames: END_FRAMES.offer, el: <Offer content={content} /> },
      { name: "Cta", frames: END_FRAMES.cta, el: <Cta content={content} /> },
    ],
  };
};
