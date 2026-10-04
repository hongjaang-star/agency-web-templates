import CaseArticles from "@/components/CaseArticles";
import Folio from "@/components/Folio";
import { casesNotice } from "@/data/content";
import { pages, seoPages } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const P = pages.cases;
export const metadata = pageMetadata({ ...seoPages.cases, path: "/cases" });

export default function CasesPage() {
  return (
    <>
      <Folio path="/cases" kicker={P.no} title={P.title} lead={P.desc} crumbs={[{ label: P.no }]} />
      <section className="sec">
        <div className="wrap">
          <CaseArticles full />
          <p className="foot-note"><sup>*</sup> {casesNotice}</p>
        </div>
      </section>
    </>
  );
}
