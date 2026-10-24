import { isValidElement, type ReactElement, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { Code } from "./DocsLayout";

/** Fenced code: MDX emits <pre><code className="language-x">…</code></pre>. */
const Pre = ({ children }: { children?: ReactNode }) => {
  if (!isValidElement(children)) return <pre>{children}</pre>;
  const code = children as ReactElement<{ className?: string; children?: ReactNode }>;
  const language = code.props.className?.replace(/^language-/, "") ?? "text";
  const text = String(code.props.children ?? "").replace(/\n$/, "");
  return (
    <div className="my-6">
      <CodeBlock code={text} language={language === "cs" ? "csharp" : language} />
    </div>
  );
};

/** Site-internal links go through the router so navigation stays client-side. */
const Anchor = ({ href = "", children }: { href?: string; children?: ReactNode }) => {
  const className = "text-primary-glow hover:text-primary underline-offset-4 hover:underline";
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
};

const heading = (Tag: "h2" | "h3", className: string) =>
  ({ id, children }: { id?: string; children?: ReactNode }) => (
    <Tag id={id} className={cn("scroll-mt-24 font-semibold tracking-tight", className)}>
      {children}
    </Tag>
  );

/**
 * Element mapping for MDX/Markdown content, styled to match the hand-written
 * docs pages instead of a generic typography plugin.
 */
export const proseComponents: MDXComponents = {
  h2: heading("h2", "mt-12 text-2xl"),
  h3: heading("h3", "mt-8 text-xl"),
  p: ({ children }) => <p className="mt-4 text-muted-foreground leading-relaxed">{children}</p>,
  a: Anchor,
  strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary-glow">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground marker:text-primary-glow">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-primary/60 pl-5 italic [&_p]:mt-2">{children}</blockquote>
  ),
  code: ({ children }) => <Code>{children}</Code>,
  pre: Pre,
  hr: () => <hr className="my-10 border-border" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-secondary/40 text-left">{children}</thead>,
  th: ({ children }) => <th className="px-4 py-2.5 font-semibold text-foreground">{children}</th>,
  td: ({ children }) => (
    <td className="border-t border-border px-4 py-2.5 align-top text-muted-foreground">{children}</td>
  ),
};
