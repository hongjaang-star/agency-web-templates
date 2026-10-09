"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { milestones } from "@/data/company";
import { BASE_PATH } from "@/lib/config";

export default function HistoryStory() {
  const [active, setActive] = useState(0);
  const chapters = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    const sync = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => {
      const focus = window.innerHeight * (window.innerWidth < 760 ? .7 : .5);
      let next = 0, distance = Infinity;
      chapters.current.forEach((el, i) => { if (!el) return; const r = el.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - focus); if (d < distance) { distance = d; next = i; } });
      setActive(next);
    }); };
    sync(); window.addEventListener("scroll", sync, { passive: true }); window.addEventListener("resize", sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", sync); window.removeEventListener("resize", sync); };
  }, []);
  return <section className="sec history-story" id="history">
    <p className="kicker">Our journey / 1998—2026 · 가상 연혁</p><h2>작은 작업장에서,<br />연결된 생산동까지.</h2><p className="lead">스크롤을 따라 공장의 시간이 흐릅니다. 연혁과 공장 사진은 가상 제조사의 성장 과정을 표현한 콘텐츠입니다.</p>
    <div className="history-layout">
      <div className="history-stage">
        <div className="history-date"><span className="num">{milestones[active].year}</span><small>0{active + 1} / 05</small></div>
        <div className="history-photo">{milestones.map((m, i) => <img key={m.year} src={`${BASE_PATH}/images/${m.image}`} alt={m.alt} className={i === active ? "active" : ""} aria-hidden={i !== active} width={1200} height={800} loading={i === 0 ? "eager" : "lazy"} />)}</div>
        <p className="history-caption">{milestones[active].detail}<span>AI 제작 공장 이미지</span></p>
        <nav className="history-years" aria-label="연혁 시점 이동">{milestones.map((m, i) => <a key={m.year} href={`#history-${m.year}`} aria-current={active === i ? "step" : undefined}>{m.year}</a>)}</nav>
      </div>
      <div className="history-chapters">{milestones.map((m, i) => <article className={`history-chapter${active === i ? " active" : ""}`} id={`history-${m.year}`} key={m.year} ref={el => { chapters.current[i] = el; }}><span className="code num">{m.year} / {m.chapter}</span><h3>{m.title}</h3><p>{m.body}</p><small>{m.detail}</small></article>)}</div>
    </div>
  </section>;
}
