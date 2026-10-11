"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

/** Light/dark switch. Renders a stable placeholder until mounted to avoid hydration mismatch. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="切换主题"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-all hover:border-border-strong hover:text-brand active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
    >
      {mounted ? (
        isDark ? <Sun size={15} /> : <Moon size={15} />
      ) : (
        <span className="h-[15px] w-[15px]" />
      )}
    </button>
  );
}
