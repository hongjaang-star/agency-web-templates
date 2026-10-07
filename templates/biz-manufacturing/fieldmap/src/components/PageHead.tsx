import Link from "next/link";

export default function PageHead({ eyebrow, title, lead, crumbs = [] }: { eyebrow: string; title: string; lead?: string; crumbs?: { href: string; label: string }[] }) {
  return (
    <section className="page-head">
      <nav className="crumbs" aria-label="현재 위치">
        <Link href="/">홈</Link>
        {crumbs.map((c) => (<span key={c.href}> / <Link href={c.href}>{c.label}</Link></span>))}
      </nav>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </section>
  );
}
