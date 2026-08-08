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

export const SITE_URL = "https://plumix.net";
export const GITHUB_URL = "https://github.com/Plumix-Net/Plumix";
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
    a: "Windows, macOS and Linux desktop, via the Avalonia host. The framework targets net8.0 and later.",
  },
  {
    q: "Is Plumix production ready?",
    a: "Not yet. Plumix is at v0.5 and follows a public milestone roadmap: core parity, input and accessibility, and the port-first widget set have shipped, while the Material library rewrite and cross-host sample parity are still in progress.",
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
  operatingSystem: "Windows, macOS, Linux",
  softwareVersion: "0.5",
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
    title: "Plumix — Flutter-like UI framework for C#",
    description:
      "Plumix brings Flutter's Widget → Element → RenderObject architecture to .NET. Build cross-platform desktop UIs in C# with the same mental model as Flutter.",
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
        "Install Plumix, create a console host and mount your first Flutter-style widget tree in C#."
      ),
    ],
  }),

  "/docs/architecture": route({
    path: "/docs/architecture",
    title: "Widget, Element, RenderObject — Plumix architecture in C#",
    description:
      "How Plumix implements Flutter's three-tree architecture in .NET: immutable widgets, mutable elements that own lifecycle and reconciliation, and render objects that lay out and paint.",
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
    title: "Stateful widgets and State<T> in C# — Plumix docs",
    description:
      "Hold mutable state in State<T>, call SetState to mark an element dirty, and keep state alive across hot reload — Flutter's stateful widget model, written in C#.",
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
    title: "Layout protocol: constraints down, sizes up — Plumix docs",
    description:
      "Plumix uses Flutter's single-pass layout protocol in C#: a parent passes BoxConstraints down, each child returns a Size up, and the parent positions children for paint.",
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
    title: "Core widgets — layout, gestures and text in C# | Plumix",
    description:
      "Container, Row, Column, Stack, ListView, GestureDetector and the rest of the Plumix core widget set — Flutter's foundational widgets implemented on a C# render tree.",
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
    title: "Material Design controls for C# desktop | Plumix.Material",
    description:
      "Scaffold, AppBar, buttons, Card, ListTile, Drawer, FAB, DataTable and Stepper — Material Design 3 controls for cross-platform C# desktop apps, ported from Flutter.",
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
    title: "Cupertino (iOS-style) controls in C# | Plumix.Cupertino",
    description:
      "CupertinoCheckbox, CupertinoRadio, CupertinoSwitch and adaptive controls that give C# desktop apps an iOS and macOS look, following Flutter's Cupertino defaults.",
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
    title: "Plumix changelog — releases and Flutter parity notes",
    description:
      "Versioned history of Plumix releases: new widgets, Material and Cupertino controls, hot reload, and every documented case where Plumix behaviour diverges from Flutter.",
    sitemap: { priority: 0.6, changefreq: "weekly" },
    jsonLd: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Changelog", path: "/changelog" },
      ]),
    ],
  }),
};

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
