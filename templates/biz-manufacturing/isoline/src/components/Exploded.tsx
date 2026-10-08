"use client";
// 첫 화면 분해 선화. 처음 열릴 때 부품이 위아래로 벌어지고, 버튼으로 분해/조립을 바꾼다.
import { useEffect, useState } from "react";

export default function Exploded() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(t);
  }, []);
  return (
    <div className={`explode${open ? " open" : ""}`}>
      <svg viewBox="0 0 480 360" role="img" aria-label="배터리 모듈 하우징 분해 선화: 뚜껑, 기판 트레이, 바닥 케이스">
        <g fill="none" stroke="var(--lime)" strokeWidth="1.6" strokeLinejoin="round">
          <g className="part lid">
            <path d="M70 120 L210 62 L350 120 L210 178 Z" />
            <path d="M70 120 v10 L210 188 L350 130 v-10" />
            <path d="M110 120 L210 79 L310 120 L210 161 Z" strokeDasharray="4 5" opacity=".6" />
          </g>
          <g className="part tray" stroke="var(--text)">
            <path d="M110 170 L210 129 L310 170 L210 211 Z" />
            <path d="M150 175 l30 -12 M230 190 l40 -16 M190 160 l40 16" opacity=".7" />
          </g>
          <g className="part base">
            <path d="M70 200 L210 142 L350 200 L210 258 Z" opacity=".5" />
            <path d="M70 200 v60 L210 318 L350 260 v-60" />
            <path d="M210 258 v60" />
            <path d="M90 212 v40 M110 220 v40 M310 220 v40 M330 212 v40" opacity=".5" />
          </g>
        </g>
        <g className="lbl"><text x="352" y="70">LID · A6061</text><text x="322" y="152">PCB TRAY</text><text x="352" y="300">CASE · IP67 예시</text></g>
      </svg>
      <button type="button" aria-pressed={open} onClick={() => setOpen((v) => !v)}>{open ? "조립해 보기" : "분해해 보기"}</button>
    </div>
  );
}
