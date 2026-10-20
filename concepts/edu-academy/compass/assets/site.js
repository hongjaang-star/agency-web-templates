/* 오름길 학원(가상) 공통 데이터와 로드맵 진단 — 실존 학원의 상호·문구·실적을 쓰지 않는다.
   rules/edu.md: 교습비는 예시, 합격·성적 실적 없음, 선행학습 광고 없음 */
const A={name:'오름길 학원',en:'ORUMGIL',sub:'중·고등 수학 · 영어',tel:'031-000-0000',
 addr:'경기도 가람시 학원로 00, 3층 (가상 주소)',reg:'가람교육지원청 등록 제0000-00호 (예시)',
 hours:'평일 14:00~22:00 · 토 10:00~18:00',hoursNote:'교습 시간은 시·도 조례 범위 안에서 운영합니다.'};
const GRADES=[['m1','중1'],['m2','중2'],['m3','중3'],['h1','고1'],['h2','고2'],['h3','고3']];
const LEVELS=[['base','기초부터 다시','지난 학년 개념에서 자주 막혀요'],['track','학교 진도 맞춤','진도는 따라가는데 시험에서 실수가 많아요'],['deep','심화 · 고난도','기본은 되는데 어려운 문제에서 멈춰요']];
const GOALS=[['naesin','학교 내신','다음 정기고사 점수가 먼저예요'],['suneung','수능 · 모의고사','수능형 문제에 익숙해지고 싶어요'],['path','과목 선택 · 진로','고교학점제 과목 선택이 고민이에요']];
const CLASSES=[
 {id:'mb',part:'중등',subj:'수학',name:'중등 수학 · 개념다짐반',hrs:'주 2회 · 회당 2시간 30분',fit:'계산은 되는데 개념 설명이 어려운 학생'},
 {id:'mt',part:'중등',subj:'수학',name:'중등 수학 · 학교별 내신반',hrs:'주 2회 · 회당 2시간 30분',fit:'학교 진도에 맞춰 서술형까지 준비할 학생'},
 {id:'md',part:'중등',subj:'수학',name:'중등 수학 · 사고력 심화반',hrs:'주 2회 · 회당 3시간',fit:'고난도 문항 풀이 과정을 말로 설명해 볼 학생'},
 {id:'me',part:'중등',subj:'영어',name:'중등 영어 · 문법·독해반',hrs:'주 2회 · 회당 2시간',fit:'교과서 본문 이해와 문법 서술형이 필요한 학생'},
 {id:'hb',part:'고등',subj:'수학',name:'고등 수학 · 개념회복반',hrs:'주 2회 · 회당 3시간',fit:'공통수학 개념 빈칸을 먼저 채워야 할 학생'},
 {id:'ht',part:'고등',subj:'수학',name:'고등 수학 · 내신집중반',hrs:'주 2회 · 회당 3시간',fit:'학교별 기출 유형과 수행평가를 함께 챙길 학생'},
 {id:'hs',part:'고등',subj:'수학',name:'고등 수학 · 수능실전반',hrs:'주 2회 · 회당 3시간 + 모의 1회/월',fit:'수능형 문항 시간 관리가 필요한 학생'},
 {id:'he',part:'고등',subj:'영어',name:'고등 영어 · 내신·수능반',hrs:'주 2회 · 회당 2시간 30분',fit:'교과서·부교재와 수능 독해를 함께 할 학생'}];
const SYSTEM=[
 ['개념 수업','이번 주 단원의 개념을 판서와 질문으로 정리합니다. 학생이 직접 설명해 보는 3분을 꼭 둡니다.'],
 ['클리닉','수업 다음 날 30분, 질문과 오답만 다룹니다. 틀린 이유를 계산 · 개념 · 해석으로 나눠 기록합니다.'],
 ['주간 테스트','단원별 20문항 내외. 점수보다 오답 유형이 지난주와 어떻게 달라졌는지 봅니다.'],
 ['보호자 리포트','매주 금요일, 출결 · 과제 · 테스트 오답 유형 · 다음 주 계획을 문자로 보냅니다.']];
const TEACHERS=[
 ['서지안','고등 수학','교과서와 학교별 기출을 단원마다 다시 분류해 수업 자료를 학기마다 새로 만듭니다.'],
 ['문태하','중등 수학','풀이를 말로 설명하게 하는 수업. 서술형 채점 기준을 학생과 함께 읽습니다.'],
 ['이로운','고등 영어','교과서 · 부교재 본문을 구조로 읽는 법과 수능 독해 시간 관리를 함께 가르칩니다.'],
 ['한나래','중등 영어','문법을 문장 만들기로 익히는 수업. 매주 본문 요약 한 문단을 씁니다.'],
 ['원장 상담','진로 · 과목 선택','고교학점제 과목 선택과 학생부 기록에 대한 학기별 상담을 맡습니다.']];
