"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "lumiere-banner-closed";

// 배너 닫힘 상태를 sessionStorage 에 두고, 서버 렌더링 때는 항상 "열림"으로 시작합니다.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const readClosed = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};
const closeBanner = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {}
  listeners.forEach((cb) => cb());
};

export default function TopBanner() {
  const closed = useSyncExternalStore(subscribe, readClosed, () => false);
  if (closed) return null;

  return (
    <div className="relative bg-ink text-ivory">
      <div className="container-page flex min-h-11 items-center justify-center py-2 pr-12 text-center">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 text-[13px] tracking-wide text-ivory/90 transition-colors hover:text-white md:text-sm"
        >
          <span className="font-display text-base italic text-gold-soft">October</span>
          <span>첫 방문 고객 1:1 피부 정밀 진단 무료</span>
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
      <button
        type="button"
        onClick={closeBanner}
        aria-label="공지 배너 닫기"
        className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center text-ivory/70 transition-colors hover:text-white"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
