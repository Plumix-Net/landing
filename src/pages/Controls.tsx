import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/Seo";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

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
  { name: "ButtonBar", category: "Material", desc: "Aligns action buttons in a row with automatic column overflow and spacing.", flutter: "ButtonBar" },
  { name: "RefreshIndicator", category: "Material", desc: "Pull-to-refresh wrapper with Material arrowhead/spinner animation and adaptive variants.", flutter: "RefreshIndicator" },
  { name: "Stepper", category: "Material", desc: "Vertical or horizontal step-by-step flow with per-step state icons and connectors.", flutter: "Stepper" },
  { name: "DropdownButton", category: "Material", desc: "Tap-to-open selection list anchored to a button, with hint, disabled, and dense states.", flutter: "DropdownButton" },
  { name: "PopupMenuButton", category: "Material", desc: "Anchored popup menu with items, dividers, and checked entries.", flutter: "PopupMenuButton" },
  { name: "DataTable", category: "Material", desc: "Sortable rows and columns with header/data row styling and selection.", flutter: "DataTable" },
  { name: "AboutDialog", category: "Material", desc: "Application info dialog with an OSS license browser via LicensePage.", flutter: "AboutDialog" },

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

/**
 * Each category is its own indexable URL with its own copy, so the catalog is
 * four crawlable pages rather than one page behind a JavaScript filter.
 */
const VIEWS = {
  all: {
    path: "/controls",
    category: null as Category | null,
    eyebrow: "API Reference",
    heading: "Controls catalog",
    intro: "Every widget shipped across the Plumix packages. Names match Flutter where possible — because porting should feel like translation.",
    body: null as string | null,
  },
  core: {
    path: "/controls/core",
    category: "Core" as Category,
    eyebrow: "Plumix core",
    heading: "Core widgets",
    intro: "The foundational widget set in the Plumix package — layout, text, gestures, focus and scrolling.",
    body: "These are the widgets every Plumix app is built from, and the ones that sit closest to the render tree. Layout boxes such as Row, Column, Stack and the constraint-manipulating boxes implement the constraints-down, sizes-up protocol directly; GestureDetector feeds the gesture arena; Focus and Semantics wire up keyboard traversal and accessibility. Nothing here depends on Material or Cupertino, so a core-only app ships without either design system.",
  },
  material: {
    path: "/controls/material",
    category: "Material" as Category,
    eyebrow: "Plumix.Material",
    heading: "Material Design controls",
    intro: "Material Design 3 controls for C# desktop apps, ported from Flutter's Material library.",
    body: "Plumix.Material layers an app shell and a full control set on top of the core widgets: Scaffold with app bar, drawers and FAB; the four button emphases; cards, list tiles, data tables and steppers. Theming flows through ThemeData with M3 colour and typography tokens, and state layers, ripples and Hero transitions behave as they do in Flutter. Several controls expose Adaptive variants that switch to the Cupertino path on iOS and macOS.",
  },
  cupertino: {
    path: "/controls/cupertino",
    category: "Cupertino" as Category,
    eyebrow: "Plumix.Cupertino",
    heading: "Cupertino controls",
    intro: "iOS-style controls that give a C# desktop app an Apple-platform look, following Flutter's Cupertino defaults.",
    body: "Plumix.Cupertino provides the iOS-flavoured half of the adaptive story: Cupertino geometry, brightness-aware colours and the drag thresholds Apple's controls use. You can adopt these widgets directly, or reach them through the Adaptive variants on Switch, Checkbox and Radio in Plumix.Material, which select the Cupertino path automatically on iOS and macOS.",
  },
} as const;

type ViewKey = keyof typeof VIEWS;

const Controls = () => {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const [query, setQuery] = useState("");

  const key = (categoryParam?.toLowerCase() ?? "all") as ViewKey;
  const view = VIEWS[key];

  // /controls/<anything-else> is not a real category — don't serve it a 200 page
  // that canonicalises to /controls.
  if (!view) return <NotFound />;

  const filtered = controls.filter((c) => {
    if (view.category && c.category !== view.category) return false;
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
      <Seo path={view.path} />
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary-glow"
          >
            {view.category ? (
              <>
                <Link to="/controls" className="hover:text-primary">
                  Controls
                </Link>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{view.eyebrow}</span>
              </>
            ) : (
              <span>{view.eyebrow}</span>
            )}
          </nav>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">{view.heading}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{view.intro}</p>
          {view.body && (
            <p className="mt-4 text-muted-foreground leading-relaxed">{view.body}</p>
          )}
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["all", "core", "material", "cupertino"] as const).map((k) => (
              <Link
                key={k}
                to={VIEWS[k].path}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  key === k
                    ? "border-primary/60 bg-primary/15 text-foreground"
                    : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                {VIEWS[k].category ?? "All"}
                <span className="font-mono text-xs text-muted-foreground">
                  {counts[VIEWS[k].category ?? "All"]}
                </span>
              </Link>
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
