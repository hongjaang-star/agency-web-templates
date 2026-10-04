import Link from "next/link";
import { cases } from "@/data/content";
import { getService } from "@/data/services";

/** 사례를 신문 기사 단처럼. full 이면 결과와 관련 업무 링크까지 */
export default function CaseArticles({ full = false }: { full?: boolean }) {
  return (
    <div className={`${full ? "cases-full" : "articles"} rise`}>
      {cases.map((c) => {
        const s = getService(c.service);
        return (
          <article className="art" key={c.title}>
            <span className="tag">{c.tag}</span>
            <h3>{c.title}</h3>
            <dl>
              <dt>상황</dt>
              <dd>{c.situation}</dd>
              <dt>진행</dt>
              <dd>{c.action}</dd>
              {full && (
                <>
                  <dt>이후</dt>
                  <dd>{c.result}</dd>
                </>
              )}
            </dl>
            {full && s && <Link href={`/services/${s.slug}`}>{s.ko} 보기 →</Link>}
          </article>
        );
      })}
    </div>
  );
}
