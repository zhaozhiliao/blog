"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/** Light/dark switch. Renders a stable placeholder until mounted to avoid hydration mismatch. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="切换主题"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg-card text-fg-muted transition-all hover:border-border-strong hover:text-brand active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
    >
      {mounted ? (
        isDark ? <Sun size={15} /> : <Moon size={15} />
      ) : (
        <span className="h-[15px] w-[15px]" />
      )}
    </button>
  );
}
