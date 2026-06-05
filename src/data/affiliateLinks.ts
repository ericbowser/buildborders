const RETAILERS = {
  amazon: { name: "Amazon", label: "Check price on Amazon", priority: 2 },
  xtool: { name: "xTool", label: "Shop at xTool", priority: 1 },
  inventables: { name: "Inventables", label: "Shop at Inventables", priority: 1 },
} as const;

type RetailerKey = keyof typeof RETAILERS;

const affiliateLinks: Record<string, Partial<Record<RetailerKey, string | null>>> = {
  "xtool-p2": {
    xtool: null,
    amazon: null,
  },
  "glowforge-pro": {
    amazon: null,
  },
  "omtech-55w": {
    amazon: null,
  },
  lightburn: {
    amazon: null,
  },
  "xtool-creative": {
    xtool: null,
  },
  "walnut-plaque-blank": {
    amazon: null,
    inventables: null,
  },
  "cast-acrylic-sheet": {
    amazon: null,
    inventables: null,
  },
  "brass-nameplate": {
    amazon: null,
  },
  "rotary-chuck": {
    amazon: null,
  },
  "riser-blocks": {
    amazon: null,
  },
};

export type ProductLink = {
  retailer: string;
  label: string;
  url: string;
  priority: number;
};

export function getProductLinks(productId: string): ProductLink[] {
  const links = affiliateLinks[productId];
  if (!links) return [];

  return Object.entries(links)
    .filter((entry): entry is [RetailerKey, string] => entry[1] != null)
    .map(([key, url]) => {
      const retailer = RETAILERS[key];
      return {
        retailer: retailer.name,
        label: retailer.label,
        url,
        priority: retailer.priority,
      };
    })
    .sort((a, b) => a.priority - b.priority);
}

export function getPrimaryLink(productId: string): ProductLink | null {
  const links = getProductLinks(productId);
  return links[0] ?? null;
}

export default affiliateLinks;
