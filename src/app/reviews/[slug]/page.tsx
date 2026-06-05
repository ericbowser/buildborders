import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/components/AffiliateLink";
import { siteConfig, type CategorySlug } from "@/data/config";

type CategoryReviewPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(siteConfig.categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = siteConfig.categories[slug as CategorySlug];
  if (!category) return { title: "Category not found" };

  return {
    title: `${category.name} Reviews`,
    description: category.description,
    keywords: [...category.keywords],
  };
}

export default async function CategoryReviewPage({ params }: CategoryReviewPageProps) {
  const { slug } = await params;
  const category = siteConfig.categories[slug as CategorySlug];
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/reviews" className="text-sm text-accent hover:text-accent-hover">
        ← All reviews
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-100">
        {category.icon} {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-400">{category.description}</p>

      <div className="mt-10 space-y-4">
        {category.featuredProducts.map((productId) => (
          <div
            key={productId}
            className="flex flex-col gap-4 rounded-xl border border-surface-light/20 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold capitalize text-slate-100">
                {productId.replace(/-/g, " ")}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Review draft placeholder — affiliate links wired through centralized registry.
              </p>
            </div>
            <AffiliateLink productId={productId} />
          </div>
        ))}
      </div>
    </div>
  );
}
