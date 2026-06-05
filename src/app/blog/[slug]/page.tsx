import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.filter((post) => post.published).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-sm text-accent hover:text-accent-hover">
        ← Blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-100">{post.title}</h1>
      <p className="mt-4 text-lg text-slate-400">{post.excerpt}</p>
      <div className="mt-10 rounded-xl border border-dashed border-surface-light/30 bg-surface/40 p-6 text-slate-400">
        Article body placeholder. Route, metadata, and internal linking are ready for content.
      </div>
    </article>
  );
}
