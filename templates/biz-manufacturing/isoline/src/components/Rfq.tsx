"use client";
import { useEffect, useState } from "react";
import { applications, products, type AppId } from "@/data/catalog";
import { rfq } from "@/data/content";
import { site } from "@/data/site";

export default function Rfq() {
  const [app, setApp] = useState<AppId>("ev");
  const [parts, setParts] = useState<string[]>([]);
  const [mats, setMats] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [stage, setStage] = useState("시제품 검토");
  const [date, setDate] = useState("");
  const [memo, setMemo] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const p = products.find(p => p.id === new URLSearchParams(window.location.search).get("part"));
    if (p) {
      // A validated product link initializes the static-export client form.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParts([p.id]);
      setApp(p.apps[0]);
    }
  }, []);
  const toggle = (arr: string[], v: string) => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
  const selected = products.filter(p => parts.includes(p.id));
  const list = [...products].sort((a, b) => Number(b.apps.includes(app)) - Number(a.apps.includes(app)));
  const text = [`[견적 준비 메모] ${site.nameKo}`, `적용 분야: ${applications.find(a => a.id === app)!.name}`, `제작 단계: ${stage}`, `희망 납기: ${date || "협의"}`, "제품·수량:", ...(selected.length ? selected.map(p => `- ${p.id} ${p.name} / ${quantities[p.id] || "수량 협의"}`) : ["- 아직 선택하지 않음"]), `준비된 자료: ${mats.length ? mats.join(", ") : "아직 없음"}`, `추가 요청: ${memo || "없음"}`, "※ 가상 업체 데모. 이 메모는 실제 견적 접수 또는 납기 확정이 아닙니다."].join("\n");
  async function copy() {
    try { await navigator.clipboard.writeText(text); setStatus("견적 준비 메모를 복사했습니다."); }
    catch { setStatus("자동 복사를 사용할 수 없습니다. 아래 메모를 선택해 직접 복사하거나 파일로 저장해 주세요."); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob(["\ufeff", text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "isoline-rfq.txt"; a.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("견적 준비 메모를 파일로 저장했습니다.");
  }
  function reset() { setParts([]); setMats([]); setQuantities({}); setStage("시제품 검토"); setDate(""); setMemo(""); setApp("ev"); window.history.replaceState(null, "", window.location.pathname); setStatus("작성 내용을 초기화했습니다."); }
  return <div className="rfq">
    <div>
      <fieldset><legend>01 · 적용 분야</legend><div className="chips">{applications.map(a => <label key={a.id}><input type="radio" name="app" checked={app === a.id} onChange={() => setApp(a.id)} />{a.name}</label>)}</div><p className="hint">분야를 바꿔도 선택한 제품과 수량은 유지됩니다.</p></fieldset>
      <fieldset><legend>02 · 제품 선택</legend><p className="hint">선택한 분야의 관련 제품을 먼저 표시합니다.</p>{list.map(p => <label key={p.id}><input type="checkbox" checked={parts.includes(p.id)} onChange={() => setParts(toggle(parts, p.id))} /><span>{p.name}{p.apps.includes(app) && <small className="recommended">관련 제품</small>}</span></label>)}</fieldset>
      {selected.length > 0 && <fieldset><legend>03 · 제품별 요청 수량</legend>{selected.map(p => <label className="quantity-row" key={p.id}>{p.id}<input type="text" maxLength={40} value={quantities[p.id] || ""} onChange={e => setQuantities({ ...quantities, [p.id]: e.target.value })} placeholder="예: 10개 또는 50m" /></label>)}</fieldset>}
      <fieldset><legend>제작 단계·희망 납기</legend><div className="chips">{["시제품 검토", "양산 검토"].map(x => <label key={x}><input type="radio" name="stage" checked={stage === x} onChange={() => setStage(x)} />{x}</label>)}</div><label className="date-row">희망 납기<input type="date" value={date} onChange={e => setDate(e.target.value)} /></label><p className="hint">표시된 최소 주문·납기는 양산 예시입니다. 시제품과 실제 납기는 별도 협의합니다.</p></fieldset>
      <fieldset><legend>준비된 자료</legend>{rfq.materials.map(m => <label key={m}><input type="checkbox" checked={mats.includes(m)} onChange={() => setMats(toggle(mats, m))} />{m}</label>)}</fieldset>
      <label className="memo">추가 요청<textarea rows={4} maxLength={2000} value={memo} onChange={e => setMemo(e.target.value)} placeholder="공차, 표면처리, 검사 조건 등" /></label>
    </div>
    <div className="summary-col"><p className="kicker">Your request / 선택 {parts.length}종</p><label className="summary-label">견적 준비 메모<textarea aria-label="견적 준비 메모" className="summary num" readOnly value={text} rows={16} /></label><div className="request-actions"><button type="button" className="go" onClick={copy}>메모 복사</button><button type="button" className="outline-button" onClick={download}>텍스트 파일 저장</button><button type="button" className="text-button" onClick={reset}>작성 초기화</button></div><p role="status" className="hint">{status}</p><p className="hint">실제 업체로 전송되지 않습니다. 작성 중인 내용은 이 화면에서만 유지되므로 이동하기 전에 복사하거나 저장해 주세요.</p></div>
  </div>;
}
