import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/Seo";
import { proseComponents } from "@/components/site/Prose";
import { useContent } from "@/content/registry";
import { GitCommit } from "lucide-react";
import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

/**
 * content/changelog.md is the framework's own CHANGELOG.md, copied by
 * `npm run sync:changelog`, so release notes have one source of truth.
 * Each "## v…" heading becomes a release marker on the timeline.
 */
const components: MDXComponents = {
  ...proseComponents,
  h2: ({ id, children }: { id?: string; children?: ReactNode }) => (
    <h2 id={id} className="relative mt-12 scroll-mt-24 pl-10 font-mono text-xl font-semibold">
      <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-secondary border border-primary/40 text-primary-glow">
        <GitCommit className="h-3.5 w-3.5" />
      </span>
      {children}
    </h2>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 ml-10 list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-primary-glow">
      {children}
    </ul>
  ),
};

const Changelog = () => {
  const Content = useContent("/changelog");

  return (
    <SiteLayout>
      <Seo path="/changelog" />
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">
            Releases
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Plumix changelog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Every Plumix release, newest first. Ports name their Dart source file, C#-only changes are
            marked as such, and every breaking change is listed by name.
          </p>
        </div>

        <div className="mt-8 relative max-w-3xl">
          <div className="absolute left-3 top-14 bottom-2 w-px bg-border" aria-hidden />
          {Content ? (
            <Content components={components} />
          ) : (
            <p className="mt-10 text-muted-foreground">Loading…</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Changelog;
