/**
 * Shared shape for free-text Arabic explanations (a group's الضابط, a problem
 * ayah's note):
 *
 *   - a plain `string` renders as a single paragraph of text;
 *   - `{ html: "…" }` is injected as raw HTML, for anything richer — lists,
 *     <strong>, nested lists, tables… Write it as a template literal so it can
 *     span several lines.
 *
 * In both forms, a span quoted with «…» is emphasised at render time (the
 * guillemets are kept). In HTML, a «…» quote must not straddle a tag.
 *
 * The HTML is authored here, in the repo, and rendered at build time — it is
 * trusted content, never user input. `assertExplanation` still rejects
 * unbalanced tags and script-capable markup so a typo fails the build instead
 * of breaking the page layout.
 */
export type Explanation = string | { html: string };

/** Elements that never take a closing tag. */
const VOID_TAGS = new Set(["br", "hr", "img", "wbr"]);

/** Elements that have no business in an explanation. */
const FORBIDDEN_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "link",
  "meta",
  "form",
]);

/** Throws if an explanation is empty or its HTML is malformed. */
export function assertExplanation(where: string, value: Explanation): void {
  const text = typeof value === "string" ? value : value.html;
  if (text.trim().length === 0) {
    throw new Error(`${where}: explanation is empty`);
  }
  if (typeof value === "string") {
    return;
  }

  if (/\son[a-z]+\s*=/i.test(value.html) || /javascript:/i.test(value.html)) {
    throw new Error(`${where}: explanation HTML must not contain event handlers or javascript: URLs`);
  }

  const open: string[] = [];
  for (const match of value.html.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g)) {
    const [, closing, rawName, selfClosing] = match;
    const name = rawName.toLowerCase();
    if (FORBIDDEN_TAGS.has(name)) {
      throw new Error(`${where}: <${name}> is not allowed in an explanation`);
    }
    if (VOID_TAGS.has(name) || selfClosing) {
      continue;
    }
    if (!closing) {
      open.push(name);
    } else if (open.pop() !== name) {
      throw new Error(`${where}: explanation HTML has a mismatched </${name}>`);
    }
  }
  if (open.length > 0) {
    throw new Error(`${where}: explanation HTML leaves <${open.join(">, <")}> unclosed`);
  }
}
