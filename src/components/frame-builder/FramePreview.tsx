"use client";

import type { FrameParams } from "@/lib/frame-builder/types";
import { generateFrame } from "@/lib/frame-builder/exportLaserSvg";

type FramePreviewProps = {
  params: FrameParams;
  compact?: boolean;
};

export function FramePreview({ params, compact = false }: FramePreviewProps) {
  const frame = generateFrame(params);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-surface-light/20 bg-[#0b1016] ${
        compact ? "p-4" : "p-6"
      }`}
    >
      <svg
        viewBox={frame.viewBox}
        className="mx-auto h-auto w-full max-w-full"
        aria-label="Frame preview"
      >
        {frame.groups.map((group) => (
          <g key={group.id} id={group.id}>
            {group.paths.map((path, index) => (
              <path
                key={`${group.id}-${index}`}
                d={path}
                fill="none"
                stroke={group.id === "cut" ? "#22d3ee" : "#f97316"}
                strokeWidth={params.strokeMm}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        ))}
      </svg>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-400 sm:grid-cols-4">
        <div>
          <dt className="text-slate-500">Size</dt>
          <dd>{params.widthMm.toFixed(1)} × {params.heightMm.toFixed(1)} mm</dd>
        </div>
        <div>
          <dt className="text-slate-500">Stroke</dt>
          <dd>{params.strokeMm.toFixed(2)} mm</dd>
        </div>
        <div>
          <dt className="text-slate-500">Kerf</dt>
          <dd>+{params.kerfMm.toFixed(2)} mm</dd>
        </div>
        <div>
          <dt className="text-slate-500">Style</dt>
          <dd className="capitalize">{params.style.replace(/([A-Z])/g, " $1").trim()}</dd>
        </div>
      </dl>
    </div>
  );
}
