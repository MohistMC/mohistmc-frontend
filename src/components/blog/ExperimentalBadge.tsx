import Link from "next/link";
import Badge from "./Badge";

/**
 * A custom variant of the Badge for experimental features
 */
export function ExperimentalBadge({
  isLink = true,
  children,
}: {
  isLink?: boolean;
  children?: string;
}) {
  const badge = <Badge>{children || "Experimental"}</Badge>;
  if (isLink) {
    return (
      <Link href="/docs/faq#what-does-experimental-mean">{badge}</Link>
    );
  }
  return badge;
}
