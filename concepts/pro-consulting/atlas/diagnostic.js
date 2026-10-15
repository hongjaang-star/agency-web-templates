(() => {
'use strict';
const section=document.getElementById('roadmap');
if(!section)return;
const D=JSON.parse(document.getElementById('consult-data').textContent);
const inputs=[...section.querySelectorAll('input[type=range]')];
const labels=['경영전략','영업·마케팅','고객경험','인사조직','데이터','AI 활용'];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches,inView=false,frame=0,revision=0,previous=inputs.map(x=>+x.value),drawn=[...previous],announceTimer;
section.insertAdjacentHTML('afterbegin','<div class="wrap"><div class="diagnostic-topline"><span class="signal-state"><i class="signal-dot" aria-hidden="true"></i>LIVE INPUT / LOCAL ANALYSIS</span><button class="motion-toggle" type="button" aria-pressed="'+paused+'">'+(paused?'모션 재생':'모션 일시정지')+'</button></div></div>');
section.querySelector('h2').innerHTML='입력은 신호가 되고,<br>다음 과제가 보입니다';
section.querySelector('.lede').textContent='여섯 영역의 눈금을 움직이면 과제 신호와 우선순위, 12주 로드맵이 즉시 반응합니다. 입력값만으로 브라우저에서 계산하는 상담 준비용 진단입니다.';
const axes=Array.from({length:6},(_,i)=>{const a=(i*60-90)*Math.PI/180;return [Math.cos(a),Math.sin(a)]});
const points=radius=>axes.map(([x,y])=>[160+x*radius,160+y*radius].join(',')).join(' ');
const panel=document.createElement('div');panel.className='diagnostic-console';
panel.innerHTML='<div class="signal-summary"><span class="hud-label">01 / SIGNAL INTENSITY</span><div class="signal-score"><span id="signal-score">00</span><small>/ 100</small></div><h3 id="signal-title">입력 대기</h3><div class="signal-meter" aria-hidden="true">'+Array.from({length:20},()=>'<i></i>').join('')+'</div><p id="signal-explain">눈금을 조절하면 영역별 신호를 읽고<br>먼저 살펴볼 과제를 정리합니다.</p></div><div class="radar-panel"><div class="radar-cross" aria-hidden="true"></div><div class="radar-sweep" aria-hidden="true"></div><svg viewBox="0 0 320 320" role="img" aria-labelledby="radar-title radar-description"><title id="radar-title">여섯 영역의 과제 신호</title><desc id="radar-description">각 영역의 입력값을 0에서 4까지 표시합니다.</desc>'+[.25,.5,.75,1].map(x=>'<polygon class="radar-grid" points="'+points(x*105)+'"/>').join('')+'<circle class="radar-ring" cx="160" cy="160" r="115"/>'+axes.map(([x,y],i)=>'<line class="radar-axis" x1="160" y1="160" x2="'+(160+x*105)+'" y2="'+(160+y*105)+'"/><text class="radar-label" x="'+(160+x*137)+'" y="'+(164+y*133)+'">'+labels[i]+'</text>').join('')+'<polygon id="signal-polygon" class="radar-data" points="'+points(0)+'"/>'+axes.map((_,i)=>'<circle class="radar-node" id="signal-node-'+i+'" cx="160" cy="160" r="3.5"/>').join('')+'<circle class="radar-core" cx="160" cy="160" r="3"/></svg></div><div class="signal-telemetry"><span class="hud-label">02 / DOMAIN TELEMETRY</span><div class="signal-bars">'+labels.map((x,i)=>'<div class="signal-bar"><span>'+x+'</span><span class="signal-track" aria-hidden="true"><i id="signal-bar-'+i+'"></i></span><span id="signal-value-'+i+'">0/4</span></div>').join('')+'</div><div class="signal-terminal" aria-hidden="true"><p>&gt; INPUT CHANNELS : 06</p><p id="signal-revision">&gt; REVISION : 000</p><p id="signal-log">&gt; 눈금 입력을 기다리는 중<span class="signal-cursor"></span></p></div></div>';
section.querySelector('.rm').before(panel);
panel.insertAdjacentHTML('afterend','<div class="signal-foot"><span>MODEL / <strong>입력값 합계 ÷ 24 × 100</strong></span><span id="signal-priority">PRIORITY / 선택된 과제 없음</span></div><div class="signal-footer-title"><small>INPUT → PLAN</small>눈금으로 현재 상황을 조정하세요</div><p id="signal-status" class="sr-only" role="status"></p>');
const status=section.querySelector('#signal-status');status.style.cssText='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap';
const $=s=>section.querySelector(s);
function paint(values){const p=values.map((v,i)=>{const [x,y]=axes[i];const r=v/4*105;const px=160+x*r,py=160+y*r;const node=$('#signal-node-'+i);node.setAttribute('cx',px);node.setAttribute('cy',py);return px+','+py});$('#signal-polygon').setAttribute('points',p.join(' '));drawn=[...values]}
function animate(next){cancelAnimationFrame(frame);if(paused||reduced.matches||!inView){paint(next);return}const from=[...drawn],start=performance.now();const tick=now=>{const t=Math.min((now-start)/450,1),ease=1-Math.pow(1-t,3);paint(next.map((x,i)=>from[i]+(x-from[i])*ease));if(t<1)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick)}
function update(changed){const values=inputs.map(x=>+x.value),sum=values.reduce((a,b)=>a+b,0),score=Math.round(sum/24*100);const active=values.map((v,i)=>({v,i})).filter(x=>x.v>=2).sort((a,b)=>b.v-a.v||a.i-b.i).slice(0,2);if(changed)revision++;
 $('#signal-score').textContent=String(score).padStart(2,'0');
 $('#signal-title').textContent=!revision?'입력 대기':active.length?'우선 과제 '+active.length+'개 감지':'현재 입력에서 우선 과제 없음';
 $('#signal-explain').textContent=active.length?active.map(x=>labels[x.i]).join(' · ')+' 영역부터 살펴보세요. 신호가 클수록 현재 막히는 일이 많다는 뜻입니다.':revision?'모든 영역의 입력값이 2 미만입니다. 실제 상황에 맞춰 눈금을 조정해 보세요.':'눈금을 조절하면 영역별 신호를 읽고 먼저 살펴볼 과제를 정리합니다.';
 $('#signal-priority').textContent='PRIORITY / '+(active.length?active.map(x=>labels[x.i]).join(' → '):'선택된 과제 없음');
 $('#signal-revision').textContent='> REVISION : '+String(revision).padStart(3,'0');
 const i=values.findIndex((v,i)=>v!==previous[i]);$('#signal-log').replaceChildren(document.createTextNode('> '+(changed&&i>=0?labels[i]+' '+values[i]+'/4 → 분석 갱신':revision?'현재 입력 분석 완료':'눈금 입력을 기다리는 중')));const cursor=document.createElement('span');cursor.className='signal-cursor';$('#signal-log').append(cursor);
 values.forEach((v,i)=>{$('#signal-bar-'+i).style.width=(v/4*100)+'%';$('#signal-value-'+i).textContent=v+'/4'});
 section.querySelectorAll('.signal-meter i').forEach((e,i)=>e.classList.toggle('on',i<Math.round(score/5)));
 $('#radar-description').textContent=values.map((v,i)=>labels[i]+' '+v+'/4').join(', ');
 clearTimeout(announceTimer);if(changed)announceTimer=setTimeout(()=>{status.textContent='과제 신호 '+score+'점. '+$('#signal-title').textContent+'. '+(active.length?active.map(x=>labels[x.i]).join(', '):'')},350);
 animate(values);previous=[...values];
}
function motion(){section.dataset.motion=paused||!inView||document.hidden?'paused':'running';const b=$('.motion-toggle');b.setAttribute('aria-pressed',String(paused));b.textContent=paused?'모션 재생':'모션 일시정지';if(paused){cancelAnimationFrame(frame);paint(inputs.map(x=>+x.value))}}
$('.motion-toggle').onclick=()=>{paused=!paused;motion()};
$('#sliders').addEventListener('input',()=>update(true));
$('#rs').addEventListener('click',()=>{revision=0;update(false);status.textContent='진단 눈금과 분석 패널을 초기화했습니다.'});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;motion()},{threshold:.03});observer.observe(section)}else inView=true;
document.addEventListener('visibilitychange',motion);reduced.addEventListener('change',()=>{paused=reduced.matches;motion()});
update(false);motion();
})();
