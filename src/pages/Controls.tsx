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
  /** Section heading the card is listed under, in catalog order. */
  group: string;
  desc: string;
  flutter: string;
}

const controls: Control[] = [
  // Core
  { name: "Container", category: "Core", group: "Layout", desc: "Box with padding, margin, background, and decoration.", flutter: "Container" },
  { name: "Row", category: "Core", group: "Layout", desc: "Lays out children horizontally using flex constraints.", flutter: "Row" },
  { name: "Column", category: "Core", group: "Layout", desc: "Lays out children vertically using flex constraints.", flutter: "Column" },
  { name: "Stack", category: "Core", group: "Layout", desc: "Positions children on top of one another.", flutter: "Stack" },
  { name: "Positioned", category: "Core", group: "Layout", desc: "Places a child at explicit insets within a Stack.", flutter: "Positioned" },
  { name: "SizedBox", category: "Core", group: "Layout", desc: "Fixed-size box used for spacing or sizing children.", flutter: "SizedBox" },
  { name: "Padding", category: "Core", group: "Layout", desc: "Insets a child by EdgeInsets.", flutter: "Padding" },
  { name: "Align", category: "Core", group: "Layout", desc: "Aligns a child within itself with optional shrink-wrap factors.", flutter: "Align" },
  { name: "Center", category: "Core", group: "Layout", desc: "Centers a child along both axes.", flutter: "Center" },
  { name: "Expanded", category: "Core", group: "Layout", desc: "Expands a child of a Row/Column to fill available space.", flutter: "Expanded" },
  { name: "Flexible", category: "Core", group: "Layout", desc: "Loosens a child's flex along the main axis.", flutter: "Flexible" },
  { name: "Spacer", category: "Core", group: "Layout", desc: "Flex gap helper that fills remaining space in a Row/Column.", flutter: "Spacer" },
  { name: "AspectRatio", category: "Core", group: "Layout", desc: "Sizes its child to a specific aspect ratio.", flutter: "AspectRatio" },
  { name: "FractionallySizedBox", category: "Core", group: "Layout", desc: "Sizes its child as a fraction of available space.", flutter: "FractionallySizedBox" },
  { name: "FittedBox", category: "Core", group: "Layout", desc: "Scales and positions its child using BoxFit semantics.", flutter: "FittedBox" },
  { name: "UnconstrainedBox", category: "Core", group: "Layout", desc: "Passes unconstrained layout to its child along selected axes.", flutter: "UnconstrainedBox" },
  { name: "LimitedBox", category: "Core", group: "Layout", desc: "Applies max-size clamping only on unbounded axes.", flutter: "LimitedBox" },
  { name: "OverflowBox", category: "Core", group: "Layout", desc: "Overrides min/max constraints passed to its child.", flutter: "OverflowBox" },
  { name: "Offstage", category: "Core", group: "Layout", desc: "Lays out its child but hides paint, hit-test, and semantics.", flutter: "Offstage" },
  { name: "DecoratedBox", category: "Core", group: "Painting and effects", desc: "Paints a BoxDecoration before or after its child.", flutter: "DecoratedBox" },
  { name: "Image", category: "Core", group: "Painting and effects", desc: "Displays a raster or vector image.", flutter: "Image" },
  { name: "Opacity", category: "Core", group: "Painting and effects", desc: "Applies an opacity to its child.", flutter: "Opacity" },
  { name: "Transform", category: "Core", group: "Painting and effects", desc: "Applies a transformation matrix before painting.", flutter: "Transform" },
  { name: "ClipRect", category: "Core", group: "Painting and effects", desc: "Clips its child to a rectangle.", flutter: "ClipRect" },
  { name: "ClipRRect", category: "Core", group: "Painting and effects", desc: "Clips its child to a rounded rectangle.", flutter: "ClipRRect" },
  { name: "Text", category: "Core", group: "Text, input and focus", desc: "Renders a styled text run with full typography and overflow support.", flutter: "Text" },
  { name: "EditableText", category: "Core", group: "Text, input and focus", desc: "Low-level editable text field with controller, IME, and clipboard.", flutter: "EditableText" },
  { name: "GestureDetector", category: "Core", group: "Text, input and focus", desc: "Detects taps, double-taps, long-press, pan, and hover via gesture arena.", flutter: "GestureDetector" },
  { name: "Focus", category: "Core", group: "Text, input and focus", desc: "Manages a FocusNode and handles keyboard events.", flutter: "Focus" },
  { name: "FocusScope", category: "Core", group: "Text, input and focus", desc: "Groups focus nodes and constrains Tab traversal.", flutter: "FocusScope" },
  { name: "SingleChildScrollView", category: "Core", group: "Scrolling", desc: "Scrollable wrapper for a single child.", flutter: "SingleChildScrollView" },
  { name: "ListView", category: "Core", group: "Scrolling", desc: "Scrollable, viewport-driven list via sliver pipeline.", flutter: "ListView" },
  { name: "Navigator", category: "Core", group: "Navigation, data and accessibility", desc: "Manages a stack of routes with named routing and observers.", flutter: "Navigator" },
  { name: "Hero", category: "Core", group: "Navigation, data and accessibility", desc: "Shared-element transition between routes via flight choreography.", flutter: "Hero" },
  { name: "HeroMode", category: "Core", group: "Navigation, data and accessibility", desc: "Enables or disables Hero transitions in a subtree.", flutter: "HeroMode" },
  { name: "InheritedWidget", category: "Core", group: "Navigation, data and accessibility", desc: "Propagates data down the tree with dependency tracking.", flutter: "InheritedWidget" },
  { name: "Semantics", category: "Core", group: "Navigation, data and accessibility", desc: "Annotates the render tree with accessibility metadata and actions.", flutter: "Semantics" },
  // Material
  { name: "Theme", category: "Material", group: "App structure and navigation", desc: "Propagates ThemeData (M3 tokens, colors, text styles) to descendants.", flutter: "Theme" },
  { name: "Scaffold", category: "Material", group: "App structure and navigation", desc: "App shell with body, app bar, drawers, FAB, and bottom nav bar.", flutter: "Scaffold" },
  { name: "AppBar", category: "Material", group: "App structure and navigation", desc: "Top bar with title, leading, actions, toolbar height, and icon themes.", flutter: "AppBar" },
  { name: "SliverAppBar", category: "Material", group: "App structure and navigation", desc: "App bar that scrolls, floats, pins and stretches inside a CustomScrollView.", flutter: "SliverAppBar" },
  { name: "Drawer", category: "Material", group: "App structure and navigation", desc: "Side panel with edge-drag open, velocity settle, and DrawerTheme.", flutter: "Drawer" },
  { name: "BottomNavigationBar", category: "Material", group: "App structure and navigation", desc: "Fixed or shifting bottom tabs with animated label/icon/width transitions.", flutter: "BottomNavigationBar" },
  { name: "NavigationBar", category: "Material", group: "App structure and navigation", desc: "Material 3 bottom navigation with indicator pill and label behaviours.", flutter: "NavigationBar" },
  { name: "NavigationRail", category: "Material", group: "App structure and navigation", desc: "Side navigation for wide layouts, with extended and compact modes.", flutter: "NavigationRail" },
  { name: "TabBar", category: "Material", group: "App structure and navigation", desc: "Primary and secondary tabs driven by a TabController.", flutter: "TabBar" },
  { name: "ElevatedButton", category: "Material", group: "Buttons and menus", desc: "Filled button with elevation, ripple, hover/focus state layers.", flutter: "ElevatedButton" },
  { name: "FilledButton", category: "Material", group: "Buttons and menus", desc: "High-emphasis filled button; FilledButton.Tonal for secondary emphasis.", flutter: "FilledButton" },
  { name: "OutlinedButton", category: "Material", group: "Buttons and menus", desc: "Bordered, medium-emphasis button with outline token defaults.", flutter: "OutlinedButton" },
  { name: "TextButton", category: "Material", group: "Buttons and menus", desc: "Flat, low-emphasis button with state-layer overlays.", flutter: "TextButton" },
  { name: "FloatingActionButton", category: "Material", group: "Buttons and menus", desc: "Circular/extended FAB with variants, tooltip, hero tag, and cursor.", flutter: "FloatingActionButton" },
  { name: "SegmentedButton", category: "Material", group: "Buttons and menus", desc: "Single- or multi-select segmented control from Material 3.", flutter: "SegmentedButton" },
  { name: "ButtonBar", category: "Material", group: "Buttons and menus", desc: "Aligns action buttons in a row with automatic column overflow and spacing.", flutter: "ButtonBar" },
  { name: "DropdownButton", category: "Material", group: "Buttons and menus", desc: "Tap-to-open selection list anchored to a button, with hint, disabled, and dense states.", flutter: "DropdownButton" },
  { name: "PopupMenuButton", category: "Material", group: "Buttons and menus", desc: "Anchored popup menu with items, dividers, and checked entries.", flutter: "PopupMenuButton" },
  { name: "MenuAnchor", category: "Material", group: "Buttons and menus", desc: "Anchored menus and cascading submenus with keyboard navigation.", flutter: "MenuAnchor" },
  { name: "TextField", category: "Material", group: "Inputs and selection", desc: "Text input with InputDecoration: labels, helper and error text, borders, prefixes.", flutter: "TextField" },
  { name: "Checkbox", category: "Material", group: "Inputs and selection", desc: "Material checkbox with tristate; Checkbox.Adaptive uses CupertinoCheckbox.", flutter: "Checkbox" },
  { name: "Radio", category: "Material", group: "Inputs and selection", desc: "Material radio button; Radio.Adaptive uses CupertinoRadio on iOS/macOS.", flutter: "Radio" },
  { name: "Switch", category: "Material", group: "Inputs and selection", desc: "Material on/off toggle; Switch.Adaptive uses Cupertino path on iOS/macOS.", flutter: "Switch" },
  { name: "Slider", category: "Material", group: "Inputs and selection", desc: "Continuous or discrete slider with value indicator; RangeSlider for two thumbs.", flutter: "Slider" },
  { name: "Chip", category: "Material", group: "Inputs and selection", desc: "Input, choice, filter and action chips.", flutter: "Chip" },
  { name: "SearchBar", category: "Material", group: "Inputs and selection", desc: "Material 3 search bar; SearchAnchor opens the suggestions view.", flutter: "SearchBar" },
  { name: "DatePickerDialog", category: "Material", group: "Inputs and selection", desc: "Calendar and input date pickers, shown via showDatePicker.", flutter: "DatePickerDialog" },
  { name: "TimePickerDialog", category: "Material", group: "Inputs and selection", desc: "Dial and input time pickers, shown via showTimePicker.", flutter: "TimePickerDialog" },
  { name: "Card", category: "Material", group: "Content and feedback", desc: "Material surface with elevated/filled/outlined variants, tint, and clipping.", flutter: "Card" },
  { name: "ListTile", category: "Material", group: "Content and feedback", desc: "One/two/three-line tile with leading, title, subtitle, trailing, and M3 heights.", flutter: "ListTile" },
  { name: "ExpansionTile", category: "Material", group: "Content and feedback", desc: "ListTile that expands to reveal children, with animated chevron.", flutter: "ExpansionTile" },
  { name: "DataTable", category: "Material", group: "Content and feedback", desc: "Sortable rows and columns with header/data row styling and selection.", flutter: "DataTable" },
  { name: "Stepper", category: "Material", group: "Content and feedback", desc: "Vertical or horizontal step-by-step flow with per-step state icons and connectors.", flutter: "Stepper" },
  { name: "Badge", category: "Material", group: "Content and feedback", desc: "Small status indicator or count attached to an icon.", flutter: "Badge" },
  { name: "Tooltip", category: "Material", group: "Content and feedback", desc: "Hover-triggered label overlay used by FAB and navigation bar tiles.", flutter: "Tooltip" },
  { name: "CarouselView", category: "Material", group: "Content and feedback", desc: "Material 3 carousel with uncontained, hero and multi-browse layouts.", flutter: "CarouselView" },
  { name: "CircularProgressIndicator", category: "Material", group: "Content and feedback", desc: "Determinate or indeterminate circular progress.", flutter: "CircularProgressIndicator" },
  { name: "LinearProgressIndicator", category: "Material", group: "Content and feedback", desc: "Determinate or indeterminate linear progress bar.", flutter: "LinearProgressIndicator" },
  { name: "RefreshIndicator", category: "Material", group: "Content and feedback", desc: "Pull-to-refresh wrapper with Material arrowhead/spinner animation and adaptive variants.", flutter: "RefreshIndicator" },
  { name: "AlertDialog", category: "Material", group: "Dialogs and overlays", desc: "Dialog with title, content and actions, shown via showDialog.", flutter: "AlertDialog" },
  { name: "AboutDialog", category: "Material", group: "Dialogs and overlays", desc: "Application info dialog with an OSS license browser via LicensePage.", flutter: "AboutDialog" },
  { name: "SnackBar", category: "Material", group: "Dialogs and overlays", desc: "Brief message at the bottom of the screen, managed by ScaffoldMessenger.", flutter: "SnackBar" },
  { name: "BottomSheet", category: "Material", group: "Dialogs and overlays", desc: "Modal and persistent bottom sheets with drag-to-dismiss.", flutter: "BottomSheet" },
  // Cupertino
  { name: "CupertinoApp", category: "Cupertino", group: "App structure and navigation", desc: "App root with Cupertino theme, localizations and iOS-style navigation.", flutter: "CupertinoApp" },
  { name: "CupertinoPageScaffold", category: "Cupertino", group: "App structure and navigation", desc: "Basic iOS page layout with a navigation bar and content.", flutter: "CupertinoPageScaffold" },
  { name: "CupertinoTabScaffold", category: "Cupertino", group: "App structure and navigation", desc: "Tabbed iOS app layout; each tab keeps its own navigation stack.", flutter: "CupertinoTabScaffold" },
  { name: "CupertinoTabBar", category: "Cupertino", group: "App structure and navigation", desc: "iOS-style bottom tab bar.", flutter: "CupertinoTabBar" },
  { name: "CupertinoNavigationBar", category: "Cupertino", group: "App structure and navigation", desc: "iOS-style top navigation bar.", flutter: "CupertinoNavigationBar" },
  { name: "CupertinoSliverNavigationBar", category: "Cupertino", group: "App structure and navigation", desc: "Large-title navigation bar that collapses as content scrolls.", flutter: "CupertinoSliverNavigationBar" },
  { name: "CupertinoPageRoute", category: "Cupertino", group: "App structure and navigation", desc: "iOS page transition with the edge swipe-back gesture.", flutter: "CupertinoPageRoute" },
  { name: "CupertinoSheetRoute", category: "Cupertino", group: "App structure and navigation", desc: "iOS-style sheet that stacks over the previous page.", flutter: "CupertinoSheetRoute" },
  { name: "CupertinoButton", category: "Cupertino", group: "Controls", desc: "iOS-styled tappable button.", flutter: "CupertinoButton" },
  { name: "CupertinoSwitch", category: "Cupertino", group: "Controls", desc: "iOS-styled on/off toggle via Switch.Adaptive with Cupertino drag thresholds.", flutter: "CupertinoSwitch" },
  { name: "CupertinoCheckbox", category: "Cupertino", group: "Controls", desc: "iOS-style checkbox with Cupertino geometry, dark-mode gradient fill, and vector check indicator.", flutter: "CupertinoCheckbox" },
  { name: "CupertinoRadio", category: "Cupertino", group: "Controls", desc: "iOS-style radio button with Cupertino defaults, brightness-aware colors, and focus/pressed visuals.", flutter: "CupertinoRadio" },
  { name: "CupertinoSlider", category: "Cupertino", group: "Controls", desc: "iOS-style continuous or discrete slider.", flutter: "CupertinoSlider" },
  { name: "CupertinoSegmentedControl", category: "Cupertino", group: "Controls", desc: "Classic iOS segmented control.", flutter: "CupertinoSegmentedControl" },
  { name: "CupertinoSlidingSegmentedControl", category: "Cupertino", group: "Controls", desc: "iOS 13+ segmented control with a sliding thumb.", flutter: "CupertinoSlidingSegmentedControl" },
  { name: "CupertinoActivityIndicator", category: "Cupertino", group: "Controls", desc: "iOS-styled spinner.", flutter: "CupertinoActivityIndicator" },
  { name: "CupertinoTextField", category: "Cupertino", group: "Text input and pickers", desc: "iOS-style text field with placeholder, prefix and clear button.", flutter: "CupertinoTextField" },
  { name: "CupertinoSearchTextField", category: "Cupertino", group: "Text input and pickers", desc: "iOS search field with search icon and clear button.", flutter: "CupertinoSearchTextField" },
  { name: "CupertinoPicker", category: "Cupertino", group: "Text input and pickers", desc: "Wheel picker with the iOS magnifier and haptic-style selection.", flutter: "CupertinoPicker" },
  { name: "CupertinoDatePicker", category: "Cupertino", group: "Text input and pickers", desc: "Date, time and date-and-time wheel pickers.", flutter: "CupertinoDatePicker" },
  { name: "CupertinoTimerPicker", category: "Cupertino", group: "Text input and pickers", desc: "Countdown timer picker in hours, minutes and seconds.", flutter: "CupertinoTimerPicker" },
  { name: "CupertinoFormSection", category: "Cupertino", group: "Text input and pickers", desc: "Grouped form rows in the iOS Settings style.", flutter: "CupertinoFormSection" },
  { name: "CupertinoListSection", category: "Cupertino", group: "Lists, menus and dialogs", desc: "Base and inset grouped list sections.", flutter: "CupertinoListSection" },
  { name: "CupertinoListTile", category: "Cupertino", group: "Lists, menus and dialogs", desc: "iOS-style list row with leading, title, subtitle and trailing.", flutter: "CupertinoListTile" },
  { name: "CupertinoExpansionTile", category: "Cupertino", group: "Lists, menus and dialogs", desc: "iOS-style expandable list row.", flutter: "CupertinoExpansionTile" },
  { name: "CupertinoContextMenu", category: "Cupertino", group: "Lists, menus and dialogs", desc: "Long-press preview with an action menu, as on iOS.", flutter: "CupertinoContextMenu" },
  { name: "CupertinoMenuAnchor", category: "Cupertino", group: "Lists, menus and dialogs", desc: "Anchored iOS-style pull-down menu.", flutter: "CupertinoMenuAnchor" },
  { name: "CupertinoActionSheet", category: "Cupertino", group: "Lists, menus and dialogs", desc: "iOS action sheet with grouped actions and a cancel button.", flutter: "CupertinoActionSheet" },
  { name: "CupertinoAlertDialog", category: "Cupertino", group: "Lists, menus and dialogs", desc: "iOS-styled modal alert.", flutter: "CupertinoAlertDialog" },
  { name: "CupertinoSliverRefreshControl", category: "Cupertino", group: "Lists, menus and dialogs", desc: "iOS pull-to-refresh inside a CustomScrollView.", flutter: "CupertinoSliverRefreshControl" },
  { name: "CupertinoScrollbar", category: "Cupertino", group: "Lists, menus and dialogs", desc: "iOS-style scrollbar that thickens while dragged.", flutter: "CupertinoScrollbar" },
];

