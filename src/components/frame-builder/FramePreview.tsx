"use client";

import { useState } from "react";
import type { FrameParams } from "@/lib/frame-builder/types";
import { generateFrame } from "@/lib/frame-builder/exportLaserSvg";

type FramePreviewProps = {
  params: FrameParams;
  compact?: boolean;
};

export function FramePreview({ params, compact = false }: FramePreviewProps) {
  const [zoom, setZoom] = useState(1);
  const frame = generateFrame(params);

  return (
    <div
      className={`scrollbar-industrial overflow-hidden rounded-xl border border-steel-light/20 bg-surface ${
        compact ? "p-4" : "p-6"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs text-text-muted/80">Preview</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
            className="rounded border border-steel-light/20 px-2 py-0.5 text-xs text-text-muted hover:text-primary"
          >
            −
          </button>
          <span className="px-2 text-xs text-text-muted/80">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
            className="rounded border border-steel-light/20 px-2 py-0.5 text-xs text-text-muted hover:text-primary"
          >
            +
          </button>
        </div>
      </div>

      <div className="scrollbar-industrial overflow-auto">
        <svg
          viewBox={frame.viewBox}
          className="mx-auto h-auto w-full max-w-full origin-center transition-transform"
          style={{ transform: `scale(${zoom})` }}
          aria-label="Frame preview"
        >
          {frame.safeAreaPath && (
            <path
              d={frame.safeAreaPath}
              fill="none"
              className="stroke-steel-light opacity-70"
              strokeWidth={0.15}
              strokeDasharray="2 2"
            />
          )}
          {frame.pathDefs.map((def) => {
            const layer = params.pathLayers[def.id] ?? def.defaultLayer;
            return (
              <path
                key={def.id}
                d={def.d}
                fill="none"
                className={layer === "cut" ? "stroke-cut" : "stroke-engrave"}
                strokeWidth={params.strokeMm}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-text-muted sm:grid-cols-4">
        <div>
          <dt className="text-text-muted/80">Size</dt>
          <dd>
            {params.widthMm.toFixed(1)} × {params.heightMm.toFixed(1)} mm
          </dd>
        </div>
        <div>
          <dt className="text-text-muted/80">Stroke</dt>
          <dd>{params.strokeMm.toFixed(2)} mm</dd>
        </div>
        <div>
          <dt className="text-text-muted/80">Kerf</dt>
          <dd>+{params.kerfMm.toFixed(2)} mm</dd>
        </div>
        <div>
          <dt className="text-text-muted/80">Safe area</dt>
          <dd>{params.safeAreaMm.toFixed(1)} mm inset</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-text-muted/80">
        Dashed line = inner safe zone. Blue = cut, orange = engrave.
      </p>
    </div>
  );
}
