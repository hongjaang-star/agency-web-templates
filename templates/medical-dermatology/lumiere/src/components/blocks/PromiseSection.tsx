import Image from "next/image";
import { images } from "@/data/site";
import { promises } from "@/data/content";
import { SectionTitle } from "@/components/ui";
import { assetPath } from "@/lib/config";

export default function PromiseSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow="Our Promise"
            title={
              <>
                화려함보다 정확함을,
                <br />
                유행보다 당신의 피부를
              </>
            }
            desc="뤼미에르는 세 가지 원칙을 지킵니다. 필요한 만큼만, 정확하게, 끝까지 책임지는 진료."
          />
          <div data-reveal className="relative mt-12 aspect-[4/3] overflow-hidden">
            <Image
              src={assetPath(images.philosophy)}
              alt="하얀 천 위에 놓인 스킨케어 제품"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7 lg:pt-8">
          {promises.map((p, i) => (
            <li
              key={p.no}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-line py-10 last:border-b md:gap-10"
            >
              <span className="font-display text-5xl leading-none text-gold">{p.no}</span>
              <div>
                <p className="font-display text-sm tracking-[0.25em] text-ink-mute uppercase">{p.en}</p>
                <h3 className="mt-2 font-serif-kr text-2xl text-ink">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
