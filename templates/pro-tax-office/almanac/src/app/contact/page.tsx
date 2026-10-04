import Folio from "@/components/Folio";
import QandA from "@/components/QandA";
import SectionHead from "@/components/SectionHead";
import Visit from "@/components/Visit";
import { contactCopy as K, pages, site, seoPages } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const P = pages.contact;
export const metadata = pageMetadata({ ...seoPages.contact, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <Folio path="/contact" kicker={P.no} title={P.title} lead={P.desc} crumbs={[{ label: P.no }]} />
      <section className="sec" aria-labelledby="ch-h">
        <div className="wrap">
          <SectionHead id="ch-h" no={K.channels.no} title={K.channels.title} />
          <div className="channels rise">
            <a href={site.phoneHref}><span>{K.phone.label}</span><b>{site.phone}</b><p>{K.phone.desc}</p></a>
            <a href={site.links.kakao} target="_blank" rel="noopener noreferrer"><span>{K.kakao.label}</span><b>{K.kakao.title}<span className="sr-only">(새 창)</span></b><p>{K.kakao.desc}</p></a>
            <a href={`mailto:${site.email}`}><span>{K.email.label}</span><b>{site.email}</b><p>{K.email.desc}</p></a>
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="vs-h">
        <div className="wrap">
          <SectionHead id="vs-h" no={K.visit.no} title={K.visit.title} hidden />
          <Visit />
          <div className="maps">
            <a className="btn" href={site.links.naverMap} target="_blank" rel="noopener noreferrer">{K.maps.naver}<span className="sr-only">(새 창)</span></a>
            <a className="btn" href={site.links.kakaoMap} target="_blank" rel="noopener noreferrer">{K.maps.kakao}<span className="sr-only">(새 창)</span></a>
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="q-h">
        <div className="wrap">
          <SectionHead id="q-h" no={K.qa.no} title={K.qa.title} />
          <QandA />
        </div>
      </section>
    </>
  );
}
