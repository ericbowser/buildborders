export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://execute-engrave.com",
  categories: {
    "laser-machines": {
      name: "Laser Machines",
      icon: "⚡",
      description:
        "Diode and CO₂ engravers for plaques, signs, and medallion work.",
      slug: "laser-machines",
      keywords: ["best laser engraver plaque", "xTool vs Glowforge", "CO2 laser sign work"],
      featuredProducts: ["xtool-p2", "glowforge-pro", "omtech-55w"],
    },
    "laser-software": {
      name: "Laser Software",
      icon: "🖥️",
      description: "LightBurn, Creative, and workflow tools for clean SVG output.",
      slug: "laser-software",
      keywords: ["LightBurn review", "laser software comparison", "SVG laser workflow"],
      featuredProducts: ["lightburn", "xtool-creative"],
    },
    "blanks-materials": {
      name: "Blanks & Materials",
      icon: "🪵",
      description: "Wood plaques, acrylic, brass blanks, and laser-ready stock.",
      slug: "blanks-materials",
      keywords: ["laser engraving blanks", "wood plaque blanks", "acrylic sign blanks"],
      featuredProducts: ["walnut-plaque-blank", "cast-acrylic-sheet", "brass-nameplate"],
    },
    "rotary-accessories": {
      name: "Rotary & Accessories",
      icon: "🔧",
      description: "Chucks, risers, and accessories for round and curved work.",
      slug: "rotary-accessories",
      keywords: ["laser rotary chuck", "laser riser block", "round engraving accessories"],
      featuredProducts: ["rotary-chuck", "riser-blocks"],
    },
  },
  meta: {
    siteName: "Execute & Engrave",
    productName: "Frame Builder",
    tagline: "Laser-ready sign borders in seconds",
    description:
      "Free laser-ready sign border and medallion SVG generator, plus the gear we actually use. Custom engraving from Salt Lake City.",
    author: "Execute & Engrave LLC",
    location: "Salt Lake City, UT",
    contactEmail: "info@execute-engrave.com",
  },
  nav: [
    { href: "/tool", label: "Frame Builder" },
    { href: "/about", label: "About" },
  ],
} as const;

export type CategorySlug = keyof typeof siteConfig.categories;
