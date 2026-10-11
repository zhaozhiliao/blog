"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** A compact outline: each line is a real navigation item, not a menu icon. */
export function HoverRail({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rail = root.current;
    const aside = rail?.parentElement;
    const heading = rail?.closest(".docs-workspace")?.querySelector(".article-heading");
    const outline = rail?.querySelector<HTMLElement>(".rail-outline");
    if (!aside || !heading || !outline) return;
    let frame = 0;
    const viewport = window.matchMedia("(min-width: 1180px)");
    const position = () => {
      // Center when space permits; never rise above the visible article introduction.
      const safeTop = Math.max(24, heading.getBoundingClientRect().bottom + 16);
      const available = Math.max(0, Math.min(420, window.innerHeight - safeTop - 24));
      outline.style.maxHeight = `${available}px`;
      const height = outline.getBoundingClientRect().height;
      aside.style.setProperty("--rail-top", `${Math.max(safeTop, (window.innerHeight - height) / 2)}px`);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(position); };
    const observer = new ResizeObserver(schedule);
    const stop = () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    const syncViewport = () => {
      stop();
      if (!viewport.matches) return;
      observer.observe(heading);
      observer.observe(outline);
      position();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    };
    syncViewport();
    viewport.addEventListener("change", syncViewport);
    return () => { stop(); viewport.removeEventListener("change", syncViewport); };
  }, []);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div ref={root} className="hover-rail" data-open={open} aria-label={label}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setOpen(false); }}
      onFocus={() => setOpen(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
        }
      }}>
      <div className="rail-outline">{children}</div>
    </div>
  );
}
