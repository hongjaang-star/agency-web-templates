"use client";
import { useEffect, useRef } from "react";
import { processSteps } from "@/data/content";

export default function ProcessTrack() {
  const track = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll("li"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = el.getBoundingClientRect();
      const circles = items.map(item => item.querySelector(".step")!.getBoundingClientRect());
      const start = circles[0].top + circles[0].height / 2;
      const end = circles.at(-1)!.top + circles.at(-1)!.height / 2;
      const cursor = window.innerHeight * .6;
      const progress = motion.matches ? 1 : Math.max(0, Math.min(1, (cursor - start) / (end - start)));
      el.style.setProperty("--track-start", `${start - bounds.top}px`);
      el.style.setProperty("--track-length", `${end - start}px`);
      el.style.setProperty("--track-x", `${circles[0].left + circles[0].width / 2 - bounds.left}px`);
      el.style.setProperty("--track-progress", String(progress));
      const active = circles.reduce((last, circle, i) => circle.top + circle.height / 2 <= cursor ? i : last, -1);
      items.forEach((item, i) => {
        item.dataset.reached = String(motion.matches || i <= active);
        item.dataset.active = String(!motion.matches && i === active);
      });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => { observer.disconnect(); window.cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); motion.removeEventListener("change", schedule); };
  }, []);
  return <ol ref={track} className="track scroll-track">{processSteps.map((s, i) => <li key={s.title}><span className="num step">0{i + 1}</span><div><h2>{s.title}</h2><p>{s.body}</p><small className="num">{s.detail}</small></div></li>)}</ol>;
}
