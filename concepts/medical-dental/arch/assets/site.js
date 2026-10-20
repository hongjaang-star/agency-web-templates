/* 하루결치과의원(가상) 공통 데이터 — 실존 치과의 상호·문구·사진·실적을 쓰지 않는다.
   rules/medical.md: 효과 보장·할인·전후 사진·실적 수치 없음, 부작용 고지, 비급여 금액은 예시, 건보 기준은 공단 안내 연결 */
const C={name:'하루결치과의원',en:'HARUGYEOL DENTAL',tel:'02-000-0000',addr:'서울특별시 가람구 결로 00, 2층 (가상 주소)',
 hours:[['월 · 화 · 목 · 금','09:30 – 18:30'],['수 (야간)','13:00 – 21:00'],['토','09:30 – 14:00 (점심시간 없음)'],['점심시간','13:00 – 14:00'],['일 · 공휴일','휴진']],
 parking:'건물 지하 주차 1시간 (예시)',subway:'가람역(가상) 3번 출구 도보 2분'};
/* 사진 칸: GPT 실사 사진을 images/ 폴더에 같은 이름으로 넣으면 자동으로 표시 */
const IMG={
 doctor1:['doctor-1.webp','4:5','한도윤 대표원장 프로필'],doctor2:['doctor-2.webp','4:5','서이준 원장 프로필'],doctor3:['doctor-3.webp','4:5','윤채원 원장 프로필'],doctor4:['doctor-4.webp','4:5','강하린 원장 프로필'],
 cbct:['equip-cbct.webp','4:3','치과용 CT (CBCT)'],scanner:['equip-scanner.webp','4:3','구강 스캐너'],microscope:['equip-microscope.webp','4:3','치과용 미세현미경'],steril:['equip-sterilization.webp','4:3','멸균실'],
 lobby:['space-lobby.webp','3:2','대기 공간'],room:['space-operatory.webp','3:2','개별 진료실']};
