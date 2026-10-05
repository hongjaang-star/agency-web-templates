import CaseCard from "./CaseCard";
import { cases } from "@/data/content";

/** 홈 등에 쓰는 고정 사례 카드 (검색 없음) */
export default function CaseList({ limit }: { limit?: number }) {
  return (
    <div className="case-grid up">
      {cases.slice(0, limit).map((c) => <CaseCard key={c.title} item={c} />)}
    </div>
  );
}
