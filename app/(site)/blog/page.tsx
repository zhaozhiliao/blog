import { BlogList } from "@/components/blog/blog-list";
import { getBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "博客", description: "产品、设计与开发中的思考和记录。", path: "/blog" });
export default function BlogIndexPage() {
  return <div className="reading-width index-page"><header className="page-heading"><h1>文字</h1><p>一些思考，一些实践，还有沿途的发现。</p></header><BlogList posts={getBlogPosts()} /></div>;
}
