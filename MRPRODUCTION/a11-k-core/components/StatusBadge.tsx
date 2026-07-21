import type { FeatureStatus, Visibility } from "@/lib/types";

export function StatusBadge({
  status,
}: {
  status: FeatureStatus | Visibility | string;
}) {
  const cls =
    status === "active"
      ? "badge badge-active"
      : status === "placeholder"
        ? "badge badge-placeholder"
        : status === "blocked"
          ? "badge badge-blocked"
          : status === "stealth"
            ? "badge badge-stealth"
            : "badge badge-unknown";
  return <span className={cls}>{status}</span>;
}
