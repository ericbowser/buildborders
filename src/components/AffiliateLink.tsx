import { getPrimaryLink } from "@/data/affiliateLinks";

type AffiliateLinkProps = {
  productId: string;
  className?: string;
  children?: React.ReactNode;
};

export function AffiliateLink({ productId, className = "", children }: AffiliateLinkProps) {
  const link = getPrimaryLink(productId);

  if (!link) {
    return (
      <span className={`inline-flex items-center rounded-lg bg-surface-light/20 px-4 py-2 text-sm text-slate-500 ${className}`}>
        Affiliate link pending
      </span>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-gunmetal transition-colors hover:bg-accent-hover ${className}`}
    >
      {children ?? link.label}
    </a>
  );
}
