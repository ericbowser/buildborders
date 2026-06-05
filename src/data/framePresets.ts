import type { FrameParams } from "@/lib/frame-builder/types";

export type FramePreset = {
  id: string;
  name: string;
  description: string;
  params: FrameParams;
};

export const framePresets: FramePreset[] = [
  {
    id: "oval-plaque-8x10",
    name: "Oval plaque 8×10",
    description: "Classic oval sign border for awards and desk plaques.",
    params: {
      shape: "ellipse",
      widthMm: 203.2,
      heightMm: 254,
      style: "doubleLine",
      strokeMm: 0.4,
      kerfMm: 0.1,
      cornerRadiusMm: 0,
    },
  },
  {
    id: "rounded-rect-5x7",
    name: "Rounded rect 5×7",
    description: "Soft corners for photo-style plaques and gift signs.",
    params: {
      shape: "roundedRect",
      widthMm: 127,
      heightMm: 177.8,
      style: "doubleLine",
      strokeMm: 0.35,
      kerfMm: 0.08,
      cornerRadiusMm: 6,
    },
  },
  {
    id: "medallion-3in",
    name: "Medallion 3″",
    description: "Circular rings for coasters, tokens, and round awards.",
    params: {
      shape: "circle",
      widthMm: 76.2,
      heightMm: 76.2,
      style: "medallionRings",
      strokeMm: 0.3,
      kerfMm: 0.1,
      cornerRadiusMm: 0,
    },
  },
  {
    id: "coaster-4in",
    name: "Coaster 4″",
    description: "Compact round border for drink coasters and small gifts.",
    params: {
      shape: "circle",
      widthMm: 101.6,
      heightMm: 101.6,
      style: "doubleLine",
      strokeMm: 0.25,
      kerfMm: 0.08,
      cornerRadiusMm: 0,
    },
  },
];

export function getPresetById(id: string): FramePreset | undefined {
  return framePresets.find((preset) => preset.id === id);
}
