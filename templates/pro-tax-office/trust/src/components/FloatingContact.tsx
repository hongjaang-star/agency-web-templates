"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { channels as siteChannels } from "@/data/site";

const icons = { message: MessageCircle, calendar: CalendarCheck, phone: Phone } as const;
// 내부 경로는 Link 로 렌더링해 basePath 가 붙도록 한다
const channels = siteChannels.map((c) => ({ ...c, Icon: icons[c.icon], Tag: c.href.startsWith("/") ? Link : "a" }));

export default function FloatingContact() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* Desktop: right rail */}
      <aside
        aria-label="빠른 상담"
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col border border-line bg-white/95 shadow-[0_20px_50px_-25px_rgba(28,25,23,0.35)] backdrop-blur lg:flex"
      >
        {channels.map(({ href, label, Icon, Tag, external }) => (
          <Tag
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex w-[76px] flex-col items-center gap-1.5 border-b border-line px-2 py-4 text-[11px] font-medium text-ink-soft transition-colors last:border-b-0 hover:bg-cream hover:text-ink"
          >
            <Icon aria-hidden="true" className="size-5 text-gold transition-colors group-hover:text-gold-deep" strokeWidth={1.5} />
            {label}
            {external && <span className="sr-only">(새 창)</span>}
          </Tag>
        ))}
        <button
          type="button"
          onClick={toTop}
          aria-label="맨 위로"
          className={`flex h-12 cursor-pointer items-center justify-center bg-ink text-ivory transition-opacity duration-300 hover:bg-gold-deep ${
            showTop ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          tabIndex={showTop ? 0 : -1}
        >
          <ArrowUp aria-hidden="true" className="size-4" />
        </button>
      </aside>

      {/* Mobile: bottom bar */}
      <nav
        aria-label="빠른 상담"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        {channels.map(({ href, label, Icon, Tag, external }, i) => (
          <Tag
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium ${
              i === 1 ? "bg-ink text-ivory" : "text-ink"
            }`}
          >
            <Icon aria-hidden="true" className={`size-5 ${i === 1 ? "text-gold-soft" : "text-gold"}`} strokeWidth={1.5} />
            {label}
            {external && <span className="sr-only">(새 창)</span>}
          </Tag>
        ))}
      </nav>
    </>
  );
}
