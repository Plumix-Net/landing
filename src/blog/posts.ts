/**
 * Blog index: one entry per file in content/blog/<slug>.mdx.
 *
 * Metadata lives here rather than in MDX frontmatter so the post list, the
 * per-route SEO table, the sitemap and the RSS feed can read it without pulling
 * every post's compiled body into the main bundle. scripts/prerender.mjs fails
 * the build when this list and the files on disk disagree.
 */

export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description and list-card summary, ≤160 characters. */
  description: string;
  /** ISO dates. `updated` feeds dateModified and sitemap lastmod. */
  date: string;
  updated?: string;
  tags: string[];
  /** Rough reading time, shown next to the date. */
  minutes: number;
}

/** Newest first — the blog index renders in this order. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "plumix-0-4-beta",
    title: "Plumix 0.4 beta: the Cupertino port, Android and iOS hosts",
    description:
      "Plumix 0.4 is the first beta: strict ports of Flutter 3.47's framework, Material and Cupertino libraries, plus Android, iOS and browser hosts.",
    date: "2026-10-24",
    tags: ["release"],
    minutes: 5,
  },
  {
    slug: "flutter-for-csharp-developers",
    title: "Flutter for C# developers in 2026: what actually exists",
    description:
      "Can you write Flutter in C#? A survey of every route in 2026 — Flet bridges, transpilers, MVU libraries and Plumix — and what each one really gives you.",
    date: "2026-10-24",
    tags: ["flutter", "dotnet", "comparison"],
    minutes: 8,
  },
  {
    slug: "port-flutter-widget-to-csharp",
    title: "Porting a Flutter widget to C#, line by line",
    description:
      "Two real Flutter widgets — Spacer and Placeholder — ported from Dart to C# with Plumix, and the translation rules that cover most other widgets.",
    date: "2026-10-24",
    tags: ["flutter", "porting", "tutorial"],
    minutes: 9,
  },
  {
    slug: "widget-element-renderobject-explained",
    title: "Widget, Element, RenderObject: Flutter's three trees in C#",
    description:
      "What the widget, element and render trees each do, when an element is updated instead of recreated, and why keys matter — with runnable C# examples.",
    date: "2026-10-24",
    tags: ["flutter", "architecture"],
    minutes: 10,
  },
];

export const getPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);

/** Display date: "October 24, 2026". Fixed locale and UTC so prerender and hydration agree. */
export const formatPostDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
