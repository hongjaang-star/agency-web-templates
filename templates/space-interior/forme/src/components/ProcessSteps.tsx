import Link from './SiteLink';
import {studio} from '../data/studio';
import {processPhotos} from '../data/process';
import {asset} from '../lib/urls';

export default function ProcessSteps(){
 return <section className="section process-list process-photo-list">
  {studio.steps.map(([title,subtitle,description],index)=>{
   const photo=processPhotos[index];
   return <article className="process-photo-step" key={title}>
    <div className="process-step-copy"><span className="process-number">0{index+1}</span><span className="eyebrow">{title}</span><h2>{subtitle}</h2><p>{description}</p></div>
    <figure><img src={asset(photo.file)} srcSet={`${asset(photo.file.replace('.webp','-small.webp'))} 768w, ${asset(photo.file)} 1536w`} sizes="(max-width:700px) 90vw, 52vw" alt={photo.alt} width="1536" height="1024" loading={index===0?'eager':'lazy'}/><figcaption><span>0{index+1} /</span>{photo.caption}</figcaption></figure>
   </article>;
  })}
  <div className="process-end"><p className="small">과정 사진은 AI 제작 예시입니다. 실제 범위와 일정은 현장 확인 및 계약 조건에 따라 정합니다.</p><Link className="text-link" href="/contact/">첫 이야기 시작하기 ↗</Link></div>
 </section>;
}
