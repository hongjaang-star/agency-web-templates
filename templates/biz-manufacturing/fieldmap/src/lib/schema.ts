// 구조화 데이터(JSON-LD). 제조사는 Organization, 제품은 Product 로 표시한다.
import { absoluteUrl } from "./config";
import { site } from "@/data/site";
import { categoryOf, type Product } from "@/data/catalog";

const ORG_ID = absoluteUrl("/#org");

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.nameKo,
    alternateName: site.nameEn,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    telephone: site.phone,
    email: site.email,
    foundingDate: site.founded,
    address: { "@type": "PostalAddress", ...site.postal },
    knowsAbout: ["알루미늄 압출", "CNC 가공", "아노다이징", "방열 설계"],
  };
}

export function productSchema(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.id,
    category: categoryOf(p.category).name,
    description: p.summary,
    url: absoluteUrl(`/products/${p.id}`),
    manufacturer: { "@id": ORG_ID },
    additionalProperty: Object.entries(p.spec).map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(crumbs: { href: string; label: string }[]) {
  const items = [{ label: "홈", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
  };
}
