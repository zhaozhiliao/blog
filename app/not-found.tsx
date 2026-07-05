export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] w-full max-w-3xl flex-col justify-center px-6 py-16">
      <p className="page-kicker mb-4">404</p>
      <h1 className="page-title">没有找到这个页面。</h1>
      <p className="page-lede mt-6">
        这个地址可能已经移动，或者只属于某个 App 子站。你可以回到工具台，或查看通用文档。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/tools"
          className="inline-flex h-9 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
        >
          回到工具
        </a>
        <a
          href="/docs"
          className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-bg-card px-4 text-sm font-medium transition-all hover:bg-surface-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
        >
          查看文档
        </a>
      </div>
    </section>
  );
}
