import { AppSiteNav } from "@/components/app/app-site-nav";
import type { AppConfig } from "@/lib/apps";

export function AppShell({
  app,
  hasDocs,
  hasChangelog,
  children,
}: {
  app: AppConfig;
  hasDocs: boolean;
  hasChangelog: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="reading-width app-page flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        跳到主要内容
      </a>
      <header>
        <AppSiteNav app={app} hasDocs={hasDocs} hasChangelog={hasChangelog} />
      </header>
      <main id="main-content" className="flex-1">{children}</main>
    </div>
  );
}
