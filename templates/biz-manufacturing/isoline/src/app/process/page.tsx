import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import ProcessTrack from "@/components/ProcessTrack";
import { categories } from "@/data/catalog";
import { processSteps } from "@/data/content";
import { crumbs, howTo } from "@/lib/schema";
import { meta } from "@/lib/seo";
import Link from "next/link";

export const metadata = meta("공정", "압출, 절단·교정, CNC 가공, 표면처리, 검사·포장 5단계와 카테고리별 제작 공정을 선 하나로 따라가며 보여 드립니다.", "/process");

export default function ProcessPage() {
  return (
    <>
      <PageTop kicker="Process" title="빌릿에서 출하까지" lead="알루미늄 빌릿 하나가 부품이 되기까지의 다섯 단계입니다. 설비 대수와 수치는 데모용 가상 정보입니다." trail={[{ href: "/process/", label: "PROCESS" }]} />
      <section className="sec">
        <ProcessTrack />
      </section>
      <section className="sec">
        <p className="kicker">By category</p>
        <h2>카테고리별 공정</h2>
        <table className="spec wide"><tbody>{categories.map((c) => (<tr key={c.id}><th scope="row">{c.name}</th><td className="num">{c.process}</td></tr>))}</tbody></table>
      </section>
      <section className="sec"><p className="kicker">Quality checkpoints · 예시</p><h2>어떤 기준으로 확인하나요?</h2><div className="quality-grid">
        <article><span className="code">01 / DIMENSION</span><h3>중요 치수</h3><p>도면의 기준면, 장착 홀과 베어링 자리를 먼저 정합니다. 중요 치수·측정 방법·검사 수량을 합의하고 성적서 항목으로 남깁니다.</p></article>
        <article><span className="code">02 / SURFACE</span><h3>표면과 외관</h3><p>처리 색상, 접지 접촉면과 코팅 제외 영역을 구분합니다. 표면처리 전후의 치수 차이와 외관 샘플 기준을 함께 확인합니다.</p></article>
        <article><span className="code">03 / TRACEABILITY</span><h3>시험과 로트</h3><p>밀폐 제품은 시험 조건을 별도로 정합니다. 품번·개정 도면·제작 로트와 검사 기록을 연결하고 포장 단위를 확인합니다.</p></article>
      </div><p className="hint">검사 방식과 성적서는 제품별 협의 항목입니다. 이 페이지는 가상 제조사 데모이며 실제 시험 결과나 인증 증빙이 아닙니다.</p></section>
      <section className="sec cta"><h2>도면 검토부터 시작하세요.</h2><p>도면 개정번호, 중요 공차, 요청 수량과 검사 조건을 정리하면 제작 가능성을 검토하기 쉽습니다.</p><Link className="go" href="/rfq/">견적 준비 메모 만들기 →</Link></section>
      <Ld data={[howTo("알루미늄 부품 제작 공정", processSteps), crumbs([{ href: "/process", label: "공정" }])]} />
    </>
  );
}
