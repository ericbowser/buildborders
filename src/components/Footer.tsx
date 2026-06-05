import Link from "next/link";
import { siteConfig } from "@/data/config";

export function Footer() {
  const { categories, meta } = siteConfig;

  return (
    <footer className="border-t border-surface-light/10 bg-gunmetal">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-slate-100">
              Execute <span className="text-accent">&amp; Engrave</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{meta.description}</p>
            <p className="mt-3 text-xs text-slate-500">
              Some links earn a small commission at no extra cost to you. It keeps the site running
              and never influences our reviews.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Gear categories
            </h3>
            <ul className="space-y-2">
              {Object.entries(categories).map(([slug, category]) => (
                <li key={slug}>
                  <Link
                    href={`/reviews/${slug}`}
                    className="text-sm text-slate-400 transition-colors hover:text-accent"
                  >
                    {category.icon} {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Site
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/tool" className="hover:text-accent">
                  Frame Builder
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-accent">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent">
                  About &amp; disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Workshop notes
            </h3>
            <p className="text-sm text-slate-400">
              New guides, gear reviews, and Frame Builder updates. Newsletter signup coming soon.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-surface-light/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {meta.author}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">Built for laser makers · {meta.location}</p>
        </div>
      </div>
    </footer>
  );
}
