import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides",
  description: "Laser workflow guides for SVG borders, kerf compensation, and gear selection.",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-100">Maker guides</h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        Pillar content for LightBurn imports, kerf-aware borders, and entry-level laser picks.
      </p>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="rounded-xl border border-surface-light/20 bg-surface p-6 transition-colors hover:border-accent/60"
          >
            <h2 className="text-lg font-semibold text-slate-100">{guide.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
