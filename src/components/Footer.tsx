import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { siteConfig } from "@/data/config";

export function Footer() {
  const { meta } = siteConfig;

  return (
    <footer className="border-t border-steel-light/10 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-text">
              Execute <span className="text-primary">&amp; Engrave</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{meta.description}</p>
            <p className="mt-3 text-xs text-text-muted/80">
              Some links earn a small commission at no extra cost to you. It keeps the site running
              and never influences our reviews.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text">
              Site
            </h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <Link href="/tool" className="hover:text-primary">
                  Frame Builder
                </Link>
              </li>
              <li>
                <Link href="/#gear" className="hover:text-primary">
                  Gear we use
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About &amp; disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text">
              Workshop notes
            </h3>
            <p className="mb-3 text-sm text-text-muted">
              New Frame Builder updates and gear picks.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-steel-light/10 pt-6 sm:flex-row">
          <p className="text-xs text-text-muted/80">
            © {new Date().getFullYear()} {meta.author}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted/80">Built for laser makers · {meta.location}</p>
        </div>
      </div>
    </footer>
  );
}
