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
  { name: "Text", category: "Core", desc: "Renders a styled text run.", flutter: "Text" },
  { name: "SizedBox", category: "Core", desc: "Fixed-size box used for spacing or sizing children.", flutter: "SizedBox" },
  { name: "Padding", category: "Core", desc: "Insets a child by EdgeInsets.", flutter: "Padding" },
  { name: "Align", category: "Core", desc: "Aligns a child within itself.", flutter: "Align" },
  { name: "Center", category: "Core", desc: "Centers a child along both axes.", flutter: "Center" },
  { name: "Expanded", category: "Core", desc: "Expands a child of a Row/Column to fill available space.", flutter: "Expanded" },
  { name: "Flexible", category: "Core", desc: "Loosens a child's flex along the main axis.", flutter: "Flexible" },
  { name: "ListView", category: "Core", desc: "Scrollable, lazily-built list of widgets.", flutter: "ListView" },
  { name: "GestureDetector", category: "Core", desc: "Detects taps, drags, and other gestures on a child.", flutter: "GestureDetector" },
  { name: "Image", category: "Core", desc: "Displays a raster or vector image.", flutter: "Image" },
  { name: "Opacity", category: "Core", desc: "Applies an opacity to its child.", flutter: "Opacity" },
  { name: "Transform", category: "Core", desc: "Applies a transformation matrix before painting.", flutter: "Transform" },

  // Material
  { name: "MaterialApp", category: "Material", desc: "Root of a Material-themed application.", flutter: "MaterialApp" },
  { name: "Scaffold", category: "Material", desc: "App shell with app bar, body, drawers, and FAB.", flutter: "Scaffold" },
  { name: "AppBar", category: "Material", desc: "Top application bar with title and actions.", flutter: "AppBar" },
  { name: "ElevatedButton", category: "Material", desc: "Filled button with elevation.", flutter: "ElevatedButton" },
  { name: "TextButton", category: "Material", desc: "Flat, low-emphasis button.", flutter: "TextButton" },
  { name: "OutlinedButton", category: "Material", desc: "Bordered, medium-emphasis button.", flutter: "OutlinedButton" },
  { name: "Card", category: "Material", desc: "Material surface with elevation and rounded corners.", flutter: "Card" },
  { name: "Drawer", category: "Material", desc: "Side panel for navigation.", flutter: "Drawer" },
  { name: "BottomNavigationBar", category: "Material", desc: "Tabbed bottom navigation control.", flutter: "BottomNavigationBar" },
  { name: "FloatingActionButton", category: "Material", desc: "Circular elevated action button.", flutter: "FloatingActionButton" },
  { name: "Switch", category: "Material", desc: "Material on/off toggle.", flutter: "Switch" },
  { name: "Checkbox", category: "Material", desc: "Material checkbox with tristate support.", flutter: "Checkbox" },
  { name: "Slider", category: "Material", desc: "Continuous or discrete value slider.", flutter: "Slider" },

  // Cupertino
  { name: "CupertinoApp", category: "Cupertino", desc: "Root of an iOS-themed application.", flutter: "CupertinoApp" },
  { name: "CupertinoPageScaffold", category: "Cupertino", desc: "iOS-style page with nav bar and content.", flutter: "CupertinoPageScaffold" },
  { name: "CupertinoNavigationBar", category: "Cupertino", desc: "iOS-style top navigation bar.", flutter: "CupertinoNavigationBar" },
  { name: "CupertinoButton", category: "Cupertino", desc: "iOS-styled tappable button.", flutter: "CupertinoButton" },
  { name: "CupertinoSwitch", category: "Cupertino", desc: "iOS-styled on/off switch.", flutter: "CupertinoSwitch" },
  { name: "CupertinoSlider", category: "Cupertino", desc: "iOS-styled value slider.", flutter: "CupertinoSlider" },
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