const TREAT={
 cavity:{n:'충치 · 레진 치료',k:'보존',who:'한도윤',dur:'1회 30~60분',steps:['검진 · 엑스레이','썩은 부분 제거','레진 · 인레이로 메우기','교합 확인'],ins:'만 12세 이하 영구치 레진, 아말감 · 글래스아이오노머는 건강보험 적용. 성인 레진 · 인레이는 비급여',care:['마취가 풀릴 때까지 1~2시간 식사를 피해 주세요','치료 후 며칠 시릴 수 있으며, 오래가면 다시 확인합니다','충치 깊이에 따라 신경치료로 이어질 수 있습니다']},
 endo:{n:'신경치료',k:'보존',who:'한도윤',dur:'2~4회, 회당 40~60분',steps:['통증 원인 확인 · 마취','염증 신경 제거','근관 소독 · 충전','크라운으로 보호'],ins:'신경치료는 건강보험 적용. 이후 크라운은 재료에 따라 비급여',care:['치료 기간에는 그 쪽으로 단단한 음식을 피해 주세요','치료 중 일시적인 통증 · 붓기가 있을 수 있습니다','염증 상태에 따라 재치료나 발치가 필요할 수 있습니다']},
 crown:{n:'크라운 · 보철',k:'보철',who:'한도윤',dur:'2~3회, 1~2주',steps:['치아 다듬기','구강 스캔 · 본뜨기','임시치아','보철물 붙이기'],ins:'재료에 따라 대부분 비급여',care:['임시치아 기간에는 끈적한 음식을 피해 주세요','붙인 뒤 며칠 어색하거나 시릴 수 있습니다','이갈이가 있으면 보철물이 깨질 수 있어 상담이 필요합니다']},
 implant:{n:'임플란트',k:'외과 · 보철',who:'서이준 · 한도윤',dur:'3~6개월 (뼈 상태에 따라 다름)',steps:['CT로 뼈 확인 · 계획','식립 수술','뼈와 붙는 기간','보철물 연결'],ins:'만 65세 이상 평생 2개 건강보험 적용(본인부담 30%). 그 외는 비급여. 적용 여부는 국민건강보험공단 기준으로 확인',care:['수술 후 2~3일 붓기 · 멍 · 통증이 있을 수 있습니다','흡연 · 당뇨 · 잇몸 상태에 따라 결과가 달라질 수 있습니다','감염 · 임플란트 주위염 예방을 위해 정기 검진이 필요합니다']},
 gum:{n:'잇몸치료 · 스케일링',k:'치주',who:'한도윤',dur:'스케일링 30분 · 잇몸치료 2~4회',steps:['잇몸 상태 검사','스케일링','잇몸 속 치석 제거','관리 방법 안내'],ins:'스케일링 만 19세 이상 연 1회, 치주 치료는 진단에 따라 건강보험 적용',care:['치료 후 며칠 시리거나 피가 날 수 있습니다','잇몸이 줄어 치아 사이가 넓어 보일 수 있습니다','3~6개월마다 정기 관리를 권합니다']},
 wisdom:{n:'사랑니 발치',k:'구강외과',who:'서이준',dur:'1회 20~60분 + 7일 뒤 실밥',steps:['파노라마 · CT로 신경 위치 확인','마취 · 발치','지혈 · 주의사항 안내','7일 뒤 실밥 제거'],ins:'일반 · 매복 사랑니 발치는 건강보험 적용',care:['2~3일 붓기 · 통증 · 입 벌리기 불편함이 있을 수 있습니다','드물게 감각 이상 · 염증이 생길 수 있어 사전에 설명합니다','거즈는 1~2시간 물고, 빨대 · 흡연은 피해 주세요']},
 ortho:{n:'치아교정',k:'교정',who:'윤채원',dur:'1년 6개월~2년 6개월 (개인차)',steps:['정밀 검사 · 상담','진단 · 계획 설명','장치 부착 · 정기 조정','유지 장치'],ins:'대부분 비급여. 일부 악안면 기형 수술 교정은 건강보험 기준 확인',care:['장치 초기 1~2주 통증 · 불편함이 있을 수 있습니다','양치가 어려워 충치 · 잇몸 관리가 더 필요합니다','유지 장치를 쓰지 않으면 치아가 다시 움직일 수 있습니다']},
 kids:{n:'소아치과',k:'소아',who:'강하린',dur:'1회 20~40분',steps:['아이와 친해지기','검진 · 불소','홈메우기 · 충치 치료','보호자 상담'],ins:'만 18세 이하 충치 없는 큰어금니 홈메우기, 만 12세 이하 영구치 레진 건강보험 적용',care:['치료 전 아이에게 무엇을 할지 쉬운 말로 먼저 설명합니다','치료 후 마취된 입술을 깨물지 않게 지켜봐 주세요','아이 상태에 따라 치료를 나눠 진행할 수 있습니다']},
 tmj:{n:'턱관절 상담',k:'구강내과',who:'서이준',dur:'상담 · 검사 30~40분',steps:['증상 문진','턱 움직임 · 영상 검사','생활 습관 안내','필요 시 장치 치료'],ins:'검사 · 치료 항목에 따라 건강보험 또는 비급여',care:['딱딱하고 질긴 음식, 턱 괴기를 줄여 주세요','통증이 심하거나 입이 안 벌어지면 바로 연락 주세요','증상에 따라 다른 진료과 진료가 필요할 수 있습니다']}};
