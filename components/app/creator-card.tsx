import Link from "next/link";
import Image from "next/image";
import { AppLogo } from "@/components/app/app-logo";
import { getAllApps } from "@/lib/apps";
import { appBaseUrl } from "@/lib/app-url";
import { SITE_NAME, SITE_AVATAR, SOCIAL_LINKS } from "@/lib/site";

export function CreatorCard() {
  const social = SOCIAL_LINKS.find(({ label }) => label === "X");
  return (
    <aside className="creator-card" aria-label="作者与作品">
      <Link href="/" className="creator-avatar" aria-label={`${SITE_NAME} 首页`}><Image src={SITE_AVATAR} alt="" width={56} height={56} /></Link>
      <div className="creator-body">
        <Link href="/" className="creator-name">{SITE_NAME}</Link>
        <p>关注产品、设计和开发，做一些日常用得上的小应用。</p>
        <nav className="creator-projects" aria-label="作者的作品">
          {getAllApps().map((app) => (
            <Link key={app.slug} href={appBaseUrl(app.slug)}><AppLogo app={app} size="sm" /><span>{app.name}</span></Link>
          ))}
        </nav>
      </div>
      {social && <a className="creator-social" href={social.href} target="_blank" rel="noopener noreferrer" aria-label="在 X 上关注作者">𝕏</a>}
    </aside>
  );
}
