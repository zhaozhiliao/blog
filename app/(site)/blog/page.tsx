import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { BlogList } from "@/components/blog/blog-list";
import { getBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "博客",
  description: "随笔、记录与想法。",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  return (
    <PageLayout crumbs={[{ label: "首页", href: "/" }, { label: "博客" }]} pagePath="/blog">
      <header className="mb-12">
        <p className="page-kicker mb-4">Writing</p>
        <h1 className="page-title max-w-4xl">博客</h1>
        <p className="page-lede mt-6">随笔、记录与想法。</p>
      </header>
      <BlogList posts={posts} base="/blog" />
    </PageLayout>
  );
}
