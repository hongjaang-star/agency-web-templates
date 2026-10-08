import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import { about, stats } from "@/data/content";
import { site } from "@/data/site";
import { crumbs } from "@/lib/schema";
import { meta } from "@/lib/seo";
import Link from "next/link";

export const metadata = meta("회사", `${site.nameKo}(가상)는 도면을 먼저 읽고 압출부터 검사까지 한 공장에서 진행합니다. 회사 소개, 연혁, 인증 표기 예시, 연락처를 안내합니다.`, "/about");

export default function AboutPage() {
  return (
    <>
      <PageTop kicker="About" title="선을 읽는 공장" lead={about.intro} trail={[{ href: "/about/", label: "ABOUT" }]} />
      <section className="sec">
        <div className="stats big">{stats.map((s) => <div key={s.label}><b className="num">{s.value}</b><span>{s.label}</span></div>)}</div>
      </section>
      <section className="sec">
        <p className="kicker">History · 가상</p>
        <h2>연혁</h2>
        <ol className="years">{about.history.map((h) => (<li key={h.year}><b className="num">{h.year}</b><span>{h.text}</span></li>))}</ol>
      </section>
      <section className="sec"><p className="kicker">Working together</p><h2>설계부터 양산 검토까지</h2><div className="quality-grid">
        <article><h3>도면 검토</h3><p>소재와 공차, 표면처리를 확인하고 압출·절삭·접합 중 제품에 맞는 가공 경로를 정합니다.</p><Link className="more" href="/parts/">제품과 가공 옵션 →</Link></article>
        <article><h3>시제품 확인</h3><p>장착면과 조립성을 먼저 확인합니다. 수정할 치수와 검사 항목을 정리해 양산 도면의 기준으로 삼습니다.</p><Link className="more" href="/process/">제작·검사 흐름 →</Link></article>
        <article><h3>반복 생산 준비</h3><p>도면 개정, 발주 수량, 검사 성적서와 포장 조건을 정리합니다. 납기는 소재·공정·수량에 따라 협의합니다.</p><Link className="more" href="/rfq/">견적 준비 →</Link></article>
      </div></section>
      <section className="sec">
        <p className="kicker">Certification · 가상 예시</p>
        <h2>인증과 성적서</h2>
        <div className="certs">{about.certs.map((x) => (<div key={x.name}><b>{x.name}</b><span>{x.note}</span></div>))}</div>
      </section>
      <section className="sec">
        <p className="kicker">Contact</p>
        <h2>연락처</h2>
        <table className="spec wide"><tbody>
          <tr><th scope="row">주소</th><td>{site.address}</td></tr>
          <tr><th scope="row">전화</th><td className="num">{site.phone}</td></tr>
          <tr><th scope="row">메일</th><td className="num">{site.email}</td></tr>
          <tr><th scope="row">근무</th><td>{site.hours}</td></tr>
        </tbody></table>
      </section>
      <Ld data={crumbs([{ href: "/about", label: "회사" }])} />
    </>
  );
}
