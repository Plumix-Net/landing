/**
 * Single source of truth for per-route SEO metadata.
 *
 * Consumed twice:
 *  - at build time by scripts/prerender.mjs, which bakes the tags into static HTML
 *  - at runtime by <Seo>, which keeps the head in sync during client-side navigation
 *
 * Keeping both readers on one object is what prevents the prerendered head and the
 * hydrated head from drifting apart.
 */

import { BLOG_POSTS, type BlogPost } from "../blog/posts";

export const SITE_URL = "https://plumix.net";
export const GITHUB_URL = "https://github.com/Plumix-Net/Plumix";
/** Latest Plumix release on NuGet. Bump together with the hero badge on the homepage. */
export const PLUMIX_VERSION = "0.4.0-beta.3";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const DEFAULT_OG_IMAGE_ALT =
  "Plumix — Flutter's Widget, Element and RenderObject architecture in C#";

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ogType: "website" | "article";
  /**
   * ISO date of the last meaningful content change — sitemap lastmod and, for
   * articles, dateModified. Bump it when you edit the page; never set it to the
   * build date, or search engines learn to ignore it.
   */
  updated?: string;
  /** Articles only: ISO publication date, emitted as article:published_time. */
  published?: string;
  noindex?: boolean;
  /** Omitted from sitemap.xml when false. */
  sitemap?: false | { priority: number; changefreq: string };
  jsonLd?: Record<string, unknown>[];
}

type RouteSeoInput = Omit<RouteSeo, "image" | "imageAlt" | "ogType"> &
  Partial<Pick<RouteSeo, "image" | "imageAlt" | "ogType">>;

const route = (input: RouteSeoInput): RouteSeo => ({
  image: DEFAULT_OG_IMAGE,
  imageAlt: DEFAULT_OG_IMAGE_ALT,
  ogType: "website",
  sitemap: { priority: 0.7, changefreq: "monthly" },
  ...input,
});

export const absoluteUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

const breadcrumb = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

