import { Link } from "react-router-dom";
import { Boxes, Layers, Wrench } from "lucide-react";
import { Seo } from "@/components/Seo";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Code, DocsLayout } from "@/components/site/DocsLayout";

const setupCode = `dotnet new install Plumix.Templates
dotnet new plumix-app -n HelloPlumix
cd HelloPlumix
dotnet run --project HelloPlumix.Desktop`;

const appCode = `using Plumix.Material;
using Plumix.Widgets;

namespace HelloPlumix;

// HelloPlumix/MyApp.cs — the widgets every platform shares.
public sealed class MyApp : StatelessWidget
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
}`;

const hostsCode = `// HelloPlumix.Desktop — an Avalonia window.
public sealed class App : PlumixApplication
{
    protected override Widget CreateRootWidget() => new MyApp();
}

// HelloPlumix.Android — Plumix's native host, rendering through Impeller.
public sealed class MainActivity : PlumixActivity
{
    protected override Widget CreateApp() => new MyApp();
}

// HelloPlumix.iOS — Plumix's native host, rendering through Impeller on Metal.
public sealed class MainViewController : PlumixViewController
{
    protected override Widget CreateApp() => new MyApp();
}`;

const Docs = () => {
  return (
    <DocsLayout
      path="/docs"
      title="Getting started with Plumix"
      intro={
        <>
          Plumix is a Flutter-faithful UI framework for .NET. This guide takes you from{" "}
          <Code>dotnet new</Code> to your first widget tree rendered on screen.
        </>
      }
    >
      <Seo path="/docs" />

      <h2 id="overview" className="mt-14 scroll-mt-24 text-2xl font-semibold flex items-center gap-2">
        <Layers className="h-5 w-5 text-primary-glow" /> What Plumix is
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Plumix mirrors Flutter's three-tree architecture in C#. You describe the UI as a tree of
        immutable <strong className="text-foreground">Widgets</strong>. The framework instantiates a
        parallel tree of mutable <strong className="text-foreground">Elements</strong>, which in turn
        manage <strong className="text-foreground">RenderObjects</strong> that perform layout, paint
        and hit-testing.
      </p>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        A host provides the window or view, input events and a GPU-backed surface. On Android and
        iOS that is Plumix's own host, which renders through Impeller as Flutter's engine does; on
        desktop and in the browser it is Avalonia. Everything above that surface is owned by Plumix,
        which is what separates it from a wrapper library: there is no second control set
        underneath translating your widgets into someone else's layout system.
      </p>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        If you have written Flutter before, the payoff is that porting a Dart widget to C# is closer
        to translation than to a rewrite. If you haven't, Plumix is still a normal declarative UI
        framework — no XAML, no code-behind, just C#.{" "}
        <Link to="/docs/architecture" className="text-primary-glow hover:text-primary">
          The architecture page
        </Link>{" "}
        explains the three trees in detail.
      </p>

      <h2 id="install" className="mt-12 scroll-mt-24 text-2xl font-semibold flex items-center gap-2">
        <Wrench className="h-5 w-5 text-primary-glow" /> Installation
      </h2>
      <p className="mt-3 text-muted-foreground">
        Plumix targets <Code>net11.0</Code>, so you need the .NET 11 SDK. Install the project
        template and create an app; it targets the Plumix version the template was released with:
      </p>
      <div className="mt-4">
        <CodeBlock code={setupCode} language="bash" filename="terminal" />
      </div>
      <p className="mt-3 text-muted-foreground">
        Android needs the <Code>android</Code> workload and JDK 17 or newer, iOS needs macOS with
        Xcode and the <Code>ios</Code> workload. Leave a platform out with{" "}
        <Code>--android false</Code>, <Code>--ios false</Code> or <Code>--desktop false</Code>.
      </p>
      <p className="mt-3 text-muted-foreground">
        <Code>Plumix</Code> alone is enough for the core widget set. Add{" "}
        <Code>Plumix.Material</Code> for Material Design 3 controls, or{" "}
        <Code>Plumix.Cupertino</Code> for iOS-style ones — see the{" "}
        <Link to="/controls" className="text-primary-glow hover:text-primary">
          controls catalog
        </Link>{" "}
        for what ships in each.
      </p>

      <h2 id="first-app" className="mt-12 scroll-mt-24 text-2xl font-semibold flex items-center gap-2">
        <Boxes className="h-5 w-5 text-primary-glow" /> Your first app
      </h2>
      <p className="mt-3 text-muted-foreground">
        The template puts the widgets in a shared project. Compose a simple Material scaffold
        there:
      </p>
      <div className="mt-4">
        <CodeBlock code={appCode} language="csharp" filename="MyApp.cs" />
      </div>
      <p className="mt-3 text-muted-foreground">
        Each platform project is a thin host that only creates the root widget:
      </p>
      <div className="mt-4">
        <CodeBlock code={hostsCode} language="csharp" filename="hosts" />
      </div>
      <p className="mt-3 text-muted-foreground">
        Run the desktop project with <Code>dotnet watch</Code> rather than <Code>dotnet run</Code>.
        Hot reload preserves <Code>State</Code> across edits, so counters and scroll positions
        survive while the widget tree rebuilds — the workflow Flutter developers expect. Start the
        mobile projects with <Code>dotnet build -t:Run</Code>.
      </p>
      <p className="mt-3 text-muted-foreground">
        The Android and iOS hosts are ports of Flutter's engine embeddings — text input, keyboard,
        accessibility, platform channels, state restoration — without Avalonia.{" "}
        <Code>Plumix.Avalonia.Android</Code> still provides an Avalonia-based Android host for apps
        that need it.
      </p>

      <h2 id="next" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        Where to go next
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link
          to="/docs/architecture"
          className="card-surface rounded-lg p-5 hover:border-primary/40 transition-colors"
        >
          <div className="text-sm font-mono text-primary-glow">Architecture</div>
          <div className="mt-1 font-medium">Widget · Element · RenderObject</div>
          <p className="mt-1 text-sm text-muted-foreground">
            How the three trees relate, and when an element updates versus recreates.
          </p>
        </Link>
        <Link
          to="/docs/state"
          className="card-surface rounded-lg p-5 hover:border-primary/40 transition-colors"
        >
          <div className="text-sm font-mono text-primary-glow">Stateful widgets</div>
          <div className="mt-1 font-medium">State&lt;T&gt; and SetState</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Where mutable state lives and how a rebuild is triggered.
          </p>
        </Link>
        <Link
          to="/docs/layout"
          className="card-surface rounded-lg p-5 hover:border-primary/40 transition-colors"
        >
          <div className="text-sm font-mono text-primary-glow">Layout protocol</div>
          <div className="mt-1 font-medium">Constraints down, sizes up</div>
          <p className="mt-1 text-sm text-muted-foreground">
            The single-pass layout walk, identical to Flutter's.
          </p>
        </Link>
        <Link
          to="/changelog"
          className="card-surface rounded-lg p-5 hover:border-primary/40 transition-colors"
        >
          <div className="text-sm font-mono text-primary-glow">Changelog</div>
          <div className="mt-1 font-medium">Track releases</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Versioned history, including documented divergences from Flutter.
          </p>
        </Link>
      </div>
    </DocsLayout>
  );
};

export default Docs;
