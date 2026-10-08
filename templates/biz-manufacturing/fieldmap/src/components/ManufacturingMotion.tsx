"use client";
import { useEffect, useRef, useState } from "react";
import { capability } from "@/data/content";

export default function ManufacturingMotion() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => setPlaying(!media.matches);
    preference(); media.addEventListener("change", preference);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener("change", preference); };
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    const timer = setInterval(() => { if (!document.hidden) setStep(s => (s + 1) % 6); }, 3600);
    return () => clearInterval(timer);
  }, [playing, visible]);
  const current = capability.steps[step];
  return <section ref={root} className={`manufacturing ${playing && visible ? "is-playing" : ""}`} aria-label="알루미늄 제조 과정 모션그래픽">
    <div className="motion-head"><div><p className="eyebrow">FROM MATERIAL TO PRECISION</p><h2>소재가 부품이 되는 순간.</h2></div><button className="motion-play" type="button" aria-pressed={playing} onClick={() => setPlaying(p => !p)}>{playing ? "모션 일시정지" : "모션 재생"}</button></div>
    <div className="motion-layout">
      <div className="motion-screen" data-stage={step}>
        <div className="motion-status"><span className="signal" />PROCESS / 0{step + 1}<span>RX-4040 · 공정 개념도</span></div>
        <svg viewBox="0 0 780 380" role="img" aria-label={`${current.title} 공정 개념 애니메이션`}>
          <defs><pattern id="fm-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#364043" strokeWidth=".6" /></pattern><linearGradient id="fm-metal"><stop stopColor="#f0f3f1"/><stop offset=".5" stopColor="#a7b4b6"/><stop offset="1" stopColor="#617175"/></linearGradient></defs>
          <rect width="780" height="380" fill="url(#fm-grid)" />
          <ellipse cx="426" cy="305" rx="245" ry="24" fill="#000" opacity=".25" />
          {step === 0 && <g className="motion-blueprint" fill="none" stroke="#ff7a45" strokeWidth="2"><path d="M180 260V105H330V260ZM210 135H300V230H210ZM165 85H345M150 100V265M180 285H650"/><circle cx="255" cy="182" r="20"/><path strokeDasharray="5 8" d="M255 60V300M120 182H380M330 105L610 170V285L330 260M330 105L650 85V240L330 260"/></g>}
          {step !== 0 && <g className="motion-part" key={step}>
            <polygon points="230,145 585,95 655,150 300,200" fill="url(#fm-metal)"/>
            <polygon points="300,200 655,150 655,255 300,305" fill="#7a8c90"/>
            <path d="M315 216L638 171M315 281L638 236M325 249L628 207" stroke="#26363b" strokeWidth="11"/>
            <path d="M230 145H300V305H230Z" fill="#dce4e3"/>
            <path d="M240 158H288V291H240Z" fill="#445b63"/>
            <path d="M247 175H282M247 274H282M259 162V185M259 263V287" stroke="#dce4e3" strokeWidth="8"/>
            <circle cx="264" cy="230" r="17" fill="#18282e"/>
          </g>}
          {step === 1 && <><g className="motion-feed"><rect x="65" y="173" width="100" height="85" rx="35" fill="#ff7439"/><ellipse cx="165" cy="215" rx="20" ry="42" fill="#ffb081"/><path d="M50 215H90" stroke="#ffb081" strokeWidth="4"/></g><rect x="194" y="105" width="35" height="205" rx="8" fill="#465559"/><path d="M185 95V320" stroke="#ff7439" strokeWidth="2"/></>}
          {step === 2 && <g className="motion-saw"><rect x="420" y="35" width="24" height="80" fill="#9caeaf"/><circle cx="432" cy="133" r="41" fill="#ced8d5" stroke="#ff7439" strokeWidth="5" strokeDasharray="4 6"/><path d="M432 92V174M391 133H473" stroke="#607175" strokeWidth="3"/></g>}
          {step === 3 && <><g className="motion-cutter"><rect x="390" y="20" width="58" height="55" rx="4" fill="#53676d"/><path d="M410 75H429V148H410Z" fill="#d3dedb"/><path d="M410 103L429 111M410 118L429 126M410 133L429 141" stroke="#ff7439" strokeWidth="4"/></g><g className="motion-chips" fill="#ff925e"><rect x="385" y="165" width="6" height="10" transform="rotate(20 385 165)"/><rect x="450" y="165" width="8" height="5"/><rect x="473" y="188" width="7" height="7"/></g></>}
          {step === 4 && <g className="motion-finish"><path d="M218 139L587 84L668 146V262L302 317L219 302Z" fill="#18282e" opacity=".55" stroke="#ff7439" strokeWidth="2"/><path d="M205 130L675 60M205 166L675 96" stroke="#ff9d71" opacity=".6" strokeWidth="2"/></g>}
          {step === 5 && <><g className="motion-scan"><path d="M195 60V335" stroke="#77e4be" strokeWidth="3"/><path d="M195 60H230V335H195Z" fill="#77e4be" opacity=".1"/></g><g fill="none" stroke="#77e4be" strokeWidth="2"><path d="M200 325H670M200 316V334M670 316V334M680 145V265M672 145H688M672 265H688"/><path d="M95 175L113 193L145 150" strokeWidth="5"/></g></>}
        </svg>
        <p className="motion-disclaimer">표준 압출 프로파일의 제조 흐름을 단순화한 그래픽입니다. 제품별 공정은 상세 사양에서 확인하세요.</p>
      </div>
      <div className="motion-copy"><span className="motion-number">0{step + 1}<small>/ 06</small></span><h3>{current.title}</h3><p>{current.body}</p><div className="motion-progress"><span key={step} /></div><p className="mono">DESIGN → FORM → FINISH</p></div>
    </div>
    <div className="motion-stages" aria-label="제조 공정 선택">{capability.steps.map((s,i) => <button key={s.no} type="button" aria-pressed={step === i} onClick={() => {setStep(i);setPlaying(false);}}><span>{s.no}</span>{s.title}</button>)}</div>
  </section>;
}
