import { SiteLayout } from "@/components/site/SiteLayout";
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Core" | "Material" | "Cupertino";

interface Control {
  name: string;
  category: Category;
  desc: string;
  flutter: string;
}

const controls: Control[] = [
  // Core
  { name: "Container", category: "Core", desc: "Box with padding, margin, background, and decoration.", flutter: "Container" },
  { name: "Row", category: "Core", desc: "Lays out children horizontally using flex constraints.", flutter: "Row" },
  { name: "Column", category: "Core", desc: "Lays out children vertically using flex constraints.", flutter: "Column" },
  { name: "Stack", category: "Core", desc: "Positions children on top of one another.", flutter: "Stack" },
  { name: "Positioned", category: "Core", desc: "Places a child at explicit insets within a Stack.", flutter: "Positioned" },
  { name: "Text", category: "Core", desc: "Renders a styled text run with full typography and overflow support.", flutter: "Text" },
  { name: "SizedBox", category: "Core", desc: "Fixed-size box used for spacing or sizing children.", flutter: "SizedBox" },
  { name: "Padding", category: "Core", desc: "Insets a child by EdgeInsets.", flutter: "Padding" },
  { name: "Align", category: "Core", desc: "Aligns a child within itself with optional shrink-wrap factors.", flutter: "Align" },
  { name: "Center", category: "Core", desc: "Centers a child along both axes.", flutter: "Center" },
  { name: "Expanded", category: "Core", desc: "Expands a child of a Row/Column to fill available space.", flutter: "Expanded" },
  { name: "Flexible", category: "Core", desc: "Loosens a child's flex along the main axis.", flutter: "Flexible" },
  { name: "Spacer", category: "Core", desc: "Flex gap helper that fills remaining space in a Row/Column.", flutter: "Spacer" },
  { name: "SingleChildScrollView", category: "Core", desc: "Scrollable wrapper for a single child.", flutter: "SingleChildScrollView" },
  { name: "ListView", category: "Core", desc: "Scrollable, viewport-driven list via sliver pipeline.", flutter: "ListView" },
  { name: "GestureDetector", category: "Core", desc: "Detects taps, double-taps, long-press, pan, and hover via gesture arena.", flutter: "GestureDetector" },
  { name: "Image", category: "Core", desc: "Displays a raster or vector image.", flutter: "Image" },
  { name: "Opacity", category: "Core", desc: "Applies an opacity to its child.", flutter: "Opacity" },
  { name: "Transform", category: "Core", desc: "Applies a transformation matrix before painting.", flutter: "Transform" },
  { name: "ClipRect", category: "Core", desc: "Clips its child to a rectangle.", flutter: "ClipRect" },
  { name: "ClipRRect", category: "Core", desc: "Clips its child to a rounded rectangle.", flutter: "ClipRRect" },
  { name: "DecoratedBox", category: "Core", desc: "Paints a BoxDecoration before or after its child.", flutter: "DecoratedBox" },
  { name: "AspectRatio", category: "Core", desc: "Sizes its child to a specific aspect ratio.", flutter: "AspectRatio" },
  { name: "FractionallySizedBox", category: "Core", desc: "Sizes its child as a fraction of available space.", flutter: "FractionallySizedBox" },
  { name: "FittedBox", category: "Core", desc: "Scales and positions its child using BoxFit semantics.", flutter: "FittedBox" },
  { name: "UnconstrainedBox", category: "Core", desc: "Passes unconstrained layout to its child along selected axes.", flutter: "UnconstrainedBox" },
  { name: "LimitedBox", category: "Core", desc: "Applies max-size clamping only on unbounded axes.", flutter: "LimitedBox" },
  { name: "OverflowBox", category: "Core", desc: "Overrides min/max constraints passed to its child.", flutter: "OverflowBox" },
  { name: "Offstage", category: "Core", desc: "Lays out its child but hides paint, hit-test, and semantics.", flutter: "Offstage" },
  { name: "Focus", category: "Core", desc: "Manages a FocusNode and handles keyboard events.", flutter: "Focus" },
  { name: "FocusScope", category: "Core", desc: "Groups focus nodes and constrains Tab traversal.", flutter: "FocusScope" },
  { name: "EditableText", category: "Core", desc: "Low-level editable text field with controller, IME, and clipboard.", flutter: "EditableText" },
  { name: "Hero", category: "Core", desc: "Shared-element transition between routes via flight choreography.", flutter: "Hero" },
  { name: "HeroMode", category: "Core", desc: "Enables or disables Hero transitions in a subtree.", flutter: "HeroMode" },
  { name: "Semantics", category: "Core", desc: "Annotates the render tree with accessibility metadata and actions.", flutter: "Semantics" },
  { name: "InheritedWidget", category: "Core", desc: "Propagates data down the tree with dependency tracking.", flutter: "InheritedWidget" },
  { name: "Navigator", category: "Core", desc: "Manages a stack of routes with named routing and observers.", flutter: "Navigator" },

  // Material
  { name: "Theme", category: "Material", desc: "Propagates ThemeData (M3 tokens, colors, text styles) to descendants.", flutter: "Theme" },
  { name: "Scaffold", category: "Material", desc: "App shell with body, app bar, drawers, FAB, and bottom nav bar.", flutter: "Scaffold" },
  { name: "AppBar", category: "Material", desc: "Top bar with title, leading, actions, toolbar height, and icon themes.", flutter: "AppBar" },
  { name: "ElevatedButton", category: "Material", desc: "Filled button with elevation, ripple, hover/focus state layers.", flutter: "ElevatedButton" },
  { name: "TextButton", category: "Material", desc: "Flat, low-emphasis button with state-layer overlays.", flutter: "TextButton" },
  { name: "OutlinedButton", category: "Material", desc: "Bordered, medium-emphasis button with outline token defaults.", flutter: "OutlinedButton" },
  { name: "FilledButton", category: "Material", desc: "High-emphasis filled button; FilledButton.Tonal for secondary emphasis.", flutter: "FilledButton" },
  { name: "Card", category: "Material", desc: "Material surface with elevated/filled/outlined variants, tint, and clipping.", flutter: "Card" },
  { name: "ListTile", category: "Material", desc: "One/two/three-line tile with leading, title, subtitle, trailing, and M3 heights.", flutter: "ListTile" },
  { name: "Drawer", category: "Material", desc: "Side panel with edge-drag open, velocity settle, and DrawerTheme.", flutter: "Drawer" },
  { name: "FloatingActionButton", category: "Material", desc: "Circular/extended FAB with variants, tooltip, hero tag, and cursor.", flutter: "FloatingActionButton" },
  { name: "BottomNavigationBar", category: "Material", desc: "Fixed or shifting bottom tabs with animated label/icon/width transitions.", flutter: "BottomNavigationBar" },
  { name: "Switch", category: "Material", desc: "Material on/off toggle; Switch.Adaptive uses Cupertino path on iOS/macOS.", flutter: "Switch" },
  { name: "Checkbox", category: "Material", desc: "Material checkbox with tristate; Checkbox.Adaptive uses CupertinoCheckbox.", flutter: "Checkbox" },
  { name: "Radio", category: "Material", desc: "Material radio button; Radio.Adaptive uses CupertinoRadio on iOS/macOS.", flutter: "Radio" },
  { name: "Tooltip", category: "Material", desc: "Hover-triggered label overlay used by FAB and navigation bar tiles.", flutter: "Tooltip" },

  // Cupertino
  { name: "CupertinoCheckbox", category: "Cupertino", desc: "iOS-style checkbox with Cupertino geometry, dark-mode gradient fill, and vector check indicator.", flutter: "CupertinoCheckbox" },
  { name: "CupertinoRadio", category: "Cupertino", desc: "iOS-style radio button with Cupertino defaults, brightness-aware colors, and focus/pressed visuals.", flutter: "CupertinoRadio" },
  { name: "CupertinoSwitch", category: "Cupertino", desc: "iOS-styled on/off toggle via Switch.Adaptive with Cupertino drag thresholds.", flutter: "CupertinoSwitch" },
  { name: "CupertinoNavigationBar", category: "Cupertino", desc: "iOS-style top navigation bar.", flutter: "CupertinoNavigationBar" },
  { name: "CupertinoButton", category: "Cupertino", desc: "iOS-styled tappable button.", flutter: "CupertinoButton" },
  { name: "CupertinoActivityIndicator", category: "Cupertino", desc: "iOS-styled spinner.", flutter: "CupertinoActivityIndicator" },
  { name: "CupertinoAlertDialog", category: "Cupertino", desc: "iOS-styled modal alert.", flutter: "CupertinoAlertDialog" },
];

