/** Public App pages live under the same origin as the blog. */
export function appBaseUrl(slug: string): string {
  return `/apps/${slug}`;
}
