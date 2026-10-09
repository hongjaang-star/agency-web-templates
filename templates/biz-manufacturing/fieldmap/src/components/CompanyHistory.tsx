"use client";
import {useEffect,useRef,useState} from "react";
import Image from "next/image";
import {history} from "@/data/history";
import {BASE_PATH} from "@/lib/config";

export default function CompanyHistory(){
 const [active,setActive]=useState(0);const [progress,setProgress]=useState(0);const root=useRef<HTMLElement>(null);
 useEffect(()=>{let frame=0;const update=()=>{frame=0;root.current!.style.setProperty('--company-header-height', `${document.querySelector('.top')!.getBoundingClientRect().height}px`);const nodes=[...root.current!.querySelectorAll<HTMLElement>('.era')];let index=0;nodes.forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight*.42)index=i;});setActive(index);const first=nodes[0].getBoundingClientRect().top,last=nodes.at(-1)!.getBoundingClientRect().top;setProgress(Math.min(1,Math.max(0,(innerHeight*.42-first)/(last-first))));};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);update();return()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);cancelAnimationFrame(frame);};},[]);
 return <section className="company-history" ref={root} aria-label="세로결정밀 가상 연혁">
  <div className="history-heading"><p className="eyebrow">OUR JOURNEY / 1998—2024</p><h2>도면 한 장에서,<br/>연결된 공장까지.</h2><p>5개의 장면으로 돌아보는 성장의 기록.<br/>연혁과 공장 사진은 모두 가상으로 구성했습니다.</p></div>
  <div className="history-layout"><aside className="era-rail"><span className="mono">THE YEARS OF MAKING</span><div className="era-year" key={history[active].year}>{history[active].year}</div><p className="era-chapter">{history[active].chapter}</p><div className="era-nav" aria-label="연혁 연도 선택">{history.map((h,i)=><a key={h.year} href={`#era-${h.year}`} aria-current={i===active?'step':undefined}><span>{h.year}</span><i/></a>)}</div><div className="era-progress" aria-hidden="true"><span style={{width:`${progress*100}%`}}/></div><small>스크롤로 이어지는 제조의 역사</small></aside>
  <div className="era-stories">{history.map((h,i)=><article id={`era-${h.year}`} key={h.year} className={`era ${i===active?'is-current':''}`} data-year={h.year}><figure><Image unoptimized src={`${BASE_PATH}/images/history/${h.image}`} alt={h.caption} width={1440} height={960} loading={i===0?'eager':'lazy'}/><figcaption><span>{h.year} / ARCHIVE 0{i+1}</span><span>{h.caption}</span></figcaption></figure><div className="era-body"><span className="eyebrow">CHAPTER 0{i+1} · {h.year}</span><h3>{h.title}</h3><p>{h.body}</p><p className="era-detail">{h.detail}</p><div className="era-milestone"><span>이 시기의 변화</span><b>{h.milestone}</b></div></div></article>)}</div></div>
 </section>;
}
