/* 우리아이치과(가상) — 아이 대상 소아 전문 치과 데모 데이터. 실존 치과 상호·문구·사진·실적 없음.
   rules/medical.md + edu: 아이 얼굴 사진 없음, 효과 보장·할인 없음, 진료별 주의사항, 건보는 공단 기준 확인 */
const K={name:'우리아이치과',tel:'02-000-0000',addr:'서울특별시 가람구 놀이터로 00, 3층 (가상 주소)',
 hours:[['월 · 화 · 목 · 금','10:00 – 19:00'],['수','10:00 – 20:00'],['토','09:30 – 15:00'],['점심시간','13:00 – 14:00'],['일 · 공휴일','휴진']],
 subway:'가람역(가상) 1번 출구 도보 4분',parking:'건물 주차 1시간 30분 · 유모차 승강기 있음 (예시)'};
const KIMG={
 kdoc1:['kids-doctor-1.webp','4:5','김다온 대표원장 프로필'],kdoc2:['kids-doctor-2.webp?v=20261025-female','4:5','오세린 원장 프로필'],
 klobby:['kids-lobby.webp','3:2','놀이 대기실'],kroom:['kids-room.webp','3:2','천장 그림이 있는 진료실'],
 kquiet:['kids-quiet-room.webp','4:3','조용한 진료실 (진정 치료)'],kxray:['kids-xray.webp','4:3','저선량 디지털 엑스레이'],
 kbrush:['kids-brushing.webp','4:3','양치 연습 공간'],kgift:['kids-sticker.webp','1:1','칭찬 스티커 벽']};