const AREAS=[['front','앞니'],['back','어금니'],['wisdom','사랑니 자리'],['gum','잇몸'],['jaw','턱 · 관절'],['child','아이 치아']];
const SYMS=[['cold','시려요'],['bite','씹을 때 아파요'],['crack','깨졌어요 · 금 갔어요'],['bleed','피가 나요 · 부어요'],['loose','흔들려요 · 빠졌어요'],['align','고르지 않아요'],['click','소리 나요 · 잘 안 벌어져요']];
function guide(area,sym){
 let t=[],note='';
 const add=(...k)=>k.forEach(x=>{if(!t.includes(x))t.push(x)});
 if(area==='child'){add('kids');if(sym==='align')add('ortho');}
 if(area==='jaw'||sym==='click'){add('tmj');}
 if(area==='wisdom'){add('wisdom');}
 if(area==='gum'||sym==='bleed'){add('gum');if(area==='wisdom')note='사랑니 주변 잇몸이 붓는 경우가 많습니다.';}
 if(sym==='cold')add('cavity','gum');
 if(sym==='bite')add('cavity','endo');
 if(sym==='crack')add('crown','endo');
 if(sym==='loose')add(area==='child'?'kids':'implant','gum');
 if(sym==='align')add('ortho');
 if(!t.length)add('cavity');
 const urgent=(sym==='bleed'||sym==='crack'||sym==='loose');
 return {list:t.slice(0,3),note,urgent};
}
const DOCS=[
 {id:'doctor1',n:'한도윤',r:'대표원장',sp:'통합치의학과 전문의 (예시)',area:'임플란트 보철 · 크라운 · 신경치료',line:'치료 전에 사진과 모형으로 지금 상태를 먼저 보여 드립니다.',cv:['치의학 박사 (예시)','대한통합치과학회 정회원 (예시)','진료 경력 15년 (예시)']},
 {id:'doctor2',n:'서이준',r:'원장',sp:'구강악안면외과 전문의 (예시)',area:'사랑니 발치 · 임플란트 수술 · 턱관절',line:'수술 전에 CT로 신경과 뼈의 위치를 함께 확인합니다.',cv:['구강악안면외과 수련 (예시)','대한구강악안면외과학회 정회원 (예시)']},
 {id:'doctor3',n:'윤채원',r:'원장',sp:'치과교정과 전문의 (예시)',area:'치아교정 · 투명교정 · 성장기 교정',line:'교정 기간과 유지 장치까지 처음 상담에서 함께 이야기합니다.',cv:['치과교정과 수련 (예시)','대한치과교정학회 정회원 (예시)']},
 {id:'doctor4',n:'강하린',r:'원장',sp:'소아치과 전문의 (예시)',area:'소아 · 청소년 진료 · 홈메우기',line:'아이가 먼저 진료실과 친해질 시간을 드립니다.',cv:['소아치과 수련 (예시)','대한소아치과학회 정회원 (예시)']}];
