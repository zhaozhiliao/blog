import Link from "next/link";
import { AppLogo } from "@/components/app/app-logo";
import { appBaseUrl } from "@/lib/app-url";
import { getAppChangelog } from "@/lib/content";
import type { AppConfig } from "@/lib/apps";

export function ProjectList({ apps }: { apps: AppConfig[] }) {
  return (
    <ul className="project-list">
      {apps.map((app) => {
        const version = getAppChangelog(app.slug)[0]?.version;
        return (
          <li key={app.slug}>
            <Link href={appBaseUrl(app.slug)} className="project-link">
              <AppLogo app={app} size="lg" />
              <div className="min-w-0 flex-1">
                <h3>{app.name}<span aria-hidden="true">↗</span></h3>
                <p>{app.tagline}</p>
              </div>
              <div className="project-meta">
                {version && <span className="project-version">{version}</span>}
                <span className="project-platform">{app.platform}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
