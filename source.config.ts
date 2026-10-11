import { defineDocs, defineCollections, defineConfig, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

/* Shared frontmatter for blog-style entries (personal + app). */
const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().or(z.date()).optional(),
  tags: z.array(z.string()).optional(),
});

/* App changelog entry — one MDX file per version. */
const changelogSchema = z.object({
  version: z.string(),
  date: z.string().or(z.date()),
  title: z.string(),
  description: z.string().optional(),
});

/* Personal blog */
export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: blogSchema,
  postprocess: { includeProcessedMarkdown: true },
});

/* ── App content — docs + changelog are parallel sections per App, filtered by
   app slug in lib/content.ts. Relative paths look like
   `app1/docs/getting-started.mdx` and `app1/changelog/v1.8.0.mdx`. ── */
/* App docs — one defineDocs per App (Fumadocs page tree + meta.json grouping).
   Add a matching export when registering a new App with docs. */
export const watermindDocs = defineDocs({
  dir: "content/apps/watermind/docs",
  docs: {
    schema: frontmatterSchema.extend({ updated: z.string().or(z.date()).optional() }),
    postprocess: { includeProcessedMarkdown: true },
  },
});

export const echokitDocs = defineDocs({
  dir: "content/apps/echokit/docs",
  docs: {
    schema: frontmatterSchema.extend({ updated: z.string().or(z.date()).optional() }),
    postprocess: { includeProcessedMarkdown: true },
  },
});

export const appChangelog = defineCollections({
  type: "doc",
  dir: "content/apps",
  files: ["*/changelog/*.mdx"],
  schema: changelogSchema,
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
});
