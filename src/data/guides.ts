export type Guide = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
};

export const guides: Guide[] = [
  {
    slug: "svg-for-lightburn",
    title: "How to prepare SVG borders for LightBurn",
    description:
      "Hairline strokes, layer groups, and export settings that survive import without fill bleed.",
    keywords: ["lightburn svg border", "laser engraving frame svg"],
  },
  {
    slug: "kerf-compensation",
    title: "Kerf compensation for laser cut frames",
    description:
      "When to offset cut paths outward and how much to add for tight-fitting double-line borders.",
    keywords: ["kerf compensation svg laser", "laser cut frame offset"],
  },
  {
    slug: "entry-level-lasers",
    title: "Best entry-level lasers for plaque and sign work",
    description:
      "Diode vs CO₂ for bordered plaques, medallions, and small sign production.",
    keywords: ["best laser for plaques", "entry level laser engraver signs"],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
