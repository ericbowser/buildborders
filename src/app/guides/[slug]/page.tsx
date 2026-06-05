import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideBySlug, guides } from "@/data/guides";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide not found" };

  return {
    title: guide.title,
    description: guide.description,
    keywords: [...guide.keywords],
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/guides" className="text-sm text-accent hover:text-accent-hover">
        ← All guides
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-100">{guide.title}</h1>
      <p className="mt-4 text-lg text-slate-400">{guide.description}</p>

      <div className="prose prose-invert mt-10 max-w-none">
        <p className="rounded-xl border border-dashed border-surface-light/30 bg-surface/40 p-6 text-slate-400">
          Full guide content is coming next. This route and metadata are wired for SEO launch.
          Keywords: {guide.keywords.join(", ")}.
        </p>
      </div>
    </article>
  );
}
