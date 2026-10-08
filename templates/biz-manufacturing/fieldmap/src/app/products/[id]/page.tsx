import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import ProductCard from "@/components/ProductCard";
import QuoteToggle from "@/components/QuoteToggle";
import { applicationOf, categoryOf, getProduct, products } from "@/data/catalog";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/products/[id]">) {
  const p = getProduct((await params).id);
  if (!p) return {};
  return pageMetadata({ title: p.name, description: `${p.summary} ${categoryOf(p.category).name} · 최소 주문 ${p.moq} · 납기 ${p.lead}.`, path: `/products/${p.id}` });
}

export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const p = getProduct((await params).id);
  if (!p) notFound();
  const cat = categoryOf(p.category);
  const related = products.filter((x) => x.id !== p.id && (x.category === p.category || x.apps.some((a) => p.apps.includes(a)))).slice(0, 3);
  return (
    <>
      <PageHead eyebrow={`${p.id} · ${cat.en}`} title={p.name} lead={p.summary} crumbs={[{ href: "/products/", label: "제품 찾기" }, { href: `/products/${p.id}/`, label: p.id }]} />
      <section className="detail">
        <figure className="detail-fig">
          <ProductImage p={p} priority />
          <figcaption>AI 제작 제품 이미지 · 형상 참고용. 실제 제작 치수는 승인 도면을 기준으로 합니다.</figcaption>
        </figure>
        <div className="detail-body">
          <h2>사양</h2>
          <table className="spec-table">
            <tbody>
              {Object.entries(p.spec).map(([k, v]) => (<tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>))}
              <tr><th scope="row">최소 주문</th><td>{p.moq}</td></tr>
              <tr><th scope="row">납기</th><td>{p.lead}</td></tr>
            </tbody>
          </table>
          <h2>특징</h2>
          <ul className="checks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h2>적용 분야</h2>
          <p className="tags big">{p.apps.map((a) => <Link key={a} href={`/applications/${a}/`}>{applicationOf(a).name}</Link>)}</p>
          <h2>제작 공정</h2>
          <p className="mono-line">{cat.process}</p>
          <div className="detail-cta"><QuoteToggle id={p.id} wide /><Link className="btn ghost" href="/quote/">견적 요청으로 →</Link></div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="band">
          <div className="band-head"><h2>함께 보는 모델</h2></div>
          <div className="results">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
      <JsonLd data={[productSchema(p), breadcrumbSchema([{ href: "/products", label: "제품 찾기" }, { href: `/products/${p.id}`, label: p.name }])]} />
    </>
  );
}
