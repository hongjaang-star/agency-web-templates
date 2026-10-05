import Faq from "@/components/Faq";
import PageHead from "@/components/PageHead";
import NaverMap from "@/components/NaverMap";
import Visit from "@/components/Visit";
import { contactCopy as C, home, pages, seoPages, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const P = pages.contact;
export const metadata = pageMetadata({ ...seoPages.contact, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHead path="/contact" label={P.label} title={P.title} lead={P.lead} crumbs={[{ label: "오시는 길" }]} />
      <section className="sec" aria-labelledby="ch-h">
        <div className="wrap">
          <p className="eyebrow up">{C.channels.eyebrow}</p>
          <h2 id="ch-h" className="up">{C.channels.title}</h2>
          <div className="channels up">
            <a href={site.phoneHref}><span>{C.phone.label}</span><b>{site.phone}</b><p>{C.phone.desc}</p></a>
            <a href={site.links.kakao} target="_blank" rel="noopener noreferrer"><span>{C.kakao.label}</span><b>{C.kakao.title}<span className="sr-only">(새 창)</span></b><p>{C.kakao.desc}</p></a>
            <a href={`mailto:${site.email}`}><span>{C.email.label}</span><b>{site.email}</b><p>{C.email.desc}</p></a>
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="br-h">
        <div className="wrap">
          <p className="eyebrow up">{C.bring.eyebrow}</p>
          <h2 id="br-h" className="up">{C.bring.title}</h2>
          <ul className="bring up">{C.bring.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      </section>
      <section className="sec" aria-labelledby="vs-h">
        <div className="wrap">
          <p className="eyebrow up" id="vs-h">{home.sections.visit.eyebrow}</p>
          <Visit />
          <NaverMap />
          <div className="maps">
            <a className="btn" href={site.links.naverMap} target="_blank" rel="noopener noreferrer">{C.maps.naver}<span className="sr-only">(새 창)</span></a>
            <a className="btn" href={site.links.kakaoMap} target="_blank" rel="noopener noreferrer">{C.maps.kakao}<span className="sr-only">(새 창)</span></a>
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="fq-h">
        <div className="wrap">
          <p className="eyebrow up">{home.sections.faq.eyebrow}</p>
          <h2 id="fq-h" className="up">{home.sections.faq.title}</h2>
          <Faq />
        </div>
      </section>
    </>
  );
}