const FEES=[['중등 수학 (전 반)','주 2회 · 월 8회','20시간','000,000원'],['중등 영어','주 2회 · 월 8회','16시간','000,000원'],['고등 수학 (개념회복 · 내신집중)','주 2회 · 월 8회','24시간','000,000원'],['고등 수학 수능실전','주 2회 + 월 1회 모의','26시간','000,000원'],['고등 영어','주 2회 · 월 8회','20시간','000,000원']];
const NEWS=[['설명회','고1 · 고2 과목 선택과 2학기 기말 대비 설명회','11.07 (토) 11:00 (예시)'],['진단','반 배정 참고용 진단 테스트 상시 예약','평일 16:00 · 19:00 (예시)'],['상담','중3 고교학점제 과목 탐색 상담 주간','11.16 ~ 11.21 (예시)'],['안내','정기고사 3주 전부터 학교별 클리닉 추가 운영','시험 일정 공지 후']];
const FAQ=[
 ['진단 테스트는 어떻게 보나요?','30~40분 동안 지금 학년 개념 문항을 풉니다. 결과는 반 배정과 상담 참고용이며 합격 · 불합격으로 나누지 않습니다.'],
 ['한 반에 몇 명인가요?','최대 8명(예시)으로 운영합니다. 클리닉은 1:1 또는 2~3명 단위입니다.'],
 ['다른 학교 학생도 같은 반에서 내신을 준비하나요?','시험 3주 전부터는 학교별로 나눠 해당 학교 범위와 기출 유형으로 클리닉을 따로 엽니다.'],
 ['수업을 빠지면 어떻게 되나요?','녹화 대신 클리닉 시간에 빠진 부분을 보충합니다. 보충 일정은 보호자에게 문자로 안내합니다.'],
 ['교습비는 어디서 확인하나요?','아래 교습비 표와 학원 내 게시물로 확인할 수 있습니다. 교재비는 별도이며 반환 기준은 학원법을 따릅니다.']];

function roadmap(g,l,goal){
 const mid=g[0]==='m',gl=GRADES.find(x=>x[0]===g)[1];
 let cls;
 if(mid) cls=[CLASSES.find(c=>c.id===({base:'mb',track:'mt',deep:'md'})[l]),CLASSES.find(c=>c.id==='me')];
 else cls=[CLASSES.find(c=>c.id===(goal==='suneung'||g==='h3'?'hs':({base:'hb',track:'ht',deep:'ht'})[l])),CLASSES.find(c=>c.id==='he')];
 const S={
  base:['지금 막히는 단원을 찾아 개념 빈칸부터 채웁니다','클리닉에서 계산 · 개념 오답을 나눠 줄여 갑니다','학기 말에는 이번 학년 핵심 단원을 다시 묶어 정리합니다'],
  track:['학교 진도에 맞춰 개념과 교과서 문제를 정리합니다','시험 3주 전부터 학교별 기출 유형과 서술형을 연습합니다','시험 뒤 오답 유형을 정리해 다음 시험 계획을 세웁니다'],
  deep:['단원마다 고난도 문항 풀이 과정을 말로 설명합니다','여러 단원이 섞인 문항으로 연결하는 힘을 기릅니다','풀이를 글로 정리해 서술형 · 논리 표현까지 다듬습니다']}[l].slice();
 if(goal==='suneung'&&!mid) S[1]='모의고사 문항으로 시간 배분과 문항 선택 순서를 연습합니다';
 if(goal==='path') S[2]=mid?'중3 2학기에 고교학점제 과목 탐색 상담을 함께 합니다':'관심 진로에 맞는 과목 선택과 학생부 기록 방향을 상담합니다';
 if(g==='h3') S.splice(0,3,'수능까지 남은 기간을 단원별 점검 주기로 나눕니다','주 1회 실전 모의로 시간 관리와 실수 유형을 점검합니다','시험 직전 2주는 오답 노트 중심으로 마무리합니다');
 const memo=`[오름길 학원 상담 메모]\n학년: ${gl}\n지금 상태: ${LEVELS.find(x=>x[0]===l)[1]}\n목표: ${GOALS.find(x=>x[0]===goal)[1]}\n추천 반: ${cls.map(c=>c.name).join(', ')}\n통화 희망 시간: `;
 return {gl,cls,steps:S,memo}}
function copyText(t,btn){const done=()=>{const o=btn.textContent;btn.textContent='복사했어요';setTimeout(()=>btn.textContent=o,1600)};try{navigator.clipboard.writeText(t).then(done,()=>prompt('복사해 주세요',t))}catch(e){prompt('복사해 주세요',t)}}

