import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import Rfq from "@/components/Rfq";
import { rfq } from "@/data/content";
import { crumbs, faq } from "@/lib/schema";
import { meta } from "@/lib/seo";

export const metadata = meta("견적 체크리스트", "적용 분야, 부품, 준비된 자료를 체크하면 견적 요청서 문안이 만들어집니다. 도면·시제품·성적서에 관한 질문도 확인하세요.", "/rfq");

export default function RfqPage() {
  return (
    <>
      <PageTop kicker="Request for quote" title="견적 전에 이것만 체크해 주세요" lead={rfq.lead} trail={[{ href: "/rfq/", label: "RFQ" }]} />
      <section className="sec"><Rfq /></section>
      <section className="sec">
        <p className="kicker">FAQ</p>
        <h2>자주 묻는 질문</h2>
        <dl className="faq">{rfq.faq.map((f) => (<div key={f.q}><dt>{f.q}</dt><dd>{f.a}</dd></div>))}</dl>
      </section>
      <Ld data={[faq(rfq.faq), crumbs([{ href: "/rfq", label: "견적 체크리스트" }])]} />
    </>
  );
}
