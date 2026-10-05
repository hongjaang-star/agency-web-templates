"use client";

import { useEffect, useRef, useState } from "react";
import { flows } from "@/data/content";
import { flowPageCopy as C } from "@/data/site";

/** STEP BY STEP 왼쪽 바로가기: 누르면 해당 분야로 스크롤, 보고 있는 분야를 표시 */
export default function FlowNav() {
  const [active, setActive] = useState<string>(flows[0].key);
  const navRef = useRef<HTMLElement>(null);
  // 모바일 가로 바에서는 현재 분야가 보이도록 바만 옆으로 스크롤 (페이지는 움직이지 않음)
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>('a[aria-current="true"]');
    if (nav && link && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
  }, [active]);
  useEffect(() => {
    const sections = flows.map((f) => document.getElementById(f.key)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return (
    <nav className="flow-nav" aria-label={C.navLabel} ref={navRef}>
      <ol>
        {flows.map((f, i) => (
          <li key={f.key}>
            <a href={`#${f.key}`} aria-current={active === f.key ? "true" : undefined} onClick={() => setActive(f.key)}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <b>{f.label}</b>
              <small>{f.steps.length}{C.stepsUnit}</small>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
