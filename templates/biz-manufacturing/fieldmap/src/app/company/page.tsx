import PageHead from "@/components/PageHead";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/content";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "회사",
  description: `${site.nameKo}(가상)의 회사 소개, 연혁, 인증 표기 예시, 납품 분야와 오시는 길을 안내합니다.`,
  path: "/company",
});

export default function CompanyPage() {
  return (
    <>
      <PageHead eyebrow="COMPANY" title="회사" lead={company.intro} crumbs={[{ href: "/company/", label: "회사" }]} />
      <section className="band">
        <h2>연혁 (가상)</h2>
        <ol className="history">{company.history.map((h) => (<li key={h.year}><b className="mono">{h.year}</b><span>{h.text}</span></li>))}</ol>
      </section>
      <section className="band two">
        <div>
          <h2>인증 (가상 예시)</h2>
          <ul className="rows">{company.certs.map((x) => (<li key={x.name}>{x.name}<em>{x.code} · {x.note}</em></li>))}</ul>
        </div>
        <div>
          <h2>납품 분야 (가상 예시)</h2>
          <ul className="rows">{company.sectors.map((x) => (<li key={x.name}>{x.name}<em>{x.parts}</em></li>))}</ul>
        </div>
      </section>
      <section className="band">
        <h2>오시는 길</h2>
        <table className="spec-table"><tbody>
          <tr><th scope="row">주소</th><td>{site.address}</td></tr>
          <tr><th scope="row">대표전화</th><td>{site.phone}</td></tr>
          <tr><th scope="row">이메일</th><td>{site.email}</td></tr>
          <tr><th scope="row">근무 시간</th><td>{site.hours}</td></tr>
        </tbody></table>
      </section>
      <JsonLd data={breadcrumbSchema([{ href: "/company", label: "회사" }])} />
    </>
  );
}