function kphoto(key,cls=''){const [f,r,alt]=KIMG[key];const [a,b]=r.split(':');return `<figure class="photo ${cls}" style="aspect-ratio:${a}/${b}"><img src="${window.IMGBASE}${f}" alt="${alt} (AI 생성 예시 이미지)" loading="lazy" onerror="this.remove()"><figcaption class="ph-label"><b>${alt}</b><span>${f} · ${r}</span></figcaption></figure>`}
const AGES=[['a0','0~2세','첫니가 나요'],['a3','3~5세','젖니가 다 났어요'],['a6','6~9세','이가 바뀌어요'],['a10','10~13세','영구치가 자리 잡아요'],['a14','14~18세','청소년이에요']];
const KSYM=[['pain','이가 아프다고 해요'],['dark','이가 까맣게 보여요'],['hurt','넘어져서 이를 다쳤어요'],['loose','흔들리는 이가 안 빠져요'],['crooked','새 이가 삐뚤게 나요'],['gum','잇몸이 부었어요'],['habit','손가락을 빨거나 이를 갈아요'],['check','아픈 곳은 없는데 검진하고 싶어요']];
const KT={
 check:{n:'정기 검진 · 불소',ico:'⭐',who:'김다온 · 오세린',dur:'20~30분, 3~6개월마다',steps:['인사하고 의자 타 보기','거울로 이 세어 보기','필요할 때만 엑스레이','불소 바르기 · 보호자 상담'],talk:'"이가 몇 개인지 같이 세어 볼까?"',ins:'영유아 구강검진(18~29 · 42~53 · 54~65개월)과 학생 구강검진은 국가 검진 기준에 따라. 불소 도포는 대부분 비급여',care:['불소를 바른 뒤 30분 동안은 먹고 마시지 않아요','엑스레이는 꼭 필요할 때만, 보호 앞치마를 입고 찍어요']},
 sealant:{n:'홈메우기 (실란트)',ico:'🛡️',who:'오세린',dur:'치아당 10~15분',steps:['어금니 닦기 · 말리기','홈에 약 바르기','빛으로 굳히기','잘 씹히는지 확인'],talk:'"어금니에 투명 코팅을 입혀 줄게."',ins:'만 18세 이하 충치 없는 큰어금니(제1 · 2대구치) 건강보험 적용',care:['홈메우기도 떨어질 수 있어 정기 검진 때 확인해요','홈메우기를 해도 양치는 꼭 해야 해요']},
 cavity:{n:'충치 치료',ico:'🦷',who:'김다온',dur:'1회 20~40분',steps:['물 · 바람으로 먼저 느껴 보기','필요하면 부분 마취','충치 부분 정리','레진이나 크라운으로 덮기'],talk:'"벌레 먹은 부분을 살살 닦아 낼 거야."',ins:'만 12세 이하 영구치 레진 건강보험 적용. 유치 레진 · 기성 크라운은 재료에 따라 비급여',care:['마취가 풀릴 때까지 입술 · 볼을 깨물지 않게 지켜봐 주세요','충치 깊이에 따라 신경치료로 이어질 수 있어요','아이 상태에 따라 치료를 여러 번 나눠 해요']},
 nerve:{n:'유치 신경치료',ico:'💜',who:'김다온',dur:'1~2회, 회당 30~40분',steps:['마취','염증 신경 정리','약 채우기','크라운으로 보호'],talk:'"아픈 신경을 쉬게 해 주는 치료야."',ins:'신경치료는 건강보험 적용, 이후 크라운은 재료에 따라 비급여',care:['치료 후 하루 이틀 씹을 때 불편할 수 있어요','붓기나 열이 생기면 바로 연락 주세요']},
 extract:{n:'젖니 빼기',ico:'🌱',who:'오세린',dur:'10~20분',steps:['흔들림 · 영구치 위치 확인','표면 마취','젖니 빼기','거즈 물고 쉬기'],talk:'"새 이에게 자리를 내어 줄 시간이야."',ins:'건강보험 적용',care:['거즈는 20~30분 물고 있어요','오늘은 빨대 · 뜨거운 음식은 피해요','영구치가 너무 늦게 나면 엑스레이로 확인해요']},
 trauma:{n:'다친 이 응급 진료',ico:'🚑',who:'김다온',dur:'바로 진료 · 경과 관찰',steps:['다친 상황 듣기','엑스레이로 뿌리 확인','깨진 부분 보호 · 고정','정기 경과 확인'],talk:'"많이 놀랐지? 천천히 보자."',ins:'진료 항목에 따라 건강보험 또는 비급여',care:['빠진 영구치는 우유나 생리식염수에 담가 30분 안에 오세요','머리를 부딪쳐 토하거나 의식이 흐리면 응급실로 먼저 가세요','다친 이는 몇 달 뒤 색이 변할 수 있어 경과를 봐요']},
 ortho:{n:'성장기 교정 상담',ico:'🌈',who:'오세린',dur:'상담 30분 · 6개월마다 확인',steps:['얼굴 · 턱 성장 확인','필요한 촬영','지켜볼지 치료할지 설명','시기에 맞춰 다시 보기'],talk:'"이가 나오는 길을 같이 살펴볼게."',ins:'대부분 비급여. 상담에서 시기 · 방법 · 비용을 먼저 안내',care:['모든 아이가 일찍 교정이 필요한 것은 아니에요','장치를 쓰면 양치 · 충치 관리가 더 필요해요']},
 habit:{n:'습관 상담 (손가락 · 이갈이)',ico:'🧸',who:'김다온',dur:'상담 20~30분',steps:['언제 · 얼마나 하는지 듣기','이 · 턱 상태 확인','집에서 해 볼 방법 안내','필요할 때 장치 상담'],talk:'"손가락이 쉬고 싶대. 같이 도와줄까?"',ins:'상담 · 검사 항목에 따라 건강보험 또는 비급여',care:['혼내기보다 칭찬으로 줄여 가는 게 좋아요','이갈이는 성장하며 줄어드는 경우가 많아 지켜보기도 해요']}};
function kguide(age,sym){let t=[];const add=(...k)=>k.forEach(x=>{if(!t.includes(x))t.push(x)});
 ({pain:()=>add('cavity','nerve'),dark:()=>add('cavity','check'),hurt:()=>add('trauma'),loose:()=>add('extract'),crooked:()=>add('ortho','check'),gum:()=>add('nerve','check'),habit:()=>add('habit'),check:()=>add('check','sealant')})[sym]();
 if(age==='a6'||age==='a10'){if(sym==='check')add('sealant');}
 if(age==='a0'&&sym==='crooked'){t=['check'];}
 const urgent=sym==='hurt'||sym==='gum';
 const tip={a0:'첫니가 나면 거즈나 실리콘 칫솔로 하루 두 번 닦아 주세요.',a3:'보호자가 마무리 양치를 해 주세요. 치실도 시작할 때예요.',a6:'처음 나온 큰어금니(6세 구치)는 충치가 잘 생겨 홈메우기를 상담해 보세요.',a10:'혼자 양치를 하더라도 일주일에 몇 번은 보호자가 확인해 주세요.',a14:'단 음료 · 교정 장치 관리가 충치의 큰 원인이에요.'}[age];
 return {list:t.slice(0,3),urgent,tip}}
