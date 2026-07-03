import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/components/AffiliateLink";
import { comparePairs, getProductById } from "@/data/products";

type ComparePageProps = {
  params: Promise<{ a: string; b: string }>;
};

export async function generateStaticParams() {
  return comparePairs.map(({ a, b }) => ({ a, b }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { a, b } = await params;
  const productA = getProductById(a);
  const productB = getProductById(b);
  if (!productA || !productB) return { title: "Comparison not found" };

  return {
    title: `${productA.name} vs ${productB.name}`,
    description: `Side-by-side comparison for plaque and sign laser work: ${productA.name} vs ${productB.name}.`,
  };
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { a, b } = await params;
  const productA = getProductById(a);
  const productB = getProductById(b);
  if (!productA || !productB) notFound();

  const specKeys = [
    ...new Set([
      ...Object.keys(productA.specs),
      ...Object.keys(productB.specs),
    ]),
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/reviews/laser-machines" className="text-sm text-primary hover:text-primary-hover">
        ← Laser machine reviews
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-text">
        {productA.name} vs {productB.name}
      </h1>
      <p className="mt-4 text-text-muted">
        Which laser fits bordered plaque and sign work? Specs, trade-offs, and affiliate links below.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-steel-light/20">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-surface-card">
            <tr>
              <th className="px-4 py-3 text-text-muted">Spec</th>
              <th className="px-4 py-3 text-text">{productA.name}</th>
              <th className="px-4 py-3 text-text">{productB.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-steel-light/10">
              <td className="px-4 py-3 text-text-muted/80">MSRP</td>
              <td className="px-4 py-3 text-text-muted">${productA.msrp.toLocaleString()}</td>
              <td className="px-4 py-3 text-text-muted">${productB.msrp.toLocaleString()}</td>
            </tr>
            {specKeys.map((key) => (
              <tr key={key} className="border-t border-steel-light/10">
                <td className="px-4 py-3 text-text-muted/80">{key}</td>
                <td className="px-4 py-3 text-text-muted">{productA.specs[key] ?? "—"}</td>
                <td className="px-4 py-3 text-text-muted">{productB.specs[key] ?? "—"}</td>
              </tr>
            ))}
            <tr className="border-t border-steel-light/10">
              <td className="px-4 py-3 text-text-muted/80">Best for</td>
              <td className="px-4 py-3 text-text-muted">{productA.bestFor}</td>
              <td className="px-4 py-3 text-text-muted">{productB.bestFor}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-steel-light/20 bg-surface-card p-5">
          <h2 className="font-semibold text-text">{productA.name}</h2>
          <p className="mt-2 text-sm text-text-muted">{productA.summary}</p>
          <div className="mt-4">
            <AffiliateLink productId={productA.id} />
          </div>
          <Link
            href={`/review/${productA.id}`}
            className="mt-3 inline-block text-sm text-primary hover:text-primary-hover"
          >
            Full review →
          </Link>
        </div>
        <div className="rounded-xl border border-steel-light/20 bg-surface-card p-5">
          <h2 className="font-semibold text-text">{productB.name}</h2>
          <p className="mt-2 text-sm text-text-muted">{productB.summary}</p>
          <div className="mt-4">
            <AffiliateLink productId={productB.id} />
          </div>
          <Link
            href={`/review/${productB.id}`}
            className="mt-3 inline-block text-sm text-primary hover:text-primary-hover"
          >
            Full review →
          </Link>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-primary/30 bg-surface-card/40 p-6">
        <p className="text-sm text-text-muted">
          Whichever machine you pick, export borders from our{" "}
          <Link href="/tool" className="text-primary hover:text-primary-hover">
            Frame Builder
          </Link>{" "}
          and read{" "}
          <Link href="/guides/svg-for-lightburn" className="text-primary hover:text-primary-hover">
            SVG for LightBurn
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
