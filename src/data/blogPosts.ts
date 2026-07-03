export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  published: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "rectangle-vs-oval-plaque",
    title: "Rectangle vs oval plaque: which sells better on Etsy",
    excerpt: "Shape psychology, material waste, and what buyers actually click on.",
    published: false,
  },
  {
    slug: "stroke-width-mistakes",
    title: "Stroke width mistakes that ruin laser frames",
    excerpt: "Too thin burns away; too thick looks muddy after paint fill.",
    published: true,
  },
  {
    slug: "mm-vs-inches-svg",
    title: "mm vs inches in laser SVG workflows",
    excerpt: "Why makers should design in millimeters even when selling in inches.",
    published: false,
  },
  {
    slug: "double-line-borders-no-bleed",
    title: "Double-line borders without fill bleed",
    excerpt: "Spacing, stroke alignment, and kerf-aware gaps for clean cuts.",
    published: false,
  },
  {
    slug: "frame-builder-to-lightburn",
    title: "Exporting from the Frame Builder to LightBurn in 60 seconds",
    excerpt: "Import checklist, layer mapping, and a quick test cut workflow.",
    published: true,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
