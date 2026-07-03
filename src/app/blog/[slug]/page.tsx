import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import { getBlogContent } from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.filter((post) => post.published).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getBlogContent(slug);
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: content?.title ?? post.title,
    description: content?.description ?? post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const content = getBlogContent(slug);
  if (!post || !post.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-sm text-primary hover:text-primary-hover">
        ← Blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-text">{content?.title ?? post.title}</h1>
      <p className="mt-4 text-lg text-text-muted">{content?.description ?? post.excerpt}</p>

      {content ? (
        <div className="mt-10">
          <MarkdownContent content={content.body} />
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-steel-light/30 bg-surface-card/40 p-6 text-text-muted">
          Article body coming soon.
        </p>
      )}
    </article>
  );
}
