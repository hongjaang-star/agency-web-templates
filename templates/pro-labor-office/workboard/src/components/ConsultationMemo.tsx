"use client";

import { useState } from "react";

export default function ConsultationMemo() {
  const [status, setStatus] = useState("");

  function memo(form: HTMLFormElement) {
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) || "").trim() || "미작성";
    return `상담 준비 메모\n\n희망 상담 방식: ${value("method")}\n1. 당사자: ${value("party")}\n2. 중요한 날짜: ${value("date")}\n3. 준비 자료: ${value("materials")}\n4. 먼저 묻고 싶은 내용: ${value("question")}\n\n포트폴리오 데모에서 작성한 개인 메모입니다. 실제 상담 접수는 이루어지지 않았습니다.\n`;
  }

  async function copy(form: HTMLFormElement) {
    try {
      await navigator.clipboard.writeText(memo(form));
      setStatus("상담 메모를 복사했습니다. 원하는 곳에 붙여넣어 보관하세요. 실제 접수는 이루어지지 않았습니다.");
    } catch {
      setStatus("복사하지 못했습니다. 메모 파일 저장을 이용해 주세요.");
    }
  }

  function download(form: HTMLFormElement) {
    const url = URL.createObjectURL(new Blob(["\uFEFF", memo(form)], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "상담-준비-메모.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("메모 파일 다운로드를 시작했습니다. 실제 접수는 이루어지지 않았습니다.");
  }

  return <form onSubmit={event => event.preventDefault()} onChange={() => setStatus("")}>
    <fieldset className="memoMethod"><legend>희망 상담 방식</legend><label>상담 방식 선택<select name="method" defaultValue=""><option value="">아직 정하지 않았습니다</option><option>전화 상담</option><option>방문 상담</option><option>비대면 상담</option></select></label></fieldset>
    <label>1. 누구의 문제인가요?<select name="party" defaultValue=""><option value="">선택해 주세요</option><option>사업주·인사담당자</option><option>근로자·퇴직자</option><option>기타</option></select></label>
    <label>2. 가장 중요한 날짜<input name="date" type="date"/></label>
    <label>3. 현재 가지고 있는 자료<input name="materials" placeholder="예: 근로계약서, 급여명세서, 통지서"/></label>
    <label>4. 가장 먼저 묻고 싶은 내용<textarea name="question" rows={5} placeholder="상황을 간단히 적어주세요"/></label>
    <p className="formNote">작성 내용은 서버로 전송되지 않습니다. 복사하거나 파일로 저장해 직접 보관하세요. 상담 및 사건 비용은 업무 범위와 자료를 확인한 뒤 사전에 안내합니다.</p>
    <div className="memoActions"><button type="button" className="btn primary" onClick={event => { const form = event.currentTarget.form; if (form) void copy(form); }}>상담 메모 복사</button><button type="button" className="btn ghost" onClick={event => { const form = event.currentTarget.form; if (form) download(form); }}>메모 파일 저장</button></div>
    <p role="status" aria-live="polite" className="memoStatus">{status}</p>
  </form>;
}
