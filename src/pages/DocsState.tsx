import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Code, DocsLayout } from "@/components/site/DocsLayout";

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

const lifecycleCode = `internal sealed class _FeedState : State<Feed>
{
    public override void InitState()
    {
        base.InitState();
        // Runs once, before the first Build.
    }

    public override void DidUpdateWidget(Feed oldWidget)
    {
        base.DidUpdateWidget(oldWidget);
        // The parent rebuilt with a new widget; this State survived.
        if (oldWidget.Url != Widget.Url) Reload();
    }

    public override void Dispose()
    {
        // Element is leaving the tree — release subscriptions here.
        base.Dispose();
    }
}`;

const DocsState = () => {
  return (
    <DocsLayout
      path="/docs/state"
      title="Stateful widgets"
      intro={
        <>
          Widgets are immutable, so mutable data lives one level down — in a{" "}
          <Code>State&lt;T&gt;</Code> object owned by the element rather than by the widget.
        </>
      }
    >
      <Seo path="/docs/state" />

      <h2 id="setstate" className="mt-14 scroll-mt-24 text-2xl font-semibold">
        State&lt;T&gt; and SetState
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        A <Code>StatefulWidget</Code> is still an immutable description. What persists across
        rebuilds is the <Code>State&lt;T&gt;</Code> it creates. Calling <Code>SetState</Code> mutates
        your fields and marks the element dirty; the framework rebuilds it on the next frame.
      </p>
      <div className="mt-4">
        <CodeBlock code={stateCode} language="csharp" filename="Counter.cs" />
      </div>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Mutating a field without <Code>SetState</Code> changes your data but never schedules a
        rebuild — the same footgun as in Flutter, with the same fix.
      </p>

      <h2 id="lifecycle" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        Lifecycle hooks
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Because the element decides whether to update or recreate, a <Code>State</Code> can outlive
        many widget instances. The hooks below tell you which is happening.
      </p>
      <div className="mt-4">
        <CodeBlock code={lifecycleCode} language="csharp" filename="FeedState.cs" />
      </div>
      <ul className="mt-4 space-y-2.5 text-muted-foreground">
        <li className="leading-relaxed">
          <Code>InitState</Code> — once per State, before the first build.
        </li>
        <li className="leading-relaxed">
          <Code>DidUpdateWidget</Code> — the parent rebuilt and supplied a new widget of the same
          type and key; compare old and new to decide what to refresh.
        </li>
        <li className="leading-relaxed">
          <Code>Dispose</Code> — the element is unmounted; release timers, subscriptions and
          handles here.
        </li>
      </ul>

      <h2 id="hot-reload" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        Hot reload keeps your state
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Running under <Code>dotnet watch</Code>, an edit rebuilds the widget tree while existing{" "}
        <Code>State</Code> objects stay alive. Counters keep counting, scroll positions hold, and
        you land back on the same screen instead of restarting the app and navigating there again.
      </p>

      <h2 id="inherited" className="mt-12 scroll-mt-24 text-2xl font-semibold">
        Sharing state down the tree
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        For data many widgets need — a theme, a locale, a signed-in user —{" "}
        <Code>InheritedWidget</Code> propagates values downward with dependency tracking, so only the
        elements that actually read the value rebuild when it changes. It is listed in the{" "}
        <Link to="/controls/core" className="text-primary-glow hover:text-primary">
          core widget catalog
        </Link>{" "}
        alongside the rest of the foundational set.
      </p>
    </DocsLayout>
  );
};

export default DocsState;
