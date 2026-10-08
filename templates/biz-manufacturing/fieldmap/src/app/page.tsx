import ManufacturingMotion from "@/components/ManufacturingMotion";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { applications, categories, products } from "@/data/catalog";
import { capability, company } from "@/data/content";
import { homeCopy as c } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = { ...pageMetadata({ title: "적용 분야로 찾는 알루미늄 부품", description: site.description, path: "/" }), title: { absolute: `${site.nameKo} | 적용 분야로 찾는 알루미늄 부품` } };

const featured = ["CP-200", "RX-4040", "HB-310", "BK-07"];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-intro"><div className="hero-copy"><p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p className="lead">{c.lead}</p><div className="hero-actions"><Link className="btn" href="/products/">제품과 사양 살펴보기 ↗</Link><Link className="hero-secondary" href="/capability/">제조 역량 보기 →</Link></div><p className="hero-index mono">01 / THERMAL · STRUCTURAL · PRECISION</p></div><Link className="hero-object" href="/products/CP-200/"><span className="hero-object-top mono">ENGINEERED ALUMINUM / CP-200</span><ProductImage p={products[1]} priority /><div className="hero-object-bottom"><div><b>수랭 콜드플레이트</b><span>A3003 · 200 × 150 × 12 mm</span></div><span className="object-arrow">↗</span></div></Link></div><div className="application-label"><span className="mono">SELECT YOUR INDUSTRY</span><p>쓰임을 고르면, 필요한 부품이 보입니다.</p></div>
        <div className="apps" role="list">
          <Link role="listitem" className="app-tile all" href="/products/"><b>{c.allLabel}</b><span>{c.allNote} · {products.length}종</span></Link>
          {applications.map((a) => (
            <Link role="listitem" key={a.id} className="app-tile" href={`/applications/${a.id}/`}>
              <b>{a.name}</b><span>{a.note}</span><em>{products.filter((p) => p.apps.includes(a.id)).length}종</em>
            </Link>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="band-head"><h2>{c.categoriesTitle}</h2><Link href="/products/">제품 찾기 →</Link></div>
        <ol className="cat-row">
          {categories.map((cat, i) => (
            <li key={cat.id}>
              <Link href={`/products/?cat=${cat.id}`}>
                <span className="mono">0{i + 1} · {cat.en}</span>
                <b>{cat.name}</b>
                <span>{cat.desc}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="band">
        <div className="band-head"><h2>{c.featuredTitle}</h2><Link href="/products/">전체 {products.length}종 →</Link></div>
        <div className="results">{featured.map((id) => products.find((p) => p.id === id)!).map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      <ManufacturingMotion />
      <section className="band">
        <div className="band-head"><h2>설비와 공정</h2><Link href="/capability/">설비·공정 자세히 →</Link></div>
        <div className="nums">{capability.numbers.map((n) => (<div key={n.label}><b>{n.value}</b><span>{n.unit} {n.label}</span></div>))}</div>
      </section>

      <section className="band two">
        <div>
          <h2>인증 (가상 예시)</h2>
          <ul className="rows">{company.certs.map((x) => (<li key={x.name}>{x.name}<em>{x.code}</em></li>))}</ul>
        </div>
        <div>
          <h2>납품 분야 (가상 예시)</h2>
          <ul className="rows">{company.sectors.map((x) => (<li key={x.name}>{x.name}<em>{x.parts}</em></li>))}</ul>
        </div>
      </section>

      <section className="band dark cta">
        <h2>{c.quoteTitle}</h2>
        <p>{c.quoteLead}</p>
        <Link className="btn" href="/quote/">견적 요청 체크리스트</Link>
      </section>
    </>
  );
}
