# Blog / Ethan

A Chinese personal blog and App showcase in one Next.js App Router project.
Repository: `zhaozhiliao/blog`. All public content lives on the same origin.

## Routes

- `/`: personal introduction, projects, recent posts.
- `/blog` and `/blog/[slug]`: writing.
- `/apps`: project list, ordered by the App registry; versions come from the latest changelog.
- `/friends`: friend links, accessible from the footer.
- `/apps/[app]`: application introduction.
- `/apps/[app]/docs/[[...slug]]`: application documentation.
- `/apps/[app]/changelog`: application updates, parallel to documentation.
- `/og`, `/robots.txt`, `/sitemap.xml`: SEO endpoints.
- `/api/doc-markdown/...`: App documentation Markdown export.

Tools, AI Lab, API-key settings, and personal documentation have been removed.
Do not reintroduce subdomain sites or per-App themes/layouts.
Legacy App subdomains permanently redirect to their main-site paths.

## Stack and structure

Next.js 16, React 19, TypeScript strict, Tailwind v4, Fumadocs MDX, Geist fonts,
next-themes, lucide-react. Keep the existing versions in package.json.
`app/` contains routes and globals.css. Other code belongs in root `components/` and `lib/`.
Use `@/` imports from the repository root. No `app/components` or `app/lib`.
Next route params are promises and must be awaited. Keep content pages statically generated.

## Content

- Blog MDX: `content/blog`.
- App registry: `content/apps/apps.config.ts`, importing each App's `app.config.ts`.
- App docs: `content/apps/<slug>/docs`, ordered/grouped by `meta.json`.
- Changelog: `content/apps/<slug>/changelog`, one MDX per version.
- All App landing pages use `components/app/app-landing.tsx`; only content varies.
- To add App docs, register its `defineDocs` in `source.config.ts` and loader in
  `lib/app-docs-source.ts`. Route components do not need changes.
- Generated `.source/` is gitignored. Regenerate with `npx fumadocs-mdx` if needed.
- App links must include `/apps/<slug>`; never use naked `/docs` or `/changelog`.

## Design

Use one quiet editorial design: narrow reading column, generous whitespace, plain text lists,
real product screenshots, subtle rules, and monochrome actions. Inspiration: fehey.com,
herman.bearblog.dev/projects, minshot.fehey.com/zh.
All colors are semantic tokens in `app/globals.css`. No per-App brandColor, themes, grids,
or hardcoded component colors. Support light/dark and small screens with the same hierarchy.
SiteShell provides the global navigation and footer for the homepage, blog, and project list.
Individual App pages use AppShell with only their local navigation (docs and changelog); the App identity links to its introduction. Do not show a site or App footer on App pages. Keep legal/support documents accessible in the docs navigation. All sections still share one design.
Docs use collapsed outlines on wide screens, with one line per navigation entry and shorter lines for nested headings; hover or keyboard focus
reveals document navigation on the left and in-page contents on the right. Both rails center vertically when space allows, remain below the visible article introduction, and cap their internally scrollable height at 420px; blog posts reuse the contents rail. Dates and Markdown copying sit together below the article summary, or below the title when there is no summary; on narrow screens, use sticky document and current-page menus with 44px touch targets. Keep the reading
column narrow. The site identity is Ethan; the shared portrait is public/images/ethan.png.
UI copy is Simplified Chinese. Code identifiers and commit messages use English.

## Commands

- `npm run dev`: port 3001.
- `npm run lint`: ESLint.
- `npm run typecheck`: TypeScript.
- `npm run build`: production build.
- `npm run verify:site`: check a running site's routing, internal links, metadata, and migration.

Canonical origin comes from `NEXT_PUBLIC_SITE_URL` (default https://wikipie.com).
Deployment and legacy-host migration details are in DEPLOY.md.
Use Conventional Commits. Do not deploy unless requested.
