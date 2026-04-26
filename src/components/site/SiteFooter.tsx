import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import logo from "@/assets/plumix-logo.jpg";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-background/40 mt-24">
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 overflow-hidden rounded-lg ring-1 ring-border">
              <img src={logo} alt="Plumix logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-lg font-semibold">Plumix</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            A Flutter-faithful UI framework for the .NET ecosystem.
            Widget → Element → RenderObject — written in C#.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Project</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/docs" className="hover:text-foreground">Documentation</Link></li>
            <li><Link to="/controls" className="hover:text-foreground">Controls</Link></li>
            <li><Link to="/changelog" className="hover:text-foreground">Changelog</Link></li>
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
