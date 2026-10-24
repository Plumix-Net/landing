import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/Seo";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NETBENCH_CONTACT_EMAIL,
  NETBENCH_ISSUES_URL,
  NETBENCH_REPO_URL,
  NETBENCH_STORES,
  StoreLink,
} from "@/netbench/app";
import {
  Activity,
  Apple,
  ArrowDown,
  ArrowRight,
  BellRing,
  CheckCircle2,
  Cpu,
  Gauge,
  GitCompare,
  Github,
  Globe,
  Layers,
  LifeBuoy,
  Lock,
  Mail,
  Monitor,
  Play,
  Rocket,
  Scale,
  Server,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";

const useCases = [
  {
    icon: Rocket,
    title: "Capacity check before a release",
    desc: "Point a scenario at a new endpoint, raise concurrent users and watch where p95 and p99 start to bend. You get the throughput the service actually holds, not the one in the design doc.",
  },
  {
    icon: BellRing,
    title: "On-call sanity check from your phone",
    desc: "Paste a URL into Quick test, run a short burst and see RPS, p95 and error rate on one screen. Enough to tell \"prod is slow\" from \"my Wi-Fi is slow\" without opening a laptop.",
  },
  {
    icon: GitCompare,
    title: "Before and after a deploy",
    desc: "Run the same scenario on the old and the new build and put the two reports side by side on the desktop. Regressions in latency or error rate show up as numbers, not impressions.",
  },
  {
    icon: TrendingUp,
    title: "Finding the breaking point",
    desc: "Ramp-up adds workers gradually over a set time, so you can see the moment latency climbs or errors appear instead of hitting the service with everything at once.",
  },
  {
    icon: Server,
    title: "Local and staging stands",
    desc: "Plain http:// targets work on Android and iOS too — local machines, VPN-only staging, containers on your LAN. Mobile platforms block cleartext by default; NetBench allows it on purpose.",
  },
  {
    icon: Activity,
    title: "Realistic traffic, not just GET /",
    desc: "Each virtual user walks through a list of steps — any HTTP method, path, custom headers such as Authorization, a JSON body — with optional think time between iterations.",
  },
];

const metrics = [
  { name: "Throughput", desc: "Requests per second, live" },
  { name: "Latency p50 · p95 · p99", desc: "Percentiles from an HDR histogram" },
  { name: "Min · mean · max", desc: "Full latency spread for the run" },
  { name: "Error rate", desc: "Network failures and HTTP 4xx/5xx" },
  { name: "Status codes", desc: "Breakdown of every response code" },
  { name: "Active connections", desc: "Requests in flight right now" },
  { name: "Bytes received", desc: "Total response traffic" },
  { name: "Latency over time", desc: "Timeline chart in the report" },
];

const steps = [
  {
    n: "01",
    title: "Describe the load",
    items: [
      "Target URL and a list of request steps",
      "Method, path, headers and JSON body per step",
      "Concurrent users and test duration",
      "Ramp-up and think time",
    ],
  },
  {
    n: "02",
    title: "Run and watch",
    items: [
      "One async worker per virtual user",
      "Metrics refresh four times a second",
      "Stop at any moment — partial results are kept",
      "The UI stays smooth however hard the engine works",
    ],
  },
  {
    n: "03",
    title: "Read the report",
    items: [
      "Summary of latency, throughput and errors",
      "Latency-over-time chart and status-code table",
      "Desktop: compare two runs side by side",
      "Export to JSON, CSV or HTML; copy a summary on mobile",
    ],
  },
];

const whyCSharp = [
  {
    icon: Gauge,
    title: "The tool must not be the bottleneck",
    desc: "A load generator that allocates per request ends up measuring its own garbage collector. In NetBench every result is a small readonly struct passed by reference, response bodies are drained into pooled buffers, and there is no LINQ on the hot path — so GC pressure stays flat and latency spikes belong to the server under test.",
  },
  {
    icon: Zap,
    title: "Concurrency is a language feature",
    desc: "Hundreds of virtual users are plain async Tasks throttled by a SemaphoreSlim. Results flow through a bounded Channel<T> with a single reader, counters use Interlocked, and CancellationToken stops a run cleanly mid-flight. No thread-per-user, no callback soup — on a phone as well as on a workstation.",
  },
  {
    icon: Layers,
    title: "One engine, every platform",
    desc: "The load engine, statistics and storage are one shared C# project. Desktop and browser get an Avalonia UI with MVVM; Android and iOS get a Plumix UI with Flutter-style widgets and Cubit state. The number you see on your phone comes from exactly the same code as the one on your desktop.",
  },
  {
    icon: Cpu,
    title: "Native performance on mobile",
    desc: "NetBench runs on .NET 10 on the device itself, not in a web view and not through a remote agent. JSON is source-generated, so the app trims cleanly and starts fast, and the same profiling tools you use for backend .NET code work here too.",
  },
];

const pipeline = [
  { title: "Virtual users", sub: "N async Tasks" },
  { title: "Channel<RequestResult>", sub: "bounded, single reader" },
  { title: "Aggregator", sub: "Interlocked + HDR histogram" },
  { title: "Snapshot", sub: "every 250 ms" },
  { title: "UI", sub: "Avalonia or Plumix" },
];

const platforms = [
  {
    icon: Smartphone,
    name: "Android & iOS",
    ui: "Plumix — Flutter-style widgets in C#",
    status: "Coming to the stores",
  },
  {
    icon: Monitor,
    name: "Windows, macOS, Linux",
    ui: "Avalonia — XAML + MVVM",
    status: "Build from source",
  },
  {
    icon: Globe,
    name: "Browser",
    ui: "Avalonia on WebAssembly",
    status: "Build from source",
  },
];

const requestResultCode = `public readonly struct RequestResult
{
    public readonly long StartTimestampNs;
    public readonly long EndTimestampNs;
    public readonly int StatusCode;
    public readonly int BytesReceived;
    public readonly bool IsError;

    public long LatencyNs => EndTimestampNs - StartTimestampNs;
}

// Hot path: no allocation per request
_aggregator.Record(in result);
await _channel.Writer.WriteAsync(result, token);`;

const storeIcon = { "app-store": Apple, "google-play": Play } as const;

const StoreButton = ({ store }: { store: StoreLink }) => {
  const Icon = storeIcon[store.id];
  const body = (
    <>
      <Icon className="h-6 w-6 flex-shrink-0" />
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[11px] text-muted-foreground">
          {store.url ? "Download on" : "Coming soon to"}
        </span>
        <span className="text-base font-semibold">{store.label}</span>
      </span>
    </>
  );
  const base =
    "inline-flex h-14 min-w-[190px] items-center gap-3 rounded-xl border px-5 transition-colors";

  if (!store.url) {
    return (
      <div
        aria-disabled="true"
        title={`${store.label} listing is not live yet`}
        className={cn(base, "border-dashed border-border bg-secondary/20 text-muted-foreground")}
      >
        {body}
      </div>
    );
  }

  return (
    <a
      href={store.url}
      target="_blank"
      rel="noreferrer"
      className={cn(base, "border-border bg-secondary/40 hover:border-primary/50 hover:bg-secondary/70")}
    >
      {body}
    </a>
  );
};

const StoreButtons = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
    {NETBENCH_STORES.map((s) => (
      <StoreButton key={s.id} store={s} />
    ))}
  </div>
);

