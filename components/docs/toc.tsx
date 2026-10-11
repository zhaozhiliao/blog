"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import type { TableOfContents } from "fumadocs-core/toc";

export function Toc({ items, sidebar = false }: { items: TableOfContents; sidebar?: boolean }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!items.length) return;
    let frame = 0;
    const headings = items.map((item) => ({ url: item.url, element: document.getElementById(decodeURIComponent(item.url.slice(1))) })).filter((item) => item.element);
    const viewport = window.matchMedia("(min-width: 1180px)");
    const update = () => {
      let current = headings[0]?.url ?? "";
      for (const heading of headings) {
        if (heading.element!.getBoundingClientRect().top <= 120) current = heading.url;
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = headings.at(-1)?.url ?? current;
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const syncViewport = () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      if (viewport.matches === sidebar) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
      }
    };
    syncViewport();
    viewport.addEventListener("change", syncViewport);
    return () => {
      window.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("change", syncViewport);
      cancelAnimationFrame(frame);
    };
  }, [items, sidebar]);
  const details = useRef<HTMLDetailsElement>(null);

  const links = items.length > 0 ? (
    <nav aria-label="本页目录">
      <ul className="toc-links">
        {items.map((item) => (
          <li key={item.url} data-depth={item.depth} className={item.depth > 2 ? "pl-3" : undefined}>
            <a href={item.url} aria-current={active === item.url ? "location" : undefined} onClick={() => { if (details.current) details.current.open = false; }}><span className="rail-link-label">{item.title}</span></a>
          </li>
        ))}
      </ul>
    </nav>
  ) : null;

  if (sidebar) return links ? <><p className="docs-rail-title">本文内容</p>{links}</> : null;
  if (!links) return null;
  return (
    <details ref={details} className="reading-toc" name="mobile-doc-navigation">
      <summary aria-label="本页目录"><List size={15} aria-hidden="true" /><span>本页目录</span><ChevronDown size={14} className="disclosure-chevron" aria-hidden="true" /></summary>
      <div className="reading-toc-links"><p className="docs-rail-title">本文内容</p>{links}</div>
    </details>
  );
}
