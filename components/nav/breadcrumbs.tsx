import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  /** omit for the current (last) page */
  href?: string;
}

/** The article path sits below its tags in the same footer. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      className="flex flex-wrap items-center gap-1.5 text-xs text-fg-muted"
      aria-label="面包屑"
    >
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {c.href && !last ? (
              <Link href={c.href} className="transition-colors hover:text-fg hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current={last ? "page" : undefined}>{c.label}</span>
            )}
            {!last && <ChevronRight size={13} className="text-fg-subtle" aria-hidden="true" />}
          </span>
        );
      })}
    </nav>
  );
}
