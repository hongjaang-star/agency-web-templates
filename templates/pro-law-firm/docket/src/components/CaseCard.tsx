import Link from "next/link";
import type { CaseItem } from "@/data/content";
import { getArea } from "@/data/areas";
import { casesCopy as C } from "@/data/site";

export default function CaseCard({ item, onKeyword }: { item: CaseItem; onKeyword?: (k: string) => void }) {
  const a = getArea(item.area);
  return (
    <article className="case-card">
      <p className="tag">{a?.ko}</p>
      <h3>{item.title}</h3>
      <p className="body">{item.body}</p>
      <ul className="kw" aria-label={C.keywordsLabel}>
        {item.keywords.map((k) => (
          <li key={k}>{onKeyword ? <button type="button" onClick={() => onKeyword(k)}>#{k}</button> : <span>#{k}</span>}</li>
        ))}
      </ul>
      {a && <Link className="go" href={`/areas/${a.slug}`}>{a.ko} {C.areaLink}</Link>}
    </article>
  );
}
