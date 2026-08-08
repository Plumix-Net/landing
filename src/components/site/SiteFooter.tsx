import { Link } from "react-router-dom";
import { Github } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-background/40 mt-24">
      <div className="container py-12 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 overflow-hidden rounded-lg ring-1 ring-border">
              <img
                src="/logo-64.png"
                alt="Plumix logo"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-lg font-semibold">Plumix</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            A Flutter-faithful UI framework for the .NET ecosystem.
            Widget → Element → RenderObject — written in C#.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Documentation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/docs" className="hover:text-foreground">Getting started</Link></li>
            <li><Link to="/docs/architecture" className="hover:text-foreground">Widget · Element · RenderObject</Link></li>
            <li><Link to="/docs/state" className="hover:text-foreground">Stateful widgets</Link></li>
            <li><Link to="/docs/layout" className="hover:text-foreground">Layout protocol</Link></li>
            <li><Link to="/changelog" className="hover:text-foreground">Changelog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Controls</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/controls" className="hover:text-foreground">Full catalog</Link></li>
            <li><Link to="/controls/core" className="hover:text-foreground">Core widgets</Link></li>
            <li><Link to="/controls/material" className="hover:text-foreground">Material controls</Link></li>
            <li><Link to="/controls/cupertino" className="hover:text-foreground">Cupertino controls</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://github.com/Plumix-Net/Plumix" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            </li>
            <li>
              <a href="https://www.nuget.org/packages/Plumix/" target="_blank" rel="noreferrer" className="hover:text-foreground">NuGet — Plumix</a>
            </li>
            <li>
              <a href="https://www.nuget.org/packages/Plumix.Material/" target="_blank" rel="noreferrer" className="hover:text-foreground">NuGet — Material</a>
            </li>
            <li>
              <a href="https://www.nuget.org/packages/Plumix.Cupertino/" target="_blank" rel="noreferrer" className="hover:text-foreground">NuGet — Cupertino</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Plumix-Net. MIT-licensed open source.</span>
          <span className="font-mono">Built with C# · Avalonia infrastructure</span>
        </div>
      </div>
    </footer>
  );
};
