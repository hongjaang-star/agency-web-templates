import Link from "next/link";
import { categories } from "@/data/catalog";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div>
        <p className="logo"><i aria-hidden="true" />{site.nameKo}</p>
        <p>{site.address}<br />대표전화 {site.phone} · {site.email}<br />{site.hours}</p>
      </div>
      <div>
        <p className="foot-h">제품</p>
        <ul>{categories.map((c) => (<li key={c.id}><Link href={`/products/?cat=${c.id}`}>{c.name}</Link></li>))}</ul>
      </div>
      <div>
        <p className="foot-h">바로가기</p>
        <ul>{site.nav.map((n) => (<li key={n.href}><Link href={`${n.href}/`}>{n.label}</Link></li>))}<li><Link href="/quote/">견적 요청</Link></li></ul>
      </div>
      <p className="foot-demo">가상 업체 데모입니다. 제품·인증·납품·설비 정보는 예시이며 실제 업체와 관계없습니다.</p>
    </footer>
  );
}
