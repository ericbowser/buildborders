export type FrameShape = "rectangle" | "roundedRect" | "ellipse" | "circle";
export type FrameStyle = "doubleLine" | "medallionRings";

export type FrameParams = {
  shape: FrameShape;
  widthMm: number;
  heightMm: number;
  style: FrameStyle;
  strokeMm: number;
  kerfMm: number;
  cornerRadiusMm: number;
};

export type FramePathGroup = {
  id: "cut" | "engrave";
  paths: string[];
};

export type GeneratedFrame = {
  viewBox: string;
  width: number;
  height: number;
  groups: FramePathGroup[];
};

export const defaultFrameParams: FrameParams = {
  shape: "roundedRect",
  widthMm: 203.2,
  heightMm: 254,
  style: "doubleLine",
  strokeMm: 0.4,
  kerfMm: 0.1,
  cornerRadiusMm: 8,
};
