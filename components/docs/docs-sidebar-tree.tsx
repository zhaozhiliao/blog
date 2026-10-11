"use client";

import Link from "next/link";
import { ChevronDown, BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


export type SidebarTreeNode = {
  type: string;
  name?: React.ReactNode;
  url?: string;
  children?: SidebarTreeNode[];
};

function NodeList({ nodes, pathname }: { nodes: SidebarTreeNode[]; pathname: string }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {nodes.map((node, i) => (
        <SidebarNode key={i} node={node} pathname={pathname} />
      ))}
    </ul>
  );
}

function SidebarNode({ node, pathname }: { node: SidebarTreeNode; pathname: string }) {
  if (node.type === "separator") {
    return (
      <li className="docs-group mt-4 first:mt-0">
        <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-widest text-fg-subtle">
          {node.name}
        </p>
      </li>
    );
  }

  if (node.type === "folder" && node.children?.length) {
    return (
      <li className="docs-group">
        <p className="mb-1 px-3 text-xs font-semibold text-fg-muted">{node.name}</p>
        <NodeList nodes={node.children} pathname={pathname} />
      </li>
    );
  }

  if (node.type === "page" && node.url) {
    const active = pathname === node.url;
    return (
      <li>
        <Link
          href={node.url}
          aria-current={active ? "page" : undefined}
          className={cn(
            "block rounded-md px-3 py-1.5 text-sm transition-colors",
            active
              ? "bg-brand-soft font-medium text-brand"
              : "text-fg-muted hover:bg-bg-subtle hover:text-fg"
          )}
        >
          <span className="rail-link-label">{node.name}</span>
        </Link>
      </li>
    );
  }

  return null;
}

/** Fumadocs page-tree sidebar (groups, folders, separators). */
export function DocsSidebarTree({ tree, title = "文档导航", sidebar = false }: { tree: SidebarTreeNode[]; title?: string; sidebar?: boolean }) {
  const pathname = usePathname();

  if (sidebar) return (
    <nav aria-label="文档导航" className="docs-tree">
      <p className="docs-rail-title">文档</p>
      <NodeList nodes={tree} pathname={pathname} />
    </nav>
  );

  return (
    <details className="docs-directory" name="mobile-doc-navigation">
      <summary><BookOpen size={15} aria-hidden="true" /><span>{title}</span><ChevronDown size={14} className="disclosure-chevron" aria-hidden="true" /></summary>
      <div className="docs-tool-panel" onClick={(event) => {
        if ((event.target as HTMLElement).closest("a[href]")) event.currentTarget.closest("details")?.removeAttribute("open");
      }}><NodeList nodes={tree} pathname={pathname} /></div>
    </details>
  );
}