const EQUIP=[['cbct','치과용 CT (CBCT)','임플란트 · 사랑니 수술 전 뼈와 신경 위치를 3차원으로 확인합니다.'],['scanner','구강 스캐너','본을 뜨는 재료 대신 스캔으로 치아 모양을 기록합니다.'],['microscope','미세현미경','신경치료 때 좁은 근관을 크게 보며 치료합니다.'],['steril','멸균실','기구는 사용 후 세척 · 포장 · 고압 멸균 과정을 거칩니다.']];
const FEES=[['레진 충전 (1개 면)','000,000원'],['인레이 (세라믹)','000,000원'],['크라운 (지르코니아)','000,000원'],['임플란트 (1개, 보철 포함)','0,000,000원'],['치아교정 (전체, 장치 기준)','0,000,000원'],['미백 (전체)','000,000원']];
const FAQ=[['아픈데 오늘 바로 진료받을 수 있나요?','붓기 · 출혈 · 깨짐처럼 급한 증상은 전화로 먼저 알려 주시면 당일 진료 가능 시간을 안내합니다. 얼굴이 크게 붓고 열이 나거나 숨쉬기 불편하면 바로 응급실로 가세요.'],['첫 방문 때 무엇을 하나요?','문진과 검진, 필요한 엑스레이 촬영 후 화면으로 상태를 설명드리고 치료 계획과 비용을 안내합니다. 당일 치료 여부는 그 뒤에 정합니다.'],['건강보험이 되는지 어떻게 알 수 있나요?','진료마다 적용 기준을 안내하지만 최종 적용은 국민건강보험공단 기준으로 결정됩니다. 공단 고객센터나 홈페이지에서 확인할 수 있습니다.'],['비급여 진료비는 어디서 보나요?','원내와 이 홈페이지에 게시합니다. 건강보험심사평가원 누리집에서 항목별 비용도 확인할 수 있습니다.']];
function copyText(t,b){const o=b.textContent;const d=()=>{b.textContent='복사했어요';setTimeout(()=>b.textContent=o,1500)};try{navigator.clipboard.writeText(t).then(d,()=>prompt('복사해 주세요',t))}catch(e){prompt('복사해 주세요',t)}}
/* 사진 칸 렌더: 파일이 있으면 사진, 없으면 크기·파일명이 적힌 자리표시 */
function photo(key,cls=''){const [f,r,alt]=IMG[key];const [a,b]=r.split(':');return `<figure class="photo ${cls}" style="aspect-ratio:${a}/${b}"><img src="${(window.IMGBASE||"../images/")}${f}" alt="${alt} (AI 생성 예시 이미지)" loading="lazy" onerror="this.remove()"><figcaption class="ph-label"><b>${alt}</b><span>${f} · ${r}</span></figcaption></figure>`}
/* 상담 폼 검증 (데모: 접수 없음) */
function bindForm(f,m){f.onsubmit=e=>{e.preventDefault();const miss=[...f.querySelectorAll('[required]')].find(x=>x.type==='checkbox'?!x.checked:!x.value.trim());
 if(miss){m.className='msg no';m.textContent=miss.type==='checkbox'?'개인정보 수집 · 이용(필수)에 동의해 주세요.':`${f.querySelector(`label[for="${miss.id}"]`).textContent.replace('*','').trim()} 항목을 입력해 주세요.`;miss.focus();return}
 const tel=f.querySelector('input[type=tel]');if(!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(tel.value.trim())){m.className='msg no';m.textContent='연락처 형식을 확인해 주세요. 예) 010-1234-5678';tel.focus();return}
 m.className='msg ok';m.textContent='입력 내용을 확인했습니다. 가상 업체 데모라 실제로 접수되지 않습니다. (실제 사이트는 접수 후 문자로 안내)'}}
const FORM=(id)=>`<form class="cf" id="${id}" novalidate>
 <div class="r"><label for="${id}-n">이름 <em>*</em></label><input id="${id}-n" autocomplete="name" required></div>
 <div class="r"><label for="${id}-t">연락처 <em>*</em></label><input id="${id}-t" type="tel" autocomplete="tel" placeholder="010-0000-0000" required></div>
 <div class="r"><label for="${id}-c">상담 진료 <em>*</em></label><select id="${id}-c" required><option value="">선택해 주세요</option>${Object.values(TREAT).map(t=>`<option>${t.n}</option>`).join('')}<option>잘 모르겠어요</option></select></div>
 <div class="r"><label for="${id}-w">통화 희망 시간</label><select id="${id}-w"><option>평일 오전</option><option>평일 오후</option><option>수요일 저녁</option><option>토요일 오전</option></select></div>
 <div class="r"><label for="${id}-m">불편한 점 (선택)</label><textarea id="${id}-m" rows="3" placeholder="예) 오른쪽 아래 어금니가 씹을 때 아파요"></textarea></div>
 <div class="agree"><label><input type="checkbox" required> [필수] 개인정보 수집 · 이용 동의 — 이름 · 연락처 · 상담 진료를 상담 연락에만 쓰고 상담 후 3개월 뒤 지웁니다.</label><label><input type="checkbox"> [선택] 진료 일정 안내 문자 수신</label><small>건강 정보는 꼭 필요한 만큼만 적어 주세요. 진단은 내원 진료로만 가능합니다.</small></div>
 <p class="msg" role="status"></p><button type="submit">상담 신청</button></form>`;

