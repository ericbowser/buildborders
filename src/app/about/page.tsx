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
      <h1 className="text-3xl font-bold text-text">About Execute &amp; Engrave</h1>
      <div className="mt-6 space-y-4 text-text-muted">
        <p>
          We engrave daily in {siteConfig.meta.location}. The{" "}
          <Link href="/tool" className="text-primary hover:text-primary-hover">
            Frame Builder
          </Link>{" "}
          exists because border templates should ship with real measurements, kerf-aware spacing,
          and export settings that survive LightBurn import — not generic clip art.
        </p>
        <p>
          This site combines the free SVG tool with the gear we actually use in the shop. No
          spec-sheet summaries — just what we run in real plaque production.
        </p>
        <h2 className="pt-4 text-lg font-semibold text-text">Affiliate disclosure</h2>
        <p>
          Some links on this site are affiliate links (Amazon, xTool, OMTech, and others as
          programs approve). They earn a small commission at no extra cost to you and help keep
          the site running. Affiliate relationships never change our recommendations — we only
          link gear we would use or recommend in the shop.
        </p>
        <h2 className="pt-4 text-lg font-semibold text-text">Primary service</h2>
        <p>
          Custom cut and engraving for plaques, awards, and sign borders.{" "}
          <Link href="/contact" className="text-primary hover:text-primary-hover">
            Request a quote
          </Link>{" "}
          with your Frame Builder SVG or project details.
        </p>
      </div>
    </div>
  );
}
