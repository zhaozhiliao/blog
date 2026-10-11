"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function DocsPageActions({ markdownUrl }: { markdownUrl: string }) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
  async function copy() {
    setStatus("copying");
    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) throw new Error("Markdown unavailable");
      await navigator.clipboard.writeText(await response.text());
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  return <div className="doc-actions" aria-label="复制文档">
    <button type="button" onClick={copy} disabled={status === "copying"}>{status === "copied" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}{status === "copying" ? "正在复制…" : status === "copied" ? "已复制" : "复制 Markdown"}</button>
    <span role="status" className={status === "copied" ? "sr-only" : undefined}>{status === "copied" ? "已复制" : status === "error" ? "复制失败，请重试。" : ""}</span>
  </div>;
}
