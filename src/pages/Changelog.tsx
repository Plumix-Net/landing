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
    date: "2026-04-25",
    tag: "Pre-release",
    title: "M4 — Material library rewrite (in progress)",
    changes: [
      { type: "added", text: "Scaffold and AppBar with full Flutter-like slot API (leading, actions, centerTitle, titleSpacing, toolbar height, icon themes, text styles)." },
      { type: "added", text: "TextButton, ElevatedButton, OutlinedButton, FilledButton (+ FilledButton.Tonal) with state-layer overlays, hover/focus/pressed visuals, ripple, and keyboard activation." },
      { type: "added", text: "Card (elevated/filled/outlined) with M3 surface-tint, clipping, elevation, and CardTheme." },
      { type: "added", text: "ListTile with one/two/three-line composition, M3 density heights, selected/disabled states, and ListTileTheme." },
      { type: "added", text: "Drawer and DrawerTheme with edge-drag open, velocity-aware settle animation, and end-drawer mutual exclusion." },
      { type: "added", text: "FloatingActionButton (regular/small/large/extended) with tooltip, hero tag, cursor, feedback, and FAB-theme surface." },
      { type: "added", text: "BottomNavigationBar (fixed/shifting) with animated tile-width/label/icon transitions, shifting radial background, and BottomNavigationBarTheme." },
      { type: "added", text: "Switch, Checkbox, Radio — each with dedicated theming, state-aware M3 defaults, keyboard activation, and Switch.Adaptive/Checkbox.Adaptive/Radio.Adaptive Cupertino paths." },
      { type: "added", text: "Tooltip primitive wired to BottomNavigationBar items and FAB." },
      { type: "added", text: "Hero transitions: push/pop flight choreography, flightShuttleBuilder, placeholderBuilder, HeroMode, transitionOnUserGestures, and nested-navigator hero candidates." },
      { type: "added", text: "Material localization primitives (MaterialLocalizations, DefaultMaterialLocalizations)." },
      { type: "added", text: "CupertinoCheckbox and CupertinoRadio with Cupertino-like geometry, dark-mode gradient fill, and vector indicator paths." },
      { type: "changed", text: "ThemeData expanded with M3 token surface: PrimaryContainerColor, SecondaryContainerColor, OnSurfaceColor, OutlineColor, and dedicated theme objects for all new controls." },
      { type: "fixed", text: "Material button ripple clipping now relies on surrounding ClipRRect instead of an extra internal clip, matching Flutter behavior." },
      { type: "fixed", text: "RenderAlign unbounded-axis sizing now shrink-wraps correctly, eliminating ListTile demo overflow stripes." },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-03-11",
    title: "M3 — Port-first widget set expansion",
    changes: [
      { type: "added", text: "Stack and Positioned over RenderStack/StackParentData." },
      { type: "added", text: "Opacity, Transform, ClipRect proxy widget wrappers." },
      { type: "added", text: "Align and Center over new RenderAlign with width/height shrink factors." },
      { type: "added", text: "DecoratedBox, BoxDecoration, BorderSide, BorderRadius." },
      { type: "added", text: "AspectRatio and Spacer (flex gap helper)." },
      { type: "added", text: "FractionallySizedBox, FittedBox (BoxFit semantics with transform-aware hit-test)." },
      { type: "added", text: "UnconstrainedBox, LimitedBox, OverflowBox, SizedOverflowBox, Offstage." },
      { type: "changed", text: "Text now wires textAlign, softWrap, maxLines, overflow, textDirection, fontWeight, fontStyle, height, and letterSpacing." },
      { type: "changed", text: "DefaultTextStyle and TextStyle inheritance: Text resolves font family/size/color/weight/style from ancestor with local override precedence." },
      { type: "changed", text: "RenderFlex paints Flutter-style yellow/black overflow indicators with clipped child paint." },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-03-10",
    title: "M2 — Input, focus & accessibility",
    changes: [
      { type: "added", text: "FocusNode, FocusManager, Focus, and FocusScope with geometry-aware directional traversal." },
      { type: "added", text: "EditableText with TextEditingController, selection, clipboard (Ctrl/Meta+C/X/V), word/paragraph shortcuts, and grapheme-aware caret." },
      { type: "added", text: "Host-native IME preedit bridge and surrounding-text sync for composition flows." },
      { type: "added", text: "Pointer router, gesture arena, and GestureDetector (tap, double-tap, long-press, pan/drag, hover enter/exit)." },
      { type: "added", text: "Host accessibility bridge: SemanticsRoot, SemanticsUpdated event, and action dispatch API." },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-03-10",
    title: "M1 — Core parity hardening",
    changes: [
      { type: "added", text: "Widget → Element → RenderObject pipeline with diff-based reconciliation and build scheduling." },
      { type: "added", text: "BoxConstraints / Size layout protocol; PipelineOwner with layout, compositing, paint, and semantics phases." },
      { type: "added", text: "State, SetState, BuildOwner stateful lifecycle." },
      { type: "added", text: "InheritedWidget, InheritedModel, and InheritedNotifier propagation and dependency tracking." },
      { type: "added", text: "Layer tree primitives: offset, opacity, transform, clip, and picture layers." },
      { type: "added", text: "Navigator with named routes, route observers, and back-handling." },
      { type: "added", text: "Scroll/sliver stack: Scrollable, Viewport, SliverList, SliverGrid, keep-alive, and scroll notifications." },
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
