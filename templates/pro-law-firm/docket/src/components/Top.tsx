import Link from "next/link";
import { site } from "@/data/site";
import NavLinks from "./NavLinks";

export default function Top() {
  return (
    <header className="top">
      <div className="top-row">
        <Link className="logo" href="/" aria-label={`${site.nameKo} 처음으로`}>
          {site.nameMark} <small>{site.logoSub}</small>
        </Link>
        <nav aria-label="주요 메뉴"><NavLinks /></nav>
        <a className="call" href={site.phoneHref}>{site.phone}</a>
      </div>
      <nav className="mnav" aria-label="모바일 메뉴"><NavLinks /></nav>
    </header>
  );
}
