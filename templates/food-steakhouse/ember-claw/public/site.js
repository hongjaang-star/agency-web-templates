
const MENU_PHOTOS={"steak":["menu-tbone","menu-porterhouse","menu-tomahawk","menu-ribeye","menu-tenderloin","menu-flatiron"],"platter":["pick-platter","pick-surfturf","pick-platter"],"lobster":["menu-lobster-grill","menu-thermidor","pick-lobster-pasta","menu-seafood-pasta"],"lunch":["lunch-set","pick-lobster-pasta","lunch-set"],"side":["menu-sides","menu-sides","menu-sides"]};
const MENU={
  steak:{s:"Dry Aged Steak",k:"스테이크",items:[
    ["드라이에이징 티본","900g · 2~3인","안심과 채끝을 한 번에. 21일 숙성, 테이블 카빙.",118000,["best","share"]],
    ["포터하우스","1kg · 3인","안심 쪽이 더 넓은 티본. 소금과 로즈마리만 씁니다.",129000,["share"]],
    ["와규 토마호크","1.2kg · 3~4인","뼈째 굽는 와규 꽃등심. 굽는 데 40분이 걸립니다.",189000,["share"]],
    ["드라이에이징 립아이","300g","마블이 고른 꽃등심. 미디엄 레어를 권합니다.",54000,["best"]],
    ["한우 안심","200g","가장 부드러운 부위. 레드와인 소스.",58000,[]],
    ["부채살 스테이크","250g","씹는 맛이 좋은 부채살, 치미추리 소스.",32000,[]]]},
  platter:{s:"Platter & Set",k:"플래터 · 세트",items:[
    ["차콜 스테이크 플래터","3~4인","티본 600g, 립아이 300g, 포크찹, 감자튀김·아스파라거스·버섯, 소스 3종.",139000,["best","share"]],
    ["서프앤터프 세트","2인","통 랍스터 1마리, 한우 안심 200g, 수프, 하우스 와인 2잔.",98000,["best"]],
    ["패밀리 플래터","4~5인","부채살 500g, 포크찹, 하프 랍스터 2, 랍스터 파스타, 사이드 3종.",159000,["share"]]]},
  lobster:{s:"Lobster",k:"랍스터 · 파스타",items:[
    ["통 랍스터 버터 그릴","1마리 · 약 500g","갈릭 허브 버터를 바르며 숯불에 구웠습니다.",59000,[]],
    ["랍스터 테르미도르","1마리","치즈와 머스터드 크림을 채워 오븐에 구운 랍스터.",64000,[]],
    ["하프 랍스터 로제 파스타","1인","랍스터 반 마리를 올린 로제 링귀네, 비스크 소스.",36000,["best"]],
    ["시푸드 오일 파스타","1인","새우, 관자, 홍합, 마늘 오일 스파게티니.",24000,[]]]},
  lunch:{s:"Weekday Lunch",k:"평일 런치 · 11:30–15:00",items:[
    ["런치 부채살 스테이크 세트","1인","부채살 180g, 수프, 그린 샐러드, 음료.",24900,["best"]],
    ["런치 랍스터 파스타 세트","1인","하프 랍스터 파스타, 수프, 음료.",29900,[]],
    ["런치 커플 세트","2인","부채살 스테이크, 시푸드 파스타, 샐러드, 음료 2잔.",54000,["share"]]]},
  side:{s:"Sides & Wine",k:"사이드 · 와인",items:[
    ["트러플 감자튀김","","파르메산과 트러플 오일.",9000,[]],
    ["크림 시금치","","스테이크하우스 정석 사이드.",8000,[]],
    ["구운 아스파라거스","","숯불에 구워 레몬을 짜 드립니다.",9000,[]],
    ["하우스 레드 · 글라스","Cabernet Sauvignon","스테이크와 가장 잘 맞는 한 잔.",11000,[]],
    ["말벡 · 보틀","Mendoza, Argentina","진한 과실향, 숯불 고기에.",72000,[]],
    ["샤르도네 · 보틀","Napa Valley","버터 향, 랍스터와 함께.",88000,[]]]}
};
const TAGS={best:["BEST","best"],share:["셰어","share"],ssn:["시즌","ssn"]};
const won=n=>n.toLocaleString("ko-KR");
function renderMenu(cat){
  const keys=cat==="all"?Object.keys(MENU):[cat];
  document.getElementById("menuBody").innerHTML=keys.map(k=>{const g=MENU[k];
    return `<div class="mgroup"><h3><span class="script">${g.s}</span>${g.k}</h3><div class="mlist">${g.items.map(([n,w,d,p,t],index)=>
      `<div class="mi">${MENU_PHOTOS[k]?.[index]?`<figure class="menu-photo"><img src="/agency-web-templates/food-steakhouse/ember-claw/images/${MENU_PHOTOS[k][index]}.webp" alt="${n}" loading="lazy" decoding="async"></figure>`:''}<h4>${n}${t.map(x=>`<span class="tag ${TAGS[x][1]}">${TAGS[x][0]}</span>`).join("")}</h4><span class="price">${won(p)}</span>${w?`<span class="w">${w}</span>`:""}<p>${d}</p></div>`).join("")}</div></div>`;
  }).join("");
}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(x=>x.setAttribute("aria-selected",x===b));renderMenu(b.dataset.cat);
}));
renderMenu("all");

