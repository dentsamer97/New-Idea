import React from "react";
import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, CalculateMetadataFunction, interpolate, Sequence, Series, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { buildAd, builtDuration, type VideoFormat } from "./formats";
import type { BuiltAd } from "./formats/types";
import { resolveAd } from "./lib/resolve";
import { TIMING } from "./lib/timing";
import type { AdProps } from "./schema";
import type { Theme } from "./themes";

const timing = linearTiming({ durationInFrames: TIMING.transitionFrames });

// الصورة الثابتة ليها composition لوحدها (AdStatic)
const videoFormat = (format: AdProps["format"]): VideoFormat => (format === "static" ? "showcase" : format);

const build = (props: AdProps) => buildAd(resolveAd(props), videoFormat(props.format));

export const calculateAdMetadata: CalculateMetadataFunction<AdProps> = ({ props }) => ({
  durationInFrames: builtDuration(build(props)),
});

// شريط رفيع فوق بيوضّح الفيديو وصل لفين (زي الستوري)، بيشجّع المشاهد يكمّل
const ProgressBar: React.FC<{ theme: Theme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: "rgba(0,0,0,0.18)" }}>
        <div
          style={{
            height: "100%",
            width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
            background: theme.accent,
            marginInlineStart: "auto",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// المؤثرات الصوتية: ووش أو كليك مع تغيير المشهد، ودينج مع السعر، وبوب مع ضغطة الزرار
const SoundEffects: React.FC<{ built: BuiltAd }> = ({ built }) => {
  let start = 0;
  const cues: { at: number; file: string; volume: number }[] = [];
  built.scenes.forEach((scene, i) => {
    if (i > 0) cues.push({ at: start, file: built.cuts ? "sfx/click.wav" : "sfx/whoosh.wav", volume: 0.45 });
    if (scene.name === "Offer") cues.push({ at: start + 10, file: "sfx/ding.wav", volume: 0.4 });
    if (scene.name === "Cta") TIMING.ctaTaps.forEach((tap) => cues.push({ at: start + tap, file: "sfx/pop.wav", volume: 0.6 }));
    start += scene.frames - (built.cuts ? 0 : TIMING.transitionFrames);
  });
  return (
    <>
      {cues.map((cue, i) => (
        <Sequence key={i} from={Math.max(0, cue.at - (cue.file.includes("whoosh") ? 6 : 0))} durationInFrames={45} layout="none">
          <Audio src={staticFile(cue.file)} volume={cue.volume} />
        </Sequence>
      ))}
    </>
  );
};

// الموسيقى: صوت واطي تحت الفيديو كله، وبتختفي بالتدريج في آخر ثانية
const Music: React.FC<{ src: string }> = ({ src }) => {
  const { durationInFrames, fps } = useVideoConfig();
  return (
    <Audio
      src={staticFile(src)}
      loop
      volume={(f) => interpolate(f, [0, durationInFrames - fps, durationInFrames], [0.18, 0.18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
    />
  );
};

export const ProductAd: React.FC<AdProps> = (props) => {
  const content = resolveAd(props);
  const built = buildAd(content, videoFormat(props.format));
  const { scenes, cuts } = built;

  const video = cuts ? (
    <Series>
      {scenes.map((scene) => (
        <Series.Sequence key={scene.name} name={scene.name} durationInFrames={scene.frames}>
          {scene.el}
        </Series.Sequence>
      ))}
    </Series>
  ) : (
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

  return (
    <AbsoluteFill>
      {video}
      <ProgressBar theme={content.theme} />
      {content.sfx ? <SoundEffects built={built} /> : null}
      {content.music ? <Music src={content.music} /> : null}
    </AbsoluteFill>
  );
};
