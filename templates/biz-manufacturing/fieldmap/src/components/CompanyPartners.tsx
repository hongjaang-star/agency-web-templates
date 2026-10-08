"use client";
import {useState} from "react";
import {partners} from "@/data/history";
const marks=["M8 10L24 40L40 10H31L24 26L17 10Z","M8 38V10H17L31 27V10H40V38H31L17 21V38Z","M9 9H18V31H40V40H9Z","M6 40L24 7L42 40H32L24 25L16 40Z","M8 12H40V20H17V25H40V39H8V31H31V26H8Z","M6 39V10H15L24 23L33 10H42V39H33V24L24 37L15 24V39Z"];
export default function CompanyPartners(){const [paused,setPaused]=useState(false);return <section className="company-partners">
 <div className="company-section-head"><div><p className="eyebrow">INDUSTRIES WE CONNECT</p><h2>부품으로 연결되는 산업.</h2></div><div><p>납품 분야를 표현한 가상 파트너 로고입니다.<br/>실제 회사 또는 거래 관계를 의미하지 않습니다.</p><button type="button" className="partners-pause" aria-pressed={paused} onClick={()=>setPaused(p=>!p)}>{paused?'로고 흐름 재생':'로고 흐름 일시정지'}</button></div></div>
 <div className={`partner-window ${paused?'is-paused':''}`} tabIndex={0} aria-label="가상 납품사 로고 슬라이드"><div className="partner-belt">{[0,1].map(copy=><div className="partner-track" key={copy} aria-hidden={copy===1?true:undefined}>{partners.map((p,i)=><div className={`partner-logo partner-${i}`} key={p.name}><div><svg viewBox="0 0 48 48" aria-hidden="true"><path d={marks[i]} fill="currentColor"/></svg><b>{p.name}</b></div><span>{p.ko} · {p.sector}</span></div>)}</div>)}</div></div>
 </section>;}
