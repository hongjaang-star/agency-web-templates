import { Plus } from "lucide-react";
import { faqs } from "@/data/content";
import { SectionTitle } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export default function Faq() {
  return (
    <section className="py-24 md:py-32">
      <JsonLd data={faqSchema(faqs)} />
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <SectionTitle eyebrow="FAQ" title="자주 묻는 질문" className="lg:col-span-4" />
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold text-ink">
                {f.q}
                <Plus aria-hidden="true" className="size-5 shrink-0 text-gold transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-4 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