const STORES={
  seongsu:{name:"성수점",sub:"숙성고 앞 바 · 64석",addr:"서울 성동구 성수이로 21길 9, 1층 (가상 주소)",tel:"02-0000-2101",hours:"11:30–22:00 · 연중무휴",seats:["숙성 쇼케이스 앞 바 10석","4인 테이블 10개","단체석 최대 16인"],park:"인근 공영주차장 이용",way:"2호선 성수역 3번 출구 도보 4분",q:"성수동 스테이크",pin:[46,52],label:"성수역 3번 출구"},
  hannam:{name:"한남점",sub:"버건디 레더 부스 · 44석",addr:"서울 용산구 한남대로 21가길 5, 2층 (가상 주소)",tel:"02-0000-2102",hours:"17:00–23:00 · 디너 전용",seats:["프라이빗 룸 6~10인","레더 부스 4인 6개","와인 바 6석"],park:"건물 발레파킹 (3,000원)",way:"6호선 한강진역 1번 출구 도보 6분",q:"한남동 스테이크",pin:[58,40],label:"한강진역 1번 출구"},
  pangyo:{name:"판교점",sub:"가족 플래터 홀 · 92석",addr:"경기 성남시 분당구 판교역로 221, 3층 (가상 주소)",tel:"031-000-2103",hours:"11:30–21:30 · 연중무휴",seats:["6인 플래터 테이블 8개","유아 의자 12개","단체석 최대 30인"],park:"건물 지하 3시간 무료",way:"신분당선 판교역 4번 출구 도보 3분",q:"판교 스테이크",pin:[40,58],label:"판교역 4번 출구"}
};
const mapSvg=`<svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true"><g stroke="#29483a" stroke-width="10" fill="none"><path d="M-10 170 L410 120"/><path d="M150 -10 L190 310"/><path d="M-10 60 L410 40"/></g><g stroke="#203b2e" stroke-width="4" fill="none"><path d="M-10 240 L410 210"/><path d="M60 -10 L90 310"/><path d="M300 -10 L280 310"/><path d="M220 -10 L250 310"/></g><path d="M-10 285 C120 250 260 300 410 260" stroke="#1d3f3a" stroke-width="22" fill="none"/></svg>`;
function renderStore(id){const s=STORES[id];
  document.getElementById("storeBody").innerHTML=`<div class="store">
    <figure class="store-photo">${'<img src="/agency-web-templates/food-steakhouse/ember-claw/images/store-'+id+'.webp" alt="'+s.name+' 인테리어" loading="lazy">'}</figure><div class="map" role="img" aria-label="${s.name} 위치 약도">${mapSvg}
      <div class="pin" style="left:${s.pin[0]}%;top:${s.pin[1]}%"><span>Ember &amp; Claw · ${s.name}</span><i></i></div>
      <div class="pin" style="left:${s.pin[0]-16}%;top:${s.pin[1]+24}%;opacity:.85"><span>${s.label}</span></div></div>
    <div class="info"><h2>${s.name}</h2><p class="sub">${s.sub}</p>
      <dl class="kv"><dt>주소</dt><dd>${s.addr}<button class="copy" data-copy="${s.addr}">복사</button></dd>
      <dt>전화</dt><dd>${s.tel}<button class="copy" data-copy="${s.tel}">복사</button></dd>
      <dt>영업</dt><dd>${s.hours}</dd><dt>교통</dt><dd>${s.way}</dd><dt>주차</dt><dd>${s.park}</dd></dl>
      <div class="chips">${s.seats.map(x=>`<span class="chip">${x}</span>`).join("")}</div>
      <div class="acts"><a class="btn solid" href="#reserve">이 매장 예약하기</a><a class="btn" href="https://map.naver.com/p/search/${encodeURIComponent(s.q)}" target="_blank" rel="noopener">네이버 지도에서 보기</a></div></div></div>`;
}
document.querySelectorAll(".stab").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".stab").forEach(x=>x.setAttribute("aria-selected",x===b));renderStore(b.dataset.store);
}));
renderStore("seongsu");
document.getElementById("rcards").innerHTML=Object.values(STORES).map(s=>`<div class="rcard"><h3>${s.name}</h3><a class="btn solid" href="https://booking.naver.com/" target="_blank" rel="noopener">네이버 예약</a><p>${s.sub} · ${s.hours}</p></div>`).join("");

