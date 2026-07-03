import type { CategorySlug } from "./config";

export type Product = {
  id: string;
  name: string;
  category: CategorySlug;
  msrp: number;
  summary: string;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  bestFor: string;
  compareWith?: string[];
};

export const products: Product[] = [
  {
    id: "xtool-p2",
    name: "xTool P2 55W CO₂",
    category: "laser-machines",
    msrp: 4499,
    summary:
      "Enclosed 55W CO₂ laser with camera alignment and pass-through slot — strong pick for plaque shops doing bordered signs daily.",
    specs: {
      Power: "55W CO₂",
      "Work area": "600 × 308 mm",
      Software: "xTool Creative / LightBurn",
      Enclosure: "Yes",
      "Pass-through": "Yes",
    },
    pros: [
      "Camera preview makes framed plaque alignment fast",
      "Enclosed beam path — safer in shared workshops",
      "Handles wood, acrylic, and coated metals for borders",
    ],
    cons: [
      "Premium price vs open-frame diode kits",
      "CO₂ maintenance (tube, water chiller)",
    ],
    bestFor: "Serious plaque and sign sellers who want production speed",
    compareWith: ["omtech-55w", "glowforge-pro"],
  },
  {
    id: "xtool-s1",
    name: "xTool S1 40W Diode",
    category: "laser-machines",
    msrp: 1599,
    summary:
      "Diode laser with optional IR module — entry path for bordered wood plaques and acrylic under 10 mm.",
    specs: {
      Power: "40W diode (+ optional 2W IR)",
      "Work area": "608 × 385 mm",
      Software: "xTool Creative / LightBurn",
      Enclosure: "Optional",
    },
    pros: ["Lower cost than CO₂", "Large bed for oval plaques", "Upgrade path with IR module"],
    cons: ["Slower on thick acrylic", "Not ideal for clear cast acrylic without masking discipline"],
    bestFor: "Hobbyists and Etsy sellers testing plaque borders",
    compareWith: ["omtech-55w"],
  },
  {
    id: "omtech-55w",
    name: "OMTech 55W CO₂",
    category: "laser-machines",
    msrp: 2899,
    summary:
      "Open-frame 55W CO₂ workhorse — common first cabinet laser for bordered signs and double-line frames.",
    specs: {
      Power: "55W CO₂",
      "Work area": "500 × 300 mm",
      Software: "LightBurn (recommended)",
      Enclosure: "No (add exhaust)",
    },
    pros: ["Strong value per watt", "Huge community for LightBurn workflows", "Cuts 3–6 mm acrylic cleanly"],
    cons: ["No built-in camera", "You manage exhaust and safety enclosure"],
    bestFor: "Budget-conscious shops comfortable with LightBurn",
    compareWith: ["xtool-p2", "xtool-s1"],
  },
  {
    id: "glowforge-pro",
    name: "Glowforge Pro",
    category: "laser-machines",
    msrp: 6995,
    summary:
      "Cloud-tied 45W CO₂ with pass-through — simple UI, less control than LightBurn-first workflows.",
    specs: {
      Power: "45W CO₂",
      "Work area": "279 × 495 mm (pass-through)",
      Software: "Glowforge cloud app",
      Enclosure: "Yes",
    },
    pros: ["Very approachable for beginners", "Pass-through for long signs"],
    cons: ["Cloud dependency", "Less parametric control for kerf-aware borders"],
    bestFor: "Designers who prioritize ease over shop-floor control",
    compareWith: ["xtool-p2"],
  },
  {
    id: "lightburn",
    name: "LightBurn",
    category: "laser-software",
    msrp: 60,
    summary: "Industry-standard laser control — essential for importing Frame Builder SVG with cut/engrave layers.",
    specs: {
      License: "Per controller",
      Platforms: "Windows, macOS, Linux",
      "SVG import": "Full layer support",
    },
    pros: ["Reliable SVG import with mm units", "Layer colors map to cut/engrave", "Camera overlay on supported machines"],
    cons: ["Separate license per machine", "Learning curve for new operators"],
    bestFor: "Any shop serious about bordered plaque production",
  },
  {
    id: "walnut-plaque-blank",
    name: "Walnut plaque blank 8×10",
    category: "blanks-materials",
    msrp: 18,
    summary: "Hardwood blank for double-line borders and engraved center fields.",
    specs: { Size: '8×10"', Material: "Walnut", Thickness: "19 mm" },
    pros: ["Contrasts well with light engrave fill", "Stable for oval borders"],
    cons: ["Needs masking on resinous grain"],
    bestFor: "Award plaques and desk signs",
  },
];

export const comparePairs = [
  { a: "xtool-p2", b: "omtech-55w" },
  { a: "xtool-p2", b: "glowforge-pro" },
  { a: "xtool-s1", b: "omtech-55w" },
] as const;

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}
