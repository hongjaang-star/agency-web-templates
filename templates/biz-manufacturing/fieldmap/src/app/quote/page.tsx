import PageHead from "@/components/PageHead";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import { quoteCopy } from "@/data/content";
import { site } from "@/data/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "견적 요청",
  description: "담은 제품, 용도, 수량, 납기, 도면 여부를 체크하면 견적 요청 내용이 정리됩니다. 자주 묻는 질문과 연락처도 함께 확인하세요.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <PageHead eyebrow="REQUEST FOR QUOTE" title={quoteCopy.title} lead={quoteCopy.lead} crumbs={[{ href: "/quote/", label: "견적 요청" }]} />
      <section className="band dark"><QuoteForm /></section>
      <section className="band two">
        <div>
          <h2>자주 묻는 질문</h2>
          <dl className="faq">{quoteCopy.faq.map((f) => (<div key={f.q}><dt>{f.q}</dt><dd>{f.a}</dd></div>))}</dl>
        </div>
        <div className="note-box">
          <h2>전화·메일</h2>
          <p>대표전화 <b className="mono">{site.phone}</b><br />{site.email}<br />{site.hours}</p>
        </div>
      </section>
      <JsonLd data={[faqSchema(quoteCopy.faq), breadcrumbSchema([{ href: "/quote", label: "견적 요청" }])]} />
    </>
  );
}
