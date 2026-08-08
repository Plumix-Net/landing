import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./AppRoutes.tsx";

// Re-exported so the prerender script can read the SEO tables from this bundle
// rather than importing TypeScript sources directly from Node.
export { PRERENDER_ROUTES, ROUTE_SEO, NOT_FOUND_SEO, absoluteUrl } from "./seo/routes";
export { buildHead, renderHeadToString } from "./seo/head";

/**
 * Build-time entry point used by scripts/prerender.mjs.
 *
 * Mirrors App.tsx but swaps BrowserRouter for StaticRouter, since there is no
 * history API in Node.
 */
export const render = (url: string): string =>
  renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
