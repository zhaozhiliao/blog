"use client";

import { useEffect, useRef } from "react";

export function DocsNavigation({ children }: { children: React.ReactNode }) {
  const toolbar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !toolbar.current?.contains(event.target)) {
        toolbar.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((detail) => {
          detail.open = false;
        });
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <div ref={toolbar} className="docs-navigation" onKeyDown={(event) => {
      if (event.key !== "Escape") return;
      const open = event.currentTarget.querySelector<HTMLDetailsElement>("details[open]");
      if (open) {
        open.open = false;
        open.querySelector("summary")?.focus();
      }
    }}>
      {children}
    </div>
  );
}
