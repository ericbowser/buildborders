import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/data/config";
import { comparePairs, getProductById } from "@/data/products";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Honest laser machine, software, and material reviews for plaque and sign work.",
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text">Gear reviews</h1>
      <p className="mt-3 max-w-2xl text-text-muted">
        Affiliate-backed reviews for machines, software, and blanks that actually show up in a
        frame-building workflow.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(siteConfig.categories).map(([slug, category]) => (
          <Link
            key={slug}
            href={`/reviews/${slug}`}
            className="rounded-xl border border-steel-light/20 bg-surface-card p-6 transition-colors hover:border-primary/60"
          >
            <div className="text-2xl">{category.icon}</div>
            <h2 className="mt-3 font-semibold text-text">{category.name}</h2>
            <p className="mt-2 text-sm text-text-muted">{category.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-semibold text-text">Popular comparisons</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {comparePairs.map(({ a, b }) => (
            <li key={`${a}-${b}`}>
              <Link
                href={`/compare/${a}/${b}`}
                className="rounded-lg border border-steel-light/20 px-4 py-2 text-sm text-text-muted hover:border-primary hover:text-primary"
              >
                {getProductById(a)?.name} vs {getProductById(b)?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
