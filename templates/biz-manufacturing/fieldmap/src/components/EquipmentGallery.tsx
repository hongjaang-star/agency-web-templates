"use client";
import Image from "next/image";
import { useState } from "react";
import { capability } from "@/data/content";
import { BASE_PATH } from "@/lib/config";
const details = [
  { id:"extrusion-press", type:"EXTRUSION", spec:"프레스 용량 1,800 / 2,500톤", feature:"가열한 알루미늄 빌릿을 다이로 밀어 일정한 단면의 프로파일을 성형합니다.", use:"프로파일 · 방열판 소재" },
  { id:"five-axis", type:"5-AXIS CNC", spec:"직선 3축 + 회전 2축 제어", feature:"복잡한 곡면과 여러 방향의 장착면을 가공해 공정 간 재고정을 줄입니다.", use:"정밀 브래킷 · 복합 형상 부품" },
  { id:"three-axis", type:"3-AXIS CNC", spec:"X · Y · Z 3축 제어", feature:"평면 밀링, 홀 가공과 탭 작업으로 부품의 기본 형상과 조립면을 완성합니다.", use:"레일 베이스 · 하우징 장착면" },
  { id:"friction-stir", type:"FRICTION STIR WELDING", spec:"회전 공구를 이용한 고상 접합", feature:"접합부를 마찰열로 연화하고 교반해 알루미늄 판재와 냉각 유로를 연결합니다.", use:"콜드플레이트 · 밀폐형 판재" },
  { id:"coordinate-measuring", type:"COORDINATE MEASURING", spec:"접촉식 프로브 · 3차원 좌표 측정", feature:"기준면, 홀 위치와 형상 치수를 측정해 도면과 완성 부품의 차이를 확인합니다.", use:"치수 검사 · 형상 확인" },
  { id:"helium-leak", type:"HELIUM LEAK TEST", spec:"헬륨 추적 가스 · 진공 누설 검사", feature:"헬륨을 추적 가스로 사용해 냉각 유로와 밀폐 부품의 미세 누설 여부를 검사합니다.", use:"기밀 검사 · 냉각 부품 검증" },
];
function EquipmentCard({ index }: { index:number }) {
  const item=capability.equipment[index], detail=details[index];
  const [expanded,setExpanded]=useState(false), [hovered,setHovered]=useState(false);
  const open=expanded||hovered;
  return <article className="equipment-card" data-open={open} onPointerEnter={event=>{if(event.pointerType==="mouse")setHovered(true);}} onPointerLeave={()=>setHovered(false)}>
    <Image className="equipment-image" src={`${BASE_PATH}/images/equipment/${detail.id}.webp`} alt={`${item.name} 대표 가상 이미지 — AI 제작`} fill sizes="(max-width:640px) 100vw, (max-width:1000px) 50vw, 33vw" />
    <div className="equipment-shade" />
    <div className="equipment-top"><span className="mono">0{index+1} / {detail.type}</span><span>AI 가상 이미지</span></div>
    <div className="equipment-copy"><span className="equipment-count mono">{item.spec}</span><h3>{item.name}</h3>
      <div className="equipment-info" id={`equipment-info-${detail.id}`} aria-hidden={!open}><dl>
        <div><dt>주요 스펙</dt><dd>{detail.spec}</dd></div><div><dt>주요 기능</dt><dd>{detail.feature}</dd></div><div><dt>적용 공정</dt><dd>{detail.use}</dd></div>
      </dl></div>
    </div>
    <button className="equipment-trigger" type="button" aria-expanded={open} aria-controls={`equipment-info-${detail.id}`} onClick={()=>setExpanded(value=>!value)}><span className="equipment-sr">{item.name} 스펙과 기능 {open?"접기":"보기"}</span><span className="equipment-plus" aria-hidden="true">{open?"−":"+"}</span></button>
  </article>;
}
export default function EquipmentGallery(){return <section className="band equipment-section" aria-labelledby="equipment-title">
  <div className="equipment-heading"><div><p className="equipment-eyebrow mono">EQUIPMENT / 06</p><h2 id="equipment-title">정밀함을 만드는 설비.</h2></div><p>보유 설비<br/><span>카드에 마우스를 올리거나 눌러 스펙과 기능을 확인하세요.</span></p></div>
  <div className="equipment-grid">{capability.equipment.map((item,index)=><EquipmentCard index={index} key={item.name}/>)}</div>
  <p className="equipment-note">가상 업체 데모입니다. 설비 이미지는 AI 제작 시각화이며, 보유 수량·사양·기능은 가상 예시입니다.</p>
</section>;}
