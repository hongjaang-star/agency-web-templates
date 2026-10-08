"use client";
import { useState } from "react";
import { partners } from "@/data/company";

function Symbol({ kind }: { kind: string }) {
  return <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">{
    kind === "bolt" ? <path d="M28 4L10 28H23L20 44L39 19H25Z" /> :
    kind === "chip" ? <><rect x="12" y="12" width="24" height="24" /><path d="M18 3V12M30 3V12M18 36V45M30 36V45M3 18H12M3 30H12M36 18H45M36 30H45" /></> :
    kind === "sun" ? <><circle cx="24" cy="24" r="10" /><path d="M24 2V8M24 40V46M2 24H8M40 24H46M8 8L13 13M35 35L40 40M8 40L13 35M35 13L40 8" /></> :
    kind === "axis" ? <><path d="M6 40L24 7L42 40ZM15 24H33" /><circle cx="24" cy="30" r="3" /></> :
    kind === "wave" ? <><path d="M4 30Q24 5 44 30M10 35Q24 18 38 35M17 40Q24 31 31 40" /><circle cx="24" cy="43" r="2" /></> :
    <path d="M18 6H30V18H42V30H30V42H18V30H6V18H18Z" />
  }</svg>;
}

export default function PartnerMarquee() {
  const [paused, setPaused] = useState(false);
  return <section className="sec partners-section"><div className="sec-head"><div><p className="kicker">Across industries · 가상 거래처</p><h2>여섯 산업, 하나의 제작 기준.</h2></div><button className="outline-button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "로고 슬라이드 재생" : "로고 슬라이드 정지"}</button></div>
    <p className="lead">납품 분야를 표현한 가상 기업 로고입니다. 실제 기업과의 거래 실적을 의미하지 않습니다.</p>
    <div className={`partner-window${paused ? " paused" : ""}`}><div className="partner-track">{[0, 1].map(copy => <ul className="partner-group" key={copy} aria-hidden={copy === 1}>{partners.map(p => <li key={p.name}><div className="partner-brand"><Symbol kind={p.symbol} /><div><b>{p.name}</b><small>{p.sub}</small></div></div><span>{p.field}</span></li>)}</ul>)}</div></div>
  </section>;
}
