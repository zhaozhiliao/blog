import type { MetadataRoute } from "next";
import { getAllApps } from "@/lib/apps";
import { getBlogPosts, appHasChangelog } from "@/lib/content";
import { getAppDocsSource } from "@/lib/app-docs-source";
import { appBaseUrl } from "@/lib/app-url";
import { SITE_ORIGIN } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set(["/", "/blog", "/apps", "/friends"]);
  getBlogPosts().forEach((post) => paths.add(`/blog/${post.slug}`));
  for (const app of getAllApps()) {
    paths.add(appBaseUrl(app.slug));
    getAppDocsSource(app.slug)?.getPages().forEach((page) => paths.add(page.url));
    if (appHasChangelog(app.slug)) paths.add(`${appBaseUrl(app.slug)}/changelog`);
  }
  return [...paths].map((path) => ({ url: path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}` }));
}
