"use client";
// 견적 체크리스트: 분야·부품·준비 자료를 체크하면 요청서 문안이 만들어진다. 서버로 보내지 않는다.
import { useMemo, useState } from "react";
import { applications, products, productsFor, type AppId } from "@/data/catalog";
import { rfq } from "@/data/content";
import { site } from "@/data/site";

export default function Rfq() {
  const [app, setApp] = useState<AppId>("ev");
  const [parts, setParts] = useState<string[]>([]);
  const [mats, setMats] = useState<string[]>([]);
  const [memo, setMemo] = useState("");
  const list = productsFor(app);
  const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const text = useMemo(() => {
    const a = applications.find((x) => x.id === app)!;
    const names = parts.map((id) => products.find((p) => p.id === id)?.name ?? id);
    return [`[견적 요청] ${site.nameKo}`, `적용 분야: ${a.name}`, `부품: ${names.length ? names.join(", ") : "아직 없음"}`, `준비된 자료: ${mats.length ? mats.join(", ") : "아직 없음"}`, `메모: ${memo || "없음"}`].join("\n");
  }, [app, parts, mats, memo]);

  return (
    <div className="rfq">
      <div>
        <fieldset>
          <legend>적용 분야</legend>
          <div className="chips">
            {applications.map((a) => (
              <label key={a.id}><input type="radio" name="app" checked={app === a.id} onChange={() => { setApp(a.id); setParts([]); }} />{a.name}</label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>부품 (선택한 분야 기준)</legend>
          {list.map((p) => (<label key={p.id}><input type="checkbox" checked={parts.includes(p.id)} onChange={() => setParts(toggle(parts, p.id))} />{p.name}</label>))}
        </fieldset>
        <fieldset>
          <legend>준비된 자료</legend>
          {rfq.materials.map((m) => (<label key={m}><input type="checkbox" checked={mats.includes(m)} onChange={() => setMats(toggle(mats, m))} />{m}</label>))}
        </fieldset>
        <label className="memo">메모<textarea rows={3} value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="수량, 납기, 표면처리 등" /></label>
      </div>
      <div className="summary-col">
        <pre className="summary num" aria-live="polite">{text}</pre>
        <a className="go" href={`mailto:${site.email}?subject=${encodeURIComponent("견적 요청")}&body=${encodeURIComponent(text)}`}>이 내용으로 메일 쓰기</a>
        <p className="hint">{rfq.lead}</p>
      </div>
    </div>
  );
}
