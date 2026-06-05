# Laser Frame Generator Site — Blueprint

Product plan for **Execute & Engrave** affiliate site on `execute-engrave.com`.

## MVP

- **Hook:** Parametric sign border & medallion frame generator → laser-ready SVG export
- **Support:** Guides, gear reviews (affiliate), shop quote CTA
- **Stack (this repo):** Next.js App Router + TypeScript + Tailwind v4

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing + embedded builder preview |
| `/tool` | Full Frame Builder |
| `/tool/[preset]` | Deep-linked presets |
| `/guides`, `/guides/[slug]` | SEO pillar content |
| `/reviews`, `/reviews/[slug]` | Affiliate gear categories |
| `/blog`, `/blog/[slug]` | Workshop posts |
| `/about`, `/contact` | Trust + quote flow |

## Frame Builder (v1)

- Shapes: rectangle, rounded rect, ellipse, circle
- Styles: double line, medallion rings (rope / art deco / corner flourish → phase 1.5)
- Controls: mm sizing, stroke, kerf offset, corner radius
- Export: grouped `cut` SVG, download + clipboard

## Affiliate categories

- `laser-machines`, `laser-software`, `blanks-materials`, `rotary-accessories`
- Links centralized in `src/data/affiliateLinks.ts`

## Next implementation steps

1. Paste affiliate URLs as programs approve
2. MDX or content layer for guides/blog
3. OAuth email API for contact + newsletter (mirror Affiliate `server.js`)
4. Additional border styles + DXF export (phase 2)
5. Deploy nginx block for `execute-engrave.com`

Full plan with wireframes and keyword map: Cursor plan `laser_frame_site_blueprint_d31c781a.plan.md`.
