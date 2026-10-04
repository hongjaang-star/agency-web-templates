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
import { absoluteUrl } from "@/lib/config";
import { faqSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";
import EditorialBackdrop from "@/components/EditorialBackdrop";
import { editorialArt } from "@/data/editorial-art";

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
        <EditorialBackdrop src={editorialArt.hero} />
        <div className="wrap">
          <p className="kicker">{home.kicker}</p>
          <h1>
            {home.headline.a}
            <b>{home.headline.b}</b>
            <br />
            {home.headline.c}
            <em>{home.headline.d}</em>
          </h1>
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
          <ServiceIndex />
          <Link className="more" href="/services">{S.index.more}</Link>
        </div>
      </section>

      <section className="sec" aria-labelledby="col-h">
        <div className="wrap">
          <SectionHead id="col-h" no={S.column.no} title={S.column.title} />
          <div className="column rise">
            <blockquote>{column.quote}</blockquote>
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
          <Visit />
        </div>
      </section>
    </>
  );
}
