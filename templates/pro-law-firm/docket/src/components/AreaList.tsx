import Link from "next/link";
import { areas } from "@/data/areas";

export default function AreaList() {
  return (
    <ol className="areas up">
      {areas.map((a, i) => (
        <li key={a.slug}>
          <Link href={`/areas/${a.slug}`}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <b>{a.ko}</b>
            <em>{a.short}</em>
            <span className="ar" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
