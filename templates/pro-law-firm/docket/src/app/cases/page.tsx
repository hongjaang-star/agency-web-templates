import CaseList from "@/components/CaseList";
import PageHead from "@/components/PageHead";
import { casesNotice } from "@/data/content";
import { pages, seoPages } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const P = pages.cases;
export const metadata = pageMetadata({ ...seoPages.cases, path: "/cases" });

export default function CasesPage() {
  return (
    <>
      <PageHead path="/cases" label={P.label} title={P.title} lead={P.lead} crumbs={[{ label: "사례" }]} />
      <section className="sec"><div className="wrap"><CaseList links /><p className="note">{casesNotice}</p></div></section>
    </>
  );
}
