import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FrameBuilder } from "@/components/frame-builder/FrameBuilder";
import { framePresets, getPresetById } from "@/data/framePresets";

type PresetPageProps = {
  params: Promise<{ preset: string }>;
};

export async function generateStaticParams() {
  return framePresets.map((preset) => ({ preset: preset.id }));
}

export async function generateMetadata({ params }: PresetPageProps): Promise<Metadata> {
  const { preset: presetId } = await params;
  const preset = getPresetById(presetId);
  if (!preset) return { title: "Preset not found" };

  return {
    title: preset.name,
    description: preset.description,
  };
}

export default async function PresetToolPage({ params }: PresetPageProps) {
  const { preset: presetId } = await params;
  const preset = getPresetById(presetId);
  if (!preset) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Preset</p>
        <h1 className="mt-2 text-3xl font-bold text-text">{preset.name}</h1>
        <p className="mt-3 max-w-3xl text-text-muted">{preset.description}</p>
      </div>
      <FrameBuilder initialParams={preset.params} />
    </div>
  );
}
