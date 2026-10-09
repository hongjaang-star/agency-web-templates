"use client";
import {useRef,useState} from "react";
import {company} from "@/data/content";
function Paper({index}:{index:number}){const cert=company.certs[index];return <div className={`certificate-paper cert-${index}`}>
 <div className="certificate-border"/>
 <div className="cert-brand"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3L44 14V35L24 46L4 35V14Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M13 31V17H20V31M26 31V17H33V31" fill="none" stroke="currentColor" strokeWidth="3"/></svg><span>SEROGYEOL<br/>ASSURANCE STUDIO<small>가상 디자인 발급기관</small></span></div>
 <p className="cert-kicker">{index===2?'PREPARATION RECORD':'CERTIFICATE DESIGN'}</p>
 <h3>{index===2?'인증 준비 확인서':cert.name+' 인증서'}</h3>
 <p className="cert-code">{cert.code}</p><div className="cert-rule"/>
 <p className="cert-recipient">세로결정밀<span>SEROGYEOL PRECISION</span></p>
 <p className="cert-body">{index===2?'자동차 부품 품질 시스템의 준비 과정을 표현한 가상 확인서입니다. 인증 취득을 의미하지 않습니다.':'알루미늄 압출 및 정밀 가공 분야의 관리 시스템을 표현한 가상 인증서 디자인입니다.'}</p>
 <div className="cert-watermark" aria-hidden="true">DEMO</div>
 <dl><div><dt>문서 번호</dt><dd>DEMO-SG-{['QMS','EMS','READY'][index]}-024</dd></div><div><dt>제작 목적</dt><dd>포트폴리오 디자인 예시</dd></div></dl>
 <div className="cert-seal"><span>DESIGN<br/>SAMPLE</span></div><p className="cert-notice">가상 인증서 · 실제 인증 효력 없음</p>
 </div>;}
export default function CompanyCertificates(){const [selected,setSelected]=useState(0);const dialog=useRef<HTMLDialogElement>(null);return <section className="band company-certificates">
 <div className="company-section-head"><div><p className="eyebrow">QUALITY DOCUMENTS</p><h2>품질을 기록하는 기준.</h2></div><p>가상 인증서 디자인 3종.<br/>공식 인증이나 인증 취득을 의미하지 않습니다.</p></div>
 <div className="certificate-grid">{company.certs.map((cert,i)=><article key={cert.name}><Paper index={i}/><div className="certificate-label"><div><b>{cert.name}</b><span>{cert.note}</span></div><button type="button" onClick={()=>{setSelected(i);dialog.current?.showModal();}} aria-label={`${cert.name} 가상 인증서 크게 보기`}>크게 보기 ↗</button></div></article>)}</div>
 <dialog className="certificate-dialog" ref={dialog} aria-label="가상 인증서 상세 보기"><button className="certificate-close" type="button" onClick={()=>dialog.current?.close()} autoFocus>닫기 ×</button><Paper index={selected}/></dialog>
 </section>;}
