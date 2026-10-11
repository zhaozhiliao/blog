import { NextResponse, type NextRequest } from "next/server";
import { getAllApps } from "@/lib/apps";
import { SITE_ORIGIN } from "@/lib/site";

/** Preserve old App URLs while consolidating indexing on the main site. */
export function proxy(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase().split(":")[0];
  const canonical = new URL(SITE_ORIGIN);
  const roots = new Set([
    canonical.hostname,
    ...(process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "").split(",").map((root) => root.trim().split(":")[0]).filter(Boolean),
    "localhost",
  ]);
  const app = getAllApps().find((app) => [...roots].some((root) => host === `${app.slug}.${root}`));
  if (app) {
    const local = host.endsWith(".localhost");
    const url = new URL(local ? `http://127.0.0.1:${req.nextUrl.port || "3001"}` : SITE_ORIGIN);
    const path = req.nextUrl.pathname;
    const base = `/apps/${app.slug}`;
    // Static assets keep their root paths; content receives the App prefix.
    const asset = path.startsWith("/_next/") || /\.(?:png|jpe?g|webp|svg|ico|css|js|woff2?)$/i.test(path);
    url.pathname = asset || path === base || path.startsWith(`${base}/`) ? path : `${base}${path === "/" ? "" : path}`;
    url.search = req.nextUrl.search;
    return NextResponse.redirect(url, 308);
  }
  const path = req.nextUrl.pathname;
  if (/^\/apps\/[^/]+\/docs(?:\/.*)?\.mdx$/.test(path)) {
    const url = req.nextUrl.clone();
    url.pathname = `/api/doc-markdown${path.slice(0, -4)}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next/static|_next/image|api/).*)"] };
