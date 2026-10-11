import { SiteShell } from "@/components/layout/site-shell";
import { ProjectList } from "@/components/app/project-list";
import { getAllApps } from "@/lib/apps";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "项目", description: "自己做的一些应用，以及它们的文档与更新记录。", path: "/apps" });
export default function AppsPage() {
  return <SiteShell><div className="reading-width index-page"><header className="page-heading"><h1>项目</h1><p>把日常里的小想法，做成可以使用的东西。</p></header><section><h2 className="section-label">应用与开发工具</h2><ProjectList apps={getAllApps()} /></section></div></SiteShell>;
}
