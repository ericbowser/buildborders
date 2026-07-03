/**
 * affiliateLinks.ts
 *
 * Centralized affiliate URL registry for Execute & Engrave.
 * Single Responsibility: manages retailer links per product.
 * Open/Closed: add new retailers by extending RETAILERS — no edits to existing entries.
 *
 * Amazon tag: rock0795-20
 * Direct amzn.to short links used where available; search URLs as fallback.
 *
 * Retailer status:
 *   amazon      — active (rock0795-20)
 *   xtool       — pending approval
 *   omtech      — pending approval
 *   inventables — pending approval
 *   lightburn   — pending approval (sold direct only, not on Amazon)
 *   flexoffers  — pending approval
 */

const RETAILERS = {
  amazon:     { name: "Amazon",      label: "Check price on Amazon", priority: 3 },
  xtool:      { name: "xTool",       label: "Shop at xTool",         priority: 1 },
  omtech:     { name: "OMTech",      label: "Shop at OMTech",        priority: 1 },
  inventables:{ name: "Inventables", label: "Shop at Inventables",   priority: 2 },
  flexoffers: { name: "xTool",       label: "Shop at xTool",         priority: 2 },
  lightburn:  { name: "LightBurn",   label: "Get LightBurn",         priority: 1 },
} as const;

type RetailerKey = keyof typeof RETAILERS;

