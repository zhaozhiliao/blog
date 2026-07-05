import Link from "next/link";
import { FooterLinkColumn, FooterShell } from "@/components/footer/footer-columns";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <FooterShell
      brand={
        <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight transition-opacity hover:opacity-80">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-[13px] font-bold text-white">
            W
          </span>
          <span className="text-sm">wikipie</span>
        </Link>
      }
      copyright={`© ${year} wikipie`}
      columns={
        <>
          <FooterLinkColumn
            title="站点"
            links={[
              { href: "/blog", label: "Blog" },
              { href: "/docs", label: "Docs" },
              { href: "/tools", label: "Tools" },
              { href: "/apps", label: "Apps" },
            ]}
          />
          <FooterLinkColumn
            title="工具"
            links={[
              { href: "/tools/settings", label: "API 设置" },
              { href: "/ai-lab", label: "AI Lab" },
            ]}
          />
          <FooterLinkColumn
            title="法律"
            links={[
              { href: "/docs/privacy", label: "隐私" },
              { href: "/docs/terms", label: "条款" },
            ]}
          />
        </>
      }
    />
  );
}
