import Link from "next/link";
export default function NotFound() {
  return <section className="reading-width py-24"><p className="text-sm text-fg-muted">404</p><h1 className="mt-4 text-2xl font-semibold">没有找到这个页面</h1><p className="mt-4 text-fg-muted">这个地址可能已移动或删除。回首页看看最近的文字和项目吧。</p><div className="mt-8 flex gap-6"><Link href="/" className="text-link">返回首页</Link><Link href="/apps" className="text-link">浏览项目</Link></div></section>;
}
