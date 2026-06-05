import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Honest laser machine, software, and material reviews for plaque and sign work.",
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-100">Gear reviews</h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        Affiliate-backed reviews for machines, software, and blanks that actually show up in a
        frame-building workflow.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(siteConfig.categories).map(([slug, category]) => (
          <Link
            key={slug}
            href={`/reviews/${slug}`}
            className="rounded-xl border border-surface-light/20 bg-surface p-6 transition-colors hover:border-accent/60"
          >
            <div className="text-2xl">{category.icon}</div>
            <h2 className="mt-3 font-semibold text-slate-100">{category.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
