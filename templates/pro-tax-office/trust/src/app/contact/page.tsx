import { Mail, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { PageHero, SectionTitle } from "@/components/ui";
import Visit from "@/components/blocks/Visit";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "상담 안내·오시는 길",
  description: `${site.nameShort} 상담 방법과 위치 안내. ${site.subway}. 전화·카카오톡·이메일로 상담을 신청하세요.`,
  path: "/contact",
});

const methods = [
  { Icon: Phone, title: "전화 상담", value: site.phone, href: site.phoneHref, desc: "기한이 임박한 신고는 전화가 가장 빠릅니다." },
  { Icon: MessageCircle, title: "카카오톡 상담", value: "채널 바로가기", href: site.links.kakao, desc: "자료 사진을 함께 보내 주시면 검토가 빨라집니다." },
  { Icon: Mail, title: "이메일", value: site.email, href: `mailto:${site.email}`, desc: "서류가 많은 상속·법인 상담에 적합합니다." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero path="/contact" eyebrow="Contact" title="상담 안내·오시는 길" desc="편한 방법으로 연락 주세요. 상황을 듣고 필요한 자료부터 안내해 드립니다." crumbs={[{ label: "상담 안내" }]} />
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionTitle eyebrow="How to Reach" title="상담 방법" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {methods.map(({ Icon, title, value, href, desc }) => (
              <li key={title} data-reveal className="border border-line p-8">
                <Icon aria-hidden="true" className="size-7 text-gold" strokeWidth={1.4} />
                <h2 className="mt-5 font-serif-kr text-xl text-ink">{title}</h2>
                <a href={href} className="mt-2 block font-semibold text-gold-deep hover:underline" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {value}
                </a>
                <p className="mt-3 text-[15px] text-ink-soft">{desc}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-4 text-sm">
            <a href={site.links.naverMap} target="_blank" rel="noopener noreferrer" className="border border-ink px-5 py-3 hover:bg-night hover:text-paper">네이버 지도에서 보기</a>
            <a href={site.links.kakaoMap} target="_blank" rel="noopener noreferrer" className="border border-ink px-5 py-3 hover:bg-night hover:text-paper">카카오맵에서 보기</a>
            <p className="self-center text-ink-soft">주차 · {site.parking}</p>
          </div>
        </div>
      </section>
      <Visit />
    </>
  );
}
