import Link from "next/link";
import Logo from "./Logo";
import { medicalNotice, nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-ink pb-24 text-ivory/70 lg:pb-0">
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
              <Link href="/reservation" className="transition-colors hover:text-white">
                예약 · 상담
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-5">
          <h2 className="eyebrow !text-gold-soft">Clinic Hours</h2>
          <dl className="mt-5 space-y-2 text-sm">
            {site.hours.map((h) => (
              <div key={h.day} className="flex gap-6">
                <dt className="w-28 shrink-0 text-ivory/50">{h.day}</dt>
                <dd className="text-ivory/85">{h.time}</dd>
              </div>
            ))}
          </dl>
          <a
            href={site.phoneHref}
            className="mt-6 inline-block font-display text-3xl tracking-wider text-ivory transition-colors hover:text-gold-soft"
          >
            {site.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page space-y-4 py-8 text-xs leading-relaxed text-ivory/50">
          <p>{medicalNotice}</p>
          <p className="text-ivory/80">이 사이트는 가상의 피부과를 소개하는 디자인 포트폴리오입니다. 의료진·이력·시설은 가상 설정이며, AI 생성 이미지는 참고용으로 실제 인물·병원·보유 장비를 나타내지 않습니다.</p>
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
