import Link from "next/link";

export function A11KStamp({
  label = "Powered by A11-K",
  href = "https://a11-k.space",
  compact = false,
}: {
  label?: string;
  href?: string;
  compact?: boolean;
}) {
  return (
    <Link className={`a11k-stamp ${compact ? "a11k-stamp-compact" : ""}`} href={href}>
      <span className="a11k-stamp-mark" aria-hidden="true">
        A11
      </span>
      <span>{label}</span>
    </Link>
  );
}