const BYAGE=[
 {a:'0~2세',t:'첫니가 나요',see:['첫니가 나는 시기 · 순서','젖병 · 밤중 수유 습관'],do:['첫 치과 방문은 첫니가 나고 돌 무렵','영유아 구강검진 1차(18~29개월)'],home:'거즈 · 실리콘 칫솔로 하루 두 번, 불소 치약은 쌀알만큼'},
 {a:'3~5세',t:'젖니가 다 났어요',see:['어금니 사이 충치','손가락 빨기 · 공갈 젖꼭지 습관'],do:['3~6개월마다 검진 · 불소','영유아 구강검진 2 · 3차(42~53 · 54~65개월)'],home:'보호자 마무리 양치, 어금니 사이 치실'},
 {a:'6~9세',t:'이가 바뀌어요',see:['첫 영구 어금니(6세 구치)','흔들리는 젖니 · 늦게 나는 영구치'],do:['큰어금니 홈메우기','앞니 배열 · 턱 성장 확인'],home:'새 어금니는 키가 낮아 칫솔을 옆으로 넣어 닦아요'},
 {a:'10~13세',t:'영구치가 자리 잡아요',see:['두 번째 큰어금니','덧니 · 교정 시기'],do:['두 번째 큰어금니 홈메우기','성장기 교정 상담'],home:'혼자 양치 + 주 몇 번 보호자 확인'},
 {a:'14~18세',t:'청소년이에요',see:['단 음료 · 간식 충치','교정 장치 주변 관리'],do:['6개월마다 검진 · 스케일링 상담','운동할 때 마우스가드 상담'],home:'잠들기 전 양치 · 치실 습관'}];
const FIRSTDAY=[['집에서 미리','치과 그림책을 같이 보고 "이를 세어 주는 곳"이라고 알려 주세요. "주사", "아파" 같은 말은 피해요.'],['도착','놀이 대기실에서 10분쯤 놀며 공간과 친해져요. 첫날은 진료보다 인사가 먼저예요.'],['말하고 · 보여 주고 · 해 보기','기구를 먼저 보여 주고 손톱에 바람을 불어 본 뒤 입안에 해요.'],['칭찬 스티커','끝나면 스티커 벽에서 하나를 골라요. 잘 못해도 "와 준 것"을 칭찬해요.']];
const SEDATE=[['웃음가스 (아산화질소)','코에 마스크를 대고 숨을 쉬면 긴장이 풀리는 방법이에요. 의식은 깨어 있어요.'],['진정 치료','치료가 길거나 아이가 많이 무서워할 때 보호자와 충분히 상담하고 동의를 받은 뒤 진행해요.'],['주의사항','치료 전 금식 시간, 감기 · 복용 약을 꼭 알려 주세요. 치료 후에는 충분히 쉬게 해요.']];
const KDOCS=[{id:'kdoc1',n:'김다온',r:'대표원장',sp:'소아치과 전문의 (예시)',area:'충치 · 신경치료 · 다친 이 · 습관 상담',line:'아이가 "괜찮아"라고 말할 때까지 기다리는 진료를 합니다.',cv:['소아치과 수련 (예시)','대한소아치과학회 정회원 (예시)']},
 {id:'kdoc2',n:'오세린',r:'원장',sp:'소아치과 전문의 (예시)',area:'홈메우기 · 젖니 빼기 · 성장기 교정 상담',line:'보호자가 집에서 할 수 있는 일을 꼭 함께 알려 드립니다.',cv:['소아치과 수련 (예시)','대한소아치과학회 정회원 (예시)']}];
