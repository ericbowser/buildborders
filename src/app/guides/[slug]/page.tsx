import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getGuideBySlug, guides } from "@/data/guides";
import { getGuideContent } from "@/lib/content";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getGuideContent(slug);
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide not found" };

  return {
    title: content?.title ?? guide.title,
    description: content?.description ?? guide.description,
    keywords: [...(content?.keywords ?? guide.keywords)],
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const content = getGuideContent(slug);
  if (!guide) notFound();

  const title = content?.title ?? guide.title;
  const description = content?.description ?? guide.description;
  const faq = content?.faq;

  const faqSchema = faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {faqSchema && <JsonLd data={faqSchema} />}
      <Link href="/guides" className="text-sm text-primary hover:text-primary-hover">
        ← All guides
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-text">{title}</h1>
      <p className="mt-4 text-lg text-text-muted">{description}</p>

      {content ? (
        <div className="mt-10">
          <MarkdownContent content={content.body} />
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-steel-light/30 bg-surface-card/40 p-6 text-text-muted">
          Guide content coming soon.
        </p>
      )}

      <div className="mt-10 rounded-xl border border-primary/30 bg-surface-card/40 p-6">
        <p className="text-sm text-text-muted">
          Try the <Link href="/tool" className="text-primary">Frame Builder</Link> or read{" "}
          <Link href="/guides/entry-level-lasers" className="text-primary">entry-level laser picks</Link>.
        </p>
      </div>
    </article>
  );
}
