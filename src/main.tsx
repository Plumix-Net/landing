import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { preloadContent } from "./content/registry";
// Latin subsets only: the site is English, and the full @fontsource bundles add
// @font-face rules for a dozen scripts to the critical CSS.
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-ext-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-ext-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-ext-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/latin-ext-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-ext-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-ext-500.css";
import "@fontsource/jetbrains-mono/latin-600.css";
import "@fontsource/jetbrains-mono/latin-ext-600.css";
import "./index.css";

const container = document.getElementById("root")!;

// Production HTML is prerendered, so hydrate it instead of throwing the markup
// away. `vite dev` serves an empty shell and falls back to a fresh render.
// The route's lazy content must be in memory first, or the first client render
// would show its loading state and mismatch the prerendered article.
const path = window.location.pathname.replace(/(.)\/+$/, "$1");
preloadContent(path).finally(() => {
  if (container.hasChildNodes()) {
    hydrateRoot(container, <App />);
  } else {
    createRoot(container).render(<App />);
  }
});
