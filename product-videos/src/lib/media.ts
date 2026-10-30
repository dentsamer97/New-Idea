// بيختار للمشهد لقطة حقيقية لو موجودة، ولو مش موجودة بيرجع للصورة
import type { AdContent, Clip, ClipRole } from "../schema";

export type MediaRef = { type: "image"; src: string } | { type: "clip"; clip: Clip };

export type Slot =
  | { kind: "hook" }
  | { kind: "problem" }
  | { kind: "before" }
  | { kind: "reveal" }
  | { kind: "feature"; featureId: string; image: string }
  | { kind: "lifestyle" }
  | { kind: "result" };

// الأولوية: لقطات الزاوية دي، بعدين اللقطات العامة
const findClips = (content: AdContent, role: ClipRole, featureId?: string) => {
  const matching = content.clips.filter(
    (c) => c.role === role && (featureId === undefined || c.feature === featureId),
  );
  return [
    ...matching.filter((c) => c.angle === content.angle.id),
    ...matching.filter((c) => c.angle === undefined),
  ];
};

const firstClip = (content: AdContent, roles: ClipRole[], nth = 0, featureId?: string) => {
  const all = roles.flatMap((role) => findClips(content, role, role === "feature" ? featureId : undefined));
  return all.length ? all[nth % all.length] : undefined;
};

const clipRoles: Record<Slot["kind"], ClipRole[]> = {
  hook: ["hook", "demo", "talking"],
  problem: ["problem", "before"],
  before: ["before", "problem"],
  reveal: ["unbox", "demo", "result"],
  feature: ["feature"],
  lifestyle: ["lifestyle", "demo", "result"],
  result: ["result", "demo", "lifestyle"],
};

// nth: لو فيه أكتر من لقطة لنفس النوع، المشاهد المتتالية بتاخد لقطات مختلفة
export const mediaFor = (content: AdContent, slot: Slot, nth = 0): MediaRef | null => {
  const clip = firstClip(content, clipRoles[slot.kind], nth, slot.kind === "feature" ? slot.featureId : undefined);
  if (clip) return { type: "clip", clip };
  switch (slot.kind) {
    case "feature":
      return { type: "image", src: slot.image };
    case "lifestyle":
      return { type: "image", src: content.images.lifestyle };
    case "problem":
    case "before":
      return null;
    default:
      return { type: "image", src: content.images.product };
  }
};

export const productImage = (content: AdContent): MediaRef => ({ type: "image", src: content.images.product });
