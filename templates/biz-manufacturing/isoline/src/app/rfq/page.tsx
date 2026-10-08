import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import Rfq from "@/components/Rfq";
import { rfq } from "@/data/content";
import { crumbs, faq } from "@/lib/schema";
import { meta } from "@/lib/seo";

export const metadata = meta("견적 준비", "제품·수량·납기·준비 자료를 정리하고 견적 준비 메모를 복사하거나 파일로 저장하세요. 실제 접수 없는 가상 데모입니다.", "/rfq");

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
