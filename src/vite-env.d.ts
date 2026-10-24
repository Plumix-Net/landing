/// <reference types="vite/client" />
/// <reference types="mdx" />

// @types/mdx declares *.mdx; plain Markdown (content/changelog.md) compiles the same way.
declare module "*.md" {
  export { default } from "*.mdx";
}
