---
description: Add a problem ayah (آية أراجعها) to the personal watchlist from a pasted ayah
---

You add a "problem ayah" (a verse the memorizer struggles with or recalls wrong)
to this project's personal watchlist by editing the data file directly and
correctly. The user provides the ayah below.

## Input (from the user)

$ARGUMENTS

## Expected input (be lenient in parsing; ask if a required field is missing)

One entry. Fields:

- **surah** number (or Arabic name) — required
- **ayah** number — required
- the EXACT ayah `text` — required
- **highlight** — optional: the part of the ayah habitually recalled wrong. Must
  be an exact substring of `text`. Include only if the user supplies it.
- **note** — optional: a free-text Arabic reminder of what goes wrong. Include
  only if the user supplies it; never invent one.

Example the user might paste:

- 17:6 | الإسراء | ayat: «<exact text>» | highlight: <sub text from ayat> | note: <what I get wrong>

## CRITICAL RULE — Qur'an text fidelity (non-negotiable)

NEVER generate, recall, autocomplete, paraphrase, or "correct" ayah text from
your own memory. Use ONLY the exact text the user pasted, character for character,
including diacritics. If the ayah text is missing, truncated, or looks off, STOP
and ask the user for it — do not fill it in yourself. Likewise, do not guess the
surah/ayah numbers. `highlight` and `note` must come verbatim from the user.

## Steps

1. Read the current data and types: `src/data/problemAyat/entries.ts` (the single
   source of truth), `src/data/problemAyat/types.ts` (the `ProblemAyah` shape),
   and the invariants in `src/data/problemAyat/index.ts`. Load the existing
   entries.
2. Parse the provided entry. If the user gave a surah name, verify it matches the
   number using the canonical 114-surah Arabic-name list; flag any mismatch
   instead of silently overriding. `surahName` is NOT stored on the entry — it is
   derived at render time — so do not add it.
3. Assign a stable, unique id: the next `prob-NNNN`. Never renumber or reorder
   existing ids. (Ordering doesn't matter — the view sorts by surah then ayah at
   build time — so just append the new entry.)
4. Validate before writing — if anything fails, report it and STOP without saving:
   - surah in 1..114, ayah > 0
   - id is unique (no existing entry has it)
   - if `highlight` is present, it is an EXACT substring of `text` (this is the
     key invariant `assertProblemAyat` enforces; a mismatch fails the build)
   - all required fields present
5. Append the new entry to the `problemAyat` array in `entries.ts`, matching the
   existing object shape and key order (`id`, `surah`, `ayah`, `text`,
   `highlight?`, `note?`), 2-space indentation, trailing newline. Omit optional
   fields the user didn't provide rather than writing empty strings. Keep the git
   diff minimal — do not reformat or touch unrelated entries.

## Report

State precisely what you did: "added <id> — surah:ayah". Show the resulting entry
object and a one-line summary of the git diff. Do NOT run the build unless the
user asks.
