import { Link } from "react-router-dom";
import { Boxes, Layers, Wrench } from "lucide-react";
import { Seo } from "@/components/Seo";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Code, DocsLayout } from "@/components/site/DocsLayout";

const setupCode = `dotnet new console -n HelloPlumix
cd HelloPlumix
dotnet add package Plumix --prerelease
dotnet add package Plumix.Material --prerelease
dotnet add package Avalonia.Desktop`;

const appCode = `using Avalonia;
using Plumix;
using Plumix.Material;
using Plumix.Widgets;

public sealed class HelloApp : StatelessWidget
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

// The Avalonia application that hosts the widget tree.
public sealed class App : PlumixApplication
{
    protected override Widget CreateRootWidget() => new HelloApp();

    protected override PlumixOptions CreateOptions() => new() { Title = "Hello, Plumix" };
}

public static class Program
{
    [STAThread]
    public static void Main(string[] args) => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .StartWithClassicDesktopLifetime(args);
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
        Avalonia provides the platform host — window, input events, GPU-backed surface. Everything
        above that surface is owned by Plumix, which is what separates it from a wrapper library:
        there is no second control set underneath translating your widgets into someone else's
        layout system.
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
        Plumix targets <Code>net10.0</Code>, so you need the .NET 10 SDK. Create a console app and
        add the packages — they are in beta, hence <Code>--prerelease</Code>.{" "}
        <Code>Avalonia.Desktop</Code> provides the window on Windows, macOS and Linux:
      </p>
      <div className="mt-4">
        <CodeBlock code={setupCode} language="bash" filename="terminal" />
      </div>
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
        Compose a simple Material scaffold, then hand it to a <Code>PlumixApplication</Code>: an
        Avalonia application whose only job is to create the root widget. Avalonia's{" "}
        <Code>AppBuilder</Code> opens the window, and Plumix mounts the widget tree into it.
      </p>
      <div className="mt-4">
        <CodeBlock code={appCode} language="csharp" filename="Program.cs" />
      </div>
      <p className="mt-3 text-muted-foreground">
        Run it with <Code>dotnet watch</Code> rather than <Code>dotnet run</Code>. Hot reload
        preserves <Code>State</Code> across edits, so counters and scroll positions survive while the
        widget tree rebuilds — the workflow Flutter developers expect.
      </p>
      <p className="mt-3 text-muted-foreground">
        The same widget tree runs on mobile and in the browser: <Code>Plumix.Android</Code> ships{" "}
        <Code>PlumixMainActivity</Code> for Android, and the repository contains iOS and WebAssembly
        sample hosts. These hosts are in beta — cross-host stability is the current milestone on the{" "}
        <a
          href="https://github.com/Plumix-Net/Plumix/blob/main/docs/FRAMEWORK_PLAN.md"
          className="text-primary-glow hover:text-primary"
          target="_blank"
          rel="noreferrer"
        >
          roadmap
        </a>
        .
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
