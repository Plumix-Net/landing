import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { SiteLayout } from "./SiteLayout";

interface LegalLayoutProps {
  /** Product page the document belongs to, used for the back link. */
  backTo: { path: string; label: string };
  title: string;
  updated: string;
  children: ReactNode;
}

/** Plain long-form layout for privacy policies and terms linked from store listings. */
export const LegalLayout = ({ backTo, title, updated, children }: LegalLayoutProps) => (
  <SiteLayout>
    <article className="container max-w-3xl py-12 md:py-16">
      <Link
        to={backTo.path}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {backTo.label}
      </Link>
      <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: <time dateTime={updated}>{updated}</time>
      </p>
      <div className="mt-10 space-y-10">{children}</div>
    </article>
  </SiteLayout>
);

export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed [&_a]:text-primary-glow [&_a:hover]:text-primary [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
      {children}
    </div>
  </section>
);
