"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BASE_PATH } from "@/lib/config";
import { site } from "@/data/site";

export default function TopBar() {
  const pathname = usePathname().replace(BASE_PATH, "");
  const [open, setOpen] = useState(false);
  return (
    <header className="bar" onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}>
      <Link className="mark" href="/">세로결<span>.</span>정밀</Link>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(!open)}>{open ? "메뉴 닫기" : "메뉴 열기"}</button>
      <nav id="main-menu" className={open ? "menu-open" : ""} aria-label="주요 메뉴">{site.nav.map((n) => <Link key={n.href} href={`${n.href}/`} aria-current={pathname.startsWith(n.href) ? "page" : undefined} onClick={() => setOpen(false)}>{n.label}</Link>)}</nav>
      <Link className="pill" aria-current={pathname.startsWith("/rfq") ? "page" : undefined} href="/rfq/" onClick={() => setOpen(false)}>견적 준비</Link>
    </header>
  );
}
