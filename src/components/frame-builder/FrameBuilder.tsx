"use client";

import { useState } from "react";
import type { FrameParams } from "@/lib/frame-builder/types";
import { defaultFrameParams } from "@/lib/frame-builder/types";
import { ControlPanel } from "./ControlPanel";
import { ExportPanel } from "./ExportPanel";
import { FramePreview } from "./FramePreview";

type FrameBuilderProps = {
  initialParams?: FrameParams;
  compact?: boolean;
};

export function FrameBuilder({ initialParams = defaultFrameParams, compact = false }: FrameBuilderProps) {
  const [params, setParams] = useState<FrameParams>(initialParams);

  if (compact) {
    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <FramePreview params={params} compact />
        <ControlPanel params={params} onChange={setParams} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Preview — full width on top */}
      <section className="rounded-xl border border-steel-light/20 bg-surface-card p-4">
        <FramePreview params={params} />
        <p className="mt-3 text-sm text-text-muted/80">
          Best on desktop for precise sizing. Export works on mobile.
        </p>
      </section>

      {/* Controls + Export — side by side below the preview */}
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <aside className="rounded-xl border border-steel-light/20 bg-surface-card p-4">
          <ControlPanel params={params} onChange={setParams} />
        </aside>
        <aside className="rounded-xl border border-steel-light/20 bg-surface-card p-4">
          <ExportPanel params={params} />
        </aside>
      </div>
    </div>
  );
}
