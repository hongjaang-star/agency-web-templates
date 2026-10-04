// 구조화 데이터(JSON-LD) — 업종 값은 src/data/site.ts 의 industry 에서 가져옵니다.
import { absoluteUrl } from "./config";
import { industry, site } from "@/data/site";
import { team } from "@/data/content";
import type { Service } from "@/data/services";

const ORG_ID = absoluteUrl("/#org");

/** 업체 정보: 이름, 주소, 전화, 영업시간 */
export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": [...industry.schemaTypes],
    "@id": ORG_ID,
    name: site.nameKo,
    alternateName: site.brandFull,
    description: site.description,
    url: absoluteUrl("/"),
    image: absoluteUrl("/og.png"),
    telephone: site.phone,
    email: site.email,
    address: { "@type": "PostalAddress", ...site.postal },
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [site.links.blog],
  };
}

/** 구성원 */
export function teamSchemas() {
  return team.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    knowsAbout: m.focus,
    worksFor: { "@id": ORG_ID },
  }));
}

/** 업무분야 상세 */
export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.ko,
    serviceType: s.ko,
    description: s.summary,
    url: absoluteUrl(`/services/${s.slug}`),
    areaServed: site.postal.addressRegion,
    provider: { "@id": ORG_ID },
  };
}

/** FAQ */
export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** 현재 위치 경로 */
export function breadcrumbSchema(crumbs: { href?: string; label: string }[], currentPath: string) {
  const items = [{ label: "홈", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href ?? currentPath),
    })),
  };
}