const categories: Category[] = ["Core", "Material", "Cupertino"];

const Controls = () => {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = controls.filter((c) => {
    if (active !== "All" && c.category !== active) return false;
    if (query && !`${c.name} ${c.desc}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const counts = {
    All: controls.length,
    Core: controls.filter((c) => c.category === "Core").length,
    Material: controls.filter((c) => c.category === "Material").length,
    Cupertino: controls.filter((c) => c.category === "Cupertino").length,
  };

  return (
    <SiteLayout>
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">
            API Reference
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Controls catalog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Every widget shipped across the Plumix packages. Names match Flutter where possible —
            because porting should feel like translation.
          </p>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  active === c
                    ? "border-primary/60 bg-primary/15 text-foreground"
                    : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                {c}
                <span className="font-mono text-xs text-muted-foreground">
                  {counts[c]}
                </span>
              </button>
            ))}
          </div>
          <div className="relative md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search widgets…"
              className="w-full rounded-lg border border-border bg-secondary/30 pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <div
              key={c.name}
              className="card-surface rounded-xl p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-medium text-foreground">{c.name}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-wider rounded-full px-2 py-0.5 border",
                    c.category === "Core" && "border-primary/30 text-primary-glow bg-primary/10",
                    c.category === "Material" && "border-status-progress/30 text-status-progress bg-status-progress/10",
                    c.category === "Cupertino" && "border-status-done/30 text-status-done bg-status-done/10"
                  )}
                >
                  {c.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              <div className="mt-3 text-xs text-muted-foreground">
                Flutter equivalent: <span className="font-mono text-foreground/80">{c.flutter}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No widgets match your search.
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Controls;
