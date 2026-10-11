import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const root=path.resolve('templates/biz-manufacturing/fieldmap/out'), base='/agency-web-templates/biz-manufacturing/fieldmap';
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');const file=path.join(root,decodeURIComponent(url.pathname.slice(base.length)),url.pathname.endsWith('/')?'index.html':'');if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.woff2':'font/woff2'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome'});
const origin=`http://127.0.0.1:${server.address().port}${base}/capability/`;
try{
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(origin);
const cards=page.locator('.equipment-card');assert.equal(await cards.count(),6);
await cards.first().scrollIntoViewIfNeeded();await page.locator('.equipment-image').evaluateAll(images=>Promise.all(images.map(image=>image.decode())));
for(const card of await cards.all()){
await card.hover();await page.waitForTimeout(500);assert.equal(await card.getAttribute('data-open'),'true');assert.equal(await card.locator('.equipment-info').getAttribute('aria-hidden'),'false');
const bounds=await card.evaluate(el=>{const a=el.getBoundingClientRect(),b=el.querySelector('.equipment-copy').getBoundingClientRect();return b.top>=a.top&&b.bottom<=a.bottom;});assert.ok(bounds,'Overlay text overflows card');
}
await cards.first().hover();await page.waitForTimeout(500);
if(process.env.EQUIPMENT_SCREENSHOTS){fs.mkdirSync(process.env.EQUIPMENT_SCREENSHOTS,{recursive:true});await page.screenshot({path:path.join(process.env.EQUIPMENT_SCREENSHOTS,'equipment-desktop.png')});}
await page.mouse.move(0,0);const trigger=cards.first().locator('button');await trigger.focus();await page.keyboard.press('Enter');assert.equal(await trigger.getAttribute('aria-expanded'),'true');await page.keyboard.press('Enter');assert.equal(await trigger.getAttribute('aria-expanded'),'false');
const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await mobile.goto(origin);const card=mobile.locator('.equipment-card').first();await card.locator('button').tap();await mobile.waitForTimeout(500);assert.equal(await card.getAttribute('data-open'),'true');assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
if(process.env.EQUIPMENT_SCREENSHOTS)await mobile.screenshot({path:path.join(process.env.EQUIPMENT_SCREENSHOTS,'equipment-mobile.png')});
await card.locator('button').tap();assert.equal(await card.getAttribute('data-open'),'false');
const routes=page.locator('.process-route');assert.equal(await routes.count(),4);
assert.equal(await page.locator('.process-timeline > li').count(),16);
await routes.first().scrollIntoViewIfNeeded();
if(process.env.EQUIPMENT_SCREENSHOTS)await page.screenshot({path:path.join(process.env.EQUIPMENT_SCREENSHOTS,'category-process-desktop.png')});
await mobile.locator('.process-route').first().scrollIntoViewIfNeeded();
assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Process section horizontal overflow');
const markerBounds=await mobile.locator('.process-marker').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().left));assert.ok(markerBounds.every(left=>left>=0));
if(process.env.EQUIPMENT_SCREENSHOTS)await mobile.screenshot({path:path.join(process.env.EQUIPMENT_SCREENSHOTS,'category-process-mobile.png')});
assert.deepEqual(errors,[]);console.log('PASS: 6 images, hover overlays, text bounds, keyboard, mobile tap, no horizontal overflow');
}finally{await browser.close();await new Promise(r=>server.close(r));}
