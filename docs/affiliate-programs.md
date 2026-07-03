# Affiliate Program Tracker

Track application status and live links for execute-engrave.com gear reviews.

## Priority programs (high-ticket)

| Program | Commission | Cookie | Apply URL | Status | Notes |
|---------|------------|--------|-----------|--------|-------|
| xTool | 4–8% | 30 days | https://www.xtool.com/pages/xtool-partner | **Pending** | Also on FlexOffers (3.2–8%) |
| OMTech | 5%+ | TBD | https://omtech.com/pages/laser-machine-collaborations | **Pending** | 5% audience discount code on approval |
| Amazon Associates | ~1–3% electronics | 24h | https://affiliate-program.amazon.com | **Pending** | Fallback for machines + blanks |
| LightBurn | TBD | — | Contact / Impact/CJ search | **Not started** | Software pillar |
| Inventables | TBD | — | Inventables affiliate page | **Not started** | Blanks/materials |

## Secondary / limited

| Program | Status | Notes |
|---------|--------|-------|
| Glowforge referral | **Owner only** | Referral credits, not a public affiliate program — mention in comparisons only |
| FlexOffers (xTool) | **Optional** | https://www.flexoffers.com/affiliate-programs/xtool-affiliate-program/ |

## When approved

1. Paste tagged URLs into [`src/data/affiliateLinks.ts`](../src/data/affiliateLinks.ts) for each `productId`.
2. Set retailer key (`xtool`, `omtech`, `amazon`, etc.) — never `null`.
3. QA: click each link from `/review/*` and `/compare/*` in production.
4. Update **Status** column above to `Approved` / `Live`.

## Disclosure

Site copy lives on `/about`. Footer includes standard affiliate disclosure. All outbound links use `rel="sponsored nofollow"` via `AffiliateLink` component.
