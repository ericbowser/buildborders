# Google Search Console — post-deploy checklist

Run after `execute-engrave.com` is live on the Pi.

1. Add property: https://search.google.com/search-console
2. Verify via DNS TXT record (recommended) or HTML file upload through nginx
3. Submit sitemap: `https://execute-engrave.com/sitemap.xml`
4. URL inspection:
   - `/` — confirm pre-rendered HTML includes hero copy and links
   - `/tool` — confirm Frame Builder shell is indexable (tool UI is client-enhanced)
   - `/review/xtool-p2` — confirm review body and JSON-LD present
   - `/guides/entry-level-lasers` — confirm FAQ schema in page source
5. Request indexing for pillar guides and flagship review first
6. Monitor Coverage report for 4xx on `/compare/*` and `/review/*` routes
