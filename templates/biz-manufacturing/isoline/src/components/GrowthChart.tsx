"use client";
import { useEffect, useRef, useState } from "react";
import { growth, milestones } from "@/data/company";

export default function GrowthChart() {
  const [metric, setMetric] = useState(0);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const root = useRef<HTMLElement>(null);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: .15 }); if (root.current) observer.observe(root.current); return () => observer.disconnect(); }, []);
  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now(); let frame = 0;
    const tick = (now: number) => { const t = reduced ? 1 : Math.min((now - start) / 1600, 1); setProgress(1 - Math.pow(1 - t, 3)); if (t < 1) frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [visible, metric]);
  const m = growth[metric], max = Math.ceil(m.values[4] * 1.15 / 10) * 10;
  const points = m.values.map((v, i) => `${90 + i * 140},${300 - v / max * 235 * progress}`).join(" ");
  return <section className="sec growth-section" id="growth" ref={root}>
    <div className="sec-head"><div><p className="kicker">Growth in numbers · 가상 데이터</p><h2>쌓이는 경험,<br />넓어지는 생산의 범위.</h2></div><p className="lead">1998년부터 2026년까지의 성장 시나리오.<br />지표를 선택해 변화의 흐름을 확인하세요.</p></div>
    <div className="filter-chips" role="group" aria-label="성장 지표">{growth.map((x, i) => <button key={x.id} aria-pressed={i === metric} onClick={() => { if (i !== metric) { setProgress(0); setMetric(i); } }}>{x.label}</button>)}</div>
    <div className="growth-layout"><div className="growth-total"><p>{m.label} / 2026</p><b className="num">{(m.values[4] * progress).toLocaleString("ko-KR", { maximumFractionDigits: metric === 0 ? 1 : 0 })}<small>{m.unit}</small></b><span className="growth-change num">{m.values[0]} → {m.values[4]} {m.unit}</span><p>{m.description}</p><small>{m.caption}</small></div>
      <svg viewBox="0 0 740 365" className="growth-chart" role="img" aria-label={`${m.label}: ${milestones.map((x, i) => `${x.year}년 ${m.values[i]}${m.unit}`).join(", ")}`}>
        {[0, .5, 1].map(t => <g key={t}><line x1="65" x2="690" y1={300 - t * 235} y2={300 - t * 235} className="chart-grid" /><text x="52" y={304 - t * 235} textAnchor="end" className="chart-tick">{max * t}</text></g>)}
        {m.values.map((v, i) => <g key={i}><rect x={65 + i * 140} y={300 - v / max * 235 * progress} width="50" height={v / max * 235 * progress} className="chart-bar" /><text x={90 + i * 140} y="332" textAnchor="middle" className="chart-year">{milestones[i].year}</text><text x={90 + i * 140} y={286 - v / max * 235 * progress} textAnchor="middle" className="chart-value">{v}</text></g>)}
        <polyline points={points} className="chart-line" />{m.values.map((v, i) => <circle key={i} cx={90 + i * 140} cy={300 - v / max * 235 * progress} r="5" className="chart-point" />)}
      </svg></div>
    <details className="growth-table"><summary>모든 지표를 수치 표로 보기</summary><div className="table-scroll"><table className="spec"><thead><tr><th>지표</th>{milestones.map(x => <th key={x.year}>{x.year}</th>)}</tr></thead><tbody>{growth.map(x => <tr key={x.id}><th scope="row">{x.label} ({x.unit})</th>{x.values.map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody></table></div></details>
  </section>;
}
