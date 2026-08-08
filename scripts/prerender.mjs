#!/usr/bin/env node
/**
 * Bakes every route into a static HTML file so the site needs nothing but plain
 * shared hosting — no Node process, no VPS. `dist/` is uploaded over FTP as-is.
 *
 * Pipeline:
 *   1. vite build              → dist/ (client bundle + index.html template)
 *   2. vite build --ssr        → dist-ssr/ (Node-renderable copy of the app)
 *   3. this script             → dist/<route>.html for each route, plus 404 + sitemap
 *
 * Each generated file carries its own <title>, description, canonical, OG tags
 * and JSON-LD, so crawlers that don't execute JavaScript still see a real page.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SSR_DIST = join(ROOT, "dist-ssr");

const SEO_START = "<!--seo-start-->";
const SEO_END = "<!--seo-end-->";
const ROOT_DIV = '<div id="root"></div>';

const run = (args) =>
  execFileSync("npx", args, { cwd: ROOT, stdio: "inherit", env: process.env });

/** "/" → index.html, "/docs" → docs.html, "/controls/core" → controls/core.html */
const fileForRoute = (route) =>
  route === "/" ? "index.html" : `${route.replace(/^\/+/, "")}.html`;

const inject = (template, { head, body }) => {
  const start = template.indexOf(SEO_START);
  const end = template.indexOf(SEO_END);

  if (start === -1 || end === -1) {
    throw new Error(
      `index.html is missing the ${SEO_START} / ${SEO_END} markers — prerendering cannot place per-route meta tags.`
    );
  }
  if (!template.includes(ROOT_DIV)) {
    throw new Error(`index.html is missing ${ROOT_DIV} — nowhere to place the rendered app.`);
  }

  return template
    .slice(0, start + SEO_START.length)
    .concat("\n", head, "\n", template.slice(end))
    .replace(ROOT_DIV, `<div id="root">${body}</div>`);
};

const buildSitemap = (routes, seoFor, absoluteUrl) => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const entries = routes
    .map((route) => ({ route, seo: seoFor(route) }))
    .filter(({ seo }) => seo && seo.sitemap && !seo.noindex)
    .map(
      ({ route, seo }) =>
        `  <url>\n` +
        `    <loc>${absoluteUrl(route)}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${seo.sitemap.changefreq}</changefreq>\n` +
        `    <priority>${seo.sitemap.priority.toFixed(1)}</priority>\n` +
        `  </url>`
    );

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
};

console.log("→ building client bundle");
run(["vite", "build"]);

console.log("→ building server bundle");
run(["vite", "build", "--ssr", "src/entry-server.tsx", "--outDir", "dist-ssr"]);

const server = await import(pathToFileURL(join(SSR_DIST, "entry-server.js")).href);
const { render, buildHead, renderHeadToString, PRERENDER_ROUTES, ROUTE_SEO, NOT_FOUND_SEO, absoluteUrl } =
  server;

const template = readFileSync(join(DIST, "index.html"), "utf8");

console.log(`→ prerendering ${PRERENDER_ROUTES.length} routes`);
for (const route of PRERENDER_ROUTES) {
  const seo = ROUTE_SEO[route];
  const html = inject(template, {
    head: renderHeadToString(buildHead(seo)),
    body: render(route),
  });

  const target = join(DIST, fileForRoute(route));
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
  console.log(`   ${route.padEnd(24)} → dist/${fileForRoute(route)}`);
}

// Served by Apache's ErrorDocument, so it must be a real page with a real 404 status.
writeFileSync(
  join(DIST, "404.html"),
  inject(template, {
    head: renderHeadToString(buildHead(NOT_FOUND_SEO)),
    body: render("/404"),
  })
);
console.log("   404                      → dist/404.html");

writeFileSync(
  join(DIST, "sitemap.xml"),
  buildSitemap(PRERENDER_ROUTES, (r) => ROUTE_SEO[r], absoluteUrl)
);
console.log("   sitemap.xml              → dist/sitemap.xml");

rmSync(SSR_DIST, { recursive: true, force: true });
console.log("✓ prerender complete");
