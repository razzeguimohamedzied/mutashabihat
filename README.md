# Mutashabihat feature (المتشابهات)

A reference for look-alike Qur'anic verses. There is one page per surah at
`/mutashabihat/{surahSlug}` plus an index of all 114 surahs at `/mutashabihat-summary`.

## Architecture: normalize the data, denormalize the view

Each similarity **group** is stored exactly once — the single source of truth —
and every per-surah view is derived from it at build time. A group is never
duplicated across surah files, so a group that touches surahs 2, 17 and 20 shows
up complete on all three pages automatically.

## How to add or edit a group (edit ONE place)

Open **`src/data/mutashabihat/groups.ts`** and add an entry to the `groups`
array. Nothing else needs to change:

```ts
{
  id: "grp-0005",                     // unique, stable
  title: "وصف مختصر للتشابه",
  members: [
    {
      surah: 2,                       // 1..114
      surahName: "البقرة",
      ayah: 62,
      text: "…full ayah text (Uthmani)…",
      similarity: "…the shared phrase…",  // MUST be an exact substring of text
    },
    { /* second member — from any surah */ },
    // 2+ members; add as many as the group has
  ],
}
```

Rules (enforced at load time by `assertGroups` — a bad edit fails the build):

- every group needs **≥ 2 members**;
- each member's **`similarity` must be an exact substring of its `text`** (it is
  highlighted at render time, never baked into the text);
- `id`s must be unique and `surah` in `1..114`.
