/* eslint-disable @next/next/no-img-element */
import { BASE_PATH } from "@/lib/config";
import { type Product } from "@/data/catalog";

export default function ProductImage({ p, eager = false }: { p: Product; eager?: boolean }) {
  return <img className="product-photo" src={`${BASE_PATH}/images/${p.id}.webp`} alt={`${p.name} — AI 제작 제품 예시`} width={1200} height={800} loading={eager ? "eager" : "lazy"} />;
}
