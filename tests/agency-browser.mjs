// Verify the published local homepage, real thumbnails, labels and new windows.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { renderAgency } from '../scripts/build-agency.mjs';

const root = path.resolve('_site');
fs.mkdirSync(root, { recursive: true });
fs.cpSync('agency/assets', path.join(root, 'assets'), { recursive: true });
fs.writeFileSync(path.join(root, 'index.html'), renderAgency());
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml','.mp4':'video/mp4','.json':'application/json'};
const server = http.createServer((request,response) => {
  const route = new URL(request.url,'http://localhost').pathname;
  if (!route.startsWith('/agency-web-templates/')) { response.writeHead(404).end(); return; }
  const relative = decodeURIComponent(route.slice('/agency-web-templates/'.length));
  let directory = root, file = relative;
  for (const app of ['pro-tax-office/almanac','pro-tax-office/trust','medical-dermatology/lumiere']) {
    if (relative.startsWith(app + '/')) { directory=path.resolve('templates',app,'out'); file=relative.slice(app.length+1); }
  }
  if (relative.startsWith('concepts/')) { directory=path.resolve('concepts'); file=relative.slice(9); }
  const target = path.resolve(directory,file,route.endsWith('/')?'index.html':'');
  if (!target.startsWith(directory+path.sep) || !fs.existsSync(target) || !fs.statSync(target).isFile()) { response.writeHead(404).end(); return; }
  response.writeHead(200,{'Content-Type':mime[path.extname(target)] || 'application/octet-stream'}); fs.createReadStream(target).pipe(response);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{channel:'chrome'}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try {
  await page.goto(origin+'/agency-web-templates/',{waitUntil:'networkidle'});
  const home=page.locator('#page-home');
  assert.equal(await home.locator('[data-portfolio-card]').count(),6);
  await page.locator('header nav [data-nav=portfolio]').click();
  assert.ok(page.url().endsWith('#portfolio'));
  const portfolio=page.locator('#page-portfolio');
  const cards=portfolio.locator('[data-portfolio-card]');
  assert.equal(await cards.count(),6);
  await cards.last().scrollIntoViewIfNeeded();
  for(const card of await cards.all()) {
    assert.equal(await card.locator('.portfolio-summary p').count(),3);
    assert.equal(await card.locator('.portfolio-labels span').count(),2);
    await card.locator('img').evaluate(async img=>{await img.decode();});
    assert.equal(await card.locator('img').evaluate(img=>img.naturalWidth),1440);
    assert.equal(await card.locator('a[target=_blank][rel="noopener noreferrer"]').count(),3);
  }
  const filter = async (key,count) => {
    await portfolio.locator(`[data-portfolio-filter=${key}]`).click();
    assert.equal(await portfolio.locator('[data-portfolio-card]:visible').count(),count);
  };
  await filter('medical',1); await filter('tax',5); await filter('site',3); await filter('concept',3); await filter('all',6);
  const expected=JSON.parse(fs.readFileSync('registry/portfolio.json','utf8')).items;
  for(const item of expected) {
    const card=portfolio.locator(`[data-portfolio-card][data-category=${item.category}][data-kind=${item.kind}]`).filter({has:page.getByRole('heading',{name:item.name,exact:true})});
    const popupPromise=page.waitForEvent('popup');
    await card.locator('.portfolio-preview').click();
    const popup=await popupPromise; await popup.waitForURL(origin+'/agency-web-templates/'+item.path,{waitUntil:'domcontentloaded'});
    assert.equal(new URL(popup.url()).pathname,'/agency-web-templates/'+item.path); await popup.close();
  }
  await page.reload(); await portfolio.waitFor({state:'visible'});
  await page.locator('header .logo').click(); await home.waitFor({state:'visible'});
  await page.goBack(); await portfolio.waitFor({state:'visible'});
  if(process.env.AGENCY_SCREENSHOT_DIR) {
    fs.mkdirSync(process.env.AGENCY_SCREENSHOT_DIR,{recursive:true});
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:path.join(process.env.AGENCY_SCREENSHOT_DIR,'portfolio-desktop.png'),fullPage:true});
  }
  await page.setViewportSize({width:390,height:844});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.locator('.menu-toggle').click(); assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
  await page.locator('header nav [data-nav=portfolio]').click(); assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  await filter('medical',1);
  if(process.env.AGENCY_SCREENSHOT_DIR) await page.screenshot({path:path.join(process.env.AGENCY_SCREENSHOT_DIR,'portfolio-mobile.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('PASS: 6 real thumbnails, category/status filters, 3-line summaries, six real new-window links, hash/reload/back navigation and mobile layout.');
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
