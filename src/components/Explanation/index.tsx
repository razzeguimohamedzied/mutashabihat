import type { ReactNode } from "react";
import type { Explanation as ExplanationValue } from "@site/src/data/explanation";

import styles from "./styles.module.css";

/** Matches a «…» quotation (guillemets included). */
const QUOTE = /«[^«»]*»/g;

/**
 * Emphasises every «…» quotation in plain `text` (guillemets kept) so quoted
 * Qur'anic words stand out from the surrounding explanation.
 */
function emphasiseQuotes(text: string): ReactNode[] {
  return text.split(/(«[^«»]*»)/).map((part, i) =>
    part.startsWith("«") && part.endsWith("»") ? (
      <span key={i} className={styles.quote}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export interface ExplanationProps {
  value: ExplanationValue;
}

/**
 * Renders an `Explanation`: plain text as a paragraph, or `{ html }` injected
 * as-is (trusted, build-time content validated by `assertExplanation`).
 */
export default function Explanation({ value }: ExplanationProps): ReactNode {
  if (typeof value === "string") {
    return <p className={styles.text}>{emphasiseQuotes(value)}</p>;
  }
  const html = value.html
    .trim()
    .replace(QUOTE, (quote) => `<span class="${styles.quote}">${quote}</span>`);
  return <div className={styles.text} dangerouslySetInnerHTML={{ __html: html }} />;
}
