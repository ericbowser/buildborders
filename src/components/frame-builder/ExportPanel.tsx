"use client";

import { useState } from "react";
import type { FrameParams } from "@/lib/frame-builder/types";
import {
  downloadSvg,
  frameToSvgString,
  generateFrame,
} from "@/lib/frame-builder/exportLaserSvg";

type ExportPanelProps = {
  params: FrameParams;
};

export function ExportPanel({ params }: ExportPanelProps) {
  const [copied, setCopied] = useState(false);
  const frame = generateFrame(params);
  const svg = frameToSvgString(frame, params.strokeMm);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(svg);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Export
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Laser-ready SVG with hairline strokes, mm units, and grouped cut paths.
        </p>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => downloadSvg("frame-border.svg", svg)}
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-gunmetal transition-colors hover:bg-accent-hover"
        >
          Download SVG
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="w-full rounded-lg border border-surface-light/20 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-accent hover:text-accent"
        >
          {copied ? "Copied to clipboard" : "Copy SVG"}
        </button>
      </div>

      <div className="rounded-xl border border-surface-light/20 bg-gunmetal/60 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Export checklist
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-slate-300">
          <li>Hairline stroke / no fill</li>
          <li>Units in millimeters</li>
          <li>Cut paths grouped under <code className="text-cut">cut</code></li>
          <li>Import into LightBurn or xTool Creative</li>
        </ul>
      </div>
    </div>
  );
}
