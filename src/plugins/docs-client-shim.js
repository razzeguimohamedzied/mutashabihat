// Fail-safe replacement for `@docusaurus/plugin-content-docs/client`.
//
// This site runs with `docs: false` (see docusaurus.config.ts). The offline
// search theme's <SearchBar> unconditionally calls `useActiveVersion("default")`
// to resolve a versioned index URL, and that hook throws when the docs plugin
// global data is absent ("...this plugin does not seem to be enabled"), which
// breaks the SSG build.
//
// We re-export the real client module untouched and only override
// `useActiveVersion` to return `undefined` — exactly its documented behaviour on
// doc-unrelated pages. With no active version, the SearchBar falls back to the
// site `baseUrl` for the index, which is what we want (there is only one index).
//
// Wired up via a `resolve.alias` in the docs-client-shim plugin so it applies
// only to the bare `@docusaurus/plugin-content-docs/client` specifier; this file
// imports the real module by its `./lib/*` path, so there is no recursion.
export * from "@docusaurus/plugin-content-docs/lib/client/index.js";

export function useActiveVersion() {
  return undefined;
}
