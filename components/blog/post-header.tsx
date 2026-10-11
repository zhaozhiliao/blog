import { ArticleMeta } from "@/components/mdx/article-meta";

export function PostHeader({
  title,
  description,
  date,
  markdownUrl,
}: {
  title: string;
  description?: string;
  date?: string | Date;
  markdownUrl?: string;
}) {
  return (
    <header className="post-heading">
      <h1>{title}</h1>
      {description && <p className="post-description">{description}</p>}
      <ArticleMeta date={date} markdownUrl={markdownUrl} />

    </header>
  );
}