/** Illustrative monitor card — the numbers are an example, not a benchmark. */
const MonitorPreview = () => {
  const points = [18, 34, 52, 61, 66, 64, 70, 68, 72, 69, 71, 74, 70, 73];
  const max = 80;
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / (points.length - 1)) * 300},${100 - (p / max) * 100}`)
    .join(" ");

  return (
    <div className="card-surface rounded-2xl p-6 md:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Running</p>
          <p className="mt-1 font-semibold">Checkout API · 200 users</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-status-done/30 bg-status-done/10 px-2.5 py-1 text-xs text-status-done">
          <span className="h-1.5 w-1.5 rounded-full bg-status-done animate-pulse" />
          00:24 / 01:00
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: "RPS", value: "1 284" },
          { label: "p95", value: "123 ms" },
          { label: "Errors", value: "0.2%" },
        ].map((m) => (
          <div key={m.label}>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="mt-1 text-2xl md:text-3xl font-bold tracking-tight font-mono">{m.value}</p>
          </div>
        ))}
      </div>

      <svg viewBox="0 0 300 100" className="mt-6 h-24 w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="nb-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L300,100 L0,100 Z`} fill="url(#nb-fill)" />
        <path d={path} fill="none" stroke="hsl(var(--primary-glow))" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4 text-sm">
        {[
          { label: "p50", value: "45 ms" },
          { label: "p99", value: "287 ms" },
          { label: "Active", value: "198" },
        ].map((m) => (
          <div key={m.label} className="flex items-baseline gap-2">
            <span className="text-muted-foreground">{m.label}</span>
            <span className="font-mono">{m.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-muted-foreground">Illustrative example of the live monitor.</p>
    </div>
  );
};

const NetBench = () => {
  return (
    <SiteLayout>
      <Seo path="/netbench" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container relative pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="animate-fade-up">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <Gauge className="h-3.5 w-3.5 text-primary-glow" />
                A showcase app built with Plumix
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                NetBench — <span className="text-gradient">HTTP load testing</span> in your pocket
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                Hit an API with hundreds of concurrent users and watch throughput, latency percentiles
                and errors update live. Run a deep analysis on the desktop, or check prod from your phone
                while you're on call.
              </p>

              <StoreButtons className="mt-9" />

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <a
                  href={NETBENCH_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <Github className="h-4 w-4" /> Open source on GitHub
                </a>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-4 w-4" /> No account, no tracking
                </span>
              </div>
            </div>

            <MonitorPreview />
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">Use cases</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">What you test with NetBench</h2>
          <p className="mt-4 text-muted-foreground">
            A k6, hey or wrk-style load generator with a real interface — for backend developers,
            SRE and QA engineers.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <div
              key={u.title}
              className="card-surface rounded-xl p-6 transition-all hover:border-primary/40 hover:shadow-primary"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary-glow ring-1 ring-primary/20">
                <u.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">How it works</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Configure, run, read</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card-surface rounded-xl p-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-primary-glow">{s.n}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {s.items.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary-glow flex-shrink-0" />
                    <span className="text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-center text-xl font-semibold">What gets measured</h3>
          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.name} className="bg-background p-5">
                <p className="font-medium">{m.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY C# */}
      <section className="container py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">Why C#</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Why a load tester is written in .NET
          </h2>
          <p className="mt-4 text-muted-foreground">
            Load generation is the one kind of app where the runtime shows up directly in the
            results. That is exactly why NetBench is the Plumix showcase.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {whyCSharp.map((w) => (
            <div key={w.title} className="card-surface rounded-xl p-7">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary-glow ring-1 ring-primary/20">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="text-xl font-semibold">From a request to a pixel</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Workers never touch the UI. Each result is recorded into lock-free counters and a
              histogram, and the screen receives one aggregated snapshot four times a second — whether
              the engine is doing ten requests per second or ten thousand.
            </p>
            <ol className="mt-6 flex flex-col gap-2">
              {pipeline.map((p, i) => (
                <li key={p.title} className="flex flex-col items-stretch">
                  <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-secondary/30 px-4 py-3">
                    <span className="font-mono text-sm">{p.title}</span>
                    <span className="text-xs text-muted-foreground text-right">{p.sub}</span>
                  </div>
                  {i < pipeline.length - 1 && (
                    <ArrowDown className="mx-auto mt-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </div>
          <CodeBlock code={requestResultCode} language="csharp" filename="RequestResult.cs" />
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="container py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">Platforms</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">One codebase, two UI stacks</h2>
          <p className="mt-4 text-muted-foreground">
            The domain and data layers are shared. Each platform picks its UI half at compile time —
            no <span className="font-mono text-foreground">#if</span> in the code.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {platforms.map((p) => (
            <div key={p.name} className="card-surface rounded-xl p-6">
              <p.icon className="h-6 w-6 text-primary-glow" />
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.ui}</p>
              <p className="mt-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {p.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRIVACY + RESPONSIBLE USE */}
      <section className="container py-16 md:py-24 border-t border-border">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card-surface rounded-xl p-7">
            <Lock className="h-6 w-6 text-primary-glow" />
            <h3 className="mt-4 text-lg font-semibold">Your data stays on your device</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              No sign-up, no analytics, no ads, no NetBench servers. Scenarios, reports and settings are
              stored locally, and the app only sends requests to the targets you configure.
            </p>
            <Link to="/netbench/privacy" className="mt-4 inline-flex items-center gap-1 text-sm text-primary-glow hover:text-primary">
              Privacy policy <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="card-surface rounded-xl p-7">
            <Scale className="h-6 w-6 text-primary-glow" />
            <h3 className="mt-4 text-lg font-semibold">Test only what you're allowed to</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              NetBench generates real traffic. Point it at systems you own or have written permission to
              test — load against someone else's service without consent can be a denial-of-service attack.
            </p>
            <Link to="/netbench/terms" className="mt-4 inline-flex items-center gap-1 text-sm text-primary-glow hover:text-primary">
              Terms of use <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SUPPORT + CTA */}
      <section id="support" className="container py-20 scroll-mt-20">
        <div className="relative overflow-hidden rounded-2xl border border-border card-surface p-10 md:p-14 text-center">
          <div className="absolute inset-0 bg-hero-glow opacity-60 pointer-events-none" />
          <div className="relative">
            <LifeBuoy className="h-10 w-10 mx-auto text-primary-glow" />
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Support</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Found a bug or missing a feature? Open an issue on GitHub — that's where NetBench is
              developed in the open.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground border-0 shadow-primary hover:opacity-95">
                <a href={NETBENCH_ISSUES_URL} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Open an issue
                </a>
              </Button>
              {NETBENCH_CONTACT_EMAIL && (
                <Button asChild size="lg" variant="outline" className="border-border bg-secondary/30 hover:bg-secondary/60">
                  <a href={`mailto:${NETBENCH_CONTACT_EMAIL}`}>
                    <Mail className="mr-2 h-4 w-4" /> {NETBENCH_CONTACT_EMAIL}
                  </a>
                </Button>
              )}
            </div>
            <StoreButtons className="mt-10 justify-center items-center" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NetBench;