/* ---------- 다중 페이지 레이아웃 · 페이지별 렌더 ---------- */
const $=s=>document.querySelector(s);
const R=document.body.dataset.root||'./',PG=document.body.dataset.page;
const NAV=[['system','수업 방식'],['classes','반 안내'],['teachers','선생님'],['fees','교습비'],['notice','공지사항'],['news','설명회 · 소식']];
const href=id=>id==='home'?R:`${R}${id}/`;
document.body.insertAdjacentHTML('afterbegin',`<div class="demo"><b>가상 업체 데모 · 오름길 학원</b> — 실제 학원이 아닙니다. 교습비 · 연락처 · 등록번호 · 강사는 예시입니다.</div>
<header><a class="logo" href="${R}"><i aria-hidden="true"></i><span>오름길 학원<br><small>MIDDLE · HIGH · MATH · ENGLISH</small></span></a>
<nav aria-label="주메뉴">${NAV.map(([i,n])=>`<a href="${href(i)}" ${PG===i?'aria-current="page"':''}>${n}</a>`).join('')}</nav>
<a class="call" href="${R}#check">로드맵 진단</a><button class="burger" id="burger" aria-label="메뉴 열기" aria-expanded="false">☰</button></header>
<div class="drawer" id="drawer"><div class="in"><button class="x" id="dx" aria-label="메뉴 닫기">✕</button><a href="${R}" ${PG==='home'?'aria-current="page"':''}>처음으로 · 로드맵 진단</a>${NAV.map(([i,n])=>`<a href="${href(i)}" ${PG===i?'aria-current="page"':''}>${n}</a>`).join('')}<a href="tel:0310000000">전화 상담 031-000-0000</a></div></div>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div><b>오름길 학원</b> · ${A.addr} · ${A.tel}<br>${A.reg} · 교습과목: 수학, 영어(보습) · ${A.hours}<br>${A.hoursNote} 교습비 등은 <a href="${href('fees')}">교습비 페이지</a>에 게시합니다.</div><div>가상 업체 데모 · Compass</div></footer>
<div class="mcta"><a href="tel:0310000000">전화 상담</a><a href="${R}#check">로드맵 진단</a></div>`);
const dr=$('#drawer'),bg=$('#burger');
bg.onclick=()=>{dr.classList.add('open');bg.setAttribute('aria-expanded','true');dr.querySelector('a').focus()};
const close=()=>{dr.classList.remove('open');bg.setAttribute('aria-expanded','false')};
dr.onclick=e=>{if(e.target===dr||e.target.id==='dx')close()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dr.classList.contains('open')){close();bg.focus()}});
const nextBox=(t,id)=>`<div class="next"><b>${t}</b><a href="${href(id)}">${NAV.find(n=>n[0]===id)?.[1]||'처음으로'} 보기 →</a></div>`;

