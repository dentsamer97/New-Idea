import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { CalculateMetadataFunction, Series } from "remotion";
import { buildAd, builtDuration, type VideoFormat } from "./formats";
import { resolveAd } from "./lib/resolve";
import { TRANSITION_FRAMES } from "./lib/timing";
import type { AdProps } from "./schema";

const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

// الصورة الثابتة ليها composition لوحدها (AdStatic)
const videoFormat = (format: AdProps["format"]): VideoFormat => (format === "static" ? "showcase" : format);

const build = (props: AdProps) => buildAd(resolveAd(props), videoFormat(props.format));

export const calculateAdMetadata: CalculateMetadataFunction<AdProps> = ({ props }) => ({
  durationInFrames: builtDuration(build(props)),
});

export const ProductAd: React.FC<AdProps> = (props) => {
  const { scenes, cuts } = build(props);

  if (cuts) {
    return (
      <Series>
        {scenes.map((scene) => (
          <Series.Sequence key={scene.name} name={scene.name} durationInFrames={scene.frames}>
            {scene.el}
          </Series.Sequence>
        ))}
      </Series>
    );
  }

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
