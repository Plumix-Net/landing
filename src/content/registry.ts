import { useEffect, useState, type ComponentType } from "react";
import type { MDXComponents } from "mdx/types";

/**
 * Long-form content (blog posts, the changelog) compiled from Markdown/MDX.
 *
 * Every module is a lazy chunk, so one page's prose never ships in another page's
 * JavaScript. That only works if the module is already loaded when React renders:
 *  - the prerenderer awaits preloadContent(route) before renderToString
 *  - main.tsx awaits it for the current URL before hydrating
 *  - client-side navigation falls back to loading it in an effect
 */

type ContentComponent = ComponentType<{ components?: MDXComponents }>;
type Loader = () => Promise<{ default: ContentComponent }>;

const blogModules = import.meta.glob<{ default: ContentComponent }>("/content/blog/*.mdx");

/** "/content/blog/flutter-for-csharp.mdx" → "flutter-for-csharp" */
const slugOf = (file: string) => file.replace(/^.*\/([^/]+)\.mdx$/, "$1");

export const BLOG_CONTENT_SLUGS = Object.keys(blogModules).map(slugOf);

const loaders: Record<string, Loader> = {
  "/changelog": () => import("../../content/changelog.md"),
  ...Object.fromEntries(
    Object.entries(blogModules).map(([file, load]) => [`/blog/${slugOf(file)}`, load])
  ),
};

const cache = new Map<string, ContentComponent>();

/** Loads the content module behind a route, if it has one. Safe to call for any path. */
export const preloadContent = async (path: string): Promise<void> => {
  const load = loaders[path];
  if (!load || cache.has(path)) return;
  cache.set(path, (await load()).default);
};

/** The compiled content for a route, or undefined while a client-side load is in flight. */
export const useContent = (path: string): ContentComponent | undefined => {
  const [, rerender] = useState(0);
  const content = cache.get(path);

  useEffect(() => {
    if (content) return;
    let live = true;
    preloadContent(path).then(() => live && rerender((n) => n + 1));
    return () => {
      live = false;
    };
  }, [path, content]);

  return content;
};