const KFEES=[['불소 도포','00,000원'],['유치 레진 (1개 면)','00,000원'],['유치 기성 크라운','000,000원'],['웃음가스 (1회)','00,000원'],['성장기 교정 장치 (예시)','0,000,000원']];
const KFAQ=[['몇 살에 처음 가면 좋을까요?','첫니가 나고 돌 무렵 한 번, 그 뒤로는 3~6개월마다 검진을 권해요. 아픈 곳이 없을 때 오면 치과와 친해지기 쉬워요.'],['아이가 너무 울면 어떡하나요?','첫날은 인사와 검진만 하고 치료는 다음에 해도 괜찮아요. 아이 상태에 따라 웃음가스나 진정 치료를 상담할 수 있어요.'],['보호자가 진료실에 같이 들어가도 되나요?','네. 아이가 원하면 보호자 의자에 앉아 손을 잡아 주세요. 상황에 따라 잠시 밖에서 기다려 달라고 부탁드릴 수 있어요.'],['젖니는 어차피 빠지는데 치료해야 하나요?','젖니는 영구치가 나올 자리를 지키고 씹기 · 발음에도 중요해요. 충치를 두면 영구치에도 영향을 줄 수 있어요.']];
function kform(id){return `<form class="cf" id="${id}" novalidate>
 <div class="r"><label for="${id}-n">보호자 이름 <em>*</em></label><input id="${id}-n" autocomplete="name" required></div>
 <div class="r"><label for="${id}-t">연락처 <em>*</em></label><input id="${id}-t" type="tel" autocomplete="tel" placeholder="010-0000-0000" required></div>
 <div class="r2"><div class="r"><label for="${id}-a">아이 나이 <em>*</em></label><select id="${id}-a" required><option value="">선택</option>${AGES.map(a=>`<option>${a[1]}</option>`).join('')}</select></div>
 <div class="r"><label for="${id}-c">상담 진료</label><select id="${id}-c"><option>잘 모르겠어요</option>${Object.values(KT).map(t=>`<option>${t.n}</option>`).join('')}</select></div></div>
 <div class="r"><span class="lb">우리 아이는요 (선택)</span><div class="pills"><label><input type="checkbox"> 치과가 처음이에요</label><label><input type="checkbox"> 치과를 무서워해요</label><label><input type="checkbox"> 낮잠 시간이 있어요</label></div></div>
 <div class="r"><label for="${id}-m">더 알려 주실 점 (선택)</label><textarea id="${id}-m" rows="3" placeholder="예) 오른쪽 아래 어금니가 까맣게 보여요"></textarea></div>
 <div class="agree"><label><input type="checkbox" required> [필수] 개인정보 수집 · 이용 동의 — 보호자 연락처와 아이 나이 · 상담 진료를 상담 연락에만 쓰고 상담 후 3개월 뒤 지웁니다. 만 14세 미만 아이의 정보는 법정대리인(보호자)이 입력하고 동의합니다.</label><label><input type="checkbox"> [선택] 검진 알림 문자 받기</label></div>
 <p class="msg" role="status"></p><button type="submit">상담 신청하기</button></form>`}
function kbind(f){const m=f.querySelector('.msg');f.onsubmit=e=>{e.preventDefault();const miss=[...f.querySelectorAll('[required]')].find(x=>x.type==='checkbox'?!x.checked:!x.value.trim());
 if(miss){m.className='msg no';m.textContent=miss.type==='checkbox'?'개인정보 수집 · 이용(필수)에 동의해 주세요.':`${f.querySelector(`label[for="${miss.id}"]`).textContent.replace('*','').trim()} 항목을 입력해 주세요.`;miss.focus();return}
 const tel=f.querySelector('input[type=tel]');if(!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(tel.value.trim())){m.className='msg no';m.textContent='연락처 형식을 확인해 주세요.';tel.focus();return}
 m.className='msg ok';m.textContent='고마워요! 입력 내용을 확인했어요. 가상 업체 데모라 실제로 접수되지는 않아요.'}}

