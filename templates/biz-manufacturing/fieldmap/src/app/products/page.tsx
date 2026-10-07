import Finder from "@/components/Finder";
import PageHead from "@/components/PageHead";
import JsonLd from "@/components/JsonLd";
import { products } from "@/data/catalog";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "제품 찾기",
  description: `적용 분야와 제품 카테고리로 알루미늄 방열판, 압출 프로파일, 하우징, 정밀 가공 브래킷 ${products.length}종을 걸러 보고 사양과 납기를 확인하세요.`,
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHead eyebrow="PRODUCT FINDER" title="제품 찾기" lead="분야를 고르고 카테고리로 좁히세요. 카드의 &quot;견적에 담기&quot;로 여러 모델을 한 번에 견적 요청할 수 있습니다." crumbs={[{ href: "/products/", label: "제품 찾기" }]} />
      <Finder />
      <JsonLd data={breadcrumbSchema([{ href: "/products", label: "제품 찾기" }])} />
    </>
  );
}
