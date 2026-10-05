"use client";

import { useMemo, useState } from "react";
import CaseCard from "./CaseCard";
import { areas } from "@/data/areas";
import { cases } from "@/data/content";
import { casesCopy as C } from "@/data/site";

/** 사례 목록: 업무분야 라벨 필터 + 키워드 검색 (제목·본문·키워드·분야명에서 찾음) */
export default function CaseBrowser() {
  const [area, setArea] = useState("all");
  const [q, setQ] = useState("");
  const name = (slug: string) => areas.find((a) => a.slug === slug)?.ko ?? "";
  const term = q.trim().toLowerCase();
  const shown = useMemo(
    () =>
      cases.filter(
        (c) =>
          (area === "all" || c.area === area) &&
          (!term || [c.title, c.body, name(c.area), ...c.keywords].join(" ").toLowerCase().includes(term)),
      ),
    [area, term],
  );
  const chips = [{ slug: "all", ko: C.all, n: cases.length }, ...areas.map((a) => ({ slug: a.slug, ko: a.ko, n: cases.filter((c) => c.area === a.slug).length }))].filter((c) => c.n > 0);
  return (
    <div className="case-browser">
      <div className="case-tools">
        <label className="search">
          <span className="sr-only">{C.searchLabel}</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={C.searchPlaceholder} />
        </label>
        <div className="chips" role="group" aria-label={C.filterLabel}>
          {chips.map((c) => (
            <button key={c.slug} type="button" aria-pressed={area === c.slug} onClick={() => setArea(c.slug)}>
              {c.ko} <span>{c.n}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="case-count" role="status" aria-live="polite">{shown.length}{C.resultSuffix}</p>
      {shown.length ? (
        <div className="case-grid">
          {shown.map((c) => <CaseCard key={c.title} item={c} onKeyword={(k) => { setQ(k); setArea("all"); }} />)}
        </div>
      ) : (
        <div className="case-empty">
          <p>{C.empty}</p>
          <button type="button" className="btn" onClick={() => { setQ(""); setArea("all"); }}>{C.reset}</button>
        </div>
      )}
    </div>
  );
}
