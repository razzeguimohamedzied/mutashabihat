---
description: Add a mutashabihat group to the data file from pasted ayahs
---

You add a mutashabihat (similar Qur'anic verses) group to this project's data by
editing the JSON directly and correctly. The user provides the verses below.

## Input (from the user)

$ARGUMENTS

## Expected input (be lenient in parsing; ask if a required field is missing)

A group has 2+ members. Per member: surah number, ayah number, the EXACT ayah
text, and the shared word/phrase (similarity). Optionally, the group may include
`memorizationRule` (الضابط) — an Arabic memorization aid explaining how to tell the
look-alikes apart. Include it only if the user supplies it; never invent one.

Example the user might paste:

- 2:25 | البقرة | ayat: «<exact text>» | similarity: <sub text from ayat>
- 47:15 | محمد | ayat: «<exact text>» | similarity: <sub text from ayat>
- الضابط: <memorization rule text>

## CRITICAL RULE — Qur'an text fidelity (non-negotiable)

NEVER generate, recall, autocomplete, paraphrase, or "correct" ayah text from
your own memory. Use ONLY the exact text the user pasted, character for character,
including diacritics. If any ayah text is missing, truncated, or looks off, STOP
and ask the user for it — do not fill it in yourself. Likewise, do not guess
surah/ayah numbers.

## Steps

1. Read the current data: find the data file(s) and shared types from earlier
   work (e.g. `src/data/mutashabihat/`). Load the existing groups.
2. Parse the provided members. Derive `surahName` from the surah number or the surah number from the name using the
   canonical 114-surah Arabic-name list; if the user gave a name, verify it
   matches and flag any mismatch instead of silently overriding.
3. Assign a stable, unique id to a new group (next `grp-NNNN`). Never renumber or
   reorder existing ids.
4. Validate before writing — if anything fails, report it and STOP without saving:
   - surah in 1..114, ayah > 0
   - the resulting group has >= 2 members
   - no duplicate member (same surah+ayah) within a group
   - all required fields present
5. Write back to the JSON matching the shared schema EXACTLY: consistent key
   order, deterministic group ordering (by id), 2-space indentation, trailing
   newline — keep the git diff minimal. Do not reformat or touch unrelated groups.

## Report

State precisely what you did: "created group <id> with N members" or "appended M
members to existing group <id>". Show the resulting group and a one-line summary
of the git diff. Do NOT run the build unless the user asks.
