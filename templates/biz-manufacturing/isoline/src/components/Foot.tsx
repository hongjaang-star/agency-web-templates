import Link from "next/link";
import { site } from "@/data/site";

export default function Foot() {
  return (
    <footer className="foot">
      <div className="foot-mark">세로결<span>.</span>정밀</div>
      <p>{site.address} · {site.phone} · {site.email} · {site.hours}</p>
      <nav aria-label="바닥 메뉴">{site.nav.map((n) => <Link key={n.href} href={`${n.href}/`}>{n.label}</Link>)}<Link href="/rfq/">견적 체크</Link></nav>
      <small>가상 업체 데모입니다. 제품·인증·수치는 예시이며 실제 업체와 관계없습니다.</small>
    </footer>
  );
}
