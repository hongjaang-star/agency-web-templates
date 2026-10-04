import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { concerns } from "@/data/content";
import { SectionTitle } from "@/components/ui";
import { assetPath } from "@/lib/config";

export default function Concerns() {
  return (
    <section className="border-y border-line bg-cream py-24 md:py-32">
      <div className="container-page">
        <SectionTitle
          align="center"
          eyebrow="Find by Concern"
          title="어떤 고민이 있으신가요?"
          desc="고민을 선택하면 알맞은 진료를 안내해 드립니다."
        />
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3">
          {concerns.map((item, i) => (
            <li key={item.key} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
              <Link href={`/treatments/${item.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={assetPath(`/images/concerns/${item.key.toLowerCase()}.jpg`)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-gold-deep md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[14px] text-ink-soft md:text-[15px]">{item.desc}</p>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-ink-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
