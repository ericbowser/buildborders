"use client";

import type { FrameParams, FrameShape, FrameStyle } from "@/lib/frame-builder/types";

type ControlPanelProps = {
  params: FrameParams;
  onChange: (next: FrameParams) => void;
};

const sizePresets = [
  { label: '4×6"', widthMm: 101.6, heightMm: 152.4 },
  { label: '5×7"', widthMm: 127, heightMm: 177.8 },
  { label: '8×10"', widthMm: 203.2, heightMm: 254 },
  { label: '3" circle', widthMm: 76.2, heightMm: 76.2 },
];

function NumberInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-400">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-lg border border-surface-light/20 bg-gunmetal px-3 py-2 text-slate-100 focus:border-accent focus:outline-none"
      />
    </label>
  );
}

export function ControlPanel({ params, onChange }: ControlPanelProps) {
  const update = (partial: Partial<FrameParams>) => onChange({ ...params, ...partial });

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
          Shape
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["rectangle", "Rectangle"],
              ["roundedRect", "Rounded"],
              ["ellipse", "Ellipse"],
              ["circle", "Circle"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => update({ shape: value as FrameShape })}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                params.shape === value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-surface-light/20 text-slate-400 hover:border-surface-light/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
          Size presets
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {sizePresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() =>
                update({
                  widthMm: preset.widthMm,
                  heightMm: preset.heightMm,
                  shape: preset.label.includes("circle") ? "circle" : params.shape,
                })
              }
              className="rounded-lg border border-surface-light/20 px-3 py-2 text-sm text-slate-400 hover:border-accent hover:text-accent"
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <NumberInput
            label="Width (mm)"
            value={params.widthMm}
            min={20}
            max={600}
            step={0.1}
            onChange={(widthMm) => update({ widthMm })}
          />
          <NumberInput
            label="Height (mm)"
            value={params.heightMm}
            min={20}
            max={600}
            step={0.1}
            onChange={(heightMm) => update({ heightMm })}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
          Border style
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {(
            [
              ["doubleLine", "Double line"],
              ["medallionRings", "Medallion rings"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => update({ style: value as FrameStyle })}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                params.style === value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-surface-light/20 text-slate-400 hover:border-surface-light/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <NumberInput
          label="Stroke width (mm)"
          value={params.strokeMm}
          min={0.1}
          max={2}
          step={0.05}
          onChange={(strokeMm) => update({ strokeMm })}
        />
        <NumberInput
          label="Kerf offset (mm)"
          value={params.kerfMm}
          min={0}
          max={0.3}
          step={0.01}
          onChange={(kerfMm) => update({ kerfMm })}
        />
        {params.shape === "roundedRect" && (
          <NumberInput
            label="Corner radius (mm)"
            value={params.cornerRadiusMm}
            min={0}
            max={40}
            step={0.5}
            onChange={(cornerRadiusMm) => update({ cornerRadiusMm })}
          />
        )}
      </section>
    </div>
  );
}