const categories: Category[] = ["Core", "Material", "Cupertino"];

const CATEGORY_TITLES: Record<Category, string> = {
  Core: "Core widgets",
  Material: "Material controls",
  Cupertino: "Cupertino controls",
};

/** Groups in first-appearance order, so the data array decides the section order. */
const groupBy = (items: Control[]) => {
  const groups = new Map<string, Control[]>();
  for (const c of items) groups.set(c.group, [...(groups.get(c.group) ?? []), c]);
  return [...groups.entries()];
};

const ControlCard = ({ c }: { c: Control }) => (
  <div className="card-surface rounded-xl p-5 transition-colors hover:border-primary/40">
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
);

const GroupGrid = ({ title, items, level }: { title: string; items: Control[]; level: 2 | 3 }) => {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className="mt-8">
      <Heading
        className={cn(
          "font-semibold tracking-tight",
          level === 2 ? "text-xl" : "text-base text-muted-foreground"
        )}
      >
        {title}
      </Heading>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <ControlCard key={c.name} c={c} />
        ))}
      </div>
    </div>
  );
};

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
    intro: "Material Design 3 controls for C# apps on desktop and mobile — every widget family in Flutter's Material library, ported.",
    body: "Plumix.Material layers an app shell and a full control set on top of the core widgets: Scaffold with app bars, drawers, navigation bars and rails; every button emphasis; text fields, pickers, chips and sliders; cards, list tiles, data tables and dialogs. Theming flows through ThemeData with both Material 2 and Material 3 colour and typography, and state layers, ripples and Hero transitions behave as they do in Flutter. Several controls expose Adaptive variants that switch to the Cupertino path on iOS and macOS. The cards below are highlights — the package ports the whole library, along with the 8,825-icon Icons catalog and localizations for 119 locales.",
  },
  cupertino: {
    path: "/controls/cupertino",
    category: "Cupertino" as Category,
    eyebrow: "Plumix.Cupertino",
    heading: "Cupertino controls",
    intro: "Flutter's Cupertino library in C#: iOS-style apps, navigation, controls and pickers, following Apple's geometry and Flutter's defaults.",
    body: "Plumix.Cupertino is a strict port of Flutter's cupertino_ui: CupertinoApp and its theme, page and tab scaffolds, large-title navigation bars, iOS page and sheet routes with swipe-back, wheel pickers, text fields, segmented controls, list sections, context menus and action sheets, with dynamic colours resolved for light, dark and high-contrast modes and localizations for 116 locales. Use the widgets directly, or reach them through the Adaptive variants on Switch, Checkbox and Radio in Plumix.Material, which select the Cupertino path on iOS and macOS.",
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

        {view.category
          ? groupBy(filtered).map(([group, items]) => (
              <GroupGrid key={group} title={group} items={items} level={2} />
            ))
          : categories.map((cat) => {
              const items = filtered.filter((c) => c.category === cat);
              if (items.length === 0) return null;
              return (
                <section key={cat} className="mt-12">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    <Link to={VIEWS[cat.toLowerCase() as ViewKey].path} className="hover:text-primary-glow">
                      {CATEGORY_TITLES[cat]}
                    </Link>
                  </h2>
                  {groupBy(items).map(([group, groupItems]) => (
                    <GroupGrid key={group} title={group} items={groupItems} level={3} />
                  ))}
                </section>
              );
            })}
        {filtered.length === 0 && (
          <div className="mt-8 text-center text-muted-foreground py-12">No widgets match your search.</div>
        )}
      </section>
    </SiteLayout>
  );
};

export default Controls;
