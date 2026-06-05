import type { Metadata } from "next";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote for custom laser cut and engraved frames from Execute & Engrave.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-100">Get it cut &amp; engraved</h1>
      <p className="mt-4 text-slate-400">
        Send your Frame Builder SVG or describe the plaque. We&apos;ll reply with cut, engrave, and
        finish options from our Salt Lake City shop.
      </p>

      <form className="mt-8 space-y-4 rounded-xl border border-surface-light/20 bg-surface p-6">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-400">Name</span>
          <input
            type="text"
            name="name"
            className="w-full rounded-lg border border-surface-light/20 bg-gunmetal px-3 py-2 text-slate-100 focus:border-accent focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-400">Email</span>
          <input
            type="email"
            name="email"
            className="w-full rounded-lg border border-surface-light/20 bg-gunmetal px-3 py-2 text-slate-100 focus:border-accent focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-400">Project details</span>
          <textarea
            name="message"
            rows={5}
            className="w-full rounded-lg border border-surface-light/20 bg-gunmetal px-3 py-2 text-slate-100 focus:border-accent focus:outline-none"
            placeholder="Size, material, quantity, deadline..."
          />
        </label>
        <button
          type="button"
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-gunmetal"
        >
          Submit (API wiring next)
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-500">
        Or email{" "}
        <a href={`mailto:${siteConfig.meta.contactEmail}`} className="text-accent hover:text-accent-hover">
          {siteConfig.meta.contactEmail}
        </a>
      </p>
    </div>
  );
}
