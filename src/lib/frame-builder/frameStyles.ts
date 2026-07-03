import type { FrameParams, FramePathDef } from "./types";

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

export function shapePath(params: FrameParams, inset: number): string | null {
  const { shape, widthMm, heightMm, cornerRadiusMm } = params;
  const cx = widthMm / 2;
  const cy = heightMm / 2;

  if (shape === "rectangle" || shape === "roundedRect") {
    const box = insetRect(widthMm, heightMm, inset, cornerRadiusMm);
    if (box.w <= 0 || box.h <= 0) return null;
    return roundedRectPath(
      box.x,
      box.y,
      box.w,
      box.h,
      shape === "rectangle" ? 0 : box.r,
    );
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

export function getSafeAreaPath(params: FrameParams): string | null {
  const frameInset =
    params.kerfMm + params.strokeMm * 4 + params.safeAreaMm;
  return shapePath(params, frameInset);
}

function pathDef(
  id: string,
  d: string | null,
  defaultLayer: FramePathDef["defaultLayer"] = "cut",
): FramePathDef | null {
  if (!d) return null;
  return { id, d, defaultLayer };
}

export function generateDoubleLine(params: FrameParams): FramePathDef[] {
  const gap = params.strokeMm * 3;
  return [
    pathDef("outer", shapePath(params, params.kerfMm)),
    pathDef("inner", shapePath(params, params.kerfMm + gap)),
  ].filter((p): p is FramePathDef => Boolean(p));
}

export function generateMedallionRings(params: FrameParams): FramePathDef[] {
  const steps = [0, 2.5, 5].map((mult) => params.kerfMm + params.strokeMm * mult);
  return steps
    .map((inset, i) => pathDef(`ring-${i}`, shapePath(params, inset), i === 0 ? "cut" : "engrave"))
    .filter((p): p is FramePathDef => Boolean(p));
}

function cornerFlourishAt(
  cornerX: number,
  cornerY: number,
  dirX: number,
  dirY: number,
  size: number,
): string {
  const cx = cornerX + dirX * size * 0.5;
  const cy = cornerY + dirY * size * 0.5;
  const endX = cornerX + dirX * size;
  const endY = cornerY + dirY * size;
  return `M ${cornerX} ${cornerY} Q ${cx} ${cy} ${endX} ${endY}`;
}

export function generateCornerFlourish(params: FrameParams): FramePathDef[] {
  const outer = pathDef("outer", shapePath(params, params.kerfMm));
  const gap = params.strokeMm * 3;
  const inner = pathDef("inner", shapePath(params, params.kerfMm + gap));

  const flourishSize = Math.min(params.widthMm, params.heightMm) * 0.06;
  const corners: FramePathDef[] = [];

  if (params.shape === "rectangle" || params.shape === "roundedRect") {
    const pairs = [
      { x: params.kerfMm, y: params.kerfMm, dx: 1, dy: 1, id: "fl-tl" },
      { x: params.widthMm - params.kerfMm, y: params.kerfMm, dx: -1, dy: 1, id: "fl-tr" },
      { x: params.widthMm - params.kerfMm, y: params.heightMm - params.kerfMm, dx: -1, dy: -1, id: "fl-br" },
      { x: params.kerfMm, y: params.heightMm - params.kerfMm, dx: 1, dy: -1, id: "fl-bl" },
    ];
    for (const c of pairs) {
      const p = pathDef(
        c.id,
        cornerFlourishAt(c.x, c.y, c.dx, c.dy, flourishSize),
        "engrave",
      );
      if (p) corners.push(p);
    }
  }

  return [outer, inner, ...corners].filter((p): p is FramePathDef => Boolean(p));
}

export function generateRopeBraid(params: FrameParams): FramePathDef[] {
  const outer = pathDef("outer", shapePath(params, params.kerfMm));
  const paths: FramePathDef[] = outer ? [outer] : [];

  const bump = params.strokeMm * 2;
  const inset = params.kerfMm + params.strokeMm * 2;
  const segments = 12;

  if (params.shape === "rectangle" || params.shape === "roundedRect") {
    const topLen = params.widthMm - inset * 2;
    const segW = topLen / segments;
    let d = `M ${inset} ${inset}`;
    for (let i = 0; i < segments; i++) {
      const x1 = inset + i * segW;
      const x2 = x1 + segW / 2;
      const x3 = x1 + segW;
      const wave = i % 2 === 0 ? -bump : bump;
      d += ` Q ${x2} ${inset + wave} ${x3} ${inset}`;
    }
    const braid = pathDef("rope-top", d, "engrave");
    if (braid) paths.push(braid);
  } else {
    const braid = pathDef(
      "rope-ring",
      shapePath(params, params.kerfMm + params.strokeMm * 2),
      "engrave",
    );
    if (braid) paths.push(braid);
  }

  return paths;
}

export function generateArtDeco(params: FrameParams): FramePathDef[] {
  const steps = [0, params.strokeMm * 2.5, params.strokeMm * 5];
  return steps
    .map((offset, i) =>
      pathDef(
        `deco-${i}`,
        shapePath(params, params.kerfMm + offset),
        i === steps.length - 1 ? "engrave" : "cut",
      ),
    )
    .filter((p): p is FramePathDef => Boolean(p));
}

export function generateStylePaths(params: FrameParams): FramePathDef[] {
  switch (params.style) {
    case "medallionRings":
      return generateMedallionRings(params);
    case "cornerFlourish":
      return generateCornerFlourish(params);
    case "ropeBraid":
      return generateRopeBraid(params);
    case "artDeco":
      return generateArtDeco(params);
    default:
      return generateDoubleLine(params);
  }
}
