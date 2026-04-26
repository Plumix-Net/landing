import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="container py-32 text-center">
        <p className="text-sm font-mono uppercase tracking-wider text-primary-glow">404</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Widget not found</h1>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">
          That route doesn't exist in this widget tree. Try heading back home.
        </p>
        <div className="mt-8">
          <Button asChild className="bg-gradient-primary text-primary-foreground border-0 shadow-primary">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
