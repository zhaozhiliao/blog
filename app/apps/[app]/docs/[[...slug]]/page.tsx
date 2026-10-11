import { DocsSidebarTree } from "@/components/docs/docs-sidebar-tree";
import { HoverRail } from "@/components/docs/hover-rail";
import { DocsNavigation } from "@/components/docs/docs-navigation";
import { Toc } from "@/components/docs/toc";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXContent } from "@/components/mdx/mdx-content";
import { getApp, getAllApps } from "@/lib/apps";
import { getAppDocsSource } from "@/lib/app-docs-source";
import { ArticleMeta } from "@/components/mdx/article-meta";
import { buildMetadata } from "@/lib/seo";
import { docMarkdownUrl } from "@/lib/doc-markdown";

export function generateStaticParams() {
  return getAllApps().flatMap((a) => {
    const source = getAppDocsSource(a.slug);
    if (!source) return [];
    return source.generateParams().map((p) => ({ app: a.slug, slug: p.slug }));
  });
}

export async function generateMetadata({ params }: { params: Promise<{ app: string; slug?: string[] }> }): Promise<Metadata> {
  const { app, slug } = await params;
  const source = getAppDocsSource(app);
  const page = source?.getPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: `${page.data.title} · ${getApp(app)?.name ?? app}`,
    description: page.data.description,
    path: page.url,
  });
}

export default async function AppDocPage({ params }: { params: Promise<{ app: string; slug?: string[] }> }) {
  const { app: appSlug, slug } = await params;
  const app = getApp(appSlug);
  const source = getAppDocsSource(appSlug);
  if (!app || !source) notFound();

  const page = source.getPage(slug);
  if (!page) notFound();

  const tree = source.pageTree.children as Parameters<typeof DocsSidebarTree>[0]["tree"];

  return (
    <div className="docs-workspace">
      <aside className="docs-left-rail">
        <HoverRail label="展开文档导航"><DocsSidebarTree tree={tree} sidebar /></HoverRail>
      </aside>
      <div className="app-doc-content">
        <div className="docs-mobile-controls">
          <DocsNavigation>
            <DocsSidebarTree tree={tree} />
            <Toc items={page.data.toc} />
          </DocsNavigation>
        </div>
        <article className="min-w-0">
          <header className="doc-heading">
            <h1>{page.data.title}</h1>
            {page.data.description && <p>{page.data.description}</p>}
            <ArticleMeta date={page.data.updated} updated markdownUrl={docMarkdownUrl(page.url)} />
          </header>
          <MDXContent body={page.data.body} />
        </article>
      </div>
      <aside className="docs-right-rail" aria-label="本文阅读辅助">
        <HoverRail label="展开本页目录">
        <Toc items={page.data.toc} sidebar />
        </HoverRail>
      </aside>
    </div>
  );
}
