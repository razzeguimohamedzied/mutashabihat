import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Explanation from "@site/src/components/Explanation";
import {
  getGroupsForSurah,
  getSurahInfo,
  type MutashabihMember,
} from "@site/src/data/mutashabihat";

import styles from "./styles.module.css";

/**
 * Wraps every occurrence of each `similarity` phrase in `text` in a highlighted
 * <mark>. The text is NEVER mutated — the spans are marked at render time. If no
 * phrase is found, the text renders unchanged.
 */
function highlightSimilarity(
  text: string,
  similarity: string | readonly string[],
): ReactNode {
  const phrases = (typeof similarity === "string" ? [similarity] : similarity)
    .filter((p) => p.length > 0);
  const ranges: { start: number; end: number }[] = [];
  for (const phrase of phrases) {
    for (let at = text.indexOf(phrase); at !== -1; at = text.indexOf(phrase, at + phrase.length)) {
      ranges.push({ start: at, end: at + phrase.length });
    }
  }
  if (ranges.length === 0) {
    return text;
  }
  ranges.sort((a, b) => a.start - b.start);
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const { start, end } of ranges) {
    if (start < cursor) {
      continue; // overlaps an earlier match
    }
    nodes.push(text.slice(cursor, start));
    nodes.push(
      <mark key={start} className={styles.similarity}>
        {text.slice(start, end)}
      </mark>,
    );
    cursor = end;
  }
  nodes.push(text.slice(cursor));
  return nodes;
}

function MemberCard({
  member,
  isCurrent,
}: {
  member: MutashabihMember;
  isCurrent: boolean;
}): ReactNode {
  return (
    <li
      className={clsx(styles.member, isCurrent && styles.memberCurrent)}
      aria-current={isCurrent ? "true" : undefined}
    >
      <div className={styles.memberRef}>
        {isCurrent ? (
          <span className={styles.surahName}>{member.surahName}</span>
        ) : (
          <Link
            className={clsx(styles.surahName, styles.surahLink)}
            to={`/mutashabihat/${getSurahInfo(member.surah)?.slug ?? ""}`}
          >
            {member.surahName}
          </Link>
        )}
        <span className={styles.ayahNo}>الآية {member.ayah}</span>
        {isCurrent && <span className={styles.currentBadge}>هذه السورة</span>}
      </div>
      <p className={styles.ayahText} lang="ar">
        {highlightSimilarity(member.text, member.similarity)}
      </p>
    </li>
  );
}

export interface SurahMutashabihatProps {
  /** Surah number, 1..114. */
  surah: number;
}

/**
 * Renders every similarity group that touches `surah`. Each group is shown in
 * full (all members, including those from other surahs), the shared word
 * (`similarity`) is highlighted inside every member, and the member(s) belonging to
 * the current surah are emphasized.
 */
export default function SurahMutashabihat({
  surah,
}: SurahMutashabihatProps): ReactNode {
  const info = getSurahInfo(surah);
  const groups = getGroupsForSurah(surah);

  if (!info) {
    return <p>رقم سورة غير صالح: {surah}</p>;
  }

  return (
    <section className={styles.root} dir="rtl">
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>متشابهات سورة {info.name}</h1>
        <p className={styles.pageSubtitle}>
          {groups.length > 0
            ? `${groups.length} مجموعة متشابهات تخص هذه السورة`
            : "لا توجد متشابهات مسجّلة لهذه السورة بعد."}
        </p>
      </header>

      {groups.map((group) => (
        <article key={group.id} className={styles.group}>
          <h2 className={styles.groupTitle}>{group.title}</h2>
          <ol className={styles.members}>
            {group.members.map((member) => (
              <MemberCard
                key={`${member.surah}:${member.ayah}`}
                member={member}
                isCurrent={member.surah === surah}
              />
            ))}
          </ol>
          {group.memorizationRule && (
            <aside className={styles.dabit} lang="ar">
              <span className={styles.dabitLabel}>الضابط</span>
              <Explanation value={group.memorizationRule} />
            </aside>
          )}
        </article>
      ))}
    </section>
  );
}
