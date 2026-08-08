import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Production HTML is prerendered, so hydrate it instead of throwing the markup
// away. `vite dev` serves an empty shell and falls back to a fresh render.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