/* ---------- Arch 완성 사이트: 레이아웃 · 페이지 ---------- */
const $=s=>document.querySelector(s);
const R=document.body.dataset.root||'./',PG=document.body.dataset.page;
window.IMGBASE=R+'../images/';
const NAV=[['treat','진료 안내'],['doctors','의료진'],['equip','장비 · 공간'],['cost','비용 · 보험'],['visit','내원 · 상담']];
const href=(id,h='')=>(id==='home'?R:`${R}${id}/`)+h;
const ico={tel:'<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',chat:'<path d="M4 5h16v11H8l-4 4Z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',pin:'<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>'};
const svg=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${ico[k]}</svg>`;
document.body.insertAdjacentHTML('afterbegin',`<div class="demo"><b>가상 업체 데모 · 하루결치과의원</b> — 실제 치과가 아닙니다. 의료진 · 비용 · 연락처는 예시이며, 사진은 AI 생성 예시입니다.</div>
<header><div class="wrap"><a class="logo" href="${href('home')}"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 4c-4 0-6 3-6 7 0 6 3 8 4 13 1 4 2 5 3 5 2 0 2-6 7-6s5 6 7 6c1 0 2-1 3-5 1-5 4-7 4-13 0-4-2-7-6-7-3 0-5 2-8 2S11 4 8 4Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 10c2 1 8 1 10 0" stroke="var(--pe)" stroke-width="2" fill="none" stroke-linecap="round"/></svg>하루결치과의원</a>
<nav class="top" aria-label="주메뉴"><a href="${href('home')}" ${PG==='home'?'aria-current="page"':''}>증상으로 찾기</a>${NAV.map(([i,n])=>`<a href="${href(i)}" ${PG===i?'aria-current="page"':''}>${n}</a>`).join('')}</nav>
<div class="hcall"><a href="tel:020000000">02-000-0000</a><a class="p" href="${href('visit','#consult')}">상담 신청</a><button class="burger" id="burger" aria-label="메뉴 열기" aria-expanded="false">☰</button></div></div></header>
<div class="drawer" id="drawer"><div class="in"><button class="x" id="dx" aria-label="메뉴 닫기">✕</button><a href="${href('home')}" ${PG==='home'?'aria-current="page"':''}>증상으로 찾기</a>${NAV.map(([i,n])=>`<a href="${href(i)}" ${PG===i?'aria-current="page"':''}>${n}</a>`).join('')}</div></div>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap"><b>하루결치과의원</b> · ${C.addr} · ${C.tel} · 대표원장 한도윤(예시)<br>비급여 진료비는 <a href="${href('cost')}">비용 · 보험</a> 페이지와 원내에 게시합니다 · 가상 업체 데모 · 의료광고 심의 대상 여부는 실제 납품 시 확인</div></footer>
<nav class="dock" aria-label="바로가기"><a href="tel:020000000">${svg('tel')}전화</a><a class="p" href="${href('visit','#consult')}">${svg('chat')}상담 신청</a><a href="${href('visit','#hours')}">${svg('clock')}진료시간</a><a href="${href('visit','#mapc')}">${svg('pin')}오시는 길</a></nav>`);
const dr=$('#drawer'),bg=$('#burger');bg.onclick=()=>{dr.classList.add('open');bg.setAttribute('aria-expanded','true')};
const cl=()=>{dr.classList.remove('open');bg.setAttribute('aria-expanded','false')};dr.onclick=e=>{if(e.target===dr||e.target.id==='dx')cl()};document.addEventListener('keydown',e=>{if(e.key==='Escape')cl()});
const nb=(t,id,h,l)=>`<div class="next"><b>${t}</b><a href="${href(id,h||'')}">${l} →</a></div>`;

/* ---------- 홈: 치아 지도 ---------- */
function cls(i){return i===0||i===15?'wisdom':(i>=5&&i<=10?'front':'back')}
function mapSVG(){let g='';const cx=180,RX=150,RY=118;
 const arch=(cy,from,to,lab)=>{for(let i=0;i<16;i++){const th=from+(to-from)*i/15;const x=cx+RX*Math.cos(th),y=cy+RY*Math.sin(th);const c=cls(i);const w=c==='front'?(i===7||i===8?20:17):(c==='wisdom'?21:24),h=c==='front'?24:22;
  g+=`<rect class="t" data-a="${c}" x="${(x-w/2).toFixed(1)}" y="${(y-h/2).toFixed(1)}" width="${w}" height="${h}" rx="${c==='front'?6:8}" transform="rotate(${(th*180/Math.PI+90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"><title>${lab} ${c==='front'?'앞니':c==='wisdom'?'사랑니 자리':'어금니'}</title></rect>`}};
 const gum=(cy,from,to)=>{let d='';for(let i=0;i<=30;i++){const th=from+(to-from)*i/30;d+=(i?'L':'M')+(cx+(RX+2)*Math.cos(th)).toFixed(1)+' '+(cy+(RY+2)*Math.sin(th)).toFixed(1)}return `<path class="gum" data-a="gum" d="${d}"><title>잇몸</title></path>`};
 const U=[Math.PI+.42,2*Math.PI-.42],L=[Math.PI-.42,.42];arch(172,U[0],U[1],'위');arch(188,L[0],L[1],'아래');
 return `<svg viewBox="0 36 360 300" role="img" aria-label="치아 지도: 부위를 눌러 선택">${gum(172,U[0],U[1])}${gum(188,L[0],L[1])}${g}<circle class="jaw" data-a="jaw" cx="22" cy="180" r="15"><title>턱관절</title></circle><circle class="jaw" data-a="jaw" cx="338" cy="180" r="15"><title>턱관절</title></circle><text x="180" y="96" class="mlbl" text-anchor="middle">위 (상악)</text><text x="180" y="270" class="mlbl" text-anchor="middle">아래 (하악)</text><text x="22" y="212" class="mlbl" text-anchor="middle">턱관절</text><text x="338" y="212" class="mlbl" text-anchor="middle">턱관절</text></svg>`}
function pageHome(){const st={a:'back',s:'bite'};
 $('#map').innerHTML=mapSVG();
 const chips=(el,arr,key)=>{el.innerHTML=arr.map(a=>`<button type="button" class="chip" data-v="${a[0]}">${a[1]}</button>`).join('');el.onclick=e=>{const b=e.target.closest('button');if(b){st[key]=b.dataset.v;render()}}};
 chips($('#areas'),AREAS,'a');chips($('#syms'),SYMS,'s');
 $('#map').onclick=e=>{const t=e.target.closest('[data-a]');if(t){st.a=t.dataset.a;render()}};
 function render(){
  document.querySelectorAll('#areas .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===st.a));
  document.querySelectorAll('#syms .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===st.s));
  document.querySelectorAll('#map [data-a]').forEach(x=>x.classList.toggle('on',x.dataset.a===st.a||(st.a==='child'&&x.dataset.a!=='jaw'&&x.dataset.a!=='gum')));
  const g=guide(st.a,st.s),an=AREAS.find(x=>x[0]===st.a)[1],sn=SYMS.find(x=>x[0]===st.s)[1];
  const q=encodeURIComponent(`${an} · ${sn}`);
  $('#res').innerHTML=`<div class="h">${an} · ${sn}</div><ul>${g.list.map(k=>`<li><a href="${href('treat','#t-'+k)}"><b>${TREAT[k].n}</b><span>${TREAT[k].who} 원장 · ${TREAT[k].dur}</span></a></li>`).join('')}</ul>${g.note?`<p style="margin:0;font-size:14px">${g.note}</p>`:''}${g.urgent?`<div class="warn">붓기 · 출혈 · 깨짐은 오늘 전화로 먼저 알려 주세요. 얼굴이 크게 붓고 열이 나면 응급실로 가세요.</div>`:''}<div class="act"><a class="btn p" href="${href('visit','?c='+encodeURIComponent(TREAT[g.list[0]].n)+'&m='+q+'#consult')}">이 내용으로 상담 신청</a><a class="btn l" href="tel:020000000">전화하기</a></div><p class="disc">진단이 아닌 상담 준비용 안내입니다.</p>`}
 render();
 $('#htreat').innerHTML=Object.entries(TREAT).map(([k,t])=>`<a href="${href('treat','#t-'+k)}"><span>${t.k}</span><b>${t.n}</b></a>`).join('');
 $('#hdocs').innerHTML=DOCS.map(d=>`<a href="${href('doctors','#'+d.id)}">${photo(d.id)}<b>${d.n} <small>${d.r}</small></b><span>${d.sp}</span></a>`).join('');
 $('#hhours').innerHTML=C.hours.map(h=>`<div><dt>${h[0]}</dt><dd>${h[1]}</dd></div>`).join('');
}
/* ---------- 진료 안내 ---------- */
function pageTreat(){const cats=['전체',...new Set(Object.values(TREAT).map(t=>t.k))];let on='전체';
 const draw=()=>{$('#tabs').innerHTML=cats.map(c=>`<button type="button" class="chip" aria-pressed="${c===on}" data-c="${c}">${c}</button>`).join('');
  $('#tg').innerHTML=Object.entries(TREAT).filter(([k,t])=>on==='전체'||t.k===on).map(([k,t])=>`<article class="tc tc-l" id="t-${k}" data-k="${k}"><div><span class="kk">${t.k}</span><h3>${t.n}</h3><span class="meta">담당 ${t.who} 원장 · ${t.dur}</span><p class="ins">${t.ins}</p><a class="mini" href="${href('visit','?c='+encodeURIComponent(t.n)+'#consult')}">이 진료 상담 신청 →</a></div><div><h4>진료 과정</h4><ol class="flow">${t.steps.map(s=>`<li>${s}</li>`).join('')}</ol></div><div class="care"><h4>주의사항 · 부작용</h4><ul>${t.care.map(c=>`<li>${c}</li>`).join('')}</ul><p class="fine">결과와 기간은 개인에 따라 다를 수 있습니다.</p></div></article>`).join('');
  if(location.hash){const el=document.querySelector(location.hash);if(el){el.classList.add('hl')}}};
 $('#tabs').onclick=e=>{const b=e.target.closest('[data-c]');if(b){on=b.dataset.c;draw()}};
 if(location.hash){const k=location.hash.slice(3);if(TREAT[k])on='전체'}draw();
 if(location.hash)setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView({block:'start'}),60)}
/* ---------- 의료진 ---------- */
function pageDoctors(){const own=Object.entries(TREAT);
 $('#dl').innerHTML=DOCS.map(d=>`<article class="dp" id="${d.id}">${photo(d.id)}<div><span class="kk">${d.sp}</span><h2>${d.n} <small>${d.r}</small></h2><q>${d.line}</q><dl><dt>진료 영역</dt><dd>${d.area}</dd><dt>경력 · 학회</dt><dd><ul>${d.cv.map(c=>`<li>${c}</li>`).join('')}</ul></dd><dt>담당 진료</dt><dd class="tags">${own.filter(([k,t])=>t.who.includes(d.n)).map(([k,t])=>`<a href="${href('treat','#t-'+k)}">${t.n}</a>`).join('')}</dd></dl></div></article>`).join('')}
/* ---------- 장비 · 공간 ---------- */
const STERIL=[['세척','사용한 기구는 초음파 세척기로 이물질을 먼저 없앱니다.'],['포장','기구마다 멸균 파우치에 넣고 날짜를 적습니다.'],['고압 멸균','고압 증기 멸균기로 멸균하고 표시 테이프로 확인합니다.'],['보관 · 개봉','환자 앞에서 파우치를 엽니다.']];
function pageEquip(){$('#eg').innerHTML=EQUIP.map(e=>`<div>${photo(e[0])}<h3>${e[1]}</h3><p>${e[2]}</p></div>`).join('');$('#sg').innerHTML=`<div>${photo('lobby')}<h3>대기 공간</h3><p>창가 쪽 대기석과 보호자 자리를 따로 두었습니다.</p></div><div>${photo('room')}<h3>개별 진료실</h3><p>문이 있는 진료실에서 설명을 듣습니다.</p></div>`;$('#steril').innerHTML=STERIL.map((s,i)=>`<div><em>0${i+1}</em><b>${s[0]}</b><p>${s[1]}</p></div>`).join('')}
/* ---------- 비용 · 보험 ---------- */
const INS=[['scaling','스케일링',a=>a>=19,'만 19세 이상 · 연 1회'],['implant','임플란트',a=>a>=65,'만 65세 이상 · 평생 2개 · 본인부담 30%'],['denture','틀니',a=>a>=65,'만 65세 이상 · 7년에 1회 · 본인부담 30%'],['resin','레진 (영구치)',a=>a<=12,'만 12세 이하 영구치'],['sealant','홈메우기',a=>a<=18,'만 18세 이하 충치 없는 큰어금니'],['wisdom','사랑니 발치',a=>true,'나이 제한 없음 (일반 · 매복)']];
function pageCost(){$('#fees').innerHTML=FEES.map(f=>`<tr><td>${f[0]}</td><td class="n">${f[1]} (예시)</td></tr>`).join('');
 const age=$('#age'),out=$('#ins');const draw=()=>{const a=+age.value;$('#agev').textContent=a+'세';out.innerHTML=INS.map(x=>`<li class="${x[2](a)?'y':'n'}"><b>${x[1]}</b><span>${x[3]}</span><em>${x[2](a)?'적용 대상':'해당 없음'}</em></li>`).join('')};age.oninput=draw;draw()}
/* ---------- 내원 · 상담 ---------- */
const FIRST=[['접수 · 문진','불편한 곳, 복용 약, 지난 치료를 여쭙니다.','10분'],['검진 · 촬영','필요한 경우에만 엑스레이 · CT를 찍습니다.','15분'],['화면 설명','사진을 함께 보며 상태와 선택지를 설명합니다.','15분'],['계획 · 비용','치료 순서 · 기간 · 비용을 적어 드리고 결정은 그 뒤에 합니다.','10분']];
function pageVisit(){$('#hl').innerHTML=C.hours.map(h=>`<dt>${h[0]}</dt><dd>${h[1]}</dd>`).join('');$('#addr').textContent=`${C.addr} · ${C.subway} · ${C.parking}`;
 $('#formw').innerHTML=FORM('cf1');bindForm($('#cf1'),$('#cf1 .msg'));
 const p=new URLSearchParams(location.search);if(p.get('c'))$('#cf1-c').value=p.get('c');if(p.get('m'))$('#cf1-m').value=p.get('m');
 $('#first').innerHTML=FIRST.map((f,i)=>`<div><em>${f[2]}</em><b>${i+1}. ${f[0]}</b><p>${f[1]}</p></div>`).join('');
 $('#fq').innerHTML=FAQ.map(f=>`<details class="q"><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}
({home:pageHome,treat:pageTreat,doctors:pageDoctors,equip:pageEquip,cost:pageCost,visit:pageVisit})[PG]?.();
