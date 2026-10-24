#!/usr/bin/env node
/**
 * Bakes every route into a static HTML file so the site needs nothing but plain
 * shared hosting — no Node process, no VPS. `dist/` is uploaded over FTP as-is.
 *
 * Pipeline:
 *   1. vite build              → dist/ (client bundle + index.html template)
 *   2. vite build --ssr        → dist-ssr/ (Node-renderable copy of the app)
 *   3. this script             → dist/<route>.html for each route, plus 404, sitemap,
 *                                blog RSS feed and one Open Graph image per post
 *
 * Each generated file carries its own <title>, description, canonical, OG tags
 * and JSON-LD, so crawlers that don't execute JavaScript still see a real page.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
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

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const buildSitemap = (routes, seoFor, absoluteUrl) => {
  // lastmod comes from each route's `updated` date, never from the build date:
  // a lastmod that changes on every deploy teaches search engines to ignore it.
  const entries = routes
    .map((route) => ({ route, seo: seoFor(route) }))
    .filter(({ seo }) => seo && seo.sitemap && !seo.noindex)
    .map(
      ({ route, seo }) =>
        `  <url>\n` +
        `    <loc>${absoluteUrl(route)}</loc>\n` +
        (seo.updated ? `    <lastmod>${seo.updated}</lastmod>\n` : "") +
        `    <changefreq>${seo.sitemap.changefreq}</changefreq>\n` +
        `    <priority>${seo.sitemap.priority.toFixed(1)}</priority>\n` +
        `  </url>`
    );

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
};

const buildRss = (posts, absoluteUrl) => {
  const items = posts.map(
    (post) =>
      `    <item>\n` +
      `      <title>${escapeXml(post.title)}</title>\n` +
      `      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>\n` +
      `      <guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}`)}</guid>\n` +
      `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>\n` +
      `      <description>${escapeXml(post.description)}</description>\n` +
      post.tags.map((t) => `      <category>${escapeXml(t)}</category>\n`).join("") +
      `    </item>`
  );
  const lastBuild = posts[0] ? new Date(`${posts[0].updated ?? posts[0].date}T00:00:00Z`).toUTCString() : "";

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>Plumix blog</title>\n` +
    `    <link>${absoluteUrl("/blog")}</link>\n` +
    `    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />\n` +
    `    <description>Releases, porting guides and deep dives into Flutter's architecture in C#.</description>\n` +
    `    <language>en</language>\n` +
    (lastBuild ? `    <lastBuildDate>${lastBuild}</lastBuildDate>\n` : "") +
    `${items.join("\n")}\n` +
    `  </channel>\n` +
    `</rss>\n`
  );
};

const fontFile = (pkg, file) => readFileSync(join(ROOT, "node_modules", "@fontsource", pkg, "files", file));
const OG_FONTS = [
  { name: "Inter", data: fontFile("inter", "inter-latin-400-normal.woff"), weight: 400, style: "normal" },
  { name: "Inter", data: fontFile("inter", "inter-latin-700-normal.woff"), weight: 700, style: "normal" },
  {
    name: "JetBrains Mono",
    data: fontFile("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff"),
    weight: 500,
    style: "normal",
  },
];

/** satori takes React-element-shaped objects; plain objects keep this script JSX-free. */
const el = (type, style, children) => ({ type, props: { style, children } });

/** 1200×630 card in the site palette: post title, tags and the site name. */
const renderOgImage = async (post) => {
  const logo = `data:image/png;base64,${readFileSync(join(ROOT, "public", "logo-180.png")).toString("base64")}`;
  const svg = await satori(
    el(
      "div",
      {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: "#0c0e16",
        backgroundImage: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(110, 40, 190, 0.45), transparent 70%)",
        color: "#e8e9f0",
        fontFamily: "Inter",
      },
      [
        el(
          "div",
          { display: "flex", fontFamily: "JetBrains Mono", fontSize: 26, color: "#c58bff", letterSpacing: 2 },
          `BLOG · ${post.tags.join(" · ").toUpperCase()}`
        ),
        el(
          "div",
          { display: "flex", fontSize: post.title.length > 60 ? 60 : 68, fontWeight: 700, lineHeight: 1.12 },
          post.title
        ),
        el("div", { display: "flex", alignItems: "center", gap: 20 }, [
          { type: "img", props: { src: logo, width: 64, height: 64, style: { borderRadius: 14 } } },
          el("div", { display: "flex", fontSize: 34, fontWeight: 700 }, "Plumix"),
          el(
            "div",
            { display: "flex", fontSize: 26, color: "#8e91a8", marginLeft: 12 },
            "Flutter's UI framework, written in C#"
          ),
        ]),
      ]
    ),
    { width: 1200, height: 630, fonts: OG_FONTS }
  );
  return new Resvg(svg).render().asPng();
};

console.log("→ building client bundle");
run(["vite", "build"]);

console.log("→ building server bundle");
run(["vite", "build", "--ssr", "src/entry-server.tsx", "--outDir", "dist-ssr"]);

const server = await import(pathToFileURL(join(SSR_DIST, "entry-server.js")).href);
const {
  render,
  buildHead,
  renderHeadToString,
  PRERENDER_ROUTES,
  ROUTE_SEO,
  NOT_FOUND_SEO,
  absoluteUrl,
  BLOG_POSTS,
  BLOG_CONTENT_SLUGS,
} = server;

// src/blog/posts.ts and content/blog/*.mdx must describe the same posts.
const listed = new Set(BLOG_POSTS.map((p) => p.slug));
const onDisk = new Set(BLOG_CONTENT_SLUGS);
const unlisted = [...onDisk].filter((s) => !listed.has(s));
const missing = [...listed].filter((s) => !onDisk.has(s));
if (unlisted.length || missing.length) {
  throw new Error(
    [
      unlisted.length && `content/blog has posts missing from src/blog/posts.ts: ${unlisted.join(", ")}`,
      missing.length && `src/blog/posts.ts lists posts with no content/blog/<slug>.mdx: ${missing.join(", ")}`,
    ]
      .filter(Boolean)
      .join("\n")
  );
}

const template = readFileSync(join(DIST, "index.html"), "utf8");

console.log(`→ prerendering ${PRERENDER_ROUTES.length} routes`);
for (const route of PRERENDER_ROUTES) {
  const seo = ROUTE_SEO[route];
  const html = inject(template, {
    head: renderHeadToString(buildHead(seo)),
    body: await render(route),
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
    body: await render("/404"),
  })
);
console.log("   404                      → dist/404.html");

writeFileSync(
  join(DIST, "sitemap.xml"),
  buildSitemap(PRERENDER_ROUTES, (r) => ROUTE_SEO[r], absoluteUrl)
);
console.log("   sitemap.xml              → dist/sitemap.xml");

mkdirSync(join(DIST, "blog", "og"), { recursive: true });
writeFileSync(join(DIST, "blog", "rss.xml"), buildRss(BLOG_POSTS, absoluteUrl));
console.log("   blog/rss.xml             → dist/blog/rss.xml");

for (const post of BLOG_POSTS) {
  writeFileSync(join(DIST, "blog", "og", `${post.slug}.png`), await renderOgImage(post));
}
console.log(`   blog/og/*.png            → ${BLOG_POSTS.length} Open Graph images`);

rmSync(SSR_DIST, { recursive: true, force: true });
console.log("✓ prerender complete");
