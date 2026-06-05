import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Execute & Engrave, affiliate disclosures, and why we built the Frame Builder.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-100">About Execute &amp; Engrave</h1>
      <div className="mt-6 space-y-4 text-slate-400">
        <p>
          We engrave daily in {siteConfig.meta.location}. The Frame Builder exists because border
          templates should ship with real measurements, kerf-aware spacing, and export settings that
          survive LightBurn import — not generic clip art.
        </p>
        <p>
          This site combines the free SVG tool with honest gear reviews and workflow guides. Some
          review links are affiliate links. They help keep the site running and never change our
          recommendations.
        </p>
        <p>
          Primary service CTA: custom cut and engraving for plaques, awards, and sign borders built
          in our shop.
        </p>
      </div>
      <Link
        href="/contact"
        className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-gunmetal transition-colors hover:bg-accent-hover"
      >
        Contact the shop
      </Link>
    </div>
  );
}
