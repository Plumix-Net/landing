import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SiteLayout } from "./SiteLayout";

/**
 * Ordered so the sidebar, the breadcrumb and the prev/next footer all derive
 * from one list — adding a docs page here wires up every navigation surface.
 */
export const DOCS_PAGES = [
  { path: "/docs", label: "Getting started" },
  { path: "/docs/architecture", label: "Architecture" },
  { path: "/docs/state", label: "Stateful widgets" },
  { path: "/docs/layout", label: "Layout protocol" },
] as const;

interface DocsLayoutProps {
  /** Current page path, used for the active state and prev/next links. */
  path: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}

export const DocsLayout = ({ path, title, intro, children }: DocsLayoutProps) => {
  const index = DOCS_PAGES.findIndex((p) => p.path === path);
  const prev = index > 0 ? DOCS_PAGES[index - 1] : null;
  const next = index >= 0 && index < DOCS_PAGES.length - 1 ? DOCS_PAGES[index + 1] : null;

  return (
    <SiteLayout>
      <section className="container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Documentation
              </p>
              <nav className="space-y-1 border-l border-border">
                {DOCS_PAGES.map((p) => (
                  <Link
                    key={p.path}
                    to={p.path}
                    className={cn(
                      "block pl-4 -ml-px border-l py-1.5 text-sm transition-colors",
                      p.path === path
                        ? "border-primary text-foreground font-medium"
                        : "border-transparent text-muted-foreground hover:border-primary hover:text-foreground"
                    )}
                  >
                    {p.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 card-surface rounded-lg p-4">
                <p className="text-xs text-muted-foreground">Need controls?</p>
                <Link
                  to="/controls"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary-glow hover:text-primary"
                >
                  Browse catalog <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </aside>

          <article className="max-w-3xl">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary-glow"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <Link to="/docs" className="hover:text-primary">
                Docs
              </Link>
              {path !== "/docs" && (
                <>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground normal-case font-sans tracking-normal">
                    {DOCS_PAGES[index]?.label}
                  </span>
                </>
              )}
            </nav>

            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
            <div className="mt-4 text-lg text-muted-foreground leading-relaxed">{intro}</div>

            {children}

            {(prev || next) && (
              <nav className="mt-16 grid gap-3 sm:grid-cols-2 border-t border-border pt-8">
                {prev ? (
                  <Link
                    to={prev.path}
                    className="card-surface rounded-lg p-5 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <ArrowLeft className="h-3.5 w-3.5" /> Previous
                    </div>
                    <div className="mt-1 font-medium">{prev.label}</div>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    to={next.path}
                    className="card-surface rounded-lg p-5 hover:border-primary/40 transition-colors sm:text-right"
                  >
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground sm:justify-end">
                      Next <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                    <div className="mt-1 font-medium">{next.label}</div>
                  </Link>
                )}
              </nav>
            )}
          </article>
        </div>
      </section>
    </SiteLayout>
  );
};

/** Shared inline-code styling used across the docs pages. */
export const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">{children}</code>
);
