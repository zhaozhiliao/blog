import type { LucideIcon } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { type Crumb } from "@/components/nav/breadcrumbs";
import { toolIconBox, toolIconClass } from "@/components/tools/tool-panel";
import { cn } from "@/lib/utils";

interface ToolShellProps {
  title: string;
  nameEn: string;
  description: string;
  icon: LucideIcon;
  pagePath: string;
  /** Page width — `content` for reading-width forms, `page` for wide data tools. */
  width?: "page" | "content";
  /** Breadcrumb trail; defaults to 首页 › 工具 › <title>. */
  crumbs?: Crumb[];
  children: React.ReactNode;
}

/** Title block for a single tool. Global nav/footer come from the root layout. */
export default function ToolShell({
  title,
  nameEn,
  description,
  icon: Icon,
  pagePath,
  width = "page",
  crumbs,
  children,
}: ToolShellProps) {
  const trail: Crumb[] =
    crumbs ?? [{ label: "首页", href: "/" }, { label: "工具", href: "/tools" }, { label: title }];

  return (
    <PageLayout crumbs={trail} pagePath={pagePath} width={width}>
      <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <p className="page-kicker mb-4">Tool</p>
          <div className="mb-4 flex items-center gap-3">
          <div className={cn(toolIconBox, "h-11 w-11 rounded-xl")}>
            <Icon size={18} className={toolIconClass} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl">{title}</h1>
            <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle">{nameEn}</p>
          </div>
        </div>
          <p className="page-lede">{description}</p>
        </div>
        <div className="interactive-card hidden rounded-xl p-4 lg:block">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle">Session model</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            工具凭证从浏览器会话传入，适合一次性查询、批量处理和 AI 辅助生成。
          </p>
        </div>
      </div>

      {children}
    </PageLayout>
  );
}
