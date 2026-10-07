// 구조화 데이터(JSON-LD): 제조사 Organization, 부품 Product, 공정 HowTo, 자주 묻는 질문, 경로
import { absoluteUrl } from "./config";
import { site } from "@/data/site";
import { categoryOf, type Product } from "@/data/catalog";

const ORG = absoluteUrl("/#org");

export const org = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG,
  name: site.nameKo,
  alternateName: site.nameEn,
  description: site.description,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon.svg"),
  telephone: site.phone,
  email: site.email,
  foundingDate: site.founded,
  address: { "@type": "PostalAddress", ...site.postal },
});

export const product = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  sku: p.id,
  category: categoryOf(p.category).name,
  description: p.summary,
  url: absoluteUrl(`/parts/${p.id}`),
  manufacturer: { "@id": ORG },
  additionalProperty: Object.entries(p.spec).map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
});

export const howTo = (name: string, steps: readonly { title: string; body: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
});

export const faq = (items: readonly { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const crumbs = (items: { href: string; label: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ href: "/", label: "홈" }, ...items].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
});
