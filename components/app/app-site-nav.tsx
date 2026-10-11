"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AppLogo } from "@/components/app/app-logo";
import { DownloadLink } from "@/components/app/download-link";
import { appBaseUrl } from "@/lib/app-url";
import type { AppConfig } from "@/lib/apps";
export function AppSiteNav({ app, hasDocs, hasChangelog }: { app: AppConfig; hasDocs: boolean; hasChangelog: boolean }) {
  const pathname = usePathname();
  const base = appBaseUrl(app.slug);
  const tabs = [...(hasDocs ? [{ href: `${base}/docs`, label: "文档" }] : []), ...(hasChangelog ? [{ href: `${base}/changelog`, label: "更新日志" }] : [])];
  return <nav aria-label={`${app.name} 导航`} className="app-navigation">
    <Link href={base} className="app-identity"><AppLogo app={app} size="md" /><span>{app.name}</span></Link>
    <div className="app-tabs">{tabs.map((tab) => <Link key={tab.href} href={tab.href} aria-current={pathname.startsWith(tab.href) ? "page" : undefined}>{tab.label}</Link>)}</div>
    <div className="app-nav-actions">
      {app.external?.download && <DownloadLink href={app.external.download} />}
      <ThemeToggle />
    </div>
  </nav>;
}
