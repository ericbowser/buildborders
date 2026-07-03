import { generateStylePaths, getSafeAreaPath } from "./frameStyles";
import type { FrameParams, FramePathGroup, GeneratedFrame, LayerId } from "./types";

function resolveLayer(params: FrameParams, pathId: string, defaultLayer: LayerId): LayerId {
  return params.pathLayers[pathId] ?? defaultLayer;
}

export function generateFrame(params: FrameParams): GeneratedFrame {
  const pathDefs = generateStylePaths(params);
  const groupMap: Record<LayerId, string[]> = { cut: [], engrave: [] };

  for (const def of pathDefs) {
    const layer = resolveLayer(params, def.id, def.defaultLayer);
    groupMap[layer].push(def.d);
  }

  const groups: FramePathGroup[] = (["cut", "engrave"] as const)
    .filter((id) => groupMap[id].length > 0)
    .map((id) => ({ id, paths: groupMap[id] }));

  return {
    viewBox: `0 0 ${params.widthMm} ${params.heightMm}`,
    width: params.widthMm,
    height: params.heightMm,
    pathDefs,
    groups,
    safeAreaPath: getSafeAreaPath(params),
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
