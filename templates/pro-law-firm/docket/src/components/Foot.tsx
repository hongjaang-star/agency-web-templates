import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Foot() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div>
          <b>{site.nameKo}</b>
          <ul>
            <li>대표 변호사 {site.business.ceo} · 광고책임변호사 {site.business.adResponsible}</li>
            <li>사업자등록번호 {site.business.registration}</li>
            <li>{site.address}</li>
          </ul>
        </div>
        <ul>
          <li><a href={site.phoneHref}>{site.phone}</a></li>
          <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          {site.hours.map((h) => <li key={h.day}>{h.day} {h.time}</li>)}
        </ul>
        <ul>
          {nav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
        </ul>
        <p className="notice">{site.footerNotice}</p>
      </div>
    </footer>
  );
}
