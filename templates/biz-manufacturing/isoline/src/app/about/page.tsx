import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import { about, stats } from "@/data/content";
import { site } from "@/data/site";
import { crumbs } from "@/lib/schema";
import { meta } from "@/lib/seo";

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
