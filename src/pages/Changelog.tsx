import { SiteLayout } from "@/components/site/SiteLayout";
import { GitCommit } from "lucide-react";

interface Release {
  version: string;
  date: string;
  tag?: "Latest" | "Pre-release";
  title: string;
  changes: { type: "added" | "changed" | "fixed"; text: string }[];
}

const releases: Release[] = [
  {
    version: "0.4.0",
    date: "2026-04-12",
    tag: "Latest",
    title: "M4 — Material library rewrite (preview)",
    changes: [
      { type: "added", text: "Material ripple effect now uses the framework's animation pipeline." },
      { type: "added", text: "Scaffold supports persistent bottom sheets and snack bars." },
      { type: "changed", text: "AppBar API aligned more closely with Flutter's leading/trailing slots." },
      { type: "fixed", text: "ElevatedButton elevation no longer flickers on hover transition." },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-02-20",
    title: "M3 — Port-first widget set expansion",
    changes: [
      { type: "added", text: "Stack, Positioned, AspectRatio, FractionallySizedBox." },
      { type: "added", text: "ListView.builder with viewport-based recycling." },
      { type: "changed", text: "Row/Column flex resolution rewritten for Flutter parity." },
    ],
  },
  {
    version: "0.2.0",
    date: "2025-12-08",
    title: "M2 — Input, focus & accessibility",
    changes: [
      { type: "added", text: "Focus traversal policies matching Flutter's FocusNode tree." },
      { type: "added", text: "GestureDetector with tap, double-tap, long-press, and pan." },
      { type: "added", text: "Initial accessibility tree exposed via Avalonia automation peers." },
    ],
  },
  {
    version: "0.1.0",
    date: "2025-09-30",
    title: "M1 — Core parity hardening",
    changes: [
      { type: "added", text: "Widget · Element · RenderObject pipeline with diff-based reconciliation." },
      { type: "added", text: "BoxConstraints / Size layout protocol." },
      { type: "added", text: "InheritedWidget propagation and dependency tracking." },
      { type: "added", text: "Initial NuGet release: Plumix, Plumix.Material, Plumix.Cupertino." },
    ],
  },
];

const typeStyles = {
  added: "border-status-done/30 bg-status-done/10 text-status-done",
  changed: "border-status-progress/30 bg-status-progress/10 text-status-progress",
  fixed: "border-primary/30 bg-primary/10 text-primary-glow",
} as const;

const Changelog = () => {
  return (
    <SiteLayout>
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">
            Releases
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Changelog</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Versioned history of Plumix releases. Anywhere behavior diverges from Flutter,
            it's called out explicitly.
          </p>
        </div>

        <div className="mt-12 relative max-w-3xl">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border" aria-hidden />
          <ol className="space-y-10">
            {releases.map((r) => (
              <li key={r.version} className="relative pl-10">
                <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-secondary border border-primary/40 text-primary-glow">
                  <GitCommit className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h2 className="text-2xl font-semibold font-mono">v{r.version}</h2>
                  <span className="text-sm text-muted-foreground">{r.date}</span>
                  {r.tag && (
                    <span className="rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-glow">
                      {r.tag}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-foreground/90">{r.title}</p>
                <ul className="mt-4 space-y-2">
                  {r.changes.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider rounded-full px-2 py-0.5 border mt-0.5 flex-shrink-0 ${typeStyles[c.type]}`}
                      >
                        {c.type}
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed">{c.text}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Changelog;
