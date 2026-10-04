import Link from "next/link";
import Logo from "./Logo";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-night pb-24 text-paper/70 lg:pb-0">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            {site.footerIntro[0]}
            <br />
            {site.footerIntro[1]}
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow !text-gold-soft">Menu</h2>
          <ul className="mt-5 grid grid-cols-2 gap-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={site.cta.href} className="transition-colors hover:text-white">
                {site.cta.label}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-5">
          <h2 className="eyebrow !text-gold-soft">{site.hoursTitle}</h2>
          <dl className="mt-5 space-y-2 text-sm">
            {site.hours.map((h) => (
              <div key={h.day} className="flex gap-6">
                <dt className="w-28 shrink-0 text-paper/50">{h.day}</dt>
                <dd className="text-paper/85">{h.time}</dd>
              </div>
            ))}
          </dl>
          <a
            href={site.phoneHref}
            className="mt-6 inline-block font-display text-3xl tracking-wider text-paper transition-colors hover:text-gold-soft"
          >
            {site.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page space-y-4 py-8 text-xs leading-relaxed text-paper/50">
          <p>{site.footerNotice}</p>
          <p>
            {site.nameKo} · 대표자 {site.business.ceo} · 사업자등록번호 {site.business.registration}
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            {site.address}
          </p>
          <p>© {new Date().getFullYear()} {site.brandFull}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
