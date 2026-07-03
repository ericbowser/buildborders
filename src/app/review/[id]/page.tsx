import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/components/AffiliateLink";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { siteConfig } from "@/data/config";
import { getProductById, products } from "@/data/products";
import { getReviewContent } from "@/lib/content";

type ReviewPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Review not found" };

  return {
    title: `${product.name} Review`,
    description: product.summary,
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const content = getReviewContent(id);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: product.name,
      description: product.summary,
    },
    author: {
      "@type": "Organization",
      name: siteConfig.meta.author,
    },
    reviewBody: product.summary,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={reviewSchema} />
      <Link href={`/reviews/${product.category}`} className="text-sm text-primary hover:text-primary-hover">
        ← {siteConfig.categories[product.category].name}
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-text">{product.name} Review</h1>
      <p className="mt-4 text-lg text-text-muted">{product.summary}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <AffiliateLink productId={product.id} />
        <span className="text-sm text-text-muted/80">MSRP ~${product.msrp.toLocaleString()}</span>
      </div>

      <dl className="mt-8 grid gap-3 rounded-xl border border-steel-light/20 bg-surface-card p-6 sm:grid-cols-2">
        {Object.entries(product.specs).map(([key, value]) => (
          <div key={key}>
            <dt className="text-xs uppercase tracking-wider text-text-muted/80">{key}</dt>
            <dd className="text-sm text-text">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="font-semibold text-text">Pros</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-text-muted">
            {product.pros.map((pro) => (
              <li key={pro}>{pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-text">Cons</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-text-muted">
            {product.cons.map((con) => (
              <li key={con}>{con}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-sm text-text-muted">
        <strong className="text-text-muted">Best for:</strong> {product.bestFor}
      </p>

      {product.compareWith && product.compareWith.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">Compare</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {product.compareWith.map((otherId) => (
              <li key={otherId}>
                <Link
                  href={`/compare/${id}/${otherId}`}
                  className="rounded-lg border border-steel-light/20 px-3 py-1.5 text-sm text-text-muted hover:border-primary hover:text-primary"
                >
                  vs {getProductById(otherId)?.name ?? otherId}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {content && (
        <div className="mt-10 border-t border-steel-light/10 pt-10">
          <MarkdownContent content={content.body} />
        </div>
      )}

      <div className="mt-10 rounded-xl border border-primary/30 bg-surface-card/40 p-6">
        <p className="text-sm text-text-muted">
          Building bordered plaques? Try the{" "}
          <Link href="/tool" className="text-primary hover:text-primary-hover">
            Frame Builder
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="text-primary hover:text-primary-hover">
            get a shop quote
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
