"use client";
import { useRef, useState } from "react";
import { certificates } from "@/data/company";

function Certificate({ index }: { index: number }) {
  const c = certificates[index];
  return <svg viewBox="0 0 600 800" className="certificate-art" role="img" aria-label={`${c.name} 가상 인증서. 실제 인증 효력 없음`}>
    <rect width="600" height="800" fill="#f1efe4" /><path d="M0 0H600V24H0ZM0 776H600V800H0Z" fill="#12382c" />
    <rect x="30" y="40" width="540" height="720" fill="none" stroke="#a2ad93" /><rect x="40" y="50" width="520" height="700" fill="none" stroke="#bac2ad" />
    <g fill="none" stroke="#cad1bd" strokeWidth="1">{Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${80 + i * 14} 120L300 ${62 + i * 13}L${520 - i * 14} 120L300 ${178 - i * 7}Z`} />)}</g>
    <text x="300" y="215" textAnchor="middle" fontSize="13" letterSpacing="4" fill="#486454">ISOLINE / DEMONSTRATION</text>
    <text x="300" y="269" textAnchor="middle" fontSize="36" fontFamily="Georgia,serif" fill="#173c2e">CERTIFICATE</text>
    <text x="300" y="303" textAnchor="middle" fontSize="13" fill="#496450">{c.en}</text>
    <path d="M210 327H390" stroke="#8da681" />
    <text x="300" y="374" textAnchor="middle" fontSize="31" fontWeight="700" fill="#173c2e">{c.code}</text>
    <text x="300" y="416" textAnchor="middle" fontSize="22" fill="#173c2e">{c.name}</text>
    <text x="300" y="466" textAnchor="middle" fontSize="23" fontWeight="700" fill="#173c2e">세로결정밀</text>
    <text x="300" y="496" textAnchor="middle" fontSize="11" letterSpacing="2" fill="#496450">SEROGYEOL PRECISION</text>
    <text x="300" y="540" textAnchor="middle" fontSize="13" fill="#496450">{c.scope}</text>
    <text x="300" y="570" textAnchor="middle" fontSize="12" fill="#496450">{c.serial}</text>
    <text x="300" y="594" textAnchor="middle" fontSize="12" fill="#496450">{c.date}</text>
    <g transform="translate(300 652)"><circle r="31" fill="none" stroke="#628361" /><circle r="25" fill="none" stroke="#628361" strokeDasharray="2 4" /><text textAnchor="middle" y="4" fontSize="12" fontWeight="700" fill="#486454">DEMO</text></g>
    <text x="300" y="711" textAnchor="middle" fontSize="15" fontWeight="700" fill="#9b3b2e">가상 인증서 · 실제 인증 효력 없음</text>
    <text x="300" y="735" textAnchor="middle" fontSize="10" fill="#496450">SAMPLE DESIGN — NOT ISSUED BY A CERTIFICATION BODY</text>
  </svg>;
}

export default function Certificates() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  return <section className="sec" id="certificates"><div className="sec-head"><div><p className="kicker">Standards & records · 가상 디자인</p><h2>기준을 기록하는 방식.</h2></div><p className="lead">품질·환경경영과 출하 검사 문서의 디자인 예시.<br />각 문서를 눌러 크게 확인할 수 있습니다.</p></div>
    <div className="certificate-grid">{certificates.map((c, i) => <button className="certificate-card" key={c.id} onClick={() => { setSelected(i); dialog.current?.showModal(); }}><Certificate index={i} /><span className="code num">{c.code}</span><b>{c.name} ↗</b><small>가상 인증서 확대 보기</small></button>)}</div>
    <dialog className="certificate-dialog" ref={dialog} aria-label={`${certificates[selected].name} 확대 보기`} onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}><button className="dialog-close" onClick={() => dialog.current?.close()} autoFocus>닫기 ×</button><Certificate index={selected} /></dialog>
  </section>;
}
