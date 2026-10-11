import { ArticleMeta } from "@/components/mdx/article-meta";

export function ArticleHeader({
  title,
  description,
  date,
  updated,
  markdownUrl,
}: {
  title: string;
  description?: string;
  date?: string | Date;
  updated?: boolean;
  markdownUrl?: string;
}) {
  return (
    <header className="article-heading">
      <h1>{title}</h1>
      {description && <p className="article-description">{description}</p>}
      <ArticleMeta date={date} updated={updated} markdownUrl={markdownUrl} />
    </header>
  );
}
