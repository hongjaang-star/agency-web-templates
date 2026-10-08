import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import assert from 'node:assert/strict';import {chromium} from 'playwright';
const prefix='/agency-web-templates/food-steakhouse/ember-claw',concept='/agency-web-templates/concepts/food-steakhouse/ember-claw';
const app=path.resolve('templates/food-steakhouse/ember-claw/out'),draft=path.resolve('concepts/food-steakhouse/ember-claw');
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://x');const base=url.pathname.startsWith(concept)?concept:prefix;const root=base===concept?draft:app;const rel=decodeURIComponent(url.pathname.slice(base.length));const file=path.resolve(root,'.'+rel+(url.pathname.endsWith('/')?'index.html':''));if(!url.pathname.startsWith(base+'/')||!file.startsWith(root+path.sep)||!fs.existsSync(file))return res.writeHead(404).end();const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.json':'application/json'};res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res)});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const origin=process.env.STEAK_ORIGIN||`http://127.0.0.1:${server.address().port}`;const errors=[];page.on('pageerror',e=>errors.push(e.message));fs.mkdirSync('../steak-qa',{recursive:true});
try{
 const titles=[];
 for(const view of ['home','brand','menu','season','stores','reserve']){
  await page.goto(origin+prefix+'/'+(view==='home'?'':view+'/'));await page.waitForFunction(()=>!!document.querySelector('#menuBody .mi'));
  assert.equal(await page.locator('main>section:visible').getAttribute('data-page'),view);titles.push(await page.title());
  const photos=page.locator('main>section:visible img');for(const img of await photos.all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());assert.ok(await img.getAttribute('alt'));}
  for(const width of [360,768,1440]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),view+' overflow '+width)}
  await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'../steak-qa/'+view+'.jpg',fullPage:true});
 }
 assert.equal(new Set(titles).size,6);
 await page.goto(origin+prefix+'/menu/');await page.getByRole('tab',{name:'스테이크',exact:true}).click();assert.equal(await page.locator('.menu-photo img').count(),6);
 await page.goto(origin+prefix+'/stores/');for(const id of ['seongsu','hannam','pangyo']){await page.locator('[data-store="'+id+'"]').click();assert.ok((await page.locator('.store-photo img').getAttribute('src')).includes('store-'+id));await page.locator('.store-photo img').evaluate(el=>el.decode())}
 await page.goto(origin+prefix+'/editor/');await page.locator('iframe').waitFor();await page.waitForFunction(()=>document.querySelectorAll('#pages option').length===6);assert.equal(await page.locator('#pages option').count(),6);
 await page.goto(origin+concept+'/');for(const view of ['home','brand','menu','season','stores','reserve']){await page.goto(origin+concept+'/#'+view);assert.equal(await page.locator('main>section:visible').getAttribute('data-page'),view);for(const img of await page.locator('main>section:visible img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode())}}
 assert.deepEqual(errors,[]);console.log('PASS: 6 routes/titles, all photos decode, 360/768/1440, menu filter, 3 store images, 6 editor pages and original concept views.');
 await page.goto(origin+prefix+'/');await page.setViewportSize({width:1440,height:900});await page.screenshot({path:'agency/assets/images/portfolio/food-ember-claw.png'});
}finally{await browser.close();await new Promise(r=>server.close(r));}
