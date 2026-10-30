import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { CalculateMetadataFunction } from "remotion";
import { resolveAd } from "./lib/resolve";
import { FORMAT_TIMING, sceneDurations, totalDuration, TRANSITION_FRAMES, VideoFormat } from "./lib/timing";
import type { AdProps } from "./schema";
import { Cta } from "./scenes/Cta";
import { Features } from "./scenes/Features";
import { Hook } from "./scenes/Hook";
import { Offer } from "./scenes/Offer";
import { Problem } from "./scenes/Problem";
import { Reveal } from "./scenes/Reveal";
import { Uses } from "./scenes/Uses";

const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

const videoFormat = (format: AdProps["format"]): VideoFormat =>
  format === "short" ? "short" : "showcase";

export const calculateAdMetadata: CalculateMetadataFunction<AdProps> = ({ props }) => ({
  durationInFrames: totalDuration(resolveAd(props), videoFormat(props.format)),
});

export const ProductAd: React.FC<AdProps> = (props) => {
  const format = videoFormat(props.format);
  const resolved = resolveAd(props);
  const content = {
    ...resolved,
    features: resolved.features.slice(0, FORMAT_TIMING[format].maxFeatures),
  };
  const d = sceneDurations(content, format);

  const scenes = [
    { name: "Hook", frames: d.hook, el: <Hook content={content} /> },
    { name: "Problem", frames: d.problem, el: <Problem content={content} /> },
    { name: "Reveal", frames: d.reveal, el: <Reveal content={content} /> },
    {
      name: "Features",
      frames: d.features,
      el: <Features content={content} featureFrames={FORMAT_TIMING[format].feature} />,
    },
    { name: "Uses", frames: d.uses, el: <Uses content={content} /> },
    { name: "Offer", frames: d.offer, el: <Offer content={content} /> },
    { name: "Cta", frames: d.cta, el: <Cta content={content} /> },
  ].filter((s) => s.frames > 0);

  return (
    <TransitionSeries>
      {scenes.flatMap((scene, i) => [
        ...(i === 0
          ? []
          : [
              <TransitionSeries.Transition
                key={`t-${scene.name}`}
                presentation={scene.name === "Features" ? slide({ direction: "from-left" }) : fade()}
                timing={timing}
              />,
            ]),
        <TransitionSeries.Sequence key={scene.name} name={scene.name} durationInFrames={scene.frames}>
          {scene.el}
        </TransitionSeries.Sequence>,
      ])}
    </TransitionSeries>
  );
};
