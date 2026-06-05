import { generateDoubleLine, generateMedallionRings } from "./frameStyles";
import type { FrameParams, GeneratedFrame } from "./types";

export function generateFrame(params: FrameParams): GeneratedFrame {
  const paths =
    params.style === "medallionRings"
      ? generateMedallionRings(params)
      : generateDoubleLine(params);

  return {
    viewBox: `0 0 ${params.widthMm} ${params.heightMm}`,
    width: params.widthMm,
    height: params.heightMm,
    groups: [{ id: "cut", paths }],
  };
}

export function frameToSvgString(frame: GeneratedFrame, strokeMm: number): string {
  const groups = frame.groups
    .map(
      (group) =>
        `  <g id="${group.id}" data-layer="${group.id}">\n${group.paths
          .map(
            (path) =>
              `    <path d="${path}" fill="none" stroke="#000000" stroke-width="${strokeMm}" vector-effect="non-scaling-stroke" />`,
          )
          .join("\n")}\n  </g>`,
    )
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${frame.viewBox}" width="${frame.width}mm" height="${frame.height}mm">`,
    groups,
    `</svg>`,
  ].join("\n");
}

export function downloadSvg(filename: string, svg: string) {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
