import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, tutorials, and workshop notes for laser border and frame workflows.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text">Workshop blog</h1>
      <p className="mt-3 max-w-2xl text-text-muted">
        Short, practical posts that support the Frame Builder and gear reviews.
      </p>
      <div className="mt-10 space-y-4">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-steel-light/20 bg-surface-card p-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-semibold text-text">
                {post.published ? (
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                ) : (
                  post.title
                )}
              </h2>
              {!post.published && (
                <span className="rounded-full bg-steel-medium/30 px-2 py-0.5 text-xs text-text-muted">
                  Draft
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-text-muted">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
