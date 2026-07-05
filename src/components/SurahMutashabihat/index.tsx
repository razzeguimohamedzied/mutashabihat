import type { ReactNode } from "react";
import clsx from "clsx";
import {
  getGroupsForSurah,
  getSurahInfo,
  type MutashabihMember,
} from "@site/src/data/mutashabihat";

import styles from "./styles.module.css";

/**
 * Splits `text` around every occurrence of `farq` and wraps each match in a
 * highlighted <mark>. The text is NEVER mutated — the span is marked at render
 * time. If `farq` is empty or not found, the text renders unchanged.
 */
function highlightFarq(text: string, farq: string): ReactNode {
  if (!farq || !text.includes(farq)) {
    return text;
  }
  const parts = text.split(farq);
  return parts.map((part, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <span key={i}>
      {part}
      {i < parts.length - 1 && <mark className={styles.farq}>{farq}</mark>}
    </span>
  ));
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
        <span className={styles.surahName}>{member.surahName}</span>
        <span className={styles.ayahNo}>الآية {member.ayah}</span>
        {isCurrent && <span className={styles.currentBadge}>هذه السورة</span>}
      </div>
      <p className={styles.ayahText} lang="ar">
        {highlightFarq(member.text, member.farq)}
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
 * full (all members, including those from other surahs), the differing word
 * (`farq`) is highlighted inside every member, and the member(s) belonging to
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
        </article>
      ))}
    </section>
  );
}
