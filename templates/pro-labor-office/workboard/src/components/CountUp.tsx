"use client";
import { useEffect, useRef, useState } from "react";
export default function CountUp({value,suffix,label}:{value:number;suffix:string;label:string}){
 const [shown,setShown]=useState(0); const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const node=ref.current;if(!node)return;let started=false;const io=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting||started)return;started=true;const start=performance.now(),duration=1100;const tick=(now:number)=>{const p=Math.min((now-start)/duration,1);setShown(Math.round(value*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);io.disconnect()},{threshold:.35});io.observe(node);return()=>io.disconnect()},[value]);
 return <div ref={ref} className="metric"><strong><span>{shown.toLocaleString("ko-KR")}</span>{suffix}</strong><p>{label}</p></div>
}
