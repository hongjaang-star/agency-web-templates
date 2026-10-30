/* 온지한의원(가상) 공통 데이터 · 화면 — 실존 한의원의 상호 · 문구 · 사진을 쓰지 않는다.
   rules/medical.md 한의원 항목: 효과 단정 · 경험담 · 자체 요법 · 다이어트/보약 효능 · 할인 없음,
   방법별 반응과 한약 복용 주의 고지, 첩약 시범사업 · 추나 보험은 조건만, 비급여 금액은 예시 */
const DATA={
  name:"온지한의원",
  tel:"02-000-0000",telHref:"tel:0200000000",
  addr:"서울시 가온구 솔내로 24, 솔내빌딩 3층 (가상 주소)",
  ways:[["지하철","가온역(가상) 2번 출구에서 솔내로를 따라 도보 4분"],["버스","솔내사거리 정류장 하차, 길 건너 바로"],["주차","건물 지하 주차 1시간 (예시)"],["승강기","1층 로비 승강기 이용, 3층 하차 후 오른쪽"]],
  footer:"대표 한의사 서지안 · 서울시 가온구 솔내로 24, 3층 (가상) · 02-000-0000 (예시)",
  hours:[["월 · 수 · 금","09:30 – 19:00",""],["화 · 목","09:30 – 20:30","야간"],["토요일","09:30 – 14:00","점심시간 없음"],["일 · 공휴일","휴진",""]],
  nav:[["concerns/","불편함으로 찾기"],["methods/","진료 방법"],["herbal/","한약"],["doctors/","한의사 · 진료실"],["cost/","비용 · 보험"],["visit/","오시는 길 · 상담"]],
  questions:[
    {id:"sleep",l:"잠",t:"요즘 잠은 어떠세요?",multi:false,o:["잠들기까지 오래 걸린다","자다가 자주 깬다","낮에 자꾸 졸린다","잘 자는 편이다"]},
    {id:"digest",l:"소화",t:"식사와 소화는 어떠세요?",multi:true,hint:"해당하는 것을 모두 고르세요",o:["자주 더부룩하다","속이 쓰리다","입맛이 없다","괜찮다"]},
    {id:"sweat",l:"땀",t:"땀은 어떤 편인가요?",multi:false,o:["조금만 움직여도 많이 난다","거의 나지 않는다","자면서 식은땀이 난다","보통이다"]},
    {id:"temp",l:"추위 · 더위",t:"추위와 더위 중 무엇이 더 힘드세요?",multi:false,o:["손발이 차고 추위를 탄다","더위를 많이 탄다","둘 다 힘들다","특별히 없다"]},
    {id:"pain",l:"아픈 곳",t:"아픈 곳이 있나요?",multi:true,hint:"해당하는 곳을 모두 고르세요",o:["목 · 어깨","허리","무릎 · 다리","없다"]},
    {id:"etc",l:"그 밖에",t:"그 밖에 알려 주실 것이 있나요?",multi:true,hint:"선택 사항입니다",o:["교통사고 후 불편","생리통 · 갱년기","비염","지금 먹는 약이 있다"]}
  ],
  concerns:[
    {id:"pain",k:"허리 · 목 · 어깨 통증",d:"오래 앉거나 같은 자세로 일하며 굳고 아픈 경우",tags:["침","추나","뜸"],how:"진찰 후 침 진료부터 시작하고, 척추 · 관절 정렬이 필요하면 추나를 더합니다. 주 1~2회로 시작해 경과를 보며 간격을 정합니다.",ins:"침 · 추나(근골격계, 연 20회)는 건강보험이 적용됩니다.",warn:"진료 뒤 하루 이틀 뻐근하거나 침 자리에 멍이 들 수 있습니다. 다리 저림 · 힘 빠짐이 심하면 영상 검사를 먼저 권합니다.",life:["한 시간에 한 번 일어나 자세 바꾸기","모니터 높이를 눈높이에 맞추기","통증이 심한 날은 무리한 운동 쉬기"],doc:"서지안"},
    {id:"accident",k:"교통사고 후 불편",d:"사고 뒤 며칠 지나 목 · 허리가 뻣뻣해지는 경우",tags:["침","추나","약침","한약"],how:"사고 경위와 아픈 곳을 확인하고 침 · 추나 · 약침을 상태에 맞게 조합합니다. 필요하면 한약을 함께 상담합니다.",ins:"보험사 접수 번호로 자동차보험 진료를 접수합니다. 적용 범위는 보험사와 확인합니다.",warn:"영상 검사가 필요해 보이면 의과 진료를 먼저 권해 드립니다.",life:["사고 날짜 · 보험사 · 접수 번호 메모해 오기","아픈 곳이 늦게 나타날 수 있으니 변화를 적어 두기"],doc:"서지안"},
    {id:"digest",k:"소화 불편",d:"더부룩함, 속쓰림, 입맛 없음이 이어지는 경우",tags:["침","한약 상담"],how:"식사 습관과 복용 중인 약을 먼저 묻고, 침 진료와 생활 조언부터 시작합니다. 한약은 진찰 뒤 필요할 때 상담합니다.",ins:"'기능성 소화불량'은 첩약 건강보험 시범사업 대상 질환입니다(참여 기관 · 조건 확인 필요).",warn:"체중이 빠르게 줄거나 검은 변이 보이면 내과 검사를 먼저 받으세요.",life:["식사 시간을 일정하게","늦은 밤 야식 줄이기","최근 내시경 · 검사 결과가 있으면 가져오기"],doc:"문하람"},
    {id:"sleep",k:"잠 · 긴장",d:"잠들기 어렵거나 자주 깨고, 긴장이 풀리지 않는 경우",tags:["침","한약 상담","생활 지도"],how:"잠드는 시간 · 깨는 횟수 · 카페인과 운동 습관을 함께 살핍니다. 침 진료와 생활 리듬 조정부터 시작합니다.",ins:"침 진료는 건강보험, 한약은 비급여입니다.",warn:"수면제 등 처방약을 임의로 끊지 마시고 상담 때 알려 주세요.",life:["오후 카페인 줄이기","일주일 동안 잠든 시각 · 깬 시각 적어 오기"],doc:"문하람"},
    {id:"women",k:"생리통 · 갱년기",d:"생리 때마다 힘들거나 열감 · 땀 · 잠의 변화가 생긴 경우",tags:["침","뜸","한약"],how:"주기와 증상 기록을 함께 보며 침 · 뜸으로 시작하고, 필요하면 한약을 상담합니다.",ins:"'월경통'은 첩약 건강보험 시범사업 대상 질환입니다(참여 기관 · 조건 확인 필요).",warn:"임신 가능성이 있거나 호르몬 치료 중이면 꼭 먼저 알려 주세요.",life:["두세 달 주기와 통증 정도 기록하기","복용 중인 진통제 이름 알려 주기"],doc:"문하람"},
    {id:"nose",k:"비염",d:"계절마다 콧물 · 코막힘 · 재채기가 반복되는 경우",tags:["침","한약"],how:"증상이 심한 시기와 생활 환경을 확인하고 침 진료와 한약 상담을 함께 합니다.",ins:"'알레르기 비염'은 첩약 건강보험 시범사업 대상 질환입니다(참여 기관 · 조건 확인 필요).",warn:"복용 중인 비염약이 있으면 알려 주세요.",life:["증상이 심한 계절 · 장소 적어 오기","실내 습도 확인하기"],doc:"문하람"},
    {id:"kids",k:"아이 식욕 · 성장 상담",d:"잘 먹지 않거나 성장 속도가 걱정되는 보호자",tags:["진찰","소아 한약 상담"],how:"성장 단계와 식사 · 수면 습관을 함께 살피고, 보호자와 생활 관리부터 정합니다. 한약은 필요할 때만 상담합니다.",ins:"소아 한약은 비급여입니다.",warn:"보호자가 함께 와 주세요. 성장 결과를 약속하지 않습니다.",life:["최근 키 · 몸무게 기록 가져오기","간식 · 음료 습관 함께 보기"],doc:"문하람"},
    {id:"study",k:"수험생 컨디션",d:"시험을 앞두고 피로 · 소화 · 잠이 흐트러진 경우",tags:["침","한약 상담"],how:"공부 시간표에 맞춰 화 · 목 야간 진료로 다닐 수 있게 일정을 잡습니다.",ins:"침 진료는 건강보험, 한약은 비급여입니다.",warn:"카페인 음료 · 진통제 복용 여부를 알려 주세요.",life:["시험 일정과 학원 시간표 알려 주기","잠자는 시간 먼저 지키기"],doc:"문하람"}
  ],
  methods:[
    ["침","아픈 곳과 관련된 자리에 가는 일회용 침을 놓습니다.",["y","적용"],"10–20분","주 1–3회","침 자리 멍, 일시적 어지러움"],
    ["뜸 · 부항","따뜻하게 하거나(뜸) 컵으로 당겨(부항) 굳은 곳을 풉니다.",["y","일부 적용"],"10분 안팎","침 진료와 함께","붉은 자국이 며칠 남음, 뜸 자리 화상 주의"],
    ["추나","한의사가 손으로 척추 · 관절의 정렬을 바로잡습니다.",["y","근골격계 연 20회"],"10–15분","주 1–2회","하루 이틀 근육통"],
    ["약침","한약재에서 얻은 약액을 침 자리에 소량 주입합니다.",["n","비급여"],"5–10분","상태에 따라","붓기 · 가려움, 드물게 알레르기"],
    ["한약","진찰 뒤 증상 · 체질 · 복용약을 보고 처방해 달입니다.",["p","비급여 · 시범사업 6개 질환"],"조제 3–4일","15 · 30일분","소화 불편 · 피부 반응 가능"]
  ],
  firstVisit:[["접수 · 문진표","미리 쓴 문진표가 있으면 보여 주세요","5분"],["진찰","문진 · 맥 · 배를 살피고 아픈 곳을 확인합니다","15–20분"],["설명 · 계획","진료 방법 · 횟수 · 보험 여부를 설명하고 함께 정합니다","5–10분"],["첫 진료","동의하신 방법으로 첫 진료를 합니다","20–30분"]],
  doctors:[
    {img:"doctor-1.webp",n:"서지안",r:"대표 한의사 · 통증 · 교통사고 · 추나",li:["한방재활의학 진료 (가상 경력)","목 · 허리 · 어깨 통증, 교통사고 후 진료","추나 진료 담당"],days:"월 – 토",q:"“아픈 곳만이 아니라 하루를 어떻게 보내시는지부터 묻습니다.”"},
    {img:"doctor-2.webp",n:"문하람",r:"한의사 · 여성 · 소화 · 수면 · 아이",li:["한방부인과 진료 (가상 경력)","생리통 · 갱년기 · 소화 · 잠 진료","소아 한약 상담 담당"],days:"월 – 금 · 화 · 목 야간",q:"“문진표에 적힌 작은 습관이 처방을 바꾸기도 합니다.”"}
  ],
  rooms:[
    {img:"room-1.webp",n:"1진료실 · 침 · 뜸",d:"창가 쪽 개별실. 문이 닫히고, 베드 옆에 옷 바구니와 담요가 있습니다."},
    {img:"room-2.webp",n:"2진료실 · 추나",d:"추나 전용 베드가 있는 넓은 방. 한의사가 직접 진료합니다."},
    {img:"room-3.webp",n:"3진료실 · 여성 · 약침",d:"커튼 대신 문이 있는 조용한 방. 여성 진료와 약침에 씁니다."}
  ],
  steps:[["진찰","문진 · 맥 · 배를 살핍니다"],["처방","증상 · 복용약 확인 후 정합니다"],["약재 확인","원산지와 검사 성적서를 봅니다"],["달임","원내 조제실에서 달입니다"],["포장 · 전달","3–4일 안에 받으십니다"],["복용 확인","1주 뒤 전화로 경과를 묻습니다"]],
  ins:[["침 · 뜸 · 부항","기본 진료는 건강보험이 적용됩니다. 일부 뜸 · 부항은 종류에 따라 다릅니다."],["추나","목 · 허리 등 근골격계 질환에 한해 연 20회까지 건강보험이 적용됩니다."],["첩약 시범사업","월경통 · 안면신경마비 · 뇌혈관질환 후유증 · 알레르기 비염 · 기능성 소화불량 · 요추추간판탈출증. 참여 기관에서 연 2개 질환, 질환별 20일까지. 시범사업 기간(2026.12.31까지)과 참여 여부는 문의해 주세요."],["교통사고","자동차보험으로 접수합니다. 보험사 접수 번호를 알려 주세요."]],
  price:[["약침 1회","10,000–30,000원"],["첩약 15일분","220,000원"],["첩약 30일분","400,000원"],["소아 첩약 15일분","150,000원"],["진단서 발급","20,000원"],["진료확인서","3,000원"]],
  faq:[
    ["첫 진료비는 얼마쯤인가요?","침 진료만 받으시면 건강보험 본인부담금만 냅니다. 금액은 진료 내용에 따라 달라 접수 때 안내합니다. 한약 · 약침 같은 비급여는 진료 전에 먼저 설명하고 동의를 받습니다."],
    ["한약을 꼭 먹어야 하나요?","아닙니다. 대부분 침 진료부터 시작하고, 한약은 진찰 뒤 필요하다고 판단될 때 설명드린 다음 원하시는 경우에만 짓습니다."],
    ["첩약 건강보험은 누구나 되나요?","시범사업 대상 질환 6가지에 해당하고 참여 기관에서 진료받을 때만 적용됩니다. 기간과 조건이 바뀔 수 있어 접수 때 확인해 드립니다."],
    ["교통사고 진료는 어떻게 접수하나요?","보험사에서 받은 접수 번호를 알려 주시면 자동차보험으로 접수합니다. 적용 범위는 보험사와 확인합니다."],
    ["할인이나 패키지가 있나요?","진료비 할인 · 기간 패키지는 운영하지 않습니다. 게시된 진료비 기준으로 안내합니다."]
  ]
};
const ROOT=document.body.dataset.root||'./';
const IMG=f=>ROOT+'../images/'+f;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ph=(f,alt,ratio,label)=>`<figure class="ph ${ratio}"><img src="${IMG(f)}" alt="${alt} (AI 생성 예시 이미지)" loading="lazy" onerror="this.parentNode.classList.add('empty');this.remove()"><span class="ph-l">${f}<br>${label}</span><span class="ai">AI 생성 예시</span></figure>`;
const store={get(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
const icon={
  kakao:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4C7 4 3 7.1 3 11c0 2.5 1.7 4.7 4.2 5.9l-.9 3.3c-.1.3.3.5.5.3l3.9-2.6c.4 0 .9.1 1.3.1 5 0 9-3.1 9-7S17 4 12 4z"/></svg>',
  tel:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>'
};

/* 머리 · 꼬리 · 바로가기 */
(function chrome(){
  const page=document.body.dataset.page;
  const logo=`<img class="brand-logo" src="${ROOT}assets/brand/onji-logo.svg" alt="" width="224" height="64" fetchpriority="high">`;
  const nav=DATA.nav.map(([h,l])=>`<a href="${ROOT}${h}"${page===h.replace('/','')?' aria-current="page"':''}>${l}</a>`).join('');
  document.body.insertAdjacentHTML('afterbegin',`<a class="skip" href="#main">본문 바로가기</a><div class="demo">가상 업체 데모 · 온지한의원 — 실제 진료 · 접수가 이루어지지 않습니다</div><header class="top"><div class="wrap"><a class="logo" href="${ROOT}" aria-label="${DATA.name} 처음으로">${logo}</a><button class="menu-btn" type="button" aria-expanded="false" aria-controls="gnb">메뉴</button><nav class="gnb" id="gnb" aria-label="주요 메뉴">${nav}</nav><a class="btn header-cta" href="${ROOT}visit/#consult">상담 신청</a></div></header>`);
  document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap"><div><a class="footer-brand" href="${ROOT}" aria-label="${DATA.name} 처음으로">${logo}</a><div>${DATA.footer}</div><nav aria-label="하단 메뉴">${DATA.nav.map(([h,l])=>`<a href="${ROOT}${h}">${l}</a>`).join('')}</nav></div><div>가상 업체 데모입니다. 업체명 · 의료진 · 주소 · 전화 · 금액은 모두 예시이며 실제 진료가 아닙니다. 진료 결과는 개인에 따라 다를 수 있습니다. 사진은 AI 생성 예시이며 실제 의료진 · 환자 · 공간이 아닙니다. 실제 운영 시 의료광고 심의 대상 여부를 확인합니다.</div></div></footer>
  <nav class="quick" aria-label="바로가기"><button type="button" class="kakao" id="q-kakao">${icon.kakao}카톡 상담</button><a class="tel" href="${DATA.telHref}" aria-label="전화하기 ${DATA.tel}">${icon.tel}전화하기</a><a class="map" href="${ROOT}visit/#map">${icon.map}오시는 길</a></nav><div class="toast" id="toast" role="status"></div>`);
  const mb=$('.menu-btn'),g=$('#gnb');mb.onclick=()=>{const o=g.classList.toggle('open');mb.setAttribute('aria-expanded',String(o));mb.textContent=o?'닫기':'메뉴';};
  let tt;window.toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),3200);};
  $('#q-kakao').onclick=()=>toast('데모 화면입니다. 실제 운영 시 카카오톡 채널 상담 창이 열립니다.');
})();

/* 문진표 (홈) */
function questionnaire(){
  if(!$('#qbox'))return;
  const Q=DATA.questions,ans={};let cur=0;
  const d=new Date();$('#today').textContent=`${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}.`;
  const prog=$('.prog');Q.forEach(()=>prog.appendChild(document.createElement('i')));
  function draw(){
    const q=Q[cur],sel=ans[q.id]||[];
    $('#qbox').innerHTML=`<div class="num">${cur+1} / ${Q.length}</div><h3 id="qt">${q.t}</h3>${q.hint?`<p class="hint">${q.hint}</p>`:''}<div class="opts" role="${q.multi?'group':'radiogroup'}" aria-labelledby="qt">${q.o.map(o=>`<label class="opt"><input type="${q.multi?'checkbox':'radio'}" name="q_${q.id}" value="${o}" ${sel.includes(o)?'checked':''}><span class="box"></span>${o}</label>`).join('')}</div>`;
    [...prog.children].forEach((b,i)=>b.classList.toggle('on',i<=cur));
    $('#prev').disabled=cur===0;$('#next').textContent=cur===Q.length-1?'다 썼어요 →':'다음 →';
    $$('#qbox input').forEach(inp=>inp.addEventListener('change',()=>{
      let v=$$('#qbox input:checked').map(x=>x.value);const none=q.o[q.o.length-1];
      if(q.multi&&inp.checked&&(none==='없다'||none==='괜찮다')){v=inp.value===none?[none]:v.filter(x=>x!==none);$$('#qbox input').forEach(x=>x.checked=v.includes(x.value));}
      ans[q.id]=v;}));
  }
  function finish(){
    $('#qbox').style.display='none';$('#qnav').style.display='none';
    $('#sum').innerHTML=Q.map(q=>`<dt>${q.l}</dt><dd>${(ans[q.id]||[]).join(', ')||'적지 않음'}</dd>`).join('');
    const a=k=>ans[k]||[],look=[];
    if(a('pain').some(x=>x!=='없다'))look.push('pain');
    if(a('etc').includes('교통사고 후 불편'))look.push('accident');
    if(a('digest').some(x=>x!=='괜찮다'))look.push('digest');
    if(a('sleep').some(x=>x!=='잘 자는 편이다'))look.push('sleep');
    if(a('etc').includes('생리통 · 갱년기'))look.push('women');
    if(a('etc').includes('비염'))look.push('nose');
    const names=look.map(id=>DATA.concerns.find(c=>c.id===id).k);
    $('#look').innerHTML=look.length?`함께 살펴볼 수 있는 항목: <b>${names.join(' · ')}</b>${a('etc').includes('지금 먹는 약이 있다')?'<br>드시는 약 이름을 상담 때 꼭 알려 주세요.':''}`:'특별히 고른 불편함이 없어요. 궁금한 점을 상담 칸에 적어 주세요.';
    $('#result').classList.add('show');$('#stamp').classList.add('on');
    store.set('onji-munjin','[문진표]\n'+Q.map(q=>`${q.l}: ${(ans[q.id]||[]).join(', ')||'적지 않음'}`).join('\n'));
    store.set('onji-look',look.join(','));
    $$('.row').forEach(r=>r.toggleAttribute('data-hit',look.includes(r.dataset.id)));
  }
  $('#next').onclick=()=>{if(cur<Q.length-1){cur++;draw();}else finish();};
  $('#prev').onclick=()=>{if(cur>0){cur--;draw();}};
  $('#redo').onclick=()=>{cur=0;Object.keys(ans).forEach(k=>delete ans[k]);$('#result').classList.remove('show');$('#stamp').classList.remove('on');$('#qbox').style.display='';$('#qnav').style.display='';draw();};
  draw();
}

/* 불편함 색인 (홈: 요약, 불편함 페이지: 전체) */
function concernIndex(){
  const el=$('#index');if(!el)return;
  const full=el.dataset.full==='1',hit=(store.get('onji-look')||'').split(',');
  el.innerHTML=DATA.concerns.map((c,i)=>`<div class="row" id="${c.id}" data-id="${c.id}"${hit.includes(c.id)?' data-hit':''}><button type="button" aria-expanded="false" aria-controls="c${i}"><span class="k">${String(i+1).padStart(2,'0')}</span><span class="t">${c.k}<small>${c.d}</small></span><span class="tags">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</span><span class="pm" aria-hidden="true">+</span></button><div class="body" id="c${i}"><div><div class="inner"><div></div><div><h4>진료는 이렇게</h4><p>${c.how}</p></div><div><h4>보험</h4><p>${c.ins}</p></div><div><h4>알아 두세요</h4><p class="warn">${c.warn}</p></div>${full?`<div></div><div><h4>오시기 전에</h4><ul>${c.life.map(l=>`<li>${l}</li>`).join('')}</ul></div><div><h4>주로 보는 한의사</h4><p>${c.doc} 한의사 · <a href="${ROOT}doctors/">소개 보기</a></p></div><div><h4>상담</h4><p><a href="${ROOT}visit/?c=${c.id}#consult">이 불편함으로 상담 신청 →</a></p></div>`:`<div class="go"><a href="${ROOT}concerns/#${c.id}">자세히 보기 →</a></div>`}</div></div></div></div>`).join('');
  const toggle=(r,o)=>{r.toggleAttribute('data-open',o);r.querySelector('button').setAttribute('aria-expanded',String(o));};
  $$('#index .row>button').forEach(b=>b.onclick=()=>{const r=b.parentNode;toggle(r,!r.hasAttribute('data-open'));});
  const target=location.hash?document.getElementById(decodeURIComponent(location.hash.slice(1))):null;
  toggle(target&&target.classList.contains('row')?target:$('#index .row'),true);
}
function ledger(){const el=$('#ledger');if(!el)return;el.innerHTML=DATA.methods.map(m=>`<tr><td>${m[0]}</td><td data-h="내용">${m[1]}</td><td data-h="보험"><span class="ins ${m[2][0]}">${m[2][1]}</span></td><td data-h="시간">${m[3]}</td>${el.dataset.full==='1'?`<td data-h="주기">${m[4]}</td>`:''}<td data-h="반응">${m[5]}</td></tr>`).join('');}
function firstVisit(){const el=$('#flow');if(!el)return;el.innerHTML=DATA.firstVisit.map(s=>`<li><b>${s[0]}</b><span>${s[1]}</span><em>${s[2]}</em></li>`).join('');}
function doctors(){const el=$('#docs');if(!el)return;el.innerHTML=DATA.doctors.map(x=>`<article class="doc reveal">${ph(x.img,x.n+' 한의사','r45','4:5 사진 자리')}<div><h3>${x.n}</h3><p class="role">${x.r}</p><ul>${x.li.map(l=>`<li>${l}</li>`).join('')}</ul><p class="days">진료 요일 · ${x.days}</p><p class="q2">${x.q}</p></div></article>`).join('');}
function rooms(){$$('[data-rooms]').forEach(el=>el.innerHTML=DATA.rooms.map(r=>`<figure class="reveal">${ph(r.img,r.n,'r43','진료실 사진 자리')}<figcaption><b>${r.n}</b><span>${r.d}</span></figcaption></figure>`).join(''));}
function photos(){$$('[data-ph]').forEach(el=>{const[f,alt,r,l]=el.dataset.ph.split('|');el.outerHTML=ph(f,alt,r,l);});}
function steps(){const el=$('#steps');if(!el)return;el.innerHTML=DATA.steps.map(s=>`<li><b>${s[0]}</b><span>${s[1]}</span></li>`).join('');}
function cost(){
  if($('#inslist'))$('#inslist').innerHTML=DATA.ins.map(s=>`<li><b>${s[0]}</b>${s[1]}</li>`).join('');
  if($('#price'))$('#price').innerHTML=DATA.price.map(p=>`<tr><td>${p[0]}</td><td>${p[1]}</td></tr>`).join('');
  if($('#faq'))$('#faq').innerHTML=DATA.faq.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');
}
function visit(){
  $$('[data-hours]').forEach(el=>el.innerHTML=DATA.hours.map(h=>`<tr><th>${h[0]}</th><td>${h[1]} ${h[2]?`<span class="${h[2]==='야간'?'late':'small'}">${h[2]}</span>`:''}</td></tr>`).join(''));
  $$('[data-addr]').forEach(el=>el.textContent=DATA.addr);
  if($('#ways'))$('#ways').innerHTML=DATA.ways.map(w=>`<li><b>${w[0]}</b><span>${w[1]}</span></li>`).join('');
}
/* 상담 폼 (데모: 전송 없음) */
function form(){
  const f=$('#cf');if(!f)return;
  const memo=store.get('onji-munjin'),c=new URLSearchParams(location.search).get('c'),cc=DATA.concerns.find(x=>x.id===c);
  if(cc)f.memo.value=`[상담 희망] ${cc.k}\n`;
  if(memo)f.memo.value+=memo;
  f.addEventListener('submit',e=>{e.preventDefault();
    if(!f.name.value.trim()||!f.tel.value.trim()){$('#msg').textContent='이름과 연락처를 적어 주세요.';(f.name.value.trim()?f.tel:f.name).focus();return;}
    if(!f.a1.checked){$('#msg').textContent='[필수] 개인정보 수집 · 이용 동의가 필요합니다.';f.a1.focus();return;}
    $('#msg').textContent=`데모 화면이라 실제로 접수되지 않았습니다. 실제 운영 시 ${f.when.value} ${f.how.value}으로 연락드립니다.${f.memo.value.trim()&&!f.a2.checked?' (건강 정보 동의가 없어 문진 내용은 제외됩니다)':''}`;});
}
questionnaire();concernIndex();ledger();firstVisit();doctors();rooms();photos();steps();cost();visit();form();
/* 등장 모션 */
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}}),{threshold:.12}):null;
$$('.reveal').forEach(e=>io?io.observe(e):e.classList.add('in'));
