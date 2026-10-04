import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/** 서브페이지 머리: 경로 + 분류 + 큰 제목 */
export default function Folio({ path, kicker, title, lead, crumbs }: { path: string; kicker: string; title: string; lead?: string; crumbs: { href?: string; label: string }[] }) {
  return (
    <section className="folio">
      <JsonLd data={breadcrumbSchema(crumbs, path)} />
      <div className="wrap">
        <nav aria-label="현재 위치">
          <ol className="crumbs">
            <li><Link href="/">홈</Link></li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
        <span className="kicker">{kicker}</span>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
