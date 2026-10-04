"use client";

import { useEffect, useState } from "react";
import { deadlines } from "@/data/content";
import { almanacCopy } from "@/data/site";
import { nextDeadline } from "@/lib/almanac";

/**
 * 세무 연감 (시그니처): 오늘 기준 다음 신고 기한 D-day + 12개월 띠.
 * 정적 빌드 시점이 아닌 방문 시점의 날짜를 써야 하므로, 날짜 계산은 브라우저에서 한다.
 */
export default function Almanac() {
  const [today, setToday] = useState<Date | null>(null);
  // 정적 HTML 은 날짜 없이 렌더링하고, 브라우저에서 방문일로 다시 계산한다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setToday(new Date()), []);

  const next = today ? nextDeadline(deadlines, today) : null;
  const month = today ? today.getMonth() + 1 : 0;
  const byMonth = Array.from({ length: 12 }, (_, i) => deadlines.filter((d) => d.month === i + 1));

  return (
    <>
      <div className="alm-now rise">
        <div className="dday" aria-live="polite">
          {next ? (next.days === 0 ? "D-DAY" : `D-${next.days}`) : "D-·"}
        </div>
        <div className="dday-txt">
          <b>{next ? next.item : "다음 신고 기한"}</b>
          {next && (
            <p>
              {almanacCopy.dueLabel} {next.date.getMonth() + 1}월 {next.date.getDate()}일 · {next.who}
            </p>
          )}
          <p>{almanacCopy.urgent}</p>
        </div>
      </div>
      <ol className="months rise">
        {byMonth.map((items, i) => {
          const m = i + 1;
          const cls = !month ? "m" : m < month ? "m past" : m === month ? "m now" : "m";
          return (
            <li key={m} className={cls} aria-current={m === month ? "date" : undefined}>
              <h3>{m}월</h3>
              {m === month && <span className="badge">{almanacCopy.thisMonth}</span>}
              <ul>
                {items.map((d) => (
                  <li key={d.item}>
                    {d.day}일 · {d.item}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
      <p className="alm-note">{almanacCopy.note}</p>
    </>
  );
}
