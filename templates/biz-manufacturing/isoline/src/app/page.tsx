import Link from "next/link";
import Exploded from "@/components/Exploded";
import FieldRing from "@/components/FieldRing";
import PartLines from "@/components/PartLines";
import ProductImage from "@/components/ProductImage";
import { applications, categories, products } from "@/data/catalog";
import { about, processSteps, stats } from "@/data/content";
import { homeCopy as c, site } from "@/data/site";
import { meta } from "@/lib/seo";

export const metadata = { ...meta(site.tagline, site.description, "/"), title: { absolute: `${site.nameKo} | ${site.tagline}` } };

export default function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="kicker">{c.kicker}</p>
          <h1>{c.title[0]}<br /><em>{c.title[1]}</em>{c.title[2]}</h1>
          <p className="lead">{c.lead}</p>
          <div className="hero-actions"><Link className="go" href="/parts/">제품과 사양 보기 ↗</Link><Link className="more" href="/rfq/">견적 준비하기 →</Link></div>
          <div className="stats">
            {stats.slice(0, 1).map((s) => <div key={s.label}><b className="num">{s.value}</b><span>{s.label}</span></div>)}
            <div><b className="num">{products.length}</b><span>등록 모델</span></div>
            <div><b className="num">{applications.length}</b><span>적용 분야</span></div>
          </div>
        </div>
        <Exploded />
      </section>

      <section className="sec showcase">
        <div className="sec-head"><div><p className="kicker">Materialized / 01—04</p><h2>선에서 시작해,<br />금속으로 완성합니다.</h2></div><p className="lead">열을 내보내고, 구조를 지지하고, 부품을 보호합니다.<br />용도에 맞는 소재와 가공을 한 장의 사양으로 확인하세요.</p></div>
        <div className="product-grid">{[products[0], products[2], products[4], products[6]].map((p, i) => <Link className="product-card" href={`/parts/${p.id}/`} key={p.id}><div className="photo-wrap"><ProductImage p={p} /><span className="photo-number num">0{i + 1}</span></div><div className="product-card-copy"><span className="code num">{p.id} / {p.spec["재질"]}</span><h3>{p.name} ↗</h3><p>{p.summary}</p><small>{p.spec["표면"] ?? p.spec["공차"]}</small></div></Link>)}</div>
      </section>

      <section className="sec">
        <p className="kicker">Application</p>
        <h2>{c.fieldsTitle}</h2>
        <FieldRing />
      </section>

      <section className="sec">
        <div className="sec-head"><div><p className="kicker">Drawing index</p><h2>{c.sheetsTitle}</h2></div><Link className="more" href="/parts/">전체 {products.length}장 보기 →</Link></div>
        <ol className="index">
          {categories.map((cat, i) => (
            <li key={cat.id}>
              <Link href={`/parts/#${cat.id}`}>
                <span className="num">DWG-{String(i + 1).padStart(2, "0")}</span>
                <PartLines category={cat.id} />
                <b>{cat.name}</b>
                <small className="num">{cat.en} · {products.filter((p) => p.category === cat.id).length} sheets</small>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="sec">
        <div className="sec-head"><div><p className="kicker">Process</p><h2>빌릿에서 출하까지</h2></div><Link className="more" href="/process/">공정 자세히 →</Link></div>
        <ol className="flow">{processSteps.map((s) => (<li key={s.title}><b>{s.title}</b><span>{s.body}</span></li>))}</ol>
      </section>

      <section className="sec">
        <p className="kicker">Certification · 가상 예시</p>
        <h2>확인할 수 있는 근거</h2>
        <div className="certs">{about.certs.map((x) => (<div key={x.name}><b>{x.name}</b><span>{x.note}</span></div>))}</div>
      </section>

      <section className="sec cta">
        <h2>{c.rfqTitle}</h2>
        <p>분야, 부품, 준비된 자료만 체크하면 견적 요청서 문안이 만들어집니다.</p>
        <Link className="go" href="/rfq/">견적 체크리스트 열기</Link>
      </section>
    </>
  );
}
