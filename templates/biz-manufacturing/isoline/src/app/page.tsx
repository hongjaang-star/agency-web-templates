import Link from "next/link";
import Exploded from "@/components/Exploded";
import FieldRing from "@/components/FieldRing";
import PartLines from "@/components/PartLines";
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
          <div className="stats">
            {stats.slice(0, 1).map((s) => <div key={s.label}><b className="num">{s.value}</b><span>{s.label}</span></div>)}
            <div><b className="num">{products.length}</b><span>등록 모델</span></div>
            <div><b className="num">{applications.length}</b><span>적용 분야</span></div>
          </div>
        </div>
        <Exploded />
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
