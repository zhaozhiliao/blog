import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { BlogMeta } from "@/lib/content";
export function BlogCard({ post }: { post: BlogMeta }) {
  return <Link href={`/blog/${post.slug}`} className="writing-link">
    {post.date && <time dateTime={new Date(post.date).toISOString()}>{formatDate(post.date)}</time>}
    <div><h3>{post.title}</h3>{post.description && <p>{post.description}</p>}</div>
  </Link>;
}
