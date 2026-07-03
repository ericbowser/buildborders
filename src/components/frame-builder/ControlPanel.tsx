"use client";

import type { FrameParams, FrameShape, FrameStyle, LayerId } from "@/lib/frame-builder/types";
import { generateStylePaths } from "@/lib/frame-builder/frameStyles";

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

const styleOptions: [FrameStyle, string][] = [
  ["doubleLine", "Double line"],
  ["medallionRings", "Medallion rings"],
  ["cornerFlourish", "Corner flourish"],
  ["ropeBraid", "Rope braid"],
  ["artDeco", "Art deco stepped"],
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
      <span className="mb-1 block text-text-muted">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-lg border border-steel-light/20 bg-surface-card px-3 py-2 text-text focus:border-primary focus:outline-none"
      />
    </label>
  );
}

export function ControlPanel({ params, onChange }: ControlPanelProps) {
  const update = (partial: Partial<FrameParams>) => onChange({ ...params, ...partial });

  const pathDefs = generateStylePaths(params);

  const togglePathLayer = (pathId: string, defaultLayer: LayerId) => {
    const current = params.pathLayers[pathId] ?? defaultLayer;
    const next: LayerId = current === "cut" ? "engrave" : "cut";
    update({
      pathLayers: { ...params.pathLayers, [pathId]: next },
    });
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
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
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-steel-light/20 text-text-muted hover:border-steel-light/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
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
              className="rounded-lg border border-steel-light/20 px-3 py-2 text-sm text-text-muted hover:border-primary hover:text-primary"
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
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Border style
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {styleOptions.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => update({ style: value, pathLayers: {} })}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                params.style === value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-steel-light/20 text-text-muted hover:border-steel-light/40"
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
        <NumberInput
          label="Safe area inset (mm)"
          value={params.safeAreaMm}
          min={4}
          max={40}
          step={0.5}
          onChange={(safeAreaMm) => update({ safeAreaMm })}
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

      {pathDefs.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
            Path layers
          </h2>
          <ul className="space-y-2">
            {pathDefs.map((def) => {
              const layer = params.pathLayers[def.id] ?? def.defaultLayer;
              return (
                <li key={def.id}>
                  <button
                    type="button"
                    onClick={() => togglePathLayer(def.id, def.defaultLayer)}
                    className="flex w-full items-center justify-between rounded-lg border border-steel-light/20 px-3 py-2 text-sm text-text-muted hover:border-primary"
                  >
                    <span>{def.id}</span>
                    <span
                      className={
                        layer === "cut" ? "text-cut font-medium" : "text-engrave font-medium"
                      }
                    >
                      {layer}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
