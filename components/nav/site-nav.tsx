"use client";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_AVATAR } from "@/lib/site";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="site-header reading-width">
      <Link href="/" className="site-wordmark" aria-label={`${SITE_NAME} 首页`}><Image src={SITE_AVATAR} alt="" width={36} height={36} className="site-avatar" priority /><span>{SITE_NAME}</span></Link>
      <nav aria-label="主导航" className="site-links">
        {[{ href: "/", label: "首页" }, { href: "/blog", label: "博客" }, { href: "/apps", label: "项目" }].map(({ href, label }) => (
          <Link key={href} href={href} aria-current={(href === "/" ? pathname === "/" : pathname.startsWith(href)) ? "page" : undefined}>{label}</Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
