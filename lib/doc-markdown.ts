import { getBlogPost } from "@/lib/content";
import { getAppDocsSource } from "@/lib/app-docs-source";

/** Resolve a docs page from its public URL path (e.g. `/apps/watermind/docs/privacy`). */
function getDocPageByPath(docPath: string) {
  const appMatch = docPath.match(/^\/apps\/([^/]+)\/docs(?:\/(.*))?$/);
  if (appMatch) {
    const slugs = appMatch[2] ? appMatch[2].split("/") : [];
    return getAppDocsSource(appMatch[1])?.getPage(slugs);
  }
  return undefined;
}

export async function getDocPageMarkdown(docPath: string): Promise<string | undefined> {
  const blogMatch = docPath.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) return getBlogPost(blogMatch[1])?.getText?.("processed");
  const page = getDocPageByPath(docPath);
  if (!page?.data.getText) return undefined;
  return page.data.getText("processed");
}

/** Public `.mdx` URL for a docs page (served via proxy → `/api/doc-markdown`). */
export function docMarkdownUrl(pageUrl: string) {
  return `${pageUrl}.mdx`;
}
