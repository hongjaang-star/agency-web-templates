import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import { areas, getArea } from "@/data/areas";
import { flows, lawyers } from "@/data/content";
import { areaDetailCopy as C, pages, seoPages, site } from "@/data/site";
import { areaSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const a = getArea((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: `${a.ko} ${seoPages.areaSuffix}`, description: `${site.area} ${a.ko} ${seoPages.areaSuffix}. ${a.summary}`, path: `/areas/${a.slug}` });
}

export default async function AreaDetail({ params }: Props) {
  const a = getArea((await params).slug);
  if (!a) notFound();
  const no = areas.indexOf(a) + 1;
  const flow = flows.find((f) => f.key === a.flow)!;
  const lawyer = lawyers.find((l) => l.id === a.lawyer)!;
  const blocks = [
    { title: C.situations, items: a.situations },
    { title: C.scope, items: a.scope },
    { title: C.documents, items: a.documents },
  ];
  return (
    <>
      <JsonLd data={areaSchema(a)} />
      <PageHead path={`/areas/${a.slug}`} label={`${String(no).padStart(2, "0")} · ${pages.areas.label}`} title={a.ko} lead={a.summary} crumbs={[{ href: "/areas", label: "업무분야" }, { label: a.ko }]} />
      <div className="wrap area-body">
        <div className="area-main">
          {blocks.map((b) => (
            <section key={b.title} className="up">
              <h2>{b.title}</h2>
              <ol>{b.items.map((it) => <li key={it}>{it}</li>)}</ol>
            </section>
          ))}
        </div>
        <aside className="area-side">
          <div className="side-box">
            <h2>{C.deadline}</h2>
            <ul>{a.deadlines.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div className="side-box">
            <h2>{C.flow}</h2>
            <ol className="mini-flow">{flow.steps.map((s) => <li key={s.title}>{s.title}</li>)}</ol>
            <ul><li><Link href={`/flow#${flow.key}`}>{flow.procedure} 흐름 자세히 →</Link></li></ul>
          </div>
          <div className="side-box side-lawyer">
            <h2>{C.lawyer}</h2>
            <b>{lawyer.name}</b>
            <span>{lawyer.role} · {lawyer.focus}</span>
          </div>
          <div className="side-box">
            <h2>{C.ask}</h2>
            <a className="btn solid" href={site.phoneHref}>{site.phone}</a>
            <a className="btn" href={site.links.kakao} target="_blank" rel="noopener noreferrer">카카오톡 문의<span className="sr-only">(새 창)</span></a>
          </div>
          <div className="side-box">
            <h2>{C.related}</h2>
            <ul>{areas.filter((o) => o.slug !== a.slug).slice(0, 4).map((o) => <li key={o.slug}><Link href={`/areas/${o.slug}`}>{o.ko} →</Link></li>)}</ul>
          </div>
        </aside>
      </div>
    </>
  );
}
