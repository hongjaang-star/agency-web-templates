import PageHero from "@/components/PageHero";
export const metadata={title:"노무자료"};
const notes=[["2026.10","해고 통지를 받았을 때 먼저 적어둘 네 가지","해고일, 통지 방식, 사유, 받은 문서를 순서대로 정리합니다."],["2026.09","급여명세서에서 확인할 항목","근로시간, 기본급, 수당, 공제 내역이 실제 근무와 맞는지 살펴봅니다."],["2026.08","취업규칙 변경 전 점검표","적용 인원과 변경 내용, 의견 청취 또는 동의 절차를 구분합니다."],["2026.07","산재 상담 전 준비자료","사고 경위, 진료 기록, 업무 내용과 근무표를 가능한 범위에서 준비합니다."]];
export default function Resources(){return <><PageHero eyebrow="LABOR NOTES" title="어려운 제도보다, 지금 확인할 항목부터." desc="상담 전 이해를 돕기 위한 일반 자료입니다. 실제 판단은 구체적인 사실관계에 따라 달라질 수 있습니다."/><section className="section noteList">{notes.map((n,i)=><article key={n[1]}><div><b>{String(i+1).padStart(2,"0")}</b><time>{n[0]}</time></div><h2>{n[1]}</h2><p>{n[2]}</p><span>READ NOTE →</span></article>)}</section></>}
