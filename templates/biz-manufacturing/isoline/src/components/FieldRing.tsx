"use client";
// 적용 분야 링: 큰 외곽선 글자로 분야를 고르면 해당 부품 도면이 한 장씩 펼쳐진다.
import { useEffect, useState } from "react";
import Sheet from "./Sheet";
import { applications, productsFor, type AppId } from "@/data/catalog";

export default function FieldRing({ initial = "ev" as AppId }: { initial?: AppId }) {
  const [cur, setCur] = useState<AppId>(initial);
  useEffect(() => {
    const h = window.location.hash.slice(1) as AppId;
    // 주소의 #분야 는 첫 렌더 이후에만 읽을 수 있다(정적 export)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (applications.some((a) => a.id === h)) setCur(h);
  }, []);
  const a = applications.find((x) => x.id === cur)!;
  const list = productsFor(cur);
  function pick(id: AppId) {
    setCur(id);
    window.history.replaceState(null, "", `#${id}`);
  }
  return (
    <div className="field">
      <div className="ring" role="group" aria-label="적용 분야">
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
