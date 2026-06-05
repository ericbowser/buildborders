import Link from "next/link";
import { FrameBuilder } from "@/components/frame-builder/FrameBuilder";
import { framePresets } from "@/data/framePresets";
import { guides } from "@/data/guides";
import { siteConfig } from "@/data/config";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-surface-light/10 bg-gradient-to-b from-surface/40 to-gunmetal">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              {siteConfig.meta.productName}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
              {siteConfig.meta.tagline}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
              Parametric sign borders and medallion frames for laser engravers. Export
              LightBurn-ready SVG, then cut it yourself — or let us engrave it in Salt Lake City.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tool"
                className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-gunmetal transition-colors hover:bg-accent-hover"
              >
                Open full builder
              </Link>
              <Link
                href="/guides"
                className="rounded-lg border border-surface-light/30 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-accent hover:text-accent"
              >
                Read maker guides
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-surface-light/20 bg-surface/60 p-4">
            <FrameBuilder initialParams={framePresets[0].params} compact />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-100">Presets</h2>
            <p className="mt-2 text-slate-400">Jump into the builder with common plaque sizes.</p>
          </div>
          <Link href="/tool" className="text-sm font-medium text-accent hover:text-accent-hover">
            View all presets →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {framePresets.map((preset) => (
            <Link
              key={preset.id}
              href={`/tool/${preset.id}`}
              className="rounded-xl border border-surface-light/20 bg-surface p-5 transition-colors hover:border-accent/60"
            >
              <h3 className="font-semibold text-slate-100">{preset.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{preset.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-surface-light/10 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-100">Guides</h2>
          <p className="mt-2 max-w-2xl text-slate-400">
            Practical workflow content for LightBurn, kerf compensation, and gear picks.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="rounded-xl border border-surface-light/20 bg-gunmetal p-5 transition-colors hover:border-accent/60"
              >
                <h3 className="font-semibold text-slate-100">{guide.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-accent/30 bg-gradient-to-r from-surface to-gunmetal p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-slate-100">Get this cut &amp; engraved</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            We engrave daily in Salt Lake City. Send your Frame Builder SVG or describe the plaque —
            we&apos;ll quote cut, engrave, and finish options.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-gunmetal transition-colors hover:bg-accent-hover"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
