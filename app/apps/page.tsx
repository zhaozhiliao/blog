import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { PageLayout } from "@/components/layout/page-layout";
import { AppCard } from "@/components/app/app-card";
import { getAllApps } from "@/lib/apps";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Apps",
  description: "我做的几个 App，及其文档与更新日志。",
  path: "/apps",
});

export default function AppsPage() {
  const apps = getAllApps();
  return (
    <SiteShell>
      <PageLayout crumbs={[{ label: "首页", href: "/" }, { label: "Apps" }]} pagePath="/apps">
        <header className="mb-12">
          <p className="page-kicker mb-4">Standalone products</p>
          <h1 className="page-title max-w-4xl">Apps</h1>
          <p className="page-lede mt-6">我做的几个 App，每个都是独立的站点。</p>
        </header>
        {apps.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((a) => (
              <AppCard key={a.slug} app={a} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-fg-muted">还没有上架的 App。</p>
        )}
      </PageLayout>
    </SiteShell>
  );
}
