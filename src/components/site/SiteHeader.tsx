import { Link, NavLink, useLocation } from "react-router-dom";
import { Github, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/plumix-logo.jpg";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/docs", label: "Docs" },
  { to: "/controls", label: "Controls" },
  { to: "/changelog", label: "Changelog" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-background/0"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg ring-1 ring-border">
            <img src={logo} alt="Plumix logo" className="h-full w-full object-cover" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Plumix
          </span>
          <span className="hidden sm:inline-block rounded-md border border-border bg-secondary/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            v0.4
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground bg-secondary/70"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="https://github.com/Plumix-Net/Plumix"
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
            aria-label="GitHub repository"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
        </nav>

        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="container flex flex-col py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2.5 rounded-md text-sm font-medium",
                    isActive
                      ? "text-foreground bg-secondary/70"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://github.com/Plumix-Net/Plumix"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
