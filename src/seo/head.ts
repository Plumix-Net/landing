import { absoluteUrl, type RouteSeo } from "./routes";

export interface HeadTag {
  tag: "title" | "meta" | "link" | "script";
  attrs: Record<string, string>;
  /** Text content, used by <title> and the JSON-LD <script>. */
  text?: string;
}

/**
 * Builds the complete set of managed head tags for a route.
 *
 * The prerenderer serialises these into the static HTML; <Seo> applies the same
 * list to the live document after a client-side navigation. One function, so the
 * two can't disagree.
 */
export const buildHead = (seo: RouteSeo): HeadTag[] => {
  const url = absoluteUrl(seo.path);

  const tags: HeadTag[] = [
    { tag: "title", attrs: {}, text: seo.title },
    { tag: "meta", attrs: { name: "description", content: seo.description } },
    { tag: "link", attrs: { rel: "canonical", href: url } },

    { tag: "meta", attrs: { property: "og:site_name", content: "Plumix" } },
    { tag: "meta", attrs: { property: "og:type", content: seo.ogType } },
    { tag: "meta", attrs: { property: "og:title", content: seo.title } },
    { tag: "meta", attrs: { property: "og:description", content: seo.description } },
    { tag: "meta", attrs: { property: "og:url", content: url } },
    { tag: "meta", attrs: { property: "og:image", content: seo.image } },
    { tag: "meta", attrs: { property: "og:image:alt", content: seo.imageAlt } },
    { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
    { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
    { tag: "meta", attrs: { property: "og:locale", content: "en_US" } },

    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: seo.title } },
    { tag: "meta", attrs: { name: "twitter:description", content: seo.description } },
    { tag: "meta", attrs: { name: "twitter:image", content: seo.image } },
    { tag: "meta", attrs: { name: "twitter:image:alt", content: seo.imageAlt } },
  ];

  if (seo.noindex) {
    tags.push({ tag: "meta", attrs: { name: "robots", content: "noindex, follow" } });
  }

  if (seo.jsonLd?.length) {
    tags.push({
      tag: "script",
      attrs: { type: "application/ld+json" },
      text: JSON.stringify({ "@context": "https://schema.org", "@graph": seo.jsonLd }),
    });
  }

  return tags;
};

/** JSON-LD is injected as raw HTML, so close out any tag-like sequence in the data. */
const escapeJsonLd = (json: string) => json.replace(/</g, "\\u003c");

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const escapeText = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Serialises head tags for the static HTML written at build time.
 *
 * Everything except <title> carries data-seo so <Seo> can find and replace these
 * exact tags on the first client-side navigation instead of duplicating them.
 */
export const renderHeadToString = (tags: HeadTag[], indent = "    "): string =>
  tags
    .map((t) => {
      const attrs = Object.entries({
        ...t.attrs,
        ...(t.tag === "title" ? {} : { "data-seo": "" }),
      })
        .map(([k, v]) => (v === "" ? ` ${k}` : ` ${k}="${escapeAttr(v)}"`))
        .join("");

      if (t.tag === "title") return `${indent}<title>${escapeText(t.text ?? "")}</title>`;
      if (t.tag === "script")
        return `${indent}<script${attrs}>${escapeJsonLd(t.text ?? "")}</script>`;
      return `${indent}<${t.tag}${attrs} />`;
    })
    .join("\n");