/* ---------- 홈 ---------- */
function pageHome(){
 const st={g:'h1',l:'track',o:'naesin'};
 const opts=(el,arr,key,small)=>{el.innerHTML=arr.map(a=>`<button type="button" data-v="${a[0]}" aria-pressed="${st[key]===a[0]}">${a[1]}${small&&a[2]?`<small>${a[2]}</small>`:''}</button>`).join('');
  el.onclick=e=>{const b=e.target.closest('button');if(!b)return;st[key]=b.dataset.v;el.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));render()}};
 opts($('#og'),GRADES,'g');opts($('#ol'),LEVELS,'l',1);opts($('#oo'),GOALS,'o',1);
 function render(){const r=roadmap(st.g,st.l,st.o);
  $('#res').innerHTML=`<div class="fade"><div class="h"><b>${r.gl} · 이번 학기 로드맵</b><span>ROUTE</span></div><div class="cls">${r.cls.map(c=>`<span>${c.name}</span>`).join('')}</div><ol>${r.steps.map(s=>`<li>${s}</li>`).join('')}</ol><div class="act"><button class="btn p" id="cp">상담 메모 복사</button><a class="btn l" href="${href('classes')}#${r.cls[0].id}">추천 반 자세히</a></div></div>`;
  $('#cp').onclick=e=>copyText(r.memo,e.target)}
 render();
 $('#hsys').innerHTML=SYSTEM.map((s,i)=>`<div><span>STEP ${String(i+1).padStart(2,'0')}</span><b>${s[0]}</b><p>${s[1]}</p></div>`).join('');
 $('#hnews').innerHTML=NEWS.slice(0,3).map(n=>`<div><em>${n[0]}</em><b style="font-weight:600">${n[1]}</b><time>${n[2]}</time></div>`).join('');
}
/* ---------- 수업 방식 ---------- */
const WEEK=['','월','화','수','목','금','토'],TT=[['16:00','중등 수학','클리닉','중등 수학','클리닉','중등 영어','고등 수학 모의'],['18:00','중등 영어','중등 수학','중등 영어','중등 수학','테스트','클리닉'],['19:30','고등 수학','고등 영어','고등 수학','고등 영어','클리닉','—']];
const EXAM=[['D-21','범위 정리','학교별 시험 범위를 받아 교과서 · 부교재 · 학습지 단원을 표로 정리합니다.'],['D-14','유형 · 서술형','학교별 기출 유형을 나눠 풀고 서술형 채점 기준으로 답안을 고칩니다.'],['D-7','실전 시험지','학교 시험 형식과 시간에 맞춘 시험지 2회, 오답은 당일 클리닉에서 정리합니다.'],['D-1','짧은 점검','개념 확인 문항 10개와 오답 노트만 봅니다. 늦게까지 남기지 않습니다.']];
const REPORT={who:'고1 김○○ (예시)',week:'10월 2주',att:'2 / 2회',hw:'3 / 3개',test:'단원 테스트 · 이차방정식',err:[['계산',2,25],['개념',1,12],['해석',3,38]],next:'문제 조건을 식으로 옮기는 연습 (해석 오답) · 클리닉 화 18:00',memo:'근의 공식은 정확하게 씁니다. 문장형 문제에서 조건을 놓치는 일이 반복되어 다음 주 클리닉에서 다룹니다.'};
function pageSystem(){
 $('#steps').innerHTML=SYSTEM.map((s,i)=>`<div><span>STEP ${String(i+1).padStart(2,'0')}</span><b>${s[0]}</b><p>${s[1]}</p></div>`).join('');
 $('#week').innerHTML=WEEK.map(d=>`<div class="hd">${d}</div>`).join('')+TT.map(r=>`<div class="tm">${r[0]}</div>`+r.slice(1).map(x=>`<div class="${/클리닉|테스트|모의/.test(x)?'cl':x==='—'?'':'on'}">${x}</div>`).join('')).join('');
 $('#exam').innerHTML=EXAM.map(e=>`<div><em>${e[0]}</em><b>${e[1]}</b><p>${e[2]}</p></div>`).join('');
 const r=REPORT;
 $('#report').innerHTML=`<div class="top"><b>주간 리포트 · ${r.who}</b><span>${r.week} · SAMPLE</span></div><div class="body"><div><p style="margin:0 0 10px;font-weight:700">이번 주 오답 유형</p><div class="bars">${r.err.map(e=>`<div class="bar"><span>${e[0]}</span><i style="--w:${e[2]}%"></i><small>${e[1]}문항</small></div>`).join('')}</div></div>
 <dl><dt>출결</dt><dd>${r.att}</dd><dt>과제</dt><dd>${r.hw}</dd><dt>테스트</dt><dd>${r.test}</dd><dt>다음 주</dt><dd>${r.next}</dd><dt>선생님 메모</dt><dd>${r.memo}</dd></dl></div>`;
}
/* ---------- 반 안내 ---------- */
const CDETAIL={mb:['교과서 개념 순서대로, 학년 핵심 단원 중심','개념 설명 40분 → 예제 40분 → 확인 문항 40분','최대 8명 (예시)'],mt:['학교 진도와 학교별 기출 유형','개념 정리 → 교과서 · 부교재 문제 → 서술형 첨삭','최대 8명, 시험 3주 전 학교별 분반'],md:['단원 통합 고난도 문항, 풀이 서술','문항 토론 → 풀이 발표 → 서술 정리','최대 6명 (예시)'],me:['교과서 본문 구조 읽기와 문법 서술형','본문 분석 → 문장 만들기 → 요약 쓰기','최대 8명 (예시)'],hb:['공통수학 핵심 개념 다시 세우기','빈칸 개념 진단 → 개념 수업 → 기본 문항','최대 6명 (예시)'],ht:['학교별 기출 · 수행평가 · 서술형','개념 정리 → 학교 유형 → 실전 시험지','최대 8명, 시험 3주 전 학교별 분반'],hs:['수능형 문항 · 시간 관리','단원 점검 → 수능형 세트 → 월 1회 실전 모의','최대 8명 (예시)'],he:['교과서 · 부교재 본문과 수능 독해','구조 독해 → 어휘 · 어법 → 실전 세트','최대 8명 (예시)']};
const DIAG=[['예약','전화나 상담 메모로 희망 시간을 정합니다.'],['진단 테스트','지금 학년 개념 문항 30~40분. 반 배정 참고용입니다.'],['결과 상담','15분 동안 오답 유형과 추천 반을 보호자와 함께 봅니다.'],['첫 수업','반 배정 후 첫 주는 클리닉을 한 번 더 붙여 적응을 돕습니다.']];
const POLICY=[['고교학점제','2025학년도 고1부터 전면 시행. 진로에 맞춰 과목을 고르고 이수 기준을 채웁니다.'],['내신 5등급제','2025학년도 고1부터 고교 내신 상대평가가 5등급으로 바뀌었습니다.'],['통합형 수능','2028학년도 수능부터 선택과목 없이 공통 과목 중심으로 치릅니다.']];
function pageClasses(){
 let part=location.hash&&CLASSES.find(c=>c.id===location.hash.slice(1))?.part||'중등';
 const draw=()=>{$('#tabs').innerHTML=['중등','고등'].map(p=>`<button role="tab" aria-selected="${p===part}" data-p="${p}">${p}부</button>`).join('');
  $('#clist').innerHTML=CLASSES.filter(c=>c.part===part).map(c=>{const d=CDETAIL[c.id];return `<article class="clx" id="${c.id}"><div class="nm"><em>${c.part} ${c.subj}</em><b>${c.name.split(' · ')[1]}</b><small>${c.hrs}</small></div><dl><dt>이런 학생</dt><dd>${c.fit}</dd><dt>다루는 것</dt><dd>${d[0]}</dd><dt>수업 구성</dt><dd>${d[1]}</dd><dt>정원</dt><dd>${d[2]}</dd></dl></article>`}).join('');
  if(location.hash){const t=document.querySelector(location.hash);if(t)t.style.borderColor='var(--peri)'}};
 $('#tabs').onclick=e=>{const b=e.target.closest('button');if(b){part=b.dataset.p;draw()}};draw();
 $('#diag').innerHTML=DIAG.map(d=>`<div><b>${d[0]}</b><p>${d[1]}</p></div>`).join('');
 $('#policy').innerHTML=POLICY.map(p=>`<div class="box"><span class="m">2028 대입</span><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join('');
}
/* ---------- 선생님 ---------- */
const TMORE={'서지안':['개념을 학생이 직접 설명하게 하는 수업','문제를 많이 풀기보다 왜 틀렸는지 끝까지 보고 싶은 학생','시험지는 학교가 바뀌어도, 오답의 이유는 잘 바뀌지 않습니다.'],'문태하':['풀이 과정을 말과 글로 남기는 수업','서술형에서 감점이 잦은 학생','답보다 과정을 쓰는 연습이 중학교 수학의 절반입니다.'],'이로운':['본문을 구조로 나눠 읽는 수업','지문은 읽었는데 문제에서 답을 못 고르는 학생','영어 지문에도 목차가 있습니다.'],'한나래':['문법을 문장 만들기로 익히는 수업','문법 용어는 아는데 문장을 못 만드는 학생','외운 규칙은 내 문장으로 써 볼 때 남습니다.'],'원장 상담':['학기별 1회 진로 · 과목 선택 상담','고교학점제 과목 선택이 막막한 중3 · 고1','과목 선택은 성적표가 아니라 관심에서 시작합니다.']};
function pageTeachers(){$('#tlist').innerHTML=TEACHERS.map(t=>{const m=TMORE[t[0]];return `<article class="t1"><div class="av" aria-hidden="true">${t[0][0]}</div><div><span class="m">${t[1]}</span><h3>${t[0]}</h3><p>${t[2]}</p><p><b style="color:var(--ink)">수업 방식</b> · ${m[0]}</p><p><b style="color:var(--ink)">이런 학생과 잘 맞아요</b> · ${m[1]}</p></div><div><q>${m[2]}</q></div></article>`}).join('')}
/* ---------- 교습비 ---------- */
const REFUND=[['교습 시작 전','이미 낸 교습비 전액'],['총 교습시간 1/3 경과 전','이미 낸 교습비의 2/3'],['총 교습시간 1/2 경과 전','이미 낸 교습비의 1/2'],['총 교습시간 1/2 경과 후','반환하지 않음']];
function pageFees(){
 $('#ftab').innerHTML=FEES.map(f=>`<tr><td><b>${f[0]}</b></td><td>${f[1]}</td><td class="p">${f[2]}</td><td class="p">${f[3]} (예시)</td><td class="p">00,000원 (예시)</td></tr>`).join('');
 $('#refund').innerHTML=REFUND.map(r=>`<div><span>${r[0]}</span><b>${r[1]}</b></div>`).join('');
 $('#legal').innerHTML=`학원 명칭: <b>${A.name}</b> · ${A.reg} · 교습과정: 보습(수학, 영어)<br>교습비 · 기타경비는 데모용 예시이며, 실제 사이트는 교육지원청에 등록한 금액과 같게 표시합니다.`;
}
/* ---------- 공지사항 게시판 ---------- */
const BOARD=[
 {id:14,c:'공지',pin:1,t:'2026학년도 2학기 교습비 게시 안내',d:'2026.10.28',v:212,b:['2학기 교습비와 교재비(기타경비)를 교습비 페이지와 학원 안내 데스크에 게시했습니다.','금액은 교육지원청에 등록한 금액과 같으며, 반환 기준은 학원법 시행령을 따릅니다. (데모: 금액은 예시)']},
 {id:13,c:'설명회',pin:1,t:'고1 · 고2 과목 선택과 2학기 기말 대비 설명회',d:'2026.10.26',v:348,b:['11월 7일(토) 오전 11시, 학원 3층 세미나실에서 설명회를 엽니다.','고교학점제 과목 선택 기준, 학교별 기말고사 범위 정리 방법, 겨울방학 시간표를 안내합니다.','자리는 30석이며 설명회 · 소식 페이지 신청서로 예약해 주세요. (예시 일정)']},
 {id:12,c:'진단',t:'반 배정 참고용 진단 테스트 상시 예약',d:'2026.10.20',v:187,b:['평일 16:00 · 19:00에 진행합니다. 30~40분 동안 지금 학년 개념 문항을 풀고 15분 결과 상담이 이어집니다.','결과는 반 배정 참고용이며 합격 · 불합격으로 나누지 않습니다.']},
 {id:11,c:'상담',t:'중3 고교학점제 과목 탐색 상담 주간',d:'2026.10.15',v:156,b:['11월 16일부터 21일까지 원장 상담을 엽니다.','관심 분야와 지금 성적표를 함께 가져오시면 고1 공통과목 이후 선택과목 흐름을 같이 살펴봅니다.']},
 {id:10,c:'공지',t:'정기고사 3주 전 학교별 클리닉 추가 운영',d:'2026.10.02',v:241,b:['학교 시험 일정이 공지되면 3주 전부터 학교별 클리닉을 추가로 엽니다.','학교별 범위 · 부교재 기준으로 나누며 시간표는 보호자 문자로 안내합니다.']},
 {id:9,c:'휴원',t:'추석 연휴 휴원 안내',d:'2026.09.21',v:133,b:['9월 24일(목)부터 27일(일)까지 휴원합니다.','해당 주 수업은 다음 주 클리닉 시간에 보충하며, 보충 일정은 문자로 안내합니다.']},
 {id:8,c:'공지',t:'2학기 시간표 변경 안내 (고2 수학)',d:'2026.09.07',v:198,b:['고2 수학 내신집중반이 화 · 목 19:00에서 화 · 금 19:00으로 바뀝니다.','변경으로 겹치는 일정이 있으면 상담으로 반 이동을 도와드립니다.']},
 {id:7,c:'설명회',t:'2027학년도 수능 대비 고3 학부모 간담회',d:'2026.08.24',v:174,b:['9월 모의평가 이후 수능까지 남은 기간의 학습 계획과 클리닉 운영을 안내합니다.','간담회는 소규모(12명)로 진행합니다. (예시 일정)']},
 {id:6,c:'진단',t:'여름방학 진단 테스트 결과 리포트 발송',d:'2026.08.10',v:121,b:['7월 진단 테스트 응시생의 결과 리포트를 보호자 문자 링크로 보냈습니다.','리포트에는 영역별 정답률과 다음 학기 추천 반이 담겨 있습니다.']},
 {id:5,c:'휴원',t:'여름 휴원 안내',d:'2026.07.27',v:109,b:['8월 3일(월)부터 5일(수)까지 휴원합니다. 온라인 과제는 그대로 제공합니다.']},
 {id:4,c:'공지',t:'개인정보 처리방침 개정 안내',d:'2026.07.01',v:88,b:['상담 신청서 보관 기간을 상담 종료 후 3개월로 줄였습니다.','만 14세 미만 학생의 정보는 보호자 동의를 받아 처리합니다.']},
 {id:3,c:'상담',t:'1학기 기말 성적 상담 신청 안내',d:'2026.06.29',v:143,b:['1학기 기말고사 이후 담당 선생님과 15분 성적 상담을 신청할 수 있습니다.','상담 시간은 평일 15:00~17:00입니다.']},
 {id:2,c:'공지',t:'건물 엘리베이터 점검 안내',d:'2026.06.15',v:64,b:['6월 18일(목) 14:00~16:00 엘리베이터 점검이 있습니다. 계단을 이용해 주세요.']},
 {id:1,c:'공지',t:'오름길 학원 홈페이지를 새로 열었습니다',d:'2026.06.01',v:301,b:['반 안내, 교습비, 설명회 신청을 홈페이지에서 확인할 수 있습니다. (가상 업체 데모)']}];
const BCATS=['전체','공지','설명회','진단','상담','휴원'];
function pageNotice(){const q=new URLSearchParams(location.search),W=$('#board'),PER=8;
 const url=o=>{const u=new URLSearchParams();Object.entries(o).forEach(([k,v])=>{if(v&&v!=='전체'&&v!=1||k==='id'&&v)u.set(k,v)});const s=u.toString();return s?'?'+s:'./'};
 const id=+q.get('id');
 if(id){const i=BOARD.findIndex(x=>x.id===id),p=BOARD[i];if(!p){W.innerHTML='<p>글을 찾을 수 없습니다.</p>';return}
  const nw=BOARD[i-1],ol=BOARD[i+1];document.title=p.t+' | 공지사항 | 오름길 학원 (가상 업체 데모)';
  W.innerHTML=`<article class="bv"><div class="bvh"><span class="bc c-${p.c}">${p.c}</span><h2>${p.t}</h2><div class="bm"><span>작성 오름길 학원</span><time>${p.d}</time><span>조회 ${p.v+1}</span></div></div><div class="bvb">${p.b.map(x=>`<p>${x}</p>`).join('')}</div>
  <div class="bnav" role="navigation" aria-label="이전 · 다음 글">${nw?`<a href="${url({id:nw.id})}"><em>다음 글</em><b>${nw.t}</b></a>`:'<span><em>다음 글</em><b>다음 글이 없습니다</b></span>'}${ol?`<a href="${url({id:ol.id})}"><em>이전 글</em><b>${ol.t}</b></a>`:'<span><em>이전 글</em><b>이전 글이 없습니다</b></span>'}</div>
  <div class="bact"><a class="btn p" href="./">목록으로</a>${p.c==='설명회'?`<a class="btn l" href="${R}news/#fb">설명회 신청</a>`:''}</div></article>`;return}
 const cat=BCATS.includes(q.get('cat'))?q.get('cat'):'전체',kw=(q.get('q')||'').trim();
 let L=BOARD.filter(x=>(cat==='전체'||x.c===cat)&&(!kw||(x.t+x.b.join(' ')).includes(kw)));
 const pins=cat==='전체'&&!kw?L.filter(x=>x.pin):[];L=L.filter(x=>!pins.includes(x));
 const pages=Math.max(1,Math.ceil(L.length/PER)),pg=Math.min(Math.max(1,+q.get('p')||1),pages),rows=L.slice((pg-1)*PER,pg*PER);
 const row=(x,n)=>`<li class="${x.pin&&n==='공지'?'pin':''}"><span class="bn">${n}</span><span class="bc c-${x.c}">${x.c}</span><a class="bt" href="${url({id:x.id})}">${x.t}${Date.parse(x.d.replace(/\./g,'-'))>Date.parse('2026-10-14')?'<i class="new">N</i>':''}</a><time>${x.d}</time><span class="bvw">${x.v}</span></li>`;
 W.innerHTML=`<div class="btop"><div class="tabs" role="group" aria-label="분류">${BCATS.map(c=>`<a href="${url({cat:c,q:kw})}" ${c===cat?'aria-current="true"':''}>${c}<small>${c==='전체'?BOARD.length:BOARD.filter(x=>x.c===c).length}</small></a>`).join('')}</div>
 <form class="bsearch" role="search"><label class="sr" for="bq">공지 검색</label><input id="bq" name="q" value="${kw.replace(/"/g,'&quot;')}" placeholder="제목 · 내용 검색">${cat!=='전체'?`<input type="hidden" name="cat" value="${cat}">`:''}<button class="btn p">검색</button></form></div>
 <p class="bcount">${kw?`‘${kw}’ 검색 결과 `:''}총 <b>${L.length+pins.length}</b>건 · ${pg}/${pages} 페이지</p>
 <ul class="blist"><li class="bhd" aria-hidden="true"><span>번호</span><span>분류</span><span>제목</span><span>작성일</span><span>조회</span></li>${pins.map(x=>row(x,'공지')).join('')}${rows.length?rows.map(x=>row(x,x.id)).join(''):'<li class="empty">검색 결과가 없습니다. 다른 낱말로 찾아보세요.</li>'}</ul>
 ${pages>1?`<div class="pager" role="navigation" aria-label="페이지">${pg>1?`<a href="${url({cat,q:kw,p:pg-1})}" aria-label="이전 페이지">‹</a>`:''}${Array.from({length:pages},(_,i)=>`<a href="${url({cat,q:kw,p:i+1})}" ${i+1===pg?'aria-current="page"':''}>${i+1}</a>`).join('')}${pg<pages?`<a href="${url({cat,q:kw,p:pg+1})}" aria-label="다음 페이지">›</a>`:''}</div>`:''}`;
}
/* ---------- 소식 ---------- */
function pageNews(){
 $('#posts').innerHTML=BOARD.slice(0,4).map(p=>`<a class="pl" href="${R}notice/?id=${p.id}"><em>${p.c}</em><b>${p.t}</b><time>${p.d}</time></a>`).join('');
 $('#faqs').innerHTML=FAQ.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');
 const f=$('#fb'),m=$('#fmsg');
 f.onsubmit=e=>{e.preventDefault();const miss=[...f.querySelectorAll('[required]')].find(x=>x.type==='checkbox'?!x.checked:!x.value.trim());
  if(miss){m.className='msg no';m.textContent=miss.type==='checkbox'?'개인정보 이용에 동의해 주세요.':`${f.querySelector(`label[for="${miss.id}"]`).textContent.replace('*','').trim()} 항목을 입력해 주세요.`;miss.focus();return}
  if(!/^01\d-?\d{3,4}-?\d{4}$/.test($('#b-tel').value.trim())){m.className='msg no';m.textContent='휴대폰 번호 형식을 확인해 주세요.';$('#b-tel').focus();return}
  m.className='msg ok';m.textContent='입력 내용을 확인했습니다. 가상 업체 데모라 실제로 접수되지는 않습니다.'};
}
({home:pageHome,system:pageSystem,classes:pageClasses,teachers:pageTeachers,fees:pageFees,notice:pageNotice,news:pageNews})[PG]?.();

/* ---------- 스타일 · 모션 레이어 ---------- */
(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,hd=document.querySelector('header');
 document.body.insertAdjacentHTML('afterbegin','<div class="prog" aria-hidden="true"></div>');const pr=document.querySelector('.prog');
 const onS=()=>{const h=document.documentElement,m=h.scrollHeight-h.clientHeight;pr.style.setProperty('--p',m>0?h.scrollTop/m:0);hd&&hd.classList.toggle('scr',h.scrollTop>8)};addEventListener('scroll',onS,{passive:true});onS();
 /* FAQ: 번호 카드 + 부드러운 펼침 */
 const fw=document.getElementById('faqs');
 if(fw&&typeof FAQ!=='undefined'){fw.className='faqs';fw.innerHTML=FAQ.map(f=>`<details class="fq"><summary><i>Q</i><span>${f[0]}</span><b class="pm" aria-hidden="true"></b></summary><div class="a"><div><b>A</b><p>${f[1]}</p></div></div></details>`).join('');
  fw.insertAdjacentHTML('beforebegin',`<div class="fqh"><span>${FAQ.length}개의 질문 · 눌러서 답을 확인하세요</span><button type="button" id="fqall">모두 펼치기</button></div>`);
  const all=document.getElementById('fqall');all.onclick=()=>{const open=![...fw.querySelectorAll('details')].every(d=>d.open);fw.querySelectorAll('details').forEach(d=>d.open=open);all.textContent=open?'모두 접기':'모두 펼치기'}}
 document.querySelectorAll('details.fq').forEach(d=>{const s=d.querySelector('summary'),a=d.querySelector('.a');let an;
  s.addEventListener('click',e=>{if(RM||!a.animate)return;e.preventDefault();an&&an.cancel();
   if(d.open){an=a.animate([{height:a.offsetHeight+'px',opacity:1},{height:'0px',opacity:0}],{duration:260,easing:'ease-in'});an.onfinish=()=>{d.open=false}}
   else{d.open=true;const h=a.offsetHeight;an=a.animate([{height:'0px',opacity:0},{height:h+'px',opacity:1}],{duration:340,easing:'cubic-bezier(.2,.8,.2,1)'})}})});
 /* 스크롤 등장 */
 if(RM||!('IntersectionObserver' in window))return;document.documentElement.classList.add('rvon');
 const sel='main .sh,.intro p,.sys>div,.go>a,.news>div,.tea>div,.clx,.steps>div,.t1,.posts>details,details.fq,.refund>div,.tbl,form.f,.map,.info,.legal,.week';
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{rootMargin:'0px 0px -8% 0px'});
 document.querySelectorAll(sel).forEach(el=>{if(el.closest('.panel'))return;const sib=[...el.parentElement.children].filter(x=>x.matches(sel));el.style.setProperty('--d',Math.min(sib.indexOf(el),6)*0.07+'s');el.classList.add('rv');io.observe(el)})})();
