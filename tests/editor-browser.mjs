// Integration tests against real static exports; state is kept in a fresh browser.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { installEditor } from '../scripts/install-editor.mjs';

const apps = ['pro-tax-office/almanac', 'medical-dermatology/lumiere', 'pro-tax-office/trust'];
for (const app of apps) installEditor(`templates/${app}/out`, app, `/agency-web-templates/${app}`);
const fixtures = fs.mkdtempSync(path.join(os.tmpdir(), 'agency-editor-browser-'));
fs.writeFileSync(path.join(fixtures, 'index.html'), '<!doctype html><html lang="ko"><head><title>Future template</title></head><body><header><a href="./">브랜드</a></header><main><section><h1>새로운 <b>사이트</b></h1><p>설명</p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a8f8AAAAASUVORK5CYII=" alt="원본 이미지"></section></main><footer>푸터</footer></body></html>');
installEditor(fixtures, 'future-template/unique', '/agency-web-templates/future-template/unique');
const sites = new Map(apps.map(app => [`/agency-web-templates/${app}/`, path.resolve(`templates/${app}/out`)]));
sites.set('/agency-web-templates/future-template/unique/', fixtures);
const concepts = ['almanac', 'compass', 'lifemap'];
for (const variant of concepts) {
  const directory = path.join(fixtures, 'concept-' + variant);
  fs.cpSync(`concepts/pro-tax-office/${variant}`, directory, { recursive: true });
  const siteId = `concepts/pro-tax-office/${variant}`;
  installEditor(directory, siteId, `/agency-web-templates/${siteId}`);
  sites.set(`/agency-web-templates/${siteId}/`, directory);
}
const mime = { '.html':'text/html; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.woff2':'font/woff2', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.mp4':'video/mp4' };
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const entry = [...sites].find(([prefix]) => pathname.startsWith(prefix));
  if (!entry) { response.writeHead(404); response.end(); return; }
  const [prefix, root] = entry;
  const target = path.resolve(root, pathname.slice(prefix.length), pathname.endsWith('/') ? 'index.html' : '');
  if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) { response.writeHead(404); response.end(); return; }
  response.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream' }); fs.createReadStream(target).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.env.EDITOR_BROWSER_PATH ? { executablePath: process.env.EDITOR_BROWSER_PATH } : process.platform === 'win32' ? { channel: 'chrome' } : {}) });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
