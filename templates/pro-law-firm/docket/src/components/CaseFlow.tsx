"use client";

import { useState } from "react";
import type { FlowKey } from "@/data/areas";
import { flows } from "@/data/content";
import { flowCopy as C } from "@/data/site";

/** 사건 흐름 타임라인 (시그니처): 업무분야 탭(8) → 단계 → 단계별 설명·준비물 */
export default function CaseFlow({ initial = flows[0].key }: { initial?: FlowKey }) {
  const [kind, setKind] = useState<FlowKey>(initial);
  const [cur, setCur] = useState(0);
  const flow = flows.find((f) => f.key === kind)!;
  const step = flow.steps[cur];
  return (
    <>
      <div className="tabs" role="tablist" aria-label={C.tabsLabel}>
        {flows.map((f) => (
          <button key={f.key} type="button" role="tab" className="tab" aria-selected={f.key === kind} onClick={() => { setKind(f.key); setCur(0); }}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="flow-intro"><b>{C.procedureLabel} · {flow.procedure}</b> {flow.intro}</p>
      <ol className="flow" style={{ ["--n" as string]: flow.steps.length }}>
        {flow.steps.map((s, i) => (
          <li key={s.title}>
            <button type="button" className="step" aria-pressed={i === cur} onClick={() => setCur(i)}>
              <span className="k">{C.stepLabel} {String(i + 1).padStart(2, "0")}</span>
              <b>{s.title}</b>
              <small>{s.period}</small>
            </button>
          </li>
        ))}
      </ol>
      <div className="detail" aria-live="polite">
        <div>
          <h3>{step.title}</h3>
          <p>{step.desc}</p>
          <p><b>{C.periodLabel}</b> · {step.period}</p>
        </div>
        <div>
          <p className="prep">{C.prepareLabel}</p>
          <ul>{step.prepare.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </div>
      <p className="flow-note">{C.note}</p>
    </>
  );
}
