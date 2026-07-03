# buildborders

Execute & Engrave affiliate site — laser frame SVG builder, guides, and gear reviews.

The **Frame Builder** SVG tool is the hook; guides, gear reviews, and shop CTAs support SEO and monetization.

## Stack

- Next.js 16 (App Router, SSG for SEO)
- React 19 · TypeScript · Tailwind v4
- Markdown content in `content/`
- Express email API on port 7667

## Development

```bash
npm install
npm run dev:all    # Next.js + email API
# or
npm run dev        # Next.js only (forms mock until API runs)
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` (Next.js) and `.env` (email API on Pi).

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing + embedded Frame Builder |
| `/tool`, `/tool/[preset]` | Frame Builder |
| `/guides/[slug]` | Pillar guides (markdown) |
| `/review/[id]` | Product reviews |
| `/compare/[a]/[b]` | Machine comparisons |
| `/reviews/[slug]` | Category index |
| `/blog/[slug]` | Workshop posts |
| `/about`, `/contact` | Trust + quote flow |

## Affiliate programs

See [`docs/affiliate-programs.md`](docs/affiliate-programs.md). Paste approved URLs into `src/data/affiliateLinks.ts`.

## Pi deployment

1. `npm run build` on the Pi
2. Copy `deploy/*.service.example` → `/etc/systemd/system/`
3. Copy `deploy/nginx-execute-engrave.conf.example` → nginx sites-enabled
4. `certbot --nginx -d execute-engrave.com`
5. `sudo systemctl enable --now buildborders buildborders-api`

nginx proxies `/` → `next start :3000` and `/api/` → email API `:7667`.

## SEO post-deploy

See [`docs/gsc-setup.md`](docs/gsc-setup.md) for Google Search Console steps.

## Blueprint

Full product plan: [`docs/blueprint.md`](docs/blueprint.md)
