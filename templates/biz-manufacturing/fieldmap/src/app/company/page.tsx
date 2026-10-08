import CompanyHistory from "@/components/CompanyHistory";
import CompanyCertificates from "@/components/CompanyCertificates";
import CompanyPartners from "@/components/CompanyPartners";
import CompanyDirections from "@/components/CompanyDirections";
import PageHead from "@/components/PageHead";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/content";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "회사",
  description: `${site.nameKo}(가상)의 회사 소개, 연혁, 인증 표기 예시, 납품 분야와 오시는 길을 안내합니다.`,
  path: "/company",
});

export default function CompanyPage() {
  return (
    <>
      <PageHead eyebrow="COMPANY" title="정밀함은, 시간의 기록입니다." lead={company.intro} crumbs={[{ href: "/company/", label: "회사" }]} />
      <CompanyHistory />
      <CompanyCertificates />
      <CompanyPartners />
      <CompanyDirections />
      <JsonLd data={breadcrumbSchema([{ href: "/company", label: "회사" }])} />
    </>
  );
}
