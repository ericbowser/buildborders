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
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          Export
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Laser-ready SVG with hairline strokes, mm units, and grouped cut paths.
        </p>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => downloadSvg("frame-border.svg", svg)}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-text-inverse transition-colors hover:bg-primary-hover"
        >
          Download SVG
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="w-full rounded-lg border border-steel-light/20 px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
        >
          {copied ? "Copied to clipboard" : "Copy SVG"}
        </button>
      </div>

      <div className="rounded-xl border border-steel-light/20 bg-surface-card/60 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Export checklist
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-text-muted">
          <li>Hairline stroke / no fill</li>
          <li>Units in millimeters</li>
          <li>Cut paths grouped under <code className="text-cut">cut</code></li>
          <li>Import into LightBurn or xTool Creative</li>
        </ul>
      </div>
    </div>
  );
}
