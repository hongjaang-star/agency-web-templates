import Link from "next/link";
import { notFound } from "next/navigation";
import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import PartLines from "@/components/PartLines";
import TitleBlock from "@/components/TitleBlock";
import { applicationOf, categoryOf, getProduct, products } from "@/data/catalog";
import { crumbs, product } from "@/lib/schema";
import { meta } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/parts/[id]">) {
  const p = getProduct((await params).id);
  return p ? meta(`${p.name} 도면`, `${p.summary} 재질 ${p.spec["재질"]}, 최소 주문 ${p.moq}, 납기 ${p.lead}.`, `/parts/${p.id}`) : {};
}

export default async function PartPage({ params }: PageProps<"/parts/[id]">) {
  const p = getProduct((await params).id);
  if (!p) notFound();
  const cat = categoryOf(p.category);
  const idx = products.findIndex((x) => x.id === p.id);
  const prev = products[(idx - 1 + products.length) % products.length];
  const next = products[(idx + 1) % products.length];
  return (
    <>
      <PageTop kicker={`${cat.en} · ${p.id}`} title={p.name} lead={p.summary} trail={[{ href: "/parts/", label: "PARTS" }, { href: `/parts/${p.id}/`, label: p.id }]} />
      <section className="sec drawing-sheet">
        <div className="paper">
          <PartLines category={p.category} dims />
          <TitleBlock p={p} />
        </div>
        <div className="side">
          <p className="caption"><b>이미지 설명</b> {p.image}</p>
          <h2>사양</h2>
          <table className="spec"><tbody>{Object.entries(p.spec).map(([k, v]) => (<tr key={k}><th scope="row">{k}</th><td className="num">{v}</td></tr>))}</tbody></table>
          <h2>특징</h2>
          <ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h2>적용 분야</h2>
          <p className="apps">{p.apps.map((a) => <Link key={a} href={`/fields/#${a}`}>{applicationOf(a).name}</Link>)}</p>
          <h2>공정</h2>
          <p className="num proc">{cat.process}</p>
          <Link className="go" href="/rfq/">이 부품으로 견적 체크</Link>
        </div>
      </section>
      <nav className="pager sec" aria-label="다른 도면">
        <Link href={`/parts/${prev.id}/`}>← <span className="num">{prev.id}</span> {prev.name}</Link>
        <Link href={`/parts/${next.id}/`}><span className="num">{next.id}</span> {next.name} →</Link>
      </nav>
      <Ld data={[product(p), crumbs([{ href: "/parts", label: "부품 도면 목록" }, { href: `/parts/${p.id}`, label: p.name }])]} />
    </>
  );
}
