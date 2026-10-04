import type { Metadata } from "next";
import Link from "next/link";
import AreaList from "@/components/AreaList";
import CaseFlow from "@/components/CaseFlow";
import CaseList from "@/components/CaseList";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Lawyers from "@/components/Lawyers";
import Ticker from "@/components/Ticker";
import Visit from "@/components/Visit";
import { casesNotice, faqs } from "@/data/content";
import { home, site } from "@/data/site";
import { absoluteUrl } from "@/lib/config";
import { faqSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: site.seoTitle, description: site.description, url: absoluteUrl("/"), siteName: site.nameKo, locale: "ko_KR", type: "website", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: site.seoTitle, description: site.description, images: [OG_IMAGE.url] },
};

const S = home.sections;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="label">{home.label}</p>
          <h1>{home.headline.a}<br />{home.headline.b}<span>{home.headline.c}</span></h1>
          <div className="hero-row">
            <p>{home.lead}</p>
            <div className="acts">
              <a className="btn solid" href={site.phoneHref}>{home.primaryCta}</a>
              <a className="btn" href="#flow">{home.secondaryCta}</a>
            </div>
          </div>
        </div>
        <Ticker />
      </section>

      <section className="sec" aria-labelledby="areas-h">
        <div className="wrap">
          <p className="eyebrow up">{S.areas.eyebrow}</p>
          <h2 id="areas-h" className="up">{S.areas.title}</h2>
          <AreaList />
        </div>
      </section>

      <section className="sec dark on-dark" id="flow" aria-labelledby="flow-h">
        <div className="wrap">
          <p className="eyebrow up">{S.flow.eyebrow}</p>
          <h2 id="flow-h" className="up">{S.flow.title}</h2>
          <p className="lead up">{S.flow.lead}</p>
          <CaseFlow />
          <Link className="more" href="/flow">{S.flow.more}</Link>
        </div>
      </section>

      <section className="sec" aria-labelledby="law-h">
        <div className="wrap">
          <p className="eyebrow up">{S.attorneys.eyebrow}</p>
          <h2 id="law-h" className="up">{S.attorneys.title}</h2>
          <Lawyers />
          <Link className="more" href="/attorneys">{S.attorneys.more}</Link>
        </div>
      </section>

      <section className="sec" aria-labelledby="case-h">
        <div className="wrap">
          <p className="eyebrow up">{S.cases.eyebrow}</p>
          <h2 id="case-h" className="up">{S.cases.title}</h2>
          <CaseList limit={4} />
          <p className="note">{casesNotice}</p>
          <Link className="more" href="/cases">{S.cases.more}</Link>
        </div>
      </section>

      <section className="sec" aria-labelledby="faq-h">
        <div className="wrap">
          <p className="eyebrow up">{S.faq.eyebrow}</p>
          <h2 id="faq-h" className="up">{S.faq.title}</h2>
          <Faq limit={4} />
          <JsonLd data={faqSchema(faqs)} />
        </div>
      </section>

      <section className="sec" aria-labelledby="visit-h">
        <div className="wrap">
          <p className="eyebrow up" id="visit-h">{S.visit.eyebrow}</p>
          <Visit />
        </div>
      </section>
    </>
  );
}
