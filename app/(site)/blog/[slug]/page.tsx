import { HoverRail } from "@/components/docs/hover-rail";
import { Toc } from "@/components/docs/toc";
import { DocsNavigation } from "@/components/docs/docs-navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleHeader } from "@/components/mdx/article-header";
import { MDXContent } from "@/components/mdx/mdx-content";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    date: post.date,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;
  const crumbs = [{ label: "首页", href: "/" }, { label: "博客", href: "/blog" }, { label: post.title }] as const;

  return (
    <div className="reading-width index-page">
      <JsonLd data={breadcrumbJsonLd([...crumbs], path)} />
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.description,
          path,
          date: post.date,
        })}
      />
      <div className="docs-workspace blog-workspace">
      <div className="app-doc-content">
        <div className="docs-mobile-controls"><DocsNavigation><Toc items={post.toc} /></DocsNavigation></div>
      <article>
        <ArticleHeader title={post.title} description={post.description} date={post.date} markdownUrl={`/api/doc-markdown/blog/${slug}`} />
        <MDXContent body={post.body} />
        <footer className="post-footer">
          {post.tags?.length ? <div className="post-tags" aria-label="文章标签">
            {post.tags.map((tag) => <span key={tag}><span className="post-tag-marker" aria-hidden="true">#</span>{tag}</span>)}
          </div> : null}
          <Breadcrumbs items={[...crumbs]} />
        </footer>
      </article>
      </div>
      <aside className="docs-right-rail" aria-label="本文阅读辅助">
        <HoverRail label="展开本页目录"><Toc items={post.toc} sidebar /></HoverRail>
      </aside>
      </div>
    </div>
  );
}
