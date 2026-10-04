import JsonLd from "@/components/JsonLd";
import Lawyers from "@/components/Lawyers";
import PageHead from "@/components/PageHead";
import { principles } from "@/data/content";
import { attorneysCopy as C, pages, seoPages } from "@/data/site";
import { lawyerSchemas } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const P = pages.attorneys;
export const metadata = pageMetadata({ ...seoPages.attorneys, path: "/attorneys" });

export default function AttorneysPage() {
  return (
    <>
      <JsonLd data={lawyerSchemas()} />
      <PageHead path="/attorneys" label={P.label} title={P.title} lead={P.lead} crumbs={[{ label: "변호사" }]} />
      <section className="sec" aria-labelledby="team-h">
        <div className="wrap">
          <p className="eyebrow up">{C.team.eyebrow}</p>
          <h2 id="team-h" className="up">{C.team.title}</h2>
          <Lawyers full />
        </div>
      </section>
      <section className="sec" aria-labelledby="pr-h">
        <div className="wrap">
          <p className="eyebrow up">{C.principles.eyebrow}</p>
          <h2 id="pr-h" className="up">{C.principles.title}</h2>
          <div className="principles up">
            {principles.map((p) => <article key={p.no}><span>{p.no}</span><h3>{p.title}</h3><p>{p.desc}</p></article>)}
          </div>
        </div>
      </section>
    </>
  );
}
