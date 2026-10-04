import Link from "next/link";
import type { Service } from "@/data/services";
import { services } from "@/data/services";

/** 책 뒤 색인처럼: 업무명 · 쪽번호 · 한 줄 요약 */
export default function ServiceIndex({ items = services }: { items?: Service[] }) {
  return (
    <ol className="idx rise">
      {items.map((s) => (
        <li key={s.slug}>
          <Link href={`/services/${s.slug}`}>
            <h3>{s.ko}</h3>
          </Link>
          <span className="pg">p.{String(services.indexOf(s) + 1).padStart(2, "0")}</span>
          <p>{s.summary}</p>
        </li>
      ))}
    </ol>
  );
}
