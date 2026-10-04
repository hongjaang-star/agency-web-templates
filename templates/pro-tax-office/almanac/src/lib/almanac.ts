import type { Deadline } from "@/data/content";

/** 오늘(포함) 이후 가장 가까운 기한. 올해 남은 기한이 없으면 내년 첫 기한. */
export function nextDeadline(list: Deadline[], today: Date) {
  const y = today.getFullYear();
  const base = new Date(y, today.getMonth(), today.getDate());
  for (const year of [y, y + 1]) {
    for (const d of list) {
      const date = new Date(year, d.month - 1, d.day);
      if (date >= base) return { ...d, date, days: Math.round((date.getTime() - base.getTime()) / 864e5) };
    }
  }
  return null;
}
