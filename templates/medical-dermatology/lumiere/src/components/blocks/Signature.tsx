import Image from "next/image";
import { images } from "@/data/site";
import { ButtonLink } from "@/components/ui";
import { assetPath } from "@/lib/config";

export default function Signature() {
  return (
    <section className="relative bg-ink text-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[640px]">
          <Image
            src={assetPath(images.signature)}
            alt="편안히 누운 인물의 옆얼굴과 턱선 — 연출 이미지"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-5 py-20 md:px-16 lg:py-24 xl:px-24">
          <div data-reveal className="max-w-lg">
            <p className="eyebrow !text-gold-soft">Signature Program</p>
            <h2 className="mt-5 font-serif-kr text-3xl leading-snug md:text-4xl md:leading-snug">
              층별로 설계하는
              <br />
              뤼미에르 시그니처 리프팅
            </h2>
            <p className="mt-6 text-ivory/75 md:text-[17px]">
              같은 장비라도 누가, 어떻게 설계하느냐에 따라 결과가 달라집니다. 피부 두께와 처짐 방향을 분석해
              초음파와 고주파 에너지를 층별로 배분합니다.
            </p>
            <ul className="mt-8 space-y-3 border-t border-white/15 pt-8 text-[15px] text-ivory/85">
              {["전문의 1:1 피부 두께 분석", "정품 팁 개봉 확인 · 샷 수 안내", "시술 후 경과 체크"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-5 bg-gold" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/treatments/lifting" variant="light">
                리프팅 자세히 보기
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
