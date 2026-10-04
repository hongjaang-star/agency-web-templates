import CaseFlow from "@/components/CaseFlow";
import PageHead from "@/components/PageHead";
import { flows } from "@/data/content";
import { flowCopy, pages, seoPages } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const P = pages.flow;
export const metadata = pageMetadata({ ...seoPages.flow, path: "/flow" });

export default function FlowPage() {
  return (
    <>
      <PageHead path="/flow" label={P.label} title={P.title} lead={P.lead} crumbs={[{ label: "사건 흐름" }]} />
      <section className="sec dark on-dark"><div className="wrap"><CaseFlow /></div></section>
      {flows.map((f) => (
        <section className="sec" key={f.key} id={f.key} aria-labelledby={`h-${f.key}`}>
          <div className="wrap">
            <p className="eyebrow up">{flowCopy.stepLabel} BY {flowCopy.stepLabel}</p>
            <h2 id={`h-${f.key}`} className="up">{f.label}</h2>
            <p className="lead up">{f.intro}</p>
            <div className="flow-table up">
              {f.steps.map((s, i) => (
                <article key={s.title}>
                  <span className="k">{flowCopy.stepLabel} {String(i + 1).padStart(2, "0")}</span>
                  <div><h3>{s.title}</h3><p>{s.desc}</p></div>
                  <ul aria-label={flowCopy.prepareLabel}>{s.prepare.map((p) => <li key={p}>{p}</li>)}</ul>
                  <span className="period">{s.period}</span>
                </article>
              ))}
            </div>
            <p className="note">{flowCopy.note}</p>
          </div>
        </section>
      ))}
    </>
  );
}
