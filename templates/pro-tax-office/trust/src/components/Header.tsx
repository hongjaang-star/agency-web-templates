"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Clock, Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { industry, nav, site } from "@/data/site";
import { categories, getServicesByCategory, type ServiceCategory } from "@/data/services";

const categoryKeys = Object.keys(categories) as ServiceCategory[];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // desktop mega menu
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer
  const [mobileTreatOpen, setMobileTreatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change (adjust state during render — no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setDrawerOpen(false);
  }

  // Escape closes menus; lock scroll while drawer open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40">
      {/* Utility bar */}
      <div className="hidden border-b border-line bg-ivory md:block">
        <div className="container-page flex h-10 items-center justify-between text-[13px] text-ink-soft">
          <p>
            {site.nameKo} <strong className="font-semibold text-ink">{site.area}</strong>
          </p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden="true" className="size-3.5 text-gold" />
              {site.hours.map((h) => `${h.day} ${h.time}`).slice(0, 1).join(" · ")}
            </span>
            <a href={site.phoneHref} className="inline-flex items-center gap-1.5 hover:text-ink">
              <Phone aria-hidden="true" className="size-3.5 text-gold" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "border-line shadow-[0_8px_30px_-18px_rgba(28,25,23,0.25)]" : "border-transparent"
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6 md:h-20">
          <Logo />

          <nav aria-label="주 메뉴" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) =>
                "hasMenu" in item ? (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setMenuOpen(true)}
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={navLinkClass(isActive(item.href))}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={menuOpen}
                        aria-controls="services-menu"
                        aria-label={`${industry.serviceLabel} 하위 메뉴 열기`}
                        onClick={() => setMenuOpen((v) => !v)}
                        className="-ml-3 inline-flex size-8 cursor-pointer items-center justify-center text-ink-soft hover:text-ink"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={`size-4 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Mega menu */}
                    <div
                      id="services-menu"
                      className={`absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-300 ${
                        menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-8 border border-line bg-white p-8 shadow-[0_24px_60px_-30px_rgba(28,25,23,0.35)]">
                        {categoryKeys.map((key) => (
                          <div key={key}>
                            <p className="eyebrow !text-xs">{categories[key].en}</p>
                            <p className="mt-1 font-serif-kr text-lg text-ink">{categories[key].ko}</p>
                            <ul className="mt-4 space-y-1 border-t border-line pt-4">
                              {getServicesByCategory(key).map((t) => (
                                <li key={t.slug}>
                                  <Link
                                    href={`/services/${t.slug}`}
                                    className="block py-1.5 text-[15px] text-ink-soft transition-colors hover:text-gold-deep"
                                  >
                                    {t.ko}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={navLinkClass(isActive(item.href))}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={site.cta.href}
              className="hidden h-11 items-center bg-ink px-6 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:bg-gold-deep sm:inline-flex"
            >
              상담 안내
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="전체 메뉴 열기"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="inline-flex size-11 cursor-pointer items-center justify-center text-ink lg:hidden"
            >
              <Menu aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? "visible" : "invisible"}`}
        aria-hidden={!drawerOpen}
      >
        <div
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="전체 메뉴"
          className={`absolute right-0 top-0 flex h-dvh w-[88%] max-w-sm flex-col bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="메뉴 닫기"
              className="inline-flex size-11 cursor-pointer items-center justify-center"
            >
              <X aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="모바일 메뉴" className="flex-1 overflow-y-auto px-5 py-4">
            <ul>
              {nav.map((item) =>
                "hasMenu" in item ? (
                  <li key={item.href} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setMobileTreatOpen((v) => !v)}
                      aria-expanded={mobileTreatOpen}
                      className="flex w-full cursor-pointer items-center justify-between py-4 text-left"
                    >
                      <span className="text-[17px] font-medium">{item.label}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-5 text-ink-soft transition-transform ${mobileTreatOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileTreatOpen && (
                      <div className="space-y-4 pb-5">
                        <Link href="/services" className="block text-[15px] text-gold-deep">
                          {industry.serviceLabel} 전체보기
                        </Link>
                        {categoryKeys.map((key) => (
                          <div key={key}>
                            <p className="eyebrow !text-xs">{categories[key].ko}</p>
                            <ul className="mt-1 grid grid-cols-2 gap-x-3">
                              {getServicesByCategory(key).map((t) => (
                                <li key={t.slug}>
                                  <Link
                                    href={`/services/${t.slug}`}
                                    className="block py-2 text-[15px] text-ink-soft"
                                  >
                                    {t.ko}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex items-center justify-between py-4 text-[17px] font-medium ${
                        isActive(item.href) ? "text-gold-deep" : ""
                      }`}
                    >
                      {item.label}
                      <span className="font-display text-sm tracking-widest text-ink-mute">{item.en}</span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="space-y-2 border-t border-line p-5">
            <Link
              href={site.cta.href}
              className="flex h-12 items-center justify-center bg-ink text-[15px] font-medium text-ivory"
            >
              상담 안내
            </Link>
            <a
              href={site.phoneHref}
              className="flex h-12 items-center justify-center gap-2 border border-line text-[15px]"
            >
              <Phone aria-hidden="true" className="size-4 text-gold" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function navLinkClass(active: boolean) {
  return `relative inline-flex h-11 items-center px-4 text-[15px] font-medium transition-colors duration-300 after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 ${
    active ? "text-ink after:scale-x-100" : "text-ink-soft hover:text-ink after:scale-x-0 hover:after:scale-x-100"
  }`;
}
