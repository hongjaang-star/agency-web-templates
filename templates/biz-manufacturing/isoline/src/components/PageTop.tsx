import Link from "next/link";

export default function PageTop({ kicker, title, lead, trail = [] }: { kicker: string; title: string; lead?: string; trail?: { href: string; label: string }[] }) {
  return (
    <section className="ptop">
      <nav className="trail num" aria-label="현재 위치"><Link href="/">HOME</Link>{trail.map((t) => <span key={t.href}> / <Link href={t.href}>{t.label}</Link></span>)}</nav>
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </section>
  );
}
