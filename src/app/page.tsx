import Link from "next/link";
import { FrameBuilder } from "@/components/frame-builder/FrameBuilder";
import { AffiliateLink } from "@/components/AffiliateLink";
import { framePresets } from "@/data/framePresets";
import { siteConfig } from "@/data/config";

const gearPicks = [
  {
    productId: "xtool-s1",
    name: "xTool S1 40W Diode",
    blurb: "The machine we run in-shop. Big bed, fast, handles wood and acrylic borders.",
  },
  {
    productId: "cast-acrylic-sheet",
    name: "Cast acrylic sheet",
    blurb: "Clean edge finish for medallion frames and semi-transparent plaques.",
  },
  {
    productId: "walnut-plaque-blank",
    name: "Walnut plaque blank",
    blurb: "Hardwood blank sized for double-line borders and center engraving.",
  },
  {
    productId: "laser-safety-glasses",
    name: "Laser safety glasses",
    blurb: "Non-negotiable before you run your first cut.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-steel-light/10 bg-gradient-to-b from-surface-card/40 to-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {siteConfig.meta.productName}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-text sm:text-5xl">
              {siteConfig.meta.tagline}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
              Parametric sign borders and medallion frames for laser engravers. Export
              LightBurn-ready SVG, then cut it yourself — or let us engrave it in Salt Lake City.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tool"
                className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-text-inverse transition-colors hover:bg-primary-hover"
              >
                Open full builder
              </Link>
              <Link
                href="#gear"
                className="rounded-lg border border-steel-light/30 px-5 py-3 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
              >
                See the gear we use
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-steel-light/20 bg-surface-card/60 p-4">
            <FrameBuilder initialParams={framePresets[0].params} compact />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-text">Presets</h2>
            <p className="mt-2 text-text-muted">Jump into the builder with common plaque sizes.</p>
          </div>
          <Link href="/tool" className="text-sm font-medium text-primary hover:text-primary-hover">
            View all presets →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {framePresets.map((preset) => (
            <Link
              key={preset.id}
              href={`/tool/${preset.id}`}
              className="rounded-xl border border-steel-light/20 bg-surface-card p-5 transition-colors hover:border-primary/60"
            >
              <h3 className="font-semibold text-text">{preset.name}</h3>
              <p className="mt-2 text-sm text-text-muted">{preset.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="gear" className="border-y border-steel-light/10 bg-surface-card/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-text">Gear we use</h2>
          <p className="mt-2 max-w-2xl text-text-muted">
            The machine, blanks, and safety gear behind the Frame Builder. Some links earn a
            small commission at no extra cost to you.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gearPicks.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col rounded-xl border border-steel-light/20 bg-surface-card p-5"
              >
                <h3 className="font-semibold text-text">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm text-text-muted">{item.blurb}</p>
                <AffiliateLink productId={item.productId} className="mt-4 justify-center" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-surface-card to-surface p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-text">Get this cut &amp; engraved</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            We engrave daily in Salt Lake City. Send your Frame Builder SVG or describe the plaque —
            we&apos;ll quote cut, engrave, and finish options.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-text-inverse transition-colors hover:bg-primary-hover"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
