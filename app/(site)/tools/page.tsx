import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, KeyRound } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { TOOLS, type ToolMeta } from "@/app/(site)/tools/registry";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "工具",
  description: "几个顺手的 SEO 工具：关键词探索、E-E-A-T 评估、Slug、Schema、UI 文案翻译。",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <PageLayout crumbs={[{ label: "首页", href: "/" }, { label: "工具" }]} pagePath="/tools">
      <header className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <div>
          <p className="page-kicker mb-4">Toolbench</p>
          <h1 className="page-title max-w-4xl">常用工具箱</h1>
          <p className="page-lede mt-6">
            {TOOLS.length} 个常用工具，希望也对你有用。
          </p>
        </div>
        <div className="interactive-card rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle">Credentials</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                密钥只在浏览器本地保存，不会上传到服务器。
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <KeyRound size={18} aria-hidden="true" />
            </span>
          </div>
          <Button variant="outline" render={<Link href="/tools/settings" />} className="mt-5 w-full justify-between">
            API 设置
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {TOOLS.map((t, index) => (
          <ToolCard key={t.slug} tool={t} index={index} />
        ))}
      </div>
    </PageLayout>
  );
}

const TOOL_CARD_LAYOUT = [
  "lg:col-span-3 lg:min-h-[18rem]",
  "lg:col-span-3 lg:min-h-[18rem]",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

function ToolCard({ tool, index }: { tool: ToolMeta; index: number }) {
  const Icon = tool.icon;
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "interactive-card group flex flex-col rounded-xl p-5 focus-visible:outline-none",
        TOOL_CARD_LAYOUT[index]
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-inset transition-colors group-hover:bg-brand-soft">
          <Icon size={18} className="text-fg-muted transition-colors group-hover:text-brand" />
        </span>
        <ArrowUpRight
          size={17}
          className="mt-1 text-fg-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
        />
      </div>
      <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-brand">{tool.name}</h3>
      <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-fg-subtle">{tool.nameEn}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-fg-muted">{tool.description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {tool.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-bg-inset px-2 py-1 text-[11px] font-medium text-fg-subtle">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
