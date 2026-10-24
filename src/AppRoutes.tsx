import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import Docs from "./pages/Docs.tsx";
import DocsArchitecture from "./pages/DocsArchitecture.tsx";
import DocsState from "./pages/DocsState.tsx";
import DocsLayoutProtocol from "./pages/DocsLayoutProtocol.tsx";
import Controls from "./pages/Controls.tsx";
import Changelog from "./pages/Changelog.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import NetBench from "./pages/NetBench.tsx";
import NetBenchPrivacy from "./pages/NetBenchPrivacy.tsx";
import NetBenchTerms from "./pages/NetBenchTerms.tsx";
import NotFound from "./pages/NotFound.tsx";

/**
 * Router-agnostic route table.
 *
 * Rendered under BrowserRouter in the browser and under StaticRouter during
 * prerendering, so both paths walk exactly the same tree.
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/docs" element={<Docs />} />
    <Route path="/docs/architecture" element={<DocsArchitecture />} />
    <Route path="/docs/state" element={<DocsState />} />
    <Route path="/docs/layout" element={<DocsLayoutProtocol />} />
    <Route path="/controls" element={<Controls />} />
    <Route path="/controls/:category" element={<Controls />} />
    <Route path="/changelog" element={<Changelog />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="/netbench" element={<NetBench />} />
    <Route path="/netbench/privacy" element={<NetBenchPrivacy />} />
    <Route path="/netbench/terms" element={<NetBenchTerms />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
