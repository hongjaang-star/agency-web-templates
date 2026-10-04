import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/data/site";

/* ───────── Section heading ───────── */
export function SectionTitle({
  eyebrow,
  title,
  desc,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div data-reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">
        {title}
      </h2>
      {desc && <p className="mt-5 text-ink-soft md:text-[17px]">{desc}</p>}
    </div>
  );
}

/* ───────── Sub page hero ───────── */
export function PageHero({
  eyebrow,
  title,
  desc,
  crumbs = [],
  path,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  crumbs?: { href?: string; label: string }[];
  /** 현재 페이지 경로 (예: "/about") — 검색엔진용 경로(Breadcrumb) 데이터에 사용 */
  path?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-[-0.2em] select-none font-display text-[22vw] leading-none text-gold/[0.06] md:text-[14rem]"
      >
        {eyebrow}
      </span>
      <div className="container-page relative py-16 md:py-24">
        {path && <JsonLd data={breadcrumbSchema(crumbs, path)} />}
        <nav aria-label="현재 위치" className="text-[13px] text-ink-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-px w-3 bg-gold" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mt-10 animate-fade-up">{eyebrow}</p>
        <h1
          className="mt-4 animate-rise font-serif-kr text-4xl leading-tight text-ink md:text-5xl"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {desc && (
          <p
            className="mt-5 max-w-xl animate-rise text-ink-soft md:text-[17px]"
            style={{ animationDelay: "160ms" }}
          >
            {desc}
          </p>
        )}
      </div>
    </section>
  );
}

/* ───────── Buttons ───────── */
const btnBase =
  "group inline-flex h-12 items-center justify-center gap-3 px-7 text-[15px] font-medium tracking-wide transition-colors duration-300";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light";
  external?: boolean;
  className?: string;
}) {
  const styles = {
    primary: "bg-gold text-night hover:bg-gold-soft",
    outline: "border border-ink/80 text-ink hover:bg-night hover:text-paper",
    light: "bg-gold text-night hover:bg-gold-soft",
  }[variant];
  const content = (
    <>
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
      />
    </>
  );
  if (external || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={`${btnBase} ${styles} ${className}`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
        {external && <span className="sr-only">(새 창)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={`${btnBase} ${styles} ${className}`}>
      {content}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[15px] font-medium text-ink transition-colors hover:text-gold-deep"
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/* ───────── Image placeholder (replace with real photos later) ───────── */
export function Placeholder({
  label,
  size,
  className = "",
  style,
  arch = false,
}: {
  label: string;
  /** 제작할 이미지 권장 크기 (예: "1200 × 1500") — 이미지 제작 가이드로 표시됩니다 */
  size?: string;
  className?: string;
  style?: CSSProperties;
  arch?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={`relative flex max-w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sand via-cream to-sand ${
        arch ? "rounded-t-full" : ""
      } ${className}`}
    >
      <span className={`absolute inset-3 border border-white/70 ${arch ? "rounded-t-full" : ""}`} />
      <span className="flex flex-col items-center gap-2 px-4 text-center">
        <span className="font-display text-2xl tracking-[0.3em] text-gold/70">{site.nameEn[0]}</span>
        <span className="text-[11px] tracking-[0.3em] text-ink-mute uppercase">{label}</span>
        {size && <span className="font-mono text-[10px] tracking-wider text-ink-mute/80">{size}</span>}
      </span>
    </div>
  );
}

/* ───────── Medical notice ───────── */
export function MedicalNotice({ text }: { text: string }) {
  return (
    <p className="border-l-2 border-gold bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft">
      <strong className="mr-2 font-semibold text-ink">안내</strong>
      {text}
    </p>
  );
}

/* ───────── CTA band ───────── */
export function CtaBand() {
  return (
    <section className="border-t border-line bg-cream py-20">
      <div
        data-reveal
        className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
      >
        <div>
          <p className="eyebrow">{site.cta.eyebrow}</p>
          <p className="mt-3 font-serif-kr text-2xl text-ink md:text-3xl">
            {site.cta.text}
          </p>
        </div>
        <ButtonLink href={site.cta.href}>{site.cta.label}</ButtonLink>
      </div>
    </section>
  );
}