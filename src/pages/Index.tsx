import { SiteLayout } from "@/components/site/SiteLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  Layers,
  Repeat,
  Box,
  CheckCircle2,
  Loader2,
  CircleDashed,
  Package,
  Sparkles,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const installCmd = "dotnet add package Plumix";

const exampleCode = `public sealed class MyApp : StatelessWidget
{
    public override Widget Build(BuildContext context)
    {
        return new Container(
            color: Brushes.White,
            padding: new Thickness(24),
            child: new Column(
                children:
                [
                    new Text("Hello, Plumix"),
                    new SizedBox(height: 12),
                    new Text("Render tree is driven by Flutter-like widgets.")
                ]
            )
        );
    }
}`;

const features = [
  {
    icon: Layers,
    title: "Widget · Element · RenderObject",
    desc: "The same three-tree architecture as Flutter — not a thin wrapper around an existing UI toolkit.",
  },
  {
    icon: Repeat,
    title: "Port Dart to C# directly",
    desc: "Translate Flutter widgets line-by-line. Familiar names, familiar lifecycle, familiar layout protocol.",
  },
  {
    icon: Cpu,
    title: "Avalonia as infrastructure",
    desc: "Avalonia handles the window, input, and drawing surface. All layout and paint logic lives in Plumix.",
  },
  {
    icon: ShieldCheck,
    title: "Parity by default",
    desc: "When behavior diverges from Flutter, it is explicitly documented — never silently skipped.",
  },
];

const philosophy = [
  {
    n: "01",
    title: "Flutter-faithful architecture",
    body: "Widget, Element, RenderObject — the same mental model as Flutter, not a thin wrapper around another toolkit.",
  },
  {
    n: "02",
    title: "Dart → C# without friction",
    body: "Porting a Flutter control should feel like translation, not rewriting. APIs and lifecycle mirror Flutter intentionally.",
  },
  {
    n: "03",
    title: "Avalonia as infrastructure, not UI",
    body: "Avalonia provides the host, platform lifecycle, and rendering surface. All layout and paint behavior is framework-owned.",
  },
  {
    n: "04",
    title: "Parity by default",
    body: "When behavior diverges from Flutter, it is explicitly documented in the changelog and reference — not silently skipped.",
  },
];

const milestones = [
  { id: "M1", title: "Core Parity Hardening", status: "done" },
  { id: "M2", title: "Input / Focus / Accessibility", status: "done" },
  { id: "M3", title: "Port-first Widget Set Expansion", status: "done" },
  { id: "M4", title: "Material Library Rewrite", status: "progress" },
  { id: "M5", title: "Cross-host Sample Parity & Stability", status: "planned" },
] as const;

const packages = [
  {
    name: "Plumix",
    desc: "Core framework — widgets, elements, render objects, layout & paint pipeline.",
    href: "https://www.nuget.org/packages/Plumix/",
  },
  {
    name: "Plumix.Material",
    desc: "Material Design layer — scaffold, buttons, FAB, cards, list tiles, drawer, navigation bar, switch/checkbox/radio, ripple, and Hero transitions.",
    href: "https://www.nuget.org/packages/Plumix.Material/",
  },
  {
    name: "Plumix.Cupertino",
    desc: "Cupertino adaptive controls — CupertinoCheckbox, CupertinoRadio, and Cupertino-path Switch for iOS / macOS aesthetics.",
    href: "https://www.nuget.org/packages/Plumix.Cupertino/",
  },
];

const StatusBadge = ({ status }: { status: "done" | "progress" | "planned" }) => {
  if (status === "done")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-status-done/30 bg-status-done/10 px-2.5 py-1 text-xs font-medium text-status-done">
        <CheckCircle2 className="h-3.5 w-3.5" /> Shipped
      </span>
    );
  if (status === "progress")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-status-progress/30 bg-status-progress/10 px-2.5 py-1 text-xs font-medium text-status-progress">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> In progress
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-status-planned/30 bg-status-planned/10 px-2.5 py-1 text-xs font-medium text-status-planned">
      <CircleDashed className="h-3.5 w-3.5" /> Planned
    </span>
  );
};

