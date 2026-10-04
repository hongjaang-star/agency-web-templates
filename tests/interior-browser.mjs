import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const app=path.resolve('templates/space-interior/forme/out');
const prefix='/agency-web-templates/space-interior/forme';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{let route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!route.startsWith(prefix+'/'))return res.writeHead(404).end();route=route.slice(prefix.length+1);const file=path.resolve(app,route,route.endsWith('/')||!route?'index.html':'');if(!file.startsWith(app+path.sep)||!fs.existsSync(file))return res.writeHead(404).end();res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const url=origin+prefix;
const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{channel:'chrome'}:{})});
const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage();const errors=[],missing=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
try {
 const routes=['/','/projects/','/services/','/studio/','/process/','/contact/','/privacy/','/projects/light-house/','/projects/slow-table/','/projects/quiet-kitchen/'];
 const titles=new Set(),descriptions=new Set();
 for(const route of routes){await page.goto(url+route,{waitUntil:'networkidle'});assert.equal(await page.locator('h1').count(),1);titles.add(await page.title());descriptions.add(await page.locator('meta[name=description]').getAttribute('content'));assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex, nofollow');assert.ok((await page.locator('link[rel=canonical]').getAttribute('href')).endsWith(prefix+route));for(const img of await page.locator('img').all())await img.evaluate(i=>i.decode());await page.setViewportSize({width:360,height:800});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflows');await page.setViewportSize({width:1440,height:900});}
 assert.equal(titles.size,10);assert.equal(descriptions.size,10);
 await page.goto(url+'/',{waitUntil:'networkidle'});await page.screenshot({path:'agency/assets/images/portfolio/interior-forme.jpg',type:'jpeg',quality:88});
 fs.mkdirSync('../interior-qa',{recursive:true});await page.screenshot({path:'../interior-qa/desktop.png',fullPage:true});
 await page.locator('.swatches button').last().click();assert.equal(await page.locator('.material-note h3').innerText(),'올리브');
 await page.locator('.brief-fields select').first().selectOption('상업 공간');await page.getByLabel('현재 공간 사진',{exact:true}).check();await page.getByRole('button',{name:'준비 요약 복사'}).click();assert.ok((await page.evaluate(()=>navigator.clipboard.readText())).includes('공간: 상업 공간'));
 await page.locator('details').first().locator('summary').click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
 await page.evaluate(()=>scrollTo(0,2000));assert.equal(await page.locator('.site-header').evaluate(el=>Math.round(el.getBoundingClientRect().top)),0);
 await page.setViewportSize({width:360,height:800});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'../interior-qa/mobile.png',fullPage:true});
 await page.goto(url+'/projects/',{waitUntil:'networkidle'});await page.getByRole('button',{name:'상업',exact:true}).click();assert.equal(await page.locator('.project-card').count(),1);assert.ok((await page.locator('.project-card').getAttribute('href')).includes('slow-table'));
 await page.setViewportSize({width:1440,height:900});await page.goto(url+'/editor/',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('#status')&&!document.querySelector('#status').textContent.includes('불러오는'));
 const frame=page.frames().find(f=>f.url().includes('agency-editor=1'));assert.ok(frame);await frame.locator('h1').waitFor();
 const target=await frame.locator('h1').evaluate(el=>({key:el.dataset.agencyKey,section:el.closest('section').dataset.agencyKey}));
 await page.locator('#sections').selectOption(target.section);let current=target.section;
 for(const segment of target.key.split(' > ').slice(current.split(' > ').length)){current+=' > '+segment;await page.locator('#children').selectOption(current);}
 await page.locator('[data-tab=content]').click();await page.locator('#contentForm .field-input').fill('공간 에디터 저장 테스트');await page.waitForTimeout(150);assert.equal(await frame.locator('h1').innerText(),'공간 에디터 저장 테스트');await page.locator('#save').click();await page.reload({waitUntil:'networkidle'});await page.waitForTimeout(500);const saved=page.frames().find(f=>f.url().includes('agency-editor=1'));assert.equal(await saved.locator('h1').innerText(),'공간 에디터 저장 테스트');
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
 console.log('PASS: 10 unique SEO routes, all images, 360px layout, sticky header, filters, material selection, clipboard brief, FAQ, editor edit/save/reload.');
}finally{await browser.close();await new Promise(r=>server.close(r));}