/** Rendered on the homepage and mirrored into FAQPage structured data. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "How is Plumix different from Avalonia?",
    a: "Plumix is not a wrapper over Avalonia's control set. Avalonia supplies the window, platform lifecycle, input plumbing and drawing surface; every layout, paint and hit-test decision above that surface is made by Plumix's own render tree. You write Flutter-style widgets, not XAML.",
  },
  {
    q: "Do I need to know Flutter to use Plumix?",
    a: "No. Plumix is a normal C# UI framework you can learn on its own. But if you already know Flutter, the API surface, lifecycle and layout protocol are deliberately the same, so most of your existing knowledge transfers directly.",
  },
  {
    q: "Can I port an existing Flutter widget to C#?",
    a: "That is the primary design goal. Widget, Element and RenderObject exist with the same responsibilities and mostly the same names, so porting a Dart widget is closer to translation than to a rewrite. Where behaviour intentionally diverges from Flutter, it is documented in the changelog.",
  },
  {
    q: "Which platforms does Plumix support?",
    a: "Windows, macOS and Linux through the Avalonia desktop host, which is the most mature. Android (the Plumix.Android package), iOS and the browser (WebAssembly) hosts run the same widget tree; cross-host stability is the current milestone. The framework targets .NET 10.",
  },
  {
    q: "Is Plumix production ready?",
    a: "Not yet. Plumix is in beta (v0.4). The framework core, rendering, gestures, navigation, scrolling and the Material library are strict ports of Flutter 3.47; the Cupertino port and cross-host stability are in progress, and the next step is a v1.0 release candidate with an API freeze.",
  },
  {
    q: "Does Plumix support hot reload?",
    a: "Yes. Running under dotnet watch preserves State across edits, so you keep your counter values and scroll positions while the widget tree rebuilds — the same workflow Flutter developers expect.",
  },
];

const softwareApplication = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Plumix",
  description:
    "Flutter-like UI framework for C#: Widget → Element → RenderObject architecture in .NET.",
  url: `${SITE_URL}/`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux, Android, iOS",
  softwareVersion: PLUMIX_VERSION,
  programmingLanguage: ["C#", "F#"],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  sameAs: [GITHUB_URL, "https://www.nuget.org/packages/Plumix/"],
};

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Plumix",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-180.png`,
  sameAs: [GITHUB_URL, "https://www.nuget.org/packages/Plumix/"],
};

const docsTrail = (name: string, path: string) =>
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Docs", path: "/docs" },
    { name, path },
  ]);

const techArticle = (path: string, headline: string, description: string) => ({
  "@type": "TechArticle",
  "@id": `${absoluteUrl(path)}#article`,
  headline,
  description,
  url: absoluteUrl(path),
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#software` },
  inLanguage: "en",
});

export const ROUTE_SEO: Record<string, RouteSeo> = {
  "/": route({
    path: "/",
    updated: "2026-10-24",
    title: "Plumix — Flutter-like UI framework for C#",
    description:
      "Plumix brings Flutter's Widget → Element → RenderObject architecture to .NET 10. Build desktop and mobile UIs in C# with the same mental model as Flutter.",
    sitemap: { priority: 1.0, changefreq: "weekly" },
    jsonLd: [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Plumix",
        description:
          "Flutter-like UI framework for C# — Widget, Element and RenderObject in .NET.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
      organization,
      softwareApplication,
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  }),

  "/docs": route({
    path: "/docs",
    updated: "2026-10-24",
    title: "Getting started with Plumix — Flutter architecture in C#",
    description:
      "Install Plumix, build your first widget tree in C#, and learn the Widget → Element → RenderObject architecture that Plumix ports from Flutter to .NET.",
    ogType: "article",
    sitemap: { priority: 0.9, changefreq: "weekly" },
    jsonLd: [
      docsTrail("Getting started", "/docs"),
      techArticle(
        "/docs",
        "Getting started with Plumix — Flutter architecture in C#",
        "Install Plumix from NuGet, create an Avalonia desktop host and mount your first Flutter-style widget tree in C#."
      ),
    ],
  }),

  "/docs/architecture": route({
    path: "/docs/architecture",
    updated: "2026-10-24",
    title: "Widget, Element, RenderObject — Plumix architecture in C#",
    description:
      "Flutter's three trees in .NET: immutable widgets, elements that own lifecycle and reconciliation, and render objects that lay out and paint — explained in C#.",
    ogType: "article",
    sitemap: { priority: 0.8, changefreq: "monthly" },
    jsonLd: [
      docsTrail("Architecture", "/docs/architecture"),
      techArticle(
        "/docs/architecture",
        "Widget, Element, RenderObject — Plumix architecture in C#",
        "The three-tree architecture Plumix ports from Flutter, and how reconciliation decides between updating and recreating an element."
      ),
    ],
  }),

  "/docs/state": route({
    path: "/docs/state",
    updated: "2026-10-24",
    title: "Stateful widgets and State<T> in C# — Plumix docs",
    description:
      "Hold mutable state in State<T>, call SetState to mark an element dirty, and keep state alive across hot reload — Flutter's stateful widget model in C#.",
    ogType: "article",
    sitemap: { priority: 0.8, changefreq: "monthly" },
    jsonLd: [
      docsTrail("Stateful widgets", "/docs/state"),
      techArticle(
        "/docs/state",
        "Stateful widgets and State<T> in C#",
        "StatefulWidget, State<T> and SetState in Plumix, including lifecycle order and hot reload behaviour."
      ),
    ],
  }),

  "/docs/layout": route({
    path: "/docs/layout",
    updated: "2026-10-24",
    title: "Layout protocol: constraints down, sizes up — Plumix docs",
    description:
      "Flutter's single-pass layout protocol in C#: a parent passes BoxConstraints down, each child returns a Size up, and the parent positions its children.",
    ogType: "article",
    sitemap: { priority: 0.8, changefreq: "monthly" },
    jsonLd: [
      docsTrail("Layout protocol", "/docs/layout"),
      techArticle(
        "/docs/layout",
        "Layout protocol: constraints down, sizes up",
        "How BoxConstraints, Size and the single-pass layout walk work in Plumix's render tree."
      ),
    ],
  }),

  "/controls": route({
    path: "/controls",
    updated: "2026-10-24",
    title: "Controls catalog — every Plumix widget for C#",
    description:
      "Browse every widget shipped in Plumix, Plumix.Material and Plumix.Cupertino. Names match Flutter wherever possible, so porting a control feels like translation.",
    sitemap: { priority: 0.9, changefreq: "weekly" },
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Controls", path: "/controls" },
      ]),
    ],
  }),

  "/controls/core": route({
    path: "/controls/core",
    updated: "2026-10-24",
    title: "Core widgets — layout, gestures and text in C# | Plumix",
    description:
      "Container, Row, Column, Stack, ListView, GestureDetector and the rest of the Plumix core widgets — Flutter's foundational widgets on a C# render tree.",
    sitemap: { priority: 0.8, changefreq: "monthly" },
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Controls", path: "/controls" },
        { name: "Core", path: "/controls/core" },
      ]),
    ],
  }),

  "/controls/material": route({
    path: "/controls/material",
    updated: "2026-10-24",
    title: "Material Design 3 controls for C# and .NET | Plumix.Material",
    description:
      "Scaffold, AppBar, buttons, TextField, NavigationBar, dialogs, pickers and DataTable — every Flutter Material widget, ported to C# for desktop and mobile.",
    sitemap: { priority: 0.8, changefreq: "monthly" },
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Controls", path: "/controls" },
        { name: "Material", path: "/controls/material" },
      ]),
    ],
  }),

  "/controls/cupertino": route({
    path: "/controls/cupertino",
    updated: "2026-10-24",
    title: "Cupertino (iOS-style) controls in C# | Plumix.Cupertino",
    description:
      "CupertinoApp, navigation bars, tab scaffolds, pickers, text fields, sheets and context menus — Flutter's Cupertino library ported to C# for iOS-style apps.",
    sitemap: { priority: 0.8, changefreq: "monthly" },
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Controls", path: "/controls" },
        { name: "Cupertino", path: "/controls/cupertino" },
      ]),
    ],
  }),

  "/changelog": route({
    path: "/changelog",
    updated: "2026-10-24",
    title: "Plumix changelog — releases and Flutter parity notes",
    description:
      "Every Plumix release: new Flutter ports, Material and Cupertino controls, host changes, and each breaking change called out by name.",
    sitemap: { priority: 0.6, changefreq: "weekly" },
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Changelog", path: "/changelog" },
      ]),
    ],
  }),

  "/netbench": route({
    path: "/netbench",
    updated: "2026-10-24",
    title: "NetBench — HTTP load testing app for Android, iOS and desktop",
    description:
      "HTTP load testing from your phone or desktop: hundreds of concurrent users, live RPS, p50/p95/p99 latency and error rate. Built in C# with Plumix.",
    sitemap: { priority: 0.9, changefreq: "monthly" },
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "NetBench", path: "/netbench" },
      ]),
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/netbench#app`,
        name: "NetBench",
        description:
          "HTTP load-testing tool with live throughput, latency percentiles and error rate — a showcase app for the Plumix UI framework.",
        url: absoluteUrl("/netbench"),
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Android, iOS, Windows, macOS, Linux",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${SITE_URL}/#organization` },
        sameAs: ["https://github.com/Plumix-Net/NetBench"],
      },
    ],
  }),

  "/netbench/privacy": route({
    path: "/netbench/privacy",
    updated: "2026-10-24",
    title: "NetBench privacy policy",
    description:
      "NetBench collects no personal data: no account, analytics or ads. Scenarios and reports stay on your device; requests go only to the targets you configure.",
    sitemap: { priority: 0.3, changefreq: "yearly" },
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "NetBench", path: "/netbench" },
        { name: "Privacy policy", path: "/netbench/privacy" },
      ]),
    ],
  }),

  "/netbench/terms": route({
    path: "/netbench/terms",
    updated: "2026-10-24",
    title: "NetBench terms of use",
    description:
      "Terms of use for the NetBench load-testing app: test only systems you own or are authorised to test, your responsibility for traffic and costs, no warranty.",
    sitemap: { priority: 0.3, changefreq: "yearly" },
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "NetBench", path: "/netbench" },
        { name: "Terms of use", path: "/netbench/terms" },
      ]),
    ],
  }),
};

const blogPosting = (post: BlogPost) => ({
  "@type": "BlogPosting",
  "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
  headline: post.title,
  description: post.description,
  url: absoluteUrl(`/blog/${post.slug}`),
  image: blogOgImage(post.slug),
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  keywords: post.tags.join(", "),
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/blog#blog` },
  inLanguage: "en",
});

/** Rendered per post by scripts/prerender.mjs. */
export const blogOgImage = (slug: string) => `${SITE_URL}/blog/og/${slug}.png`;

