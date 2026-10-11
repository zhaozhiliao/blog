import { notFound } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { getAllApps, getApp } from "@/lib/apps";
import { appHasChangelog } from "@/lib/content";
import { appHasDocs } from "@/lib/app-docs-source";

export function generateStaticParams() {
  return getAllApps().map((a) => ({ app: a.slug }));
}


/** Shared App section within the main site. */
export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ app: string }>;
}) {
  const { app: appSlug } = await params;
  const app = getApp(appSlug);
  if (!app) notFound();

  return (
    <AppShell app={app} hasDocs={appHasDocs(app.slug)} hasChangelog={appHasChangelog(app.slug)}>
      {children}
    </AppShell>
  );
}
