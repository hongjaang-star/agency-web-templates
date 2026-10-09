import Link from "next/link";
import { notFound } from "next/navigation";
import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import PartLines from "@/components/PartLines";
import TitleBlock from "@/components/TitleBlock";
import ProductImage from "@/components/ProductImage";
import { engineering } from "@/data/engineering";
import { applicationOf, categoryOf, getProduct, products } from "@/data/catalog";
import { crumbs, product } from "@/lib/schema";
import { meta } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/parts/[id]">) {
  const p = getProduct((await params).id);
  return p ? meta(`${p.name} 제품 상세`, `${p.summary} 재질 ${p.spec["재질"]}, 최소 주문 ${p.moq}, 납기 ${p.lead}.`, `/parts/${p.id}`) : {};
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
          <ProductImage p={p} eager />
          <details className="drawing-toggle"><summary>단면 선화 보기 · 형상 참고</summary><PartLines category={p.category} dims /></details>
          <TitleBlock p={p} />
        </div>
        <div className="side">
          <p className="caption">AI 제작 제품 이미지 · 실제 형상과 성능을 보증하는 도면이 아닙니다.</p>
          <h2>사양</h2>
          <table className="spec"><tbody>{Object.entries(p.spec).map(([k, v]) => (<tr key={k}><th scope="row">{k}</th><td className="num">{v}</td></tr>))}</tbody></table>
          <h2>특징</h2>
          <ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h2>적용 분야</h2>
          <p className="apps">{p.apps.map((a) => <Link key={a} href={`/fields/#${a}`}>{applicationOf(a).name}</Link>)}</p>
          <h2>공정</h2>
          <p className="num proc">{cat.process}</p>
          <h2>설계 포인트</h2>
          <p>{engineering[p.category].intro}</p>
          <h2>주문 가공 옵션</h2>
          <ul className="ticks">{engineering[p.category].options.map((x) => <li key={x}>{x}</li>)}</ul>
          <h2>견적 전 준비할 정보</h2>
          <ul className="ticks">{engineering[p.category].checks.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="hint">최소 주문 {p.moq} · 예상 납기 {p.lead}. 모든 사양은 가상 예시이며 실제 제작 시 도면·수량·시험 조건에 따라 협의합니다.</p>
          <Link className="go" href={`/rfq/?part=${p.id}`}>이 제품으로 견적 준비 →</Link>
        </div>
      </section>
      <nav className="pager sec" aria-label="다른 제품">
        <Link href={`/parts/${prev.id}/`}>← <span className="num">{prev.id}</span> {prev.name}</Link>
        <Link className="pager-list" href="/parts/" aria-label="전체 제품 목록으로 돌아가기"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M9 6h12M9 12h12M9 18h12" /><path d="M3 6h1M3 12h1M3 18h1" strokeWidth="3" strokeLinecap="round" /></svg><span>목록</span></Link>
        <Link href={`/parts/${next.id}/`}><span className="num">{next.id}</span> {next.name} →</Link>
      </nav>
      <Ld data={[product(p), crumbs([{ href: "/parts", label: "제품 카탈로그" }, { href: `/parts/${p.id}`, label: p.name }])]} />
    </>
  );
}
