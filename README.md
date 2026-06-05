# buildborders

Execute & Engrave affiliate site — laser frame SVG builder, guides, and gear reviews.

The **Frame Builder** SVG tool is the hook; guides, gear reviews, and shop CTAs support SEO and monetization.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://execute-engrave.com
```

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing with embedded Frame Builder preview |
| `/tool` | Full Frame Builder |
| `/tool/[preset]` | Deep-linked presets |
| `/guides` | Pillar guides index |
| `/reviews` | Affiliate gear categories |
| `/blog` | Workshop posts |
| `/about` | Brand + disclosure |
| `/contact` | Quote request |

## Project structure

```
src/
├── app/                 # Next.js routes
├── components/          # UI + Frame Builder
├── data/                # Site config, presets, affiliate links
└── lib/frame-builder/   # SVG generation + export
```

## Next steps

1. Add affiliate URLs in `src/data/affiliateLinks.ts`
2. Write guide/blog MDX content
3. Wire contact form to OAuth email API (rockhound pattern)
4. Add remaining border styles (rope, art deco, corner flourish)
5. Deploy to `execute-engrave.com`

See `docs/blueprint.md` for the full product plan.
