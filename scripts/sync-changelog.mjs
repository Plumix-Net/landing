#!/usr/bin/env node
/**
 * Copies the framework's CHANGELOG.md into content/changelog.md, which /changelog
 * renders. Run after a Plumix release:
 *
 *   npm run sync:changelog                  # reads ../Plumix/CHANGELOG.md
 *   npm run sync:changelog -- path/to/CHANGELOG.md
 *
 * The copy is committed rather than fetched at build time, so the deploy build
 * needs neither the sibling repository nor network access.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(process.argv[2] ?? join(ROOT, "..", "Plumix", "CHANGELOG.md"));
const target = join(ROOT, "content", "changelog.md");

const text = readFileSync(source, "utf8");

// Drop the title and the contributor rules above the first release heading —
// they are instructions for whoever edits the file, not release notes.
const first = text.search(/^## /m);
if (first === -1) throw new Error(`${source} has no "## " release headings.`);

const body = text
  .slice(first)
  // An empty "## [Unreleased]" section would render as a heading with nothing under it.
  .replace(/^## \[Unreleased\][^\n]*\n(?=\s*## )/m, "")
  .replace(/^## \[Unreleased\]/m, "## Unreleased");

// No "generated" banner inside the file: it is compiled as plain Markdown, where
// any comment syntax would either render as text or need raw-HTML support.
writeFileSync(target, body);
console.log(`✓ ${source} → content/changelog.md`);