document.addEventListener("click",e=>{const b=e.target.closest(".copy");if(!b)return;
  const done=()=>{b.textContent="복사됨";setTimeout(()=>b.textContent="복사",1500)};
  try{navigator.clipboard.writeText(b.dataset.copy).then(done).catch(()=>{b.textContent="길게 눌러 복사"})}catch(_){b.textContent="길게 눌러 복사"}});

/* 숯불 불씨 */
(function(){
  const c=document.getElementById("embers"),x=c.getContext("2d");
  const still=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w,h,ps=[];
  function size(){const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0)}
  function mk(y){return{x:w*(.35+Math.random()*.65),y:y??h+10,r:.6+Math.random()*1.8,v:.3+Math.random()*.9,s:Math.random()*6.28,a:.4+Math.random()*.6}}
  size();ps=Array.from({length:70},()=>mk(Math.random()*h));
  addEventListener("resize",size);
  function draw(){x.clearRect(0,0,w,h);
    for(const p of ps){p.y-=p.v;p.s+=.03;p.x+=Math.sin(p.s)*.4;if(p.y<-10)Object.assign(p,mk());
      const f=Math.min(1,p.y/h+.2)*p.a;x.beginPath();x.arc(p.x,p.y,p.r,0,6.28);
      x.fillStyle=`rgba(${230+Math.random()*25|0},${110+Math.random()*60|0},40,${f})`;x.shadowColor="rgba(240,120,40,.9)";x.shadowBlur=8;x.fill();}
    if(!still&&!document.querySelector('[data-page="home"]').hidden)requestAnimationFrame(draw);else running=false;}
  let running=false;
  window.__embers=()=>{if(running)return;running=true;size();draw()};
})();

const titles={home:"참숯 스테이크와 랍스터",brand:"브랜드 이야기",menu:"메뉴",season:"시즌 메뉴",stores:"매장 찾기",reserve:"예약 안내"};
const pages=[...document.querySelectorAll("[data-page]")],links=[...document.querySelectorAll("nav.gnb a")];
const gnb=document.getElementById("gnb"),burger=document.getElementById("burger");
function route(){const segments=location.pathname.split("/").filter(Boolean);const last=segments.at(-1);const id=location.hash?location.hash.slice(1):(["brand","menu","season","stores","reserve"].includes(last)?last:"home");const page=pages.some(p=>p.dataset.page===id)?id:"home";
  document.title=(titles[page]||titles.home)+" · 엠버 & 클로 | 가상 업체 데모";
  pages.forEach(p=>p.hidden=p.dataset.page!==page);
  links.forEach(a=>(new URL(a.href).pathname.endsWith("/"+page+"/")||(page==="home"&&new URL(a.href).pathname===new URL(document.getElementById("brand-home").href).pathname))?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
  gnb.classList.remove("open");burger.setAttribute("aria-expanded","false");window.scrollTo(0,0);
  if(page==="home")window.__embers&&window.__embers();}
burger.addEventListener("click",()=>{const o=gnb.classList.toggle("open");burger.setAttribute("aria-expanded",o)});
addEventListener("hashchange",route);route();
