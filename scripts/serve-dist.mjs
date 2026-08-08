#!/usr/bin/env node
/**
 * Local preview of the deployed site.
 *
 * `vite preview` falls back to index.html for unknown paths, which hides exactly
 * the behaviour we care about. This server mirrors public/.htaccess instead:
 * try the file, then <path>.html, then 404.html with a real 404 status — so what
 * you see here is what Beget will serve.
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};

const isFile = (p) => existsSync(p) && statSync(p).isFile();

const send = (res, status, file) => {
  res.writeHead(status, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  let pathname = decodeURIComponent(url.pathname);

  // Trailing slash → canonical extensionless URL (301), as in .htaccess.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    res.writeHead(301, { Location: pathname.replace(/\/+$/, "") });
    return res.end();
  }

  const target = join(DIST, normalize(pathname).replace(/^(\.\.[/\\])+/, ""));

  if (pathname === "/") return send(res, 200, join(DIST, "index.html"));
  if (isFile(target)) return send(res, 200, target);
  if (isFile(`${target}.html`)) return send(res, 200, `${target}.html`);

  return send(res, 404, join(DIST, "404.html"));
}).listen(PORT, () => {
  console.log(`dist/ served with .htaccess semantics on http://localhost:${PORT}`);
});
