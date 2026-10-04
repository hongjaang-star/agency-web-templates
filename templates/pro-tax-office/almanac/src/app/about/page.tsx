import Folio from "@/components/Folio";
import JsonLd from "@/components/JsonLd";
import SectionHead from "@/components/SectionHead";
import { principles, process, stats, team } from "@/data/content";
import { aboutCopy as A, pages, seoPages } from "@/data/site";
import { teamSchemas } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const P = pages.about;
export const metadata = pageMetadata({ ...seoPages.about, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={teamSchemas()} />
      <Folio path="/about" kicker={P.no} title={P.title} lead={P.desc} crumbs={[{ label: P.no }]} />
      <section className="sec" aria-labelledby="pr-h">
        <div className="wrap">
          <SectionHead id="pr-h" no={A.principles.no} title={A.principles.title} />
          <div className="principles rise">
            {principles.map((p) => (
              <article key={p.title}>
                <span aria-hidden="true">{p.no}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="fg-h">
        <div className="wrap">
          <SectionHead id="fg-h" no={A.figures.no} title={A.figures.title} />
          <ul className="figures rise">
            {stats.map((s) => (
              <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sec" aria-labelledby="tm-h">
        <div className="wrap">
          <SectionHead id="tm-h" no={A.team.no} title={A.team.title} />
          <div className="bylines rise">
            {team.map((m) => (
              <article key={m.name}>
                <h3>{m.name}</h3>
                <p className="role">{m.role} · {m.focus}</p>
                <q>{m.quote}</q>
                <ul>
                  {m.career.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" aria-labelledby="st-h">
        <div className="wrap">
          <SectionHead id="st-h" no={A.process.no} title={A.process.title} />
          <ol className="steps rise">
            {process.map((p) => (
              <li key={p.step}><span>{p.step}</span><b>{p.title}</b><p>{p.desc}</p></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
