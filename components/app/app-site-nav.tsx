"use client";

import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AppLogo } from "@/components/app/app-logo";
import { DownloadLink } from "@/components/app/download-link";
import { appBaseUrl } from "@/lib/app-url";
import type { AppConfig } from "@/lib/apps";

export function AppSiteNav({ app, hasDocs, hasChangelog }: { app: AppConfig; hasDocs: boolean; hasChangelog: boolean }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const base = appBaseUrl(app.slug);
  const tabs = [...(hasDocs ? [{ href: `${base}/docs`, label: "文档" }] : []), ...(hasChangelog ? [{ href: `${base}/changelog`, label: "更新日志" }] : [])];

  useEffect(() => {
    const close = () => { if (menu.current) menu.current.open = false; };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) close();
    };
    const viewport = window.matchMedia("(max-width: 520px)");
    document.addEventListener("pointerdown", outside);
    viewport.addEventListener("change", close);
    return () => {
      document.removeEventListener("pointerdown", outside);
      viewport.removeEventListener("change", close);
    };
  }, []);

  const links = tabs.map((tab) => (
    <Link key={tab.href} href={tab.href} aria-current={pathname.startsWith(tab.href) ? "page" : undefined}>
      {tab.label}
    </Link>
  ));

  return <nav aria-label={`${app.name} 导航`} className="app-navigation">
    <Link href={base} className="app-identity"><AppLogo app={app} size="md" /><span>{app.name}</span></Link>
    <div className="app-tabs">{links}</div>
    <div className="app-nav-actions">
      {app.external?.download && <DownloadLink href={app.external.download} />}
      <ThemeToggle />
      <details ref={menu} className="app-mobile-menu" onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}>
        <summary aria-label="项目菜单">
          <Menu className="menu-open-icon" size={19} strokeWidth={1.5} aria-hidden="true" />
          <X className="menu-close-icon" size={19} strokeWidth={1.5} aria-hidden="true" />
        </summary>
        <div className="app-mobile-panel" onClick={(event) => {
          if ((event.target as HTMLElement).closest("a[href]") && menu.current) menu.current.open = false;
        }}>
          <div className="app-mobile-links">{links}</div>
          {app.external?.download && <div className="app-mobile-download"><DownloadLink href={app.external.download} /></div>}
        </div>
      </details>
    </div>
  </nav>;
}
