"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * 히어로 배경 영상 (장식용 · 소리 없음 · 반복)
 * - 동작 줄이기(prefers-reduced-motion) 사용자는 자동재생하지 않고 포스터만 보여줍니다.
 * - 반복되는 영상은 멈출 수 있어야 하므로(WCAG 2.2.2) 일시정지 버튼을 둡니다.
 */
export default function HeroVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  /** 위치·크기 클래스 (예: "absolute inset-0 h-full w-full") — 화면 크기별 배치는 부모가 정합니다 */
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // 자동재생이 막힌 브라우저에서는 포스터가 그대로 보입니다.
    v.play().catch(() => {});
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <>
      <video
        ref={ref}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`-z-20 object-cover ${className}`}
      >
        <source src={src} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "배경 영상 일시정지" : "배경 영상 재생"}
        className="absolute right-4 top-4 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink backdrop-blur transition-colors hover:bg-white md:right-6 lg:bottom-8 lg:right-8 lg:top-auto"
      >
        {playing ? (
          <Pause aria-hidden="true" className="size-4" strokeWidth={1.75} />
        ) : (
          <Play aria-hidden="true" className="size-4 translate-x-px" strokeWidth={1.75} />
        )}
      </button>
    </>
  );
}
