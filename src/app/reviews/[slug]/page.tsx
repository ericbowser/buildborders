import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/components/AffiliateLink";
import { siteConfig, type CategorySlug } from "@/data/config";
import { getProductsByCategory } from "@/data/products";

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
      <Link href="/reviews" className="text-sm text-primary hover:text-primary-hover">
        ← All reviews
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-text">
        {category.icon} {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-text-muted">{category.description}</p>

      <div className="mt-10 space-y-4">
        {getProductsByCategory(slug as CategorySlug).map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-4 rounded-xl border border-steel-light/20 bg-surface-card p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-text">
                <Link href={`/review/${product.id}`} className="hover:text-primary">
                  {product.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-text-muted">{product.summary}</p>
            </div>
            <AffiliateLink productId={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
