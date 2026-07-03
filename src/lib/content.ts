import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type ContentDoc = {
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
  published: boolean;
  faq?: { question: string; answer: string }[];
  body: string;
};

function readMarkdownFile(filePath: string, slug: string): ContentDoc {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    keywords: data.keywords as string[] | undefined,
    published: data.published !== false,
    faq: data.faq as ContentDoc["faq"],
    body: content.trim(),
  };
}

export function getGuideContent(slug: string): ContentDoc | null {
  const filePath = path.join(contentRoot, "guides", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readMarkdownFile(filePath, slug);
}

export function getAllGuideSlugs(): string[] {
  const dir = path.join(contentRoot, "guides");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getBlogContent(slug: string): ContentDoc | null {
  const filePath = path.join(contentRoot, "blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readMarkdownFile(filePath, slug);
}

export function getAllBlogSlugs(): string[] {
  const dir = path.join(contentRoot, "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getReviewContent(slug: string): ContentDoc | null {
  const filePath = path.join(contentRoot, "reviews", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readMarkdownFile(filePath, slug);
}

export function getAllReviewSlugs(): string[] {
  const dir = path.join(contentRoot, "reviews");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
