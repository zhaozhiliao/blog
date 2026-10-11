import Image from "next/image";
import { DownloadLink } from "@/components/app/download-link";
import { CreatorCard } from "@/components/app/creator-card";
import Link from "next/link";
import type { AppConfig, AppLanding as Landing } from "@/content/apps/app-types";
import { appBaseUrl } from "@/lib/app-url";
import { appHasDocs } from "@/lib/app-docs-source";

/** One editorial template for every App. Only content varies. */
export function AppLanding({ app, landing }: { app: AppConfig; landing: Landing }) {
  const screenshots = typeof landing.screenshot === "string" ? [landing.screenshot] : landing.screenshot ?? [];
  const download = landing.downloadCta?.href ?? app.external?.download;
  return <article className="app-story">
    <header className="app-story-heading"><h1>{landing.subhead ?? app.tagline ?? landing.headline ?? app.name}</h1></header>
    <div className="story-copy">{landing.intro?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    {screenshots.map((src, index) => <figure key={src} className="product-screenshot"><Image src={src} alt={`${app.name} 应用界面${screenshots.length > 1 ? ` ${index + 1}` : ""}`} width={1440} height={960} sizes="(max-width: 760px) 90vw, 672px" className="h-auto w-full" priority={index === 0} /></figure>)}
    {!!landing.features?.length && <section className="app-features"><h2>{landing.featuresTitle ?? "可以用它做什么"}</h2><dl>{landing.features.map((feature) => <div key={feature.title}><dt>{feature.title}</dt><dd>{feature.desc}</dd></div>)}</dl></section>}
    {landing.plans?.length ? (
      <section className="app-pricing">
        <h2>{landing.pricingTitle ?? "使用方式"}</h2>
        {landing.pricingSubtitle && <p>{landing.pricingSubtitle}</p>}
        <div className="plan-list">
          {landing.plans.map((plan) => (
            <div key={plan.name} className="plan-row">
              <div className="plan-heading">
                <h3>{plan.name}</h3>
                <p className="plan-status">{plan.price}</p>
              </div>
              <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    ) : null}
    <div className="app-download">{download && !landing.downloadCta?.disabled ? <DownloadLink href={download} label={landing.downloadCta?.label} /> : <p className="text-fg-muted">{landing.downloadCta?.label ?? "暂未开放下载"}</p>}{appHasDocs(app.slug) && <Link href={`${appBaseUrl(app.slug)}/docs`} className="text-link">阅读使用文档 →</Link>}</div>
    <CreatorCard />
  </article>;
}
