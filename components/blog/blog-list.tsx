import { BlogCard } from "@/components/blog/blog-card";
import type { BlogMeta } from "@/lib/content";
export function BlogList({ posts }: { posts: BlogMeta[] }) {
  if (!posts.length) return <p className="text-fg-muted">还没有文章。</p>;
  return <ul className="writing-list">{posts.map((post) => <li key={post.slug}><BlogCard post={post} /></li>)}</ul>;
}
