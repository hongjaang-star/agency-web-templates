import { areas } from "@/data/areas";

/** 업무분야가 흐르는 띠. 장식용이라 보조기기에서는 숨긴다(같은 내용이 목록에 있음). */
export default function Ticker() {
  const items = [...areas, ...areas];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((a, i) => <span key={a.slug + i}>{a.ko}</span>)}
      </div>
    </div>
  );
}