/* ---------- 우리아이치과: 레이아웃 · 페이지 ---------- */
const $=s=>document.querySelector(s);
const R=document.body.dataset.root||'./',PG=document.body.dataset.page;
window.IMGBASE=R+'../images/';
const NAV=[['age','나이별 진료'],['first','처음 오는 날'],['treat','진료 안내'],['team','선생님 · 공간'],['care','비용 · 상담']];
const href=(id,h='')=>(id==='home'?R:`${R}${id}/`)+h;
/* 이 캐릭터 '콩콩이' (원본 일러스트, 사람 얼굴 아님) */
function mascot(mood='smile',c='#fff'){const face=mood==='wow'?'<ellipse cx="50" cy="66" rx="5" ry="6" fill="#2a2f63"/>':mood==='wink'?'<path d="M42 64q8 7 16 0" stroke="#2a2f63" stroke-width="3" fill="none" stroke-linecap="round"/>':'<path d="M41 63q9 9 18 0" stroke="#2a2f63" stroke-width="3" fill="none" stroke-linecap="round"/>';
 const eyeR=mood==='wink'?'<path d="M58 50q4-4 8 0" stroke="#2a2f63" stroke-width="3" fill="none" stroke-linecap="round"/>':'<circle cx="62" cy="51" r="3.6" fill="#2a2f63"/>';
 return `<svg class="mascot" viewBox="0 0 100 110" aria-hidden="true"><path d="M28 14c-12 0-20 9-20 22 0 16 8 22 11 40 2 14 6 22 11 22 7 0 6-20 20-20s13 20 20 20c5 0 9-8 11-22 3-18 11-24 11-40 0-13-8-22-20-22-9 0-14 5-22 5S37 14 28 14Z" fill="${c}" stroke="#2a2f63" stroke-width="3"/><circle cx="38" cy="51" r="3.6" fill="#2a2f63"/>${eyeR}<ellipse cx="30" cy="62" rx="6" ry="4" fill="#ffb8c8" opacity=".8"/><ellipse cx="70" cy="62" rx="6" ry="4" fill="#ffb8c8" opacity=".8"/>${face}<path d="M30 26q6-6 12-2" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/></svg>`}