const errors = [];
context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
const page = await context.newPage();
const wait = async (check, message) => { for (let i = 0; i < 80; i++) { if (await check()) return; await new Promise(resolve => setTimeout(resolve, 100)); } throw new Error(message); };
const selectedFrame = () => page.frames().find(frame => frame.url().includes('agency-editor=1'));
async function openEditor(app) {
  await page.goto(`${origin}/agency-web-templates/${app}/editor/`);
  const manifest = await (await page.request.get(`${origin}/agency-web-templates/${app}/editor/manifest.json`)).json();
  assert.equal(manifest.siteId, app); assert.equal(manifest.source, 'shared-editor'); assert.equal(manifest.editorVersion, '1.1.0');
  await wait(async () => { const frame = selectedFrame(); return frame && await frame.locator('main').count() && !(await page.locator('#status').textContent()).includes('불러오는'); }, 'Editor did not become ready: ' + app);
  return selectedFrame();
}
async function selectHeading() { await selectHeadingThroughInspector(); return selectedFrame(); }
async function selectHeadingThroughInspector() {
  const frame = selectedFrame();
  const target = await frame.locator('section h1,section h2').first().evaluate(element => ({ key: element.dataset.agencyKey, section: element.closest('section').dataset.agencyKey }));
  await page.locator('#sections').selectOption(target.section);
  let current = target.section;
  for (const segment of target.key.split(' > ').slice(current.split(' > ').length)) {
    current += ' > ' + segment;
    await wait(async () => (await page.locator('#children option').evaluateAll(options => options.map(option => option.value))).includes(current), 'Inspector child option missing');
    await page.locator('#children').selectOption(current);
  }
  await page.locator('[data-tab=advanced]').click(); await page.locator('#field-font-size').waitFor();
}
async function change(id, value) { const input = page.locator('#field-' + id); await input.fill(value); await input.dispatchEvent('change'); }
try {
  let frame = await openEditor(apps[0]);
  const originalTitle = await frame.locator('h1').innerText();
  const originalText = await frame.locator('h1').textContent();
  await selectHeading();
  await page.locator('[data-tab=content]').click();
  await page.locator('#contentForm .field-input').fill('로컬 원본 콘텐츠 패널');
  await wait(() => frame.locator('h1').evaluate(el => el.textContent === '로컬 원본 콘텐츠 패널'), 'Original content form not connected');
  await page.locator('#contentForm .style-toggle-btn').click();
  const nativeSize = await frame.locator('h1').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
  await page.locator('#contentForm .ts-field').filter({ has: page.getByText('크기', { exact: true }) }).getByRole('button', { name: '+', exact: true }).click();
  await wait(() => frame.locator('h1').evaluate((el, size) => parseFloat(getComputedStyle(el).fontSize) === Math.round(size) + 1, nativeSize), 'Original typography stepper not connected');
  if (process.env.EDITOR_SCREENSHOT_DIR) { fs.mkdirSync(process.env.EDITOR_SCREENSHOT_DIR, { recursive: true }); await page.screenshot({ path: path.join(process.env.EDITOR_SCREENSHOT_DIR, 'local-content-panel.png') }); }
  await page.locator('[data-tab=divbox]').click();
  const nativeRow = label => page.locator('#divBoxPanelBody .option-row').filter({ has: page.locator('label', { hasText: label }) });
  await nativeRow('자간').locator('input[type=range]').fill('3');
  await nativeRow('자간').locator('input[type=range]').dispatchEvent('input');
  await wait(() => frame.locator('h1').evaluate(el => getComputedStyle(el).letterSpacing === '3px'), 'Original divbox spacing slider not connected');
  await nativeRow('안쪽 여백 (Padding)').locator('input[type=range]').fill('12');
  await nativeRow('안쪽 여백 (Padding)').locator('input[type=range]').dispatchEvent('input');
  await wait(() => frame.locator('h1').evaluate(el => getComputedStyle(el).paddingTop === '12px'), 'Original padding slider not connected');
  const rich = page.locator('#divBoxPanelBody .builder-richtext-body');
  await rich.fill('원본 리치 텍스트');
  await wait(() => frame.locator('h1').evaluate(el => el.textContent === '원본 리치 텍스트'), 'Original rich text not connected');
  await rich.evaluate(el => {
    const data = new DataTransfer(); data.setData('text/html', '<b>서식 보존</b><img src=x onerror="window.bad=true"><script>window.bad=true</script>');
    el.focus(); const selection = window.getSelection(); selection.selectAllChildren(el);
    el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
  });
  await wait(() => frame.locator('h1 b').count(), 'Rich formatting missing');
  assert.equal(await frame.evaluate(() => window.bad), undefined);
  assert.equal(await page.evaluate(() => window.bad), undefined);
  assert.equal(await frame.locator('h1 script,h1 img').count(), 0);
  if (process.env.EDITOR_SCREENSHOT_DIR) await page.screenshot({ path: path.join(process.env.EDITOR_SCREENSHOT_DIR, 'local-elements-panel.png') });
  await page.locator('[data-tab=advanced]').click();
  await page.locator('#reset-element').click();
  await wait(() => frame.locator('h1').evaluate((el, original) => el.textContent === original, originalText), 'Native changes did not reset');
  await selectHeading();
  if (process.env.EDITOR_SCREENSHOT_DIR) { fs.mkdirSync(process.env.EDITOR_SCREENSHOT_DIR, { recursive: true }); await page.screenshot({ path: path.join(process.env.EDITOR_SCREENSHOT_DIR, 'almanac-editor.png') }); }
  await change('text', '편집 테스트 제목');
  await change('font-size', '48'); await change('letter-spacing', '2'); await change('padding-top', '24');
  await wait(() => frame.locator('h1').evaluate(element => element.textContent === '편집 테스트 제목' && getComputedStyle(element).letterSpacing === '2px' && getComputedStyle(element).paddingTop === '24px'), 'Text and styles not applied');
  await page.locator('#save').click(); await wait(async () => (await page.locator('#status').textContent()).startsWith('저장됨'), 'Save failed');
  await page.reload(); await wait(async () => selectedFrame() && (await selectedFrame().locator('h1').textContent()) === '편집 테스트 제목', 'Saved content lost on reload');
  frame = selectedFrame(); await selectHeading();
  await change('text', '<script>window.bad=true</script>');
  assert.equal(await frame.evaluate(() => window.bad), undefined);
  await page.locator('#undo').click(); await wait(() => frame.locator('h1').evaluate(element => element.textContent === '편집 테스트 제목'), 'Undo failed');
  await page.locator('#redo').click(); await wait(() => frame.locator('h1').evaluate(element => element.textContent.startsWith('<script>')), 'Redo failed');
  await page.locator('#undo').click();
  await page.locator('#pages').selectOption('/about/');
  await wait(async () => selectedFrame()?.url().includes('/about/'), 'Page navigation failed');
  frame = selectedFrame(); await wait(() => frame.locator('h1').count(), 'About page missing');
  assert.notEqual(await frame.locator('h1').textContent(), '편집 테스트 제목');
  await page.locator('[data-device=mobile]').click(); assert.equal(await page.locator('#preview').evaluate(element => element.getBoundingClientRect().width), 390);
  await page.locator('[data-device=desktop]').click();
  await selectHeading(); await change('text', '소개 페이지 전용');
  await page.locator('#save').click();
  const draft = await page.evaluate(async () => { const db = AgencyEditorCore.database('pro-tax-office/almanac'); return await db.get(); });
  assert.equal(draft.siteId, apps[0]); assert.ok(draft.pages['/about/']);
  const publicPage = await context.newPage(); await publicPage.goto(`${origin}/agency-web-templates/${apps[0]}/`);
  await wait(() => publicPage.locator('h1').evaluate(element => element.textContent === '편집 테스트 제목'), 'Public preview missing saved changes');
  await publicPage.locator('header a[href*="/about"]').first().click();
  await wait(() => publicPage.locator('h1').evaluate(element => element.textContent === '소개 페이지 전용'), 'Normal navigation mixed page settings');
  await publicPage.close();
  await openEditor(apps[1]); frame = selectedFrame();
  assert.notEqual(await frame.locator('h1').textContent(), '편집 테스트 제목');
  assert.equal(await page.evaluate(() => AgencyEditorCore.database('medical-dermatology/lumiere').get()), undefined);
  const foreignFile = path.join(fixtures, 'foreign.json'); fs.writeFileSync(foreignFile, JSON.stringify(draft));
  await page.locator('#import-file').setInputFiles(foreignFile);
  await wait(async () => (await page.locator('#status').textContent()).includes('다른 사이트'), 'Foreign site import was not rejected');
  await selectHeading();
  if (process.env.EDITOR_SCREENSHOT_DIR) await page.screenshot({ path: path.join(process.env.EDITOR_SCREENSHOT_DIR, 'lumiere-editor.png') });
  await change('font-size', '51'); await page.locator('#save').click();
  assert.equal((await page.evaluate(() => AgencyEditorCore.database('pro-tax-office/almanac').get())).pages['/'][Object.keys(draft.pages['/'])[0]].text, '편집 테스트 제목');
  await openEditor('future-template/unique'); frame = selectedFrame(); await selectHeading();
  const fixtureTitle = await frame.locator('h1').innerText(); await change('text', '변경'); await page.locator('#undo').click();
  await wait(() => frame.locator('h1 b').count(), 'Undo did not restore nested text markup'); assert.equal(await frame.locator('h1').innerText(), fixtureTitle);
  await frame.locator('img').click(); await page.locator('#field-image').waitFor();
  const image = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a8f8AAAAASUVORK5CYII=', 'base64');
  await page.locator('[data-tab=divbox]').click();
  await page.locator('#divBoxPanelBody .image-file-input').setInputFiles({ name: 'native-image.png', mimeType: 'image/png', buffer: image });
  await page.locator('#divBoxPanelBody').getByRole('button', { name: 'Contain', exact: true }).click();
  await wait(() => frame.locator('img').evaluate(el => el.src.startsWith('data:image/png') && getComputedStyle(el).objectFit === 'contain'), 'Original image picker/fit not connected');
  await page.locator('[data-tab=advanced]').click();
  await page.locator('#image-upload').setInputFiles({ name: 'image.png', mimeType: 'image/png', buffer: image });
  await change('alt', '교체된 이미지'); await change('width', '150px');
  await wait(() => frame.locator('img').evaluate(element => element.alt === '교체된 이미지' && getComputedStyle(element).width === '150px'), 'Image editing failed');
  await page.locator('#controls details').filter({ has: page.getByText('배경 · 테두리', { exact: true }) }).locator('summary').click();
  await page.locator('#background-upload').setInputFiles({ name: 'background.png', mimeType: 'image/png', buffer: image });
  await wait(() => frame.locator('img').evaluate(element => element.style.backgroundImage.includes('data:image/png')), 'Background upload failed');
  await page.locator('#save').click();
  const exported = await page.evaluate(() => AgencyEditorCore.database('future-template/unique').get());
  await frame.locator('header a').click(); await page.locator('#field-color').waitFor(); await page.locator('#scope').selectOption('site');
  await change('color', '#ff0000'); await page.locator('#save').click();
  assert.ok((await page.evaluate(() => AgencyEditorCore.database('future-template/unique').get())).pages['*']);
  await page.locator('.file-menu summary').click();
  const downloadEvent = page.waitForEvent('download'); await page.locator('#export').click(); const download = await downloadEvent;
  const downloaded = JSON.parse(fs.readFileSync(await download.path(), 'utf8')); assert.equal(downloaded.siteId, 'future-template/unique');
  const htmlEvent = page.waitForEvent('download'); await page.locator('#export-html').click(); const htmlDownload = await htmlEvent;
  const html = fs.readFileSync(await htmlDownload.path(), 'utf8'); assert.ok(!html.includes('<script')); assert.ok(html.includes('<base href='));
  page.once('dialog', dialog => dialog.accept()); await page.locator('#reset').click();
  await wait(async () => (await page.locator('#status').textContent()).includes('초기화했습니다'), 'Reset failed');
  assert.equal(await page.evaluate(() => AgencyEditorCore.database('future-template/unique').get()), undefined);
  assert.ok(await page.evaluate(() => AgencyEditorCore.database('pro-tax-office/almanac').get()));
  const ownFile = path.join(fixtures, 'own.json'); fs.writeFileSync(ownFile, JSON.stringify(exported)); await page.locator('#import-file').setInputFiles(ownFile);
  await wait(async () => (await page.locator('#status').textContent()).includes('가져오기 완료'), 'Same-site import failed');
  await page.locator('#save').click();
  assert.equal((await page.evaluate(() => AgencyEditorCore.database('future-template/unique').get())).siteId, exported.siteId);
  // Simulate publishing only the future template's exported settings.
  fs.writeFileSync(path.join(fixtures, 'editor/published.json'), JSON.stringify(exported));
  const clean = await browser.newContext(); const visitor = await clean.newPage(); await visitor.goto(`${origin}/agency-web-templates/future-template/unique/`);
  await wait(() => visitor.locator('img').evaluate(element => element.alt === '교체된 이미지'), 'Published settings not applied to a fresh visitor'); await clean.close();
  for (const variant of concepts) {
    const conceptId = `concepts/pro-tax-office/${variant}`;
    await openEditor(conceptId); frame = selectedFrame(); await selectHeadingThroughInspector(); await change('letter-spacing', '3'); await page.locator('#save').click();
    await wait(() => frame.locator('section h1,section h2').first().evaluate(element => getComputedStyle(element).letterSpacing === '3px'), 'Concept style edit failed: ' + variant);
    assert.equal((await page.evaluate(id => AgencyEditorCore.database(id).get(), conceptId)).siteId, conceptId);
  }
  assert.equal((await page.evaluate(() => AgencyEditorCore.database('pro-tax-office/almanac').get())).pages['/'][Object.keys(draft.pages['/'])[0]].text, '편집 테스트 제목');
  await openEditor('pro-tax-office/trust'); frame = selectedFrame(); await selectHeadingThroughInspector();
  await change('font-size', '47'); await page.locator('#save').click();
  await wait(() => frame.locator('h1').first().evaluate(element => getComputedStyle(element).fontSize === '47px'), 'Trust variant editing failed');
  assert.equal((await page.evaluate(() => AgencyEditorCore.database('pro-tax-office/trust').get())).siteId, 'pro-tax-office/trust');
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('PASS: 3 actual templates, 3 HTML concepts, future template, text/spacing/image/background, persistence, navigation, undo/redo, import/export, publishing, responsive preview, and same-origin site isolation.');
  assert.ok(originalTitle);
} finally { await context.close(); await browser.close(); await new Promise(resolve => server.close(resolve)); fs.rmSync(fixtures, { recursive: true, force: true }); }
