import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/site";

/** Build per-route metadata with canonical + OG/Twitter. `path` is relative
    (no domain — see ARCHITECTURE.md §0.6); metadataBase resolves it. */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  date,
}: {
  title: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  date?: string | Date;
}): Metadata {
  const ogImage = `/og?title=${encodeURIComponent(title)}${
    description ? `&subtitle=${encodeURIComponent(description)}` : ""
  }`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...(date ? { publishedTime: new Date(date).toISOString() } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
