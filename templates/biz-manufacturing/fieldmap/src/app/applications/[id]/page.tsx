import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import ProductCard from "@/components/ProductCard";
import { applications, productsFor, type AppId } from "@/data/catalog";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const find = (id: string) => applications.find((a) => a.id === id);

export function generateStaticParams() {
  return applications.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: PageProps<"/applications/[id]">) {
  const a = find((await params).id);
  if (!a) return {};
  return pageMetadata({ title: `${a.name}용 알루미늄 부품`, description: a.summary, path: `/applications/${a.id}` });
}

export default async function ApplicationPage({ params }: PageProps<"/applications/[id]">) {
  const a = find((await params).id);
  if (!a) notFound();
  const list = productsFor(a.id as AppId);
  return (
    <>
      <PageHead eyebrow={`APPLICATION · ${a.note}`} title={a.name} lead={a.summary} crumbs={[{ href: "/applications/", label: "적용 분야" }, { href: `/applications/${a.id}/`, label: a.name }]} />
      <section className="band two">
        <div>
          <h2>이 분야에서 먼저 보는 조건</h2>
          <ul className="checks">{a.needs.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
        <div className="note-box">
          <h2>견적 때 알려 주세요</h2>
          <p>{a.check}</p>
          <Link className="btn" href="/quote/">견적 요청 체크리스트</Link>
        </div>
      </section>
      <section className="band">
        <div className="band-head"><h2>맞는 모델 {list.length}종</h2><Link href={`/products/?app=${a.id}`}>제품 찾기에서 보기 →</Link></div>
        <div className="results">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
      <nav className="app-nav band" aria-label="다른 적용 분야">
        {applications.filter((x) => x.id !== a.id).map((x) => <Link key={x.id} href={`/applications/${x.id}/`}>{x.name}</Link>)}
      </nav>
      <JsonLd data={breadcrumbSchema([{ href: "/applications", label: "적용 분야" }, { href: `/applications/${a.id}`, label: a.name }])} />
    </>
  );
}
