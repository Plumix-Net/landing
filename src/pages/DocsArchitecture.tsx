import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Code, DocsLayout } from "@/components/site/DocsLayout";

const elementCode = `// A widget is a description, not an instance. Creating one is cheap —
// the framework decides whether it needs a new element behind it.
public sealed class Badge : StatelessWidget
{
    public Badge(string label) => Label = label;

    public string Label { get; }

    public override Widget Build(BuildContext context) =>
        new Container(
            padding: new Thickness(8, 4),
            child: new Text(Label)
        );
}`;

const trees = [
  {
    name: "Widget",
    role: "Immutable configuration",
    detail:
      "A plain, throwaway description of what the UI should look like. Rebuilt constantly; never holds mutable state.",
  },
  {
    name: "Element",
    role: "Mutable instance, owns lifecycle",
    detail:
      "Long-lived. Holds the position in the tree, the BuildContext, and any State. Decides whether an incoming widget updates it in place or replaces it.",
  },
  {
    name: "RenderObject",
    role: "Layout, paint, hit-test",
    detail:
      "Does the actual geometric work. Receives constraints, reports a size, paints into the layer tree, and answers hit-tests.",
  },
];

const DocsArchitecture = () => {
  return (
    <DocsLayout
      path="/docs/architecture"
      title="Widget, Element, RenderObject"
      intro={
        <>
          Plumix ports Flutter's three-tree architecture to .NET rather than approximating it. This
          page explains what each tree is responsible for, and why the split matters when you write
          or port a control.
        </>
      }
    >
      <Seo path="/docs/architecture" />

      <h2 id="three-trees" className="mt-14 scroll-mt-24 text-2xl font-semibold">
        Three trees, three jobs
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Most UI frameworks have one tree of long-lived, mutable control objects. Flutter — and
        therefore Plumix — splits that responsibility three ways, which is what makes rebuilding the
        entire UI on every state change affordable.
      </p>
      <div className="mt-6 space-y-3">
        {trees.map((t) => (
          <div key={t.name} className="card-surface rounded-xl p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-mono text-primary-glow">{t.name}</h3>
              <span className="text-sm font-medium">{t.role}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.detail}</p>
          </div>
        ))}
      </div>

      <h2 id="widgets" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        Widgets are cheap descriptions
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Because a widget is immutable and holds no lifecycle, constructing one costs almost nothing.
        You are allowed to rebuild large subtrees on every frame; the framework diffs the result
        against the element tree and only touches what actually changed.
      </p>
      <div className="mt-4">
        <CodeBlock code={elementCode} language="csharp" filename="Badge.cs" />
      </div>

      <h2 id="reconciliation" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        Update or recreate
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Each widget produces an element via <Code>CreateElement()</Code>. When a parent rebuilds, the
        existing element compares the new widget against the old one and takes one of two paths:
      </p>
      <ul className="mt-4 space-y-2.5 text-muted-foreground">
        <li className="leading-relaxed">
          <strong className="text-foreground">Update in place</strong> — the runtime type and{" "}
          <Code>Key</Code> match. The element keeps its identity, its <Code>State</Code> and its
          render object, and only the changed properties propagate downward.
        </li>
        <li className="leading-relaxed">
          <strong className="text-foreground">Recreate</strong> — the type or key differs. The old
          element is unmounted, its state disposed, and a fresh subtree is built.
        </li>
      </ul>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        This is why keys matter when reordering a list: without them, position alone decides
        matching, and state follows the slot rather than the item.
      </p>

      <h2 id="render-objects" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        Where Avalonia fits
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Avalonia is used as infrastructure, not as a UI layer. It supplies the window, the platform
        lifecycle, raw input events and a GPU-backed drawing surface. Once a frame begins, the
        measure, arrange and paint decisions are made entirely by Plumix render objects — so a
        control ported from Flutter lays out the way its Flutter original does, not the way an
        equivalent Avalonia control would.
      </p>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Continue with the{" "}
        <Link to="/docs/layout" className="text-primary-glow hover:text-primary">
          layout protocol
        </Link>{" "}
        to see how constraints and sizes flow through that render tree, or{" "}
        <Link to="/docs/state" className="text-primary-glow hover:text-primary">
          stateful widgets
        </Link>{" "}
        for where mutable data lives.
      </p>
    </DocsLayout>
  );
};

export default DocsArchitecture;
