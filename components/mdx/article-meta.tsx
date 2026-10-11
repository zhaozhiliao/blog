import { CalendarDays } from "lucide-react";
import { DocsPageActions } from "@/components/docs/docs-page-actions";
import { formatDate } from "@/lib/format";

export function ArticleMeta({ date, updated = false, markdownUrl }: {
  date?: string | Date;
  updated?: boolean;
  markdownUrl?: string;
}) {
  if (!date && !markdownUrl) return null;
  return <div className="article-meta">
    {date && <time dateTime={new Date(date).toISOString()}><CalendarDays size={13} strokeWidth={1.5} aria-hidden="true" />{updated ? "更新于 " : ""}{formatDate(date)}</time>}
    {markdownUrl && <DocsPageActions markdownUrl={markdownUrl} />}
  </div>;
}
