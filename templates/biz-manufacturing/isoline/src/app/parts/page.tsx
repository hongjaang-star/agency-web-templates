import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import Catalog from "@/components/Catalog";
import { products } from "@/data/catalog";
import { crumbs } from "@/lib/schema";
import { meta } from "@/lib/seo";

export const metadata = meta("제품 카탈로그", `알루미늄 부품 ${products.length}종의 제품 이미지, 사양과 가공 옵션. 품번·재질 검색과 카테고리·적용 분야별 탐색.`, "/parts");
export default function PartsPage() {
  return <><PageTop kicker="Product catalog" title="설계에 맞는 부품 찾기" lead="방열판, 프로파일, 하우징, 브래킷 8종의 이미지와 기본 사양을 비교하세요. 제품을 고르면 가공 옵션을 확인하고 견적 준비로 이어갈 수 있습니다." trail={[{ href: "/parts/", label: "제품 카탈로그" }]} /><Catalog /><Ld data={crumbs([{ href: "/parts", label: "제품 카탈로그" }])} /></>;
}
