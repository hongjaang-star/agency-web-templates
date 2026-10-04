import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export default function PageHead({ path, label, title, lead, crumbs }: { path: string; label: string; title: string; lead?: string; crumbs: { href?: string; label: string }[] }) {
  return (
    <section className="page-head">
      <JsonLd data={breadcrumbSchema(crumbs, path)} />
      <div className="wrap">
        <nav aria-label="현재 위치">
          <ol className="crumbs">
            <li><Link href="/">홈</Link></li>
            {crumbs.map((c) => <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}
          </ol>
        </nav>
        <span className="label">{label}</span>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
    </section>
  );
}
