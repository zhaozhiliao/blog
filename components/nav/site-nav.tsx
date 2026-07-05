"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FlaskConical, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/docs", label: "Docs" },
  { href: "/tools", label: "Tools" },
  { href: "/apps", label: "Apps" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 px-3 py-3">
      <nav
        className="mx-auto flex h-12 items-center gap-5 rounded-xl border border-border/80 bg-bg/85 px-3 shadow-sm backdrop-blur-xl"
        style={{ maxWidth: "calc(var(--page-max) - 24px)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-1 font-semibold tracking-tight transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-[13px] font-bold text-white shadow-sm">W</span>
          <span className="text-sm">wikipie</span>
        </Link>

        {/* Desktop links */}
        <div className="ml-2 hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25",
                isActive(l.href)
                  ? "bg-brand-soft text-brand"
                  : "text-fg-muted hover:bg-bg-inset hover:text-fg"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/ai-lab"
            aria-label="AI Lab"
            className={cn(
              "hidden h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg-card text-fg-muted transition-all hover:border-border-strong hover:text-brand active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 sm:inline-flex",
              isActive("/ai-lab") && "border-brand/30 bg-brand-soft text-brand"
            )}
          >
            <FlaskConical size={15} aria-hidden="true" />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label="菜单"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg-card text-fg-muted transition-all hover:border-border-strong hover:text-fg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 rounded-xl border border-border bg-bg/95 p-2 shadow-md backdrop-blur-xl md:hidden" style={{ maxWidth: "calc(var(--page-max) - 24px)" }}>
          {[...LINKS, { href: "/ai-lab", label: "AI Lab" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25",
                isActive(l.href) ? "bg-brand-soft text-brand" : "text-fg-muted hover:bg-bg-inset hover:text-fg"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
