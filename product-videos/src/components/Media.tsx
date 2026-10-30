import React from "react";
import { Video } from "@remotion/media";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { MediaRef } from "../lib/media";

// صورة (بزووم بطيء) أو لقطة فيديو، بتملا المساحة اللي هي فيها
export const Media: React.FC<{ media: MediaRef; zoom?: [number, number]; fit?: "cover" | "contain" }> = ({
  media,
  zoom = [1.04, 1.16],
  fit = "cover",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  if (media.type === "clip") {
    const { clip } = media;
    return (
      <Video
        src={staticFile(clip.file)}
        trimBefore={clip.start !== undefined ? Math.round(clip.start * fps) : undefined}
        trimAfter={clip.end !== undefined ? Math.round(clip.end * fps) : undefined}
        loop
        muted={!clip.audio}
        objectFit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    );
  }

  return (
    <Img
      src={staticFile(media.src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: fit,
        scale: interpolate(frame, [0, durationInFrames], zoom),
      }}
    />
  );
};