const affiliateLinks: Record<string, Partial<Record<RetailerKey, string | null>>> = {

  // ── LASER MACHINES ───────────────────────────────────────────────────────
  "xtool-p2": {
    xtool:      null,
    flexoffers: null,
    amazon:     "https://www.amazon.com/s?k=xTool+P2+laser+engraver&tag=rock0795-20",
  },
  // xTool S1 40W — the shop machine
  "xtool-s1": {
    xtool:      null,
    amazon:     "https://amzn.to/4uLoGhU",
  },
  // xTool S1 Portable — compact version of the S1
  "xtool-s1-portable": {
    xtool:      null,
    amazon:     "https://amzn.to/4g2r8vO",
  },
  // xTool F2 — 5W IR + 15W Diode dual laser, 50MP camera, 6000mm/s, portable desktop
  "xtool-f2": {
    xtool:      null,
    amazon:     "https://amzn.to/4dRuXTp",
  },
  "glowforge-pro": {
    amazon:     null, // Direct only — no Amazon listing
  },
  "omtech-55w": {
    omtech:     null,
    amazon:     "https://www.amazon.com/s?k=OMTech+55W+CO2+laser+engraver&tag=rock0795-20",
  },
  "omtech-80w": {
    omtech:     null,
    amazon:     "https://www.amazon.com/s?k=OMTech+80W+CO2+laser+engraver&tag=rock0795-20",
  },

  // ── LASER SOFTWARE ───────────────────────────────────────────────────────
  lightburn: {
    lightburn:  null, // Wire once LightBurn affiliate program approves
    amazon:     null, // Not sold on Amazon
  },
  "xtool-creative": {
    xtool:      null, // Free software — no purchase link needed
  },

  // ── BLANKS & MATERIALS ───────────────────────────────────────────────────
  "walnut-plaque-blank": {
    amazon:     "https://www.amazon.com/s?k=walnut+wood+plaque+blank+laser+engraving&tag=rock0795-20",
    inventables:null,
  },
  "cast-acrylic-sheet": {
    amazon:     "https://www.amazon.com/s?k=cast+acrylic+sheet+laser+cutting&tag=rock0795-20",
    inventables:null,
  },
  "brass-nameplate": {
    amazon:     "https://www.amazon.com/s?k=brass+nameplate+blank+laser+engraving&tag=rock0795-20",
  },
  // High-reorder gifting staples
  "anodized-aluminum-blank": {
    amazon:     "https://www.amazon.com/s?k=anodized+aluminum+blank+laser+engraving&tag=rock0795-20",
  },
  "slate-coaster-blank": {
    amazon:     "https://www.amazon.com/s?k=slate+coaster+blank+laser+engraving&tag=rock0795-20",
  },
  "leather-sheet-blank": {
    amazon:     "https://www.amazon.com/s?k=leather+sheet+laser+engraving+blank&tag=rock0795-20",
  },
  "bamboo-cutting-board-blank": {
    amazon:     "https://www.amazon.com/s?k=bamboo+cutting+board+blank+laser+engraving&tag=rock0795-20",
  },
  "birch-plywood-sheet": {
    amazon:     "https://www.amazon.com/s?k=birch+plywood+sheet+laser+cutting&tag=rock0795-20",
  },
  // Tumbler/cup blanks — pairs with rotary chuck
  "tumbler-blank": {
    amazon:     "https://www.amazon.com/s?k=sublimation+tumbler+blank+laser+engraving&tag=rock0795-20",
  },

  // ── CONSUMABLES ──────────────────────────────────────────────────────────
  // Recurring purchases — strong for repeat commission
  "cermark-marking-spray": {
    amazon:     "https://www.amazon.com/s?k=cermark+laser+marking+spray+metal&tag=rock0795-20",
  },
  "transfer-masking-tape": {
    amazon:     "https://www.amazon.com/s?k=transfer+tape+masking+laser+engraving&tag=rock0795-20",
  },
  "paint-markers-infill": {
    amazon:     "https://www.amazon.com/s?k=paint+markers+engraving+color+infill&tag=rock0795-20",
  },

  // ── SAFETY & SETUP ───────────────────────────────────────────────────────
  // Every new laser buyer needs these — high-trust content angle
  "laser-safety-glasses": {
    amazon:     "https://www.amazon.com/s?k=laser+safety+glasses+diode+CO2+engraver&tag=rock0795-20",
  },
  "fume-extractor": {
    amazon:     "https://www.amazon.com/s?k=laser+engraver+fume+extractor+air+purifier&tag=rock0795-20",
  },
  "honeycomb-bed": {
    amazon:     "https://www.amazon.com/s?k=laser+engraver+honeycomb+bed+work+table&tag=rock0795-20",
  },
  "fire-blanket": {
    amazon:     "https://www.amazon.com/s?k=fire+blanket+laser+engraver+safety&tag=rock0795-20",
  },

  // ── ROTARY & ACCESSORIES ─────────────────────────────────────────────────
  "rotary-chuck": {
    amazon:     "https://www.amazon.com/s?k=laser+engraver+rotary+chuck+attachment&tag=rock0795-20",
  },
  // Rotary roller — Y-axis style, handles long cylinders the chuck can't
  "rotary-roller": {
    amazon:     "https://www.amazon.com/s?k=laser+engraver+rotary+roller+Y+axis&tag=rock0795-20",
  },
  "riser-blocks": {
    amazon:     "https://www.amazon.com/s?k=laser+engraver+riser+block+honeycomb&tag=rock0795-20",
  },
  // xTool S1 add-on module (the one in the shop)
  "xtool-s1-module": {
    xtool:      null,
    amazon:     "https://amzn.to/4uVnatM",
  },
};

// ── Utility exports ───────────────────────────────────────────────────────

export type ProductLink = {
  retailer: string;
  label: string;
  url: string;
  priority: number;
};

/** All active links for a product, sorted by retailer priority (specialty first). */
export function getProductLinks(productId: string): ProductLink[] {
  const links = affiliateLinks[productId];
  if (!links) return [];

  return Object.entries(links)
    .filter((entry): entry is [RetailerKey, string] => entry[1] != null)
    .map(([key, url]) => {
      const retailer = RETAILERS[key];
      return {
        retailer: retailer.name,
        label:    retailer.label,
        url,
        priority: retailer.priority,
      };
    })
    .sort((a, b) => a.priority - b.priority);
}

/** Single best link for a product (specialty retailer wins over Amazon). */
export function getPrimaryLink(productId: string): ProductLink | null {
  const links = getProductLinks(productId);
  return links[0] ?? null;
}

/** All active links across every product — useful for disclosure counts. */
export function getAllProductLinks(): ProductLink[] {
  return Object.keys(affiliateLinks).flatMap((id) => getProductLinks(id));
}

export default affiliateLinks;
