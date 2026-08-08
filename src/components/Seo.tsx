import { useEffect } from "react";
import { buildHead } from "@/seo/head";
import { getRouteSeo, NOT_FOUND_SEO, type RouteSeo } from "@/seo/routes";

export { SITE_URL } from "@/seo/routes";

interface SeoProps {
  /** Route path starting with "/". Metadata is looked up in ROUTE_SEO. */
  path: string;
  /** Escape hatch for routes that aren't in the static table (e.g. 404). */
  fallback?: RouteSeo;
}

const MANAGED = "data-seo";

/**
 * Keeps <head> in sync during client-side navigation.
 *
 * The first paint already has the correct tags — scripts/prerender.mjs bakes them
 * into each static HTML file from the same ROUTE_SEO table. This component only
 * matters once react-router takes over and swaps routes without a page load.
 */
export const Seo = ({ path, fallback }: SeoProps) => {
  useEffect(() => {
    const seo = getRouteSeo(path) ?? fallback ?? NOT_FOUND_SEO;
    const tags = buildHead(seo);

    document.head.querySelectorAll(`[${MANAGED}]`).forEach((el) => el.remove());

    for (const t of tags) {
      if (t.tag === "title") {
        document.title = t.text ?? "";
        continue;
      }

      const el = document.createElement(t.tag);
      for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
      if (t.text) el.textContent = t.text;
      el.setAttribute(MANAGED, "");
      document.head.appendChild(el);
    }
  }, [path, fallback]);

  return null;
};