const blogTrail = (post?: BlogPost) =>
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    ...(post ? [{ name: post.title, path: `/blog/${post.slug}` }] : []),
  ]);

ROUTE_SEO["/blog"] = route({
  path: "/blog",
  updated: BLOG_POSTS[0]?.updated ?? BLOG_POSTS[0]?.date,
  title: "Plumix blog — Flutter architecture, C# and .NET UI",
  description:
    "Releases, porting guides and deep dives into Flutter's architecture from the team porting it to C#: widgets, layout, rendering and cross-platform .NET UI.",
  sitemap: { priority: 0.8, changefreq: "weekly" },
  jsonLd: [
    blogTrail(),
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      name: "Plumix blog",
      url: absoluteUrl("/blog"),
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
});

for (const post of BLOG_POSTS) {
  ROUTE_SEO[`/blog/${post.slug}`] = route({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    image: blogOgImage(post.slug),
    imageAlt: post.title,
    ogType: "article",
    published: post.date,
    updated: post.updated ?? post.date,
    sitemap: { priority: 0.7, changefreq: "monthly" },
    jsonLd: [blogTrail(post), blogPosting(post)],
  });
}

export const NOT_FOUND_SEO: RouteSeo = route({
  path: "/404",
  title: "Page not found — Plumix",
  description: "That route doesn't exist in this widget tree.",
  noindex: true,
  sitemap: false,
});

/** Every route baked to static HTML at build time. Order matters only for logs. */
export const PRERENDER_ROUTES = Object.keys(ROUTE_SEO);

export const getRouteSeo = (path: string): RouteSeo | undefined =>
  ROUTE_SEO[path.length > 1 ? path.replace(/\/+$/, "") : path];
