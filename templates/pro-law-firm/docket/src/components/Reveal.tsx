"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** .up 요소가 화면에 들어오면 .on 을 붙인다. JS 가 없으면 처음부터 보인다. */
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll(".up:not(.on)");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("on")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
