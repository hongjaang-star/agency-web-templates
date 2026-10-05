import type {Metadata} from 'next';
import Link from '../../../components/SiteLink';
import ProjectExperience from '../../../components/ProjectExperience';
import {notFound} from 'next/navigation';
import {portfolioProjects} from '../../../data/projects';
import {legacyProjects} from '../../../data/legacy-projects';
import {asset,absolute} from '../../../lib/urls';
export function generateStaticParams(){return [...portfolioProjects,...legacyProjects].map(p=>({id:p.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
 const {id}=await params;const project=[...portfolioProjects,...legacyProjects].find(p=>p.id===id);
 return project?{title:project.title,description:project.subtitle,alternates:{canonical:absolute(`/projects/${id}/`)},openGraph:{title:project.title,description:project.subtitle,images:[absolute(`/images/${project.image}`)]}}:{};
}
export default async function Project({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const project=portfolioProjects.find(p=>p.id===id);
 if(!project){const legacy=legacyProjects.find(p=>p.id===id);if(!legacy)notFound();return <><section className="page-heading section"><span className="eyebrow">ARCHIVE / 이전 디자인 예시</span><h1>{legacy.title}</h1><p>{legacy.subtitle}</p><Link className="text-link" href="/projects/">새 포트폴리오 보기 ↗</Link></section><div className="project-full"><img src={asset(legacy.image)} alt={legacy.subtitle} width="1536" height="1024"/></div><section className="section"><p>{legacy.text}</p><p className="small">가상 프로젝트 · AI 제작 이미지</p></section></>;}
 const index=portfolioProjects.findIndex(p=>p.id===id),next=portfolioProjects[(index+1)%portfolioProjects.length];
 return <><section className="project-masthead"><div className="project-topline"><Link href="/projects/">← 포트폴리오</Link><span className="project-topic">{project.type} / {project.region}</span><span>DESIGN STUDY · {project.year}</span></div><span className="project-en">{project.en}</span><h1>{project.title}</h1><p className="project-subtitle">{project.subtitle}</p><div className="project-meta"><div><span>INTERIOR CONCEPT</span><p>{project.concept}</p></div><div><span>LOCATION STUDY</span><p>{project.region}</p></div><div><span>AREA STUDY</span><p>{project.area} · 예시</p></div><div><span>MATERIAL PALETTE</span><p>{project.materials}</p></div></div></section><ProjectExperience project={project}/><nav className="project-endnav" aria-label="프로젝트 이동"><Link href="/projects/">모든 포트폴리오 <span>↗</span></Link><Link className="next-project" href={`/projects/${next.id}/`}><span>NEXT / {next.type} / {next.region}</span><strong>{next.title}</strong><span aria-hidden="true">→</span></Link></nav></>;
}
