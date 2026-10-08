import Link from "next/link";
import QuoteCount from "./QuoteCount";
import { site } from "@/data/site";

export default function Header() {
  return (
    <header className="top">
      <Link className="logo" href="/"><i aria-hidden="true" />{site.nameKo}</Link>
      <nav aria-label="주요 메뉴">
        <ul>{site.nav.map((n) => (<li key={n.href}><Link href={`${n.href}/`}>{n.label}</Link></li>))}</ul>
      </nav>
      <QuoteCount />
    </header>
  );
}
