import type { ReactNode } from "react";

/** 섹션 머리: 번호 + 제목 + 보조 설명. 위 괘선은 스크롤 때 그려진다. */
export default function SectionHead({ no, title, desc, id, hidden }: { no: string; title: ReactNode; desc?: ReactNode; id?: string; hidden?: boolean }) {
  return (
    <div className="sec-head draw">
      <span className="sec-no">{no}</span>
      <h2 id={id} className={hidden ? "sr-only" : undefined}>
        {title}
        {desc && <small>{desc}</small>}
      </h2>
    </div>
  );
}
