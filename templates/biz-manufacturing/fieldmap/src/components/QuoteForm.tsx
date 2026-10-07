"use client";
import { useState } from "react";
import { clearQuote, toggleQuote, useQuote } from "./quote-store";
import { applications, getProduct } from "@/data/catalog";
import { quoteCopy } from "@/data/content";
import { site } from "@/data/site";

export default function QuoteForm() {
  const picked = useQuote();
  const [out, setOut] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `[견적 요청] ${site.nameKo}`,
      `제품: ${picked.length ? picked.join(", ") : "미정"}`,
      `용도: ${f.get("use")}`,
      `수량: ${f.get("qty") || "미정"}`,
      `납기: ${f.get("due") || "미정"}`,
      `도면: ${f.get("dwg")}`,
      `회사·담당자: ${f.get("who") || "-"}`,
      `요청: ${f.get("memo") || "없음"}`,
    ];
    setOut(lines.join("\n"));
  }

  return (
    <form className="qform" onSubmit={submit}>
      <div className="full picked">
        <b>담은 제품</b>
        {picked.length === 0 ? (
          <span> 없음 · 제품 카드에서 &quot;견적에 담기&quot;를 누르세요</span>
        ) : (
          <ul>
            {picked.map((id) => (
              <li key={id}>
                {getProduct(id)?.name ?? id}
                <button type="button" onClick={() => toggleQuote(id)} aria-label={`${id} 빼기`}>빼기</button>
              </li>
            ))}
            <li><button type="button" onClick={clearQuote}>모두 비우기</button></li>
          </ul>
        )}
      </div>
      <label>용도<select name="use">{applications.map((a) => <option key={a.id}>{a.name}</option>)}<option>기타</option></select></label>
      <label>예상 수량<input name="qty" placeholder="예: 500개 / 월" /></label>
      <label>희망 납기<input name="due" placeholder="예: 6주 이내" /></label>
      <label>도면<select name="dwg">{quoteCopy.dwgOptions.map((o) => <option key={o}>{o}</option>)}</select></label>
      <label className="full">회사·담당자<input name="who" placeholder="예: ○○전자 구매팀 홍길동" /></label>
      <label className="full">추가 요청<textarea name="memo" rows={3} placeholder="표면처리, 포장, 성적서 양식 등" /></label>
      <button type="submit">보낼 내용 정리하기</button>
      {out && (
        <div className="full out" role="status">
          <pre>{out}</pre>
          <p>데모에서는 전송하지 않습니다. 실제 사이트에서는 <a href={`mailto:${site.email}?subject=${encodeURIComponent("견적 요청")}&body=${encodeURIComponent(out)}`}>메일로 보내기</a> 또는 상담 폼으로 접수합니다.</p>
        </div>
      )}
    </form>
  );
}
