import AreaList from "@/components/AreaList";
import PageHead from "@/components/PageHead";
import { pages, seoPages } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const P = pages.areas;
export const metadata = pageMetadata({ ...seoPages.areas, path: "/areas" });

export default function AreasPage() {
  return (
    <>
      <PageHead path="/areas" label={P.label} title={P.title} lead={P.lead} crumbs={[{ label: "업무분야" }]} />
      <section className="sec"><div className="wrap"><AreaList /></div></section>
    </>
  );
}
