import Link from "next/link";
import { cases } from "@/data/content";
import { getArea } from "@/data/areas";

export default function CaseList({ limit, links = false }: { limit?: number; links?: boolean }) {
  return (
    <div className="cases up">
      {cases.slice(0, limit).map((c) => {
        const a = getArea(c.area);
        return (
          <article className="case" key={c.title}>
            <p className="tag">{c.tag}</p>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            {links && a && <Link href={`/areas/${a.slug}`}>{a.ko} 업무 보기 →</Link>}
          </article>
        );
      })}
    </div>
  );
}
