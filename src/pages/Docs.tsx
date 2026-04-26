import { SiteLayout } from "@/components/site/SiteLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Boxes, Layers, Wrench } from "lucide-react";

const setupCode = `dotnet new console -n HelloPlumix
cd HelloPlumix
dotnet add package Plumix
dotnet add package Plumix.Material`;

const appCode = `using Plumix;
using Plumix.Material;

public sealed class App : StatelessWidget
{
    public override Widget Build(BuildContext context)
    {
        return new MaterialApp(
            home: new Scaffold(
                appBar: new AppBar(title: new Text("Hello, Plumix")),
                body: new Center(
                    child: new Text("Welcome to the Flutter model in C#.")
                )
            )
        );
    }
}

public static class Program
{
    public static void Main() => PlumixHost.Run(new App());
}`;

const stateCode = `public sealed class Counter : StatefulWidget
{
    public override State CreateState() => new _CounterState();
}

internal sealed class _CounterState : State<Counter>
{
    private int _count;

    public override Widget Build(BuildContext context)
    {
        return new Column(
            children:
            [
                new Text($"Count: {_count}"),
                new TextButton(
                    onPressed: () => SetState(() => _count++),
                    child: new Text("Increment")
                )
            ]
        );
    }
}`;

const sections = [
  { id: "overview", label: "Overview" },
  { id: "install", label: "Installation" },
  { id: "first-app", label: "Your first app" },
  { id: "architecture", label: "Architecture" },
  { id: "state", label: "Stateful widgets" },
  { id: "layout", label: "Layout protocol" },
  { id: "next", label: "What's next" },
];

const Docs = () => {
  return (
    <SiteLayout>
      <section className="container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                On this page
              </p>
              <nav className="space-y-1 border-l border-border">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block pl-4 -ml-px border-l border-transparent hover:border-primary py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s.label}
                  </a>
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

          {/* Content */}
          <article className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary-glow">
              <BookOpen className="h-3.5 w-3.5" /> Documentation
            </div>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Getting started</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Plumix is a Flutter-faithful UI framework for .NET. This guide walks you from
              <code className="mx-1 rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">dotnet new</code>
              to your first widget tree.
            </p>

            <h2 id="overview" className="mt-14 scroll-mt-24 text-2xl font-semibold flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary-glow" /> Overview
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Plumix mirrors Flutter's three-tree architecture. You describe the UI as a tree of
              immutable <strong className="text-foreground">Widgets</strong>. The framework
              instantiates a parallel tree of mutable <strong className="text-foreground">Elements</strong>,
              which in turn manage <strong className="text-foreground">RenderObjects</strong> that
              perform layout, paint, and hit-testing.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Avalonia provides the platform host (window, input events, GPU-backed surface).
              Everything above the surface — measure, arrange, paint — is owned by Plumix.
            </p>

            <h2 id="install" className="mt-12 scroll-mt-24 text-2xl font-semibold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary-glow" /> Installation
            </h2>
            <p className="mt-3 text-muted-foreground">
              Plumix targets <code className="mx-0.5 rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">net8.0</code> and later.
              Create a new console app and add the packages:
            </p>
            <div className="mt-4">
              <CodeBlock code={setupCode} language="bash" filename="terminal" />
            </div>

            <h2 id="first-app" className="mt-12 scroll-mt-24 text-2xl font-semibold flex items-center gap-2">
              <Boxes className="h-5 w-5 text-primary-glow" /> Your first app
            </h2>
            <p className="mt-3 text-muted-foreground">
              Compose a simple Material scaffold. <code className="mx-0.5 rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">PlumixHost.Run</code> bootstraps the Avalonia surface and mounts the widget tree.
            </p>
            <div className="mt-4">
              <CodeBlock code={appCode} language="csharp" filename="Program.cs" />
            </div>

            <h2 id="architecture" className="mt-12 scroll-mt-24 text-2xl font-semibold">Architecture</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Each widget produces an Element via{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">CreateElement()</code>.
              Elements form a long-lived tree mirroring the widget tree. When parent widgets rebuild,
              elements decide whether to <em>update</em> in place (same runtime type and key) or
              <em>recreate</em>. RenderObjects sit beneath elements and implement the layout/paint protocol.
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• <strong className="text-foreground">Widget</strong> — immutable configuration</li>
              <li>• <strong className="text-foreground">Element</strong> — mutable instance, owns lifecycle</li>
              <li>• <strong className="text-foreground">RenderObject</strong> — performs layout, paint, hit-test</li>
            </ul>

            <h2 id="state" className="mt-12 scroll-mt-24 text-2xl font-semibold">Stateful widgets</h2>
            <p className="mt-3 text-muted-foreground">
              Mutable state lives in <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">State&lt;T&gt;</code>. Call{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">SetState</code> to mark the element dirty and trigger a rebuild.
            </p>
            <div className="mt-4">
              <CodeBlock code={stateCode} language="csharp" filename="Counter.cs" />
            </div>

            <h2 id="layout" className="mt-12 scroll-mt-24 text-2xl font-semibold">Layout protocol</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Layout is a single-pass <strong className="text-foreground">constraints down, sizes up</strong> walk —
              identical to Flutter. A parent passes{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">BoxConstraints</code> to each child;
              the child returns a <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">Size</code>; the parent then
              positions children for paint.
            </p>

            <h2 id="next" className="mt-12 scroll-mt-24 text-2xl font-semibold">What's next</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link to="/controls" className="card-surface rounded-lg p-5 hover:border-primary/40 transition-colors">
                <div className="text-sm font-mono text-primary-glow">Controls</div>
                <div className="mt-1 font-medium">Browse the widget catalog</div>
                <p className="mt-1 text-sm text-muted-foreground">Core, Material, Cupertino — every shipped widget.</p>
              </Link>
              <Link to="/changelog" className="card-surface rounded-lg p-5 hover:border-primary/40 transition-colors">
                <div className="text-sm font-mono text-primary-glow">Changelog</div>
                <div className="mt-1 font-medium">Track releases</div>
                <p className="mt-1 text-sm text-muted-foreground">Versioned history of every API change.</p>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Docs;
