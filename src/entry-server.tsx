import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./AppRoutes.tsx";
import { preloadContent } from "./content/registry";

// Re-exported so the prerender script can read the SEO tables from this bundle
// rather than importing TypeScript sources directly from Node.
export { PRERENDER_ROUTES, ROUTE_SEO, NOT_FOUND_SEO, absoluteUrl } from "./seo/routes";
export { buildHead, renderHeadToString } from "./seo/head";
export { BLOG_POSTS } from "./blog/posts";
export { BLOG_CONTENT_SLUGS } from "./content/registry";

/**
 * Build-time entry point used by scripts/prerender.mjs.
 *
 * Mirrors App.tsx but swaps BrowserRouter for StaticRouter, since there is no
 * history API in Node. Lazy content (blog posts, changelog) is loaded first:
 * renderToString cannot wait for it and would bake the loading state instead.
 */
export const render = async (url: string): Promise<string> => {
  await preloadContent(url);
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
};
