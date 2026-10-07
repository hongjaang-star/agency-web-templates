import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import { categories } from "@/data/catalog";
import { processSteps } from "@/data/content";
import { crumbs, howTo } from "@/lib/schema";
import { meta } from "@/lib/seo";

export const metadata = meta("공정", "압출, 절단·교정, CNC 가공, 표면처리, 검사·포장 5단계와 카테고리별 제작 공정을 선 하나로 따라가며 보여 드립니다.", "/process");

export default function ProcessPage() {
  return (
    <>
      <PageTop kicker="Process" title="빌릿에서 출하까지" lead="알루미늄 빌릿 하나가 부품이 되기까지의 다섯 단계입니다. 설비 대수와 수치는 데모용 가상 정보입니다." trail={[{ href: "/process/", label: "PROCESS" }]} />
      <section className="sec">
        <ol className="track">
          {processSteps.map((s, i) => (
            <li key={s.title}>
              <span className="num step">0{i + 1}</span>
              <div><h2>{s.title}</h2><p>{s.body}</p><small className="num">{s.detail}</small></div>
            </li>
          ))}
        </ol>
      </section>
      <section className="sec">
        <p className="kicker">By category</p>
        <h2>카테고리별 공정</h2>
        <table className="spec wide"><tbody>{categories.map((c) => (<tr key={c.id}><th scope="row">{c.name}</th><td className="num">{c.process}</td></tr>))}</tbody></table>
      </section>
      <Ld data={[howTo("알루미늄 부품 제작 공정", processSteps), crumbs([{ href: "/process", label: "공정" }])]} />
    </>
  );
}
