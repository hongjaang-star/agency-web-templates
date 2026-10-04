import Image from "next/image";
import { images } from "@/data/site";
import { visitSteps } from "@/data/content";
import { ButtonLink, SectionTitle } from "@/components/ui";
import { assetPath } from "@/lib/config";

export default function Process() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow="First Visit"
            title={
              <>
                처음 오시는 분도
                <br />
                편안하도록
              </>
            }
            desc="예약부터 사후 관리까지, 뤼미에르의 진료는 이렇게 진행됩니다."
          />
          <div data-reveal className="relative mt-10 aspect-[4/3] overflow-hidden">
            <Image src={assetPath(images.consultation)} alt="차 한 잔을 사이에 두고 대화하는 두 사람의 손" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-4">
          <ol>
            {visitSteps.map((s, i) => (
              <li
                key={s.en}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="relative grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0 md:gap-10"
              >
                {i < visitSteps.length - 1 && (
                  <span aria-hidden="true" className="absolute bottom-0 left-[27px] top-14 w-px bg-line" />
                )}
                <span className="relative flex size-14 items-center justify-center rounded-full border border-gold bg-ivory font-display text-xl text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-2">
                  <p className="font-display text-sm tracking-[0.25em] text-ink-mute uppercase">{s.en}</p>
                  <h3 className="mt-1 text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-12 pl-20 md:pl-24">
            <ButtonLink href="/reservation">예약 · 상담하기</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
