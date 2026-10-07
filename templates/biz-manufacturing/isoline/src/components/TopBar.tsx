import Link from "next/link";
import { site } from "@/data/site";

export default function TopBar() {
  return (
    <header className="bar">
      <Link className="mark" href="/">세로결<span>.</span>정밀</Link>
      <nav aria-label="주요 메뉴">{site.nav.map((n) => <Link key={n.href} href={`${n.href}/`}>{n.label}</Link>)}</nav>
      <Link className="pill" href="/rfq/">견적 체크</Link>
    </header>
  );
}
