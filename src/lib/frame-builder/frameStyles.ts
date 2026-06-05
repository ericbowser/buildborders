import type { FrameParams } from "./types";

function roundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): string {
  const radius = Math.min(r, w / 2, h / 2);
  return [
    `M ${x + radius} ${y}`,
    `H ${x + w - radius}`,
    `Q ${x + w} ${y} ${x + w} ${y + radius}`,
    `V ${y + h - radius}`,
    `Q ${x + w} ${y + h} ${x + w - radius} ${y + h}`,
    `H ${x + radius}`,
    `Q ${x} ${y + h} ${x} ${y + h - radius}`,
    `V ${y + radius}`,
    `Q ${x} ${y} ${x + radius} ${y}`,
    "Z",
  ].join(" ");
}

function ellipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;
}

function circlePath(cx: number, cy: number, r: number): string {
  return ellipsePath(cx, cy, r, r);
}

function insetRect(
  width: number,
  height: number,
  inset: number,
  cornerRadius: number,
) {
  return {
    x: inset,
    y: inset,
    w: Math.max(width - inset * 2, 0),
    h: Math.max(height - inset * 2, 0),
    r: Math.max(cornerRadius - inset, 0),
  };
}

function shapePath(
  params: FrameParams,
  inset: number,
): string | null {
  const { shape, widthMm, heightMm, cornerRadiusMm } = params;
  const cx = widthMm / 2;
  const cy = heightMm / 2;

  if (shape === "rectangle" || shape === "roundedRect") {
    const box = insetRect(widthMm, heightMm, inset, cornerRadiusMm);
    if (box.w <= 0 || box.h <= 0) return null;
    return roundedRectPath(box.x, box.y, box.w, box.h, shape === "rectangle" ? 0 : box.r);
  }

  if (shape === "ellipse") {
    const rx = Math.max(widthMm / 2 - inset, 0);
    const ry = Math.max(heightMm / 2 - inset, 0);
    if (rx <= 0 || ry <= 0) return null;
    return ellipsePath(cx, cy, rx, ry);
  }

  const r = Math.max(Math.min(widthMm, heightMm) / 2 - inset, 0);
  if (r <= 0) return null;
  return circlePath(cx, cy, r);
}

export function generateDoubleLine(params: FrameParams): string[] {
  const gap = params.strokeMm * 3;
  const outer = shapePath(params, params.kerfMm);
  const inner = shapePath(params, params.kerfMm + gap);
  return [outer, inner].filter((path): path is string => Boolean(path));
}

export function generateMedallionRings(params: FrameParams): string[] {
  const rings = [params.kerfMm, params.kerfMm + params.strokeMm * 2.5, params.kerfMm + params.strokeMm * 5];
  return rings
    .map((inset) => shapePath(params, inset))
    .filter((path): path is string => Boolean(path));
}
