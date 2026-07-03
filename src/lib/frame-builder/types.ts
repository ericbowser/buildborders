export type FrameShape = "rectangle" | "roundedRect" | "ellipse" | "circle";
export type FrameStyle =
  | "doubleLine"
  | "medallionRings"
  | "cornerFlourish"
  | "ropeBraid"
  | "artDeco";
export type LayerId = "cut" | "engrave";

export type FramePathDef = {
  id: string;
  d: string;
  defaultLayer: LayerId;
};

export type FrameParams = {
  shape: FrameShape;
  widthMm: number;
  heightMm: number;
  style: FrameStyle;
  strokeMm: number;
  kerfMm: number;
  cornerRadiusMm: number;
  safeAreaMm: number;
  /** Override default layer per path id */
  pathLayers: Record<string, LayerId>;
};

export type FramePathGroup = {
  id: LayerId;
  paths: string[];
};

export type GeneratedFrame = {
  viewBox: string;
  width: number;
  height: number;
  pathDefs: FramePathDef[];
  groups: FramePathGroup[];
  safeAreaPath: string | null;
};

export const defaultFrameParams: FrameParams = {
  shape: "roundedRect",
  widthMm: 203.2,
  heightMm: 254,
  style: "doubleLine",
  strokeMm: 0.4,
  kerfMm: 0.1,
  cornerRadiusMm: 8,
  safeAreaMm: 12,
  pathLayers: {},
};