const Index = () => {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <a
              href="https://github.com/Plumix-Net/Plumix"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
              v0.4 · M4 Material library — April 2026
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Flutter's UI model,{" "}
              <span className="text-gradient">written in C#</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              Plumix brings Flutter's <span className="font-mono text-foreground">Widget → Element → RenderObject</span> architecture
              to .NET. Port Flutter controls to C# with minimal conceptual translation.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-primary border-0">
                <Link to="/docs">
                  Get started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-secondary/30 hover:bg-secondary/60">
                <a href="https://github.com/Plumix-Net/Plumix" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View on GitHub
                </a>
              </Button>
            </div>

            <div className="mt-10 mx-auto max-w-xl">
              <CodeBlock code={installCmd} language="bash" filename="terminal" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="https://github.com/Plumix-Net/Plumix/actions/workflows/ci.yml"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://github.com/Plumix-Net/Plumix/actions/workflows/ci.yml/badge.svg"
                  alt="CI status"
                  className="h-5"
                />
              </a>
              <a href="https://www.nuget.org/packages/Plumix/" target="_blank" rel="noreferrer">
                <img
                  src="https://img.shields.io/nuget/v/Plumix?color=8a3df0&label=NuGet"
                  alt="NuGet"
                  className="h-5"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CODE EXAMPLE */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">
              Familiar by design
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              If you know Flutter, you already know Plumix.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Compose UIs from immutable widgets. The framework manages an element tree
              and a render tree under the hood — exactly the way Flutter does.
              Same lifecycle, same layout protocol, same paint phase. Just C#.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Immutable widgets, mutable elements, render objects do the work",
                "BuildContext, State<T>, InheritedWidget — they all behave as expected",
                "Layout protocol: parent passes constraints, child returns a size",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary-glow flex-shrink-0" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock code={exampleCode} language="csharp" filename="MyApp.cs" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for parity</h2>
          <p className="mt-4 text-muted-foreground">
            Four principles that keep Plumix faithful to Flutter — and predictable for C# developers.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group card-surface rounded-xl p-6 transition-all hover:border-primary/40 hover:shadow-primary"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary-glow ring-1 ring-primary/20">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="container py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">
            Philosophy
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Why Plumix exists
          </h2>
          <p className="mt-4 text-muted-foreground">
            Plumix is not "Flutter inspired." It is a deliberate translation of
            Flutter's architecture into the .NET runtime.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {philosophy.map((p) => (
            <div key={p.n} className="card-surface rounded-xl p-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-primary-glow">{p.n}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="container py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Three packages, one ecosystem
          </h2>
          <p className="mt-4 text-muted-foreground">
            Install only what you need. Material and Cupertino sit on top of Plumix core.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {packages.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="card-surface rounded-xl p-6 transition-all hover:border-primary/40 hover:shadow-primary group"
            >
              <div className="flex items-center justify-between">
                <Package className="h-5 w-5 text-primary-glow" />
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="mt-4 font-mono text-sm text-foreground">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-4 rounded-md border border-code-border/60 bg-code-bg px-3 py-2 text-xs font-mono text-muted-foreground">
                dotnet add package {p.name}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* MILESTONES */}
      <section className="container py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">
            Roadmap
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Current status</h2>
          <p className="mt-4 text-muted-foreground">
            Five milestones tracking the path to a fully Flutter-parity .NET UI framework.
          </p>
        </div>
        <ol className="mt-12 mx-auto max-w-3xl space-y-3">
          {milestones.map((m) => (
            <li
              key={m.id}
              className="card-surface rounded-xl p-5 flex items-center gap-4 flex-wrap"
            >
              <span className="font-mono text-sm text-primary-glow w-10">{m.id}</span>
              <span className="flex-1 font-medium">{m.title}</span>
              <StatusBadge status={m.status} />
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="relative overflow-hidden rounded-2xl border border-border card-surface p-10 md:p-14 text-center">
          <div className="absolute inset-0 bg-hero-glow opacity-60 pointer-events-none" />
          <div className="relative">
            <Box className="h-10 w-10 mx-auto text-primary-glow" />
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              Start porting Flutter widgets today
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Read the architecture guide, browse the controls catalog, or jump straight into the source.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground border-0 shadow-primary hover:opacity-95">
                <Link to="/docs">Read the docs <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-secondary/30 hover:bg-secondary/60">
                <Link to="/controls">Browse controls</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
