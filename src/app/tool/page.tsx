import type { Metadata } from "next";
import { FrameBuilder } from "@/components/frame-builder/FrameBuilder";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Frame Builder",
  description:
    "Free parametric sign border and medallion frame generator with laser-ready SVG export.",
};

export default function ToolPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {siteConfig.meta.productName}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          Border &amp; medallion builder
        </h1>
        <p className="mt-3 max-w-3xl text-text-muted">
          Set size in millimeters, pick a border style, apply kerf offset, and export grouped SVG
          for LightBurn or xTool Creative.
        </p>
      </div>
      <FrameBuilder />
    </div>
  );
}
