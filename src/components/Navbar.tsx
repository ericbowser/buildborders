import Link from "next/link";
import { siteConfig } from "@/data/config";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-surface-light/10 bg-gunmetal/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-lg font-semibold text-slate-100">
            Execute <span className="text-accent">&amp; Engrave</span>
          </span>
          <span className="hidden border-l border-surface-light/20 pl-3 text-xs text-slate-500 lg:block">
            {siteConfig.meta.location} · Laser frame tools
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-gunmetal transition-colors hover:bg-accent-hover"
          >
            Get it cut
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-surface-light/20 px-3 py-2 text-sm text-slate-300">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-52 rounded-xl border border-surface-light/20 bg-surface p-2 shadow-xl">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-surface-light/10 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-1 block rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-gunmetal"
            >
              Get it cut
            </Link>
          </div>
        </details>
      </div>
    </nav>
  );
}
