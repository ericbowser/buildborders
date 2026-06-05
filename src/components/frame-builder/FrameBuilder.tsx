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
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_260px]">
      <aside className="rounded-xl border border-surface-light/20 bg-surface p-4">
        <ControlPanel params={params} onChange={setParams} />
      </aside>
      <section>
        <FramePreview params={params} />
        <p className="mt-3 text-sm text-slate-500">
          Best on desktop for precise sizing. Export works on mobile.
        </p>
      </section>
      <aside className="rounded-xl border border-surface-light/20 bg-surface p-4">
        <ExportPanel params={params} />
      </aside>
    </div>
  );
}
