"use client";
// 분야를 선택하면 설계 조건과 관련 제품을 함께 표시한다.
import { useEffect, useState } from "react";
import Sheet from "./Sheet";
import { applications, productsFor, type AppId } from "@/data/catalog";

export default function FieldRing({ initial = "ev" as AppId }: { initial?: AppId }) {
  const [cur, setCur] = useState<AppId>(initial);
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1) as AppId;
      setCur(applications.some((a) => a.id === h) ? h : initial);
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, [initial]);
  const a = applications.find((x) => x.id === cur)!;
  const list = productsFor(cur);
  function pick(id: AppId) {
    setCur(id);
    window.history.pushState(null, "", `#${id}`);
  }
  return (
    <div className="field">
      <div className="ring filter-chips compact-filters" role="group" aria-label="적용 분야">
        {applications.map((x) => (
          <button key={x.id} type="button" aria-pressed={x.id === cur} onClick={() => pick(x.id)}>{x.name}</button>
        ))}
      </div>
      <div className="scene">
        <div className="about" aria-live="polite">
          <b>{a.name}</b>
          <p>{a.summary}</p>
          <ul>{a.needs.map((n) => <li key={n}>{n}</li>)}</ul>
          <p className="check">견적 때: {a.check}</p>
        </div>
        <div className="sheets">{list.map((p) => <Sheet key={p.id} p={p} />)}</div>
      </div>
    </div>
  );
}
