(() => {
'use strict';
const $=s=>document.querySelector(s);
for(const selector of ['#mtabs','#otabs']){
 const group=$(selector),buttons=[...group.querySelectorAll('button')];
 const panel=$(selector==='#mtabs'?'.chart':'#ocard');if(!panel.id)panel.id='growth-panel';panel.setAttribute('role','tabpanel');buttons.forEach((b,i)=>{b.id=panel.id+'-tab-'+i;b.setAttribute('aria-controls',panel.id)});const sync=()=>{buttons.forEach(b=>b.tabIndex=b.getAttribute('aria-selected')==='true'?0:-1);panel.setAttribute('aria-labelledby',buttons.find(b=>b.getAttribute('aria-selected')==='true').id)};
 sync();group.addEventListener('click',()=>queueMicrotask(sync));if(selector==='#otabs')document.querySelectorAll('.pin').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
 group.addEventListener('keydown',e=>{const i=buttons.indexOf(e.target);if(i<0||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[n].click();buttons[n].focus()});
}
const table=$('#tbl');table.tabIndex=0;table.setAttribute('role','region');table.setAttribute('aria-label','연도별 성장 지표 표 — 가로로 스크롤할 수 있습니다');
const status=document.createElement('p');status.className='record-status';status.setAttribute('role','status');$('#rlist').before(status);
const count=()=>status.textContent='가상 수행 실적 '+document.querySelectorAll('#rlist li:not([hidden])').length+'건';
count();$('#rfilter').addEventListener('click',count);
const links=[...document.querySelectorAll('.top nav a')];
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{for(const e of es)if(e.isIntersecting)links.forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})},{rootMargin:'-20% 0px -55% 0px'});links.forEach(a=>{const s=document.querySelector(a.hash);if(s)io.observe(s)})}
})();