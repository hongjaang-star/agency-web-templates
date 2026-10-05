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
 const sources=JSON.parse(fs.readFileSync('templates/space-interior/forme/public/images/portfolio/source.json','utf8')).assets;
 const projects=[...new Set(sources.map(image=>image.project))];assert.equal(projects.length,8);assert.equal(sources.length,48);assert.equal(new Set(sources.map(image=>image.sourceSha256)).size,48);
 const routes=['/','/projects/','/services/','/studio/','/process/','/contact/','/privacy/','/projects/light-house/','/projects/slow-table/','/projects/quiet-kitchen/',...projects.map(id=>`/projects/${id}/`)];
 const titles=new Set(),descriptions=new Set();
 for(const route of routes){await page.goto(url+route,{waitUntil:'networkidle'});assert.equal(await page.locator('h1').count(),1);titles.add(await page.title());descriptions.add(await page.locator('meta[name=description]').getAttribute('content'));assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex, nofollow');assert.ok((await page.locator('link[rel=canonical]').getAttribute('href')).endsWith(prefix+route));await page.locator('img').evaluateAll(images=>images.forEach(i=>i.loading='eager'));for(const img of await page.locator('img').all())await img.evaluate(i=>i.decode());await page.setViewportSize({width:360,height:800});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflows');await page.setViewportSize({width:1440,height:900});}
 assert.equal(titles.size,18);assert.equal(descriptions.size,18);
 await page.goto(url+'/',{waitUntil:'networkidle'});assert.ok((await page.locator('.hero-image img').evaluate(i=>i.currentSrc)).includes('cafe-coast-1'));await page.screenshot({path:'agency/assets/images/portfolio/interior-forme.jpg',type:'jpeg',quality:88});
 fs.mkdirSync('../interior-qa',{recursive:true});await page.screenshot({path:'../interior-qa/desktop.png',fullPage:true});
 await page.locator('.swatches button').last().click();assert.equal(await page.locator('.material-note h3').innerText(),'올리브');
 await page.locator('.brief-fields select').first().selectOption('상업 공간');await page.getByLabel('현재 공간 사진',{exact:true}).check();await page.getByRole('button',{name:'준비 요약 복사'}).click();assert.ok((await page.evaluate(()=>navigator.clipboard.readText())).includes('공간: 상업 공간'));
 await page.locator('details').first().locator('summary').click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
 await page.evaluate(()=>scrollTo(0,2000));assert.equal(await page.locator('.site-header').evaluate(el=>Math.round(el.getBoundingClientRect().top)),0);
 await page.setViewportSize({width:360,height:800});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'../interior-qa/mobile.png',fullPage:true});
 await page.goto(url+'/projects/',{waitUntil:'networkidle'});assert.equal(await page.locator('.project-card').count(),8);
 for(const category of ['오피스','병원','카페','기숙사']){await page.getByRole('button',{name:category,exact:true}).click();assert.equal(await page.locator('.project-card').count(),2);}
 await page.getByRole('button',{name:'전체',exact:true}).click();assert.equal(await page.locator('.project-card').count(),8);
 for(const id of projects){await page.goto(url+`/projects/${id}/`,{waitUntil:'networkidle'});assert.equal(await page.locator('.journal-photo').count(),6);for(const size of ['wide','medium','small'])assert.equal(await page.locator('.photo-'+size).count(),2);await page.locator('.photo-frame').first().click();await page.locator('.photo-viewer').waitFor({state:'visible'});assert.equal(await page.locator('.viewer-footer span').innerText(),'01 / 06');await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.viewer-footer span').innerText(),'02 / 06');await page.keyboard.press('Escape');assert.equal(await page.locator('.photo-viewer').isVisible(),false);}
 await page.setViewportSize({width:1440,height:900});await page.goto(url+'/projects/cafe-coast/',{waitUntil:'networkidle'});await page.locator('img').evaluateAll(images=>images.forEach(i=>i.loading='eager'));for(const img of await page.locator('img').all())await img.evaluate(i=>i.decode());await page.evaluate(()=>document.querySelectorAll('[data-photo-reveal]').forEach(el=>el.dataset.visible='true'));await page.screenshot({path:'../interior-qa/project-desktop.png',fullPage:true});await page.setViewportSize({width:360,height:800});for(const img of await page.locator('img').all())await img.evaluate(i=>i.decode());await page.screenshot({path:'../interior-qa/project-mobile.png',fullPage:true});
 const motionContext=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});const motionPage=await motionContext.newPage();await motionPage.goto(url+'/projects/office-seongsu/',{waitUntil:'networkidle'});assert.equal(await motionPage.locator('.project-experience.motion-ready').count(),1);await motionPage.locator('.journal-pair').scrollIntoViewIfNeeded();await motionPage.waitForTimeout(1350);assert.equal(await motionPage.locator('.journal-pair figure').first().getAttribute('data-visible'),'true');assert.ok((await motionPage.locator('.journal-pair .photo-frame').first().getAttribute('style')).includes('--photo-offset'));await motionContext.close();
 await page.setViewportSize({width:1440,height:900});await page.goto(url+'/editor/',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('#status')&&!document.querySelector('#status').textContent.includes('불러오는'));
 const frame=page.frames().find(f=>f.url().includes('agency-editor=1'));assert.ok(frame);await frame.locator('h1').waitFor();
 const target=await frame.locator('h1').evaluate(el=>({key:el.dataset.agencyKey,section:el.closest('section').dataset.agencyKey}));
 await page.locator('#sections').selectOption(target.section);let current=target.section;
 for(const segment of target.key.split(' > ').slice(current.split(' > ').length)){current+=' > '+segment;await page.locator('#children').selectOption(current);}
 await page.locator('[data-tab=content]').click();await page.locator('#contentForm .field-input').fill('공간 에디터 저장 테스트');await page.waitForTimeout(150);assert.equal(await frame.locator('h1').innerText(),'공간 에디터 저장 테스트');await page.locator('#save').click();await page.reload({waitUntil:'networkidle'});await page.waitForTimeout(500);const saved=page.frames().find(f=>f.url().includes('agency-editor=1'));assert.equal(await saved.locator('h1').innerText(),'공간 에디터 저장 테스트');
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
 console.log('PASS: 18 SEO routes, 8 projects / 48 unique photos, 4 filters, 2 photos per size, viewer keyboard/escape, scroll motion and reduced-motion, 360px, editor save/reload.');
}finally{await browser.close();await new Promise(r=>server.close(r));}
