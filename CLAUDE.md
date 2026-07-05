# CLAUDE.md

Guidance for working in this repository.

## What this is

An Arabic **Mutashabihat** (متشابهات — look-alike Qur'anic verses) reference site
for memorizers. Built on **Docusaurus 3.10 (classic preset, TypeScript, React
19)**. Docs and blog are disabled; the site is essentially a themed static-site
generator hosting one data-driven feature.

## Commands

```bash
npm run start      # dev server (Webpack)
npm run build      # static SSG build -> build/
npm run typecheck  # tsc, strict
npm run serve      # serve the built site locally
npm run clear      # clear .docusaurus + bundler caches
```

Always run `npm run build` before considering a change done.

## Architecture: normalize the data, denormalize the view

The core principle — **do not break it**. Each similarity *group* is stored
exactly once (the single source of truth) and every per-surah view is derived
from it at build time. A group is never duplicated across surah files.

```
src/data/mutashabihat/
  types.ts     # MutashabihMember, MutashabihGroup, SurahInfo
  surahs.ts    # all 114 surahs (number + Arabic name + slug)
  groups.ts    # THE SINGLE SOURCE OF TRUTH — edit only this to add/change data
  index.ts     # derived selectors (getGroupsForSurah, surahHasData, …)
               # + assertGroups() invariant checks, run at module load

src/components/SurahMutashabihat/     # renders every group touching a surah
src/components/MutashabihatSurahPage/ # per-surah route wrapper (Layout + breadcrumb)
src/plugins/mutashabihat-pages.ts     # Docusaurus plugin: generates 114 routes
src/pages/mutashabihat-summary/       # the index of all 114 surahs
src/pages/index.tsx                   # home page
```

### Data flow / how pages are generated

- `src/plugins/mutashabihat-pages.ts` runs in `contentLoaded` and calls
  `createData` + `addRoute` once per surah, mounting `MutashabihatSurahPage`.
  There are **no hand-authored per-surah MDX files**. Routes are `addRoute`d, so
  they render to static HTML during `build` (indexable by search).
- `SurahMutashabihat` selects every group with ≥1 member in the current surah and
  renders the **full** group (all members, cross-surah), so symmetry is
  automatic: a group visible on surah 2's page is also complete on surah 17's.
- The differing phrase (`farq`) is highlighted by wrapping the matched substring
  in `<mark>` **at render time** — never bake highlight markup into `text`.
- The current surah's member(s) are visually emphasized (badge + accent).

### Adding or editing a group

Edit only `src/data/mutashabihat/groups.ts`. Invariants enforced by
`assertGroups` (a violation throws at build time):

- every group has **≥ 2 members**;
- each member's **`farq` must be an exact substring of its `text`**;
- `id`s are unique and `surah` ∈ `1..114`.

Ayah `text` is Uthmani script. Do not invent verses or references — copy `farq`
verbatim from `text` so the highlight matches exactly.

## Project-specific gotchas

- **baseUrl collides with the feature name.** `baseUrl` is `/mutashabihat/`, and
  the feature also lives under `/mutashabihat`. Consequences:
  - Surah pages (via `addRoute` with an absolute path) serve at
    **`/mutashabihat/{slug}`**.
  - The index page (a `src/pages` route) serves at
    **`/mutashabihat/mutashabihat-summary`**.
  - In `<Link>`/navbar `to`, a value that already starts with `/mutashabihat/`
    is used as-is; a bare `/mutashabihat` **collapses to the baseUrl root (home
    page)**. So always link to the full served path, e.g.
    `to="/mutashabihat/mutashabihat-summary"`, not `to="/mutashabihat"`.
- **RTL is site-wide via i18n**, not per-component: `i18n.defaultLocale` is `ar`,
  which sets `dir="rtl"` across the site. Components also set `dir="rtl"` on their
  own root for portability. Keep new pages RTL-correct.
- **Rspack "faster" bundler is intentionally disabled** (`future.faster: false`).
  Its persistent cache panics (`ModuleGraphModule ... not found`) inside this
  OneDrive-synced folder. Do not re-enable it unless the repo moves out of
  OneDrive. If a build/dev panic or `EBUSY`/`ENOTEMPTY` on `build`/`.cache`
  appears, kill stray `node` processes and clear caches
  (`node_modules/.cache`, `.docusaurus`, `build`), then retry.
- **Extend the existing Docusaurus config; don't replace it.** Keep both
  `npm run start` and `npm run build` working. No runtime network calls — all
  data is local.

## Conventions

- TypeScript throughout; strict types for the data model and component props.
- Prefer deriving views from `groups.ts` via the selectors in
  `src/data/mutashabihat/index.ts` — never duplicate group data.
- Match the surrounding code style (double quotes, CSS modules per component).
