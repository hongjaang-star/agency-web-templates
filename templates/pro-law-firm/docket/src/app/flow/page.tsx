import Link from "next/link";
import CaseFlow from "@/components/CaseFlow";
import FlowNav from "@/components/FlowNav";
import PageHead from "@/components/PageHead";
import { flows } from "@/data/content";
import { flowCopy, flowPageCopy as F, pages, seoPages } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const P = pages.flow;
export const metadata = pageMetadata({ ...seoPages.flow, path: "/flow" });

export default function FlowPage() {
  return (
    <>
      <PageHead path="/flow" label={P.label} title={P.title} lead={P.lead} crumbs={[{ label: "사건 흐름" }]} />
      <section className="sec dark on-dark"><div className="wrap"><CaseFlow /></div></section>
      <section className="sec" aria-labelledby="steps-h">
        <div className="wrap">
          <p className="eyebrow up">{F.eyebrow}</p>
          <h2 id="steps-h" className="up">{F.title}</h2>
          <div className="steps-layout">
            <FlowNav />
            <div className="steps-body">
              {flows.map((f) => (
                <section className="flow-block" key={f.key} id={f.key} aria-labelledby={`h-${f.key}`}>
                  <p className="eyebrow">{f.label}</p>
                  <h3 id={`h-${f.key}`}>{f.procedure}</h3>
                  <p className="lead">{f.intro}</p>
                  <div className="flow-table">
                    {f.steps.map((s, i) => (
                      <article key={s.title}>
                        <span className="k">{flowCopy.stepLabel} {String(i + 1).padStart(2, "0")}</span>
                        <div><h4>{s.title}</h4><p>{s.desc}</p></div>
                        <ul aria-label={flowCopy.prepareLabel}>{s.prepare.map((p) => <li key={p}>{p}</li>)}</ul>
                        <span className="period">{s.period}</span>
                      </article>
                    ))}
                  </div>
                  <Link className="more" href={`/areas/${f.key}`}>{f.label} {F.areaLink}</Link>
                </section>
              ))}
              <p className="note">{flowCopy.note}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
