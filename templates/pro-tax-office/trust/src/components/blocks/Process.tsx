import { process } from "@/data/content";
import { SectionTitle } from "@/components/ui";

export default function Process() {
  return (
    <section className="bg-ink py-24 text-ivory md:py-32">
      <div className="container-page">
        <SectionTitle
          eyebrow="Process"
          title={<span className="text-ivory">상담부터 사후 관리까지, 다섯 단계</span>}
          desc={<span className="text-ivory/70">진행 상황은 단계마다 공유하고, 보수와 일정은 시작 전에 문서로 안내합니다.</span>}
        />
        <ol className="mt-14 grid gap-px bg-ivory/10 md:grid-cols-5">
          {process.map((p) => (
            <li key={p.step} data-reveal className="bg-ink p-7 md:pt-10">
              <span className="font-display text-3xl text-gold-soft">{p.step}</span>
              <h3 className="mt-4 font-serif-kr text-xl">{p.title}</h3>
              <p className="mt-2 text-[15px] text-ivory/70">{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
