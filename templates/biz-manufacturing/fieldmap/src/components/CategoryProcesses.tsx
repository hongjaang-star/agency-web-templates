import { categories } from "@/data/catalog";
import { categoryProcesses } from "@/data/category-processes";

export default function CategoryProcesses() {
  return <section className="band category-processes" aria-labelledby="category-process-title">
    <div className="process-section-head"><p className="mono process-eyebrow">HOW IT IS MADE</p><h2 id="category-process-title">카테고리별 제작 공정</h2><p>소재에서 완성 부품까지, 제품마다 다른 제작 경로를 따라갑니다.<br/>각 단계의 작업과 확인 항목을 순서대로 살펴보세요.</p></div>
    <div className="process-routes">{categories.map((category, categoryIndex) => {
      const route = categoryProcesses[category.id];
      return <article className="process-route" key={category.id} aria-labelledby={`process-${category.id}`}>
        <header className="process-route-head"><span className="mono process-category-no">CATEGORY 0{categoryIndex + 1}</span><h3 id={`process-${category.id}`}>{category.name}</h3><p>{route.focus}</p><span className="process-step-count mono">4 STEPS / 소재 → 완성</span></header>
        <ol className="process-timeline" aria-label={`${category.name} 제작 순서`}>{route.steps.map((step, index) => <li key={step.title}>
          <div className="process-marker"><span className="mono">0{index + 1}</span><span className="process-arrow" aria-hidden="true">→</span></div>
          <h4>{step.title}</h4><p>{step.body}</p><div className="process-check"><span>확인 항목</span><p>{step.check}</p></div>
        </li>)}</ol>
      </article>;
    })}</div>
    <p className="process-disclaimer">가상 업체의 대표 공정 예시입니다. 세부 순서·표면처리·검사 조건은 제품 형상과 승인 도면에 따라 달라집니다.</p>
  </section>;
}