const ico={tel:'<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',chat:'<path d="M4 5h16v11H8l-4 4Z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',pin:'<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>'};
const svg=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ico[k]}</svg>`;
const star=(c='var(--lm)')=>`<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.6 6.3 6.8.6-5.2 4.4 1.6 6.7L12 16.5 6.2 20l1.6-6.7L2.6 8.9l6.8-.6Z" fill="${c}"/></svg>`;
document.body.insertAdjacentHTML('afterbegin',`<div class="demo"><b>가상 업체 데모 · 우리아이치과</b> — 실제 치과가 아니에요. 선생님 · 비용 · 연락처는 예시, 사진은 AI 생성 예시예요.</div>
<header><div class="wrap"><a class="logo" href="${href('home')}">${mascot('smile','#fff')}<span>우리아이치과<small>아이 전문 치과</small></span></a>
<nav class="top" aria-label="주메뉴">${NAV.map(([i,n])=>`<a href="${href(i)}" ${PG===i?'aria-current="page"':''}>${n}</a>`).join('')}</nav>
<div class="hr"><a class="cta" href="${href('care','#consult')}">상담 신청</a><button class="burger" id="burger" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button></div></div></header>
<div class="drawer" id="drawer"><div class="in"><button class="x" id="dx" aria-label="메뉴 닫기">✕</button><a href="${href('home')}">처음으로</a>${NAV.map(([i,n])=>`<a href="${href(i)}" ${PG===i?'aria-current="page"':''}>${n}</a>`).join('')}<div class="dm">${mascot('wink','var(--li-l)')}</div></div></div>`);
document.body.insertAdjacentHTML('beforeend',`<div class="wave" aria-hidden="true"></div><footer><div class="wrap"><div class="fm">${mascot('wink','#fff')}</div><div><b>우리아이치과</b> · ${K.addr} · ${K.tel} · 대표원장 김다온(예시)<br>비급여 진료비는 <a href="${href('care','#cost')}">비용 · 상담</a> 페이지와 원내에 게시해요 · 가상 업체 데모 · 의료광고 심의 대상 여부는 실제 납품 시 확인</div></div></footer>
<nav class="dock" aria-label="바로가기"><a href="tel:020000000">${svg('tel')}전화</a><a class="p" href="${href('care','#consult')}">${svg('chat')}상담 신청</a><a href="${href('care','#hours')}">${svg('clock')}진료시간</a><a href="${href('care','#mapc')}">${svg('pin')}오시는 길</a></nav>`);
const dr=$('#drawer'),bg=$('#burger');bg.onclick=()=>{dr.classList.add('open');bg.setAttribute('aria-expanded','true')};
const cl=()=>{dr.classList.remove('open');bg.setAttribute('aria-expanded','false')};dr.onclick=e=>{if(e.target===dr||e.target.id==='dx')cl()};document.addEventListener('keydown',e=>{if(e.key==='Escape')cl()});
const nb=(t,id,h,l)=>`<div class="next">${mascot('smile','#fff')}<b>${t}</b><a href="${href(id,h||'')}">${l} →</a></div>`;
const tcard=(k,t)=>`<a class="rc" href="${href('treat','#t-'+k)}"><b>${t.n}</b><span>${t.who} 원장님 · ${t.dur}</span><em>${t.talk}</em></a>`;
/* ---------- 홈 ---------- */
function pageHome(){const st={age:'a3',s:'dark'};
 $('#hm').innerHTML=mascot('wink','#fff');
 $('#ages').innerHTML=AGES.map(a=>`<button type="button" data-v="${a[0]}"><b>${a[1]}</b><small>${a[2]}</small></button>`).join('');
 $('#syms').innerHTML=KSYM.map(s=>`<button type="button" data-v="${s[0]}">${s[1]}</button>`).join('');
 $('#ages').onclick=e=>{const b=e.target.closest('button');if(b){st.age=b.dataset.v;render()}};
 $('#syms').onclick=e=>{const b=e.target.closest('button');if(b){st.s=b.dataset.v;render()}};
 function render(){document.querySelectorAll('#ages button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===st.age));document.querySelectorAll('#syms button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===st.s));
  const g=kguide(st.age,st.s),al=AGES.find(a=>a[0]===st.age)[1],sl=KSYM.find(s=>s[0]===st.s)[1];
  $('#res').innerHTML=`<div class="cards">${g.list.map(k=>tcard(k,KT[k])).join('')}</div><div class="tip">${mascot('smile','var(--lm)')}<p><b>${al} 보호자 팁</b>${g.tip}</p></div>${g.urgent?`<div class="warn">${st.s==='hurt'?'다친 이는 오늘 바로 전화 주세요. 빠진 영구치는 우유에 담가 30분 안에 오세요. 머리를 부딪쳐 토하거나 처지면 응급실로 먼저 가세요.':'붓고 열이 나면 오늘 전화 주세요. 얼굴이 크게 붓거나 아이가 처지면 응급실로 가세요.'}</div>`:''}<div class="act"><a class="btn p" href="${href('care','?a='+encodeURIComponent(al)+'&c='+encodeURIComponent(KT[g.list[0]].n)+'&m='+encodeURIComponent(sl)+'#consult')}">이 내용으로 상담 신청</a><a class="btn l" href="tel:020000000">전화하기</a></div><p class="tiny">진단이 아닌 상담 준비용 안내예요.</p>`}
 render();
 $('#hfirst').innerHTML=FIRSTDAY.map((f,i)=>`<li><i>${i+1}</i><b>${f[0]}</b><p>${f[1]}</p></li>`).join('');
 $('#hdocs').innerHTML=KDOCS.map(d=>`<a class="hd" href="${href('team','#'+d.id)}">${kphoto(d.id)}<b>${d.n} ${d.r}</b><span>${d.sp}</span></a>`).join('');
 $('#hhours').innerHTML=K.hours.map(h=>`<div><dt>${h[0]}</dt><dd>${h[1]}</dd></div>`).join('');
 $('#hlobby').innerHTML=kphoto('klobby','blobp');
}
/* ---------- 나이별 ---------- */
function pageAge(){$('#tl').innerHTML=BYAGE.map((b,i)=>`<article class="ag" style="--c:${['#ffe3ec','#fff3b8','#e2f5ea','#e5e0ff','#dcefff'][i]}"><div class="ah"><span>${b.a}</span><h2>${b.t}</h2></div><div><h4>이걸 살펴봐요</h4><ul>${b.see.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h4>치과에서는</h4><ul>${b.do.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="home">${star()}<h4>집에서는</h4><p>${b.home}</p></div></article>`).join('')}
/* ---------- 처음 오는 날 ---------- */
function pageFirst(){$('#fd').innerHTML=FIRSTDAY.map((f,i)=>`<li><i>${i+1}</i><div><b>${f[0]}</b><p>${f[1]}</p></div></li>`).join('');
 $('#sed').innerHTML=SEDATE.map(s=>`<div class="box"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('');
 $('#fphotos').innerHTML=kphoto('kroom')+kphoto('kgift');
 const list=['아이가 좋아하는 인형이나 장난감 하나','복용 중인 약 · 알레르기 메모','영유아 검진 결과지가 있다면 함께','진료 30분 전에는 배불리 먹지 않기'];
 $('#ck').innerHTML=list.map((l,i)=>`<label><input type="checkbox" id="ck${i}"> ${l}</label>`).join('');
 const upd=()=>{const n=[...document.querySelectorAll('#ck input')].filter(x=>x.checked).length;$('#ckn').textContent=n===list.length?'준비 끝! 내일 만나요.':`${list.length-n}개 남았어요`};$('#ck').onchange=upd;upd()}
/* ---------- 진료 안내 ---------- */
function pageTreat(){$('#tg').innerHTML=Object.entries(KT).map(([k,t],i)=>`<article class="tc" id="t-${k}" style="--c:${['#ffe3ec','#fff3b8','#e2f5ea','#e5e0ff','#dcefff','#ffe7d6','#e2f5ea','#fff3b8'][i]}"><div class="th"><h2>${t.n}</h2><span>${t.who} 원장님 · ${t.dur}</span></div><p class="talk">${mascot('smile','#fff')}<span>아이에게 이렇게 말해요<b>${t.talk}</b></span></p><div class="tb"><div><h4>진료 순서</h4><ol>${t.steps.map(s=>`<li>${s}</li>`).join('')}</ol></div><div><h4>주의사항 · 부작용</h4><ul>${t.care.map(c=>`<li>${c}</li>`).join('')}</ul></div></div><p class="ins">${t.ins}</p><a class="mini" href="${href('care','?c='+encodeURIComponent(t.n)+'#consult')}">이 진료 상담 신청 →</a></article>`).join('');
 if(location.hash){const el=document.querySelector(location.hash);if(el){el.classList.add('hl');setTimeout(()=>el.scrollIntoView({block:'start'}),60)}}}
/* ---------- 선생님 · 공간 ---------- */
function pageTeam(){$('#dl').innerHTML=KDOCS.map(d=>`<article class="dp" id="${d.id}">${kphoto(d.id)}<div><span class="sp">${d.sp}</span><h2>${d.n} <small>${d.r}</small></h2><p class="line">“${d.line}”</p><p><b>이런 진료를 해요</b> · ${d.area}</p><ul>${d.cv.map(c=>`<li>${c}</li>`).join('')}</ul></div></article>`).join('');
 const SP=[['klobby','놀이 대기실','진료 전 10분, 그림책과 블록으로 공간과 친해져요.'],['kroom','천장 그림 진료실','누워서 천장 그림을 보며 진료를 받아요.'],['kquiet','조용한 진료실','소리에 예민한 아이와 진정 치료를 위한 방이에요.'],['kxray','저선량 디지털 엑스레이','꼭 필요할 때만, 보호 앞치마를 입고 짧게 찍어요.'],['kbrush','양치 연습 공간','작은 세면대에서 보호자와 함께 양치 방법을 연습해요.'],['kgift','칭찬 스티커 벽','진료가 끝나면 스티커를 하나 골라요.']];
 $('#sp').innerHTML=SP.map(s=>`<div class="sc">${kphoto(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('')}
/* ---------- 비용 · 상담 ---------- */
function pageCare(){$('#fees').innerHTML=KFEES.map(f=>`<tr><td>${f[0]}</td><td class="n">${f[1]} (예시)</td></tr>`).join('');
 $('#hl').innerHTML=K.hours.map(h=>`<dt>${h[0]}</dt><dd>${h[1]}</dd>`).join('');$('#addr').textContent=`${K.addr} · ${K.subway} · ${K.parking}`;
 $('#formw').innerHTML=kform('kf');kbind($('#kf'));const p=new URLSearchParams(location.search);if(p.get('a'))$('#kf-a').value=p.get('a');if(p.get('c'))$('#kf-c').value=p.get('c');if(p.get('m'))$('#kf-m').value=p.get('m');
 $('#fq').innerHTML=KFAQ.map(f=>`<details class="q"><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}
({home:pageHome,age:pageAge,first:pageFirst,treat:pageTreat,team:pageTeam,care:pageCare})[PG]?.();
