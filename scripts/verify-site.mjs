import assert from "node:assert/strict";
import http from "node:http";
import https from "node:https";

function legacyRequest(url, host) {
  return new Promise((resolve, reject) => {
    const transport = url.startsWith("https:") ? https : http;
    transport.get(url, { headers: { host } }, (response) => {
      response.resume();
      resolve({ status: response.statusCode, location: response.headers.location });
    }).on("error", reject);
  });
}

const origin = process.env.SITE_TEST_ORIGIN ?? "http://localhost:3001";
const decode = (value) => value.replaceAll("&amp;", "&");
const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
assert.ok(urls.length > 10, "App documentation must be in the sitemap");
assert.equal(new Set(urls).size, urls.length, "Sitemap URLs must be unique");
const canonicalOrigin = new URL(urls[0]).origin;
const links = new Set();
for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, canonicalOrigin, "All content must use one origin");
  assert.ok(!/^\/(tools|ai-lab|docs)(\/|$)/.test(parsed.pathname));
  const response = await fetch(`${origin}${parsed.pathname}`);
  assert.equal(response.status, 200, parsed.pathname);
  const html = await response.text();
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Canonical mismatch: ${parsed.pathname}`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `One h1: ${parsed.pathname}`);
  assert.ok(html.includes('id="main-content"'), `Missing main landmark: ${parsed.pathname}`);
  for (const match of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const href = decode(match[1]);
    if (href.startsWith("/")) links.add(href.split("#")[0]);
    assert.ok(!/^https?:\/\/(watermind|echokit)\./.test(href), `Legacy App link: ${href}`);
    assert.ok(!href.includes("seo_keywords") && !href.includes("/Users/"), `Old/private source path: ${href}`);
  }
}
for (const path of links) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, `Broken internal link: ${path}`);
}
for (const path of ["/tools", "/tools/keywords", "/tools/settings", "/settings", "/ai-lab", "/ai-lab/prompts", "/docs", "/docs/privacy", "/api/ai/chat", "/api/config", "/apps/unknown", "/apps/watermind/docs/unknown"]) {
  assert.equal((await fetch(`${origin}${path}`)).status, 404, `Removed/unknown route: ${path}`);
}
for (const app of ["watermind", "echokit"]) {
  for (const [path, destination] of [["/?ref=migration", `/apps/${app}?ref=migration`], ["/docs/privacy", `/apps/${app}/docs/privacy`], ["/changelog", `/apps/${app}/changelog`], [`/apps/${app}/icon.png`, `/apps/${app}/icon.png`]]) {
    const response = await legacyRequest(`${origin}${path}`, `${app}.${new URL(canonicalOrigin).host}`);
    assert.equal(response.status, 308, `Legacy redirect: ${app}${path}`);
    assert.equal(response.location, `${canonicalOrigin}${destination}`);
  }
  const localRedirect = await legacyRequest(`${origin}/docs/privacy`, `${app}.localhost:${new URL(origin).port}`);
  assert.equal(localRedirect.status, 308);
  assert.equal(new URL(localRedirect.location, origin).href, `http://127.0.0.1:${new URL(origin).port}/apps/${app}/docs/privacy`);
  const markdown = await fetch(`${origin}/apps/${app}/docs/privacy.mdx`);
  assert.equal(markdown.status, 200);
  assert.match(markdown.headers.get("content-type"), /text\//);
  assert.ok((await markdown.text()).length > 100);
}
const robots = await (await fetch(`${origin}/robots.txt`)).text();
assert.ok(robots.includes(`${canonicalOrigin}/sitemap.xml`));
console.log(`Verified ${urls.length} sitemap pages, ${links.size} internal links, removed routes, Markdown export, and legacy redirects.`);
