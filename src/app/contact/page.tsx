import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote for custom laser cut and engraved frames from Execute & Engrave.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text">Get it cut &amp; engraved</h1>
      <p className="mt-4 text-text-muted">
        Send your Frame Builder SVG or describe the plaque. We&apos;ll reply with cut, engrave, and
        finish options from our Salt Lake City shop.
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>

      <p className="mt-4 text-sm text-text-muted/80">
        Or email{" "}
        <a
          href={`mailto:${siteConfig.meta.contactEmail}`}
          className="text-primary hover:text-primary-hover"
        >
          {siteConfig.meta.contactEmail}
        </a>
      </p>
    </div>
  );
}
