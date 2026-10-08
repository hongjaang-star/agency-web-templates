import Image from "next/image";
import { BASE_PATH } from "@/lib/config";
import { type Product } from "@/data/catalog";
export default function ProductImage({ p, priority = false }: {p: Product; priority?: boolean}) {
  return <Image unoptimized className="product-photo" src={`${BASE_PATH}/images/products/${p.id.toLowerCase()}.webp`} alt={`${p.name} — ${p.spec.표면 || p.spec.재질}, AI 제작 제품 예시`} width="1200" height="1200" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
}
