// ─────────────────────────────────────────────
// 구조화 데이터(schema.org JSON-LD) 생성 함수
// 검증: https://search.google.com/test/rich-results
// ─────────────────────────────────────────────
import { absoluteUrl } from "./config";
import { industry, site } from "@/data/site";
import { doctors } from "@/data/content";
import type { Treatment } from "@/data/treatments";

const CLINIC_ID = absoluteUrl("/#clinic");

/** 병원 정보: 이름, 주소, 전화, 진료시간, 진료 분야 */
export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": [...industry.schemaTypes],
    "@id": CLINIC_ID,
    name: site.nameKo,
    alternateName: site.brandFull,
    description: site.description,
    url: absoluteUrl("/"),
    image: absoluteUrl("/og.png"),
    telephone: site.phone,
    medicalSpecialty: industry.medicalSpecialty,
    address: { "@type": "PostalAddress", ...site.postal },
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [site.links.instagram],
  };
}

/** 의료진 */
export function physicianSchemas() {
  return doctors.map((d) => ({
    "@context": "https://schema.org",
    "@type": "Physician",
    name: d.name,
    jobTitle: `${d.role} · ${industry.specialistTitle}`,
    medicalSpecialty: industry.medicalSpecialty,
    description: d.quote,
    worksFor: { "@id": CLINIC_ID },
  }));
}

/** 현재 위치 경로 (검색 결과의 주소 표시줄) */
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

/** 진료과목 상세: 의료 정보 페이지 + 감수자 + 검토일 */
export function treatmentSchema(t: Treatment) {
  const reviewer = doctors.find((d) => d.name === t.reviewer);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${t.ko} | ${site.nameShort}`,
    url: absoluteUrl(`/treatments/${t.slug}`),
    description: t.summary,
    inLanguage: "ko-KR",
    lastReviewed: t.reviewedAt,
    reviewedBy: reviewer
      ? { "@type": "Physician", name: reviewer.name, jobTitle: `${reviewer.role} · ${industry.specialistTitle}` }
      : undefined,
    about: {
      "@type": t.category === "medical" ? "MedicalCondition" : "MedicalProcedure",
      name: t.ko,
      alternateName: t.en,
    },
    publisher: { "@id": CLINIC_ID },
  };
}
