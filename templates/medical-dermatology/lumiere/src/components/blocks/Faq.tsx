import { Plus } from "lucide-react";
import { homeFaq } from "@/data/content";
import { SectionTitle, TextLink } from "@/components/ui";

export default function Faq() {
  return (
    <section className="border-t border-line bg-white py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionTitle
            eyebrow="FAQ"
            title="자주 묻는 질문"
            desc="더 궁금한 점은 카카오톡이나 전화로 편하게 문의해 주세요."
          />
          <div data-reveal className="mt-8">
            <TextLink href="/reservation">문의하기</TextLink>
          </div>
        </div>
        <div data-reveal className="border-t border-ink lg:col-span-8">
          {homeFaq.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="mr-3 font-display text-xl text-gold-deep">Q.</span>
                  {f.q}
                </span>
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="pb-7 pl-9 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
