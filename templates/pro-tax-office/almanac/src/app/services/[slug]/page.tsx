import { notFound } from "next/navigation";
import Link from "next/link";
import Folio from "@/components/Folio";
import JsonLd from "@/components/JsonLd";
import { deadlines } from "@/data/content";
import { categories, getService, services } from "@/data/services";
import { pages, seoPages, serviceDetailCopy as C, site } from "@/data/site";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: `${s.ko} ${seoPages.serviceSuffix}`, description: `${site.area} ${s.ko} ${seoPages.serviceSuffix}. ${s.summary}`, path: `/services/${s.slug}` });
}

export default async function ServiceDetail({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const no = services.indexOf(s) + 1;
  const related = services.filter((o) => o.category === s.category && o.slug !== s.slug);
  const due = deadlines.filter((d) => d.service === s.slug);
  const blocks = [
    { title: C.forWho, items: s.forWho },
    { title: C.scope, items: s.scope },
    { title: C.documents, items: s.documents },
  ];
  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <Folio
        path={`/services/${s.slug}`}
        kicker={`p.${String(no).padStart(2, "0")} · ${categories[s.category].ko}`}
        title={s.ko}
        lead={s.summary}
        crumbs={[{ href: "/services", label: pages.services.no }, { label: s.ko }]}
      />
      <div className="wrap article">
        <div className="article-body">
          {blocks.map((b) => (
            <section key={b.title} className="rise">
              <h2>{b.title}</h2>
              <ol>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
            </section>
          ))}
        </div>
        <aside className="article-aside">
          <div className="aside-box">
            <h2>{C.timing}</h2>
            <p>{s.timing}</p>
            {due.length > 0 && (
              <ul>
                {due.map((d) => (
                  <li key={d.item}>{d.month}월 {d.day}일 · {d.item}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="aside-box">
            <h2>{C.ask}</h2>
            <a className="btn solid" href={site.phoneHref}>{site.phone}</a>
            <a className="btn" href={site.links.kakao} target="_blank" rel="noopener noreferrer">카카오톡 문의<span className="sr-only">(새 창)</span></a>
          </div>
          {related.length > 0 && (
            <div className="aside-box">
              <h2>{C.related}</h2>
              <ul>
                {related.map((r) => (
                  <li key={r.slug}><Link href={`/services/${r.slug}`}>{r.ko} →</Link></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
