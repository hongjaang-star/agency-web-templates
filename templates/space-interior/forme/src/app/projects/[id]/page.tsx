import type {Metadata} from 'next';
import Link from '../../../components/SiteLink';
import {notFound} from 'next/navigation';
import {studio} from '../../../data/studio';
import {asset,absolute} from '../../../lib/urls';
export function generateStaticParams(){return studio.projects.map(p=>({id:p.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{const {id}=await params;const p=studio.projects.find(p=>p.id===id);return p?{title:p.title,description:p.subtitle,alternates:{canonical:absolute(`/projects/${id}/`)}}:{};}
export default async function Project({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=studio.projects.find(p=>p.id===id);if(!p)notFound();return <><section className="page-heading section"><span className="eyebrow">PROJECT NOTES / {p.type} / {p.area}</span><h1>{p.title}</h1><p>{p.subtitle}</p></section><div className="project-full"><img src={asset(p.image)} srcSet={`${asset(p.image.replace('.webp','-small.webp'))} 768w, ${asset(p.image)} 1536w`} sizes="(max-width: 800px) 90vw, 33vw" alt={p.subtitle} width="1536" height="1024"/></div><section className="section project-story"><div><span className="eyebrow">DESIGN APPROACH</span><h2>공간에 담은 생각</h2></div><div><p>{p.text}</p><ul>{p.details.map(t=><li key={t}>{t}</li>)}</ul><p className="small">가상 프로젝트 · AI 제작 이미지 · 실제 시공 실적이 아닙니다.</p><div className="story-links"><Link className="text-link" href="/projects/">← 공간 기록으로</Link><Link className="text-link" href="/contact/">비슷한 공간 상담 준비 ↗</Link></div></div></section></>}
