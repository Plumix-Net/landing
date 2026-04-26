import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ReactNode } from "react";

export const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
};
