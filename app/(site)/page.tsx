import Link from "next/link";
import { ProjectList } from "@/components/app/project-list";
import { BlogList } from "@/components/blog/blog-list";
import { getAllApps } from "@/lib/apps";
import { getBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { webSiteJsonLd } from "@/lib/json-ld";
import { SOCIAL_LINKS } from "@/lib/site";

export const metadata = buildMetadata({ title: "记录与创造", description: "记录产品、设计与开发，也分享自己做的应用。", path: "/" });
export default function HomePage() {
  return (
    <div className="reading-width home-page">
      <JsonLd data={webSiteJsonLd("记录产品、设计与开发，也分享自己做的应用。")} />
      <header className="home-intro">
        <p className="intro-greeting">你好，欢迎来到我的小站。</p>
        <h1>记录想法，<br />也把想法做出来。</h1>
        <p className="intro-description">我关注产品、设计和开发。这里放着我的一些文字，<br className="hidden sm:block" />以及为日常生活做的小应用。</p>
        <nav aria-label="社交媒体" className="flex flex-wrap gap-x-6">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a key={label} className="text-link" href={href} target="_blank" rel="noopener noreferrer">
              {label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </header>
      <section className="home-section" aria-labelledby="writing-title">
        <div className="section-heading"><h2 id="writing-title">最近的文字</h2><Link href="/blog">全部文章 <span aria-hidden="true">↗</span></Link></div>
        <BlogList posts={getBlogPosts().slice(0, 5)} />
      </section>
      <section className="home-section" aria-labelledby="projects-title">
        <div className="section-heading"><h2 id="projects-title">正在做的项目</h2><Link href="/apps">全部项目 <span aria-hidden="true">↗</span></Link></div>
        <ProjectList apps={getAllApps()} />
      </section>
    </div>
  );
}
