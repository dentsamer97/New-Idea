import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { CalculateMetadataFunction } from "remotion";
import { DURATIONS, featuresDuration, totalDuration, TRANSITION_FRAMES } from "./lib/timing";
import type { AdProps } from "./schema";
import { Cta } from "./scenes/Cta";
import { Features } from "./scenes/Features";
import { Hook } from "./scenes/Hook";
import { Offer } from "./scenes/Offer";
import { Problem } from "./scenes/Problem";
import { Reveal } from "./scenes/Reveal";
import { Uses } from "./scenes/Uses";

const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

export const calculateAdMetadata: CalculateMetadataFunction<AdProps> = ({ props }) => ({
  durationInFrames: totalDuration(props.product),
});

export const ProductAd: React.FC<AdProps> = ({ product, hookIndex }) => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Hook" durationInFrames={DURATIONS.hook}>
      <Hook product={product} hookIndex={hookIndex} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence name="Problem" durationInFrames={DURATIONS.problem}>
      <Problem product={product} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence name="Reveal" durationInFrames={DURATIONS.reveal}>
      <Reveal product={product} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={timing} />
    <TransitionSeries.Sequence name="Features" durationInFrames={featuresDuration(product)}>
      <Features product={product} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence name="Uses" durationInFrames={DURATIONS.uses}>
      <Uses product={product} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence name="Offer" durationInFrames={DURATIONS.offer}>
      <Offer product={product} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence name="Cta" durationInFrames={DURATIONS.cta}>
      <Cta product={product} />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
