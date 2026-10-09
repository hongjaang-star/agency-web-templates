import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { installEditor } from '../scripts/install-editor.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'editor-access-'));
const base = '/agency-web-templates/test-site/access';
fs.mkdirSync(path.join(root, 'about'));
for (const page of ['index.html', 'about/index.html']) fs.writeFileSync(path.join(root, page), '<!doctype html><html><head><title>Access test</title></head><body><main><section id="services"><h1>Original heading</h1></section></main></body></html>');
installEditor(root, 'test-site/access', base);
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith(base + '/')) { res.writeHead(404); res.end(); return; }
  const file = path.join(root, url.pathname.slice(base.length), url.pathname.endsWith('/') ? 'index.html' : '');
  if (!fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css' })[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { channel: 'chrome' } : {}) });
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const preview = () => page.frames().find(f => f.url().includes('agency-editor=1'));
async function ready() { await page.locator('#sections option').nth(1).waitFor({ state: 'attached' }); }
try {
  await page.goto(origin + base + '/about/#services');
  const link = page.locator('[data-agency-ui="editor-link"]');
  await link.waitFor();
  assert.equal(await link.getAttribute('href'), origin + base + '/editor/?page=%2Fabout%2F');
  const [popup] = await Promise.all([context.waitForEvent('page'), link.click()]);
  await popup.locator('#sections option').nth(1).waitFor({ state: 'attached' });
  assert.equal(await popup.locator('#pages').inputValue(), '/about/');
  assert.equal(await popup.frames().find(f => f.url().includes('agency-editor=1')).locator('[data-agency-ui="editor-link"]').count(), 0);
  await popup.close();
  await page.goto(origin + base + '/#services/editor');
  await ready();
  assert.equal(new URL(page.url()).pathname, base + '/editor/');
  await preview().locator('h1').evaluate(el => el.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  await page.locator('[data-tab="advanced"]').click();
  await page.locator('#field-text').fill('Saved from corrected URL');
  await page.locator('#field-text').dispatchEvent('change');
  await preview().locator('h1').filter({ hasText: 'Saved from corrected URL' }).waitFor();
  await page.locator('#save').click();
  await page.waitForFunction(() => document.querySelector('#status').textContent.startsWith('저장됨'));
  await page.reload(); await ready();
  assert.equal(await preview().locator('h1').textContent(), 'Saved from corrected URL');
  await page.goto(origin + base + '/about/');
  await page.waitForFunction(() => document.querySelector('[data-agency-ui="editor-link"]'));
  await page.evaluate(() => location.hash = 'services/editor');
  await ready();
  assert.equal(await page.locator('#pages').inputValue(), '/about/');
  assert.equal(await preview().locator('h1').textContent(), 'Original heading');
  await page.goto(origin + base + '/editor/?page=https%3A%2F%2Fevil.example%2F'); await ready();
  assert.equal(await page.locator('#pages').inputValue(), '/');
  assert.deepEqual(errors, []);
  console.log('Editor access: link, subpage, hash recovery, save/reload and invalid route checks passed');
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); fs.rmSync(root, { recursive: true, force: true }); }
