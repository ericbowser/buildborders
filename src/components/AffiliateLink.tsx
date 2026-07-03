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
      <span className={`inline-flex items-center rounded-lg bg-steel-medium/20 px-4 py-2 text-sm text-text-muted/80 ${className}`}>
        Affiliate link pending
      </span>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-text-inverse transition-colors hover:bg-primary-hover ${className}`}
    >
      {children ?? link.label}
    </a>
  );
}
