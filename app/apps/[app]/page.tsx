import { notFound } from "next/navigation";
import { AppLanding } from "@/components/app/app-landing";
import { getApp } from "@/lib/apps";
import { buildMetadata } from "@/lib/seo";
import { appBaseUrl } from "@/lib/app-url";
export async function generateMetadata({ params }: { params: Promise<{ app: string }> }) {
  const { app: slug } = await params;
  const app = getApp(slug);
  return app ? buildMetadata({ title: app.name, description: app.landing?.subhead ?? app.tagline, path: appBaseUrl(slug) }) : {};
}
export default async function AppHomePage({ params }: { params: Promise<{ app: string }> }) {
  const { app: slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  return <AppLanding app={app} landing={app.landing ?? { headline: app.name, subhead: app.tagline }} />;
}
