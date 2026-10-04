import type { Metadata } from "next";
import Link from "next/link";
import Almanac from "@/components/Almanac";
import CaseArticles from "@/components/CaseArticles";
import QandA from "@/components/QandA";
import SectionHead from "@/components/SectionHead";
import ServiceIndex from "@/components/ServiceIndex";
import Visit from "@/components/Visit";
import JsonLd from "@/components/JsonLd";
import { column, casesNotice, faqs, team } from "@/data/content";
import { home, site } from "@/data/site";
import { absoluteUrl, assetPath } from "@/lib/config";
import { faqSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: site.seoTitle, description: site.description, url: absoluteUrl("/"), siteName: site.nameKo, locale: "ko_KR", type: "website", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: site.seoTitle, description: site.description, images: [OG_IMAGE.url] },
};

const S = home.sections;
const ceo = team[0];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">{home.kicker}</p>
          <h1>
            {home.headline.a}
            <b>{home.headline.b}</b>
            <br />
            {home.headline.c}
            <em>{home.headline.d}</em>
          </h1>
          <figure className="editorial-visual hero-visual rise">
            <img src={assetPath("/visuals/hero-office.svg")} alt="서류와 장부를 검토하며 상담을 준비하는 세무사무소 업무 장면" />
            <figcaption><span>FIELD NOTE 01</span> 신고와 상담의 하루를 준비하는 업무 테이블</figcaption>
          </figure>
          <div className="hero-foot">
            <p>{home.lead}</p>
            <div className="acts">
              <a className="btn solid" href={site.phoneHref}>{home.primaryCta}</a>
              <a className="btn" href={site.links.kakao} target="_blank" rel="noopener noreferrer">
                {home.kakaoCta}
                <span className="sr-only">(새 창)</span>
              </a>
            </div>
          </div>
          <div className="seal" aria-hidden="true">
            <div>
              <span>{home.seal.mark}</span>
              {home.seal.text[0]}
              <br />
              {home.seal.text[1]}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="alm-h">
        <div className="wrap">
          <SectionHead id="alm-h" no={S.almanac.no} title={S.almanac.title} desc={S.almanac.desc} />
          <Almanac />
          <Link className="more" href="/calendar">{S.almanac.more}</Link>
        </div>
      </section>

      <section className="sec" aria-labelledby="idx-h">
        <div className="wrap">
          <SectionHead id="idx-h" no={S.index.no} title={S.index.title} desc={S.index.desc} />
          <figure className="editorial-visual service-visual rise">
            <img src={assetPath("/visuals/services-ledger.svg")} alt="장부, 계산기, 신고 일정표와 서류로 구성한 세무 업무 이미지" />
            <figcaption><span>WORK INDEX</span> 장부·신고·상담을 하나의 흐름으로 정리합니다.</figcaption>
          </figure>
          <ServiceIndex />
          <Link className="more" href="/services">{S.index.more}</Link>
        </div>
      </section>

      <section className="sec" aria-labelledby="col-h">
        <div className="wrap">
          <SectionHead id="col-h" no={S.column.no} title={S.column.title} />
          <div className="column rise">
            <blockquote>{column.quote}</blockquote>
            <figure className="portrait-visual">
              <img src={assetPath("/visuals/ceo-portrait.svg")} alt="정장을 입은 세무 전문가 편집 일러스트" />
              <figcaption>대표 세무사 · 전문 상담</figcaption>
            </figure>
            <div className="byline">
              <b>{column.author}</b>
              {column.role}
              <ul>
                {ceo.career.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="case-h">
        <div className="wrap">
          <SectionHead id="case-h" no={S.cases.no} title={S.cases.title} desc={<>{S.cases.desc}<sup>*</sup></>} />
          <figure className="editorial-visual cases-visual rise">
            <img src={assetPath("/visuals/cases-consult.svg")} alt="고객과 세무 전문가가 서류를 사이에 두고 상담하는 사례 장면" />
            <figcaption><span>CASE FILE</span> 숫자 뒤의 사정까지 읽어야 해법이 보입니다.</figcaption>
          </figure>
          <CaseArticles />
          <p className="foot-note"><sup>*</sup> {casesNotice}</p>
          <Link className="more" href="/cases">{S.cases.more}</Link>
        </div>
      </section>

      <section className="sec" aria-labelledby="qa-h">
        <div className="wrap">
          <SectionHead id="qa-h" no={S.qa.no} title={S.qa.title} />
          <QandA />
          <JsonLd data={faqSchema(faqs)} />
        </div>
      </section>

      <section className="sec" aria-labelledby="visit-h">
        <div className="wrap">
          <SectionHead id="visit-h" no={S.visit.no} title={S.visit.title} hidden />
          <figure className="editorial-visual office-visual rise">
            <img src={assetPath("/visuals/office-consult.svg")} alt="밝고 정돈된 세무사무소에서 고객 상담을 진행하는 장면" />
            <figcaption><span>OFFICE</span> 차분하게 설명하고, 필요한 다음 단계를 함께 정합니다.</figcaption>
          </figure>
          <Visit />
        </div>
      </section>
    </>
  );
}
