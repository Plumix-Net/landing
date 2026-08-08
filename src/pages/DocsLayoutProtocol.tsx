import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Code, DocsLayout } from "@/components/site/DocsLayout";

const constraintsCode = `// A parent hands down constraints; the child answers with a size.
protected override Size PerformLayout(BoxConstraints constraints)
{
    var childConstraints = constraints.Deflate(Padding);
    var childSize = Child.Layout(childConstraints, parentUsesSize: true);

    Child.ParentData.Offset = new Offset(Padding.Left, Padding.Top);

    return constraints.Constrain(
        new Size(
            childSize.Width + Padding.Horizontal,
            childSize.Height + Padding.Vertical
        )
    );
}`;

const DocsLayoutProtocol = () => {
  return (
    <DocsLayout
      path="/docs/layout"
      title="Layout protocol"
      intro={
        <>
          Layout in Plumix is a single-pass walk: <strong className="text-foreground">constraints
          go down, sizes come up, the parent sets positions</strong>. It is Flutter's protocol,
          unchanged.
        </>
      }
    >
      <Seo path="/docs/layout" />

      <h2 id="one-pass" className="mt-14 scroll-mt-24 text-2xl font-semibold">
        One pass, not a negotiation
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        A parent passes <Code>BoxConstraints</Code> — minimum and maximum width and height — to each
        child. The child picks a <Code>Size</Code> within those bounds and returns it. The parent
        then positions each child and reports its own size upward. No child ever asks its parent how
        much room it has; it is told, and it answers.
      </p>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Because there is exactly one downward and one upward step per render object, layout stays
        linear in the size of the tree. That property is what keeps rebuilding large subtrees on
        every state change practical.
      </p>

      <h2 id="constraints" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        Writing PerformLayout
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        A render object implements the protocol in <Code>PerformLayout</Code>: deflate the incoming
        constraints for whatever space you consume, lay the child out, position it, then return your
        own size constrained to what the parent allowed.
      </p>
      <div className="mt-4">
        <CodeBlock code={constraintsCode} language="csharp" filename="RenderPadding.cs" />
      </div>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Pass <Code>parentUsesSize: true</Code> only when your own size actually depends on the
        child's. It is the signal the framework uses to decide how far a relayout has to propagate.
      </p>

      <h2 id="bounded" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        Bounded and unbounded axes
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        An axis is unbounded when its maximum is infinite — inside a scroll view along the scroll
        direction, for example. A child that wants to fill available space has nothing to fill, which
        is the source of the familiar "unbounded constraints" error. The usual fixes are the same as
        in Flutter: give the child an intrinsic size, wrap it in a box that imposes one, or use{" "}
        <Code>Expanded</Code> only where the main axis is genuinely bounded.
      </p>

      <h2 id="paint" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        After layout: paint and hit-test
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Once sizes and offsets are settled, the render tree paints into layers, and hit-testing walks
        the same geometry in reverse to find which render object is under the pointer. Both phases
        belong to Plumix — Avalonia only supplies the surface that the finished frame is drawn onto,
        as described on the{" "}
        <Link to="/docs/architecture" className="text-primary-glow hover:text-primary">
          architecture page
        </Link>
        .
      </p>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        The{" "}
        <Link to="/controls/core" className="text-primary-glow hover:text-primary">
          core widgets
        </Link>{" "}
        list shows which boxes manipulate constraints directly — <Code>SizedBox</Code>,{" "}
        <Code>OverflowBox</Code>, <Code>LimitedBox</Code>, <Code>UnconstrainedBox</Code> and{" "}
        <Code>FractionallySizedBox</Code>.
      </p>
    </DocsLayout>
  );
};

export default DocsLayoutProtocol;
